import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'search_queries'))

    const queryCounts: Record<string, number> = {}

    snapshot.forEach(doc => {
      const { query } = doc.data()
      if (!query) return

      const normalized = query.trim().toLowerCase()
      queryCounts[normalized] = (queryCounts[normalized] || 0) + 1
    })

    const result = Object.entries(queryCounts)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count) // Top queries first

    return NextResponse.json(result)
  } catch (err) {
    console.error('[search-queries] Error fetching data:', err)
    return NextResponse.json({ error: 'Failed to fetch queries' }, { status: 500 })
  }
}
