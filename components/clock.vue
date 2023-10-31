<script setup>
const props = defineProps({
  isRegister:Boolean
})
</script>


<template>
<div id="watch" :class="{'border-my-blue':props.isRegister==true,'border-my-pink':props.isRegister==false}"  class="group border drop-shadow-xl bg-stone-50 relative w-32 z-0 h-32 flex items-center justify-center rounded-full">
  <div class="seconds-hand relative z-50">
    <div :class="{'bg-my-blue':props.isRegister==true,'bg-my-pink':props.isRegister==false}" class="sec  w-full h-1/2 z-50"></div>
  </div>
  <NuxtImg draggable="false" class="select-none absolute w-24 h-24 opacity-10 z-10" src="1daysocial-purple.png" alt=""/>
</div>
</template>


<style >


@keyframes seconds { to {transform:rotate(480deg)} }
#watch .seconds-hand {
  width:.2em;
  height:6em;
  transform:rotate(120deg);
  animation:seconds 60s steps(60, end)  0s infinite;
}
.sec{
    border-radius:.1em .1em 0 0/10em 10em 0 0;
  box-shadow:rgba(0,0,0,.8) 0 0 .2em;
}

</style>
