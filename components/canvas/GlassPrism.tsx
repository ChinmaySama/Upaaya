"use client";

import { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Floating luminous prism in bright trust-blue & sapphire refractive glass.
 * Auto-rotates smoothly; click-and-drag to spin manually.
 */
export function GlassPrism() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [dragging, setDragging] = useState(false);
  const velocity = useRef({ x: 0, y: 0.18 });
  const lastPointer = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (!dragging) {
      mesh.rotation.y += velocity.current.y * delta;
      mesh.rotation.x += velocity.current.x * delta;
      velocity.current.x *= 0.98;
      velocity.current.y += (0.18 - velocity.current.y) * 0.01;
    }
  });

  function handlePointerDown(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    setDragging(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
  }

  function handlePointerMove(e: ThreeEvent<PointerEvent>) {
    if (!dragging || !meshRef.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;

    meshRef.current.rotation.y += dx * 0.01;
    meshRef.current.rotation.x += dy * 0.01;
    velocity.current = { x: dy * 0.002, y: dx * 0.002 };
    lastPointer.current = { x: e.clientX, y: e.clientY };
  }

  return (
    <mesh
      ref={meshRef}
      onPointerDown={handlePointerDown}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
      onPointerMove={handlePointerMove}
    >
      <icosahedronGeometry args={[1.5, 0]} />
      <MeshTransmissionMaterial
        thickness={0.8}
        roughness={0.03}
        transmission={0.96}
        ior={1.35}
        chromaticAberration={0.06}
        anisotropy={0.4}
        distortion={0.25}
        distortionScale={0.4}
        temporalDistortion={0.15}
        color="#3B82F6"
      />
    </mesh>
  );
}
