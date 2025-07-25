// import { db } from '@/lib/firebase'
// import { collection, getDocs } from 'firebase/firestore'
// import { NextResponse } from 'next/server'

// export async function GET() {
//   try {
//     const snapshot = await getDocs(collection(db, 'agent_views')) // 👈 update if needed

//     // Group by agentId
//     const viewCounts: Record<string, { agentName: string; views: number }> = {}

//     snapshot.forEach(doc => {
//       const { agentId, agentName } = doc.data()

//       if (!viewCounts[agentId]) {
//         viewCounts[agentId] = { agentName, views: 1 }
//       } else {
//         viewCounts[agentId].views++
//       }
//     })

//     const result = Object.entries(viewCounts).map(([agentId, data]) => ({
//       agentId,
//       agentName: data.agentName,
//       totalViews: data.views,
//     }))

//     return NextResponse.json(result)
//   } catch (err) {
//     console.error('[agent-views] Error fetching data:', err)
//     return NextResponse.json({ error: 'Failed to fetch agent views' }, { status: 500 })
//   }
// }


import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const snap = await getDocs(collection(db, 'agent_views'))

    const views = snap.docs.map(doc => {
      const data = doc.data()

      return {
        agentId: doc.id,
        agentName: data.agentName ?? 'Unknown',
        totalViews: data.totalViews ?? data.viewCount ?? 0, // 💥 fallback logic
      }
    })

    return NextResponse.json(views)
  } catch (err) {
    console.error('❌ Failed to fetch agent views:', err)
    return NextResponse.json({ error: 'Failed to fetch agent views' }, { status: 500 })
  }
}
