<template>
  <Header />
  <div class="min-h-screen bg-gray-50 pt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Manage Categories</h1>
        <p class="text-gray-600">Simple admin view for categories.</p>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Create Category</h2>
        <form @submit.prevent="createCategory" class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input v-model="newCategory.name" type="text" placeholder="Name" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <input v-model="newCategory.slug" type="text" placeholder="Slug (optional)" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <input v-model="newCategory.description" type="text" placeholder="Description (optional)" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <button class="md:col-span-3 w-fit px-5 py-2 rounded-full bg-black text-white text-sm">Create</button>
        </form>
        <p v-if="message" class="text-sm text-green-600 mt-3">{{ message }}</p>
        <p v-if="formError" class="text-sm text-red-600 mt-3">{{ formError }}</p>
      </div>

      <div v-if="pending" class="min-h-[30vh] flex items-center justify-center">
        <Loader />
      </div>

      <div v-else-if="error" class="text-red-600 mb-6">
        Problem in fetching categories.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="category in categoryList" :key="category.id" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div v-if="editId === category.id" class="space-y-3">
            <input v-model="editCategory.name" type="text" placeholder="Name" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <input v-model="editCategory.slug" type="text" placeholder="Slug" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <input v-model="editCategory.description" type="text" placeholder="Description" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <div class="flex gap-2">
              <button @click="updateCategory(category.id)" class="px-4 py-2 rounded-full bg-black text-white text-sm">Save</button>
              <button @click="cancelEdit" class="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-900">Cancel</button>
            </div>
          </div>

          <div v-else>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ category.name }}</h2>
            <p class="text-gray-600 text-sm mb-4">{{ category.description || 'No description' }}</p>
            <div class="flex gap-2">
              <button @click="startEdit(category)" class="px-4 py-2 rounded-full bg-black text-white text-sm">Edit</button>
              <button @click="deleteCategory(category.id)" class="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-900">Delete</button>
            </div>
          </div>
        </div>
        <p v-if="categoryList.length === 0" class="text-sm text-gray-500">No categories found.</p>
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

const { data: categories, pending, error, refresh } = await useLazyFetch(`${config.public.apiBase}/admin/categories`, {
  headers: {
    Authorization: `Bearer ${token.value}`
  }
})

const message = ref('')
const formError = ref('')

const newCategory = ref({
  name: '',
  slug: '',
  description: ''
})

const editId = ref(null)
const editCategory = ref({
  name: '',
  slug: '',
  description: ''
})

const categoryList = computed(() => categories.value || [])

const createCategory = async () => {
  message.value = ''
  formError.value = ''

  try {
    await $fetch(`${config.public.apiBase}/admin/categories`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: {
        name: newCategory.value.name,
        slug: newCategory.value.slug || null,
        description: newCategory.value.description || null
      }
    })

    newCategory.value = { name: '', slug: '', description: '' }
    message.value = 'Category created successfully.'
    refresh()
  } catch (e) {
    formError.value = 'Problem creating category.'
  }
}

const startEdit = (category) => {
  editId.value = category.id
  editCategory.value = {
    name: category.name || '',
    slug: category.slug || '',
    description: category.description || ''
  }
}

const cancelEdit = () => {
  editId.value = null
}

const updateCategory = async (id) => {
  message.value = ''
  formError.value = ''

  try {
    await $fetch(`${config.public.apiBase}/admin/categories/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: {
        name: editCategory.value.name,
        slug: editCategory.value.slug || null,
        description: editCategory.value.description || null
      }
    })

    message.value = 'Category updated successfully.'
    editId.value = null
    refresh()
  } catch (e) {
    formError.value = 'Problem updating category.'
  }
}

const deleteCategory = async (id) => {
  message.value = ''
  formError.value = ''

  await $fetch(`${config.public.apiBase}/admin/categories/${id}`, {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  message.value = 'Category deleted successfully.'
  refresh()
}
</script>
