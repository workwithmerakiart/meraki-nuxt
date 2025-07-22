<template>
    <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white w-full max-w-2xl rounded-lg p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
            <!-- Close Button -->
            <button @click="$emit('close')"
                class="absolute top-4 right-4 text-black text-2xl font-bold">&times;</button>

            <h2 class="text-2xl font-bold text-[#447C9D] mb-4">Book Your Creative Session</h2>

            <form @submit.prevent="submitForm" class="space-y-5">
                <!-- 👤 Your Details -->
                <div>
                    <label class="block font-medium text-sm mb-1">Full Name*</label>
                    <input type="text" v-model="form.name" required
                        class="w-full border border-gray-300 rounded px-3 py-2" />
                </div>

                <div>
                    <label class="block font-medium text-sm mb-1">Email Address*</label>
                    <input type="email" v-model="form.email" required
                        class="w-full border border-gray-300 rounded px-3 py-2" />
                </div>

                <div>
                    <label class="block font-medium text-sm mb-1">Phone Number*</label>
                    <input type="tel" v-model="form.phone" required
                        class="w-full border border-gray-300 rounded px-3 py-2" />
                </div>

                <!-- 🛍️ Product Selection -->
                <div>
                    <label class="block font-medium text-sm mb-1">Choose Your Option*</label>
                    <select v-model="form.product" required class="w-full border border-gray-300 rounded px-3 py-2">
                        <option disabled value="">Select an option</option>
                        <option v-for="option in products" :key="option">{{ option }}</option>
                    </select>
                </div>

                <!-- 🗓️ Date & Time -->
                <div>
                    <label class="block font-medium text-sm mb-1">Preferred Date & Time*</label>
                    <input type="datetime-local" v-model="form.dateTime" required
                        class="w-full border border-gray-300 rounded px-3 py-2" />
                </div>

                <div>
                    <label class="block font-medium text-sm mb-1">Number of Participants*</label>
                    <input type="number" min="1" v-model="form.participants" required
                        class="w-full border border-gray-300 rounded px-3 py-2" />
                </div>

                <!-- 📝 Notes -->
                <div>
                    <label class="block font-medium text-sm mb-1">Additional Notes</label>
                    <textarea v-model="form.notes" rows="3" class="w-full border border-gray-300 rounded px-3 py-2" />
                </div>

                <!-- CTA -->
                <button type="submit"
                    class="w-full bg-[#447C9D] text-white px-4 py-2 rounded font-semibold hover:bg-[#376a86] transition">
                    Book Now
                </button>

                <p v-if="submitted" class="text-green-600 mt-4 text-center text-sm">
                    🎨 Thank you! We’ll confirm your booking and prepare everything for your creative session.
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    products: {
        type: Array,
        required: true,
    },
});

const form = ref({
    name: '',
    email: '',
    phone: '',
    product: '',
    dateTime: '',
    participants: 1,
    notes: ''
});

const submitted = ref(false);

const submitForm = () => {
    submitted.value = true;

    // You can integrate your backend/API logic here
    console.log("Booking submitted:", form.value);

    // Optional: reset form fields after submission
    // form.value = { name: '', email: '', phone: '', product: '', dateTime: '', participants: 1, notes: '' };
};
</script>

<style scoped>
* {
    font-family: 'Inter', sans-serif;
}
</style>
