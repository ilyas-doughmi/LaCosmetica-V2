<template>
  <Header />
  <div class="min-h-screen bg-gray-50 pt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Manage Orders</h1>
        <p class="text-gray-600">Simple admin view for orders.</p>
      </div>

      <div class="space-y-4">
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
        >
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p class="text-sm text-gray-500">Order #{{ order.id }}</p>
              <p class="text-lg font-semibold text-gray-900">{{ order.customer }}</p>
            </div>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-white w-fit">
              {{ order.status }}
            </span>
          </div>

          <div class="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p class="text-lg font-bold text-gray-900">{{ order.total }}</p>
            <div class="flex gap-2">
              <button class="px-4 py-2 rounded-full bg-black text-white text-sm">Mark preparing</button>
              <button class="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-900">Mark delivered</button>
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

const orders = [
  { id: '1042', customer: 'Sarah L.', status: 'pending', total: '79.00 EUR' },
  { id: '1041', customer: 'Yassine M.', status: 'preparing', total: '54.00 EUR' },
  { id: '1039', customer: 'Nora B.', status: 'delivered', total: '29.00 EUR' }
]
</script>
