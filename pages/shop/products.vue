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
                <button
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
  </section>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'

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
])


const visibleProducts = ref([])
const itemsPerLoad = 6
const isLoading = ref(false)
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
