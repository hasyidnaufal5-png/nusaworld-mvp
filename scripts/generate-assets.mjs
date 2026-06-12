// Generator manifest aset 3D NusaWorld.
// Scan public/assets/** lalu tulis src/app/game/assets.ts (registry data, auto-generated).
//
// Pakai:  npm run assets:gen
// Jalankan ulang setiap kali menambah/menghapus file .glb di public/assets.

import {
  closeSync,
  existsSync,
  openSync,
  readSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSET_ROOT = path.join(ROOT, "public", "assets");
const OUT_FILE = path.join(ROOT, "src", "app", "game", "assets.ts");

// ---------------------------------------------------------------------------
// Aturan grup bangunan — dievaluasi berurutan, kecocokan PERTAMA yang menang.
// Edit daftar ini kalau ada aset baru yang butuh grup berbeda.
// ---------------------------------------------------------------------------
const BUILDING_GROUP_RULES = [
  ["haji-umroh", /haram|mina|jamarat|arafah|muzdalifah|nabawi|ziarah/],
  ["wisata", /wisata/],
  ["diorama", /diorama/],
  ["props", /props/],
  ["interior", /interior/],
  ["alam", /vegetasi|pohon|bunga|tanaman/],
  ["rumah", /rumah-(?!sakit)/],
  ["regional", /asia|eropa|afrika|amerika|cina|india|turki|belanda|jerman/],
];
const BUILDING_DEFAULT_GROUP = "kota";

// Urutan tampil grup di navigasi (grup tak terdaftar otomatis paling akhir).
const BUILDING_GROUP_ORDER = [
  "kota",
  "rumah",
  "interior",
  "regional",
  "diorama",
  "alam",
  "props",
  "wisata",
  "haji-umroh",
];
const CHARACTER_GROUP_ORDER = ["manusia", "hewan"];

// Override nama tampilan (slug -> nama) kalau hasil otomatis kurang pas.
const NAME_OVERRIDES = {
  "kit-30-rumah-1-5": "Rumah 1–5",
  "kit-31-rumah-6-10": "Rumah 6–10",
  "h10-kudanil": "Kuda Nil",
  "h12-beruangkutub": "Beruang Kutub",
  "h27-kurakura": "Kura-kura",
};

// ---------------------------------------------------------------------------

const errors = [];

function titleCase(slugPart) {
  return slugPart
    .split("-")
    .map((w) => (/^\d/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

/** Validasi ringan: 4 byte pertama file GLB harus "glTF". */
function hasGlbMagic(filePath) {
  const buf = Buffer.alloc(4);
  const fd = openSync(filePath, "r");
  try {
    readSync(fd, buf, 0, 4, 0);
  } finally {
    closeSync(fd);
  }
  return buf.toString("ascii") === "glTF";
}

function listGlbFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".glb"))
    .sort();
}

function checkFile(absPath, relLabel) {
  if (!hasGlbMagic(absPath)) {
    errors.push(`Bukan GLB valid (magic byte "glTF" tidak ditemukan): ${relLabel}`);
  }
}

function buildingEntry(fileName) {
  const slug = fileName.replace(/\.glb$/, "");
  const m = slug.match(/^kit-(\d+)-(.+)$/);
  const order = m ? Number(m[1]) : 0;
  const base = m ? m[2] : slug;
  const rule = BUILDING_GROUP_RULES.find(([, re]) => re.test(slug));
  return {
    id: slug,
    name: NAME_OVERRIDES[slug] ?? titleCase(base),
    file: `/assets/buildings/${fileName}`,
    category: "bangunan",
    group: rule ? rule[0] : BUILDING_DEFAULT_GROUP,
    order,
  };
}

function characterEntry(subdir, fileName) {
  const slug = fileName.replace(/\.glb$/, "");
  const m = slug.match(/^h?(\d+)-(.+)$/);
  const order = m ? Number(m[1]) : 0;
  const base = m ? m[2] : slug;
  return {
    id: slug,
    name: NAME_OVERRIDES[slug] ?? titleCase(base),
    file: `/assets/characters/${subdir}/${fileName}`,
    category: "karakter",
    group: subdir,
    order,
  };
}

function groupRank(order, group) {
  const i = order.indexOf(group);
  return i === -1 ? order.length : i;
}

// ---- scan ----
const buildings = listGlbFiles(path.join(ASSET_ROOT, "buildings")).map((f) => {
  checkFile(path.join(ASSET_ROOT, "buildings", f), `buildings/${f}`);
  return buildingEntry(f);
});
buildings.sort(
  (a, b) =>
    groupRank(BUILDING_GROUP_ORDER, a.group) - groupRank(BUILDING_GROUP_ORDER, b.group) ||
    a.order - b.order,
);

const characterDirs = ["manusia", "hewan"].concat(
  // subfolder baru di characters/ otomatis ikut ter-scan
  existsSync(path.join(ASSET_ROOT, "characters"))
    ? readdirSync(path.join(ASSET_ROOT, "characters"), { withFileTypes: true })
        .filter((d) => d.isDirectory() && !["manusia", "hewan"].includes(d.name))
        .map((d) => d.name)
    : [],
);
const characters = characterDirs.flatMap((sub) =>
  listGlbFiles(path.join(ASSET_ROOT, "characters", sub)).map((f) => {
    checkFile(path.join(ASSET_ROOT, "characters", sub, f), `characters/${sub}/${f}`);
    return characterEntry(sub, f);
  }),
);
characters.sort(
  (a, b) =>
    groupRank(CHARACTER_GROUP_ORDER, a.group) - groupRank(CHARACTER_GROUP_ORDER, b.group) ||
    a.order - b.order,
);

const assets = [...buildings, ...characters];

// ---- validasi ----
if (assets.length === 0) {
  errors.push(`Tidak ada file .glb ditemukan di ${ASSET_ROOT}`);
}
const seen = new Set();
for (const a of assets) {
  if (seen.has(a.id)) errors.push(`ID duplikat: ${a.id}`);
  seen.add(a.id);
}
if (errors.length > 0) {
  console.error("Generate manifest GAGAL:");
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

// ---- tulis ----
const q = JSON.stringify;
const rows = assets
  .map(
    (a) =>
      `  { id: ${q(a.id)}, name: ${q(a.name)}, file: ${q(a.file)}, category: ${q(a.category)}, group: ${q(a.group)}, order: ${a.order} },`,
  )
  .join("\n");

const out = `// ============================================================================
// FILE INI AUTO-GENERATED oleh scripts/generate-assets.mjs — JANGAN diedit manual.
// Tambah aset: taruh file .glb di public/assets/** lalu jalankan:
//   npm run assets:gen
// ============================================================================
import type { GameAsset } from "./asset-types";

export const GAME_ASSETS: GameAsset[] = [
${rows}
];
`;

writeFileSync(OUT_FILE, out);

// ---- ringkasan ----
const summary = {};
for (const a of assets) {
  const key = `${a.category} / ${a.group}`;
  summary[key] = (summary[key] ?? 0) + 1;
}
console.log(`OK — ${assets.length} aset ditulis ke ${path.relative(ROOT, OUT_FILE)}`);
for (const [key, count] of Object.entries(summary)) {
  console.log(`  ${key}: ${count}`);
}
