import { ref } from 'vue'
import { projectAuth } from '@/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

const error = ref(null)

const login = async (email, password) => {
    error.value = null
    try {
        return await signInWithEmailAndPassword(projectAuth, email, password)
    } catch (err) {
        error.value = err.message
    }
}

const useLogin = () => ({ error, login })

export default useLogin
