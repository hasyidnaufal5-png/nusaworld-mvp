"use client";

import { useState, type CSSProperties } from "react";

/* ---------- shared meta ---------- */
type Meta = { color: string; bg: string; icon?: string; dot?: string };
const TRACK: Record<string, Meta> = {
  Umroh: { color: "#1D9E75", bg: "#E1F5EE", icon: "🕋" },
  Percakapan: { color: "#1B6CA8", bg: "#E3F0F9", icon: "💬" },
  Bisnis: { color: "#B7860B", bg: "#FBF1D0", icon: "💼" },
  Travel: { color: "#7C5BD0", bg: "#F0EBFA", icon: "✈️" },
};
const BABAK: Record<number, { chip: string; label: string; color: string; bg: string }> = {
  1: { chip: "B1", label: "Babak 1 · Mudah", color: "#1D9E75", bg: "#E1F5EE" },
  2: { chip: "B2", label: "Babak 2 · Sedang", color: "#B7860B", bg: "#FBF1D0" },
  3: { chip: "B3", label: "Babak 3 · Sulit", color: "#C0504A", bg: "#F8E4E2" },
};
const STATUS: Record<string, Meta> = {
  Terbit: { color: "#1D9E75", bg: "#E1F5EE", dot: "#2EAF73" },
  Draf: { color: "#B7860B", bg: "#FBF1D0", dot: "#E0A800" },
  Lunas: { color: "#1D9E75", bg: "#E1F5EE", dot: "#2EAF73" },
  Pending: { color: "#B7860B", bg: "#FBF1D0", dot: "#E0A800" },
};
const TYPES = [
  { key: "pg", label: "Pilihan Ganda", icon: "🔘" },
  { key: "isian", label: "Isian", icon: "⌨️" },
  { key: "susun", label: "Susun Kata", icon: "🧩" },
  { key: "audio", label: "Dengarkan Audio", icon: "🔊" },
  { key: "video", label: "Tonton Video", icon: "🎬" },
];
const LETTERS = ["A", "B", "C", "D"];
const ytId = (u: string) => {
  const m = String(u || "").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : "";
};

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "kelas", label: "Kelas", icon: "📚" },
  { key: "soal", label: "Soal", icon: "📝" },
  { key: "murid", label: "Murid", icon: "👥" },
  { key: "pembelian", label: "Pembelian", icon: "💳" },
  { key: "pengaturan", label: "Pengaturan", icon: "⚙️" },
];
const PAGE_META: Record<string, { t: string; c: string }> = {
  dashboard: { t: "Dashboard", c: "Beranda" },
  kelas: { t: "Kelas", c: "Dashboard / Kelas" },
  soal: { t: "Pembuat Soal", c: "Dashboard / Soal" },
  murid: { t: "Murid", c: "Dashboard / Murid" },
  pembelian: { t: "Pembelian", c: "Dashboard / Pembelian" },
  pengaturan: { t: "Pengaturan", c: "Dashboard / Pengaturan" },
};

const th: CSSProperties = {
  textAlign: "left",
  padding: "12px 20px",
  fontSize: 11.5,
  fontWeight: 800,
  color: "#8499AB",
  letterSpacing: ".05em",
  background: "#F4F8FB",
  borderBottom: "1.5px solid rgba(10,40,71,.08)",
};
const thMid: CSSProperties = { ...th, padding: "12px 14px" };
const tdBase: CSSProperties = {
  padding: "13px 14px",
  borderBottom: "1px solid rgba(10,40,71,.06)",
};

type ClassRow = {
  name: string;
  track: string;
  level: string;
  soal: number;
  terbit: boolean;
  isNew?: boolean;
};

export default function AdminPage() {
  const [page, setPage] = useState("kelas");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorClass, setEditorClass] = useState<ClassRow | null>(null);
  const [prereq, setPrereq] = useState("L1 Iqro - Kelas A");
  const [videoUrl, setVideoUrl] = useState("https://youtu.be/jNQXAC9IVRw");
  const [qType, setQType] = useState("pg");
  const [qText, setQText] = useState("ذَهَبَ الطَّالِبُ إِلَى الْمَسْجِدِ");
  const [opts, setOpts] = useState([
    "Murid itu pergi ke masjid",
    "Murid itu pulang dari masjid",
    "Guru itu pergi ke pasar",
    "Murid itu berada di rumah",
  ]);
  const [correct, setCorrect] = useState(0);
  const [explain, setExplain] = useState(
    "ذَهَبَ artinya 'pergi' (fi'l madhi / kata kerja lampau). إِلَى artinya 'ke', dan الْمَسْجِدِ artinya 'masjid'."
  );
  const [babak, setBabak] = useState(1);
  const [words, setWords] = useState("ذَهَبَ، الطَّالِبُ، إِلَى، الْمَسْجِدِ");
  const [isianKey, setIsianKey] = useState("ذَهَبَ");
  const [audioUrl, setAudioUrl] = useState("audio/fil-madhi-03.mp3");
  const [qVideo, setQVideo] = useState("https://youtu.be/jNQXAC9IVRw");
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState(`[
  {"tipe":"pilihan_ganda","babak":1,"pertanyaan":"جَلَسَ الضَّيْفُ فِي الْمَجْلِسِ","opsi":["Tamu itu duduk di ruang tamu","Tamu itu berdiri di pintu","Anak itu duduk di kelas","Tamu itu makan di dapur"],"kunci":0,"penjelasan":"جَلَسَ artinya duduk"},
  {"tipe":"isian","babak":2,"pertanyaan":"___ الْمُسَافِرُ الْحَقِيبَةَ (membawa)","kunci":"حَمَلَ","penjelasan":"حَمَلَ artinya membawa"},
  {"tipe":"susun_kata","babak":3,"pertanyaan":"Susun menjadi kalimat yang benar","kata":["غَسَلَ","الْخَادِمُ","السَّيَّارَةَ"],"penjelasan":"Pola: fi'l + fa'il + maf'ul bih"}
]`);
  const [questions, setQuestions] = useState([
    { id: 1, t: "ذَهَبَ الطَّالِبُ إِلَى الْمَسْجِدِ", type: "Pilihan Ganda", babak: 1, status: "Terbit" },
    { id: 2, t: "كَتَبَ الْمُدَرِّسُ الدَّرْسَ", type: "Pilihan Ganda", babak: 1, status: "Terbit" },
    { id: 3, t: "شَرِبَ الْوَلَدُ الْحَلِيبَ", type: "Isian", babak: 1, status: "Terbit" },
    { id: 4, t: "دَخَلَ التَّاجِرُ السُّوقَ", type: "Susun Kata", babak: 2, status: "Terbit" },
    { id: 5, t: "سَمِعَ الرَّجُلُ الْأَذَانَ", type: "Dengarkan Audio", babak: 2, status: "Terbit" },
    { id: 6, t: "قَرَأَتِ الْبِنْتُ الْقُرْآنَ", type: "Pilihan Ganda", babak: 2, status: "Terbit" },
    { id: 7, t: "رَجَعَ الْأَبُ مِنَ الْعَمَلِ", type: "Tonton Video", babak: 3, status: "Draf" },
    { id: 8, t: "فَتَحَ الْمُوَظَّفُ الْبَابَ", type: "Susun Kata", babak: 3, status: "Draf" },
  ]);
  const [nextId, setNextId] = useState(9);

  const keyFromLabel: Record<string, string> = {};
  TYPES.forEach((t) => (keyFromLabel[t.label] = t.key));

  /* ---------- kelas ---------- */
  const rawClasses: [string, string, string, number, boolean][] = [
    ["L1 Iqro - Kelas A", "Umroh", "L1", 12, true],
    ["L1 Iqro - Kelas B", "Percakapan", "L1", 10, true],
    ["L2 Fi'l Madhi", "Percakapan", "L2", 14, true],
    ["L2 Isim & Harf", "Bisnis", "L2", 8, false],
    ["L3 Doa Umroh", "Umroh", "L3", 16, true],
    ["L3 Percakapan Hotel", "Travel", "L3", 6, false],
    ["L4 Negosiasi Bisnis", "Bisnis", "L4", 9, false],
  ];
  const classes: ClassRow[] = rawClasses.map((r) => ({
    name: r[0],
    track: r[1],
    level: r[2],
    soal: r[3],
    terbit: r[4],
  }));
  const summary = [
    { label: "Total Kelas", value: "24", icon: "📚", bg: "#E3F0F9" },
    { label: "Kelas Terbit", value: "18", icon: "✅", bg: "#E1F5EE" },
    { label: "Kelas Draf", value: "6", icon: "✏️", bg: "#FBF1D0" },
    { label: "Total Soal", value: "312", icon: "❓", bg: "#F0EBFA" },
  ];

  const openEditor = (c: ClassRow) => {
    setEditorClass(c);
    setEditorOpen(true);
  };
  const openNew = () => {
    setEditorClass({ name: "Kelas Baru", track: "Umroh", level: "L1", soal: 0, terbit: false, isNew: true });
    setEditorOpen(true);
  };

  /* ---------- editor ---------- */
  const ed = editorClass || classes[3];
  const isNew = !!ed.isNew;
  const filled4 = isNew
    ? [false, false, false, false]
    : ed.terbit
    ? [true, true, true, true]
    : [true, true, true, false];
  const prereqFilled = prereq !== "Tidak ada prasyarat";
  const dnaCount = filled4.filter(Boolean).length + (prereqFilled ? 1 : 0);
  const soalOk = ed.soal >= 10;
  const canPublish = dnaCount === 5 && soalOk && !ed.terbit;
  const SLOT_DEF = [
    { icon: "🔤", name: "Sharaf", full: "Wazan Fi'l Madhi (فَعَلَ – يَفْعُلُ)", empty: "Belum dipilih — pilih pola sharaf" },
    { icon: "📐", name: "Nahwu", full: "Jumlah Ismiyah & Fi'liyah", empty: "Belum dipilih — pilih topik nahwu" },
    { icon: "📖", name: "Kosakata", full: "18 kosakata tematik", empty: "Belum ada — tambahkan kosakata" },
    { icon: "🧩", name: "Format Soal", full: "Pilihan Ganda + Susun Kata", empty: "Belum dipilih — pilih jenis soal quest" },
  ];
  const edVid = ytId(videoUrl);
  const edThumb = edVid ? "https://img.youtube.com/vi/" + edVid + "/mqdefault.jpg" : "";

  /* ---------- soal page ---------- */
  const showOpts = ["pg", "audio", "video"].includes(qType);
  const isIsian = qType === "isian";
  const isSusun = qType === "susun";
  const isAudio = qType === "audio";
  const isVideo = qType === "video";
  const pvType = TYPES.find((t) => t.key === qType) || TYPES[0];
  const pvBabak = BABAK[babak];
  const pvWords = String(words || "")
    .split(/[،,]/)
    .map((w) => w.trim())
    .filter(Boolean);
  const pvVid = ytId(qVideo);
  const pvThumb = pvVid ? "https://img.youtube.com/vi/" + pvVid + "/mqdefault.jpg" : "";
  const qCount = questions.length;
  const qTerbit = questions.filter((q) => q.status === "Terbit").length;

  /* ---------- import ---------- */
  const TIPE_MAP: Record<string, string> = {
    pilihan_ganda: "Pilihan Ganda",
    isian: "Isian",
    susun_kata: "Susun Kata",
    dengarkan_audio: "Dengarkan Audio",
    tonton_video: "Tonton Video",
  };
  let importOk = false,
    importErr = "",
    importCount = 0;
  let importItems: { i: number; text: string; type: string; bLabel: string; bCo: string; bBg: string; babak: number }[] = [];
  try {
    const arr = JSON.parse(importText);
    if (!Array.isArray(arr)) throw new Error("harus berupa array [ … ]");
    importItems = arr.map((it: Record<string, unknown>, i: number) => {
      const b = BABAK[(it.babak as number) ?? 0] || BABAK[1];
      return {
        i: i + 1,
        text: (it.pertanyaan as string) || "(tanpa pertanyaan)",
        type: TIPE_MAP[it.tipe as string] || "Pilihan Ganda",
        bLabel: b.label,
        bCo: b.color,
        bBg: b.bg,
        babak: (it.babak as number) || 1,
      };
    });
    importCount = arr.length;
    importOk = arr.length > 0;
  } catch (e) {
    importErr = "JSON tidak valid — " + (e as Error).message;
  }
  const applyImport = () => {
    if (!importOk) return;
    let nid = nextId;
    const added = importItems.map((it) => ({
      id: nid++,
      t: it.text,
      type: it.type,
      babak: it.babak,
      status: "Draf",
    }));
    setQuestions([...questions, ...added]);
    setNextId(nid);
    setImportOpen(false);
  };

  /* ---------- murid ---------- */
  const rawMurid: [string, string, string, number, string][] = [
    ["Nadia Rahma", "nadia.rahma@gmail.com", "L1 · L2", 78, "2 jam lalu"],
    ["Salsabila Zahra", "salsabila.z@gmail.com", "L1 · L2 · L3", 92, "Baru saja"],
    ["Bima Saputra", "bima.sptr@gmail.com", "L1", 45, "5 jam lalu"],
    ["Intan Permata", "intan.permata@gmail.com", "L1 · L2", 64, "Kemarin"],
    ["Raka Pratama", "raka.pratama@yahoo.com", "L1", 12, "Kemarin"],
    ["Fauzan Akmal", "fauzan.akmal@gmail.com", "L2", 38, "3 hari lalu"],
    ["Yusuf Hakim", "yusuf.hakim@gmail.com", "L1", 100, "2 hari lalu"],
    ["Dewi Anggraini", "dewi.anggr@gmail.com", "L1", 5, "8 Jun 2026"],
  ];
  const murid = rawMurid.map((r) => ({
    name: r[0],
    email: r[1],
    levels: r[2],
    prog: r[3] + "%",
    barW: r[3] + "%",
    barCo: r[3] >= 70 ? "#2EAF73" : r[3] >= 30 ? "#1B6CA8" : "#E0A800",
    initials: r[0].split(" ").map((x) => x[0]).slice(0, 2).join(""),
    last: r[4],
  }));

  /* ---------- pembelian ---------- */
  const rawOrders: string[][] = [
    ["NW-260612-014", "Salsabila Zahra", "Level 3 — Bahasa Arab", "Rp 99.000", "QRIS", "Lunas", "12 Jun 2026 · 09:14"],
    ["NW-260612-013", "Bima Saputra", "Level 1 — Bahasa Arab", "Rp 99.000", "GoPay", "Lunas", "12 Jun 2026 · 08:02"],
    ["NW-260611-012", "Keluarga Hartono", "Paket Tiga Akun", "Rp 249.000", "Transfer BCA", "Pending", "11 Jun 2026 · 21:40"],
    ["NW-260611-011", "Intan Permata", "Level 2 — Bahasa Arab", "Rp 99.000", "QRIS", "Lunas", "11 Jun 2026 · 19:25"],
    ["NW-260610-010", "Raka Pratama", "Level 1 — Bahasa Arab", "Rp 99.000", "OVO", "Lunas", "10 Jun 2026 · 14:08"],
    ["NW-260610-009", "Yusuf Hakim", "Level 1 — Bahasa Arab", "Rp 99.000", "Transfer BCA", "Pending", "10 Jun 2026 · 11:51"],
    ["NW-260609-008", "Nadia Rahma", "Level 2 — Bahasa Arab", "Rp 99.000", "QRIS", "Lunas", "9 Jun 2026 · 16:33"],
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        minWidth: 1180,
        background: "#F4F8FB",
        overflow: "hidden",
        fontFamily: "var(--font-nunito), Nunito, sans-serif",
        color: "#0A2847",
        lineHeight: 1.5,
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: 236,
          flexShrink: 0,
          background: "#fff",
          borderRight: "1.5px solid rgba(10,40,71,.08)",
          padding: "22px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            fontSize: 19,
            fontWeight: 900,
            letterSpacing: "-.4px",
            padding: "4px 8px 18px",
          }}
        >
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              background: "linear-gradient(135deg,#1B6CA8,#2EAF73)",
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontSize: 15,
            }}
          >
            N
          </span>
          <span>
            <span style={{ color: "#1B6CA8" }}>Nusa</span>
            <span style={{ color: "#2EAF73" }}>World</span>
          </span>
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: "#9AAEC0",
            letterSpacing: ".1em",
            padding: "6px 10px 4px",
          }}
        >
          MENU
        </div>
        {NAV.map((n) => {
          const act = page === n.key;
          return (
            <div
              key={n.key}
              onClick={() => {
                setPage(n.key);
                setEditorOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 14px",
                borderRadius: 12,
                fontSize: 14.5,
                cursor: "pointer",
                fontWeight: act ? 800 : 700,
                color: act ? "#1B6CA8" : "#51718B",
                background: act ? "#E3F0F9" : "transparent",
                boxShadow: act ? "inset 3px 0 0 #1B6CA8" : "none",
              }}
            >
              <span style={{ fontSize: 17 }}>{n.icon}</span>
              {n.label}
            </div>
          );
        })}
        <div
          style={{
            marginTop: "auto",
            background: "#042C53",
            borderRadius: 16,
            padding: 16,
            color: "#fff",
          }}
        >
          <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 3 }}>
            Mode Navigator
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,.6)",
              fontWeight: 600,
              lineHeight: 1.45,
            }}
          >
            Susun kurikulum, soal quest, dan pantau murid.
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* TOPBAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            padding: "18px 30px",
            background: "#fff",
            borderBottom: "1.5px solid rgba(10,40,71,.08)",
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#9AAEC0", marginBottom: 1 }}>
              {PAGE_META[page].c}
            </div>
            <div style={{ fontSize: 23, fontWeight: 900, letterSpacing: "-.5px", lineHeight: 1.2 }}>
              {PAGE_META[page].t}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "5px 14px 5px 5px",
                border: "1.5px solid rgba(10,40,71,.1)",
                borderRadius: 99,
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#1B6CA8,#042C53)",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 13,
                  fontWeight: 900,
                }}
              >
                UF
              </span>
              <div style={{ lineHeight: 1.25 }}>
                <div style={{ fontSize: 13.5, fontWeight: 800 }}>Ustadz Faiz</div>
                <div style={{ fontSize: 11.5, color: "#8499AB", fontWeight: 700 }}>Navigator</div>
              </div>
            </div>
            {page === "kelas" && (
              <button
                onClick={openNew}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#2EAF73",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 800,
                  padding: "11px 20px",
                  border: "none",
                  borderRadius: 11,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: "inherit",
                }}
              >
                <span style={{ fontSize: 17, lineHeight: 1 }}>+</span>Tambah Kelas
              </button>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 30px 40px" }}>
          {page === "kelas" && (
            <KelasView summary={summary} classes={classes} onEdit={openEditor} />
          )}
          {page === "soal" && (
            <SoalView
              {...{
                qType,
                setQType,
                qText,
                setQText,
                opts,
                setOpts,
                correct,
                setCorrect,
                explain,
                setExplain,
                babak,
                setBabak,
                words,
                setWords,
                isianKey,
                setIsianKey,
                audioUrl,
                setAudioUrl,
                qVideo,
                setQVideo,
                questions,
                setQuestions,
                keyFromLabel,
                showOpts,
                isIsian,
                isSusun,
                isAudio,
                isVideo,
                pvType,
                pvBabak,
                pvWords,
                pvThumb,
                qCount,
                qTerbit,
                openImport: () => setImportOpen(true),
              }}
            />
          )}
          {page === "murid" && <MuridView murid={murid} />}
          {page === "pembelian" && <PembelianView rawOrders={rawOrders} />}
          {(page === "dashboard" || page === "pengaturan") && (
            <EmptyView
              icon={page === "dashboard" ? "📊" : "⚙️"}
              title={
                page === "dashboard"
                  ? "Dashboard belum termasuk cakupan mockup ini"
                  : "Pengaturan belum termasuk cakupan mockup ini"
              }
              onGoKelas={() => setPage("kelas")}
            />
          )}
        </div>
      </div>

      {/* SCRIM */}
      <div
        onClick={() => setEditorOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(4,44,83,.45)",
          zIndex: 90,
          transition: "opacity .3s",
          opacity: editorOpen ? 1 : 0,
          pointerEvents: editorOpen ? "auto" : "none",
        }}
      />

      {/* EDITOR SLIDE-OVER */}
      <EditorPanel
        {...{
          ed,
          tx: editorOpen ? "translateX(0)" : "translateX(110%)",
          close: () => setEditorOpen(false),
          setEditorClass,
          SLOT_DEF,
          filled4,
          dnaCount,
          prereq,
          setPrereq,
          videoUrl,
          setVideoUrl,
          edThumb,
          soalOk,
          canPublish,
        }}
      />

      {/* IMPORT MODAL */}
      {importOpen && (
        <ImportModal
          {...{
            importText,
            setImportText,
            importOk,
            importErr,
            importItems,
            importCount,
            applyImport,
            close: () => setImportOpen(false),
          }}
        />
      )}
    </div>
  );
}

/* ===================== KELAS ===================== */
function KelasView({
  summary,
  classes,
  onEdit,
}: {
  summary: { label: string; value: string; icon: string; bg: string }[];
  classes: ClassRow[];
  onEdit: (c: ClassRow) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {summary.map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff",
              border: "1.5px solid rgba(10,40,71,.1)",
              borderRadius: 16,
              padding: "17px 19px",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                display: "grid",
                placeItems: "center",
                fontSize: 21,
                background: s.bg,
                flexShrink: 0,
              }}
            >
              {s.icon}
            </span>
            <div>
              <div style={{ fontSize: 27, fontWeight: 900, letterSpacing: "-1px", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#51718B", marginTop: 3 }}>
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#fff", border: "1.5px solid rgba(10,40,71,.1)", borderRadius: 16, overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "15px 20px",
            borderBottom: "1.5px solid rgba(10,40,71,.08)",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 900 }}>Daftar Kelas</div>
          <div style={{ display: "flex", gap: 9 }}>
            <span style={{ ...filterPill, color: "#8499AB", borderColor: "rgba(10,40,71,.1)", minWidth: 200 }}>
              🔍 Cari kelas…
            </span>
            <span style={filterPill}>Semua Track ▾</span>
            <span style={filterPill}>Semua Status ▾</span>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>NAMA KELAS</th>
              <th style={thMid}>TRACK</th>
              <th style={thMid}>LEVEL</th>
              <th style={thMid}>JUMLAH SOAL</th>
              <th style={thMid}>STATUS</th>
              <th style={{ ...th, textAlign: "right" }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => {
              const t = TRACK[c.track];
              const st = STATUS[c.terbit ? "Terbit" : "Draf"];
              return (
                <tr key={c.name}>
                  <td style={{ ...tdBase, padding: "13px 20px", fontSize: 14.5, fontWeight: 800 }}>{c.name}</td>
                  <td style={tdBase}>
                    <span style={pill(t.bg, t.color)}>
                      <span>{t.icon}</span>
                      {c.track}
                    </span>
                  </td>
                  <td style={{ ...tdBase, fontSize: 14, fontWeight: 800, color: "#51718B" }}>{c.level}</td>
                  <td style={{ ...tdBase, fontSize: 14, fontWeight: 700, color: "#51718B" }}>{c.soal} soal</td>
                  <td style={tdBase}>
                    <span style={pill(st.bg, st.color)}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: st.dot }} />
                      {c.terbit ? "Terbit" : "Draf"}
                    </span>
                  </td>
                  <td style={{ ...tdBase, padding: "13px 20px" }}>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <button onClick={() => onEdit(c)} style={btnSm("#1B6CA8", "#fff")}>
                        Edit
                      </button>
                      <button style={btnSm("#EFF3F7", "#51718B")}>Pratinjau</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 20px" }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "#8499AB" }}>
            Menampilkan 1–7 dari 24 kelas
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {["‹", "1", "2", "3", "›"].map((p, i) => (
              <span
                key={i}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 12.5,
                  fontWeight: 800,
                  cursor: "pointer",
                  background: i === 1 ? "#1B6CA8" : "transparent",
                  color: i === 1 ? "#fff" : "#51718B",
                  border: i === 1 ? "none" : "1.5px solid rgba(10,40,71,.1)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== SOAL (builder) ===================== */
/* eslint-disable @typescript-eslint/no-explicit-any */
function SoalView(p: any) {
  const naskh = { fontFamily: "var(--font-naskh), 'Noto Naskh Arabic', serif" } as CSSProperties;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* context bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "#fff",
          border: "1.5px solid rgba(10,40,71,.1)",
          borderRadius: 14,
          padding: "12px 16px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 12.5, fontWeight: 800, color: "#8499AB" }}>KELAS</span>
        <select style={selectStyle}>
          <option>L2 Fi&apos;l Madhi</option>
          <option>L1 Iqro - Kelas A</option>
          <option>L2 Isim &amp; Harf</option>
          <option>L3 Doa Umroh</option>
        </select>
        <span style={{ fontSize: 12.5, fontWeight: 800, color: "#1B6CA8", background: "#E3F0F9", borderRadius: 99, padding: "5px 12px" }}>
          {p.qCount} soal · {p.qTerbit} terbit
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button onClick={p.openImport} style={ghostBtn}>
            ⤓ Impor JSON
          </button>
          <button
            onClick={() => {
              p.setQText("");
              p.setOpts(["", "", "", ""]);
              p.setCorrect(0);
              p.setExplain("");
              p.setBabak(1);
            }}
            style={greenBtn}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>Soal Baru
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px minmax(0,1fr) 350px", gap: 16, alignItems: "start" }}>
        {/* daftar soal */}
        <div style={{ background: "#fff", border: "1.5px solid rgba(10,40,71,.1)", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1.5px solid rgba(10,40,71,.08)", fontSize: 14.5, fontWeight: 900 }}>
            Daftar Soal
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxHeight: 560, overflowY: "auto" }}>
            {p.questions.map((q: any) => {
              const b = BABAK[q.babak];
              const st = STATUS[q.status];
              return (
                <div key={q.id} style={{ padding: "12px 16px", borderBottom: "1px solid rgba(10,40,71,.06)", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div dir="rtl" style={{ ...naskh, fontSize: 16, fontWeight: 700, lineHeight: 1.7, color: "#0A2847" }}>
                    {q.t}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 10.5, fontWeight: 900, padding: "3px 8px", borderRadius: 7, background: b.bg, color: b.color }}>
                      {b.chip}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#8499AB" }}>{q.type}</span>
                    <span style={{ ...pill(st.bg, st.color), fontSize: 10.5, marginLeft: "auto" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: st.dot }} />
                      {q.status}
                    </span>
                    <button
                      onClick={() => {
                        p.setQText(q.t);
                        p.setBabak(q.babak);
                        p.setQType(p.keyFromLabel[q.type] || "pg");
                      }}
                      style={{ fontSize: 11, fontWeight: 800, color: "#1B6CA8", background: "#E3F0F9", border: "none", borderRadius: 7, padding: "4px 9px", cursor: "pointer" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => p.setQuestions(p.questions.filter((x: any) => x.id !== q.id))}
                      style={{ fontSize: 11, fontWeight: 800, color: "#C0504A", background: "#F8E4E2", border: "none", borderRadius: 7, padding: "4px 9px", cursor: "pointer" }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* form */}
        <div style={{ background: "#fff", border: "1.5px solid rgba(10,40,71,.1)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <div style={miniLabel}>TIPE SOAL</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TYPES.map((t) => {
                const act = p.qType === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => p.setQType(t.key)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      fontSize: 13,
                      fontWeight: 800,
                      padding: "9px 14px",
                      borderRadius: 10,
                      cursor: "pointer",
                      background: act ? "#1B6CA8" : "#fff",
                      color: act ? "#fff" : "#51718B",
                      border: `1.5px solid ${act ? "#1B6CA8" : "rgba(10,40,71,.15)"}`,
                      fontFamily: "inherit",
                    }}
                  >
                    <span>{t.icon}</span>
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div style={miniLabel}>PERTANYAAN (TEKS ARAB BERHARAKAT)</div>
            <textarea
              dir="rtl"
              rows={2}
              value={p.qText}
              onChange={(e) => p.setQText(e.target.value)}
              style={{ ...naskh, width: "100%", fontSize: 22, fontWeight: 700, lineHeight: 1.9, color: "#0A2847", border: "1.5px solid rgba(10,40,71,.15)", borderRadius: 12, padding: "12px 16px", background: "#FBFDFE", resize: "vertical" }}
            />
          </div>

          {p.isAudio && (
            <div>
              <div style={miniLabel}>FILE AUDIO (URL)</div>
              <input type="text" value={p.audioUrl} onChange={(e: any) => p.setAudioUrl(e.target.value)} style={inputStyle} />
            </div>
          )}
          {p.isVideo && (
            <div>
              <div style={miniLabel}>LINK YOUTUBE</div>
              <input type="text" value={p.qVideo} onChange={(e: any) => p.setQVideo(e.target.value)} style={inputStyle} />
            </div>
          )}

          {p.showOpts && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#8499AB", letterSpacing: ".04em" }}>OPSI JAWABAN</span>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: "#8499AB" }}>klik huruf untuk menandai kunci jawaban</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {p.opts.map((v: string, i: number) => {
                  const isC = p.correct === i;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button
                        onClick={() => p.setCorrect(i)}
                        title="Tandai sebagai kunci"
                        style={{ width: 34, height: 34, borderRadius: "50%", fontSize: 13.5, fontWeight: 900, cursor: "pointer", flexShrink: 0, background: isC ? "#2EAF73" : "#fff", color: isC ? "#fff" : "#8499AB", border: `1.5px solid ${isC ? "#2EAF73" : "rgba(10,40,71,.25)"}`, fontFamily: "inherit" }}
                      >
                        {LETTERS[i]}
                      </button>
                      <input
                        type="text"
                        value={v}
                        onChange={(e) => {
                          const o = [...p.opts];
                          o[i] = e.target.value;
                          p.setOpts(o);
                        }}
                        style={{ ...inputStyle, flex: 1 }}
                      />
                      {isC && (
                        <span style={{ fontSize: 11, fontWeight: 900, color: "#1D9E75", background: "#E1F5EE", borderRadius: 99, padding: "4px 10px", whiteSpace: "nowrap" }}>
                          ✓ Kunci
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {p.isIsian && (
            <div>
              <div style={miniLabel}>KUNCI JAWABAN</div>
              <input type="text" dir="rtl" value={p.isianKey} onChange={(e: any) => p.setIsianKey(e.target.value)} style={{ ...inputStyle, ...naskh, fontSize: 19 }} />
            </div>
          )}
          {p.isSusun && (
            <div>
              <div style={miniLabel}>KATA-KATA (URUTAN BENAR = KUNCI)</div>
              <input type="text" dir="rtl" value={p.words} onChange={(e: any) => p.setWords(e.target.value)} style={{ ...inputStyle, ...naskh, fontSize: 19 }} />
              <div style={{ fontSize: 11.5, fontWeight: 700, color: "#8499AB", marginTop: 5 }}>
                Pisahkan tiap kata dengan koma — murid akan melihatnya teracak.
              </div>
            </div>
          )}

          <div>
            <div style={miniLabel}>PENJELASAN (TAMPIL SETELAH MENJAWAB)</div>
            <textarea rows={2} value={p.explain} onChange={(e) => p.setExplain(e.target.value)} style={{ ...inputStyle, fontSize: 13.5, fontWeight: 600, lineHeight: 1.6, resize: "vertical" }} />
          </div>

          <div>
            <div style={miniLabel}>PENANDA BABAK</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 2, 3].map((n) => {
                const m = BABAK[n];
                const act = p.babak === n;
                return (
                  <button
                    key={n}
                    onClick={() => p.setBabak(n)}
                    style={{ flex: 1, fontSize: 12.5, fontWeight: 800, padding: "9px 10px", borderRadius: 10, cursor: "pointer", background: act ? m.bg : "#fff", color: act ? m.color : "#8499AB", border: `1.5px solid ${act ? m.color : "rgba(10,40,71,.15)"}`, whiteSpace: "nowrap", fontFamily: "inherit" }}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, borderTop: "1.5px solid rgba(10,40,71,.08)", paddingTop: 16 }}>
            <button style={{ ...greenBtn, padding: "11px 24px" }}>Simpan Soal</button>
            <button style={{ ...ghostBtn, padding: "11px 20px" }}>Simpan sebagai Draf</button>
          </div>
        </div>

        {/* pratinjau */}
        <div style={{ background: "#042C53", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12.5, fontWeight: 900, color: "#5DCAA5", letterSpacing: ".08em" }}>PRATINJAU MURID</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 800, color: "rgba(255,255,255,.6)" }}>
              <span>{p.pvType.icon}</span>
              {p.pvType.label}
            </span>
          </div>
          <div style={{ background: "#fff", borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, fontWeight: 900, padding: "4px 11px", borderRadius: 99, background: p.pvBabak.bg, color: p.pvBabak.color }}>
                {p.pvBabak.label}
              </span>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: "#8499AB" }}>Soal 3 / 12</span>
            </div>
            <div dir="rtl" style={{ ...naskh, fontSize: 26, fontWeight: 700, lineHeight: 1.9, textAlign: "center", color: "#0A2847", padding: "4px 0" }}>
              {p.qText || "Pertanyaan akan tampil di sini…"}
            </div>
            {p.isSusun && (
              <div dir="rtl" style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center" }}>
                {p.pvWords.map((w: string, i: number) => (
                  <span key={i} style={{ ...naskh, fontSize: 17, fontWeight: 700, color: "#1B6CA8", background: "#E3F0F9", borderRadius: 9, padding: "6px 13px" }}>
                    {w}
                  </span>
                ))}
              </div>
            )}
            {p.showOpts && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {p.opts.map((v: string, i: number) => {
                  const isC = p.correct === i;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, border: `1.5px solid ${isC ? "#2EAF73" : "rgba(10,40,71,.12)"}`, background: isC ? "#F4FBF8" : "#fff", borderRadius: 11, padding: "10px 13px" }}>
                      <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#F4F8FB", color: "#51718B", display: "grid", placeItems: "center", fontSize: 11.5, fontWeight: 900, flexShrink: 0 }}>
                        {LETTERS[i]}
                      </span>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#0A2847" }}>{v || "…"}</span>
                      {isC && <span style={{ fontSize: 10, fontWeight: 900, color: "#1D9E75" }}>✓ KUNCI</span>}
                    </div>
                  );
                })}
              </div>
            )}
            <button style={{ ...greenBtn, width: "100%", padding: 12 }}>Periksa Jawaban</button>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.45)", textAlign: "center" }}>
            Tampilan persis seperti yang dilihat murid di quest.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== MURID ===================== */
function MuridView({ murid }: { murid: any[] }) {
  return (
    <div style={{ background: "#fff", border: "1.5px solid rgba(10,40,71,.1)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "15px 20px", borderBottom: "1.5px solid rgba(10,40,71,.08)" }}>
        <div style={{ fontSize: 16, fontWeight: 900 }}>
          Daftar Murid{" "}
          <span style={{ fontSize: 12.5, fontWeight: 800, color: "#1B6CA8", background: "#E3F0F9", borderRadius: 99, padding: "4px 11px", marginLeft: 6 }}>
            142 akun
          </span>
        </div>
        <span style={{ ...filterPill, color: "#8499AB", borderColor: "rgba(10,40,71,.1)", minWidth: 220 }}>
          🔍 Cari nama atau email…
        </span>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>NAMA</th>
            <th style={thMid}>EMAIL / AKUN</th>
            <th style={thMid}>LEVEL DIMILIKI</th>
            <th style={{ ...thMid, width: 220 }}>PROGRESS</th>
            <th style={th}>TERAKHIR AKTIF</th>
          </tr>
        </thead>
        <tbody>
          {murid.map((m) => (
            <tr key={m.email}>
              <td style={{ ...tdBase, padding: "12px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{ width: 34, height: 34, borderRadius: "50%", background: "#E3F0F9", color: "#1B6CA8", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 900, flexShrink: 0 }}>
                    {m.initials}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 800 }}>{m.name}</span>
                </div>
              </td>
              <td style={{ ...tdBase, fontSize: 13, fontWeight: 700, color: "#51718B" }}>{m.email}</td>
              <td style={tdBase}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#1B6CA8", background: "#E3F0F9", borderRadius: 8, padding: "5px 11px" }}>
                  {m.levels}
                </span>
              </td>
              <td style={tdBase}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ flex: 1, height: 8, borderRadius: 99, background: "#EFF3F7" }}>
                    <div style={{ width: m.barW, height: "100%", borderRadius: 99, background: m.barCo }} />
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: "#51718B", width: 38, textAlign: "right" }}>{m.prog}</span>
                </div>
              </td>
              <td style={{ ...tdBase, padding: "12px 20px", fontSize: 13, fontWeight: 700, color: "#8499AB" }}>{m.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ padding: "13px 20px", fontSize: 12.5, fontWeight: 700, color: "#8499AB" }}>
        Menampilkan 1–8 dari 142 murid
      </div>
    </div>
  );
}

/* ===================== PEMBELIAN ===================== */
function PembelianView({ rawOrders }: { rawOrders: string[][] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#E3F0F9", border: "1.5px solid rgba(27,108,168,.2)", borderRadius: 12, padding: "11px 16px", fontSize: 13, fontWeight: 700, color: "#1B6CA8" }}>
        ℹ️ Semua pembelian bersifat beli putus per level — bukan langganan. Tidak ada tagihan berulang.
      </div>
      <div style={{ background: "#fff", border: "1.5px solid rgba(10,40,71,.1)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "15px 20px", borderBottom: "1.5px solid rgba(10,40,71,.08)" }}>
          <div style={{ fontSize: 16, fontWeight: 900 }}>Riwayat Transaksi</div>
          <div style={{ display: "flex", gap: 9 }}>
            <span style={filterPill}>Juni 2026 ▾</span>
            <span style={filterPill}>Semua Status ▾</span>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>ORDER ID</th>
              <th style={thMid}>PEMBELI</th>
              <th style={thMid}>LEVEL / PAKET</th>
              <th style={{ ...thMid, textAlign: "right" }}>HARGA</th>
              <th style={thMid}>METODE</th>
              <th style={thMid}>STATUS</th>
              <th style={th}>TANGGAL</th>
            </tr>
          </thead>
          <tbody>
            {rawOrders.map((r) => {
              const st = STATUS[r[5]];
              return (
                <tr key={r[0]}>
                  <td style={{ ...tdBase, padding: "12px 20px", fontSize: 13, fontWeight: 800, color: "#1B6CA8" }}>{r[0]}</td>
                  <td style={{ ...tdBase, fontSize: 13.5, fontWeight: 800 }}>{r[1]}</td>
                  <td style={{ ...tdBase, fontSize: 13, fontWeight: 700, color: "#51718B" }}>{r[2]}</td>
                  <td style={{ ...tdBase, fontSize: 13.5, fontWeight: 800, textAlign: "right" }}>{r[3]}</td>
                  <td style={tdBase}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "#51718B", background: "#F4F8FB", border: "1px solid rgba(10,40,71,.08)", borderRadius: 8, padding: "4px 10px" }}>
                      {r[4]}
                    </span>
                  </td>
                  <td style={tdBase}>
                    <span style={pill(st.bg, st.color)}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.dot }} />
                      {r[5]}
                    </span>
                  </td>
                  <td style={{ ...tdBase, padding: "12px 20px", fontSize: 12.5, fontWeight: 700, color: "#8499AB" }}>{r[6]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding: "13px 20px", fontSize: 12.5, fontWeight: 700, color: "#8499AB" }}>
          Menampilkan 7 transaksi terakhir · Juni 2026
        </div>
      </div>
    </div>
  );
}

/* ===================== EMPTY (dashboard/pengaturan) ===================== */
function EmptyView({ icon, title, onGoKelas }: { icon: string; title: string; onGoKelas: () => void }) {
  return (
    <div style={{ background: "#fff", border: "1.5px dashed rgba(10,40,71,.2)", borderRadius: 16, padding: "60px 40px", textAlign: "center" }}>
      <div style={{ fontSize: 34, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 17, fontWeight: 900, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#51718B", maxWidth: 420, margin: "0 auto 18px" }}>
        Fokus rilis ini: Kelas, Pembuat Soal, Murid, dan Pembelian.
      </div>
      <button onClick={onGoKelas} style={{ fontSize: 13.5, fontWeight: 800, color: "#fff", background: "#1B6CA8", border: "none", borderRadius: 11, padding: "10px 20px", cursor: "pointer", fontFamily: "inherit" }}>
        Buka halaman Kelas →
      </button>
    </div>
  );
}

/* ===================== EDITOR PANEL ===================== */
function EditorPanel(p: any) {
  const ed = p.ed;
  const set = (patch: any) => p.setEditorClass({ ...ed, ...patch });
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: 530,
        background: "#fff",
        zIndex: 95,
        display: "flex",
        flexDirection: "column",
        boxShadow: "-24px 0 60px -24px rgba(4,44,83,.5)",
        transition: "transform .35s cubic-bezier(.22,.8,.3,1)",
        transform: p.tx,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "18px 24px", borderBottom: "1.5px solid rgba(10,40,71,.08)", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#9AAEC0" }}>Editor Kelas</div>
          <div style={{ fontSize: 19, fontWeight: 900, letterSpacing: "-.3px" }}>{ed.name}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={pill(ed.terbit ? "#E1F5EE" : "#FBF1D0", ed.terbit ? "#1D9E75" : "#B7860B")}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: ed.terbit ? "#2EAF73" : "#E0A800" }} />
            {ed.terbit ? "Terbit" : "Draf"}
          </span>
          <button onClick={p.close} style={{ width: 32, height: 32, borderRadius: 9, background: "#F4F8FB", border: "none", display: "grid", placeItems: "center", fontSize: 15, color: "#8499AB", cursor: "pointer" }}>
            ✕
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <div style={editLabel}>NAMA KELAS</div>
            <input value={ed.name} onChange={(e) => set({ name: e.target.value })} style={{ ...inputStyle, fontWeight: 800, fontSize: 14.5 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: 12 }}>
            <div>
              <div style={editLabel}>TRACK</div>
              <select value={ed.track} onChange={(e) => set({ track: e.target.value })} style={selectStyle}>
                <option>Umroh</option>
                <option>Percakapan</option>
                <option>Bisnis</option>
                <option>Travel</option>
              </select>
            </div>
            <div>
              <div style={editLabel}>LEVEL</div>
              <select value={ed.level} onChange={(e) => set({ level: e.target.value })} style={selectStyle}>
                <option>L1</option>
                <option>L2</option>
                <option>L3</option>
                <option>L4</option>
              </select>
            </div>
          </div>
        </div>

        {/* DNA */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 4 }}>
            <span style={{ fontSize: 16 }}>🧬</span>
            <span style={{ fontSize: 15, fontWeight: 900 }}>DNA Modul Kelas</span>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: "#1B6CA8", background: "#E3F0F9", borderRadius: 99, padding: "3px 10px" }}>
              {p.dnaCount} / 5 slot DNA
            </span>
          </div>
          <div style={{ fontSize: 12.5, color: "#8499AB", fontWeight: 600, marginBottom: 13 }}>
            Lima komponen wajib sebelum kelas bisa terbit.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {p.SLOT_DEF.map((d: any, i: number) => {
              const f = p.filled4[i];
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, border: `1.5px ${f ? "solid" : "dashed"} ${f ? "#CDEBDF" : "#E0C36B"}`, background: f ? "#F4FBF8" : "#FFFCF2", borderRadius: 13, padding: "12px 14px" }}>
                  <span style={{ width: 32, height: 32, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 900, flexShrink: 0, background: f ? "#2EAF73" : "#fff", color: f ? "#fff" : "#B7860B", border: `2px ${f ? "solid" : "dashed"} ${f ? "#2EAF73" : "#E0A800"}` }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 17 }}>{d.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 900 }}>{d.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: f ? "#51718B" : "#B7860B" }}>{f ? d.full : d.empty}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, borderRadius: 99, padding: "4px 10px", whiteSpace: "nowrap", background: f ? "#E1F5EE" : "#FBF1D0", color: f ? "#1D9E75" : "#B7860B" }}>
                    {f ? "✓ Terisi" : "Kosong"}
                  </span>
                  {f ? (
                    <button style={{ fontSize: 11.5, fontWeight: 800, color: "#1B6CA8", background: "#fff", border: "1.5px solid rgba(27,108,168,.25)", borderRadius: 8, padding: "6px 11px", cursor: "pointer" }}>Ubah</button>
                  ) : (
                    <button style={{ fontSize: 11.5, fontWeight: 900, color: "#5e4602", background: "#F5C518", border: "none", borderRadius: 8, padding: "7px 12px", cursor: "pointer", whiteSpace: "nowrap" }}>Isi</button>
                  )}
                </div>
              );
            })}

            {/* slot 5 prereq */}
            <div style={{ border: "1.5px solid #CFE2F0", background: "#F4F8FB", borderRadius: 13, padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 9 }}>
                <span style={{ width: 32, height: 32, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 900, flexShrink: 0, background: "#1B6CA8", color: "#fff" }}>5</span>
                <span style={{ fontSize: 17 }}>🔗</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 900 }}>Prasyarat</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#8499AB" }}>Kelas yang harus dituntaskan dulu</div>
                </div>
              </div>
              <select value={p.prereq} onChange={(e: any) => p.setPrereq(e.target.value)} style={{ ...selectStyle, width: "100%", fontSize: 13 }}>
                <option>Tidak ada prasyarat</option>
                <option>L1 Iqro - Kelas A</option>
                <option>L1 Iqro - Kelas B</option>
                <option>L2 Fi&apos;l Madhi</option>
                <option>L2 Isim &amp; Harf</option>
                <option>L3 Doa Umroh</option>
              </select>
            </div>

            {/* slot 6 video */}
            <div style={{ border: "1.5px solid #CFE2F0", background: "#F4F8FB", borderRadius: 13, padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 9 }}>
                <span style={{ width: 32, height: 32, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 900, flexShrink: 0, background: "#1B6CA8", color: "#fff" }}>6</span>
                <span style={{ fontSize: 17 }}>🎬</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 900 }}>Video Materi</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#8499AB" }}>Tempel link YouTube — pratinjau tampil otomatis</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, borderRadius: 99, padding: "4px 10px", background: p.edThumb ? "#E1F5EE" : "#FBF1D0", color: p.edThumb ? "#1D9E75" : "#B7860B" }}>
                  {p.edThumb ? "✓ Terisi" : "Kosong"}
                </span>
              </div>
              <input placeholder="https://youtu.be/…" value={p.videoUrl} onChange={(e: any) => p.setVideoUrl(e.target.value)} style={{ ...inputStyle, marginBottom: 10 }} />
              {p.edThumb ? (
                <div style={{ position: "relative", borderRadius: 11, overflow: "hidden", background: "#0A2847" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.edThumb} alt="Pratinjau video" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", opacity: 0.92, display: "block" }} />
                  <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                    <span style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,.92)", color: "#1B6CA8", display: "grid", placeItems: "center", fontSize: 17 }}>▶</span>
                  </span>
                </div>
              ) : (
                <div style={{ border: "1.5px dashed rgba(10,40,71,.25)", borderRadius: 11, aspectRatio: "16/9", display: "grid", placeItems: "center", fontSize: 12.5, fontWeight: 700, color: "#9AAEC0", textAlign: "center", padding: 10 }}>
                  Tempel URL YouTube yang valid untuk melihat thumbnail video
                </div>
              )}
            </div>
          </div>
        </div>

        {/* kesiapan */}
        <div style={{ background: "#F4F8FB", border: "1.5px solid rgba(10,40,71,.08)", borderRadius: 13, padding: 16 }}>
          <div style={{ fontSize: 13.5, fontWeight: 900, marginBottom: 12 }}>Kesiapan Terbit</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, fontWeight: 700 }}>
              <span style={{ width: 21, height: 21, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 11, flexShrink: 0, background: p.dnaCount === 5 ? "#E1F5EE" : "#FBF1D0", color: p.dnaCount === 5 ? "#1D9E75" : "#B7860B" }}>
                {p.dnaCount === 5 ? "✓" : "!"}
              </span>
              <span style={{ color: "#0A2847" }}>5 slot DNA terisi</span>
              <span style={{ marginLeft: "auto", fontWeight: 900, color: p.dnaCount === 5 ? "#1D9E75" : "#B7860B" }}>{p.dnaCount} / 5 slot DNA</span>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>
                <span style={{ width: 21, height: 21, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 11, flexShrink: 0, background: p.soalOk ? "#E1F5EE" : "#FBF1D0", color: p.soalOk ? "#1D9E75" : "#B7860B" }}>
                  {p.soalOk ? "✓" : "!"}
                </span>
                <span style={{ color: "#0A2847" }}>Minimal 10 soal terbit</span>
                <span style={{ marginLeft: "auto", fontWeight: 900, color: p.soalOk ? "#1D9E75" : "#B7860B" }}>{Math.min(ed.soal, 10)} / 10</span>
              </div>
              <div style={{ height: 7, borderRadius: 99, background: "#E5EBF1", marginLeft: 31 }}>
                <div style={{ height: "100%", borderRadius: 99, width: Math.min((ed.soal / 10) * 100, 100) + "%", background: p.soalOk ? "#2EAF73" : "#F5C518" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div style={{ padding: "14px 24px", borderTop: "1.5px solid rgba(10,40,71,.08)", background: "#FBFDFE", flexShrink: 0 }}>
        {!ed.terbit && !p.canPublish && (
          <div style={{ fontSize: 12, fontWeight: 700, color: "#B7860B", background: "#FBF1D0", borderRadius: 9, padding: "8px 12px", marginBottom: 11 }}>
            🔒 Terkunci sampai 5 slot DNA terisi &amp; minimal 10 soal terbit
          </div>
        )}
        {ed.terbit && (
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1D9E75", background: "#E1F5EE", borderRadius: 9, padding: "8px 12px", marginBottom: 11 }}>
            ✓ Kelas ini sudah terbit — perubahan akan langsung terlihat murid setelah disimpan.
          </div>
        )}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={p.close} style={{ flex: 1, fontSize: 13.5, fontWeight: 800, color: "#1B6CA8", background: "#fff", border: "1.5px solid rgba(27,108,168,.35)", borderRadius: 11, padding: 11, cursor: "pointer", fontFamily: "inherit" }}>
            Simpan Draf
          </button>
          {ed.terbit ? (
            <button style={{ flex: 1, fontSize: 13.5, fontWeight: 800, color: "#fff", background: "#2EAF73", border: "none", borderRadius: 11, padding: 11, cursor: "pointer", fontFamily: "inherit" }}>
              Simpan Perubahan
            </button>
          ) : p.canPublish ? (
            <button style={{ flex: 1, fontSize: 13.5, fontWeight: 800, color: "#fff", background: "#2EAF73", border: "none", borderRadius: 11, padding: 11, cursor: "pointer", fontFamily: "inherit" }}>
              Terbitkan
            </button>
          ) : (
            <button disabled style={{ flex: 1, fontSize: 13.5, fontWeight: 800, color: "#9AAEC0", background: "#EAEEF2", border: "none", borderRadius: 11, padding: 11, cursor: "not-allowed", fontFamily: "inherit" }}>
              🔒 Terbitkan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===================== IMPORT MODAL ===================== */
function ImportModal(p: any) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(4,44,83,.55)", zIndex: 100, display: "grid", placeItems: "center", padding: 30 }}>
      <div style={{ width: 760, maxWidth: "100%", maxHeight: "90vh", background: "#fff", borderRadius: 18, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 40px 90px -30px rgba(4,44,83,.6)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 22px", borderBottom: "1.5px solid rgba(10,40,71,.08)" }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 900 }}>Impor JSON Soal</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#8499AB" }}>Tempel hasil generator soal — pratinjau hasil parse tampil di kanan.</div>
          </div>
          <button onClick={p.close} style={{ width: 32, height: 32, borderRadius: 9, background: "#F4F8FB", border: "none", display: "grid", placeItems: "center", fontSize: 15, color: "#8499AB", cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, minHeight: 0 }}>
          <div style={{ padding: "16px 18px", borderRight: "1.5px solid rgba(10,40,71,.08)", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#8499AB", letterSpacing: ".04em" }}>JSON</div>
            <textarea
              rows={14}
              value={p.importText}
              onChange={(e: any) => p.setImportText(e.target.value)}
              spellCheck={false}
              style={{ flex: 1, width: "100%", fontFamily: "ui-monospace,Menlo,Consolas,monospace", fontSize: 11.5, lineHeight: 1.6, color: "#0A2847", border: "1.5px solid rgba(10,40,71,.15)", borderRadius: 11, padding: 12, background: "#FBFDFE", resize: "none" }}
            />
          </div>
          <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8, overflowY: "auto" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#8499AB", letterSpacing: ".04em" }}>HASIL PARSE</div>
            {p.importOk ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {p.importItems.map((it: any) => (
                  <div key={it.i} style={{ border: "1.5px solid rgba(10,40,71,.1)", borderRadius: 11, padding: "10px 13px", display: "flex", flexDirection: "column", gap: 7 }}>
                    <div dir="rtl" style={{ fontFamily: "var(--font-naskh), 'Noto Naskh Arabic', serif", fontSize: 15, fontWeight: 700, lineHeight: 1.7 }}>{it.text}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ fontSize: 10.5, fontWeight: 900, padding: "3px 9px", borderRadius: 7, background: it.bBg, color: it.bCo }}>{it.bLabel}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#8499AB" }}>{it.type}</span>
                      <span style={{ marginLeft: "auto", fontSize: 10.5, fontWeight: 800, color: "#1D9E75" }}>✓ valid</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ border: "1.5px solid #EBC6C3", background: "#F8E4E2", borderRadius: 11, padding: "12px 14px", fontSize: 12.5, fontWeight: 700, color: "#A33B35", lineHeight: 1.5 }}>
                ⚠️ {p.importErr}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 22px", borderTop: "1.5px solid rgba(10,40,71,.08)", background: "#FBFDFE" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#8499AB" }}>
            Soal hasil impor masuk sebagai <strong style={{ color: "#B7860B" }}>Draf</strong> — tinjau dulu sebelum diterbitkan.
          </span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <button onClick={p.close} style={{ fontSize: 13, fontWeight: 800, color: "#51718B", background: "#fff", border: "1.5px solid rgba(10,40,71,.15)", borderRadius: 10, padding: "10px 18px", cursor: "pointer", fontFamily: "inherit" }}>Batal</button>
            {p.importOk ? (
              <button onClick={p.applyImport} style={{ fontSize: 13, fontWeight: 800, color: "#fff", background: "#2EAF73", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontFamily: "inherit" }}>
                Tambahkan {p.importCount} soal
              </button>
            ) : (
              <button disabled style={{ fontSize: 13, fontWeight: 800, color: "#9AAEC0", background: "#EAEEF2", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "not-allowed", fontFamily: "inherit" }}>
                Perbaiki JSON dulu
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- shared style helpers ---------- */
const pill = (bg: string, color: string): CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "5px 11px",
  borderRadius: 99,
  fontSize: 12.5,
  fontWeight: 800,
  background: bg,
  color,
});
const filterPill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  fontSize: 13,
  fontWeight: 800,
  color: "#1B6CA8",
  border: "1.5px solid rgba(27,108,168,.25)",
  borderRadius: 10,
  padding: "8px 13px",
  cursor: "pointer",
};
const btnSm = (bg: string, color: string): CSSProperties => ({
  fontSize: 12.5,
  fontWeight: 800,
  color,
  background: bg,
  border: "none",
  borderRadius: 9,
  padding: "7px 14px",
  cursor: "pointer",
  fontFamily: "inherit",
});
const inputStyle: CSSProperties = {
  width: "100%",
  fontSize: 13.5,
  fontWeight: 700,
  color: "#0A2847",
  border: "1.5px solid rgba(10,40,71,.15)",
  borderRadius: 11,
  padding: "10px 14px",
  background: "#FBFDFE",
  fontFamily: "inherit",
};
const selectStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 800,
  color: "#0A2847",
  border: "1.5px solid rgba(10,40,71,.15)",
  borderRadius: 10,
  padding: "10px 13px",
  background: "#FBFDFE",
  cursor: "pointer",
  minWidth: 220,
  fontFamily: "inherit",
};
const miniLabel: CSSProperties = {
  fontSize: 12,
  fontWeight: 800,
  color: "#8499AB",
  letterSpacing: ".04em",
  marginBottom: 9,
};
const editLabel: CSSProperties = {
  fontSize: 11.5,
  fontWeight: 800,
  color: "#8499AB",
  marginBottom: 6,
  letterSpacing: ".04em",
};
const ghostBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  fontSize: 13.5,
  fontWeight: 800,
  color: "#1B6CA8",
  background: "#fff",
  border: "1.5px solid rgba(27,108,168,.35)",
  borderRadius: 11,
  padding: "10px 16px",
  cursor: "pointer",
  whiteSpace: "nowrap",
  fontFamily: "inherit",
};
const greenBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  fontSize: 13.5,
  fontWeight: 800,
  color: "#fff",
  background: "#2EAF73",
  border: "none",
  borderRadius: 11,
  padding: "10px 18px",
  cursor: "pointer",
  whiteSpace: "nowrap",
  fontFamily: "inherit",
};
