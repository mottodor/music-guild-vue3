<template>
    <form @submit.prevent='handleSubmit'>
        <h3>Login</h3>
        <input type='email' placeholder='Email' v-model='email'>
        <input type='password' placeholder='Password' v-model='password'>
        <div class='error' v-if='error'>{{ error }}</div>
        <button v-if='!isPending'>Log in</button>
        <button v-if='isPending' disabled>Loading</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '@/composables/useLogin'

export default {
    name: 'LoginView',
    setup() {
        const email = ref('')
        const password = ref('')

        const { error, login, isPending } = useLogin()

        const handleSubmit = async () => {
            const res = await login(email.value, password.value)
            if (!error.value) {
                console.log('user logged in')
            }
        }

        return { error, email, password, handleSubmit, isPending }
    },
}
</script>

<style scoped>

</style>