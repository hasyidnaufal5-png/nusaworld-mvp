"use client";

import { useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const card: CSSProperties = {
  background: "rgba(255,255,255,.88)",
  border: "1px solid rgba(10,40,71,.08)",
  padding: "6px 13px",
  borderRadius: 99,
  fontSize: 12,
  fontWeight: 800,
  color: "#0A2847",
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
};

function LockedNode({
  left,
  top,
  icon,
  title,
  note,
}: {
  left: string;
  top: string;
  icon: string;
  title: string;
  note: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow((s) => !s)}
      style={{
        position: "absolute",
        left,
        top,
        transform: "translate(-50%,-50%)",
        zIndex: 4,
        textAlign: "center",
        width: 170,
        cursor: "not-allowed",
      }}
    >
      <div
        style={{
          width: 62,
          height: 62,
          borderRadius: "50%",
          background: "#C7D4DE",
          border: "5px solid #fff",
          boxShadow: "0 5px 0 #A9B9C6,0 10px 20px rgba(10,40,71,.15)",
          display: "grid",
          placeItems: "center",
          margin: "0 auto",
          fontSize: 24,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          background: "rgba(255,255,255,.88)",
          border: "1.5px dashed rgba(10,40,71,.22)",
          borderRadius: 14,
          padding: "8px 11px",
          marginTop: 8,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 900, color: "#7E96AA" }}>
          {title}
        </div>
        <div style={{ fontSize: 11, fontWeight: 800, color: "#9DB2C4" }}>
          {note}
        </div>
      </div>
      {show && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            left: "50%",
            bottom: "calc(100% + 8px)",
            transform: "translateX(-50%)",
            background: "#042C53",
            color: "#fff",
            fontSize: 11.5,
            fontWeight: 700,
            padding: "8px 12px",
            borderRadius: 10,
            whiteSpace: "nowrap",
            boxShadow: "0 8px 20px rgba(4,44,83,.4)",
            zIndex: 20,
          }}
        >
          🔒 Terkunci — {note}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [navTab, setNavTab] = useState("Beranda");
  const navItems = ["Beranda", "Kelas", "Dunia Game", "Profil"];

  return (
    <div
      style={{
        height: "100vh",
        minHeight: 780,
        display: "flex",
        flexDirection: "column",
        background: "#F2F8FB",
        overflow: "hidden",
        fontFamily: "var(--font-nunito), Nunito, sans-serif",
      }}
    >
      {/* TOPBAR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "14px 26px",
          background: "#fff",
          borderBottom: "1px solid rgba(10,40,71,.08)",
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "-.4px",
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: 11,
              background: "#1B6CA8",
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg viewBox="0 0 64 56" width="23" height="21">
              <ellipse cx="15" cy="40" rx="8" ry="5" fill="#1D9E75" />
              <ellipse cx="49" cy="40" rx="8" ry="5" fill="#1D9E75" />
              <ellipse cx="32" cy="34" rx="20" ry="15" fill="#2EAF73" />
              <circle cx="32" cy="16" r="11" fill="#2EAF73" />
              <circle cx="28.5" cy="14" r="2.3" fill="#042C53" />
              <circle cx="35.5" cy="14" r="2.3" fill="#042C53" />
              <path d="M28.5 19 Q32 21.6 35.5 19" stroke="#042C53" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          <span>
            <span style={{ color: "#1B6CA8" }}>Nusa</span>
            <span style={{ color: "#2EAF73" }}>World</span>
          </span>
        </Link>
        <div
          style={{
            display: "flex",
            gap: 5,
            background: "#F2F8FB",
            border: "1px solid rgba(10,40,71,.07)",
            padding: 4,
            borderRadius: 99,
          }}
        >
          {navItems.map((n) => {
            const active = navTab === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setNavTab(n)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 99,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  background: active ? "#2EAF73" : "transparent",
                  color: active ? "#fff" : "#51718B",
                  fontSize: 13.5,
                  fontWeight: active ? 800 : 700,
                  boxShadow: active ? "0 2px 0 #1D9E75" : "none",
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#FFF6D6",
              border: "1px solid #F0DD96",
              padding: "8px 16px 8px 8px",
              borderRadius: 99,
            }}
          >
            <span
              style={{
                width: 25,
                height: 25,
                borderRadius: "50%",
                background: "#F5C518",
                display: "grid",
                placeItems: "center",
                fontSize: 12,
                fontWeight: 900,
                color: "#7A5E04",
                boxShadow: "inset 0 -2px 0 rgba(0,0,0,.12)",
              }}
            >
              ن
            </span>
            <span style={{ fontSize: 15, fontWeight: 900, color: "#7A5E04" }}>
              1.240
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#FFE6D8",
              border: "1px solid #F6C3A8",
              padding: "8px 15px",
              borderRadius: 99,
            }}
          >
            <span style={{ fontSize: 15 }}>🔥</span>
            <span style={{ fontSize: 15, fontWeight: 900, color: "#C0552A" }}>
              7
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#C0552A" }}>
              hari
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              background: "#F2F8FB",
              border: "1px solid rgba(10,40,71,.08)",
              padding: "5px 14px 5px 5px",
              borderRadius: 99,
            }}
          >
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#5DCAA5,#1B6CA8)",
                display: "grid",
                placeItems: "center",
                fontSize: 14,
                fontWeight: 900,
                color: "#fff",
              }}
            >
              Z
            </span>
            <span style={{ fontSize: 13.5, fontWeight: 800, color: "#0A2847" }}>
              Zahra
            </span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* QUEST MAP */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            position: "relative",
            background:
              "linear-gradient(180deg,#BBDFF5 0%,#9FD4EC 38%,#84CBC9 100%)",
            overflow: "hidden",
          }}
        >
          <svg
            viewBox="0 0 1050 720"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            <ellipse cx="150" cy="60" rx="55" ry="17" fill="rgba(255,255,255,.75)" />
            <ellipse cx="190" cy="50" rx="35" ry="13" fill="rgba(255,255,255,.75)" />
            <ellipse cx="500" cy="44" rx="45" ry="14" fill="rgba(255,255,255,.6)" />
            <ellipse cx="940" cy="80" rx="50" ry="15" fill="rgba(255,255,255,.65)" />
            <path d="M80 640 q14 -8 28 0" stroke="rgba(255,255,255,.45)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M540 660 q14 -8 28 0" stroke="rgba(255,255,255,.4)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M950 640 q14 -8 28 0" stroke="rgba(255,255,255,.4)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M460 120 q14 -8 28 0" stroke="rgba(255,255,255,.35)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M250 250 q14 -8 28 0" stroke="rgba(255,255,255,.35)" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* MAIN ISLAND */}
            <ellipse cx="265" cy="445" rx="252" ry="142" fill="#EFD9A7" />
            <ellipse cx="265" cy="436" rx="234" ry="126" fill="#2EAF73" />
            <circle cx="120" cy="380" r="20" fill="#1D9E75" />
            <rect x="116" y="392" width="8" height="15" fill="#8A5A2B" />
            <circle cx="395" cy="500" r="17" fill="#1D9E75" />
            <rect x="392" y="510" width="7" height="13" fill="#8A5A2B" />
            <circle cx="180" cy="540" r="14" fill="#0F6E56" />
            <rect x="177.5" y="548" width="5" height="11" fill="#8A5A2B" />

            {/* UMROH ISLAND */}
            <ellipse cx="680" cy="196" rx="132" ry="64" fill="#EFD9A7" />
            <ellipse cx="680" cy="190" rx="118" ry="54" fill="#2EAF73" />
            <circle cx="600" cy="172" r="12" fill="#1D9E75" />
            <rect x="597.8" y="179" width="4.5" height="9" fill="#8A5A2B" />
            <circle cx="765" cy="206" r="11" fill="#0F6E56" />
            <rect x="763" y="212" width="4" height="8" fill="#8A5A2B" />

            {/* PERCAKAPAN ISLAND */}
            <ellipse cx="806" cy="352" rx="104" ry="50" fill="#EFD9A7" />
            <ellipse cx="806" cy="347" rx="92" ry="42" fill="#5DCAA5" />
            <circle cx="745" cy="335" r="10" fill="#1D9E75" />
            <rect x="743.2" y="341" width="4" height="8" fill="#8A5A2B" />

            {/* BISNIS ISLAND */}
            <ellipse cx="872" cy="518" rx="100" ry="48" fill="#EFD9A7" />
            <ellipse cx="872" cy="513" rx="88" ry="40" fill="#5DCAA5" />
            <circle cx="938" cy="500" r="10" fill="#1D9E75" />
            <rect x="936.2" y="506" width="4" height="8" fill="#8A5A2B" />

            {/* TRAVEL ISLAND */}
            <ellipse cx="688" cy="610" rx="96" ry="46" fill="#EFD9A7" />
            <ellipse cx="688" cy="605" rx="84" ry="38" fill="#5DCAA5" />
            <circle cx="624" cy="592" r="10" fill="#1D9E75" />
            <rect x="622.2" y="598" width="4" height="8" fill="#8A5A2B" />

            {/* PATHS */}
            <path d="M150 498 Q250 470 372 352" fill="none" stroke="#1D9E75" strokeWidth="8" strokeLinecap="round" />
            <path d="M150 498 Q250 470 372 352" fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray="1,14" strokeLinecap="round" />
            <path d="M400 320 Q520 240 612 200" fill="none" stroke="#F5C518" strokeWidth="8" strokeDasharray="2,16" strokeLinecap="round" />
            <path d="M412 340 Q600 350 738 345" fill="none" stroke="rgba(4,44,83,.22)" strokeWidth="5" strokeDasharray="2,14" strokeLinecap="round" />
            <path d="M408 352 Q640 440 800 500" fill="none" stroke="rgba(4,44,83,.22)" strokeWidth="5" strokeDasharray="2,14" strokeLinecap="round" />
            <path d="M398 360 Q480 540 616 592" fill="none" stroke="rgba(4,44,83,.22)" strokeWidth="5" strokeDasharray="2,14" strokeLinecap="round" />
            <circle cx="488" cy="262" r="10" fill="#F5C518" stroke="#D9A90C" strokeWidth="2" />
            <circle cx="552" cy="226" r="8" fill="#F5C518" stroke="#D9A90C" strokeWidth="2" />
            <g transform="translate(505,470)">
              <path d="M-26 10 Q0 22 26 10 L18 0 L-18 0 Z" fill="#C95C36" />
              <rect x="-2" y="-30" width="3.5" height="30" fill="#8A5A2B" />
              <path d="M3 -30 L24 -8 L3 -8 Z" fill="#FDFBF4" />
            </g>
          </svg>

          {/* map title */}
          <div style={{ position: "absolute", top: 18, left: 22, zIndex: 5 }}>
            <div
              style={{
                background: "rgba(255,255,255,.85)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(10,40,71,.08)",
                borderRadius: 16,
                padding: "12px 18px",
                boxShadow: "0 8px 24px rgba(10,40,71,.1)",
              }}
            >
              <div style={{ fontSize: 17, fontWeight: 900, color: "#0A2847" }}>
                🗺️ Peta Petualangan
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#51718B" }}>
                Jalur belajar bahasa Arab-mu, Zahra
              </div>
            </div>
          </div>

          {/* legend */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 22,
              zIndex: 5,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span style={card}>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#2EAF73",
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                  fontSize: 9,
                  fontWeight: 900,
                }}
              >
                ✓
              </span>
              Selesai
            </span>
            <span style={card}>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#1B6CA8",
                  boxShadow: "0 0 0 3px rgba(27,108,168,.25)",
                }}
              />
              Sedang berjalan
            </span>
            <span style={card}>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#FFF6D6",
                  border: "2.5px solid #F5C518",
                }}
              />
              Terbuka
            </span>
            <span style={{ ...card, color: "#51718B" }}>
              <span style={{ fontSize: 12 }}>🔒</span>Terkunci
            </span>
          </div>

          {/* NODE: L1 IQRO (selesai) */}
          <div
            style={{
              position: "absolute",
              left: "14.3%",
              top: "69.2%",
              transform: "translate(-50%,-50%)",
              zIndex: 4,
              textAlign: "center",
              width: 168,
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: "#2EAF73",
                border: "5px solid #fff",
                boxShadow: "0 6px 0 #1D9E75,0 12px 24px rgba(10,40,71,.22)",
                display: "grid",
                placeItems: "center",
                margin: "0 auto",
                color: "#fff",
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              ✓
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.92)",
                border: "1.5px solid rgba(46,175,115,.5)",
                borderRadius: 14,
                padding: "8px 12px",
                marginTop: 8,
                boxShadow: "0 6px 16px rgba(10,40,71,.12)",
              }}
            >
              <div style={{ fontSize: 13.5, fontWeight: 900, color: "#0A2847" }}>
                L1 · Iqro
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#2EAF73" }}>
                Selesai · 100% · +120 ن
              </div>
            </div>
          </div>

          {/* NODE: L2 GRAMATIKA (sedang berjalan) */}
          <div
            style={{
              position: "absolute",
              left: "36.5%",
              top: "46%",
              transform: "translate(-50%,-50%)",
              zIndex: 6,
              textAlign: "center",
              width: 236,
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "#042C53",
                color: "#fff",
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: ".06em",
                padding: "5px 14px",
                borderRadius: 99,
                marginBottom: 7,
                boxShadow: "0 4px 10px rgba(4,44,83,.3)",
              }}
            >
              KAMU DI SINI
            </div>
            <div style={{ position: "relative", width: 84, height: 84, margin: "0 auto" }}>
              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: "50%",
                  background: "#1B6CA8",
                  border: "5px solid #fff",
                  boxShadow: "0 6px 0 #0d4f80,0 14px 28px rgba(27,108,168,.35)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 32,
                  animation: "ringpulse 2.4s ease-out infinite",
                }}
              >
                📖
              </div>
              <svg
                viewBox="0 0 64 56"
                width="58"
                height="51"
                style={{
                  position: "absolute",
                  right: -38,
                  top: -22,
                  animation: "bob 3s ease-in-out infinite",
                }}
              >
                <ellipse cx="15" cy="40" rx="8" ry="5" fill="#1D9E75" />
                <ellipse cx="49" cy="40" rx="8" ry="5" fill="#1D9E75" />
                <ellipse cx="32" cy="34" rx="20" ry="15" fill="#2EAF73" />
                <path d="M32 23 L42 31 L37 42 L27 42 L22 31 Z" fill="#1D9E75" />
                <circle cx="32" cy="16" r="11" fill="#2EAF73" />
                <circle cx="24.5" cy="18" r="2.6" fill="#F0997B" />
                <circle cx="39.5" cy="18" r="2.6" fill="#F0997B" />
                <circle cx="28.5" cy="14" r="2.3" fill="#042C53" />
                <circle cx="35.5" cy="14" r="2.3" fill="#042C53" />
                <circle cx="29.2" cy="13.2" r=".8" fill="#fff" />
                <circle cx="36.2" cy="13.2" r=".8" fill="#fff" />
                <path d="M28.5 19 Q32 21.6 35.5 19" stroke="#042C53" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.95)",
                border: "2px solid #1B6CA8",
                borderRadius: 16,
                padding: "12px 14px",
                marginTop: 9,
                boxShadow: "0 12px 28px rgba(27,108,168,.22)",
              }}
            >
              <div style={{ fontSize: 14.5, fontWeight: 900, color: "#0A2847" }}>
                L2 · Gramatika
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#51718B",
                  marginBottom: 9,
                }}
              >
                Nahwu &amp; Sharaf
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", gap: 4 }}>
                  <span style={{ width: 26, height: 8, borderRadius: 99, background: "#2EAF73" }} />
                  <span
                    style={{
                      width: 26,
                      height: 8,
                      borderRadius: 99,
                      background: "#1B6CA8",
                      boxShadow: "0 0 0 2.5px rgba(27,108,168,.25)",
                    }}
                  />
                  <span style={{ width: 26, height: 8, borderRadius: 99, background: "#E0E8EE" }} />
                </div>
                <span style={{ fontSize: 11.5, fontWeight: 900, color: "#1B6CA8" }}>
                  Babak 2/3
                </span>
              </div>
              <button
                type="button"
                onClick={() => router.push("/quest/l2")}
                style={{
                  width: "100%",
                  background: "#2EAF73",
                  color: "#fff",
                  fontFamily: "inherit",
                  fontSize: 13.5,
                  fontWeight: 800,
                  padding: 10,
                  borderRadius: 99,
                  border: "none",
                  boxShadow: "0 4px 0 #1D9E75",
                  cursor: "pointer",
                }}
              >
                Lanjut Quest →
              </button>
            </div>
          </div>

          {/* NODE: TRACK UMROH (terbuka, featured) */}
          <div
            style={{
              position: "absolute",
              left: "64.8%",
              top: "24%",
              transform: "translate(-50%,-50%)",
              zIndex: 5,
              textAlign: "center",
              width: 200,
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "#2EAF73",
                color: "#fff",
                fontSize: 11,
                fontWeight: 900,
                padding: "5px 14px",
                borderRadius: 99,
                marginBottom: 7,
                boxShadow: "0 4px 10px rgba(46,175,115,.4)",
              }}
            >
              ★ Paling diminati
            </div>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(160deg,#FFD54A,#F5C518)",
                border: "5px solid #fff",
                boxShadow:
                  "0 6px 0 #D9A90C,0 0 0 9px rgba(245,197,24,.22),0 14px 28px rgba(10,40,71,.2)",
                display: "grid",
                placeItems: "center",
                margin: "0 auto",
                fontSize: 32,
              }}
            >
              🕋
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.95)",
                border: "2px solid #F5C518",
                borderRadius: 16,
                padding: "11px 13px",
                marginTop: 9,
                boxShadow: "0 10px 26px rgba(10,40,71,.16)",
              }}
            >
              <div style={{ fontSize: 14.5, fontWeight: 900, color: "#0A2847" }}>
                Track Siap Umroh
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#51718B",
                  marginBottom: 9,
                }}
              >
                Terbuka · 8 minggu · 3 level
              </div>
              <button
                type="button"
                onClick={() => router.push("/quest/umroh")}
                style={{
                  width: "100%",
                  background: "#1B6CA8",
                  color: "#fff",
                  fontFamily: "inherit",
                  fontSize: 13,
                  fontWeight: 800,
                  padding: 9,
                  borderRadius: 99,
                  border: "none",
                  boxShadow: "0 4px 0 #0d4f80",
                  cursor: "pointer",
                }}
              >
                Mulai →
              </button>
            </div>
          </div>

          {/* LOCKED NODES */}
          <LockedNode left="76.8%" top="47%" icon="🔒" title="💬 Percakapan" note="Selesaikan L2 dulu" />
          <LockedNode
            left="83%"
            top="70%"
            icon="🔒"
            title="💼 Arabic Bisnis"
            note={
              <>
                Beli level ini · <span style={{ color: "#9A7A06" }}>Rp 99rb</span>
              </>
            }
          />
          <LockedNode
            left="65.5%"
            top="84%"
            icon="🔒"
            title="✈️ Arabic Travel"
            note={
              <>
                Beli level ini · <span style={{ color: "#9A7A06" }}>Rp 99rb</span>
              </>
            }
          />
        </div>

        {/* RIGHT RAIL */}
        <aside
          style={{
            width: 300,
            flexShrink: 0,
            borderLeft: "1px solid rgba(10,40,71,.08)",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            background: "#F8FBFD",
            overflowY: "auto",
          }}
        >
          {/* Level / XP */}
          <div
            style={{
              background: "linear-gradient(135deg,#1B6CA8,#0d4f80)",
              borderRadius: 18,
              padding: 18,
              color: "#fff",
            }}
          >
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#FCE08A" }}>
              ⭐ LEVEL 4
            </div>
            <div style={{ fontSize: 17, fontWeight: 900, margin: "2px 0 12px" }}>
              Penjelajah Hijaiyah
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              <span>Menuju Lv 5</span>
              <span>320/500 XP</span>
            </div>
            <div
              style={{
                height: 12,
                background: "rgba(255,255,255,.18)",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "64%",
                  height: "100%",
                  background: "linear-gradient(90deg,#F5C518,#FFD54A)",
                  borderRadius: 99,
                }}
              />
            </div>
          </div>

          {/* Misi Harian */}
          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(10,40,71,.08)",
              borderRadius: 18,
              padding: 17,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 900,
                color: "#0A2847",
                marginBottom: 13,
              }}
            >
              🎯 Misi Harian
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 7,
                    background: "#2EAF73",
                    display: "grid",
                    placeItems: "center",
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: 12,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#0A2847",
                    opacity: 0.6,
                    textDecoration: "line-through",
                    flex: 1,
                  }}
                >
                  Selesaikan 1 quest
                </span>
                <span style={{ fontSize: 11.5, fontWeight: 800, color: "#9A7A06" }}>
                  +20 ن
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 7,
                    border: "2px solid rgba(10,40,71,.15)",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#0A2847" }}>
                    Kumpulkan 50 koin
                  </div>
                  <div
                    style={{
                      height: 5,
                      background: "#E8EEF2",
                      borderRadius: 99,
                      marginTop: 5,
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ width: "40%", height: "100%", background: "#F5C518" }} />
                  </div>
                </div>
                <span style={{ fontSize: 13 }}>🏅</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 7,
                    border: "2px solid rgba(10,40,71,.15)",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 13, fontWeight: 800, color: "#0A2847", flex: 1 }}>
                  Latihan 5 menit
                </span>
                <span style={{ fontSize: 11.5, fontWeight: 800, color: "#1B6CA8" }}>
                  +10 XP
                </span>
              </div>
            </div>
          </div>

          {/* Lencana */}
          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(10,40,71,.08)",
              borderRadius: 18,
              padding: 17,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 900, color: "#0A2847" }}>
                🏆 Lencana
              </span>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#1B6CA8" }}>
                4/12
              </span>
            </div>
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
              {[
                ["📖", "#FFF6D6", "1.5px solid #F0DD96", 21],
                ["🔥", "#FFE6D8", "1.5px solid #F6C3A8", 21],
                ["🐢", "#E1F5EE", "1.5px solid rgba(46,175,115,.4)", 21],
                ["💬", "#E3F0F9", "1.5px solid #BFDCEF", 21],
                ["🔒", "#F4F7F9", "1.5px dashed rgba(10,40,71,.18)", 18],
              ].map(([icon, bg, border, fs], i) => (
                <div
                  key={i}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: bg as string,
                    display: "grid",
                    placeItems: "center",
                    fontSize: fs as number,
                    border: border as string,
                    opacity: i === 4 ? 0.5 : 1,
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Preview kota */}
          <div
            style={{
              background: "linear-gradient(160deg,#042C53,#0E3A66)",
              borderRadius: 18,
              padding: "16px 17px",
              color: "#fff",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 4 }}>
              🏙️ Kotamu
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,.65)",
                marginBottom: 10,
              }}
            >
              3 bangunan tumbuh dari belajarmu
            </div>
            <svg viewBox="0 0 260 84" style={{ width: "100%", display: "block" }}>
              <ellipse cx="130" cy="62" rx="120" ry="19" fill="#0D6147" />
              <ellipse cx="130" cy="58" rx="108" ry="16" fill="#2EAF73" />
              <rect x="55" y="35" width="28" height="23" rx="3" fill="#FDFBF4" />
              <path d="M53 37 l16 -12 l16 12 z" fill="#1D9E75" />
              <rect x="115" y="27" width="24" height="31" rx="3" fill="#A9D5EE" />
              <path d="M113 29 l14 -11 l14 11 z" fill="#1B6CA8" />
              <rect x="168" y="39" width="26" height="19" rx="3" fill="#F0C04A" />
              <path d="M166 41 l15 -11 l15 11 z" fill="#D9A90C" />
            </svg>
            <button
              type="button"
              onClick={() => router.push("/game")}
              style={{
                width: "100%",
                background: "rgba(93,202,165,.18)",
                color: "#5DCAA5",
                border: "1px solid rgba(93,202,165,.4)",
                fontFamily: "inherit",
                fontSize: 12.5,
                fontWeight: 800,
                padding: 9,
                borderRadius: 99,
                cursor: "pointer",
                marginTop: 11,
              }}
            >
              Kunjungi Dunia Game →
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
