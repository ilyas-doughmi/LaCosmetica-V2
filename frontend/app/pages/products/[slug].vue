<template>
    <Header />
    <div class="min-h-screen bg-gray-50 pt-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div class="mb-8">
                <NuxtLink
                    to="/products"
                    class="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <span class="mr-2">←</span>
                    Retour aux produits
                </NuxtLink>
            </div>
            <div v-if="pending"><h1>loading data....</h1></div>
            <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div class="bg-gray-50 p-6 md:p-8">
                        <div class="aspect-square w-full rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
<img :src="produit.images[0].image_url" alt="">
                        </div>

                        <div v-if="produit.images.length > 1" class="mt-4 grid grid-cols-4 gap-3">
                            <div v-for="image in produit.images" class="aspect-square rounded-lg bg-gray-100 border border-gray-200">
                                    <img :src="image.image_url" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="p-6 md:p-10 flex flex-col">
                        <span class="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">{{ produit.category.name }}</span>
                        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{{ produit.name }}</h1>
                        <p class="text-gray-500 text-sm leading-relaxed mb-6">
                            {{ produit.description }}
                        </p>

                        <div class="flex items-end gap-3 mb-8">
                            <span class="text-3xl font-bold text-gray-900">${{ produit.price }}</span>
                        </div>

                        <div class="grid grid-cols-2 gap-3 mb-8">
                            <div class="rounded-xl border border-gray-200 p-3">
                                <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Stock</p>
                                <p class="text-sm font-medium text-gray-900">{{ produit.stock }}</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-3 mb-8">
                            <label for="qty" class="text-sm font-medium text-gray-700">Quantite</label>
                            <input
                                id="qty"
                                type="number"
                                min="1"
                                value="1"
                                class="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                            >
                        </div>

                        <div class="flex flex-col sm:flex-row gap-3 mt-auto">
                            <button class="bg-black hover:bg-gray-800 text-white text-sm font-medium px-6 py-3 rounded-full transition-all hover:-translate-y-0.5 shadow hover:shadow-md">
                                Ajouter au panier
                            </button>
                            <button class="text-gray-900 border border-gray-300 hover:border-gray-900 text-sm font-medium px-6 py-3 rounded-full transition-colors">
                                Ajouter aux favoris
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '~/components/Header.vue'

const route = useRoute() 
const config = useRuntimeConfig()

const slug = route.params.slug

const { data: produit, pending, error } = useLazyFetch(`${config.public.apiBase}/products/${slug}`)
</script>