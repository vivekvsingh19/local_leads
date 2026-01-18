import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Fix for TypeScript errors regarding missing intrinsic elements for R3F
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      points: any;
      bufferGeometry: any;
      bufferAttribute: any;
      pointsMaterial: any;
      icosahedronGeometry: any;
      meshBasicMaterial: any;
      ambientLight: any;
    }
  }
}

const ParticleSphere = ({ 
  count = 2000, 
  color = "#FF5500", 
  radius = 2,
  size = 0.02,
  speed = 0.05
}) => {
  const points = useRef<THREE.Points>(null!);

  // Generate random points on a sphere
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Uniform random distribution on sphere surface
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count, radius]);

  useFrame((state) => {
    const { clock, mouse } = state;
    const t = clock.getElapsedTime() * speed;
    
    // Constant rotation
    if (points.current) {
        points.current.rotation.y = t;
        
        // Mouse influence (subtle tilt)
        const targetX = -mouse.y * 0.2;
        const targetY = mouse.x * 0.2;
        points.current.rotation.x += (targetX - points.current.rotation.x) * 0.02;
        points.current.rotation.z += (targetY - points.current.rotation.z) * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Wireframe sphere for structural tech look
const WireframeSphere = ({ color, radius, opacity = 0.1 }: { color: string, radius: number, opacity?: number }) => {
    const mesh = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if(mesh.current) {
            mesh.current.rotation.y = -t * 0.05;
            mesh.current.rotation.z = t * 0.02;
        }
    });

    return (
        <mesh ref={mesh}>
            <icosahedronGeometry args={[radius, 2]} />
            <meshBasicMaterial 
                color={color} 
                wireframe 
                transparent 
                opacity={opacity} 
            />
        </mesh>
    );
};

// The main 3D Scene
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      
      {/* Pushed further right */}
      <group position={[2.5, 0, -2]}>
          {/* Main Dense Particle Sphere (Orange) */}
          <ParticleSphere 
            count={1500} 
            color="#FF5500" 
            radius={2.2} 
            size={0.025}
            speed={0.1}
          />
          
          {/* Outer Sparse Particle Sphere (Blue/White accent) */}
          <ParticleSphere 
            count={500} 
            color="#3b82f6" 
            radius={2.8} 
            size={0.03}
            speed={-0.05}
          />

          {/* Wireframe for structure */}
          <WireframeSphere color="#FF5500" radius={2.2} opacity={0.05} />
      </group>
      
      {/* Pushed further left and down */}
       <group position={[-3, -1.5, -3]}>
          <ParticleSphere 
            count={400} 
            color="#94a3b8" 
            radius={1.5} 
            size={0.02}
            speed={0.05}
          />
       </group>
    </>
  );
};

const Background3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-100 transition-opacity duration-1000">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background3D;