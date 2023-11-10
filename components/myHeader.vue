<template>
    <div class="w-full flex items-center justify-center gap-7">
        <nuxt-link v-if="!checkuser" to="/">Home</nuxt-link>
        <nuxt-link v-if="!checkuser" to="/login">Login</nuxt-link>
        <nuxt-link v-if="checkuser" to="/feed">Feed</nuxt-link>
        <nuxt-link v-if="checkuser" to="/profile">Profile</nuxt-link>
        <button v-if="checkuser" @click="logOut" >Log out</button>
    </div>
</template>

<script setup>

const user = useSupabaseUser();
const client = useSupabaseClient()
const checkuser = computed(()=>{
    return useUserStore().getUser
})
const logOut = async ()=>{
    if(user){
        
    try {
        const {error} = await client.auth.signOut()
        if(error) throw error;
        useRouter().push("/")
    } catch (error) {
        console.log('error.message :>> ', error.message);
    }
    }
}

</script>
