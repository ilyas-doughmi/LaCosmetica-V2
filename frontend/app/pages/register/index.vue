<template>
  <Header />
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    
    <div class="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
      
      <!-- LEFT SIDE -->
      <div class="hidden md:flex md:w-1/2 bg-gray-900 p-12 text-white flex-col justify-center items-center text-center relative overflow-hidden">
        <div class="z-10">
          <h1 class="text-5xl font-serif font-bold mb-4 tracking-wide">La Cosmetica</h1>
          <p class="text-gray-300 text-xl font-light mb-8">Votre beauté au naturel. 🌿</p>
          <div class="w-16 h-1 bg-gray-400 mx-auto rounded-full mb-8"></div>
          <p class="text-sm text-gray-400 leading-relaxed">
            Créez votre compte pour profiter de nos produits naturels et suivre vos commandes facilement.
          </p>
        </div>
        <div class="absolute top-0 left-0 w-64 h-64 bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <!-- RIGHT SIDE -->
      <div class="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Créer un compte</h2>
        <p class="text-gray-600 mb-8">Remplissez les informations pour continuer.</p>

        <form @submit.prevent="handleRegister" class="space-y-6">
          
          <!-- NAME -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input 
              v-model="name" 
              type="text" 
              placeholder="Votre nom"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all"
            />
          </div>

          <!-- EMAIL -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
            <input 
              v-model="email" 
              type="email" 
              placeholder="client@lacosmetica.com"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all"
            />
          </div>

          <!-- PASSWORD -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input 
              v-model="password" 
              type="password" 
              placeholder="••••••••"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all"
            />
          </div>

          <!-- BUTTON -->
          <button 
            type="submit" 
            class="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-full transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
            S'inscrire
          </button>
        </form>

        <p class="mt-8 text-center text-sm text-gray-600">
          Déjà un compte ? 
          <NuxtLink to="/login" class="text-gray-900 hover:text-black font-bold transition-colors">
            Se connecter
          </NuxtLink>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../../components/Header.vue'

const name = ref('')
const email = ref('')
const password = ref('')

const config = useRuntimeConfig();
const router = useRouter();

const tokenCookie = useCookie('auth_token',{
    maxAge: 60*60*24*7
})

const handleRegister = async () => {
  try{
    const res = await $fetch(`${config.public.apiBase}/register`,{
      method : 'post',
      body: {
        email : email.value,
        password : password.value,
        name : name.value,
        role : 'customer'
      }
    })

    tokenCookie.value = res.token
    console.log(res.message)
    router.push('/products')   

  }catch(error){
    console.log('problem happend')
  }
}
</script>