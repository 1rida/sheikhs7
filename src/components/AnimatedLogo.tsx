"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls, useTexture } from '@react-three/drei';

const AnimatedLogoContent = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture('/logo.png');

  // Assuming a common aspect ratio for a logo, or we could fetch image dimensions
  const logoAspectRatio = 1; // Assuming a square logo for now, adjust if needed
  const planeWidth = 5;
  const planeHeight = planeWidth / logoAspectRatio;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Gentle rotation
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} transparent />
    </mesh>
  );
};

const AnimatedLogo = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ fov: 45, position: [0, 0, 8] }}>
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={3} />
        <AnimatedLogoContent />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default AnimatedLogo;
