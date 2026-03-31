export const useAuth = () => {
    const token = useCookie('auth_token')

    const isAuth = computed(() => !!token.value)

    return{
        isAuth
    }
}