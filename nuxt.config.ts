// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss", 
    "@pinia/nuxt", 
    // "@nuxtjs/supabase", 
    'nuxt-icon',
    "@nuxt/image"],
  pinia: {
    storesDirs: ['./store/**', './custom-folder/store/**'],
  },
  // supabase:{
  //   redirectOptions: {
  //     login: '/',
  //     callback: '/confirm',
  //     exclude: ["/",],
  //   }
  // },
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig:{
    supabaseUrl:process.env.SUPABASE_URL,    
    supabaseKey:process.env.SUPABASE_KEY
  },
  app:{
    head:{
      title:"1Day Social",
      meta:[{name:'description',content:'1 day social media. Just likes shown after 24 hours.'}],
      link:[{rel:'icon',href:'/1daysocial-fullblue-pink.png'}]
    }
  }
})