<template>
  <Header />
  <div class="min-h-screen bg-gray-50 pt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Manage Products</h1>
        <p class="text-gray-600">Simple admin view for products.</p>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Create Product</h2>
        <form @submit.prevent="createProduct" class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input v-model="newProduct.name" type="text" placeholder="Name" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <select v-model="newProduct.category_id" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">Select category</option>
            <option v-for="cat in categoryList" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
          <input v-model="newProduct.slug" type="text" placeholder="Slug (optional)" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <input v-model="newProduct.price" type="number" step="0.01" placeholder="Price" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <input v-model="newProduct.stock" type="number" min="0" placeholder="Stock" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <input v-model="newProduct.imagesText" type="text" placeholder="Image URLs (comma separated, max 4)" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <textarea v-model="newProduct.description" placeholder="Description" class="md:col-span-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"></textarea>
          <button class="md:col-span-2 w-fit px-5 py-2 rounded-full bg-black text-white text-sm">Create</button>
        </form>
        <p v-if="message" class="text-sm text-green-600 mt-3">{{ message }}</p>
        <p v-if="formError" class="text-sm text-red-600 mt-3">{{ formError }}</p>
      </div>

      <div v-if="pending" class="min-h-[30vh] flex items-center justify-center">
        <Loader />
      </div>

      <div v-else-if="error" class="text-red-600 mb-6">
        Problem in fetching products.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.id" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div v-if="editId === product.id" class="space-y-3">
            <input v-model="editProduct.name" type="text" placeholder="Name" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <select v-model="editProduct.category_id" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="">Select category</option>
              <option v-for="cat in categoryList" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
            <input v-model="editProduct.slug" type="text" placeholder="Slug" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <input v-model="editProduct.price" type="number" step="0.01" placeholder="Price" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <input v-model="editProduct.stock" type="number" min="0" placeholder="Stock" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <textarea v-model="editProduct.description" placeholder="Description" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"></textarea>
            <div class="flex gap-2">
              <button @click="updateProduct(product.id)" class="px-4 py-2 rounded-full bg-black text-white text-sm">Save</button>
              <button @click="cancelEdit" class="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-900">Cancel</button>
            </div>
          </div>

          <div v-else>
            <p class="text-sm text-gray-500">{{ product.category?.name }}</p>
            <h2 class="text-xl font-semibold text-gray-900 mt-1 mb-2">{{ product.name }}</h2>
            <p class="text-gray-600 text-sm mb-4">{{ product.price }} EUR</p>
            <div class="flex gap-2">
              <button @click="startEdit(product)" class="px-4 py-2 rounded-full bg-black text-white text-sm">Edit</button>
              <button @click="deleteProduct(product.id)" class="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-900">Delete</button>
            </div>
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

const { data: categoriesData } = await useLazyFetch(`${config.public.apiBase}/admin/categories`, {
  headers: {
    Authorization: `Bearer ${token.value}`
  }
})

const categoryList = computed(() => categoriesData.value || [])

const message = ref('')
const formError = ref('')

const newProduct = ref({
  category_id: '',
  name: '',
  slug: '',
  description: '',
  price: '',
  stock: '',
  imagesText: ''
})

const editId = ref(null)
const editProduct = ref({
  category_id: '',
  name: '',
  slug: '',
  description: '',
  price: '',
  stock: ''
})

const createProduct = async () => {
  message.value = ''
  formError.value = ''

  try {
    const images = newProduct.value.imagesText
      ? newProduct.value.imagesText.split(',').map((i) => i.trim()).filter(Boolean).slice(0, 4)
      : []

    await $fetch(`${config.public.apiBase}/admin/products`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: {
        category_id: Number(newProduct.value.category_id),
        name: newProduct.value.name,
        slug: newProduct.value.slug || null,
        description: newProduct.value.description,
        price: Number(newProduct.value.price),
        stock: Number(newProduct.value.stock),
        images
      }
    })

    newProduct.value = {
      category_id: '',
      name: '',
      slug: '',
      description: '',
      price: '',
      stock: '',
      imagesText: ''
    }
    message.value = 'Product created successfully.'
    refresh()
  } catch (e) {
    formError.value = 'Problem creating product.'
  }
}

const startEdit = (product) => {
  editId.value = product.id
  editProduct.value = {
    category_id: product.category_id || '',
    name: product.name || '',
    slug: product.slug || '',
    description: product.description || '',
    price: product.price || '',
    stock: product.stock || ''
  }
}

const cancelEdit = () => {
  editId.value = null
}

const updateProduct = async (id) => {
  message.value = ''
  formError.value = ''

  try {
    await $fetch(`${config.public.apiBase}/admin/products/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: {
        category_id: Number(editProduct.value.category_id),
        name: editProduct.value.name,
        slug: editProduct.value.slug || null,
        description: editProduct.value.description,
        price: Number(editProduct.value.price),
        stock: Number(editProduct.value.stock)
      }
    })

    message.value = 'Product updated successfully.'
    editId.value = null
    refresh()
  } catch (e) {
    formError.value = 'Problem updating product.'
  }
}

const deleteProduct = async (id) => {
  message.value = ''
  formError.value = ''

  await $fetch(`${config.public.apiBase}/admin/products/${id}`, {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  message.value = 'Product deleted successfully.'
  refresh()
}
</script>
