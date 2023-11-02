
<template>
    <p class="text-3xl">{{props.post.id}}</p>
    <p class="text-3xl">{{(post.timer/1000).toFixed(0)}}</p>
    
    <div class=" border rounded-lg max-w-lg relative" :class="user.theme">
        <p class="absolute top-1 left-3 text-xs select-none">{{dateFormat(props.post.date)}}</p>
    <div class="absolute top-1 right-1">
        <div @click="fireBtn(props.post.id)" class="relative group w-fit h-fit  cursor-pointer" >
            <span  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-600 group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
            <Icon :name="post.vote.isFire ==true ? 'basil:fire-solid' : 'basil:fire-outline'" size="2rem" :class="{'!text-rose-600': post.vote.isFire==true }" class="relative text-stone-50 group-hover:saturate-200 group-hover:text-rose-600" />
        </div>
    </div>
        <div class="pb-3 pt-6 px-6">
            <p class="before:content-['@'] select-none cursor-pointer w-fit hover:underline">{{props.post.author}}</p>
            <p class="!text-white text-justify py-2">{{props.post.content}}</p>
        </div>

        
        <div class="w-full h-fit mt-2 p-0  overflow-hidden group flex items-end justify-between " :class="user.theme">
        <p :class="{'opacity-50':post.timer<=0}" class=" text-xs select-none ml-3">{{dateFormat(props.post.date)}}</p>
        <p :class="{'opacity-50':post.timer>0}"  class=" text-xs select-none ml-3">{{dateFormat(props.post.finaldate)}}</p>
            
        </div>
        <div class="w-full h-fit mt-2 p-0  overflow-hidden group flex items-start justify-start " :class="user.theme">
        <input type="range" class="w-full h-2 m-0 p-0 select-none pointer-events-none outline-none border-0 ring-0" :min="props.post.date" :max="props.post.finaldate" :value="props.post.finaldate - post.timer">
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
    },
    timer:0,
    timeLeft:props.post.finaldate - Date.now()
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


const dateFormat = (time)=>{
    // 3m 600k =1saat
    var date = new Date(time)
    
    var fullDate = date.getDate()+
    "/"+(date.getMonth()+1)+
    "/"+date.getFullYear()+
    " "+date.getHours()+
    ":"+date.getMinutes()
    
    
    return  fullDate
}
const timer = setInterval(() => {
    post.timer=props.post.finaldate - Date.now()
    if(props.post.finaldate - Date.now() <=0)
    {
        post.timer=0
        clearInterval(timer)
    }
}, 1000);

</script>
<style>
input[type=range] {
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: rgb(9, 9, 11);
  border-radius: 0px;
  border: 0px solid #000000;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 0px 0px 1px rgb(9, 9, 11);
  border: 0px solid rgb(9, 9, 11);
  height: 8px;
  width: 8px;
  border-radius: 1px;
  background: #9bfb00;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: 0px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: rgb(9, 9, 11);
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: rgb(9, 9, 11);
  border-radius: 0px;
  border: 0px solid #000000;
}
input[type=range]::-moz-range-thumb {
  height: 8px;
  width: 8px;
  border-radius: 1px;
  background: #9bfb00;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  animate: 0.2s;
  background: rgb(9, 9, 11);
  border-color: rgb(9, 9, 11);
  color: rgb(9, 9, 11);
}
input[type=range]::-ms-fill-lower {
  background: rgb(9, 9, 11);
  border: 0px solid #000000;
  border-radius: 0px;
  box-shadow: 0px 0px 0px #000000;
}
input[type=range]::-ms-fill-upper {
  background: rgb(9, 9, 11);
  border: 0px solid #000000;
  border-radius: 0px;
  box-shadow: 0px 0px 0px #000000;
}
input[type=range]::-ms-thumb {
  box-shadow: 0px 0px 1px rgb(9, 9, 11);
  border: 0px solid rgb(9, 9, 11);
  height: 8px;
  width: 8px;
  border-radius: 1px;
  background: #9bfb00;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: rgb(9, 9, 11);
}
input[type=range]:focus::-ms-fill-upper {
  background: rgb(9, 9, 11);
}
</style>