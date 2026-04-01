<template>
    <Header />
    <div class="min-h-screen bg-gray-50 pt-24">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div class="mb-8">
                <h1 class="text-3xl sm:text-4xl font-bold text-gray-900">Mes commandes</h1>
                <p class="text-gray-600 mt-2">Suivez vos commandes recentes en un coup d'oeil.</p>
            </div>
            <div v-if="pending" class="min-h-[40vh] flex items-center justify-center">
                <Loader />
            </div>
            <div v-else-if="error" class="text-red-600"><h1>problem in fetching data</h1></div>
            <div v-else class="space-y-4">
                <div v-for="order in orders"    :key="order.id" class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <p class="text-sm text-gray-500">Commande #{{ order.id }}</p>
                            <p class="text-lg font-semibold text-gray-900">{{ new Date(order.order_date).toLocaleDateString()}}</p>
                        </div>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-white w-fit">{{order.status}}</span>
                    </div>
                    <div class="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p class="text-lg font-bold text-gray-900">${{ order.total_amount }}</p>
                        <button @click="cancelorder(order.id)" class="px-3 py-1  text-sm font-semibold text-white bg-red-600 rounded-full hover:bg-red-800 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5" v-if="order.status == 'pending'">cancel order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '../../components/Header.vue'

const config = useRuntimeConfig();
const token = useCookie('auth_token')


const {data: orders,pending,error} = await useLazyFetch(`${config.public.apiBase}/orders`,{
    headers:{
        Authorization: `Bearer ${token.value}`
    }
})


const cancelorder = async (id) => {
    const res = await $fetch(`${config.public.apiBase}/orders/cancel/${id}`,{
        method:'post',
        headers:{
            Authorization: `Bearer ${token.value}`
        }

    })

    console.log(`cancel order with id ${id}`);
}

</script>