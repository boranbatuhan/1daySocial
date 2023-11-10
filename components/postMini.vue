<template>

    <!-- POST CARD START -->
    <div v-auto-animate class=" border rounded-lg max-w-lg w-[32rem]  transition-all relative" :class="props.post.theme">
      <!-- post add date    -->
      <p class="absolute top-1 left-3 text-xs select-none">{{dateFormat(props.post.date)}}</p>

      <!-- content start -->
      <div class="pb-3 pt-6 px-6">
        <p class="before:content-['@'] select-none cursor-pointer w-fit hover:underline mt-4">{{props.post.author}}</p>

        <p v-if="props.post.tag" class="text-end text-xs mb-2 before:content-['#'] hover:underline cursor-pointer" >{{props.post.tag}}</p>

        <p class="!text-white text-justify py-2">{{props.post.content}}</p>
      </div>
      <!-- content end -->

   
        
        <!-- buttons start -->
        <ul  disabled class="flex gap-4  p-2  w-full "  >
          <!-- button like start -->
          <li class="flex gap-1 items-center justify-start" :class="{'flex-row-reverse gap-0 text-xl':props.post.isCountdown==false}">
            <div  class="relative group w-fit">
                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-blue group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
              <Icon name="basil:like-solid" size="2rem"  class="relative hover:saturate-200 text-my-blue" />

            </div>
            <p class="font-bold select-none text-my-blue mt-1">{{props.post.likes.length}}</p>
          </li>
          <!-- button like end -->

          <!-- button dislike start -->
          <li  class="flex items-center justify-start flex-row-reverse gap-0 text-xl" >
            <div  class="relative group w-fit">
              <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-my-pink group-hover:w-6 w-0 group-hover:h-6 h-0 blur-md  transition-all"></span>
              <Icon name="basil:dislike-solid" size="2rem"  class="relative hover:saturate-200 text-my-pink" />
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

// data from db via props
const props = defineProps({
    post:Object
})
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

</script>
