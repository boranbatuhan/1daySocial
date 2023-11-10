
export const useUserStore = defineStore('user', {
    state: () => ({
         user:{


         }
         
        }),
    getters: {
      getUser(state){
         const user = useSupabaseUser()
         if(user.value){
            state.user = user.value.user_metadata
            return state.user
         }
      },
       getLikedPosts(state){
         const user = useSupabaseUser()
         const client = useSupabaseClient()
         if(user.value){
            var likes = user.value.user_metadata.likes
            var likesArray = Array.from(likes)
            var likesPosts=[]

            console.log('likesArray :>> ', likesArray);

            likesArray.forEach(async (element) =>{

               const { data,error } = await client
               .from('posts')
               .select('*')
               .eq( "id",element )
               likesPosts.push(data)
            })       
            return  likesPosts
         }
      },
      getDislikedPosts(state){
         const user = useSupabaseUser()
         const client = useSupabaseClient()
         if(user.value){
            var dislikes = user.value.user_metadata.dislikes
            var dislikesArray = Array.from(dislikes)
            var dislikesPosts=[]

            console.log('likesArray :>> ', dislikesArray);

            dislikesArray.forEach(async (element) =>{

               const { data,error } = await client
               .from('posts')
               .select('*')
               .eq( "id",element )
               dislikesPosts.push(data)
            })       
            return  dislikesPosts
         }
      }
    },
    actions: {
     postLike(postid){
      if(!this.user.likes.includes(postid)){
         this.user.likes.push(postid)
         this.user.dislikes= this.user.dislikes.filter(i => i != postid)
      }
     },
     postunLike(postid){
      this.user.likes= this.user.likes.filter(i => i!=postid)
     },
     postDislike(postid){
         if(!this.user.dislikes.includes(postid)){
            this.user.dislikes.push(postid)
            this.user.likes= this.user.likes.filter(i => i != postid)

         }
     },
     postunDislike(postid){
      this.user.dislikes= this.user.dislikes.filter(i => i!=postid)

     },
     postFire(postid){
        this.user.fired.push(postid)
     },

     setTheme(themecolor){
        this.user.theme=themecolor
        const client = useSupabaseClient()
      const update = async()=>{
          try {
              const { data, error } = await client.auth.updateUser({
              data: { 
                  theme:themecolor
              }
              })
              if(error) throw error;
          } catch (error) {
          }
      }
      update()
     },
     updatePhoto(photolink){
      this.user.photo=photolink
     },
     updateUsername(userName){
      this.user.username=userName
     },

    },
  })