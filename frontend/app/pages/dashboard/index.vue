<template>
  <Header />
  <div class="min-h-screen bg-gray-50 pt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="mb-10">
        <p class="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Admin panel</p>
        <h1 class="text-4xl font-bold text-gray-900 mb-3">Dashboard</h1>
        <p class="text-gray-600 max-w-2xl">
          Vue simple des chiffres importants pour suivre les produits, les commandes et les categories.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div v-for="item in stats" :key="item.label" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p class="text-sm text-gray-500 mb-2">{{ item.label }}</p>
          <p class="text-3xl font-bold text-gray-900">{{ item.value }}</p>
          <p class="text-sm text-gray-600 mt-2">{{ item.note }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div class="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-xl font-semibold text-gray-900">Recent orders</h2>
            <NuxtLink to="/dashboard/orders" class="text-sm font-medium text-gray-900 hover:text-black">View orders</NuxtLink>
          </div>

          <div class="space-y-4">
            <div v-for="order in orders" :key="order.id" class="flex items-center justify-between gap-4 rounded-xl border border-gray-100 p-4">
              <div>
                <p class="text-sm text-gray-500">Order #{{ order.id }}</p>
                <p class="font-semibold text-gray-900">{{ order.client }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">{{ order.total }}</p>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-white mt-2">{{ order.status }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-gray-900 mb-5">Shortcuts</h2>

          <div class="space-y-3">
            <NuxtLink to="/dashboard/products" class="block rounded-xl border border-gray-200 px-4 py-3 text-gray-900 hover:border-gray-900 transition-colors">
              Manage products
            </NuxtLink>
            <NuxtLink to="/dashboard/categories" class="block rounded-xl border border-gray-200 px-4 py-3 text-gray-900 hover:border-gray-900 transition-colors">
              Manage categories
            </NuxtLink>
            <NuxtLink to="/dashboard/orders" class="block rounded-xl border border-gray-200 px-4 py-3 text-gray-900 hover:border-gray-900 transition-colors">
              Review orders
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-gray-900 mb-5">Top products</h2>
          <div class="space-y-3">
            <div v-for="product in topProducts" :key="product.name" class="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <div>
                <p class="font-medium text-gray-900">{{ product.name }}</p>
                <p class="text-sm text-gray-500">{{ product.category }}</p>
              </div>
              <p class="text-sm font-semibold text-gray-900">{{ product.sales }} sold</p>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-gray-900 mb-5">Categories overview</h2>
          <div class="space-y-3">
            <div v-for="category in categories" :key="category.name" class="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <div>
                <p class="font-medium text-gray-900">{{ category.name }}</p>
                <p class="text-sm text-gray-500">{{ category.products }} products</p>
              </div>
              <p class="text-sm font-semibold text-gray-900">{{ category.share }}</p>
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
  middleware: ['auth', 'admin']
})

const stats = [
  { label: 'Total sales', value: '12.4k', note: 'All time orders and revenue' },
  { label: 'Products', value: '48', note: 'Active items in catalog' },
  { label: 'Categories', value: '8', note: 'Collections available' },
  { label: 'Pending orders', value: '14', note: 'Waiting for processing' }
]

const orders = [
  { id: '1042', client: 'Sarah L.', total: '79.00 EUR', status: 'Pending' },
  { id: '1041', client: 'Yassine M.', total: '54.00 EUR', status: 'Preparing' },
  { id: '1039', client: 'Nora B.', total: '29.00 EUR', status: 'Delivered' }
]

const topProducts = [
  { name: 'Cream Hydratante Bio', category: 'Skincare', sales: 128 },
  { name: 'Serum Repair Night', category: 'Skincare', sales: 92 },
  { name: 'Shampoo Naturel', category: 'Haircare', sales: 76 }
]

const categories = [
  { name: 'Skincare', products: 18, share: '38%' },
  { name: 'Haircare', products: 12, share: '25%' },
  { name: 'Makeup', products: 10, share: '21%' },
  { name: 'Body care', products: 8, share: '16%' }
]
</script>
