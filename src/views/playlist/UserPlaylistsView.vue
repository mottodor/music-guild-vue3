<template>
    <div class='user-playlists'>
        <h3>My playlists</h3>
        <div v-if='playlists'>
            <ListView :playlists='playlists' />
        </div>
        <router-link :to="{name:'createPlaylist'}" class='btn'>Create a new playlist</router-link>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView'

export default {
    name: 'UserPlaylistsView',
    components: { ListView },
    setup() {
        const { user } = getUser()
        const { documents: playlists } = getCollection('playlists', ['userId', '==', user.value.uid])
        console.log(playlists)

        return { playlists }
    },
}
</script>

<style scoped>

</style>