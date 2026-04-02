<template>
  <Header />
  <div class="min-h-screen bg-gray-50 pt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Manage Products</h1>
        <p class="text-gray-600">Simple admin view for products.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.name" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p class="text-sm text-gray-500">{{ product.category }}</p>
          <h2 class="text-xl font-semibold text-gray-900 mt-1 mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 text-sm mb-4">{{ product.price }}</p>
          <div class="flex gap-2">
            <button class="px-4 py-2 rounded-full bg-black text-white text-sm">Edit</button>
            <button class="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-900">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '../../components/Header.vue'

definePageMeta({
  middleware: ['auth', 'admin']
})

const products = [
  { name: 'Cream Hydratante Bio', category: 'Skincare', price: '49.00 EUR' },
  { name: 'Serum Repair Night', category: 'Skincare', price: '59.00 EUR' },
  { name: 'Shampoo Naturel', category: 'Haircare', price: '24.00 EUR' }
]
</script>
