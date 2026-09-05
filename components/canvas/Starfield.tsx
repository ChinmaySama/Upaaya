"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 600;
const FIELD_SIZE = 18;

/** Gentle floating light particles drifting upward. */
export function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * FIELD_SIZE;
      arr[i * 3 + 1] = (Math.random() - 0.5) * FIELD_SIZE;
      arr[i * 3 + 2] = (Math.random() - 0.5) * FIELD_SIZE;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const nextY = posAttr.getY(i) + delta * 0.18;
      posAttr.setY(i, nextY > FIELD_SIZE / 2 ? -FIELD_SIZE / 2 : nextY);
    }
    posAttr.needsUpdate = true;
    points.rotation.y += delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#2563EB"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
