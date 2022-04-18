<template>
    <div class='add-song'>
        <button v-if='!showAddSong' @click='showAddSong = true'> Add song</button>
        <form v-if='showAddSong' @submit.prevent='handleSubmit'>
            <h4>Add a new song</h4>
            <input type='text' required placeholder='Song title' v-model='title'>
            <input type='text' required placeholder='Artist' v-model='artist'>
            <button> Add</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import uniqid from 'uniqid'
import useDocument from '@/composables/useDocument'

export default {
    name: 'AddSong',
    props: ['playlist'],

    setup(props) {
        const title = ref('')
        const artist = ref('')
        const showAddSong = ref(false)
        const { updateDocument } = useDocument()

        const handleSubmit = async () => {
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: uniqid(),
            }
            await updateDocument('playlists', props.playlist.id, { songs: [...props.playlist.songs, newSong] })
            title.value = ''
            artist.value = ''
        }

        return { title, artist, showAddSong, handleSubmit }
    },
}
</script>

<style scoped>
.add-song {
    text-align: center;
    margin-top: 40px;
}

form {
    max-width: 100%;
    text-align: left;
}
</style>