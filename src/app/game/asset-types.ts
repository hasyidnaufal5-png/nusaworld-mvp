// Tipe data registry aset 3D Dunia Game.
// Data: assets.ts (auto-generated) — API akses: asset-registry.ts.

export type AssetCategory = "bangunan" | "karakter";

export interface GameAsset {
  /** Slug unik — nama file tanpa ekstensi .glb */
  id: string;
  /** Nama tampilan untuk UI */
  name: string;
  /** Path publik file .glb (relatif terhadap domain) */
  file: string;
  /** Kategori utama aset */
  category: AssetCategory;
  /** Sub-grup untuk pengelompokan di UI (mis. "interior", "hewan") */
  group: string;
  /** Urutan stabil di dalam grupnya */
  order: number;
}
