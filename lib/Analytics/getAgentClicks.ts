// import { doc, getDoc } from 'firebase/firestore';
// import { db } from './firebase';

// export async function getAgentClicks(userId: string) {
//   const docRef = doc(db, 'agent_clicks', userId);
//   const docSnap = await getDoc(docRef);
//   console.log('Fetched clicks:', docSnap.exists() ? docSnap.data() : 'No data found');
//   return docSnap.exists() ? docSnap.data() : {};
// }


import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { app } from '@/lib/firebase'

const db = getFirestore(app)

function slugifyAgentName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

export async function getAgentClicks(agentName: string): Promise<number> {
  const slug = slugifyAgentName(agentName)
  const docRef = doc(db, 'agent_clicks', slug)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data().totalClicks || 0
  }
  return 0
}
