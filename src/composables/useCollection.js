import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const useCollection = (collectionName) => {
    const error = ref(null)
    const isPending = ref(false)

    const addToCollection = async (document) => {
        error.value = null
        isPending.value = true
        try {
            await addDoc(collection(projectFirestore, collectionName), document)
            isPending.value = false
        } catch (err) {
            error.value = err.message
            isPending.value = false
        }
    }
    return { error, addToCollection, isPending }
}

export default useCollection
