import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const useCollection = (collectionName) => {
    const error = ref(null)

    const addToCollection = async (document) => {
        try {
            await addDoc(collection(projectFirestore, collectionName), document)
        } catch (err) {
            error.value = err.message
        }
    }
    return { error, addToCollection }
}

export default useCollection
