"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Grid,
  Html,
  OrbitControls,
  useBounds,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import type { GameAsset } from "../asset-registry";
import AssetModel from "./AssetModel";

/** Indikator progres unduhan model (fallback Suspense di dalam canvas). */
function LoadProgress() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="whitespace-nowrap rounded-full bg-white/90 px-4 py-2 text-xs font-extrabold text-ocean shadow">
        Memuat model… {Math.round(progress)}%
      </div>
    </Html>
  );
}

/**
 * Pasang ulang kamera (fit + clip) setiap model aktif berganti.
 * Ditaruh di dalam <Bounds> dan di dalam <Suspense>, sehingga efek baru
 * berjalan SETELAH model selesai dimuat dan ter-mount.
 */
function RefitOnChange({ assetId }: { assetId: string }) {
  const bounds = useBounds();
  useEffect(() => {
    bounds.refresh().clip().fit();
  }, [assetId, bounds]);
  return null;
}

interface ViewerCanvasProps {
  asset: GameAsset;
  /** File tetangga (prev/next) yang di-preload agar navigasi terasa instan. */
  preloadFiles?: string[];
}

/**
 * Scene reusable untuk meninjau satu aset: kamera orbit, pencahayaan,
 * lantai grid + bayangan kontak, dan auto-fit kamera per model.
 */
export default function ViewerCanvas({ asset, preloadFiles = [] }: ViewerCanvasProps) {
  useEffect(() => {
    preloadFiles.forEach((file) => useGLTF.preload(file));
  }, [preloadFiles]);

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [5, 3.5, 7], fov: 42, near: 0.1, far: 500 }}>
      <color attach="background" args={["#DDF0FB"]} />

      {/* Pencahayaan senada dengan CityScene di landing */}
      <hemisphereLight args={["#cfe9ff", "#9ab98f", 0.95]} />
      <directionalLight position={[8, 14, 6]} intensity={1.15} color="#fff4d6" />
      <directionalLight position={[-6, 6, -8]} intensity={0.35} />

      <Suspense fallback={<LoadProgress />}>
        <Bounds fit clip margin={1.45}>
          {/* key memaksa Center mengukur ulang saat model berganti */}
          <Center bottom key={asset.id}>
            <AssetModel url={asset.file} />
          </Center>
          <RefitOnChange assetId={asset.id} />
        </Bounds>
      </Suspense>

      {/* Lantai */}
      <Grid
        position={[0, -0.001, 0]}
        args={[40, 40]}
        cellSize={0.5}
        cellColor="#9dc7e3"
        sectionSize={2.5}
        sectionColor="#5d9ec9"
        fadeDistance={42}
        fadeStrength={1.5}
        infiniteGrid
      />
      <ContactShadows position={[0, 0, 0]} opacity={0.32} scale={24} blur={2.4} far={12} resolution={512} />

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        maxPolarAngle={Math.PI * 0.495}
        minDistance={0.5}
        maxDistance={120}
      />
    </Canvas>
  );
}
