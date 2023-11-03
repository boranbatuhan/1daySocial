<!-- basil icon -->
<template>
<div class="container mx-auto  my-4 py-4 flex items-center justify-start flex-col">
    <!-- profile photo user info start -->
    <div class="flex  w-96 flex-wrap p-3" :class="user.theme">
        <!-- pp photo -->
        <div class="w-24 h-24 rounded-full border overflow-hidden" :class="user.theme">
            <NuxtImg draggable="false" class="w-full h-full object-cover select-none" :src="'https://cdn.ntvspor.net/a55708a61ffa4fdb9fc7d59a018a96e8.jpg?crop=0,0,940,529&w=710&h=403&mode=crop'" placeholder="/1daysocial-pink.png" />
        </div>
        <div class="flex items-start justify-center px-3 gap-7 flex-col">
            <!-- username -->
            <p class="before:content-['@']">username</p>
            <!-- thema selector -->
            <ul class="flex">
                <li class="group" @click="setTheme('!text-lime-500 !border-lime-500')"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all text-lime-500 border-lime-500 bg-lime-500"></div></li>
                <li class="group" @click="setTheme('!text-sky-500 !border-sky-500')"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all text-sky-500 border-sky-500 bg-sky-500"></div></li>
                <li class="group" @click="setTheme('!text-rose-500 !border-rose-500')"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all text-rose-500 border-rose-500 bg-rose-500"></div></li>
                <li class="group" @click="setTheme('!text-orange-500 !border-orange-500')"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all text-orange-500 border-orange-500 bg-orange-500"></div></li>
                <li class="group" @click="setTheme('!text-indigo-500 !border-indigo-500')"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all text-indigo-500 border-indigo-500 bg-indigo-500"></div></li>
                <li class="group" @click="setTheme('!text-fuchsia-500 !border-fuchsia-500')"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all text-fuchsia-500 border-fuchsia-500 bg-fuchsia-500"></div></li>
                <li class="group" @click="setTheme('!text-stone-50 !border-stone-50')"><div class="border w-8 h-5 rounded-md mx-px cursor-pointer group-hover:-translate-y-2 group-hover:border-stone-950 transition-all text-stone-50 border-stone-50 bg-stone-50"></div></li>
            </ul>
        </div>

        
        <!-- counters  -->
        <ul class="flex flex-wrap gap-3 items-center justify-between w-full px-2 my-3">
            <li class="w-full text-center" >
                <div class="shrink-0 border-b w-24 mx-auto flex items-center justify-center gap-2"  :class="user.theme" > <Icon name="basil:invoice-outline" :class="user.theme"  size="1.5rem"  class="text-white saturate-200" /><p class="!text-zinc-50"> 33</p></div>

            </li>
            <li class="text-center">
                <p class="shrink-0 border-b w-24"><Icon size="1.5rem" name="basil:lightning-alt-outline" class="text-yellow-500 saturate-200" /> 0.82</p>
                <p class="shrink-0"> <Icon name="basil:check-solid" size="1.5rem"  class="text-lime-500 saturate-200" /> 15 <span class="text-xs opacity-50">/ 33</span></p>
                <p class="shrink-0"> <Icon name="basil:cross-solid" size="1.5rem"  class="text-red-500 saturate-200" /> 21 <span class="text-xs opacity-50">/ 33</span></p>
               
            </li>
            <li class="text-center">
                <p class="shrink-0 border-b w-24"><Icon size="1.5rem" name="basil:lightning-alt-outline" class="text-yellow-500 saturate-200" /> 3.4</p>
                <p class="shrink-0"> <Icon name="basil:like-outline" size="1.5rem"  class="text-my-blue saturate-200" /> 15</p>
                <p class="shrink-0"> <Icon name="basil:dislike-outline" size="1.5rem"  class="text-my-pink saturate-200" /> 4</p>
            </li>


        </ul>
    </div>
    <!-- profile photo user info end -->


    <!-- tab nav start -->
    <div class="flex w-96 items-center justify-between text-xl">
        <div :class="[user.theme,{'border-b':selectedTab=='All'}]" @click="selectTab('All')" class="shrink-0 h-10 cursor-pointer w-1/4 text-center hover:bg-stone-800 py-1 group"><Icon size="2rem" name="basil:rows-solid" class="group-hover:hidden inline"/> <p class="hidden group-hover:inline">All</p> </div>
        <div :class="[user.theme,{'border-b':selectedTab=='Accepted'}]" @click="selectTab('Accepted')" class="shrink-0 h-10 cursor-pointer w-1/4 text-center hover:bg-stone-800 py-1 group"><Icon size="2rem" name="basil:check-solid" class="group-hover:hidden inline"/> <p class="hidden group-hover:inline">Accepted</p> </div>
        <div :class="[user.theme,{'border-b':selectedTab=='Deleted'}]" @click="selectTab('Deleted')" class="shrink-0 h-10 cursor-pointer w-1/4 text-center hover:bg-stone-800 py-1 group"><Icon size="2rem" name="basil:cross-solid" class="group-hover:hidden inline"/> <p class="hidden group-hover:inline">Deleted</p> </div>
        <div :class="[user.theme,{'border-b':selectedTab=='Fire'}]" @click="selectTab('Fire')" class="shrink-0 h-10 cursor-pointer w-1/4 text-center hover:bg-stone-800 py-1 group"><Icon size="2rem" name="basil:fire-solid" class="group-hover:hidden inline"/> <p class="hidden group-hover:inline">Fire</p> </div>
    </div>
    <!-- tab nav end -->

    <!-- posts container start -->
    <div class="max-w-xl px-3 py-2  my-3">
        <ul>
            <li v-for="post in posts" :key="post.id" class="my-3">
                <post :post="post" />
            </li>
        </ul>
    </div>
    <!-- posts container end -->

</div>

</template>
<script setup>
const posts = computed(()=>{
    return usePostsStore().getPost
})
const user = computed(()=>{
    return useUserStore().getUser
})
const userStore = useUserStore()

const selectedTab =ref("")
const selectTab=(tabName)=>{
    if(selectedTab.value==tabName){
        selectedTab.value=""
    }
    else{
        selectedTab.value=tabName
    }
}

const setTheme =(theme)=>{
    userStore.setTheme(theme)
}

</script>

<style>

</style>
