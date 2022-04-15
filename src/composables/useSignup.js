import { ref } from 'vue'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { projectAuth } from '@/firebase/config'

const error = ref(null)
const isPending = ref(false)

const signup = async (displayName, email, password) => {
    error.value = null
    isPending.value = true
    try {
        const res = await createUserWithEmailAndPassword(
            projectAuth,
            email,
            password
        )
        if (res) {
            await updateProfile(res.user, { displayName })
        }
        isPending.value = false
        return res
    } catch (err) {
        error.value = err.message
        isPending.value = false
    }
}
const useSignup = () => ({ error, signup, isPending })

export default useSignup
