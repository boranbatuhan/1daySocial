<template>
    <div class="w-full flex items-center justify-center gap-7">
        <nuxt-link v-if="user" to="/feed">Feed</nuxt-link>
        <nuxt-link v-if="user" to="/profile">Profile</nuxt-link>
        <button v-if="user" @click="logOut" >Log out</button>
    </div>
</template>

<script setup>

const user = useSupabaseUser();
const client = useSupabaseClient()
console.log('user :>> ', user.value.id);

const logOut = async ()=>{
    try {
        const {error} = await client.auth.signOut()

        if(error) throw error;

        useRouter().push("/")

    } catch (error) {
        console.log('error.message :>> ', error.message);
    }
}

</script>
