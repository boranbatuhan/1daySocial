<template>
    <div class="p-4 border rounded-lg">
        <p class="text-3xl">{{props.post.id}}</p>
    <ul>
        <li class="flex gap-4 items-center justify-start">
            <div @click="fireBtn(props.post.id)" class="relative group w-fit">
                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-600 group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
                <Icon :name="post.vote.isFire ==true ? 'basil:fire-solid' : 'basil:fire-outline'" size="2rem" :class="{'!text-rose-600': post.vote.isFire==true }" class="relative text-stone-50 hover:saturate-200 hover:text-rose-600 cursor-pointer" />
            </div>
            <p>{{props.post.fire}}</p>
        </li>
        <li class="flex gap-4 items-center justify-start">
            <div @click="likeBtn(props.post.id)" class="relative group w-fit">
                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-blue group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
                <Icon :name="userStore.checkPostFunc(props.post.id,'like') ==true ? 'basil:like-solid' : 'basil:like-outline'" size="2rem" :class="{'!text-my-blue':userStore.checkPostFunc(props.post.id,'like') }" class="relative text-stone-50 hover:saturate-200 hover:text-my-blue cursor-pointer" />
            </div>
            <p>{{props.post.likes}}</p>
        </li>
        <li class="flex gap-4 items-center justify-start">
            <div @click="dislikeBtn(props.post.id)" class="relative group w-fit">
                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-pink group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
                <Icon :name="userStore.checkPostFunc(props.post.id,'dislike')==true ? 'basil:dislike-solid' : 'basil:dislike-outline' " size="2rem" :class="{'!text-my-pink':userStore.checkPostFunc(props.post.id,'dislike') }" class="relative text-stone-50 hover:saturate-200 hover:text-my-pink cursor-pointer" />
            </div>
            <p>{{props.post.dislikes}}</p>
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
        isLike:false,
        isDislike:false,
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

<style lang="scss" scoped>

</style>