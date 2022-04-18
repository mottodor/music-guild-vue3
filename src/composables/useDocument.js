import { doc, deleteDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'

const isPending = ref(false)
const docError = ref(null)

const deleteDocument = async (collectionName, id) => {
    isPending.value = true
    docError.value = null
    try {
        await deleteDoc(doc(projectFirestore, collectionName, id))
        isPending.value = false
    } catch (err) {
        docError.value = err.message
        isPending.value = false
    }
}

const useDocument = () => ({ docError, deleteDocument, isPending })

export default useDocument
