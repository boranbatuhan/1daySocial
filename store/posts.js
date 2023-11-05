export const usePostsStore = defineStore('posts', {
    state: () => ({
         posts:[
            {   id:"p1",
                content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, at.",
                author:"batuhanma",
                auid:'123qwe345ZXC',
                date:1698991980901,
                finaldate: 1698991980901+3600000,
                countdown:true,
                isAccepted:false,
                theme:"!text-fuchsia-500 !border-fuchsia-500",
                likes:[],
                dislikes:[],
                tag:"gsmaçı"
            },
            {   id:"p2",  
                content:"Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, at. sit amet consectetur, adipisicing elit. Placeat, at.",
                author:"melodika",
                auid:'123qwe345OUI',
                date:1699008309335,
                finaldate: 1699008309335+800000,
                countdown:true,
                isAccepted:false,
                theme:"!text-orange-500 !border-orange-500",
                likes:[],
                dislikes:[],
                tag:"cars"
            },
            {   id:"p3",  
                content:"Lorem",
                author:"flüt",
                auid:'123qwe345ASD',
                date:1699008309335,
                finaldate: 1699008309335+3000000,
                countdown:true,
                isAccepted:false,
                theme:"!text-lime-500 !border-lime-500",
                likes:[],
                dislikes:[],
                tag:""
            },
            {   id:"p3",  
                content:"Lorem",
                author:"flüt",
                auid:'123qwe345ASD',
                date:1699008309335,
                finaldate: 1699008309335+3000000,
                countdown:true,
                isAccepted:true,
                theme:"!text-lime-500 !border-lime-500",
                likes:[],
                dislikes:[],
                tag:""
            },
         ]
        }),
    getters: {
      getPost(state){
        return state.posts
      },
      getUserPosts(state){
        var user = useUserStore().getUser
        var userPosts = state.posts
         userPosts = state.posts.filter(i => i.auid == user.userid)
        console.log('userPosts :>> ', userPosts);
        return userPosts
      },
      getUserAcceptedPosts(state){
        var user = useUserStore().getUser
        var userPosts = state.posts
        userPosts = state.posts.filter(i => i.auid == user.userid && i.isAccepted)
        console.log('userPosts :>> ', userPosts);
        return userPosts
      },
      getUserDeletedPosts(state){
        var user = useUserStore().getUser
        var userPosts = state.posts
        userPosts = state.posts.filter(i => i.auid == user.userid && !i.isAccepted)
        console.log('userPosts :>> ', userPosts);
        return userPosts
      },
      getFeed(state){
        var userPosts = state.posts
        userPosts = state.posts.filter(i => i.isAccepted == true || ( i.isAccepted == true && i.countdown) || ( i.isAccepted == true && !i.countdown))
        console.log('userPosts :>> ', userPosts);
        return userPosts
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
                  i.isAccepted=true
                }
                else if( i.likes.length<= i.dislikes.length){
                  i.isAccepted=false
                }
              }
        } )
      },
      addPost(newPost){
        this.posts = [...this.posts, newPost]
      }

    },
  })