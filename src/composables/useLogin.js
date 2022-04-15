import { ref } from 'vue'
import { projectAuth } from '@/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
    error.value = null
    isPending.value = true
    try {
        const res = await signInWithEmailAndPassword(
            projectAuth,
            email,
            password
        )
        isPending.value = false
        return res
    } catch (err) {
        error.value = err.message
        isPending.value = false
    }
}

const useLogin = () => ({ error, login, isPending })

export default useLogin
