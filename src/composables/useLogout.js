import { ref } from 'vue'
import { signOut } from 'firebase/auth'
import { projectAuth } from '@/firebase/config'

const error = ref(null)

const logout = async () => {
    error.value = null
    try {
        await signOut(projectAuth)
    } catch (err) {
        error.value = err.message
    }
}
const useLogout = () => ({ error, logout })

export default useLogout
