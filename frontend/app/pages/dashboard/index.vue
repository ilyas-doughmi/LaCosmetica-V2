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

      <div v-if="pendingStats" class="min-h-[30vh] flex items-center justify-center">
        <Loader />
      </div>

      <div v-else-if="errorStats" class="text-red-600 mb-8">
        Problem in fetching dashboard data.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
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
                <p class="font-semibold text-gray-900">{{ new Date(order.order_date).toLocaleDateString() }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">{{ order.total_amount }} EUR</p>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-white mt-2">{{ order.status }}</span>
              </div>
            </div>
            <p v-if="!orders || orders.length === 0" class="text-sm text-gray-500">No orders found.</p>
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

const { data: statsData, pending: pendingStats, error: errorStats } = await useLazyFetch(`${config.public.apiBase}/admin/stats`, {
  headers: {
    Authorization: `Bearer ${token.value}`
  }
})

const { data: ordersData } = await useLazyFetch(`${config.public.apiBase}/orders`, {
  headers: {
    Authorization: `Bearer ${token.value}`
  }
})

const stats = computed(() => {
  const sales = statsData.value?.sales || {}
  return [
    { label: 'Total sales', value: sales.total_sales || 0, note: 'Orders with preparing/delivered status' },
    { label: 'Total orders', value: sales.total_orders || 0, note: 'All paid orders' },
    { label: 'Products sold', value: (statsData.value?.popular_products || []).reduce((sum, item) => sum + Number(item.total_quantity || 0), 0), note: 'Total sold quantity' },
    { label: 'Categories', value: (statsData.value?.categories || []).length, note: 'Collections available' }
  ]
})

const orders = computed(() => (ordersData.value || []).slice(0, 5))
</script>
