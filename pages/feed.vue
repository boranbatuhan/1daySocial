<template>
    <div class="container mx-auto pb-7 ">
        <ul class="flex flex-col items-center justify-start" v-auto-animate>
            <li class=" !bg-stone-950 z-[99] rounded-lg">
               <new-post/> 
               <div class="bg-gradient-to-b from-stone-950 to-transparent w-full h-8"></div>
            </li>
            <li class="w-[32rem] h-8 group sticky top-0 z-[99999]"  >
                <div v-if="y>250" @click="scrollTop" class="bg-stone-950 border-b border-stone-800 group-hover:bg-stone-700 w-full h-8  cursor-pointer flex items-center justify-center">
                    <Icon name="basil:caret-up-solid" size="2rem"/>
                </div>
            </li>
            <li v-for="post in posts" :key="post.id" class=" my-2" >
                <post :post="post" />
            </li>

        </ul>
    </div>
</template>

<script setup>
definePageMeta({
    middleware:"after-auth"
})
onMounted(()=>{
    useUserStore().getUser
    usePostsStore().setPostsFromDB()
    usePostsStore().getPosts
})

import { useWindowScroll } from '@vueuse/core'
const client = useSupabaseClient()
const { x, y } = useWindowScroll()

const posts = computed(()=>{
    let tempPosts = usePostsStore().getPosts.sort((a,b) => b.date - a.date)
    tempPosts = tempPosts.filter(i=> i.isCountdown || i.isAccepted)
    return tempPosts
})

const scrollTop=()=>{
    window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
}

</script>

<style lang="scss" scoped>

</style>