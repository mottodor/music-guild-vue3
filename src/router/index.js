import { createRouter, createWebHistory } from 'vue-router'
import { projectAuth } from '@/firebase/config'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView'
import SignupView from '@/views/auth/SignupView'
import CreatePlaylistView from '@/views/playlist/CreatePlaylistView'

const requireAuth = (to, from, next) => {
    const user = projectAuth.currentUser
    if (!user) {
        next({ name: 'login' })
    } else {
        next()
    }
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        beforeEnter: requireAuth,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignupView,
    },
    {
        path: '/playlists/create',
        name: 'createPlaylist',
        component: CreatePlaylistView,
        beforeEnter: requireAuth,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
