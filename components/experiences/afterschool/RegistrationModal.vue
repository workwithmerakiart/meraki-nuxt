<template>
    <Teleport to="body">
        <transition name="fade">
            <div v-if="open" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4"
                role="dialog" aria-modal="true">
                <div class="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
                    <div class="flex items-center justify-between px-6 py-4 border-b">
                        <div>
                            <h3 class="text-xl font-bold">📝 Registration Form</h3>
                            <p class="text-sm text-gray-600">Enroll Your Child in a Meraki Art Experience</p>
                        </div>
                        <button class="text-2xl leading-none px-2 hover:opacity-70"
                            @click="$emit('close')">&times;</button>
                    </div>

                    <form class="p-6 space-y-6" @submit.prevent="submit">
                        <input type="hidden" v-model="form.program" />

                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Child’s Full Name *</label>
                                <input v-model="form.childName" required type="text"
                                    class="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Child’s Age *</label>
                                <input v-model="form.childAge" required type="number" min="1"
                                    class="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name
                                    *</label>
                                <input v-model="form.parentName" required type="text"
                                    class="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Parent Email *</label>
                                <input v-model="form.parentEmail" required type="email"
                                    class="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
                            </div>

                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                <input v-model="form.phone" required type="tel"
                                    class="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
                            </div>
                        </div>

                        <!-- Health & Safety -->
                        <div class="border-t border-gray-200 pt-6">
                            <h4 class="text-lg font-semibold mb-3">📍 Health & Safety</h4>
                            <div class="flex items-center gap-6 mb-3">
                                <label class="flex items-center gap-2">
                                    <input type="radio" value="no" v-model="form.hasConditions" />
                                    <span>No allergies/conditions</span>
                                </label>
                                <label class="flex items-center gap-2">
                                    <input type="radio" value="yes" v-model="form.hasConditions" />
                                    <span>Yes, there are notes</span>
                                </label>
                            </div>
                            <textarea v-model="form.conditionNotes" :disabled="form.hasConditions !== 'yes'"
                                placeholder="If yes, please provide details…"
                                class="w-full min-h-[90px] rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
                        </div>

                        <!-- Additional Notes -->
                        <div class="border-t border-gray-200 pt-6">
                            <h4 class="text-lg font-semibold mb-3">✏️ Additional Notes</h4>
                            <textarea v-model="form.notes" placeholder="Anything else you'd like us to know?"
                                class="w-full min-h-[90px] rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
                        </div>

                        <div class="flex items-center justify-between gap-4">
                            <p class="text-sm text-gray-500">🎨 Thank you! We’ll be in touch to confirm your child’s
                                spot.</p>
                            <button type="submit"
                                class="inline-flex items-center rounded-2xl px-5 py-3 text-base font-semibold bg-black text-white hover:opacity-90 transition">
                                Submit Registration
                            </button>
                        </div>

                        <transition name="fade">
                            <div v-if="submitted"
                                class="mt-4 rounded-xl bg-green-50 border border-green-200 p-4 text-green-800">
                                Thanks! Your registration has been received. We’ll contact you shortly.
                            </div>
                        </transition>
                    </form>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
const props = defineProps({
    open: { type: Boolean, default: false },
    program: { type: String, default: '' }
})
const emit = defineEmits(['close'])

const form = ref({
    program: props.program,
    childName: '',
    childAge: '',
    parentName: '',
    parentEmail: '',
    phone: '',
    hasConditions: 'no',
    conditionNotes: '',
    notes: ''
})
watch(() => props.program, v => (form.value.program = v))

const submitted = ref(false)
function submit() {
    // TODO: integrate Netlify Forms or API; for now show success
    submitted.value = true
    setTimeout(() => {
        submitted.value = false
        emit('close')
    }, 1500)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
