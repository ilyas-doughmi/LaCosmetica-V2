export const useUserRole = async () => {
  const token = useCookie('auth_token')
  const config = useRuntimeConfig()

  const user = ref<unknown>(null)
  const role = ref<string | null>(null)

  const decodeJwtPayload = (payloadPart: string) => {
    const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')

    return globalThis.atob(padded)
  }

  const setUserRole = (data: unknown) => {
    user.value = data

    const raw = data as {
      role?: string
      user?: { role?: string }
      data?: { role?: string }
    }

    const rawRole = raw?.role ?? raw?.user?.role ?? raw?.data?.role
    role.value = typeof rawRole === 'string' ? rawRole.trim().toLowerCase() : null
  }

  if (token.value) {
    try {
      const payloadPart = token.value.split('.')[1]

      if (payloadPart) {
        setUserRole(JSON.parse(decodeJwtPayload(payloadPart)))
      }

      if (!role.value) {
        const response = await $fetch<{ user?: unknown }>(`${config.public.apiBase}/me`, {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        })

        setUserRole(response?.user ?? null)
      }
    } catch {
      user.value = null
      role.value = null
    }
  }

  return {
    user,
    role
  }
}
