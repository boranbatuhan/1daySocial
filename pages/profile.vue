<script setup>
const posts = usePostsStore().getPost
const user = useUserStore().getUser
const userStore = useUserStore()

</script>

<!-- basil icon -->
<template>
<div class="container mx-auto border my-4 py-4 flex items-center justify-start flex-col">
    <p>{{user.name}}</p>
    <p>{{user.userid}}</p>
    <p>{{user.posts}} - {{user.posts.length}}</p>
    <p>{{user.liked}} - {{user.liked.length}}</p>
    <p>{{user.disliked}} - {{user.disliked.length}}</p>
        <ul>
            <li v-for="post in posts" :key="post.id" class="my-3">
                <post :post="post" />
            </li>
        </ul>
    <!-- profile photo user info start -->
    <div class="flex border w-96 flex-wrap">
        <!-- pp photo -->
        <div class="w-24 h-24 rounded-full border overflow-hidden">
            <NuxtImg draggable="false" class="w-full h-full object-cover select-none" :src="'https://cdn.ntvspor.net/a55708a61ffa4fdb9fc7d59a018a96e8.jpg?crop=0,0,940,529&w=710&h=403&mode=crop'" placeholder="/1daysocial-pink.png" />
        </div>
        <div class="flex items-start justify-center px-3 gap-7 flex-col">
            <!-- username -->
            <p class="before:content-['@']">username</p>
            <!-- thema selector -->
            <ul class="flex">
                <li class="group"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all border-lime-500 bg-lime-500"></div></li>
                <li class="group"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all border-sky-500 bg-sky-500"></div></li>
                <li class="group"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all border-rose-500 bg-rose-500"></div></li>
                <li class="group"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all border-orange-500 bg-orange-500"></div></li>
                <li class="group"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all border-indigo-500 bg-indigo-500"></div></li>
                <li class="group"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all border-fuchsia-500 bg-fuchsia-500"></div></li>
                <li class="group"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all border-stone-50 bg-stone-50"></div></li>
            </ul>
        </div>
        <!-- counters  -->
        <ul class="flex flex-wrap gap-3 items-center justify-between w-full px-2 my-3">
            <li class="w-full">
                <p class="shrink-0">post: 33</p>
            </li>
            <li class="text-center">
                <p class="shrink-0 border-b w-24">Rate 0.82</p>
                <p class="shrink-0">accepted: 15</p>
                <p class="shrink-0">deleted: 18</p>
            </li>
            <li class="text-center">
                <p class="shrink-0 border-b w-24">Rate 3.2</p>
                <p class="shrink-0">like: 2304</p>
                <p class="shrink-0">dislike: 742</p>
            </li>


        </ul>
    </div>
    <!-- profile photo user info end -->


    
    <!-- tab nav start -->
    <div class="flex">
        <p>All</p>
        <p>Accepted</p>
        <p>Deleted</p>
        <p>Fire</p>
    </div>
    <!-- tab nav end -->

</div>

</template>


<style>

</style>
