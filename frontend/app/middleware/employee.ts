export default defineNuxtRouteMiddleware(async () => {
  const { isAuth } = useAuth()
  const { role } = await useUserRole()

  if (!isAuth.value) {
    return navigateTo('/login')
  }

  if (role.value !== 'employee') {
    return navigateTo('/')
  }
})
