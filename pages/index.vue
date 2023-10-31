<template>
    <div class=" text-white">
        <div class="container mx-auto flex items-center justify-center relative my-32">
            <div :class="{'border-t-my-blue border-l-my-blue border-b-my-blue':isRegister==false,'border-t-my-pink border-l-my-pink border-b-my-pink':isRegister==true,}" class="rounded-l-xl h-96 w-96 p-6 flex items-center justify-start flex-col border  border-r-transparent border-r-0 bg-gradient-to-tl/50 from-my-blue to-my-pink">
                <clock @click="isRegister= !isRegister" class="cursor-pointer" :isRegister="isRegister"/>
                <p class="text-4xl mt-7 font-bold">{{isRegister ? 'Log in':'Register'}}</p>
                <p>to 1DS community</p>
                <p class="flex items-center justify-center gap-2 mt-auto"><NuxtImg class="w-6 h-6 select-none" src="/1daysocial-pink.png" draggable="false"/> 1 Day Social</p>
            </div>
            <div v-if="isRegister" class="rounded-r-xl h-96 w-96 border border-l-transparent border-l-0  p-10 border-my-pink ">
                <form @submit.prevent="login" class="flex flex-col items-center justify-center w-full ">
                <label for="mail" class="w-full">
                    <p class="text-xl my-3">Email</p>
                    <input class=" w-full p-2 focus:rounded-lg outline-none border-b border-my-pink focus:border-transparent focus:outline-my-pink bg-transparent text-my-pink transition-all" type="email" id="mail" name="mail" required autocomplete="off" spellcheck="off">
                </label>
                <label for="password" class="w-full">
                    <p class="text-xl my-3">Password</p>
                    <input class=" w-full p-2 focus:rounded-lg outline-none border-b border-my-pink focus:border-transparent focus:outline-my-pink bg-transparent text-my-pink transition-all" type="password" id="password" name="password" required autocomplete="off" spellcheck="off">
                </label>
                <label for="submit" class="w-32 my-7 self-end group relative overflow-hidden !cursor-pointer">
                    <div class="w-full group-hover:top-0 h-12 top-16 absolute origin-bottom transition-all bg-my-pink"></div>
                    <input class=" h-12 w-full p-2 focus:rounded-lg outline-none cursor-pointer border-b border-my-pink  bg-transparent text-my-pink group-hover:!text-white relative transition-all" type="submit" value="Log in" id="submit" name="submit" required autocomplete="off" spellcheck="off">
                </label>
                </form>
            </div>

            <div v-if="!isRegister" class="rounded-r-xl h-96 w-96 border border-l-transparent border-l-0  p-10 border-my-blue "> 
                <form @submit.prevent="login" class="flex flex-col items-center justify-center w-full ">
                <label for="mail" class="w-full">
                    <p class="text-xl my-3">Email</p>
                    <input class=" w-full p-2 focus:rounded-lg outline-none border-b border-my-blue focus:border-transparent focus:outline-my-blue bg-transparent text-my-blue transition-all" type="email" id="mail" name="mail" required autocomplete="off" spellcheck="off">
                </label>
                <label for="password" class="w-full">
                    <p class="text-xl my-3">Password</p>
                    <input class=" w-full p-2 focus:rounded-lg outline-none border-b border-my-blue focus:border-transparent focus:outline-my-blue bg-transparent text-my-blue transition-all" type="password" id="password" name="password" required autocomplete="off" spellcheck="off">
                </label>
                <label for="submit" class="w-32 my-7 self-end group relative overflow-hidden !cursor-pointer">
                    <div class="w-full group-hover:top-0 h-12 top-16 absolute origin-bottom transition-all bg-my-blue"></div>
                    <input class=" h-12 w-full p-2 focus:rounded-lg outline-none cursor-pointer border-b border-my-blue  bg-transparent text-my-blue group-hover:!text-white relative transition-all" type="submit" value="Register" id="submit" name="submit" required autocomplete="off" spellcheck="off">
                </label>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
const isRegister=ref(false)

const login =()=>{
    console.log('login :>> ');
}
</script>

<style lang="scss" scoped>

</style>