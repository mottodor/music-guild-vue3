import { ref as vueRef } from 'vue'
import { ref as ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { projectStorage } from '@/firebase/config'
import getUser from '@/composables/getUser'

const { user } = getUser()

const useStorage = () => {
    const error = vueRef(null)
    const url = vueRef(null)
    const filePath = vueRef(null)

    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = ref(projectStorage, filePath.value)

        try {
            await uploadBytes(storageRef, file)
            url.value = await getDownloadURL(storageRef)
        } catch (err) {
            error.value = err.message
        }
    }

    return { error, url, filePath, uploadImage }
}

export default useStorage
