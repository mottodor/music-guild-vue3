<template>
    <div v-if='error' class='error'>{{ error }}</div>
    <div v-if='playlist' class='playlist-details'>

        <!--        playlist info-->
        <div class='playlist-info'>
            <div class='cover'><img :src='playlist.coverUrl' alt='Playlist cover'></div>
            <h2>{{ playlist.title }}</h2>
            <p class='username'>Created by {{ playlist.userName }}</p>
            <p class='description'>{{ playlist.description }}</p>
            <button v-if='ownership' @click='handleDelete'> Delete Playlist</button>
        </div>

        <!--        song list-->
        <div class='song-list'>Song list</div>
    </div>
</template>

<script>
import useStorage from '@/composables/useStorage'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import useDocument from '@/composables/useDocument'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export default {
    name: 'PlaylistDetailsView',
    props: ['id'],
    setup(props) {
        const { error, document: playlist } = getDocument('playlists', props.id)
        const { user } = getUser()
        const { deleteDocument } = useDocument()
        const { deleteImage } = useStorage()
        const router = useRouter()

        const handleDelete = async () => {
            await deleteImage(playlist.value.filePath)
            await deleteDocument('playlists', props.id)
            await router.push({ name: 'home' })
        }

        const ownership = computed(() => (
            playlist.value && user.value && playlist.value.userId === user.value.uid
        ))

        return { error, playlist, ownership, handleDelete }
    },
}
</script>

<style scoped>
.playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
}

.cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
}

.cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
}

.playlist-info {
    text-align: center;
}

.playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
}

.playlist-info p {
    margin-bottom: 20px;
}

.username {
    color: #999;
}

.description {
    text-align: left;
}

</style>