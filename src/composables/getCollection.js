import { ref, watchEffect } from 'vue'
import { projectFirestore } from '@/firebase/config'
import {
    query as queryF,
    where,
    orderBy,
    collection,
    onSnapshot,
} from 'firebase/firestore'

const getCollection = (collectionName, query) => {
    const documents = ref(null)
    const error = ref(null)

    const collectionRef = collection(projectFirestore, collectionName)
    let q = queryF(collectionRef)
    if (query) {
        q = queryF(collectionRef, where(...query))
    }
    const unsub = onSnapshot(
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
        onInvalidate(() => unsub())
    })

    return { documents, error }
}

export default getCollection
