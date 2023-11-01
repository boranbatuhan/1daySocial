<script setup>
const post = reactive({
    vote:{
        isVote:false,
        isLike:false,
        isDislike:false,
        isFire:false
    }
})

const likeBtn =()=>{
    if(post.vote.isVote && post.vote.isLike)
    {
        post.vote.isVote = false
        post.vote.isLike = false
        post.vote.isDislike = false
        post.vote.isFire = false
    }
    else{
        post.vote.isVote = true
        post.vote.isLike = true
        post.vote.isDislike = false
        post.vote.isFire = false
    }
}
const dislikeBtn =()=>{
    if(post.vote.isVote && post.vote.isDislike)
    {
        post.vote.isVote = false
        post.vote.isLike = false
        post.vote.isDislike = false
        post.vote.isFire = false

    }
    else{
        post.vote.isVote = true
        post.vote.isLike = false
        post.vote.isDislike = true
        post.vote.isFire = false

    }
}
const fireBtn =()=>{
    if(post.vote.isVote && post.vote.isFire)
    {
        post.vote.isVote = false
        post.vote.isLike = false
        post.vote.isDislike = false
        post.vote.isFire = false

    }
    else{
        post.vote.isVote = true
        post.vote.isLike = false
        post.vote.isDislike = false
        post.vote.isFire = true

    }
}
</script>

<!-- basil icon -->
<template>
<div class="container mx-auto border my-4 py-4 flex items-center justify-start flex-col">
    <div @click="fireBtn" class="relative group">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-600 w-6 h-6 blur-md opacity-0 group-hover:opacity-100 transition-all"></span>
        <Icon :name="post.vote.isVote ==true ? post.vote.isFire ==true ? 'basil:fire-solid' : 'basil:fire-outline' : 'basil:fire-outline'" size="2rem" :class="{'!text-rose-600':post.vote.isVote==true && post.vote.isFire==true }" class="relative text-stone-50 hover:saturate-200 hover:text-rose-600 cursor-pointer" />
    </div>
    <div @click="likeBtn" class="relative group">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-blue w-6 h-6 blur-md opacity-0 group-hover:opacity-100 transition-all"></span>
        <Icon :name="post.vote.isVote ==true ? post.vote.isLike ==true ? 'basil:like-solid' : 'basil:like-outline' : 'basil:like-outline'" size="2rem" :class="{'!text-my-blue':post.vote.isVote==true && post.vote.isLike==true }" class="relative text-stone-50 hover:saturate-200 hover:text-my-blue cursor-pointer" />
    </div>
    <div @click="dislikeBtn" class="relative group">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-pink w-6 h-6 blur-md opacity-0 group-hover:opacity-100 transition-all"></span>
        <Icon :name="post.vote.isVote==true ? post.vote.isDislike==true ? 'basil:dislike-solid' : 'basil:dislike-outline' : 'basil:dislike-outline'" size="2rem" :class="{'!text-my-pink':post.vote.isVote==true && post.vote.isDislike==true }" class="relative text-stone-50 hover:saturate-200 hover:text-my-pink cursor-pointer" />
    </div>
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
    </div>
    <!-- tab nav end -->

</div>

</template>


<style>

</style>
