"use client";

import { useGLTF } from "@react-three/drei";

/**
 * Memuat satu model GLB via useGLTF (lazy + suspense + cache otomatis per URL).
 * Komponen ini sengaja kecil: penempatan/skala diurus pembungkusnya
 * (<Center>/<Bounds> di ViewerCanvas), bukan di sini.
 */
export default function AssetModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}
