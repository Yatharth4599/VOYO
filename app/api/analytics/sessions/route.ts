import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'session_logs'))

    const sessions = snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        userId: data.userId || 'anonymous',
        timestamp: data.timestamp || null,
      }
    })

    return NextResponse.json(sessions)
  } catch (err) {
    console.error('[sessions] Error fetching session logs:', err)
    return NextResponse.json({ error: 'Failed to fetch session logs' }, { status: 500 })
  }
}
