<template>

    <!-- POST CARD START -->
    <div v-if="user" v-auto-animate class=" border rounded-lg max-w-lg w-[32rem]  transition-all relative" :class="[props.post.theme ,{'!opacity-20 hover:!opacity-80' : props.post.isCountdown == false && !props.post.isAccepted}]">
      <!-- post add date    -->
      <p class="absolute top-1 left-3 text-xs select-none">{{dateFormat(props.post.date)}}</p>
      <div v-if="user.userid == props.post.authorid" class="w-8 h-8 rounded-lg border absolute right-2 top-2 overflow-hidden" :class="user.theme">
        <NuxtImg draggable="false" class="w-full h-full object-cover select-none" :src="user.photo" placeholder="/1daysocial-pink.png" />
      </div>
      <!-- content start -->
      <div class="pb-3 pt-6 px-6">
        <p class="before:content-['@'] select-none cursor-pointer w-fit hover:underline mt-4">{{props.post.author}}</p>
        <p v-if="props.post.tag" class="text-end text-xs mb-2 before:content-['#'] hover:underline cursor-pointer" >{{props.post.tag}}</p>

        <p class="!text-white text-justify py-2">{{props.post.content}}</p>
      </div>
      <!-- content end -->

        <!-- time counter start -->
        <div v-if="props.post.isCountdown"  class="w-full h-fit mt-2 p-0  overflow-hidden group flex items-end justify-between " :class="props.post.theme">
          <p :class="{'opacity-50':post.timer<=0}" class=" text-xs select-none ml-3">{{dateFormat(props.post.date)}}</p>
          <p :class="{'opacity-50':post.timer>0}"  class=" text-xs select-none mr-3">{{dateFormat(props.post.finaldate)}}</p>
        </div>
        <!-- time counter end -->

        <!-- timer slider start -->
        <div v-if="props.post.isCountdown" class="w-full h-fit mt-2 p-0  overflow-hidden group flex items-start justify-start " :class="props.post.theme">
          <input type="range" class="w-full h-2 m-0 p-0 select-none pointer-events-none outline-none border-0 ring-0" :min="props.post.date" :max="props.post.finaldate" :value="props.post.finaldate - post.timer">
        </div>
        <!-- timer slider end -->
        
        <!-- buttons start -->
        <ul v-if="checkUser" :disabled="checkdisabled" class="flex gap-4  p-2  w-full " :class="[props.post.theme,{'pointer-events-none':props.post.isCountdown==false , '!pointer-events-none !cursor-wait' : checkdisabled==true}]" >
          <!-- button like start -->
          <li class="flex gap-1 items-center justify-start" :class="{'flex-row-reverse gap-0 text-xl':props.post.isCountdown==false}">
            <div @click="likeBtn()" class="relative group w-fit">
              <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-blue group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
              <Icon :name="checkPostLikeButton == true ? 'basil:like-solid' : 'basil:like-outline'" :size="props.post.isCountdown ? '2rem' : '1.5rem'" :class="{'!text-my-blue':checkPostLikeButton,'!text-my-blue':props.post.isCountdown==false }" class="relative text-stone-50 hover:saturate-200 hover:text-my-blue cursor-pointer" />
            </div>
            <p class="font-bold select-none text-my-blue mt-1">{{props.post.likes.length}}</p>
          </li>
          <!-- button like end -->

          <!-- button dislike start -->
          <li  class="flex gap-1 items-center justify-start" :class="{'flex-row-reverse gap-0 text-xl':props.post.isCountdown==false }">
            <div @click="dislikeBtn()" class="relative group w-fit">
              <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-pink group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
              <Icon :name="checkPostDislikeButton==true ? 'basil:dislike-solid' : 'basil:dislike-outline' " :size="props.post.isCountdown ? '2rem' : '1.5rem'" :class="{'!text-my-pink':checkPostDislikeButton ,'!text-my-pink':props.post.isCountdown == false}" class="relative text-stone-50 hover:saturate-200 hover:text-my-pink cursor-pointer" />
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
const user = computed(()=>{
  return useUserStore().getUser
})

const checkdisabled = ref(false)
// data from db via props
const props = defineProps({
    post:Object
})

// inner post functions
const post = reactive({
    timer:0,
    timeLeft:props.post.finaldate - Date.now()
})



// like controller
const likeBtn =()=>{
  // props.post.isCountdown ==true &&
  if( user.value.userid != props.post.authorid){
    checkdisabled.value=true
    usePostsStore().postLike(props.post.id,user.value.userid)
    setTimeout(() => {
      checkdisabled.value=false
    }, 1000);
  }
}
// dislike controller
const dislikeBtn =()=>{
  // props.post.isCountdown ==true &&
  if( user.value.userid != props.post.authorid){
    checkdisabled.value=true
    usePostsStore().postDislike(props.post.id,user.value.userid)
    setTimeout(() => {
      checkdisabled.value=false
    }, 1000);
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
const timer = setInterval(async () => {
  if(props.post.isCountdown){
    post.timer = props.post.finaldate - Date.now()
    if(props.post.finaldate  <= Date.now() )
    {
      const client = useSupabaseClient()
      let {data,error} = await client.from('posts').select("*").eq('id',props.post.id)
        post.timer=0
        usePostsStore().countdownDone(props.post.id,data)
        clearInterval(timer)
    }
  }
}, 1000);

const checkUser = computed(()=>{
  if(props.post.authorid === user.value.userid)
  {
    if(props.post.authorid === user.value.userid && props.post.isCountdown == false)
    {
      return true
    }
    else{

      return false
    }
  }
  else{
    return true
  }
})

const checkPostDislikeButton = computed(()=>{
  return props.post.dislikes.includes(user.value.userid)
})

const checkPostLikeButton = computed(()=>{
  return props.post.likes.includes(user.value.userid)
})

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