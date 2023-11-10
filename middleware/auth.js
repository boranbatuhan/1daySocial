export default defineNuxtRouteMiddleware(() => {
    const user = ref(useSupabaseUser());
    if(user.value != null){
        useUserStore().getUser
        usePostsStore().getPosts
        return navigateTo("/feed")
    }

})