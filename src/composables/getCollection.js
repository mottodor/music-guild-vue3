import { ref, watchEffect } from 'vue'
import { projectFirestore } from '@/firebase/config'
import { query, orderBy, collection, onSnapshot } from 'firebase/firestore'

const getCollection = collectionName => {
    const documents = ref(null)
    const error = ref(null)

    const collectionRef = collection(projectFirestore, collectionName)
    const q = query(collectionRef, orderBy('createdAt'))
    const unSub = onSnapshot(
        q,
        snap => {
            let results = []
            snap.docs.forEach(doc => {
                doc.data().createdAt &&
                results.push({ ...doc.data(), id: doc.id })
            })
            documents.value = results
            error.value = null
        },
        err => {
            documents.value = null
            error.value = err.message
        }
    )

    watchEffect(onInvalidate => {
        onInvalidate(() => unSub())
    })

    return { documents, error }
}

export default getCollection
