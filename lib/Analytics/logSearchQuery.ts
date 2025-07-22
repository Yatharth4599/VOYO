import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const db = getFirestore()

export async function logSearchQuery(query: string) {
  const user = getAuth().currentUser

  await addDoc(collection(db, 'search_queries'), {
    query,
    timestamp: serverTimestamp(),
    userId: user?.uid || null,
  })
}
