<template>
  <section class="bg-[#f9f3eb] text-black font-sans">
    <!-- Hero Image -->
    <div class="w-full h-[300px] md:h-[500px] overflow-hidden">
      <img src="/images/products/meraki-hero.avif" alt="Custom Orders Hero" class="w-full h-full object-cover" />
    </div>

    <!-- Page Intro -->
    <div class="max-w-4xl mx-auto px-4 py-10 text-center">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
        Custom Orders
      </h2>
      <p class="mt-4 text-base sm:text-lg text-gray-700">
        Every order is thoughtfully designed, color-coordinated, and beautifully finished.
      </p>
    </div>

    <!-- Alternating Product Blocks -->
    <div class="max-w-6xl mx-auto px-4 py-8 pb-12 space-y-16">
      <div v-for="(item, index) in customOrders" :key="item.id" class="flex flex-col md:flex-row items-center gap-8"
        :class="{ 'md:flex-row-reverse': index % 2 === 1 }">
        <!-- Image -->
        <div class="md:w-1/2 w-full overflow-hidden rounded-lg shadow">
          <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
        </div>

        <!-- Text -->
        <div class="md:w-1/2 w-full">
          <h3 class="text-xl sm:text-2xl font-bold mb-2">{{ item.title }}</h3>
          <p class="text-gray-700 mb-4">{{ item.description }}</p>
          <button
            class="inline-block border border-black text-black px-4 py-2 rounded hover:bg-[#447c9d] hover:text-white transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="max-w-3xl mx-auto px-4 py-12 text-center space-y-4">
      <h3 class="text-2xl sm:text-3xl font-bold">💌 Ready to Create Something Special?</h3>
      <p class="text-base sm:text-lg text-gray-700">
        We’d love to bring your custom idea to life.
      </p>
      <button @click="showModal = true"
        class="inline-block border border-black text-black px-4 py-2 rounded hover:bg-[#447c9d] hover:text-white transition">
        Submit a Custom Order Inquiry
      </button>
    </div>

    <!-- Modal Overlay -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 p-6 relative overflow-y-auto max-h-[90vh]">
          <button @click="showModal = false" class="absolute top-3 right-3 text-gray-500 hover:text-black">
            ✕
          </button>
          <h3 class="text-2xl font-bold mb-2 text-center">📝 Request a Custom Quote</h3>
          <p class="text-center text-gray-700 mb-4">
            Let’s turn your vision into a beautiful reality. Fill out the form below and our team will get back to you
            with a tailored quote within 24–48 hours.
          </p>
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Name:</label>
              <input type="text" class="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Email Address:</label>
              <input type="email" class="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Phone Number (optional):</label>
              <input type="text" class="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Type of Custom Order:</label>
              <select class="w-full border border-gray-300 rounded px-3 py-2">
                <option>Floral Resin Preservation</option>
                <option>Large Canvas Artwork</option>
                <option>Resin Gifting (Bulk Orders)</option>
                <option>Wall Murals / Installations</option>
                <option>Tray & Coaster Sets</option>
                <option>Other (please describe)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Preferred Quantity (if applicable):</label>
              <input type="text" class="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Deadline (if any):</label>
              <input type="date" class="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Upload Reference Images (optional):</label>
              <input type="file" multiple class="w-full border border-gray-300 rounded px-3 py-2" />
              <p class="text-xs text-gray-500 mt-1">Max 3 files.</p>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Additional Notes or Specific Requests:</label>
              <textarea rows="4" class="w-full border border-gray-300 rounded px-3 py-2"></textarea>
            </div>
            <button type="button"
              class="w-full bg-[#447c9d] text-white rounded py-2 font-medium hover:bg-[#365f7e] transition">
              Submit Request
            </button>
            <p class="text-xs text-gray-500 text-center mt-2">
              💌 We’ll be in touch soon to bring your idea to life.
            </p>
          </form>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)

const customOrders = ref([
  {
    id: 1,
    title: 'Floral Resin Sculptures',
    description: 'Preserve special moments (like bridal bouquets) in elegant resin art.',
    image: '/images/products/3be4b9_947e2eba7be54daa9e0ad8916dc17305~mv2.avif'
  },
  {
    id: 2,
    title: 'Large-Scale Canvas Art',
    description: 'Made-to-measure paintings for homes, offices, and interiors.',
    image: '/images/products/3be4b9_947e2eba7be54daa9e0ad8916dc17305~mv2.avif'
  },
  {
    id: 3,
    title: 'Corporate & Event Gifting',
    description: 'Bulk orders of resin coasters, trays, and keepsakes for 50–500+ pieces.',
    image: '/images/products/3be4b9_947e2eba7be54daa9e0ad8916dc17305~mv2.avif'
  },
  {
    id: 4,
    title: 'Resin Décor Sets',
    description: 'Personalized trays, coasters, clocks, and wall art collections.',
    image: '/images/products/3be4b9_947e2eba7be54daa9e0ad8916dc17305~mv2.avif'
  },
  {
    id: 5,
    title: 'Installations & Murals',
    description: 'Custom-designed for showrooms, cafés, salons, and creative spaces.',
    image: '/images/products/3be4b9_947e2eba7be54daa9e0ad8916dc17305~mv2.avif'
  }
])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
