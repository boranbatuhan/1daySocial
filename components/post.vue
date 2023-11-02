
<template>
    <p class="text-3xl">{{props.post.id}}</p>
    <div class=" border rounded-lg max-w-lg relative" :class="user.theme">
    <div class="absolute top-1 right-1">
        <div @click="fireBtn(props.post.id)" class="relative group w-fit h-fit  cursor-pointer" >
            <span  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-600 group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
            <Icon :name="post.vote.isFire ==true ? 'basil:fire-solid' : 'basil:fire-outline'" size="2rem" :class="{'!text-rose-600': post.vote.isFire==true }" class="relative text-stone-50 group-hover:saturate-200 group-hover:text-rose-600" />
        </div>
    </div>
        <div class="p-3">
            <p class="before:content-['@'] select-none cursor-pointer w-fit">{{props.post.author}}</p>
            <p class="!text-white text-justify py-2">{{props.post.content}}</p>
        </div>

    <div class="w-full h-1 mt-2 bg-white/50 relative overflow-hidden group ">
        <div class="w-full h-1 bg-green-500 group-hover:bg-red-500 saturate-200 right-[0%] group-hover:right-[100%] absolute transition-all duration-1000" >
        </div>
    </div>
    <ul class="flex gap-4  p-2  w-full" :class="user.theme" >
        <li class="flex gap-1 items-center justify-start">
            <div @click="likeBtn(props.post.id)" class="relative group w-fit">
                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-blue group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
                <Icon :name="userStore.checkPostFunc(props.post.id,'like') ==true ? 'basil:like-solid' : 'basil:like-outline'" size="2rem" :class="{'!text-my-blue':userStore.checkPostFunc(props.post.id,'like') }" class="relative text-stone-50 hover:saturate-200 hover:text-my-blue cursor-pointer" />
            </div>
            <p class="font-bold select-none text-my-blue">{{props.post.likes.length}}</p>
        </li>
        <li class="flex gap-1 items-center justify-start">
            <div @click="dislikeBtn(props.post.id)" class="relative group w-fit">
                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-pink group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
                <Icon :name="userStore.checkPostFunc(props.post.id,'dislike')==true ? 'basil:dislike-solid' : 'basil:dislike-outline' " size="2rem" :class="{'!text-my-pink':userStore.checkPostFunc(props.post.id,'dislike') }" class="relative text-stone-50 hover:saturate-200 hover:text-my-pink cursor-pointer" />
            </div>
            <p class="font-bold select-none text-my-pink">{{props.post.dislikes.length}}</p>
        </li>
    </ul>
    

</div>
</template>
<script setup>
const postsStore = usePostsStore()
const user = useUserStore().getUser
const userStore = useUserStore()

const props = defineProps({
    post:Object
})
const post = reactive({
    vote:{
        isVote:false,

        isFire:false
    }
})

const fireBtn =(postid)=>{
    if(post.vote.isFire)
    {
        post.vote.isFire = false
    }
    else{
        post.vote.isFire = true
    }
}
const likeBtn =(postid)=>{
    postsStore.postLike(postid,user.userid)
}
const dislikeBtn =(postid)=>{
    postsStore.postDislike(postid,user.userid)
}

</script>
