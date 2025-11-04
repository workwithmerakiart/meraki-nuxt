import { defineStore } from 'pinia'

// -----------------------------
// Types
// -----------------------------
export type CartType = 'product' | 'workshop' | 'course' | 'activity'

export interface ProductInput {
  // Minimal identity
  id: string | number
  sku?: string
  title: string
  image?: string

  // Price can come as number or formatted string (e.g., "AED 1500" or "325 AED")
  priceMajor?: number
  price?: string
  currency?: string // defaults to 'AED'

  // VAT semantics (defaults: enabled=true, rate=5, included=false)
  vat?: boolean
  vatValue?: number // % value (alias of vatRate)
  vatRate?: number // % value
  vatIncluded?: boolean

  // Optional classification & uniqueness inputs
  type?: CartType
  variantKey?: string // e.g., size, gift amount, schedule, etc.

  // Extra data we might want at checkout (kept lightweight in cart)
  meta?: Record<string, any>

  // Some sources (e.g., Courses) embed a nested product payload
  product?: {
    sku?: string
    name?: string
    currency?: string
    unitAmount?: number
    vatIncluded?: boolean
    vatRate?: number
  }
}

export interface CartItem {
  // Unique line key (stable across sessions if same identity+variant+price)
  key: string

  // Identity
  type: CartType
  id: string | number
  sku: string | number
  title: string
  image?: string

  // Commercials
  priceMajor: number // price per unit in major units (e.g., 325 for AED)
  currency: string // e.g., 'AED'
  qty: number

  // Tax
  vatEnabled: boolean
  vatRate: number // percentage, e.g., 5
  vatIncluded: boolean // whether priceMajor already includes VAT

  // Variant & misc
  variantKey?: string | null
  meta?: Record<string, any>
}

// -----------------------------
// Helpers
// -----------------------------
function parsePriceLike(input?: string | number): number {
  if (input == null) return 0
  if (typeof input === 'number') return input
  // Extract first numeric with optional decimals
  const m = String(input).match(/([0-9]+(?:\.[0-9]+)?)/)
  return m ? Number(m[1]) : 0
}

function normalizeInput(p: ProductInput): CartItem {
  const type: CartType = p.type ?? 'product'

  // Derive SKU & currency from nested product if present
  const sku = p.sku ?? p.product?.sku ?? p.id
  const currency = p.currency ?? p.product?.currency ?? 'AED'

  // Price precedence: explicit number -> nested product -> formatted string
  const priceMajor =
    typeof p.priceMajor === 'number' && !Number.isNaN(p.priceMajor)
      ? p.priceMajor
      : (typeof p.product?.unitAmount === 'number' ? p.product!.unitAmount : parsePriceLike(p.price))

  // VAT defaults and aliases
  const vatEnabled = p.vat !== undefined ? !!p.vat : true
  const vatRate = (p.vatValue ?? p.vatRate ?? p.product?.vatRate ?? 5) || 0
  const vatIncluded = p.vatIncluded ?? p.product?.vatIncluded ?? false

  // Build a stable key: type + sku + variant + price
  const variantKey = p.variantKey ?? null
  const uniqueKey = `${type}:${String(sku)}:${variantKey ?? ''}:${priceMajor}`

  return {
    key: uniqueKey,
    type,
    id: p.id,
    sku: sku as string | number,
    title: p.title,
    image: p.image,
    priceMajor: priceMajor || 0,
    currency,
    qty: 1,
    vatEnabled,
    vatRate,
    vatIncluded,
    variantKey,
    meta: p.meta ?? {},
  }
}

// Compute line totals for an item
function lineTotals(it: CartItem) {
  const rate = it.vatEnabled ? (it.vatRate || 0) : 0
  const unit = it.priceMajor
  let unitNet = unit
  let unitVat = 0

  if (rate > 0) {
    if (it.vatIncluded) {
      // price includes VAT => net = price / (1+r), vat = price - net
      unitNet = unit / (1 + rate / 100)
      unitVat = unit - unitNet
    } else {
      // price excludes VAT => vat added on top
      unitNet = unit
      unitVat = unit * (rate / 100)
    }
  }

  const lineNet = unitNet * it.qty
  const lineVat = unitVat * it.qty
  const lineGross = it.vatIncluded ? unit * it.qty : (unitNet + unitVat) * it.qty

  return { unitNet, unitVat, lineNet, lineVat, lineGross }
}

// -----------------------------
// Promotions (simple in-file DB; move to CMS later if needed)
// -----------------------------
// type: 'percent' -> value is percent (e.g., 10 => 10%)
// type: 'amount'  -> value is AED amount (e.g., 25 => AED 25)
const PROMO_DB = [
  { code: 'SAVE10', type: 'percent' as const, value: 10, active: true },
  { code: 'WELCOME25', type: 'amount' as const, value: 25, active: true },
  // Example of SKU-scoped code:
  // { code: 'COURSE5', type: 'percent' as const, value: 5, active: true, appliesTo: ['COURSE-RESIN-BASIC'] },
]

function findPromo(code?: string | null) {
  if (!code) return null
  const c = String(code).trim().toUpperCase()
  return PROMO_DB.find(p => p.active && p.code.toUpperCase() === c) || null
}
// -----------------------------
// Store
// -----------------------------
export const useCartStore = defineStore('cart', {
  // 1) State
  state: () => ({
    items: [] as CartItem[],
    promoCode: null as string | null,
    note: '' as string,
  }),

  // 2) Getters
  getters: {
    count: (s): number => s.items.reduce((n, it) => n + it.qty, 0),
    // Sum totals across items (assumes single currency for now)
    subtotalExVat: (s): number => s.items.reduce((sum, it) => sum + lineTotals(it).lineNet, 0),
    vatTotal: (s): number => s.items.reduce((sum, it) => sum + lineTotals(it).lineVat, 0),
    total: (s): number => s.items.reduce((sum, it) => sum + lineTotals(it).lineGross, 0),
    currency: (s): string => (s.items[0]?.currency ?? 'AED'),
    // Detailed lines (useful for order summaries/checkout)
    linesDetailed: (s) => s.items.map(it => ({ ...it, ...lineTotals(it) })),

    // Discount amount applied on ex-VAT subtotal
    discountExVat(): number {
      const promo = findPromo(this.promoCode)
      if (!promo) return 0

      const base = this.subtotalExVat || 0
      if (base <= 0) return 0

      let discount = 0
      if (promo.type === 'percent') discount = base * (promo.value / 100)
      else discount = promo.value

      // Clamp to base (no negative taxable amount)
      return Math.min(discount, base)
    },

    // VAT after applying discount proportionally across eligible base
    vatTotalAfterDiscount(): number {
      const base = this.subtotalExVat || 0
      if (base <= 0) return 0
      const d = this.discountExVat
      const ratio = Math.max(0, (base - d) / base)
      return this.vatTotal * ratio
    },

    // Final total after discount + recalculated VAT
    totalAfterDiscount(): number {
      const base = this.subtotalExVat || 0
      const d = this.discountExVat
      const vat = this.vatTotalAfterDiscount
      return Math.max(0, base - d) + vat
    },
  },

  // 3) Actions
  actions: {
    // Add a new item or increase qty if same key exists
    add(input: ProductInput, qty = 1) {
      const normalized = normalizeInput(input)
      const key = normalized.key
      const found = this.items.find(i => i.key === key)
      if (found) {
        found.qty += Math.max(1, qty)
      } else {
        normalized.qty = Math.max(1, qty)
        this.items.push(normalized)
      }
    },

    // Add or replace an item while keeping a specific key (useful when price or VAT toggles change)
    upsertWithKey(key: string, patch: Partial<CartItem>) {
      const idx = this.items.findIndex(i => i.key === key)
      if (idx >= 0) {
        this.items[idx] = { ...this.items[idx], ...patch }
      } else {
        // If creating, require minimal fields
        if (!patch.title || patch.priceMajor == null) return
        const sku = patch.sku ?? patch.id ?? key
        const item: CartItem = {
          key,
          type: (patch.type as CartType) ?? 'product',
          id: patch.id ?? sku,
          sku: sku as string | number,
          title: patch.title,
          image: patch.image,
          priceMajor: Number(patch.priceMajor),
          currency: patch.currency ?? 'AED',
          qty: Math.max(1, Number(patch.qty ?? 1)),
          vatEnabled: patch.vatEnabled ?? true,
          vatRate: patch.vatRate ?? 5,
          vatIncluded: patch.vatIncluded ?? false,
          variantKey: patch.variantKey ?? null,
          meta: patch.meta ?? {},
        }
        this.items.push(item)
      }
    },

    // Quantity controls
    increment(key: string) {
      const it = this.items.find(i => i.key === key)
      if (it) it.qty += 1
    },
    decrement(key: string) {
      const it = this.items.find(i => i.key === key)
      if (!it) return
      it.qty -= 1
      if (it.qty <= 0) this.remove(key)
    },
    setQty(key: string, qty: number) {
      const it = this.items.find(i => i.key === key)
      if (!it) return
      const q = Math.max(0, Math.floor(qty))
      if (q <= 0) this.remove(key)
      else it.qty = q
    },

    // Tax toggles (per line)
    setVat(key: string, enabled: boolean) {
      const it = this.items.find(i => i.key === key)
      if (it) it.vatEnabled = !!enabled
    },
    setVatRate(key: string, rate: number) {
      const it = this.items.find(i => i.key === key)
      if (it) it.vatRate = Math.max(0, Number(rate) || 0)
    },
    setVatIncluded(key: string, included: boolean) {
      const it = this.items.find(i => i.key === key)
      if (it) it.vatIncluded = !!included
    },

    // Replace price/currency (e.g., when selecting a different variant amount)
    setPrice(key: string, priceMajor: number, currency?: string) {
      const it = this.items.find(i => i.key === key)
      if (!it) return
      it.priceMajor = Number(priceMajor) || 0
      if (currency) it.currency = currency
    },

    // Remove / clear
    remove(key: string) {
      this.items = this.items.filter(i => i.key !== key)
    },
    clear() {
      this.items = []
    },

    // Promotions
    applyPromo(code: string): { ok: boolean; message?: string } {
      const promo = findPromo(code)
      if (!promo) {
        return { ok: false, message: 'Invalid promo code' }
      }
      this.promoCode = promo.code
      return { ok: true }
    },
    clearPromo() {
      this.promoCode = null
    },

    // Optional cart note (persists)
    setNote(note: string) {
      this.note = note || ''
    },

    // Utilities
    replaceAll(items: CartItem[]) {
      // Shallow validate shape
      this.items = Array.isArray(items) ? items.map(i => ({ ...i })) : []
    },
    mergeFrom(inputs: ProductInput[]) {
      inputs.forEach(p => this.add(p, 1))
    },
  },

  // 4) Persistence
  persist: { key: 'meraki_cart' },
})