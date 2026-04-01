export const useUserRole = () => {
  const token = useCookie('auth_token')

  const user = computed(() => {
    if (!token.value) return null

    try {
      const payloadPart = token.value.split('.')[1]
      if (!payloadPart) return null

      const payload = JSON.parse(atob(payloadPart))
      return payload
    } catch (e) {
      return null
    }
  })

  const role = computed(() => user.value?.role || null)

  return {
    user,
    role
  }
}