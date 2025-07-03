// 'use client'

// import Image from 'next/image'
// import { useTheme } from 'next-themes'
// import { useEffect, useState } from 'react'

// export default function Logo() {
//   const { resolvedTheme } = useTheme()
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (!mounted) return null // Prevent hydration mismatch by rendering nothing on server

//   return (
//     <>
//       {resolvedTheme === 'dark' ? (
//         <Image
//           src="/Voyo Black Logo.png"
//           alt="voyo logo dark"
//           width={120}
//           height={120}
//           className="object-contain"
//         />
//       ) : (
//         <Image
//           src="/logo-voyo-removebg-preview.png"
//           alt="voyo logo light"
//           width={120}
//           height={120}
//           className="object-contain"
//         />
//       )}
//     </>
//   )
// }


'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Logo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent hydration mismatch by rendering nothing on server

  return (
    <>
      {resolvedTheme === 'dark' ? (
        <Image
          src="/Voyo Black Logo.png"
          alt="voyo logo dark"
          width={120}
          height={120}
          className="object-contain"
        />
      ) : (
        <Image
          src="/logo-voyo-removebg-preview.png"
          alt="voyo logo light"
          width={120}
          height={120}
          className="object-contain"
        />
      )}
    </>
  )
}
