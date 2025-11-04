<template>
  <section class="bg-white min-h-screen">
    <!-- Hero Image -->
    <div class="w-full h-[300px] md:h-[500px] overflow-hidden">
      <img src="/images/shop/shop_hero.webp" alt="Meraki Hero Banner" class="w-full h-full object-cover" />
    </div>

    <!-- Heading -->
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-black mb-6">
        THE MERAKI COLLECTION
      </h2>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar -->
        <aside class="md:w-64 flex-shrink-0 space-y-6 border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
          <div>
            <h3 class="text-lg font-semibold mb-3 border-b pb-2 text-black">Filter by</h3>

            <!-- Category Filter -->
            <div>
              <button
                class="flex justify-between items-center w-full text-sm font-bold uppercase mb-2 hover:text-black focus:outline-none"
                @click="categoryExpanded = !categoryExpanded">
                <span class="text-black">Category</span>
                <span class="transform transition-transform text-black"
                  :class="{ 'rotate-180': categoryExpanded }">–</span>
              </button>
              <transition name="fade">
                <ul v-if="categoryExpanded" class="space-y-1 text-sm pl-2 border-l border-gray-200 ml-1">
                  <li>
                    <button :class="buttonClass('All')" @click="setCategory('All')">All</button>
                  </li>
                  <li v-for="cat in categories" :key="cat">
                    <button :class="buttonClass(cat)" @click="setCategory(cat)">{{ cat }}</button>
                  </li>
                </ul>
              </transition>
            </div>

            <!-- Price Filter -->
            <div>
              <button
                class="flex justify-between items-center w-full text-sm font-bold uppercase mt-6 mb-2 hover:text-black focus:outline-none"
                @click="priceExpanded = !priceExpanded">
                <span class="text-black">Price</span>
                <span class="transform transition-transform text-black"
                  :class="{ 'rotate-180': priceExpanded }">–</span>
              </button>
              <transition name="fade">
                <div v-if="priceExpanded" class="pl-2 border-l border-gray-200 ml-1 space-y-2">
                  <input type="range" :min="minPrice" :max="maxPrice" v-model="priceRange"
                    class="w-full accent-[#447c9d]" />
                  <div class="flex justify-between text-xs text-gray-500">
                    <span>AED {{ minPrice }}</span>
                    <span>AED {{ maxPrice }}</span>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Clear Filters -->
            <div v-if="selectedCategory !== 'All' || priceRange !== maxPrice" class="mt-4">
              <button @click="clearFilters"
                class="text-xs uppercase tracking-wide text-black hover:underline flex items-center gap-1">
                <span class="text-sm">✕</span> Clear Filters
              </button>
            </div>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="flex-1">
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div v-for="product in filteredVisibleProducts" :key="product.id"
              class="bg-white border border-black rounded overflow-hidden flex flex-col hover:shadow-md transition">
              <div class="aspect-square overflow-hidden">
                <img v-if="product.image" :src="product.image" :alt="product.title"
                  class="w-full h-full object-cover" />
                <div v-else class="text-gray-400 text-sm">No Image</div>
              </div>
              <div class="p-4 flex flex-col flex-1">
                <h3 class="text-sm font-semibold text-black mb-1">{{ product.title }}</h3>
                <span class="text-xs text-black font-light mb-3">AED {{ product.price }}</span>
                <button @click="addProductToCart(product)"
                  class="mt-auto border border-black text-black hover:bg-[#447c9d] hover:text-white transition rounded py-2 text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <!-- Loader -->
          <div v-if="isLoading" class="flex justify-center mt-6">
            <svg class="animate-spin h-6 w-6 text-black" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div @click="openGiftModal()" @keydown.enter.prevent="openGiftModal()" @keydown.space.prevent="openGiftModal()"
      role="button" tabindex="0" aria-label="Open gift card" v-if="isGiftVisible && !isGiftModalOpen"
      class="fixed right-4 sm:right-6 md:right-8 top-[70vh] sm:top-[68vh] md:top-[62vh] z-[9999] cursor-pointer select-none group">
      <div class="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
        <span
          class="absolute -top-2 -right-2 w-5 h-5 text-[10px] leading-none flex items-center justify-center rounded-full bg-red-500 text-white font-bold hover:bg-red-600"
          role="button" aria-label="Hide gift for 10 seconds" @click.stop="hideGift()">
          ✕
        </span>
        <!-- Hover callout tooltip -->
        <div
          class="absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-black text-white text-xs px-2 py-1 shadow opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-100 pointer-events-none">
          Wanna gift a voucher?
        </div>
        <ClientOnly>
          <DotLottieVue :autoplay="true" :loop="true"
            src="https://lottie.host/645b1fdc-e4ca-4142-a3fb-5018e0724918/Aa96DsHjXL.lottie"
            style="width: 100%; height: 100%" />
        </ClientOnly>
      </div>
    </div>

    <!-- Gift Card Modal -->
    <transition name="fade">
      <div v-if="isGiftModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" @click="closeGiftModal()"></div>
        <!-- Dialog: portrait on mobile, landscape on desktop -->
        <div
          class="relative z-10 w-[92vw] max-w-md md:max-w-3xl lg:max-w-4xl bg-white rounded-lg shadow-xl border border-black">
          <button @click="closeGiftModal()" aria-label="Close"
            class="absolute top-3 right-3 text-black hover:opacity-70">✕</button>

          <!-- Content wrapper switches from column (portrait) to row (landscape) -->
          <div class="p-5 md:p-6 lg:p-8 flex flex-col md:flex-row md:items-stretch gap-4 md:gap-6">
            <!-- Media: portrait aspect on mobile, landscape aspect on desktop -->
            <div class="w-full md:w-1/2">
              <div class="overflow-hidden rounded aspect-[3/4] md:aspect-[16/9]">
                <img :src="giftProduct?.image" :alt="giftProduct?.title" class="w-full h-full object-cover" />
              </div>
            </div>

            <!-- Details -->
            <div class="w-full md:w-1/2 flex flex-col">
              <h3 class="text-xl md:text-2xl font-semibold text-black">{{ giftProduct?.title }}</h3>
              <p class="text-sm md:text-base text-black mt-2">AED {{ effectiveGiftAmount }}</p>
              <div class="mt-3 mb-4 flex items-center gap-2 flex-wrap">
                <button v-for="a in presetGiftAmounts" :key="a" type="button" @click="choosePresetAmount(a)"
                  class="px-3 py-1.5 text-xs md:text-sm border rounded transition"
                  :class="selectedGiftAmount === a && (!customGiftAmount || Number(customGiftAmount) <= 0) ? 'border-black bg-black text-white' : 'border-black text-black hover:bg-black hover:text-white'">
                  AED {{ a }}
                </button>

                <div class="flex items-center border border-black rounded px-2 py-1.5 text-xs md:text-sm">
                  <span class="mr-1">AED</span>
                  <input type="number" min="10" max="1000" step="1" inputmode="numeric" placeholder="Enter Custom Value"
                    v-model="customGiftAmount" class="w-36 md:w-48 lg:w-56 bg-transparent focus:outline-none"
                    @input="onCustomAmountInput" />
                </div>
              </div>
              <p v-if="isCustomInvalid" class="-mt-2 mb-3 text-xs text-red-600">Please use an amount from AED 10 to AED
                1,000</p>
              <p class="text-xs md:text-sm text-black/70 mb-4">Send a little splash of creativity. Choose an amount and
                let them pick their favourite Meraki experience or kit.</p>
              <button :data-amount="effectiveGiftAmount" @click="addGiftCardToCart()"
                class="mt-auto w-full border border-black text-black hover:bg-[#447c9d] hover:text-white transition rounded py-2 text-sm md:text-base">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>


<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '~/stores/cart'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const categoryExpanded = ref(true)
const priceExpanded = ref(true)
const selectedCategory = ref('All')

const categories = ['DIY Kits', 'Starter Kits']

const minPrice = 10
const maxPrice = 750
const priceRange = ref(maxPrice)

const allProducts = ref([
  // Starter Kits
  { id: 1, title: 'Starter Kit', price: 555, category: 'Starter Kits', image: '/images/shop/shop_starter_kit.webp' },
  { id: 2, title: 'Color Kit', price: 750, category: 'Starter Kits', image: '/images/shop/shop_color_kit.webp' },

  // DIY Kits
  { id: 3, title: 'Resin Agate Floral Kit', price: 325, category: 'DIY Kits', image: '/images/shop/shop_color_kit.webp' },
  { id: 4, title: 'Resin Dried Flower Kit', price: 325, category: 'DIY Kits', image: '/images/shop/shop_color_kit.webp' },
  { id: 5, title: 'Resin Agate Geode Kit', price: 400, category: 'DIY Kits', image: '/images/shop/shop_color_kit.webp' },
  { id: 6, title: 'Resin Art Starter Box', price: 350, category: 'DIY Kits', image: '/images/shop/shop_color_kit.webp' },
  { id: 7, title: 'Premium DIY Art Kit', price: 450, category: 'DIY Kits', image: '/images/shop/shop_color_kit.webp' },
  { id: 8, title: 'Creative DIY Bundle', price: 380, category: 'DIY Kits', image: '/images/shop/shop_color_kit.webp' },
  { id: 9, title: 'DIY Resin Gift Pack', price: 300, category: 'DIY Kits', image: '/images/shop/shop_color_kit.webp' },
  { id: 10, title: 'Complete DIY Set', price: 420, category: 'DIY Kits', image: '/images/shop/shop_color_kit.webp' }
  , { id: 11, title: 'Resin Clock Kit', price: 350, category: 'DIY Kits', image: '/images/shop/shop_color_kit.webp' }
  , { id: 12, title: 'Resin Table Kit', price: 525, category: 'DIY Kits', image: '/images/shop/shop_color_kit.webp' }
  , { id: 13, title: 'Resin Cheeseboard Kit', price: 350, category: 'DIY Kits', image: '/images/shop/shop_color_kit.webp' }
  , { id: 14, title: 'Resin Agate Coaster Kit', price: 325, category: 'DIY Kits', image: '/images/shop/shop_color_kit.webp' }
  , { id: 15, title: 'MDF Resin Coaster Kit', price: 250, category: 'DIY Kits', image: '/images/shop/shop_color_kit.webp' }
  , { id: 16, title: 'Fluid Art Kit — Medium Bear', price: 150, category: 'DIY Kits', image: '/images/shop/shopnew.webp' }
  , { id: 17, title: 'Fluid Art Labubu', price: 175, category: 'DIY Kits', image: '/images/shop/shopnew.webp' }
  , { id: 18, title: 'Fluid Art Bunny', price: 160, category: 'DIY Kits', image: '/images/shop/shopnew.webp' }
  , { id: 19, title: 'Fluid Art Bear Phone Holder', price: 75, category: 'DIY Kits', image: '/images/shop/shopnew.webp' }

  // Gift Card (always available via floating button)
  , { id: 20, title: 'Meraki Gift Card', price: 199, category: 'Gift', image: '/images/shop/meraki-gift-card.webp' },
])


const visibleProducts = ref([])
const itemsPerLoad = 6
const isLoading = ref(false)
const isGiftModalOpen = ref(false)
const cartStore = useCartStore()

// Gift card amount selection
const presetGiftAmounts = [100, 250, 500, 1000]
const selectedGiftAmount = ref(presetGiftAmounts[0])
const customGiftAmount = ref('')

const effectiveGiftAmount = computed(() => {
  const raw = customGiftAmount.value
  if (raw !== '' && raw !== null) {
    const val = Number(raw)
    if (Number.isFinite(val) && val >= 10 && val <= 1000) {
      return Math.round(val)
    }
  }
  return selectedGiftAmount.value
})

// --- Cart wiring ---
function addProductToCart(product) {
  // Default VAT behavior: enabled true, 5%
  cartStore.add({
    type: 'product',
    id: product.id,
    sku: product.id,
    title: product.title,
    image: product.image,
    priceMajor: Number(product.price) || 0,
    currency: 'AED',
    vat: true,
    vatValue: 5,
    vatIncluded: false, // 👈 explicit: prices shown here are net (ex-VAT)
  }, 1)

  if (process.client) {
    window.dispatchEvent(new CustomEvent('open-cart'))
  }
}

function addGiftCardToCart() {
  const gp = giftProduct.value || { id: 'GIFT', title: 'Meraki Gift Card', image: '/images/shop/meraki-gift-card.webp' }
  const amount = Number(effectiveGiftAmount.value) || 0
  if (!amount) return

  // Gift cards are typically not taxed; set vat: false explicitly
  cartStore.add({
    type: 'product',
    id: gp.id,
    sku: 'GIFT',
    title: gp.title,
    image: gp.image,
    priceMajor: amount,
    currency: 'AED',
    vat: false,
    variantKey: `gift-${amount}`,
    meta: { kind: 'gift-card' },
  }, 1)

  closeGiftModal()
  if (process.client) {
    window.dispatchEvent(new CustomEvent('open-cart'))
  }
}

function choosePresetAmount(a) {
  selectedGiftAmount.value = a
  customGiftAmount.value = ''
}

function onCustomAmountInput(e) {
  customGiftAmount.value = e?.target?.value ?? ''
  if (customGiftAmount.value !== '') {
    selectedGiftAmount.value = null
  }
}

const isCustomInvalid = computed(() => {
  if (customGiftAmount.value === '' || customGiftAmount.value === null) return false
  const val = Number(customGiftAmount.value)
  return !(Number.isFinite(val) && val >= 10 && val <= 1000)
})

const isGiftVisible = ref(true)
let giftHideTimer = null

function hideGift(durationMs = 10000) {
  isGiftVisible.value = false
  try { localStorage.setItem('giftHidden', 'true') } catch { }
  if (giftHideTimer) clearTimeout(giftHideTimer)
  giftHideTimer = setTimeout(() => {
    isGiftVisible.value = true
    try { localStorage.removeItem('giftHidden') } catch { }
    giftHideTimer = null
  }, durationMs)
}

onMounted(() => {
  try {
    if (localStorage.getItem('giftHidden') === 'true') {
      isGiftVisible.value = false
      if (giftHideTimer) clearTimeout(giftHideTimer)
      giftHideTimer = setTimeout(() => {
        isGiftVisible.value = true
        try { localStorage.removeItem('giftHidden') } catch { }
        giftHideTimer = null
      }, 10000)
    }
  } catch { }
})

onBeforeUnmount(() => {
  if (giftHideTimer) clearTimeout(giftHideTimer)
})
const giftProduct = computed(() => allProducts.value.find(p => p.category === 'Gift' || p.title === 'Meraki Gift Card'))
let offset = 0

const filteredVisibleProducts = computed(() => {
  return visibleProducts.value.filter(
    p =>
      (selectedCategory.value === 'All' || p.category === selectedCategory.value) &&
      p.price <= priceRange.value
  )
})

function loadMore() {
  if (isLoading.value) return
  isLoading.value = true

  setTimeout(() => {
    const newItems = allProducts.value.slice(offset, offset + itemsPerLoad)
    visibleProducts.value.push(...newItems)
    offset += itemsPerLoad
    isLoading.value = false
  }, 500)
}

function setCategory(cat) {
  selectedCategory.value = cat
  resetProducts()
}

function clearFilters() {
  selectedCategory.value = 'All'
  priceRange.value = maxPrice
  resetProducts()
}

function resetProducts() {
  offset = 0
  visibleProducts.value = []
  loadMore()
}

onMounted(() => {
  loadMore()
  window.addEventListener('scroll', handleScroll)
})

function handleScroll() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
    loadMore()
  }
}

function openGiftModal() {
  isGiftModalOpen.value = true
}

function closeGiftModal() {
  isGiftModalOpen.value = false
}

function buttonClass(cat) {
  return [
    'hover:text-black',
    'transition',
    selectedCategory.value === cat ? 'text-black font-semibold' : 'text-black'
  ]
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  height: 0;
}

input[type=range] {
  accent-color: #447c9d;
}
</style>
