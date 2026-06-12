// API registry aset 3D — komponen viewer hanya boleh mengimpor dari file ini,
// bukan langsung dari assets.ts, supaya sumber data mudah diganti nanti.

import { GAME_ASSETS } from "./assets";
import type { AssetCategory, GameAsset } from "./asset-types";

export type { AssetCategory, GameAsset };
export { GAME_ASSETS };

export type CategoryFilter = AssetCategory | "semua";

export const CATEGORY_FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "bangunan", label: "Bangunan" },
  { value: "karakter", label: "Karakter" },
];

/** Daftar aset sesuai filter kategori. */
export function filterAssets(filter: CategoryFilter): GameAsset[] {
  if (filter === "semua") return GAME_ASSETS;
  return GAME_ASSETS.filter((a) => a.category === filter);
}

/** Kelompokkan aset per grup; urutan grup mengikuti kemunculan pertama di data. */
export function groupAssets(
  assets: GameAsset[],
): { group: string; assets: GameAsset[] }[] {
  const map = new Map<string, GameAsset[]>();
  for (const asset of assets) {
    const bucket = map.get(asset.group);
    if (bucket) {
      bucket.push(asset);
    } else {
      map.set(asset.group, [asset]);
    }
  }
  return [...map.entries()].map(([group, grouped]) => ({ group, assets: grouped }));
}

/** Label grup untuk UI — kapitalisasi tiap kata dari slug grup. */
export function groupLabel(group: string): string {
  return group
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
