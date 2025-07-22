'use client'

import { useEffect, useRef } from 'react'
import { logEvent } from 'firebase/analytics'
import { analytics, db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { logSessionTime } from '@/lib/Analytics/logSessionTime'

export default function SessionTracker({ userId }: { userId: string }) {
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const handleBeforeUnload = async () => {
      const duration = Date.now() - startTimeRef.current
      const userIdToUse = userId || 'anon'

      // ✅ Log to GA4
      if (analytics) {
        logEvent(analytics, 'session_end', {
          duration_seconds: Math.floor(duration / 1000),
          page: window.location.pathname,
        })
      }

      // ✅ Log to Firestore
      const sessionId = `${userId}_${Date.now()}`
      await setDoc(doc(db, 'session_logs', sessionId), {
        userId,
        durationMs: duration,
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      })

      logSessionTime(userIdToUse, duration, window.location.pathname)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [userId])

  return null
}
