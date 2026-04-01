<template>
	<Header />
	<div class="min-h-screen bg-gray-50 pt-24">
		<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
			<div class="mb-10">
				<h1 class="text-4xl font-bold text-gray-900 mb-2">Categories</h1>
				<p class="text-gray-600">Explore our product collections by category.</p>
			</div>
            <div v-if="pending"><h1>loading data.....</h1></div>
            <div v-else-if="error" class="text-red-600"><h1>error in loading data !! </h1></div>
			<div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-5 mt-8">
				<article
					v-for="category in categories"
					:key="category.id"
					class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
				>


					<h2 class="text-xl font-semibold text-gray-900 mb-2">{{ category.name }}</h2>
					<p class="text-sm text-gray-600 mb-5">{{ category.description }}</p>

					<div class="flex items-center justify-between pt-4 border-t border-gray-100">
						<span class="text-sm text-gray-500">{{ category.productsCount }} products</span>
                        <NuxtLink :to="`/products?categorie=${category.name}`">
                            						<button class="text-sm font-medium text-gray-900 hover:text-black transition-colors">
							View
						</button>
                        </NuxtLink>

					</div>
				</article>
			</div>
		</section>
	</div>
</template>

<script setup>
import Header from '../../components/Header.vue'

const config = useRuntimeConfig()

const { data: categories, pending, error, refresh } = await useLazyFetch(
  `${config.public.apiBase}/categories`
)
</script>
