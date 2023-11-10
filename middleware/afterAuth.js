export default defineNuxtRouteMiddleware(() => {
    const user = ref(useSupabaseUser)
    if(user.value == null)
    {
        return navigateTo("/")
    }
})