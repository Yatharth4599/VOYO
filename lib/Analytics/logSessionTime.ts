import { db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'

export async function logSessionTime(userId: string, durationMs: number, page: string) {
  const sessionId = `${userId}_${Date.now()}`

  const docRef = doc(db, 'session_logs', sessionId)

  await setDoc(docRef, {
    userId,
    durationMs,
    page,
    timestamp: new Date().toISOString(),
  })

  console.log('🔥 Firestore logged:', {
    userId,
    durationMs,
    page,
  })
}
