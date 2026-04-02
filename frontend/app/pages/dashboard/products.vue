<template>
  <Header />
  <div class="min-h-screen bg-gray-50 pt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Manage Products</h1>
        <p class="text-gray-600">Simple admin view for products.</p>
      </div>

      <div v-if="pending" class="min-h-[30vh] flex items-center justify-center">
        <Loader />
      </div>

      <div v-else-if="error" class="text-red-600 mb-6">
        Problem in fetching products.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.id" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p class="text-sm text-gray-500">{{ product.category?.name }}</p>
          <h2 class="text-xl font-semibold text-gray-900 mt-1 mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 text-sm mb-4">{{ product.price }} EUR</p>
          <div class="flex gap-2">
            <button class="px-4 py-2 rounded-full bg-black text-white text-sm">Edit</button>
            <button @click="deleteProduct(product.id)" class="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-900">Delete</button>
          </div>
        </div>
        <p v-if="products.length === 0" class="text-sm text-gray-500">No products found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '../../components/Header.vue'

definePageMeta({
  middleware: ['auth', 'admin']
})

const config = useRuntimeConfig()
const token = useCookie('auth_token')

const { data: products, pending, error, refresh } = await useLazyFetch(`${config.public.apiBase}/admin/products`, {
  headers: {
    Authorization: `Bearer ${token.value}`
  }
})

const deleteProduct = async (id) => {
  await $fetch(`${config.public.apiBase}/admin/products/${id}`, {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  refresh()
}
</script>
