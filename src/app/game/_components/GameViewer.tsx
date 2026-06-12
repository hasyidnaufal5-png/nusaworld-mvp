"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GAME_ASSETS,
  filterAssets,
  type CategoryFilter,
  type GameAsset,
} from "../asset-registry";
import ViewerHud from "./ViewerHud";

// three/fiber/drei hanya dimuat di browser sebagai bundle terpisah (tanpa SSR).
const ViewerCanvas = dynamic(() => import("./ViewerCanvas"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center text-sm font-extrabold text-muted">
      Menyiapkan viewer 3D…
    </div>
  ),
});

/** Halaman viewer: state model aktif + filter kategori + navigasi keyboard. */
export default function GameViewer() {
  const [filter, setFilter] = useState<CategoryFilter>("semua");
  const [activeId, setActiveId] = useState<string>(GAME_ASSETS[0]?.id ?? "");

  const list = useMemo(() => filterAssets(filter), [filter]);

  // Aset aktif diturunkan dari state; jika tidak ada di filter aktif, pakai item pertama.
  const active: GameAsset | undefined = list.find((a) => a.id === activeId) ?? list[0];
  const index = active ? list.indexOf(active) : -1;

  const goTo = useCallback(
    (offset: number) => {
      if (list.length === 0 || index < 0) return;
      const nextIndex = (index + offset + list.length) % list.length;
      setActiveId(list[nextIndex].id);
    },
    [list, index],
  );

  // Navigasi keyboard ← / → (diabaikan saat fokus di select/input).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "SELECT" || tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  // File tetangga untuk di-preload supaya prev/next terasa instan.
  const neighborFiles = useMemo(() => {
    if (list.length < 2 || index < 0) return [];
    return [
      list[(index + 1) % list.length].file,
      list[(index - 1 + list.length) % list.length].file,
    ];
  }, [list, index]);

  if (!active) {
    return (
      <div className="grid h-dvh place-items-center text-sm font-bold text-muted">
        Registry aset kosong — jalankan <code>npm run assets:gen</code>.
      </div>
    );
  }

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#DDF0FB]">
      <div className="absolute inset-0">
        <ViewerCanvas asset={active} preloadFiles={neighborFiles} />
      </div>
      <ViewerHud
        filter={filter}
        list={list}
        active={active}
        index={index}
        onFilterChange={setFilter}
        onSelect={setActiveId}
        onPrev={() => goTo(-1)}
        onNext={() => goTo(1)}
      />
    </div>
  );
}
