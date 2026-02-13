<template>
    <motion tag="div" v-if="activity" :initial="{ opacity: 0, scale: 0.85 }" :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.9 }" :transition="{ duration: 0.3 }"
        class="fixed inset-0 z-50 bg-black/50 grid place-items-center">
        <transition name="fade">
            <div v-if="activity"
                class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                @click.self="$emit('close')">
                <div ref="modalContent"
                    class="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg p-6 relative shadow-lg"
                    @scroll="checkScroll">
                    <!-- Sticky Close Button -->
                    <button @click="$emit('close')"
                        class="sticky top-4 right-4 z-10 text-black text-2xl font-bold float-right">
                        &times;
                    </button>

                    <!-- Header -->
                    <div class="mb-6">
                        <p class="uppercase text-sm tracking-widest text-gray-400">Activity</p>
                        <h2 class="text-3xl font-extrabold text-[#447C9D]">{{ activity.name }}</h2>
                    </div>

                    <!-- Subtype Cards -->
                    <div class="space-y-8">
                        <div v-for="subtype in activity.subtypes" :key="subtype.id"
                            class="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                            <div class="flex flex-col lg:flex-row">
                                <!-- Left Column -->
                                <div class="w-full lg:w-1/2 p-6 space-y-3">
                                    <h3 class="text-xl font-semibold text-gray-900">{{ subtype.title }}</h3>
                                    <p class="italic text-sm text-gray-600">{{ subtype.description }}</p>

                                    <!-- Non-variant -->
                                    <div v-if="!subtype.variants" class="mt-3 space-y-1 text-sm">
                                        <p>
                                            <strong>Price:</strong> {{ subtype.price }}
                                            <span v-if="!subtype.vatIncluded">+ VAT</span>
                                        </p>
                                        <p v-if="subtype.duration"><strong>Duration:</strong> {{ subtype.duration }}</p>
                                        <p v-if="subtype.minTickets">
                                            <strong>Minimum Tickets:</strong> {{ subtype.minTickets }}
                                        </p>
                                    </div>

                                    <!-- Variants -->
                                    <div v-else class="mt-3 space-y-2 text-sm">
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Select
                                            Option:</label>
                                        <select v-model="selectedVariants[subtype.id]"
                                            class="w-full border border-gray-300 rounded px-3 py-2">
                                            <option v-for="variant in subtype.variants" :key="variant.name"
                                                :value="variant.name">
                                                {{ variant.name }} — {{ variant.price }}
                                                <span v-if="!variant.vatIncluded">+ VAT</span>
                                            </option>
                                        </select>
                                        <p v-if="subtype.duration">
                                            <strong>Duration:</strong> {{ subtype.duration }}
                                        </p>
                                    </div>

                                    <!-- NEW: Quantity control (works for both variant & non-variant) -->
                                    <div class="mt-3 flex items-center gap-3">
                                        <span class="text-sm font-medium">Quantity</span>
                                        <div class="inline-flex items-center border rounded-lg overflow-hidden">
                                            <button
                                              type="button"
                                              class="px-3 py-1 text-lg disabled:opacity-40 disabled:cursor-not-allowed"
                                              :disabled="getQty(subtype.id) <= getMinTickets(subtype.id)"
                                              @click="decQty(subtype.id)"
                                            >−</button>
                                            <input
                                              :value="getQty(subtype.id)"
                                              readonly
                                              class="w-12 text-center py-1 border-l border-r"
                                              :min="getMinTickets(subtype.id)"
                                            />
                                            <button type="button" class="px-3 py-1 text-lg"
                                                @click="incQty(subtype.id)">+</button>
                                        </div>
                                    </div>
                                    <p v-if="subtype.minTickets && Number(subtype.minTickets) > 1" class="text-xs text-gray-500 mt-1">
                                      Minimum {{ subtype.minTickets }} tickets
                                    </p>
                                    <!-- /NEW -->

                                    <!-- CTA -->
                                    <button type="button"
                                        class="mt-4 px-4 py-2 bg-[#447C9D] text-white rounded hover:bg-[#376a86] text-sm font-medium"
                                        @click="goToAvailability(subtype, selectedVariants[subtype.id])">
                                        Book Now
                                    </button>


                                </div>

                                <!-- Right Column: Image (uniform landscape) -->
                                <div class="w-full lg:w-1/2">
                                  <div class="relative landscape overflow-hidden bg-gray-200">
                                    <img
                                      :src="subtype.image || activity.image"
                                      :alt="subtype.title"
                                      class="absolute inset-0 w-full h-full object-cover object-center" />
                                  </div>
                                </div>
                            </div>

                            <!-- Bottom Note -->
                            <div v-if="subtype.bottomNote"
                                class="px-9 py-6 border-t border-gray-200 text-sm text-gray-700 bg-white">
                                {{ subtype.bottomNote }}
                            </div>
                        </div>
                    </div>

                    <!-- Back to Top Button -->
                    <button v-if="showScrollTop" @click="scrollToTop"
                        class="fixed bottom-6 right-6 z-50 px-3 py-2 bg-[#447C9D] text-white rounded-full text-xs shadow-lg hover:bg-[#355f78]">
                        ↑ Back to Top
                    </button>
                </div>
            </div>
        </transition>
    </motion>
</template>

<script setup>
import { reactive, watch, onMounted, onBeforeUnmount, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';
import { navigateTo } from '#app';
const router = useRouter(); // ⬅️ NEW: for programmatic navigation


const props = defineProps({ activity: Object });
const emit = defineEmits(['close']);

// NEW: per-subtype quantity store & helpers (supports minTickets)
const quantities = reactive({});
const minTicketsById = reactive({});

const getMinTickets = (id) => {
  const v = Number(minTicketsById[id] ?? 1);
  return Number.isFinite(v) && v > 0 ? v : 1;
};

const getQty = (id) => {
  const min = getMinTickets(id);
  const v = Number(quantities[id] ?? min);
  return Math.max(min, Number.isFinite(v) ? v : min);
};

const incQty = (id) => (quantities[id] = getQty(id) + 1);
const decQty = (id) => {
  const min = getMinTickets(id);
  quantities[id] = Math.max(min, getQty(id) - 1);
};

const goToAvailability = async (subtype, variantName = null) => {
    // NEW: resolve unit price & VAT (variant-aware)
    let unitPrice = subtype.price || '';
    let vatIncluded = subtype.vatIncluded ?? false;
    if (subtype.variants?.length && variantName) {
        const v = subtype.variants.find((x) => x.name === variantName);
        if (v) {
            unitPrice = v.price;
            vatIncluded = v.vatIncluded ?? false;
        }
    }
    const qty = getQty(subtype.id);
    // Enforce minimum tickets (e.g., Neon Art Attack subtype 1.1 has minTickets=2)
    const minT = Number(subtype?.minTickets || 1);
    const enforcedQty = Math.max(Number.isFinite(minT) && minT > 0 ? minT : 1, qty);
    const numeric = parseFloat((unitPrice || '').replace(/[^\d.]/g, '')) || 0;
    const totalPrice = numeric ? `AED ${numeric * enforcedQty}` : unitPrice;

    await navigateTo({
        path: '/experiences/activities/availability',
        query: {
            title: subtype.title,
            price: unitPrice,                     // NEW
            duration: subtype.duration,
            image: subtype.image || activity.image,
            description: subtype.description,
            variant: variantName || '',
            quantity: String(enforcedQty),                // NEW
            totalPrice,                           // NEW
            vatIncluded: String(vatIncluded),     // NEW
            minTickets: subtype.minTickets ? String(subtype.minTickets) : '' // NEW
        },
    })
    emit('close') // triggers delayed modal removal
}

// Select first variant
watch(
    () => props.activity,
    async (newVal) => {
        if (newVal) {
            newVal.subtypes?.forEach((sub) => {
                if (sub.variants?.length) {
                    selectedVariants[sub.id] = sub.variants[0].name;
                }
                // Store and enforce minimum tickets per subtype
                minTicketsById[sub.id] = Number(sub.minTickets || 1);
                const min = getMinTickets(sub.id);
                if (quantities[sub.id] == null) quantities[sub.id] = min;
                else quantities[sub.id] = Math.max(min, Number(quantities[sub.id]) || min);
            });
            await nextTick();
            modalContent.value?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    { immediate: true }
);

// Escape Key
const handleKeydown = (e) => {
    if (e.key === 'Escape') emit('close');
};

// Show Back to Top if scrolled down
const checkScroll = () => {
    if (!modalContent.value) return;
    showScrollTop.value = modalContent.value.scrollTop > 200;
};

const scrollToTop = () => {
    modalContent.value?.scrollTo({ top: 0, behavior: 'smooth' });
};

const selectedVariants = reactive({});
const modalContent = ref(null);
const showScrollTop = ref(false);

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});
onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
* {
    font-family: 'Inter', sans-serif;
}

/* Modal Fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Uniform landscape frame for all subtype images */
.landscape {
  aspect-ratio: 4 / 3; /* taller frame: same width, more height */
}

/* Fallback for browsers without aspect-ratio support */
@supports not (aspect-ratio: 4 / 3) {
  .landscape { position: relative; }
  .landscape::before {
    content: "";
    display: block;
    padding-top: 75%; /* 4:3 */
  }
  .landscape > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
