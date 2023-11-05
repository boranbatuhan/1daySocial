<!-- basil icon -->
<template>
<div class="container mx-auto  my-4 py-4 flex items-center justify-start flex-col">

    <!-- edit modal start -->
    <div v-if="openEditModal" class="w-screen h-screen flex items-center justify-center bg-stone-950/70 fixed z-[99999] top-0 left-0 ">
        
        <div class="bg-stone-950 w-96 py-5 rounded-lg  border flex flex-col items-center justify-center gap-4">
            <div class="w-24 h-24 rounded-full border overflow-hidden" :class="user.theme">
                <label for="imgcontainer" class="cursor-pointer group relative">
                    <div class="bg-stone-800/60 w-full h-full absolute invisible group-hover:visible flex items-center justify-center" >
                        <Icon :class="user.theme" class="drop-shadow-lg" name="basil:upload-outline" size="3rem"/>
                    </div>
                    <input type="file" id="imgcontainer" class="hidden" @change="changePhoto($event)">
                    <NuxtImg draggable="false" class="w-full h-full object-cover select-none" :src="photoTemp" placeholder="/1daysocial-pink.png" />
                </label>
            </div>
            <label  for="idtemp" class="before:content-['@'] " :class="user.theme">
                <input type="text" id="idtemp" class="bg-transparent underline focus:underline-offset-8 outline-none border-y border-r border-transparent focus:border-inherit pr-2 py-1 rounded-lg" v-model="usernameTemp">
            </label>

            <!-- buttons -->
            <div class="w-full flex flex-row items-center justify-around">
                <div @click="saveChanges" class="flex items-center justify-center w-32 bg-green-500 px-4 rounded-lg select-none cursor-pointer hover:bg-green-700">
                    <Icon name="basil:check-solid" size="2rem" />
                    <p>Save</p>
                </div>
                <div @click="discardChanges" class="flex items-center justify-center w-32 bg-red-500 px-4 rounded-lg select-none cursor-pointer hover:bg-red-700">
                    <Icon name="basil:cross-solid" size="2rem" />
                    <p>Close</p>
                </div>
            </div>
        </div>
    </div>
    <!-- edit modal end -->
    <!-- profile photo user info start -->
    <div class="flex  w-96 flex-wrap p-3  relative" :class="user.theme">
        <div @click="openEditModal=true" class=" saturate-200 absolute top-1 right-1 group cursor-pointer">
            <Icon :class="user.theme" name="basil:settings-alt-outline" size="1.5rem"  class="group-hover:rotate-180 transition-all duration-500" />
        </div>
        <!-- pp photo -->
        <div class="w-24 h-24 rounded-full border overflow-hidden" :class="user.theme">
            <NuxtImg draggable="false" class="w-full h-full object-cover select-none" :src="user.photo" placeholder="/1daysocial-pink.png" />
        </div>
        <div class="flex items-start justify-center px-3 gap-7 flex-col">
            <!-- username -->
            <p class="before:content-['@']">{{user.username}}</p>
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
        <!-- all post start -->
        <ul v-if="selectedTab == 'All'">
            <li v-for="post in posts" :key="post.id" class="my-3">
                <post :post="post" />
            </li>
        </ul>
        <!-- all post end -->

        <!-- accepted post start -->
        <ul v-if="selectedTab == 'Accepted'">
            <li v-for="postA in postsAccepted" :key="postA.id" class="my-3">
                <post :post="postA" />
            </li>
        </ul>
        <!-- accepted post end -->
        
        <!-- not accepted post start -->
        <ul v-if="selectedTab == 'Deleted'">
            <li v-for="postD in postsDeleted" :key="postD.id" class="my-3">
                <post :post="postD" />
            </li>
        </ul>
        <!-- not accepted post end -->
    </div>
    <!-- posts container end -->
</div>

</template>
<script setup>

// user posts
const posts = computed(()=>{
    let tempPosts = usePostsStore().getUserPosts.sort((a,b) => b.date - a.date)
    tempPosts = tempPosts.sort((a,b) => b.isAccepted - a.isAccepted)
    return tempPosts
})

// user accepted posts after countdown
const postsAccepted = computed(()=>{
    const tempPosts = usePostsStore().getUserAcceptedPosts.sort((a,b) => b.date - a.date)
    return tempPosts
})

// user not accepted posts after countdown
const postsDeleted = computed(()=>{
    const tempPosts = usePostsStore().getUserDeletedPosts.sort((a,b) => b.date - a.date)
    return tempPosts
})
// user informations 
const user = computed(()=>{
    return useUserStore().getUser
})

// user store
const userStore = useUserStore()

// edit modal toggle
const openEditModal=ref(false)
// selected tab 
const selectedTab =ref("All")
// for pp 
const photoTemp = ref(user.value.photo)
// for username
const usernameTemp = ref(user.value.username)

// tab selector
const selectTab=(tabName)=>{
    if(selectedTab.value==tabName){
        if(selectedTab.value=="All")
        {
            selectedTab.value="All"
        }
        else{
            selectedTab.value="All"
        }
    }
    else{
        selectedTab.value=tabName
    }
}

// set color theme
const setTheme =(theme)=>{
    userStore.setTheme(theme)
}

// change photo 
const changePhoto= event=>{
    const photoLink =  URL.createObjectURL(event.target.files[0])
    photoTemp.value=photoLink
}

// save edits
const saveChanges =()=>{
    userStore.updatePhoto(photoTemp.value)
    userStore.updateUsername(usernameTemp.value)
    openEditModal.value=false
}

// cancel edits
const discardChanges =()=>{
    
    usernameTemp.value=user.value.username
    photoTemp.value=user.value.photo
    openEditModal.value=false
}
</script>

<style>

</style>
