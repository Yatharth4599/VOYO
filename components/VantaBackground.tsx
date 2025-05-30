// "use client";

// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import NET from "vanta/dist/vanta.net.min";

// export default function VantaBackground() {
//   const vantaRef = useRef(null);
//   const [vantaEffect, setVantaEffect] = useState<any>(null);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     // ✨ Fix that stupid vertexColors warning
//     const originalSetValues = (THREE.Material as any).prototype.setValues;
//     (THREE.Material as any).prototype.setValues = function (values: any) {
//       if (values && values.vertexColors === undefined) {
//         values.vertexColors = false;
//       }
//       return originalSetValues.call(this, values);
//     };

//     if (!vantaEffect && vantaRef.current) {
//       const effect = NET({
//         el: vantaRef.current,
//         THREE: THREE,
//         mouseControls: true,
//         touchControls: true,
//         gyroControls: false,
//         minHeight: 200.0,
//         minWidth: 200.0,
//         scale: 1.0,
//         scaleMobile: 1.0,
//         color: 0xf59f24,
//         backgroundColor: 0xffffff,
//       });

//       setVantaEffect(effect);
//     }

//     return () => {
//       if (vantaEffect) vantaEffect.destroy();
//     };
//   }, [vantaEffect]);

//   return (
//     <div
//       ref={vantaRef}
//       className="fixed top-0 left-0 w-full h-full -z-10"
//       style={{ backgroundColor: "transparent" }}
//     />
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && typeof window !== "undefined" && vantaRef.current) {
      const originalSetValues = (THREE.Material as any).prototype.setValues;
      (THREE.Material as any).prototype.setValues = function (values: any) {
        if (values && values.vertexColors === undefined) {
          values.vertexColors = false;
        }
        return originalSetValues.call(this, values);
      };

      const effect = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x22d3ee,
        backgroundColor: 0x000000,
      });

      setVantaEffect(effect);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none"
      style={{ backgroundColor: "transparent" }}
    >
      <span className="invisible">.</span>
    </div>
  );
}
