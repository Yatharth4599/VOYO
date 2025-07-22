// import { db } from "@/lib/firebase";
// import { doc, setDoc, increment } from "firebase/firestore";

// export const logAgentClick = async (userId: string, agentName: string) => {
//   const ref = doc(db, "users", userId, "agentClicks", agentName);
//   await setDoc(ref, { count: increment(1) }, { merge: true });
// };


import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore'
import { app } from '@/lib/firebase' // <-- adjust to your Firebase app path


const db = getFirestore(app)

function slugifyAgentName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove weird chars
    .replace(/\s+/g, '-')     // Spaces → hyphens
    .trim()
}

export async function logAgentClick(agentName: string) {
  const slug = slugifyAgentName(agentName)

  // Global clicks
  const globalRef = doc(db, 'stats', 'agent_clicks_global')
  const globalSnap = await getDoc(globalRef)
  if (globalSnap.exists()) {
    await updateDoc(globalRef, { totalClicks: increment(1) })
  } else {
    await setDoc(globalRef, { totalClicks: 1 })
  }

  // Per-agent clicks
  const agentRef = doc(db, 'agent_clicks', slug)
  const agentSnap = await getDoc(agentRef)
  if (agentSnap.exists()) {
    await updateDoc(agentRef, { totalClicks: increment(1) })
  } else {
    await setDoc(agentRef, {
      agentName,
      totalClicks: 1,
    })
  }
}
