import { ref } from 'vue'
import type { Ref } from 'vue'   // <-- type-only import
import { useState } from '#app'

export const usePageLoader = () => {
    const isLoading: Ref<boolean> = useState('pageLoading', () => true)

    const startLoading = (): void => {
        isLoading.value = true
    }

    const finishLoading = (): void => {
        isLoading.value = false
    }

    return { isLoading, startLoading, finishLoading }
}
