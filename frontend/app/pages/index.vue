<template>
    <Header />
    <div class="min-h-screen bg-gray-50 pt-24">
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
            <div class="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 md:p-12">
                <p class="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">La Cosmetica</p>
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
                    Simple beauty,
                    <br>
                    natural care.
                </h1>
                <p class="text-gray-600 max-w-2xl mb-8">
                    Discover clean skincare products designed for daily routines and healthier skin.
                </p>
                <div class="flex flex-col sm:flex-row gap-3">
                    <NuxtLink
                        to="/products"
                        class="inline-flex items-center justify-center bg-black hover:bg-gray-800 text-white text-sm font-semibold px-7 py-3 rounded-full transition-colors"
                    >
                        Shop Products
                    </NuxtLink>
                    <NuxtLink
                        to="/categories"
                        class="inline-flex items-center justify-center border border-gray-300 hover:border-gray-900 text-gray-900 text-sm font-semibold px-7 py-3 rounded-full transition-colors"
                    >
                        Browse Categories
                    </NuxtLink>
                </div>
            </div>
        </section>

        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div class="bg-white border border-gray-200 rounded-2xl p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-2">Natural formulas</h2>
                    <p class="text-sm text-gray-600">Balanced ingredients selected for everyday comfort.</p>
                </div>
                <div class="bg-white border border-gray-200 rounded-2xl p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-2">Fast delivery</h2>
                    <p class="text-sm text-gray-600">Simple checkout and quick shipping for your orders.</p>
                </div>
                <div class="bg-white border border-gray-200 rounded-2xl p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-2">Trusted quality</h2>
                    <p class="text-sm text-gray-600">Carefully crafted products with clean standards.</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import Header from '../components/Header.vue'

</script>