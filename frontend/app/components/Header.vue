<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        
        <NuxtLink to="/" class="text-2xl font-serif font-bold tracking-widest text-gray-900 uppercase hover:text-gray-600 transition-colors">
          La Cosmetica
        </NuxtLink>

        <nav class="hidden md:flex space-x-12">
          <NuxtLink to="/products" class="text-sm font-medium text-gray-600 hover:text-black uppercase tracking-wide transition-colors">
            Produits
          </NuxtLink>
          <NuxtLink to="/categories" class="text-sm font-medium text-gray-600 hover:text-black uppercase tracking-wide transition-colors">
            Collections
          </NuxtLink>
        </nav>

        <div class="hidden md:flex items-center space-x-4">
          <NuxtLink  v-if="!isAuth"
            to="/login" 
            class="px-8 py-3 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Se Connecter
          </NuxtLink>
          <NuxtLink  v-if="isAuth"
            to="/login" 
            class="px-8 py-3 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Panier
          </NuxtLink>
        </div>

        <div class="md:hidden flex items-center">
          <button class="text-gray-900 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

      </div>
    </div>
  </header>
</template>


<script setup>

const { isAuth } = useAuth()

</script>

