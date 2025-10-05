<script setup>
import { ref } from 'vue'

const props = defineProps({
    // Paste your Apps Script “web app” URL here (or pass it from the page)
    endpoint: { type: String, required: true },
})

const form = ref({
    name: '',
    mobile: '',
    email: '',
    desired_market: '',
    referral: '',
    source: 'franchise', // optional meta
})

const sending = ref(false)
const sent = ref(false)
const error = ref('')

async function submit() {
    error.value = ''
    if (!form.value.name || !form.value.mobile || !form.value.email) {
        error.value = 'Please fill the required fields.'
        return
    }

    sending.value = true
    try {
        const payload = { ...form.value, timestamp: new Date().toISOString() }

        // Use no-cors so the browser can POST directly to Apps Script without CORS errors.
        await fetch(props.endpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })

        sent.value = true
        // reset
        form.value = { name: '', mobile: '', email: '', desired_market: '', referral: '', source: 'franchise' }
    } catch (e) {
        error.value = 'Something went wrong. Please try again.'
    } finally {
        sending.value = false
    }
}
</script>

<template>
    <form @submit.prevent="submit" class="mt-10 max-w-3xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Name -->
            <div class="md:col-span-2">
                <label class="block text-sm font-medium text-neutral-700">Name<span
                        class="text-red-500">*</span></label>
                <input v-model="form.name" required autocomplete="name" placeholder="Your full name" class="mt-2 block w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3
                      focus:border-[var(--meraki-primary)] focus:ring-0" />
            </div>

            <!-- Mobile -->
            <div>
                <label class="block text-sm font-medium text-neutral-700">Mobile<span
                        class="text-red-500">*</span></label>
                <input v-model="form.mobile" required inputmode="tel" autocomplete="tel" placeholder="+971 5X XXXXXXX"
                    class="mt-2 block w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3
                      focus:border-[var(--meraki-primary)] focus:ring-0" />
            </div>

            <!-- Email -->
            <div>
                <label class="block text-sm font-medium text-neutral-700">Email<span
                        class="text-red-500">*</span></label>
                <input v-model="form.email" required type="email" autocomplete="email" placeholder="you@company.com"
                    class="mt-2 block w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3
                      focus:border-[var(--meraki-primary)] focus:ring-0" />
            </div>

            <!-- Desired Market -->
            <div class="md:col-span-2">
                <label class="block text-sm font-medium text-neutral-700">Desired Market</label>
                <input v-model="form.desired_market" placeholder="City / Country" class="mt-2 block w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3
                      focus:border-[var(--meraki-primary)] focus:ring-0" />
            </div>

            <!-- Referral -->
            <div class="md:col-span-2">
                <label class="block text-sm font-medium text-neutral-700">How did you hear about us?</label>
                <textarea v-model="form.referral" rows="3" placeholder="Instagram, referral, press, event…" class="mt-2 block w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3
                         focus:border-[var(--meraki-primary)] focus:ring-0 resize-y"></textarea>
            </div>
        </div>

        <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>
        <p v-if="sent" class="mt-4 text-sm text-emerald-700">Thanks! We’ve received your inquiry.</p>

        <div class="mt-8">
            <button type="submit" :disabled="sending" class="w-full md:w-auto inline-flex justify-center rounded-2xl px-6 py-3 font-medium
                     bg-[var(--meraki-primary)] text-white disabled:opacity-60 disabled:cursor-not-allowed
                     hover:bg-[color-mix(in_oklab,var(--meraki-primary),#000_10%)]">
                {{ sending ? 'Submitting…' : 'Apply for Franchise' }}
            </button>
        </div>
    </form>
</template>
