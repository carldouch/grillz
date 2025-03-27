"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { Group, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { Model } from "./Grillz3";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [2, 2, 2] }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#ffcc77" />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <FloatingGrillz position={[0, 0, 0]} scale={0.15} />
        <Environment files="/HDRI_8K_009_preview.jpg" background={false} />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}

interface GrillzProps {
  position?: [number, number, number] | Vector3;
  scale?: number | [number, number, number] | Vector3;
}

function FloatingGrillz(props: GrillzProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation lente et continue en apesanteur
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;

      // Mouvement de flottement vertical
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.5 + 0.5;

      // Léger mouvement de dérive horizontale
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      groupRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.3;

      // Légère inclinaison qui change lentement
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return <Model ref={groupRef} {...props} />;
}
