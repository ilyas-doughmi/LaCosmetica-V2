<template>
  <Header />
  <div class="min-h-screen bg-gray-50 pt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Employee Orders</h1>
        <p class="text-gray-600">Prepare and deliver customer orders.</p>
      </div>

      <div v-if="pending" class="min-h-[30vh] flex items-center justify-center">
        <Loader />
      </div>

      <div v-else-if="error" class="text-red-600 mb-6">
        Problem in fetching employee orders.
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
        >
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p class="text-sm text-gray-500">Order #{{ order.id }}</p>
              <p class="text-lg font-semibold text-gray-900">{{ new Date(order.order_date).toLocaleDateString() }}</p>
            </div>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-white w-fit">
              {{ order.status }}
            </span>
          </div>

          <div class="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p class="text-lg font-bold text-gray-900">{{ order.total_amount }} EUR</p>
            <div class="flex gap-2">
              <button
                v-if="order.status === 'pending'"
                @click="prepareOrder(order.id)"
                class="px-4 py-2 rounded-full bg-black text-white text-sm"
              >
                Mark preparing
              </button>
              <button
                v-if="order.status === 'preparing'"
                @click="deliverOrder(order.id)"
                class="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-900"
              >
                Mark delivered
              </button>
            </div>
          </div>
        </div>

        <p v-if="orders.length === 0" class="text-sm text-gray-500">No orders found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '../../components/Header.vue'

definePageMeta({
  middleware: ['auth', 'employee']
})

const config = useRuntimeConfig()
const token = useCookie('auth_token')

const { data: orders, pending, error, refresh } = await useLazyFetch(`${config.public.apiBase}/employee/orders`, {
  headers: {
    Authorization: `Bearer ${token.value}`
  }
})

const prepareOrder = async (id) => {
  await $fetch(`${config.public.apiBase}/employee/orders/${id}/prepare`, {
    method: 'put',
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  refresh()
}

const deliverOrder = async (id) => {
  await $fetch(`${config.public.apiBase}/employee/orders/${id}/deliver`, {
    method: 'put',
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  refresh()
}
</script>
