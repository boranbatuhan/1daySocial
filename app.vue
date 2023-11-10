<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>
<script setup>

const router = useRouter()
const route = useRoute()
onMounted(()=>{
  if(route.name != 'index')
  {
    useUserStore().getUser
    usePostsStore().getPosts
  }
})

</script>