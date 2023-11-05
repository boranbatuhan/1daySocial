<template>

    <!-- POST CARD START -->
    <div class=" border rounded-lg max-w-lg w-[32rem]  relative" :class="[props.post.theme ,{'!opacity-40 translate-x-10' : props.post.countdown == false && !props.post.isAccepted}]">
      <!-- post add date    -->
      <p class="absolute top-1 left-3 text-xs select-none">{{dateFormat(props.post.date)}}</p>
      <!-- button fire start -->
      <div class="absolute top-1 right-1">
        <div @click="fireBtn(props.post.id)" class="relative group w-fit h-fit  cursor-pointer" >
          <span  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-600 group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
          <Icon :name="post.vote.isFire ==true ? 'basil:fire-solid' : 'basil:fire-outline'" size="2rem" :class="{'!text-rose-600': post.vote.isFire==true }" class="relative text-stone-50 group-hover:saturate-200 group-hover:text-rose-600" />
        </div>
      </div>
      <!-- button fire end -->
      <!-- content start -->
      <div class="pb-3 pt-6 px-6">
        <p class="before:content-['@'] select-none cursor-pointer w-fit hover:underline mt-4">{{props.post.author}}</p>
        <p v-if="props.post.tag" class="text-end text-xs mb-2 before:content-['#'] hover:underline cursor-pointer" >{{props.post.tag}}</p>

        <p class="!text-white text-justify py-2">{{props.post.content}}</p>
      </div>
      <!-- content end -->

        <!-- time counter start -->
        <div v-if="props.post.countdown"  class="w-full h-fit mt-2 p-0  overflow-hidden group flex items-end justify-between " :class="props.post.theme">
          <p :class="{'opacity-50':post.timer<=0}" class=" text-xs select-none ml-3">{{dateFormat(props.post.date)}}</p>
          <p :class="{'opacity-50':post.timer>0}"  class=" text-xs select-none mr-3">{{dateFormat(props.post.finaldate)}}</p>
        </div>
        <!-- time counter end -->

        <!-- timer slider start -->
        <div v-if="props.post.countdown" class="w-full h-fit mt-2 p-0  overflow-hidden group flex items-start justify-start " :class="props.post.theme">
          <input type="range" class="w-full h-2 m-0 p-0 select-none pointer-events-none outline-none border-0 ring-0" :min="props.post.date" :max="props.post.finaldate" :value="props.post.finaldate - post.timer">
        </div>
        <!-- timer slider end -->
        
        <!-- buttons start -->
        <ul class="flex gap-4  p-2  w-full " :class="[props.post.theme,{'pointer-events-none':props.post.countdown==false}]" >
          <!-- button like start -->
          <li class="flex gap-1 items-center justify-start" :class="{'flex-row-reverse gap-0 text-xl':props.post.countdown==false}">
            <div @click="likeBtn(props.post.id)" class="relative group w-fit">
              <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-blue group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
              <Icon :name="userStore.checkPostFunc(props.post.id,'like') == true ? 'basil:like-solid' : 'basil:like-outline'" :size="props.post.countdown ? '2rem' : '1.5rem'" :class="{'!text-my-blue':userStore.checkPostFunc(props.post.id,'like'),'!text-my-blue':props.post.countdown==false }" class="relative text-stone-50 hover:saturate-200 hover:text-my-blue cursor-pointer" />
            </div>
            <p class="font-bold select-none text-my-blue mt-1">{{props.post.likes.length}}</p>
          </li>
          <!-- button like end -->

          <!-- button dislike start -->
          <li class="flex gap-1 items-center justify-start" :class="{'flex-row-reverse gap-0 text-xl':props.post.countdown==false}">
            <div @click="dislikeBtn(props.post.id)" class="relative group w-fit">
              <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-pink group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
              <Icon :name="userStore.checkPostFunc(props.post.id,'dislike')==true ? 'basil:dislike-solid' : 'basil:dislike-outline' " :size="props.post.countdown ? '2rem' : '1.5rem'" :class="{'!text-my-pink':userStore.checkPostFunc(props.post.id,'dislike') ,'!text-my-pink':props.post.countdown == false}" class="relative text-stone-50 hover:saturate-200 hover:text-my-pink cursor-pointer" />
            </div>
            <p class="font-bold select-none text-my-pink mt-1">{{props.post.dislikes.length}}</p>
          </li>
          <!-- button dislike end -->
        </ul>
        <!-- buttons end -->
    

    </div>
    <!-- POST CARD END -->

</template>
<script setup>
const postsStore = usePostsStore()
const user = useUserStore().getUser
const userStore = useUserStore()

// data from db via props
const props = defineProps({
    post:Object
})

// inner post functions
const post = reactive({
    vote:{
        isVote:false,

        isFire:false
    },
    timer:0,
    timeLeft:props.post.finaldate - Date.now()
})


// fire button controller
const fireBtn =(postid)=>{
    if(post.vote.isFire)
    {
        post.vote.isFire = false
    }
    else{
        post.vote.isFire = true
    }
}

// like controller
const likeBtn =(postid)=>{
  if(props.post.countdown ==true){
    postsStore.postLike(postid,user.userid)
  }
}
// dislike controller
const dislikeBtn =(postid)=>{
  if(props.post.countdown ==true){
    postsStore.postDislike(postid,user.userid)
  }
}

// date formatter
const dateFormat = (time)=>{
    // 3m 600k =1saat
    var date = new Date(time)
    
    var fullDate = (date.getDate() <10 ? "0"+date.getDate():date.getDate()) +
    "/"+(date.getMonth()+1)+
    "/"+date.getFullYear()+
    " "+(date.getHours() <10 ? "0"+ date.getHours():date.getHours())+
    ":"+(date.getMinutes() <10 ? "0"+ date.getMinutes():date.getMinutes())
    
    
    return  fullDate
}

// timer 
const timer = setInterval(() => {
    post.timer=props.post.finaldate - Date.now()
    if(props.post.finaldate - Date.now() <=0)
    {
        post.timer=0
        postsStore.countdownDone(props.post.id)
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
  background: #ffffff;
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
  background: #ffffff;
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
  background: #ffffff;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: rgb(9, 9, 11);
}
input[type=range]:focus::-ms-fill-upper {
  background: rgb(9, 9, 11);
}
</style>