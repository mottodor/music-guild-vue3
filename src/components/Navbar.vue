<template>
    <div class='navbar'>
        <nav>
            <img src='@/assets/logo.png' alt='Logo'>
            <h1>
                <router-link :to="{name: 'home'}">Music Guild</router-link>
            </h1>
            <div class='links'>
                <div v-if='user'>
                    <router-link :to="{name: 'createPlaylist'}" class='btn'>Create Playlist</router-link>
                    <button @click='handleClick'>Logout</button>
                </div>
                <div v-else>
                    <router-link :to="{name:'signup'}" class='btn'>Signup</router-link>
                    <router-link :to="{name:'login'}" class='btn'>Login</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

export default {
    name: 'Navbar',
    setup() {
        const { error, logout } = useLogout()
        const { user } = getUser()
        const router = useRouter()


        const handleClick = async () => {
            await logout()
            console.log('user logged out')
            console.log(user.value)
            await router.push({ name: 'login' })
        }
        return { error, handleClick, user }
    },
}
</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}

nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

nav h1 {
    margin-left: 20px;
}

nav .links {
    margin-left: auto;
}

nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
}

nav img {
    max-width: 60px;
    border-radius: 50%;
}
</style>