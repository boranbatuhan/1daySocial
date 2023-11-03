export const useUserStore = defineStore('user', {
    state: () => ({
         user:{
            username:"batuhanma",
            userid:"123qwe345ZXC",
            theme:"",
            photo:'https://cdn.ntvspor.net/a55708a61ffa4fdb9fc7d59a018a96e8.jpg?crop=0,0,940,529&w=710&h=403&mode=crop',
            posts:[],
            liked:[],
            disliked:[],
            fired:[],
         }
         

         
        }),
    getters: {
      getUser(state){
        return state.user
      }
    },
    actions: {
     postLike(postid){
      if(!this.user.liked.includes(postid)){
         this.user.liked.push(postid)
         this.user.disliked= this.user.disliked.filter(i => i != postid)
      }
     },
     postunLike(postid){
      this.user.liked= this.user.liked.filter(i => i!=postid)
     },
     postDislike(postid){
         if(!this.user.disliked.includes(postid)){
            this.user.disliked.push(postid)
            this.user.liked= this.user.liked.filter(i => i != postid)

         }
     },
     postunDislike(postid){
      this.user.disliked= this.user.disliked.filter(i => i!=postid)

     },
     postFire(postid){
        this.user.fired.push(postid)
     },
     checkPostFunc(postid,postType){
      if(postType == 'like'){
         return this.user.liked.includes(postid) ? true : false
      }
      if(postType == 'dislike'){
         return this.user.disliked.includes(postid) ? true : false
      }
     },
     setTheme(themecolor){
      this.user.theme=themecolor
     },
     updatePhoto(photolink){
      this.user.photo=photolink
     },
     updateUsername(userName){
      this.user.username=userName
     }
    },
  })