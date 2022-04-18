import { ref, watchEffect } from 'vue'
import { projectFirestore } from '@/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'

const getDocument = (collectionName, id) => {
    const document = ref(null)
    const error = ref(null)

    const unsub = onSnapshot(
        doc(projectFirestore, collectionName, id),
        doc => {
            if (doc.data()) {
                document.value = { ...doc.data(), id: doc.id }
            } else {
                error.value = 'The document not exist'
            }
        },
        err => {
            document.value = null
            error.value = err.message
        }
    )

    watchEffect(onInvalidate => {
        onInvalidate(() => unsub())
    })

    return { document, error }
}

export default getDocument
