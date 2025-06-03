'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

export default function AnimatedSphere() {
  return (
    <Canvas className="w-full h-[500px]">
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Suspense fallback={null}>
        <mesh rotation={[0.4, 0.4, 0]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial wireframe color="#3B82F6" />
        </mesh>
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
    </Canvas>
  );
}
