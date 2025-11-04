import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(({ $pinia }) => {
    // Runs only on client because of the .client.ts suffix
    $pinia.use(piniaPluginPersistedstate)
})