// import { db } from '@/lib/firebase'
// import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore'

// export async function logAgentView(agentName: string) {
//   try {
//     const docRef = doc(db, 'agent_views', agentName)
//     const snap = await getDoc(docRef)

//     if (snap.exists()) {
//       await updateDoc(docRef, { viewCount: increment(1) })
//     } else {
//       await setDoc(docRef, { viewCount: 1, agentName })
//     }

//     console.log('👁 Logged agent view for:', agentName)
//   } catch (err) {
//     console.error('🔥 Firestore write failed:', err)
//   }
// }

// import { db } from '@/lib/firebase'
// import { doc, setDoc, updateDoc, getDoc, increment, serverTimestamp } from 'firebase/firestore'

// export async function logAgentView(agentId: string, agentName: string) {
//   const ref = doc(db, 'agent_views', agentId) // 👈 fixed doc ID, based on agentId

//   try {
//     const snap = await getDoc(ref)

//     if (snap.exists()) {
//       await updateDoc(ref, {
//         totalViews: increment(1),
//       })
//     } else {
//       await setDoc(ref, {
//         agentId,
//         agentName,
//         totalViews: 1,
//         createdAt: serverTimestamp(),
//       })
//     }

//     await updateDoc(doc(db, 'stats', 'global'), {
//       totalViews: increment(1),
//     })
//   } catch (err) {
//     console.error('👁️ Failed to log agent view:', err)
//   }
// }


import { db } from '@/lib/firebase'
import {
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

export async function logAgentView(agentId: string, agentName: string) {
  try {
    const ref = doc(db, 'agent_views', agentId)
    const snap = await getDoc(ref)
    const data = snap.exists() ? snap.data() : {}

    await setDoc(ref, {
      agentName,
      viewCount: (data?.viewCount ?? data?.totalViews ?? 0) + 1,
      updatedAt: serverTimestamp(),
    })

    // ✅ This MUST run every time
    await updateDoc(doc(db, 'stats', 'global'), {
      totalViews: increment(1),
    })

    console.log(`👁️ Logged view for ${agentName}`)
  } catch (err) {
    console.error('❌ Failed to log agent view:', err)
  }
}
