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
      <div ref="modalPanel" tabindex="-1" class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto relative modal-panel focus:outline-none">
        <button @click="close" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close dialog">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div class="pt-12 px-6 pb-6">
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
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  opacity: 0;
  transform: scale(0.95);
}
</style>