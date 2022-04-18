<template>
    <form @submit.prevent='handleSubmit'>
        <h3>Signup</h3>
        <input type='text' placeholder='Display name' v-model='displayName'>
        <input type='email' placeholder='Email' v-model='email'>
        <input type='password' placeholder='Password' v-model='password'>
        <div class='error' v-if='error'>{{ error }}</div>
        <button v-if='!isPending'>Sign up</button>
        <button v-if='isPending' disabled>Loading</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '@/composables/useSignup'
import { useRouter } from 'vue-router'

export default {
    name: 'SignupView',
    setup() {
        const email = ref('')
        const password = ref('')
        const displayName = ref('')

        const router = useRouter()
        const { error, signup, isPending } = useSignup()

        const handleSubmit = async () => {
            const res = await signup(displayName.value, email.value, password.value)
            if (!error.value) {
                await router.push({ name: 'userPlaylists' })
            }
        }

        return { email, password, displayName, isPending, handleSubmit, error }
    },
}
</script>

<style scoped>

</style>