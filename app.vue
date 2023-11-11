<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>
<script setup>

const router = useRouter()
const route = useRoute()
onMounted(()=>{
  if(route.name != 'login' || route.name != 'index')
  {
    useUserStore().getUser
    usePostsStore().setPostsFromDB()
    usePostsStore().getPosts
    console.log("aaaaaaaaaaaaaaaaaaa")

  }
})
router.beforeResolve((to,from,next)=>{

  if(to.name != 'login' || to.name != 'index')
  {
    useUserStore().getUser
    usePostsStore().setPostsFromDB()
    usePostsStore().getPosts

  }
  next()
})


</script>