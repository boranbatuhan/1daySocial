export const usePostsStore = defineStore('posts', {
    state: () => ({
     posts:[]
    }),
    getters: {
       getPosts(state){
        
        return state.posts
      },
      getUserPosts(state){
        var user = useUserStore().getUser
        var userPosts = state.posts.filter(i => i.authorid == user.userid)
        return userPosts
      },

    },
    actions: {
      
      async setPostsFromDB(){
        const client = useSupabaseClient()
          try {
              const { data, error } = await client
            .from('posts')
            .select('*')
            this.posts=data
              if(error) throw error
          } catch (error) {
              console.log('error :>> ', error);
          }
      },
    async postLikeAction(postId,likesTemp,postlikes){
      var client = useSupabaseClient()
      
      try {
      // user metadata update
        const { data, error } = await client.auth.updateUser({
          data: { 
            likes:likesTemp
          }
          })

      // post update
          const { error:error1 } = await client
          .from('posts')
          .update({likes: postlikes})
          .eq( "id", postId )
          this.setPostsFromDB()
          if(error) throw error;
      } catch (error) {
      }
  },
  async postDislikeAction(postId,dislikesTemp,postDislikes){
    var client = useSupabaseClient()

    try {
      // user metadata update
      const { data, error } = await client.auth.updateUser({
      data: { 
        dislikes:dislikesTemp
      }
      })

      // post update
    const { error:error1 } = await client
    .from('posts')
    .update({dislikes: postDislikes})
    .eq( "id", postId )
    this.setPostsFromDB()
        if(error) throw error;
    } catch (error) {
    }
  }
  ,
  postLike(postId,userId){
      var client = useSupabaseClient()
      var likesTemp = [...useUserStore().getUser.likes] //user liked posts
      var userlikesTemp = [...this.getPosts.filter(i=> i.id == postId)] // selected post
      var postlikes = userlikesTemp[0].likes            //post likes
      //-----------------------------------------------------------------------
      var dislikesTemp = [...useUserStore().getUser.dislikes]//user disliked posts
      var userDislikesTemp = [...this.getPosts.filter(i=> i.id == postId)]  // selected post
      var postDislikes = userDislikesTemp[0].dislikes   //post dislikes
  


      if(likesTemp.includes(postId) == false && postlikes.includes(userId) == false)
      {
        //+0 like _ +1 dislike ( -1 dislike +1 like ) => +1 like _ +0 dislike
        if(dislikesTemp.includes(postId) == true && postDislikes.includes(userId) == true){
          dislikesTemp = dislikesTemp.filter(i=> i!=postId)
          postDislikes = postDislikes.filter(i=> i!=userId)
          this.postDislikeAction(postId,dislikesTemp,postDislikes)
          likesTemp.push(postId)
          postlikes.push(userId)
          this.postLikeAction(postId,likesTemp,postlikes)

        }
        //+1 like
        else{
          likesTemp.push(postId)
          postlikes.push(userId)
          this.postLikeAction(postId,likesTemp,postlikes)

        }
      }
      //if clicked liked button +1 like to +0 like 
      else if(likesTemp.includes(postId) == true && postlikes.includes(userId) == true){
        likesTemp = likesTemp.filter(i=> i!=postId)
        postlikes = postlikes.filter(i=> i!=userId)
        this.postLikeAction(postId,likesTemp,postlikes)

      }   
    }
  ,
  
    postDislike(postId,userId){
      var client = useSupabaseClient()
      var dislikesTemp = [...useUserStore().getUser.dislikes]//user disliked posts
      var userDislikesTemp = [...this.getPosts.filter(i=> i.id == postId)]  // selected post
      var postDislikes = userDislikesTemp[0].dislikes   //post dislikes
      //-----------------------------------------------------------------------
      var likesTemp = [...useUserStore().getUser.likes] //user liked posts
      var userlikesTemp = [...this.getPosts.filter(i=> i.id == postId)] // selected post
      var postlikes = userlikesTemp[0].likes            //post likes
 
      if(dislikesTemp.includes(postId) == false && postDislikes.includes(userId) == false)
      {

      //+1 like _ +0 dislike ( +1 dislike -1 like ) => 0 like _ +1 dislike
      if(likesTemp.includes(postId) == true && postlikes.includes(userId) == true){
        likesTemp = likesTemp.filter(i=> i!=postId)
        postlikes = postlikes.filter(i=> i!=userId)
        this.postLikeAction(postId,likesTemp,postlikes)
        dislikesTemp.push(postId)
        postDislikes.push(userId)
        this.postDislikeAction(postId,dislikesTemp,postDislikes)

      }   
      //+1 dislike
      else{
        dislikesTemp.push(postId)
        postDislikes.push(userId)
        this.postDislikeAction(postId,dislikesTemp,postDislikes)

      }
      }
      //if clicked liked button +1 dislike to +0 dislike 
      else if(dislikesTemp.includes(postId) == true && postDislikes.includes(userId) == true){
        dislikesTemp = dislikesTemp.filter(i=> i!=postId)
        postDislikes = postDislikes.filter(i=> i!=userId)
        this.postDislikeAction(postId,dislikesTemp,postDislikes)
      }
  
    },
    async setCountdownDone(postId,data){
      const client = useSupabaseClient()

      
      
      const updateisCountdown = async ()=>{
        const {error} =  await client.from('posts').update({isCountdown: false}).eq( "id", postId )
      }
      const updateisActive = async (isAccepted)=>{
        const {error} =  await client.from('posts').update({isAccepted: isAccepted}).eq( "id", postId )
      }
        if(data[0].finaldate <= Date.now())
        {

          updateisCountdown()  // countdown is over
          if(data[0].likes.length > data[0].dislikes.length) // accept for like > dislike
          {
            updateisActive(true)
            this.setPostsFromDB()
          }
          else if( data[0].likes.length <= data[0].dislikes.length)// delete for dislike > like
          {
            updateisActive(false)
            this.setPostsFromDB()
          }
          this.setPostsFromDB()
        }
      },
    countdownDone(postId,data){
        this.setCountdownDone(postId,data)
      },
      addPost(newPost){
        this.posts = [...this.posts, newPost]
        const client = useSupabaseClient()
        
        const postValue = {
          content:newPost.content,
          author:newPost.author,
          authorid:newPost.auid,
          date:newPost.date,
          finaldate:newPost.finaldate,
          isCountdown:newPost.countdown,
          isAccepted:newPost.isAccepted,
          theme:newPost.theme,
          likes:newPost.likes,
          dislikes:newPost.dislikes,
          tag:newPost.tag,
         }


        // post id to user metadata
        const updateProfile  = async(data)=>{
          const tempPosts= useSupabaseUser().value.user_metadata.posts
          tempPosts.push(data[0].id)
          try {
              const { data, error } = await client.auth.updateUser({
              data: { 
                posts:tempPosts
              }
              })
              if(error) throw error;
          } catch (error) {
          }
        }
        // upload post to DB
        const postToDB = async ()=>{
          try {
             const { data, error } = await client.from('posts').insert([postValue]).select();
             updateProfile(data)
             this.setPostsFromDB()
             if(error) throw error;
          } catch (error) {
             console.log('error :>> ', error);
          }
         }
         postToDB()
      },
      getLikes(postId){
        this.getPosts
        const selectedpost = this.posts.filter(i => i.id == postId)
        return selectedpost[0].likes
      }

    },
  })