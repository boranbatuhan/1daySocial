export const usePostsStore = defineStore('posts', {
    state: () => ({
         posts:[
            {   id:"p1",
                content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, at.",
                author:"batuhanma",
                date:1698991980901,
                finaldate: 1698991980901+3600000,
                countdown:true,
                isActive:true,
                theme:"!text-fuchsia-500 !border-fuchsia-500",
                likes:[],
                dislikes:[]
            },
            {   id:"p2",  
                content:"Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, at. sit amet consectetur, adipisicing elit. Placeat, at.",
                author:"melodika",
                date:1699008309335,
                finaldate: 1699008309335+800000,
                countdown:true,
                isActive:true,
                theme:"!text-orange-500 !border-orange-500",
                likes:[],
                dislikes:[]
            },
            {   id:"p3",  
                content:"Lorem",
                author:"flüt",
                date:1699008309335,
                finaldate: 1699008309335+3000000,
                countdown:true,
                isActive:true,
                theme:"!text-lime-500 !border-lime-500",
                likes:[],
                dislikes:[]
            },
         ]
        }),
    getters: {
      getPost(state){
        return state.posts
      }
    },
    actions: {
      postFire(postId){
         this.posts.forEach(i => {
            if(i.id == postId){
             
            }
        } )
      },
      postLike(postId,userName){
        this.posts.forEach(i => {
            if(i.id == postId && !i.likes.includes(userName)){
              i.likes.push(userName)
              if(i.dislikes.includes(userName)){
                i.dislikes = i.dislikes.filter(a => a != userName)
              }
              useUserStore().postLike(i.id)
            }
            else if( i.id == postId && i.likes.includes(userName)){
              i.likes = i.likes.filter ( u => u!=userName)
              useUserStore().postunLike(i.id)
            }
        } )
      },
      postDislike(postId,userName){
        this.posts.forEach(i => {
            if(i.id == postId && !i.dislikes.includes(userName)){
                i.dislikes.push(userName)
                if(i.likes.includes(userName)){
                  i.likes = i.likes.filter(a => a != userName)
                }
                useUserStore().postDislike(i.id)
              }
              else if( i.id == postId && i.dislikes.includes(userName)){
                i.dislikes = i.dislikes.filter ( u => u!=userName)
                useUserStore().postunDislike(i.id)
              }
        } )
      },
      countdownDone(postId){
        this.posts.forEach(i => {
            if(i.id == postId ){
                i.countdown=false
                if(i.likes.length> i.dislikes.length)
                {
                  i.isActive=true
                }
                else if( i.likes.length<= i.dislikes.length){
                  i.isActive=false
                }
              }
        } )
      },

    },
  })