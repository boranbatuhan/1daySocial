<template>
    <!-- POST CARD START -->
    <div v-if="user" class=" border rounded-lg max-w-lg w-[32rem] !bg-stone-950 z-[99] relative p-4" :class="user.theme">
        <div class="w-full flex items-center justify-between">
            <p class="text-end text-xs mb-2 before:content-['@']" >{{user.username}}</p>
            <p class="text-end text-xs mb-2">{{postForm.content.length}} / 256</p>
        </div>
        <textarea  v-model="postForm.content" maxlength="256" name="content" id="content" spellcheck="off"  autocomplete="off" @keypress.enter.prevent class="w-full h-44 overflow-hidden resize-none outline-none bg-transparent border rounded-lg p-4" ></textarea>
        <div class="flex w-full items-center justify-between">

            <label  for="tag" class="before:content-['#'] border p-1 rounded-lg" >
                <input v-model="postForm.tag" type="text" id="tag" spellcheck="off" autocomplete="off" class="bg-transparent outline-none px-1">
            </label>
            <div @click="addPost" @mouseenter="iconhover=true" @mouseleave="iconhover=false" class="cursor-pointer group ml-auto w-fit h-fit">
                <Icon :name="iconhover ? 'basil:send-outline' : 'basil:send-solid'" size="2rem" class="group-active:scale-95"/>
            </div>
        </div>

    </div>
    <!-- POST CARD END -->

</template>
<script setup>

const userStore = useUserStore()
const postsStore = usePostsStore()
const user = computed(()=>{
    return useUserStore().getUser
})
const iconhover = ref(false)
const postForm = reactive({
    content:"",
    tag:"",
})
const resetForm = ()=>{
    postForm.content=""
    postForm.tag=""
}
const addPost =()=>{
    if(postForm.content){
        const nowDate = Date.now()
        const userTemp = userStore.getUser
        const userid = useSupabaseUser().value.id
        const username = useSupabaseUser().value.user_metadata.username
        const newPost =  { 

            content:postForm.content,
            author:username,
            auid:userid,
            date:nowDate,
            finaldate: nowDate+30000,   //1000 = 1 sec
            countdown:true,
            isAccepted:true,
            theme:userTemp.theme,
            likes:[],
            dislikes:[],
            tag:postForm.tag
        }
        postsStore.addPost(newPost)
        postsStore.getPosts
        resetForm()
    }
}
</script>
