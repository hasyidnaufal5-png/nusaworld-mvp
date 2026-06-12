"use client";

import Link from "next/link";
import {
  CATEGORY_FILTERS,
  groupAssets,
  groupLabel,
  type CategoryFilter,
  type GameAsset,
} from "../asset-registry";

interface ViewerHudProps {
  filter: CategoryFilter;
  list: GameAsset[];
  active: GameAsset;
  index: number;
  onFilterChange: (filter: CategoryFilter) => void;
  onSelect: (id: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

/** Overlay UI viewer: bar atas (judul + filter kategori) dan bar bawah (navigasi model). */
export default function ViewerHud({
  filter,
  list,
  active,
  index,
  onFilterChange,
  onSelect,
  onPrev,
  onNext,
}: ViewerHudProps) {
  const groups = groupAssets(list);

  return (
    <>
      {/* Bar atas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-wrap items-start gap-3 p-4">
        <div className="pointer-events-auto flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-full bg-white/85 px-4 py-2.5 text-xs font-extrabold text-ocean shadow backdrop-blur transition hover:bg-white"
          >
            ← Peta
          </Link>
          <div className="rounded-2xl bg-white/85 px-4 py-2 shadow backdrop-blur">
            <div className="text-sm font-black leading-tight text-ink">Galeri Aset 3D</div>
            <div className="text-[11px] font-bold text-muted">Fondasi Dunia Game NusaWorld</div>
          </div>
        </div>

        <div className="pointer-events-auto ml-auto flex gap-1 rounded-full bg-white/85 p-1.5 shadow backdrop-blur">
          {CATEGORY_FILTERS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => onFilterChange(c.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold transition ${
                filter === c.value
                  ? "bg-ocean text-white shadow"
                  : "text-ocean hover:bg-[#E3F0F9]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bar bawah: prev / dropdown / next / counter */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center p-4">
        <div className="pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-2 rounded-2xl bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Model sebelumnya"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green text-lg font-black text-white shadow-[0_3px_0_#1D9E75] transition hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
          >
            ‹
          </button>

          <select
            value={active.id}
            onChange={(e) => onSelect(e.target.value)}
            aria-label="Pilih model"
            className="h-9 max-w-[46vw] cursor-pointer rounded-xl border border-[rgba(10,40,71,.15)] bg-white px-2.5 text-sm font-bold text-ink outline-none focus:border-ocean sm:max-w-xs"
          >
            {groups.map((g) => (
              <optgroup key={g.group} label={groupLabel(g.group)}>
                {g.assets.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <button
            type="button"
            onClick={onNext}
            aria-label="Model berikutnya"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green text-lg font-black text-white shadow-[0_3px_0_#1D9E75] transition hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
          >
            ›
          </button>

          <span className="rounded-full bg-gold px-3 py-1.5 text-xs font-extrabold text-[#5C4503]">
            {index + 1} / {list.length}
          </span>
          <span className="hidden rounded-full bg-[#E3F0F9] px-3 py-1.5 text-xs font-extrabold text-ocean sm:inline">
            {groupLabel(active.group)}
          </span>
        </div>
      </div>
    </>
  );
}
