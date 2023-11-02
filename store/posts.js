export const usePostsStore = defineStore('posts', {
    state: () => ({
         posts:[
            {   id:"p1",
                content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, at.",
                author:"batuhanma",
                likes:[],
                dislikes:[]
            },
            {   id:"p2",  
                content:"Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, at. sit amet consectetur, adipisicing elit. Placeat, at.",
                author:"melodika",
                likes:[],
                dislikes:[]
            },
            {   id:"p3",  
                content:"Lorem",
                author:"flüt",
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

    },
  })