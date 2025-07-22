import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

export async function getGlobalClicks(): Promise<number> {
  const ref = doc(db, 'stats', 'agent_clicks_global');
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().totalClicks || 0 : 0;
}
