<template>
    <div class="w-full h-calc  flex items-center justify-center">
        <nuxt-link to="/login">
            <clock class="cursor-pointer scale-150"/>
        </nuxt-link>
    </div>
</template>

<style scoped>
.h-calc{
    height: calc(100vh - 8rem);
}
</style>