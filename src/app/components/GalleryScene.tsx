import { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { Portfolio, PortfolioListName } from '../data/portfolio-data';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ArtworkEntry {
  listName: PortfolioListName;
  portfolio: Portfolio;
  imageUrl: string;
  label: string;
}

interface GallerySceneProps {
  artworks: ArtworkEntry[];
  onArtworkClick: (listName: PortfolioListName, portfolioKey: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ROOM_WIDTH = 24;
const ROOM_DEPTH = 20;
const ROOM_HEIGHT = 6;
const WALL_COLOR = '#f5f0eb';
const FLOOR_COLOR = '#c9b99a';
const CEILING_COLOR = '#faf8f5';
const FRAME_COLOR = '#3a2f28';
const ACCENT_GOLD = '#b8860b';

/* ------------------------------------------------------------------ */
/*  Texture preloader — loads ALL textures before Canvas mounts        */
/* ------------------------------------------------------------------ */

/** Encode each path segment for safe URLs */
function encodeImageUrl(url: string): string {
  return url
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');
}

/**
 * Preload textures using THREE.TextureLoader.loadAsync().
 * Returns a Map from original imageUrl → loaded THREE.Texture (or null on error).
 */
export function usePreloadedTextures(imageUrls: string[]) {
  const [textureMap, setTextureMap] = useState<Map<string, THREE.Texture | null>>(
    new Map(),
  );
  const [ready, setReady] = useState(false);

  // Stable key for the URL list so we don't re-run unnecessarily
  const urlKey = useMemo(() => imageUrls.join('|'), [imageUrls]);

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    Promise.all(
      imageUrls.map((url) =>
        loader
          .loadAsync(encodeImageUrl(url))
          .then((tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            return [url, tex] as [string, THREE.Texture];
          })
          .catch((err) => {
            console.warn('Gallery: failed to preload texture', url, err);
            return [url, null] as [string, null];
          }),
      ),
    ).then((entries) => {
      if (cancelled) return;
      setTextureMap(new Map(entries));
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlKey]);

  return { textureMap, ready };
}

/* ------------------------------------------------------------------ */
/*  Artwork Frame — a framed painting on the wall                     */
/*  Receives a pre-loaded texture; no async work inside Canvas.       */
/* ------------------------------------------------------------------ */

function ArtworkFrame({
  position,
  rotation,
  texture,
  label,
  width = 2.4,
  height = 1.8,
  onClick,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  texture: THREE.Texture | null;
  label: string;
  width?: number;
  height?: number;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Hover animation: gentle glow
  useFrame(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    const target = hovered ? 0.3 : 0;
    mat.emissiveIntensity += (target - mat.emissiveIntensity) * 0.1;
  });

  const handlePointerOver = useCallback(() => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  }, []);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = 'default';
  }, []);

  return (
    <group position={position} rotation={rotation}>
      {/* Frame border */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[width + 0.15, height + 0.15, 0.06]} />
        <meshStandardMaterial color={FRAME_COLOR} roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Inner gold mat */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width + 0.06, height + 0.06, 0.02]} />
        <meshStandardMaterial color={ACCENT_GOLD} roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Artwork surface */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0.015]}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry args={[width, height]} />
        {texture ? (
          <meshStandardMaterial
            map={texture}
            color="#ffffff"
            emissive={new THREE.Color(ACCENT_GOLD)}
            emissiveIntensity={0}
            roughness={0.8}
          />
        ) : (
          <meshStandardMaterial
            color="#d4cbbf"
            emissive={new THREE.Color(ACCENT_GOLD)}
            emissiveIntensity={0}
            roughness={0.8}
          />
        )}
      </mesh>

      {/* Label plaque */}
      <mesh position={[0, -(height / 2) - 0.2, 0.01]}>
        <planeGeometry args={[width * 0.6, 0.18]} />
        <meshStandardMaterial color="#f0ece4" roughness={0.9} />
      </mesh>
      <Text
        position={[0, -(height / 2) - 0.2, 0.025]}
        fontSize={0.08}
        color="#3a2f28"
        anchorX="center"
        anchorY="middle"
        maxWidth={width * 0.55}
      >
        {label}
      </Text>

      {/* Spotlight for this artwork */}
      <spotLight
        position={[0, 2.5, 1.5]}
        target-position={[0, 0, 0]}
        angle={0.4}
        penumbra={0.6}
        intensity={hovered ? 3 : 1.5}
        color="#fff5e0"
        castShadow={false}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery Room — walls, floor, ceiling                              */
/* ------------------------------------------------------------------ */

function GalleryRoom() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
        <meshStandardMaterial color={FLOOR_COLOR} roughness={0.8} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM_HEIGHT, 0]}>
        <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
        <meshStandardMaterial color={CEILING_COLOR} roughness={0.95} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, ROOM_HEIGHT / 2, -ROOM_DEPTH / 2]}>
        <planeGeometry args={[ROOM_WIDTH, ROOM_HEIGHT]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.9} />
      </mesh>

      {/* Front wall (with gap for entrance) */}
      <mesh position={[-ROOM_WIDTH / 4 - 1, ROOM_HEIGHT / 2, ROOM_DEPTH / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[ROOM_WIDTH / 2 - 2, ROOM_HEIGHT]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.9} />
      </mesh>
      <mesh position={[ROOM_WIDTH / 4 + 1, ROOM_HEIGHT / 2, ROOM_DEPTH / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[ROOM_WIDTH / 2 - 2, ROOM_HEIGHT]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.9} />
      </mesh>
      {/* Top of entrance */}
      <mesh position={[0, ROOM_HEIGHT - 0.5, ROOM_DEPTH / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[4, 1]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-ROOM_WIDTH / 2, ROOM_HEIGHT / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[ROOM_DEPTH, ROOM_HEIGHT]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.9} />
      </mesh>

      {/* Right wall */}
      <mesh position={[ROOM_WIDTH / 2, ROOM_HEIGHT / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[ROOM_DEPTH, ROOM_HEIGHT]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.9} />
      </mesh>

      {/* Baseboard trim — left */}
      <mesh position={[-ROOM_WIDTH / 2 + 0.04, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[ROOM_DEPTH, 0.2, 0.08]} />
        <meshStandardMaterial color="#d4cbbf" roughness={0.6} />
      </mesh>

      {/* Baseboard trim — right */}
      <mesh position={[ROOM_WIDTH / 2 - 0.04, 0.1, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[ROOM_DEPTH, 0.2, 0.08]} />
        <meshStandardMaterial color="#d4cbbf" roughness={0.6} />
      </mesh>

      {/* Baseboard trim — back */}
      <mesh position={[0, 0.1, -ROOM_DEPTH / 2 + 0.04]}>
        <boxGeometry args={[ROOM_WIDTH, 0.2, 0.08]} />
        <meshStandardMaterial color="#d4cbbf" roughness={0.6} />
      </mesh>

      {/* Gallery bench in center */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[2.5, 0.06, 0.7]} />
        <meshStandardMaterial color="#5c4a3a" roughness={0.5} />
      </mesh>
      {/* Bench legs */}
      {[[-1, 0.16, -0.25], [-1, 0.16, 0.25], [1, 0.16, -0.25], [1, 0.16, 0.25]].map(
        ([x, y, z], i) => (
          <mesh key={`leg-${i}`} position={[x, y, z]}>
            <boxGeometry args={[0.06, 0.32, 0.06]} />
            <meshStandardMaterial color="#4a3a2d" roughness={0.6} />
          </mesh>
        ),
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Ambient Lighting                                                   */
/* ------------------------------------------------------------------ */

function GalleryLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#fff5e0" />

      {/* Overhead track lights */}
      <pointLight position={[0, ROOM_HEIGHT - 0.3, 0]} intensity={0.8} color="#fff8f0" />
      <pointLight position={[-6, ROOM_HEIGHT - 0.3, -4]} intensity={0.5} color="#fff8f0" />
      <pointLight position={[6, ROOM_HEIGHT - 0.3, -4]} intensity={0.5} color="#fff8f0" />
      <pointLight position={[-6, ROOM_HEIGHT - 0.3, 4]} intensity={0.5} color="#fff8f0" />
      <pointLight position={[6, ROOM_HEIGHT - 0.3, 4]} intensity={0.5} color="#fff8f0" />

      {/* Soft fill from entrance */}
      <directionalLight position={[0, 4, 12]} intensity={0.3} color="#e8e0d8" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Exported Scene                                                */
/* ------------------------------------------------------------------ */

export function GalleryScene({ artworks, onArtworkClick }: GallerySceneProps) {
  // Preload ALL textures before mounting the Canvas
  const imageUrls = useMemo(() => artworks.map((a) => a.imageUrl), [artworks]);
  const { textureMap, ready } = usePreloadedTextures(imageUrls);

  // Compute artwork positions along walls
  const placements = useMemo(() => {
    const result: {
      position: [number, number, number];
      rotation: [number, number, number];
      artwork: ArtworkEntry;
    }[] = [];

    const count = artworks.length;
    const perWall = Math.ceil(count / 3); // distribute across 3 walls

    // Back wall artworks (facing viewer)
    const backWallCount = Math.min(perWall, count);
    const backSpacing = ROOM_WIDTH / (backWallCount + 1);
    for (let i = 0; i < backWallCount && result.length < count; i++) {
      result.push({
        position: [
          -ROOM_WIDTH / 2 + backSpacing * (i + 1),
          ROOM_HEIGHT / 2 + 0.2,
          -ROOM_DEPTH / 2 + 0.06,
        ],
        rotation: [0, 0, 0],
        artwork: artworks[result.length],
      });
    }

    // Left wall artworks
    const leftWallCount = Math.min(perWall, count - result.length);
    const leftSpacing = (ROOM_DEPTH - 2) / (leftWallCount + 1);
    for (let i = 0; i < leftWallCount && result.length < count; i++) {
      result.push({
        position: [
          -ROOM_WIDTH / 2 + 0.06,
          ROOM_HEIGHT / 2 + 0.2,
          -ROOM_DEPTH / 2 + 1 + leftSpacing * (i + 1),
        ],
        rotation: [0, Math.PI / 2, 0],
        artwork: artworks[result.length],
      });
    }

    // Right wall artworks
    const rightWallCount = count - result.length;
    const rightSpacing = (ROOM_DEPTH - 2) / (rightWallCount + 1);
    for (let i = 0; i < rightWallCount && result.length < count; i++) {
      result.push({
        position: [
          ROOM_WIDTH / 2 - 0.06,
          ROOM_HEIGHT / 2 + 0.2,
          -ROOM_DEPTH / 2 + 1 + rightSpacing * (i + 1),
        ],
        rotation: [0, -Math.PI / 2, 0],
        artwork: artworks[result.length],
      });
    }

    return result;
  }, [artworks]);

  // Show loading state until all textures are preloaded
  if (!ready) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="mt-4 text-sm text-base-content/60">Loading artwork textures…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{
          position: [0, 2.5, ROOM_DEPTH / 2 - 1],
          fov: 55,
          near: 0.1,
          far: 100,
        }}
        shadows
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        onPointerMissed={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <GalleryLighting />
        <GalleryRoom />

        {placements.map(({ position, rotation, artwork }, idx) => (
          <ArtworkFrame
            key={artwork.portfolio.portfolio}
            position={position}
            rotation={rotation}
            texture={textureMap.get(artwork.imageUrl) ?? null}
            label={artwork.label}
            onClick={() =>
              onArtworkClick(artwork.listName, artwork.portfolio.portfolio)
            }
          />
        ))}

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={0.5}
          maxDistance={14}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={0.3}
          target={[0, ROOM_HEIGHT / 2 - 0.5, -2]}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          dampingFactor={0.08}
          enableDamping
        />
      </Canvas>

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 bg-base-100/80 backdrop-blur-sm rounded-lg px-4 py-2 text-xs text-base-content/60 pointer-events-none">
        <span className="hidden sm:inline">Drag to look around &bull; Scroll to zoom &bull; Click artwork to explore</span>
        <span className="sm:hidden">Drag to look &bull; Pinch to zoom &bull; Tap artwork</span>
      </div>
    </div>
  );
}

export type { ArtworkEntry };
