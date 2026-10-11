"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

const LAYERS = 80;
const LAYER_H = 0.016;
const PRINT_SECONDS = 10;
const HOLD_SECONDS = 2.5;
const CYCLE = PRINT_SECONDS + HOLD_SECONDS;

const BED_TOP = -0.55;
const FILAMENT = new THREE.Color("#ff6a1a");

// Twisted hexagonal vase profile
const radiusAt = (i: number) => {
  const t = i / LAYERS;
  return 0.22 + 0.1 * Math.sin(t * Math.PI * 1.15) + 0.03 * Math.sin(t * Math.PI * 4);
};
const twistAt = (i: number) => (i / LAYERS) * Math.PI * 0.85;

const metal = { color: "#5a606c", metalness: 0.6, roughness: 0.4 };

function Printer({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);
  const layers = useRef<THREE.InstancedMesh>(null);
  const hotLayer = useRef<THREE.Mesh>(null);
  const bed = useRef<THREE.Group>(null);
  const gantry = useRef<THREE.Group>(null);
  const carriage = useRef<THREE.Group>(null);

  const layerGeometry = useMemo(() => new THREE.CylinderGeometry(1, 1, LAYER_H * 0.9, 6), []);

  useEffect(() => {
    const mesh = layers.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3();
    const p = new THREE.Vector3();
    for (let i = 0; i < LAYERS; i++) {
      const r = radiusAt(i);
      p.set(0, LAYER_H * (i + 0.5), 0);
      q.setFromAxisAngle(THREE.Object3D.DEFAULT_UP, twistAt(i));
      s.set(r, 1, r);
      mesh.setMatrixAt(i, m.compose(p, q, s));
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.count = reducedMotion ? LAYERS : 0;
  }, [reducedMotion]);

  useFrame((state, delta) => {
    if (!root.current || !layers.current || !hotLayer.current) return;
    if (reducedMotion) {
      hotLayer.current.visible = false;
      return;
    }

    const t = state.clock.elapsedTime % CYCLE;
    const progress = Math.min(t / PRINT_SECONDS, 1);
    const printing = progress < 1;
    const done = Math.floor(progress * LAYERS);
    layers.current.count = done;

    // Nozzle traces the perimeter of the current layer
    const i = Math.min(done, LAYERS - 1);
    const r = radiusAt(i);
    const angle = state.clock.elapsedTime * 9;
    const nx = printing ? Math.cos(angle) * r : -0.95;
    const nz = printing ? Math.sin(angle) * r : 0;
    const layerY = BED_TOP + LAYER_H * (done + 1);

    // Bed-slinger kinematics: bed moves on Z, carriage on X, gantry on Y
    bed.current!.position.z = THREE.MathUtils.damp(bed.current!.position.z, -nz, 10, delta);
    carriage.current!.position.x = THREE.MathUtils.damp(carriage.current!.position.x, nx, 10, delta);
    gantry.current!.position.y = THREE.MathUtils.damp(
      gantry.current!.position.y,
      printing ? layerY : layerY + 0.25,
      6,
      delta,
    );

    hotLayer.current.visible = printing;
    hotLayer.current.position.y = LAYER_H * (done + 0.5);
    hotLayer.current.rotation.y = twistAt(i);
    hotLayer.current.scale.set(r, 1, r);
    const mat = hotLayer.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 1.6 + Math.sin(state.clock.elapsedTime * 20) * 0.4;

    // Scroll + pointer orbit
    const scroll = typeof window === "undefined" ? 0 : window.scrollY;
    const targetY = 0.3 + scroll * 0.0012 + state.pointer.x * 0.35;
    const targetX = 0.08 - state.pointer.y * 0.12;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, targetY, 4, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, targetX, 4, delta);
  });

  return (
    <group ref={root} rotation={[0.08, 0.3, 0]} position={[0, -0.1, 0]}>
      {/* Base */}
      <mesh position={[0, BED_TOP - 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.3, 0.14, 1.9]} />
        <meshStandardMaterial {...metal} />
      </mesh>

      {/* Uprights + top bar */}
      {[-1.05, 1.05].map((x) => (
        <mesh key={x} position={[x, 0.35, 0]} castShadow>
          <boxGeometry args={[0.09, 1.95, 0.09]} />
          <meshStandardMaterial {...metal} />
        </mesh>
      ))}
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[2.19, 0.09, 0.09]} />
        <meshStandardMaterial {...metal} />
      </mesh>

      {/* Sliding bed with the print on top */}
      <group ref={bed}>
        <mesh position={[0, BED_TOP - 0.03, 0]} receiveShadow>
          <boxGeometry args={[1.5, 0.05, 1.5]} />
          <meshStandardMaterial color="#1c1f25" metalness={0.3} roughness={0.6} />
        </mesh>
        <gridHelper args={[1.4, 14, "#ff6a1a", "#3a3f49"]} position={[0, BED_TOP + 0.001, 0]} />
        <group position={[0, BED_TOP, 0]}>
          <instancedMesh ref={layers} args={[layerGeometry, undefined, LAYERS]} castShadow>
            <meshStandardMaterial color={FILAMENT} roughness={0.45} metalness={0.05} />
          </instancedMesh>
          <mesh ref={hotLayer} geometry={layerGeometry}>
            <meshStandardMaterial color="#ffd2b5" emissive={FILAMENT} emissiveIntensity={1.6} />
          </mesh>
        </group>
      </group>

      {/* X gantry that climbs layer by layer */}
      <group ref={gantry} position={[0, BED_TOP + 0.2, 0]}>
        <mesh position={[0, 0.32, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 2.1, 12]} />
          <meshStandardMaterial color="#c9ccd2" metalness={0.9} roughness={0.2} />
        </mesh>
        <group ref={carriage}>
          <mesh position={[0, 0.3, 0.02]} castShadow>
            <boxGeometry args={[0.28, 0.32, 0.22]} />
            <meshStandardMaterial color={FILAMENT} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.07, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.05, 0.12, 16]} />
            <meshStandardMaterial color="#d8b26a" metalness={0.9} roughness={0.25} />
          </mesh>
          <pointLight position={[0, 0.02, 0]} color={FILAMENT} intensity={0.6} distance={0.6} />
        </group>
      </group>
    </group>
  );
}

export default function PrinterScene({
  active,
  reducedMotion,
}: {
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      shadows="percentage"
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [2.2, 1.7, 4.4], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#7aa7ff" />
      <Float speed={reducedMotion ? 0 : 1.4} rotationIntensity={0.15} floatIntensity={0.35}>
        <Printer reducedMotion={reducedMotion} />
      </Float>
      <ContactShadows position={[0, -0.85, 0]} opacity={0.55} scale={6} blur={2.6} far={2} />
    </Canvas>
  );
}
