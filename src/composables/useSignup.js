import { ref } from 'vue'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { projectAuth } from '@/firebase/config'

const error = ref(null)
const signup = async (displayName, email, password) => {
    error.value = null
    try {
        const res = await createUserWithEmailAndPassword(
            projectAuth,
            email,
            password
        )
        if (res) {
            await updateProfile(res.user, { displayName })
        }
        return res
    } catch (err) {
        error.value = err.message
    }
}
const useSignup = () => {
    return { error, signup }
}

export default useSignup
