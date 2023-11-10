
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