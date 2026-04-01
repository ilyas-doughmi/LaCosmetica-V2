export const useNotification = ()=>{
    const notification = useState('notification', () => ({
        message: '',
        type: '',
        visible: false
    }))

    const showNotification = (message:string,type:string = 'success') =>{
        notification.value = {message,type,visible:true}

        setTimeout(() => {
            notification.value.visible = false
        },3000)
    }

    return {notification,showNotification}
}