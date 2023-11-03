<template>
    <div class="container mx-auto pb-7 ">
        <ul class="flex flex-col items-center justify-start">
            <li class="sticky top-0 !bg-stone-950 z-[99] rounded-lg">
               <new-post/> 
               <div class="bg-gradient-to-b from-stone-950 to-transparent w-full h-8"></div>
            </li>
            <li v-for="post in posts" :key="post.id" class=" my-2">
                <post :post="post" />
            </li>
        </ul>
    </div>
</template>

<script setup>
const posts = computed(()=>{
    return usePostsStore().getPost
})
</script>

<style lang="scss" scoped>

</style>