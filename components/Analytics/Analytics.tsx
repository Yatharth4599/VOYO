// 'use client';

// import Script from 'next/script';

// export default function Analytics() {
//   return (
//     <>
//       <Script
//         src="https://www.googletagmanager.com/gtag/js?id=G-8F9FJXMX7R"
//         strategy="afterInteractive"
//       />
//       <Script id="gtag-init" strategy="afterInteractive">
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           window.gtag = gtag;
//           gtag('js', new Date());
//           gtag('config', 'G-8F9FJXMX7R');
//         `}
//       </Script>
//     </>
//   );
// }

// 'use client';

// import { useEffect } from 'react';

// export default function Analytics() {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://www.googletagmanager.com/gtag/js?id=G-P7EPQS0VQ3';
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       console.log('[Analytics] GA script loaded ✅');

//       window.dataLayer = window.dataLayer || [];
//       function gtag(...args: any[]) {
//         console.log('[Analytics] gtag call →', args); // ← DEBUG LOG
//         window.dataLayer.push(args);
//       }
//       window.gtag = gtag;

//       gtag('js', new Date());
//       gtag('config', 'G-P7EPQS0VQ3', { debug_mode: true });

//       console.log('[Analytics] gtag initialized 🧠');
//     };
//   }, []);

//   return null;
// }


// 'use client';

// import Script from 'next/script';

// export default function Analytics() {
//   return (
//     <>
//       <Script
//         src="https://www.googletagmanager.com/gtag/js?id=G-NR6GRLGPSV"
//         strategy="afterInteractive"
//       />
//       <Script id="gtag-init" strategy="afterInteractive">
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           window.gtag = gtag;
//           gtag('js', new Date());
//           gtag('config', 'G-NR6GRLGPSV', {
//             debug_mode: true
//           });
//         `}
//       </Script>
//     </>
//   );
// }


// //G-P7EPQS0VQ3



'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

export default function Analytics() {
  if (!GA_MEASUREMENT_ID) return null; // Don’t render anything if ID isn’t set

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            debug_mode: true
          });
        `}
      </Script>
    </>
  );
}
