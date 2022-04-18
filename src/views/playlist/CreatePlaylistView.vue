<template>
    <form @submit.prevent='handleSubmit'>
        <h4>Create New Playlist</h4>
        <input type='text' required placeholder='Playlist title' v-model='title'>
        <textarea required placeholder='Playlist description...' v-model='description'></textarea>
        <label>Upload playlist cover image</label>
        <input type='file' @change='handleChange'>
        <div class='error'>{{ fileError }}</div>
        <button v-if='!isPending'>Create</button>
        <button v-else disabled>Saving</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { Timestamp } from 'firebase/firestore'

export default {
    name: 'CreatePlaylistView',
    setup() {
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)

        const { url, filePath, uploadImage } = useStorage()
        const { error, addToCollection } = useCollection('playlists')
        const { user } = getUser()
        const router = useRouter()

        const handleSubmit = async () => {
            if (file.value) {
                isPending.value = true
                await uploadImage(file.value)
                const res = await addToCollection({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: Timestamp.now(),
                })
                isPending.value = false
                if (!error.value) {
                    await router.push({ name: 'playlistDetails', params: { id: res.id } })
                } else {
                    console.log(error.value)
                }
            }
        }

        // allowed file types
        const types = ['image/png', 'image/jpeg']

        const handleChange = (e) => {
            const selected = e.target.files[0]
            if (selected && types.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please select an image file (png or jpeg)'
            }
        }

        return { title, description, fileError, isPending, handleSubmit, handleChange }
    },
}
</script>

<style scoped>
input[type='file'] {
    border: 0;
    padding: 0;
}

label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
}

button {
    margin-top: 20px;
}

</style>