<template>
    <div class="flex flex-col items-center">
        <div v-if="error" class="text-red-500 text-center py-4">{{ error }}</div>

        <div v-else class="grid grid-cols-3 gap-2 sm:gap-4 w-full px-2 sm:px-4 md:px-16">
            <div v-for="media in mediaData" :key="media.id"
                class="relative aspect-square overflow-hidden group cursor-pointer">
                <a :href="media.permalink" target="_blank" rel="noopener noreferrer" class="block w-full h-full">
                    <!-- Image -->
                    <img v-if="media.media_type === 'IMAGE' || media.media_type === 'CAROUSEL_ALBUM'"
                        :src="media.thumbnail_url || media.media_url" :alt="media.caption"
                        class="w-full h-full object-cover" />

                    <!-- Video -->
                    <video v-if="media.media_type === 'VIDEO' || media.media_type === 'REELS'" controls
                        class="w-full h-full object-cover">
                        <source :src="media.media_url" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <!-- Hover Overlay -->
                    <div
                        class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-2">
                        <span class="text-white text-xl">
                            <i class="mdi mdi-instagram"></i>
                        </span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mediaData = ref([])
const error = ref(null)

const fetchInstagramFeed = async () => {
    const accessToken =
        'IGQWRQVEttMU1keDltaFhQQ0JoaXlGOFZAyU0F5dFVRbTV6bjFmWENQQkt4UGN6cFdDS2dhZATVVUmlrRUhVWFhEODVsLUl0NzJGcXBQa3dxQ2R1aGVYaVJ5OE50aVNPd1RUa1B1U0xkMkZAMdTFyNGlveGFBQzBzRUUZD'
    const userId = '8018514724911910'
    const apiUrl = `https://graph.instagram.com/${userId}/media?fields=id,media_type,media_url,permalink,thumbnail_url,caption&access_token=${accessToken}`

    try {
        const response = await fetch(apiUrl)
        const data = await response.json()

        if (response.ok) {
            mediaData.value = data.data?.slice(0, 9) || []
        } else {
            throw new Error(data.error?.message || 'Failed to fetch Instagram data')
        }
    } catch (err) {
        error.value = err.message
        console.error(err)
    }
}

onMounted(fetchInstagramFeed)
</script>

<style scoped>
/* Optionally import Material Design Icons if not already available globally */
@import url("https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css");
</style>
