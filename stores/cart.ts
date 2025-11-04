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
// Store
// -----------------------------
export const useCartStore = defineStore('cart', {
  // 1) State
  state: () => ({
    items: [] as CartItem[],
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