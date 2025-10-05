<template>
    <section class="bg-[#F9F3EB] py-16 text-center relative">
        <div class="max-w-3xl mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-black mb-4">
                Reserve Your Art Experience
            </h2>
            <p class="text-gray-700 text-lg mb-8">
                Let us design a personalized, inspiring workshop just for you. Enjoy creative luxury in our Dubai
                studio,
                tailored to your style, vision, and occasion.
            </p>
            <button @click="openForm"
                class="bg-[#DD4912] text-white font-semibold px-8 py-3 rounded-full text-lg hover:bg-[#c44110] transition-all">
                👉 Enquire Now
            </button>
        </div>

        <!-- Popup Modal -->
        <Transition name="fade">
            <div v-if="showForm" class="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
                @click.self="closeForm">
                <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fadeIn" role="dialog"
                    aria-modal="true" aria-label="Workshop enquiry form">
                    <!-- Close Button -->
                    <button @click="closeForm" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                        aria-label="Close dialog">
                        ✕
                    </button>

                    <!-- Form Heading -->
                    <h3 class="text-2xl font-bold mb-6 text-center">
                        Secure Your Spot in This Upcoming Workshop
                    </h3>

                    <!-- Form -->
                    <form @submit.prevent="handleSubmit" class="space-y-5">
                        <div>
                            <label class="block text-left text-sm font-medium text-gray-700 mb-1">
                                Full Name*
                            </label>
                            <input v-model.trim="form.name" type="text" required
                                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DD4912]" />
                            <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
                        </div>

                        <div>
                            <label class="block text-left text-sm font-medium text-gray-700 mb-1">
                                Email Address*
                            </label>
                            <input v-model.trim="form.email" type="email" required
                                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DD4912]" />
                            <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
                        </div>

                        <div>
                            <label class="block text-left text-sm font-medium text-gray-700 mb-1">
                                Phone Number*
                            </label>
                            <input v-model.trim="form.phone" type="tel" required
                                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DD4912]" />
                            <p v-if="errors.phone" class="mt-1 text-xs text-red-600">{{ errors.phone }}</p>
                        </div>

                        <button type="submit" :disabled="loading"
                            class="w-full bg-[#DD4912] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-md hover:bg-[#c44110] transition-all">
                            <span v-if="!loading">Submit</span>
                            <span v-else>Submitting…</span>
                        </button>
                    </form>
                </div>
            </div>
        </Transition>

        <!-- Floating toast (success or error) -->
        <Transition name="toast">
            <div
              v-if="toast.visible"
              :class="['fixed left-1/2 -translate-x-1/2 bottom-6 z-50 px-5 py-3 rounded-full shadow-lg text-sm md:text-base',
                       toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white']"
              role="status"
              aria-live="polite"
            >
              <span v-if="toast.type === 'success'">✅ Form submitted successfully! We will reach out to you soon.</span>
              <span v-else>⚠️ Something went wrong. Please try again later.</span>
            </div>
        </Transition>
    </section>
</template>

<script setup>
import { ref } from 'vue';

/**
 * === Google Forms wiring (no external config) ===
 * Replace the URL and entry IDs with your actual Google Form "formResponse" endpoint + field entry IDs.
 * How to get entry IDs:
 *  - Open your Google Form (live view) > right-click > View page source
 *  - Search for "entry." patterns next to your fields
 */
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/REPLACE_ME/formResponse';
const ENTRY_NAME = 'entry.REPLACE_NAME_ID';
const ENTRY_EMAIL = 'entry.REPLACE_EMAIL_ID';
const ENTRY_PHONE = 'entry.REPLACE_PHONE_ID';

const showForm = ref(false);
const loading = ref(false);

// Toast state: { visible: boolean, type: 'success' | 'error' }
const toast = ref({ visible: false, type: 'success' });

// Field-level validation errors
const errors = ref({ name: '', email: '', phone: '' });

const form = ref({
  name: '',
  email: '',
  phone: '',
});

const validate = () => {
  errors.value = { name: '', email: '', phone: '' };
  let ok = true;

  // Name: required, at least 2 chars
  if (!form.value.name || form.value.name.trim().length < 2) {
    errors.value.name = 'Please enter your full name.';
    ok = false;
  }

  // Email: basic pattern
  const email = form.value.email?.trim() || '';
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    errors.value.email = 'Please enter a valid email address.';
    ok = false;
  }

  // Phone: required, min 7 digits (allow spaces, +, -)
  const phone = form.value.phone?.trim() || '';
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length < 7) {
    errors.value.phone = 'Please enter a valid phone number.';
    ok = false;
  }

  return ok;
};

const openForm = () => {
  showForm.value = true;
  errors.value = { name: '', email: '', phone: '' };
};

const closeForm = () => {
    showForm.value = false;
};

const handleSubmit = async () => {
  if (!validate()) return;

  try {
    loading.value = true;

    const fd = new FormData();
    fd.append(ENTRY_NAME,  form.value.name.trim());
    fd.append(ENTRY_EMAIL, form.value.email.trim());
    fd.append(ENTRY_PHONE, form.value.phone.trim());

    // NOTE: Using no-cors; network success will resolve, but response is opaque.
    await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: fd,
    });

    // Consider resolved request as success (cannot read opaque response)
    showForm.value = false;

    // Show success toast
    toast.value = { visible: true, type: 'success' };
    setTimeout(() => { toast.value.visible = false; }, 5000);

    // Reset
    form.value = { name: '', email: '', phone: '' };
    errors.value = { name: '', email: '', phone: '' };
  } catch (e) {
    // Show error toast
    toast.value = { visible: true, type: 'error' };
    setTimeout(() => { toast.value.visible = false; }, 5000);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Modal fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0
}

/* Toast slide-up */
.toast-enter-active,
.toast-leave-active {
    transition: transform .35s ease, opacity .35s ease
}

.toast-enter-from {
    transform: translate(-50%, 20px);
    opacity: 0
}

.toast-leave-to {
    transform: translate(-50%, 20px);
    opacity: 0
}

.animate-fadeIn {
    animation: fadeIn .28s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(.97)
    }

    to {
        opacity: 1;
        transform: scale(1)
    }
}
</style>