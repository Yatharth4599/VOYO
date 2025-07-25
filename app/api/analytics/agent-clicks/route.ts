import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'agent_clicks'))

    const data = snapshot.docs.map(doc => ({
      agentId: doc.id,
      name: doc.data().agentName,
      clicks: doc.data().totalClicks,
    }))

    return NextResponse.json(data)
  } catch (err) {
    console.error('[agent-clicks] Error fetching data:', err)
    return NextResponse.json({ error: 'Failed to fetch agent clicks' }, { status: 500 })
  }
}
