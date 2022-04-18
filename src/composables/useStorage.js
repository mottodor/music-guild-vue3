import { ref as vueRef } from 'vue'
import uniqid from 'uniqid'
import {
    ref as ref,
    uploadBytes,
    deleteObject,
    getDownloadURL,
} from 'firebase/storage'
import { projectStorage } from '@/firebase/config'
import getUser from '@/composables/getUser'

const { user } = getUser()

const useStorage = () => {
    const error = vueRef(null)
    const url = vueRef(null)
    const filePath = vueRef(null)

    const uploadImage = async file => {
        filePath.value = `covers/${user.value.uid}/${uniqid() + file.name}`
        const storageRef = ref(projectStorage, filePath.value)

        try {
            await uploadBytes(storageRef, file)
            url.value = await getDownloadURL(storageRef)
        } catch (err) {
            error.value = err.message
        }
    }

    const deleteImage = async path => {
        const storageRef = ref(projectStorage, path)

        try {
            await deleteObject(storageRef)
        } catch (err) {
            error.value = err.message
        }
    }

    return { error, url, filePath, uploadImage, deleteImage }
}

export default useStorage
