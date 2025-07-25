// import { db } from '@/lib/firebase'
// import { doc, getDoc, getDocs, collection } from 'firebase/firestore'
// import { NextResponse } from 'next/server'

// export async function GET() {
//   try {
//     const statsSnap = await getDoc(doc(db, 'stats', 'agent_clicks_global'))
//     const viewsSnap = await getDocs(collection(db, 'agent_views'))
//     const sessionsSnap = await getDocs(collection(db, 'session_logs'))

//     const totalClicks = statsSnap.exists() ? statsSnap.data().totalClicks || 0 : 0
//     const totalViews = viewsSnap.size
//     const totalSessions = sessionsSnap.size

//     return NextResponse.json({ totalClicks, totalViews, totalSessions })
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
//   }
// }

import { db } from '@/lib/firebase'
import { doc, getDoc, getDocs, collection } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const statsSnap = await getDoc(doc(db, 'stats', 'agent_clicks_global'))
    const viewsSnap = await getDocs(collection(db, 'agent_views'))
    const sessionsSnap = await getDocs(collection(db, 'session_logs'))

    const totalClicks = statsSnap.exists() ? statsSnap.data().totalClicks || 0 : 0

    // 🔥 Count view totals correctly
    let totalViews = 0
    viewsSnap.forEach(doc => {
      totalViews += doc.data().viewCount || 0
    })

    const totalSessions = sessionsSnap.size

    return NextResponse.json({ totalClicks, totalViews, totalSessions })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
