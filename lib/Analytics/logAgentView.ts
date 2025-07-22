// /lib/Analytics/logAgentView.ts
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore'

export async function logAgentView(agentName: string) {
  try {
    const docRef = doc(db, 'agent_views', agentName)
    const snap = await getDoc(docRef)

    if (snap.exists()) {
      await updateDoc(docRef, { viewCount: increment(1) })
    } else {
      await setDoc(docRef, { viewCount: 1, agentName })
    }

    console.log('👁 Logged agent view for:', agentName)
  } catch (err) {
    console.error('🔥 Firestore write failed:', err)
  }
}

