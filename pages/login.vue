<template>
    <div class=" text-white" v-auto-animate>
        <div class="container mx-auto flex items-center justify-center relative my-32" >
            <div :class="{'border-t-my-blue border-l-my-blue border-b-my-blue':isRegister==false,'border-t-my-pink border-l-my-pink border-b-my-pink':isRegister==true,}" class="rounded-l-xl h-96 w-96 p-6 flex items-center justify-start flex-col border  border-r-transparent border-r-0 bg-gradient-to-tl/50 from-my-blue to-my-pink transition-all">
                <clock @click="isRegister= !isRegister" class="cursor-pointer" :isRegister="isRegister"/>
                <p class="text-4xl mt-7 font-bold font-hoves-bold">{{isRegister ? 'Log in':'Register'}}</p>
                <p>to 1DS community</p>
                <p class="flex items-center justify-center gap-2 mt-auto"><NuxtImg class="w-6 h-6 select-none" src="/1daysocial-pink.png" draggable="false"/> 1 Day Social</p>
            </div>
            <div v-if="isRegister" class="rounded-r-xl h-96 w-96 border border-l-transparent border-l-0  p-10 border-my-pink ">
                <form @submit.prevent="login" class="flex flex-col items-center justify-center w-full ">
                <label for="mail" class="w-full">
                    <p class="text-xl my-3">Email</p>
                    <input v-model="form.mail" class=" w-full p-2 focus:rounded-lg outline-none border-b border-my-pink focus:border-transparent focus:outline-my-pink bg-transparent text-my-pink transition-all" type="email" id="mail" name="mail" required autocomplete="off" spellcheck="off">
                </label>
                <label for="password" class="w-full">
                    <p class="text-xl my-3">Password</p>
                    <input v-model="form.password" class=" w-full p-2 focus:rounded-lg outline-none border-b border-my-pink focus:border-transparent focus:outline-my-pink bg-transparent text-my-pink transition-all" type="password" id="password" name="password" required autocomplete="off" spellcheck="off">
                </label>
                <p>
                    {{errorMessage}}
                </p>
                <label for="submit" class="w-32 my-7 self-end group relative overflow-hidden !cursor-pointer">
                    <div class="w-full group-hover:top-0 h-12 top-16 absolute origin-bottom transition-all bg-my-pink"></div>
                    <input class=" h-12 w-full p-2 focus:rounded-lg outline-none cursor-pointer border-b border-my-pink  bg-transparent text-my-pink group-hover:!text-white relative transition-all" type="submit" value="Log in" id="submit" name="submit" required autocomplete="off" spellcheck="off">
                </label>
                </form>
            </div>

            <div v-if="!isRegister" class="rounded-r-xl h-96 w-96 border border-l-transparent border-l-0  p-10 border-my-blue "> 
                <form @submit.prevent="register" class="flex flex-col items-center justify-center w-full ">
                 <div class="h-8">
                    <p v-show="form.mail" class="h-6 flex items-center justify-center flex-col">
                        Your user name is  
                        <strong class="h-6 w-full text-center before:content-['@']">{{usernameChecker}}</strong>
                    </p>
                 </div>
                <label for="mail" class="w-full">
                    <p class="text-xl my-3">Email </p>
                    <input v-model="form.mail" @keypress.space.prevent class=" w-full p-2 focus:rounded-lg outline-none border-b border-my-blue focus:border-transparent focus:outline-my-blue bg-transparent text-my-blue transition-all" type="email" id="mail" name="mail" required autocomplete="off" spellcheck="off">
                </label>
                <label for="password" class="w-full">
                    <p class="text-xl my-3">Password</p>
                    <input v-model="form.password" class=" w-full p-2 focus:rounded-lg outline-none border-b border-my-blue focus:border-transparent focus:outline-my-blue bg-transparent text-my-blue transition-all" type="password" id="password" name="password" required autocomplete="off" spellcheck="off">
                </label>
                <p>
                    {{errorMessage}}
                </p>
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
definePageMeta({
    middleware:"auth"
})


const client = useSupabaseClient()
const isRegister=ref(true)
const errorMessage = ref("")
const form = reactive({
    mail:"",
    password:""
})

const usernameChecker = computed(()=>{
const usernamefix = form.mail.split('@')
return usernamefix[0]
})
const login = async()=>{
    try{
        const { error} = await client.auth.signInWithPassword({
            email: form.mail,
            password: form.password,
        });

        if( error ) throw error;
        useRouter().push("/profile")

    } catch(error){
        errorMessage.value = error.message
    }


}

const saveUserMetadata = async (datas)=>{
    const { data, error } = await client.auth.updateUser({
        data: { 
            username:datas.data.user.email.split('@')[0],
            userid:datas.data.user.id,
            theme:"",
            photo:'https://cdn.ntvspor.net/a55708a61ffa4fdb9fc7d59a018a96e8.jpg?crop=0,0,940,529&w=710&h=403&mode=crop',
            posts:[],
            likes:[],
            dislikes:[],
            fired:[],
        }
        })
}

const saveToDB = async (datas)=>{
 try {
    const { data, error } = await client.from('users').insert([{
        userid:datas.data.user.id,
        username:datas.data.user.email.split('@')[0],
        email:datas.data.user.email,
    }])
    if(error) throw error;
    saveUserMetadata(datas)
    useRouter().push("/feed")
 } catch (error) {
    console.log('error :>> ', error);
 }
}
const register = async ()=>{
    try{
        const { error} = await client.auth.signUp({
            email: form.mail,
            password: form.password,

        }).then(data=>{
            saveToDB(data)
        })
        if( error ) throw error;
        isRegister.value=false
    } catch(error){
        errorMessage.value = error.message
    }
}
</script>

<style lang="scss" scoped>

</style>