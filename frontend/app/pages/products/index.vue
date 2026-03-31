<template>
  <Header />
  <div class="min-h-screen bg-gray-50 pt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Produits</h1>
        <p class="text-gray-600">Découvrez notre collection de cosmétiques naturels</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Product cards will go here -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="h-56 bg-gray-200 flex items-center justify-center">
            <span class="text-gray-400">Product Image</span>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Product Name</h3>
            <p class="text-gray-600 text-sm mb-4">Product description goes here</p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-gray-900">$0.00</span>
              <button class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '../../components/Header.vue'

definePageMeta({
    middleware: 'auth'
})
</script>

<style scoped>
</style>
