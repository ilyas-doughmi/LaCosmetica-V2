export const useUserRole = () => {
  const token = useCookie('auth_token')
  const config = useRuntimeConfig()

  const authInitialized = useState('auth-role-initialized', () => false)
  const authUser = useState<any | null>('auth-user', () => null)
  const authRole = useState<string | null>('auth-role', () => null)

  const decodeJwtPayload = (payloadPart: string) => {
    const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')

    if (typeof globalThis.atob === 'function') {
      return globalThis.atob(padded)
    }

    throw new Error('JWT decode is not available in this environment')
  }

  const resolveRoleFromUser = (user: any) => {
    const rawRole = user?.role ?? user?.user?.role ?? user?.data?.role

    return typeof rawRole === 'string' ? rawRole.trim().toLowerCase() : null
  }

  const initializeAuthState = async () => {
    if (authInitialized.value) return
    authInitialized.value = true

    if (!token.value) {
      authUser.value = null
      authRole.value = null
      return
    }

    try {
      const payloadPart = token.value.split('.')[1]
      if (payloadPart) {
        const payload = JSON.parse(decodeJwtPayload(payloadPart))
        authUser.value = payload
        authRole.value = resolveRoleFromUser(payload)

        if (authRole.value) return
      }

      const response = await $fetch(`${config.public.apiBase}/me`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      authUser.value = response.user
      authRole.value = resolveRoleFromUser(response.user)
    } catch (error) {
      authUser.value = null
      authRole.value = null
    }
  }

  if (import.meta.client) {
    onMounted(() => {
      void initializeAuthState()
    })
  }

  const user = computed(() => authUser.value)
  const role = computed(() => authRole.value)

  return {
    user,
    role
  }
}
