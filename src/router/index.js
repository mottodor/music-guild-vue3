import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView'
import SignupView from '@/views/auth/SignupView'
import CreatePlaylistView from '@/views/playlist/CreatePlaylistView'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
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
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
