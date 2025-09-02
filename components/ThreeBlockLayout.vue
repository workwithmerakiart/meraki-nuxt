<script setup>
import HeroBlock from '@/components/blocks/HeroBlock.vue'
import TextLeftImageRight from '@/components/blocks/TextLeftImageRight.vue'
import ImageLeftTextRight from '@/components/blocks/ImageLeftTextRight.vue'

defineProps({
    // Expect an array of objects; each needs a `type` plus props for that block
    blocks: { type: Array, required: true },
})

const map = {
    hero: HeroBlock,
    'text-left-image-right': TextLeftImageRight,
    'image-left-text-right': ImageLeftTextRight,
}

function passProps(block) {
    const { type, ...rest } = block || {}
    return rest
}
</script>

<template>
    <div>
        <component v-for="(block, i) in blocks" :key="i" :is="map[block.type]" v-bind="passProps(block)" />
    </div>
</template>
