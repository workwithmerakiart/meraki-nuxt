<template>
  <div class="bg-[#d6e9ff] min-h-screen font-sans">
    <!-- HEADER -->
    <header
      class="flex items-center justify-between px-6 py-4 border-b border-[#0d2fff]"
    >
      <div class="text-xl font-bold text-[#0d2fff]">MENU</div>
      <h1 class="text-5xl font-extrabold text-[#0d2fff] tracking-tight">FAQ</h1>
      <div class="text-xl text-[#0d2fff]">🛒</div>
    </header>

    <!-- FAQ Sections -->
    <section class="max-w-[1024px] mx-auto px-6 md:px-12 py-16 space-y-16">
      <FaqsFaqBlock title="I'm a shopper!" :faqs="shopperFaqs" />
      <FaqsFaqBlock title="I'm a brand!" :faqs="brandFaqs" />
    </section>

    <!-- Footer -->
    <footer class="bg-[#f6ee00] text-[#0d2fff] py-10 px-6 md:px-12">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-4">
          <img
            src="https://png.pngtree.com/png-clipart/20240911/original/pngtree-retro-distressed-sticker-of-a-cartoon-broken-computer-png-image_15985729.png"
            alt="Computer"
            class="w-14 h-14"
          />
          <div>
            <h2 class="text-2xl font-bold">Have a question?</h2>
            <h3 class="text-xl font-bold">Hit us up!</h3>
          </div>
        </div>
        <div class="text-right text-base leading-6">
          <p>
            Email:
            <a href="mailto:hi@popupgrocer.com" class="underline"
              >hi@popupgrocer.com</a
            >
          </p>
          <p>Text: 929-6000-PUG</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";

const shopperFaqs = ref([
  { question: "What is Pop Up Grocer?", answer: "Description here..." },
  {
    question: "How did Pop Up Grocer come to be?",
    answer: "Description here...",
  },
  {
    question: "What is your selection process?",
    answer: "Description here...",
  },
  { question: "Can I buy things online?", answer: "Description here..." },
  {
    question: "What kind of things do you sell?",
    answer: "Description here...",
  },
]);

const brandFaqs = ref([
  { question: "How can I get on your shelves?", answer: "Description here..." },
  {
    question: "How far in advance do you select brands?",
    answer: "Description here...",
  },
  {
    question: "What is The Pop Up Grocer Fund?",
    answer: "Description here...",
  },
  { question: "How long is a pop-up?", answer: "Description here..." },
  { question: "How does consignment work?", answer: "Description here..." },
]);
</script>
