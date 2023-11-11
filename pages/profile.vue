<!-- basil icon -->
<template>
<div v-if="usersb"  class="container mx-auto  py-4 flex items-center justify-start flex-col">

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
    <div  class="flex  w-96 flex-wrap p-3  relative" :class="user.theme">
        <div @click="openEditModal=true" class=" saturate-200 absolute top-1 right-1 group cursor-pointer">
            <Icon :class="user.theme" name="basil:settings-alt-outline" size="1.5rem"  class="group-hover:rotate-180 transition-all duration-500" />
        </div>
        <!-- pp photo -->
        <div  class="w-24 h-24 rounded-full border overflow-hidden" :class="user.theme">
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
            <li class="w-full text-center relative group" >
                <span class="absolute -bottom-10 px-2 py-1 w-32 bg-stone-800 rounded-lg right-1/2 translate-x-1/2 border border-stone-950 text-center text-white invisible group-hover:visible"><p>Post Counts</p></span>

                <div class="shrink-0 border-b w-24 mx-auto flex items-center justify-center gap-2"  :class="user.theme" > <Icon name="basil:invoice-outline" :class="user.theme"  size="1.5rem"  class="text-white saturate-200" /><p class="!text-zinc-50"> {{user.posts.length}}</p></div>
                <p class="shrink-0"> <Icon name="basil:clock-outline" size="1.5rem"  class="text-stone-200 saturate-200" /> 1 <span class="text-xs opacity-50">/ {{user.posts.length}}</span></p>

            </li>
            <li class="text-center relative group">
                <span class="absolute -top-10 px-2 py-1 w-32 bg-stone-800 rounded-lg right-1/2 translate-x-1/2 border border-stone-950 text-center text-white invisible group-hover:visible"><p>Accept Counts</p></span>
                <p class="shrink-0 border-b w-24"><Icon size="1.5rem" name="basil:lightning-alt-outline" class="text-yellow-500 saturate-200" /> 0.82</p>
                <p class="shrink-0"> <Icon name="basil:check-solid" size="1.5rem"  class="text-lime-500 saturate-200" /> 15 <span class="text-xs opacity-50">/ 33</span></p>
                <p class="shrink-0"> <Icon name="basil:cross-solid" size="1.5rem"  class="text-red-500 saturate-200" /> 21 <span class="text-xs opacity-50">/ 33</span></p>
               
            </li>
            <li class="text-center relative group">
                <span class="absolute -top-10 px-2 py-1 w-32 bg-stone-800 rounded-lg right-1/2 translate-x-1/2 border border-stone-950 text-center text-white invisible group-hover:visible"><p>Like Counts</p></span>
                <p class="shrink-0 border-b w-24"><Icon size="1.5rem" name="basil:lightning-alt-outline" class="text-yellow-500 saturate-200" /> 3.4</p>
                <p class="shrink-0"> <Icon name="basil:like-outline" size="1.5rem"  class="text-my-blue saturate-200" /> 15</p>
                <p class="shrink-0"> <Icon name="basil:dislike-outline" size="1.5rem"  class="text-my-pink saturate-200" /> 4</p>
            </li>


        </ul>
    </div>
    <!-- profile photo user info end -->


    <!-- tab nav start -->
    <div class="flex w-[32rem] items-center justify-between text-xl" v-auto-animate>
        <div :class="[user.theme,{'border-b':selectedTab=='All'}]" @click="selectTab('All')" class="shrink-0 h-10 cursor-pointer w-1/5 text-center hover:bg-stone-800 py-1 group"><Icon size="2rem" name="basil:rows-outline" class="group-hover:hidden inline"/> <p class="hidden group-hover:inline">All</p> </div>
        <div :class="[user.theme,{'border-b':selectedTab=='Accepted'}]" @click="selectTab('Accepted')" class="shrink-0 h-10 cursor-pointer w-1/5 text-center hover:bg-stone-800 py-1 group"><Icon size="2rem" name="basil:check-outline" class="group-hover:hidden inline"/> <p class="hidden group-hover:inline">Accepted</p> </div>
        <div :class="[user.theme,{'border-b':selectedTab=='Deleted'}]" @click="selectTab('Deleted')" class="shrink-0 h-10 cursor-pointer w-1/5 text-center hover:bg-stone-800 py-1 group"><Icon size="2rem" name="basil:cross-outline" class="group-hover:hidden inline"/> <p class="hidden group-hover:inline">Deleted</p> </div>
        <div :class="[user.theme,{'border-b':selectedTab=='Liked'}]" @click="selectTab('Liked')" class="shrink-0 h-10 cursor-pointer w-1/5 text-center hover:bg-stone-800 py-1 group"><Icon size="2rem" name="basil:like-outline" class="group-hover:hidden inline"/> <p class="hidden group-hover:inline">liked</p> </div>
        <div :class="[user.theme,{'border-b':selectedTab=='Disliked'}]" @click="selectTab('Disliked')" class="shrink-0 h-10 cursor-pointer w-1/5 text-center hover:bg-stone-800 py-1 group"><Icon size="2rem" name="basil:dislike-outline" class="group-hover:hidden inline"/> <p class="hidden group-hover:inline">disliked</p> </div>
    </div>
    <!-- tab nav end -->

    <!-- posts container start -->
    <div class="max-w-xl px-3 py-2  my-3">
        <!-- all post start -->
        <ul v-if="selectedTab == 'All'" v-auto-animate>
            <li v-for="post in userPosts" :key="post.id" class="my-3">
                <post :post="post" />
            </li>
        </ul>
        <!-- all post end -->
        
        <!-- accepted post start -->
        <ul v-if="selectedTab == 'Accepted'" v-auto-animate>
                <li v-for="post in userAcceptedPosts" :key="post.id" class="my-3">
                    <post-mini :post="post" />
                </li>
            </ul>
            <!-- accepted post end -->
            
            <!-- not accepted post start -->
            <ul v-if="selectedTab == 'Deleted'" v-auto-animate>
                <li v-for="post in userDeletedPosts" :key="post.id" class="my-3">
                    <post-mini :post="post" />
                </li>
                
        </ul>
        <!-- not accepted post end -->

        <!-- my liked posts start -->
        <ul v-if="selectedTab == 'Liked'" v-auto-animate>
            <li v-for="likedpost in likedPosts" :key="likedpost.id" class="my-3">
                <post-mini :post="likedpost[0]" />
            </li>
        </ul>
        <!-- my liked posts end -->

        <!-- my disliked posts start -->
        <ul v-if="selectedTab == 'Disliked'" v-auto-animate>
            <li v-for="dislikedpost in dislikedPosts" :key="dislikedpost.id" class="my-3">
                <post-mini :post="dislikedpost[0]" />
            </li>
        </ul>
        <!-- my disliked posts end -->
    </div>
    <!-- posts container end -->
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
    usePostsStore().getUserPosts
    useUserStore().getLikedPosts
    useUserStore().getDislikedPosts
})


const usersb = useSupabaseUser()
// user informations 
const user = computed(()=>{
    return useUserStore().getUser
})
// user posts
const userPosts = computed(()=>{
    let tempPosts = usePostsStore().getUserPosts
    tempPosts = tempPosts.sort((a,b) => b.date - a.date)
    return tempPosts
})
const userAcceptedPosts = computed(()=>{
    let tempAcceptedPosts = userPosts.value
    tempAcceptedPosts = tempAcceptedPosts.sort((a,b) => b.date - a.date)
    tempAcceptedPosts = tempAcceptedPosts.filter((a) => a.isAccepted)
    return tempAcceptedPosts
})
const userDeletedPosts = computed(()=>{
    let tempDeletedPosts = userPosts.value
    tempDeletedPosts = tempDeletedPosts.sort((a,b) => b.date - a.date)
    tempDeletedPosts = tempDeletedPosts.filter((a) => !a.isAccepted)
    return tempDeletedPosts
})

const likedPosts = computed(()=>{
    let likedTempPosts = useUserStore().getLikedPosts
    likedTempPosts = likedTempPosts.sort((a,b) => b.date - a.date)
    return likedTempPosts
})
const dislikedPosts = computed(()=>{
    let dislikedTempPosts = useUserStore().getDislikedPosts
    dislikedTempPosts = dislikedTempPosts.sort((a,b) => b.date - a.date)
    return dislikedTempPosts
})




const userStore = useUserStore() // user store
const openEditModal=ref(false) // edit modal toggle
const selectedTab =ref("All") // selected tab 
const photoTemp = ref(user.value.photo) // for pp 

// scroll top
const scrollTop=()=>{
    window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
}

// tab selector
const selectTab=(tabName)=>{
    if(selectedTab.value==tabName){
        if(selectedTab.value=="All")
        {
            selectedTab.value="All"
            scrollTop()
        }
        else{
            selectedTab.value="All"
            scrollTop()
        }
    }
    else{
        scrollTop()
        selectedTab.value=tabName
    }
}




// set color theme
const setTheme =(theme)=>{
    userStore.setTheme(theme)
    useUserStore().getUser
}

// change photo 
const changePhoto= event=>{
    const photoLink =  URL.createObjectURL(event.target.files[0])
    photoTemp.value=photoLink
}

// save edits
const saveChanges =()=>{
    userStore.updatePhoto(photoTemp.value)
    openEditModal.value=false
}

// cancel edits
const discardChanges =()=>{
    photoTemp.value=user.value.photo
    openEditModal.value=false
}

</script>

<style>

</style>
