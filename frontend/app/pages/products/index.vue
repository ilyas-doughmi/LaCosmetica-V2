<template>
  <Header />
  <div class="min-h-screen bg-gray-50 pt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Produits</h1>
        <p class="text-gray-600">Découvrez notre collection de cosmétiques naturels</p>
      </div>
    <div v-if="pending" class="text-gray-500">
      Chargement des produits en cours...
    </div>
    <div v-else-if="error" class="text-red-600">Problem in fetching data....</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
  v-for="produit in products" 
  :key="produit.id" 
  class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
>
  
  <NuxtLink :to="`/products/${produit.slug}`" class="relative w-full h-64 bg-gray-50 overflow-hidden block">
    <img 
      v-if="produit.images && produit.images.length > 0" 
      :src="produit.images[0].image_url" 
      :alt="produit.name" 
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
    />
    <div v-else class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 group-hover:bg-gray-200 transition-colors">
      <svg class="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    </div>
  </NuxtLink>

  <div class="p-6 flex flex-col flex-grow">
    
    <span class="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
      {{ produit.category.name }}
    </span>

    <NuxtLink :to="`/products/${produit.slug}`" class="block mb-2">
      <h3 class="text-lg font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-1">
        {{ produit.name }}
      </h3>
    </NuxtLink>

    <p class="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">
      {{ produit.description }}
    </p>

    <div class="flex justify-between items-center mt-auto border-t border-gray-50 pt-4">
      <span class="text-xl font-bold text-gray-900">{{ produit.price }} €</span>
      
      <NuxtLink 
        :to="`/products/${produit.slug}`" 
        class="bg-black hover:bg-gray-800 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 shadow hover:shadow-md"
      >
        Découvrir
      </NuxtLink>
    </div>

  </div>
</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '../../components/Header.vue'
import { ref } from 'vue'
const config = useRuntimeConfig();



const {data: products,pending,error} = await useLazyFetch(`${config.public.apiBase}/products`)
</script>

<style scoped>
</style>
