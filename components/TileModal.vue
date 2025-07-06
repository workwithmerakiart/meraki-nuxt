<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/75 z-50 flex justify-center items-center p-4"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'Dialog'"
      @click.self="close"
    >
      <div
        ref="modalPanel"
        tabindex="-1"
        class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-full overflow-y-auto relative modal-panel focus:outline-none custom-scrollbar"
      >
        <div class="sticky top-0 z-10 flex justify-end bg-white p-4 border-b">
          <button
            @click="close"
            class="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close dialog"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="pt-4 px-6 pb-6">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close']);
const modalPanel = ref(null);

const close = () => emit('close');

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.show) {
    close();
  }
};

watch(() => props.show, (newVal) => {
  if (typeof document === 'undefined') return;

  if (newVal) {
    window.addEventListener('keydown', handleKeydown);
    nextTick(() => {
      modalPanel.value?.focus();
    });
  } else {
    window.removeEventListener('keydown', handleKeydown);
  }
});

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown);
  }
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 8px;
  border: 2px solid #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}
</style>
