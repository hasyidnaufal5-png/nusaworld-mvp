"use client";

import { useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const field: CSSProperties = {
  width: "100%",
  fontSize: 14.5,
  fontWeight: 700,
  color: "#0A2847",
  border: "1.5px solid rgba(10,40,71,.15)",
  borderRadius: 12,
  padding: "12px 15px",
  background: "#FBFDFE",
  fontFamily: "inherit",
  marginTop: 6,
};
const label: CSSProperties = {
  fontSize: 12,
  fontWeight: 800,
  color: "#8499AB",
  letterSpacing: ".04em",
};

function Coin({
  style,
  size,
  fs,
}: {
  style: CSSProperties;
  size: number;
  fs: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#F5C518",
        boxShadow: "0 4px 0 #c9a30c",
        display: "grid",
        placeItems: "center",
        ...style,
      }}
    >
      <span style={{ color: "#8C5a08", fontSize: fs, fontWeight: 900 }}>ن</span>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"masuk" | "daftar">("masuk");
  const [agree, setAgree] = useState(false);
  const isMasuk = tab !== "daftar";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const tabStyle = (active: boolean): CSSProperties => ({
    flex: 1,
    textAlign: "center",
    padding: "11px 0",
    borderRadius: 12,
    fontSize: 14.5,
    fontWeight: 800,
    cursor: "pointer",
    border: "none",
    fontFamily: "inherit",
    background: active ? "#1B6CA8" : "transparent",
    color: active ? "#fff" : "#7E96AA",
    boxShadow: active ? "0 3px 0 #134e7c" : "none",
  });

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(165deg,#5DCAA5,#3DBA82 45%,#2EAF73)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "54px 20px 150px",
        fontFamily: "var(--font-nunito), Nunito, sans-serif",
      }}
    >
      {/* dotted texture + blobs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.14,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.9) 2px,transparent 2px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -70,
          right: -50,
          width: 230,
          height: 230,
          borderRadius: "50%",
          background: "rgba(255,255,255,.13)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "34%",
          left: -70,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(255,255,255,.09)",
        }}
      />

      {/* drifting clouds */}
      <div
        style={{
          position: "absolute",
          top: 64,
          left: "7%",
          animation: "nw-drift 9s ease-in-out infinite",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(255,255,255,.85)",
            }}
          />
          <div
            style={{
              width: 70,
              height: 24,
              borderRadius: 99,
              background: "rgba(255,255,255,.85)",
              marginLeft: -18,
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 150,
          right: "9%",
          animation: "nw-drift 12s ease-in-out infinite 1.2s",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "rgba(255,255,255,.75)",
            }}
          />
          <div
            style={{
              width: 56,
              height: 19,
              borderRadius: 99,
              background: "rgba(255,255,255,.75)",
              marginLeft: -14,
            }}
          />
        </div>
      </div>

      {/* floating coins */}
      <Coin
        size={38}
        fs={16}
        style={{
          top: "30%",
          left: "11%",
          animation: "nw-float-slow 5s ease-in-out infinite",
        }}
      />
      <Coin
        size={30}
        fs={13}
        style={{
          top: "56%",
          right: "9%",
          boxShadow: "0 3px 0 #c9a30c",
          animation: "nw-float-slow 6.2s ease-in-out infinite .8s",
        }}
      />
      <Coin
        size={22}
        fs={10}
        style={{
          top: "18%",
          right: "22%",
          boxShadow: "0 3px 0 #c9a30c",
          animation: "nw-float-slow 7s ease-in-out infinite 1.6s",
        }}
      />

      {/* city skyline */}
      <svg
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 130,
          display: "block",
        }}
      >
        <g fill="#1D9E75" opacity=".55">
          <rect x="20" y="70" width="70" height="80" rx="5" />
          <rect x="130" y="44" width="20" height="106" />
          <polygon points="130,44 140,20 150,44" fill="#1D9E75" />
          <rect x="190" y="84" width="84" height="66" rx="5" />
          <rect x="320" y="60" width="64" height="90" rx="5" />
          <rect x="430" y="90" width="78" height="60" rx="5" />
          <rect x="560" y="50" width="22" height="100" />
          <rect x="620" y="78" width="74" height="72" rx="5" />
          <rect x="740" y="64" width="66" height="86" rx="5" />
          <rect x="860" y="92" width="80" height="58" rx="5" />
          <rect x="990" y="56" width="20" height="94" />
          <polygon points="990,56 1000,32 1010,56" />
          <rect x="1050" y="80" width="76" height="70" rx="5" />
          <rect x="1180" y="66" width="62" height="84" rx="5" />
          <rect x="1290" y="88" width="84" height="62" rx="5" />
        </g>
        <g fill="#FDFBF4">
          <rect x="60" y="96" width="64" height="54" rx="5" />
          <path d="M56 98 q36 -34 72 0 z" fill="#117a57" />
          <rect x="82" y="120" width="20" height="30" rx="8" fill="#1B6CA8" />
          <rect x="160" y="78" width="13" height="72" rx="5" />
          <path d="M157 80 q9.5 -18 19 0 z" fill="#117a57" />
          <rect x="230" y="104" width="56" height="46" rx="4" fill="#FCE9C0" />
          <polygon points="226,104 258,84 290,104" fill="#F0C04A" />
          <rect x="248" y="124" width="18" height="26" rx="3" fill="#8C5a08" />
          <rect x="350" y="92" width="50" height="58" rx="4" />
          <polygon points="346,92 375,72 404,92" fill="#117a57" />
          <rect x="362" y="104" width="13" height="13" rx="2" fill="#A9D5EE" />
          <rect x="382" y="104" width="13" height="13" rx="2" fill="#A9D5EE" />
          <rect x="470" y="110" width="52" height="40" rx="4" fill="#FCE9C0" />
          <polygon points="466,110 496,92 526,110" fill="#F0C04A" />
          <rect x="600" y="96" width="54" height="54" rx="4" />
          <path d="M600 96a27 23 0 0 1 54 0z" fill="#117a57" />
          <circle cx="627" cy="62" r="4" fill="#F5C518" />
          <rect x="700" y="108" width="48" height="42" rx="4" fill="#FCE9C0" />
          <polygon points="696,108 724,90 752,108" fill="#F0C04A" />
          <rect x="800" y="88" width="14" height="62" rx="5" />
          <path d="M797 90 q10 -19 20 0 z" fill="#117a57" />
          <rect x="850" y="100" width="58" height="50" rx="4" />
          <polygon points="846,100 879,80 912,100" fill="#117a57" />
          <rect x="868" y="122" width="20" height="28" rx="8" fill="#1B6CA8" />
          <rect x="960" y="112" width="50" height="38" rx="4" fill="#FCE9C0" />
          <polygon points="956,112 985,94 1014,112" fill="#F0C04A" />
          <rect x="1080" y="94" width="52" height="56" rx="4" />
          <polygon points="1076,94 1106,74 1136,94" fill="#117a57" />
          <rect x="1094" y="106" width="13" height="13" rx="2" fill="#A9D5EE" />
          <rect x="1114" y="106" width="13" height="13" rx="2" fill="#A9D5EE" />
          <rect x="1180" y="106" width="56" height="44" rx="4" fill="#FCE9C0" />
          <polygon points="1176,106 1208,86 1240,106" fill="#F0C04A" />
          <rect x="1300" y="90" width="13" height="60" rx="5" />
          <path d="M1297 92 q9.5 -18 19 0 z" fill="#117a57" />
          <rect x="1340" y="112" width="58" height="38" rx="4" />
          <polygon points="1336,112 1369,94 1402,112" fill="#117a57" />
        </g>
        <g>
          <circle cx="540" cy="134" r="11" fill="#117a57" />
          <rect x="538" y="140" width="4" height="10" fill="#6b4423" />
          <circle cx="940" cy="136" r="12" fill="#117a57" />
          <rect x="938" y="142" width="4" height="8" fill="#6b4423" />
          <circle cx="1270" cy="134" r="10" fill="#117a57" />
          <rect x="1268" y="140" width="4" height="10" fill="#6b4423" />
          <circle cx="120" cy="136" r="10" fill="#117a57" />
          <rect x="118" y="142" width="4" height="8" fill="#6b4423" />
        </g>
      </svg>

      {/* CARD */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: 474,
          background: "#fff",
          borderRadius: 26,
          overflow: "hidden",
          boxShadow: "0 30px 64px rgba(4,44,83,.3)",
        }}
      >
        {/* header */}
        <div
          style={{
            position: "relative",
            background:
              "linear-gradient(135deg,#2480C4,#1B6CA8 50%,#15598C)",
            padding: "30px 30px 26px",
            textAlign: "center",
            color: "#fff",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -44,
              left: -34,
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: "rgba(93,202,165,.18)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -50,
              right: -40,
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: "rgba(255,255,255,.08)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "linear-gradient(135deg,#5DCAA5,#F5C518)",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 3px 0 rgba(4,44,83,.22)",
              }}
            >
              <span style={{ color: "#042C53", fontSize: 16, fontWeight: 900 }}>
                ن
              </span>
            </div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: "-.4px",
                color: "#fff",
              }}
            >
              Nusa<span style={{ color: "#F5C518" }}>World</span>
            </span>
          </div>
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "inline-block",
              animation: "nw-float 4.5s ease-in-out infinite",
            }}
          >
            <svg
              viewBox="0 0 120 112"
              style={{
                width: 92,
                height: "auto",
                filter: "drop-shadow(0 10px 14px rgba(4,44,83,.32))",
              }}
            >
              <ellipse cx="26" cy="70" rx="15" ry="9" fill="#1D9E75" transform="rotate(-22 26 70)" />
              <ellipse cx="94" cy="70" rx="15" ry="9" fill="#1D9E75" transform="rotate(22 94 70)" />
              <ellipse cx="34" cy="89" rx="13" ry="8" fill="#178a64" transform="rotate(-12 34 89)" />
              <ellipse cx="86" cy="89" rx="13" ry="8" fill="#178a64" transform="rotate(12 86 89)" />
              <ellipse cx="60" cy="66" rx="38" ry="31" fill="#1D9E75" />
              <ellipse cx="60" cy="62" rx="31" ry="25" fill="#2EAF73" />
              <polygon points="60,44 73,52 73,68 60,76 47,68 47,52" fill="#F5C518" />
              <polygon points="36,58 47,52 47,68 36,72" fill="#5DCAA5" />
              <polygon points="84,58 73,52 73,68 84,72" fill="#1B6CA8" />
              <circle cx="60" cy="26" r="17" fill="#2EAF73" />
              <circle cx="53" cy="24" r="5.5" fill="#fff" />
              <circle cx="67" cy="24" r="5.5" fill="#fff" />
              <circle cx="54" cy="25" r="2.6" fill="#042C53" />
              <circle cx="66" cy="25" r="2.6" fill="#042C53" />
              <circle cx="51.5" cy="32" r="2.4" fill="#F5A5A5" opacity=".7" />
              <circle cx="68.5" cy="32" r="2.4" fill="#F5A5A5" opacity=".7" />
              <path d="M55 33 q5 4 10 0" stroke="#042C53" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <p
            style={{
              position: "relative",
              zIndex: 2,
              fontSize: 13.5,
              fontWeight: 800,
              color: "#F5C518",
              letterSpacing: ".08em",
              margin: "8px 0 0",
            }}
          >
            JELAJAHI · BICARA · MENDUNIA
          </p>
        </div>

        {/* AUTH FORM */}
        <div style={{ padding: "24px 30px 30px" }}>
          <div
            style={{
              display: "flex",
              gap: 6,
              background: "#F2F8FB",
              border: "1px solid rgba(10,40,71,.07)",
              padding: 5,
              borderRadius: 16,
              marginBottom: 22,
            }}
          >
            <button type="button" style={tabStyle(isMasuk)} onClick={() => setTab("masuk")}>
              Masuk
            </button>
            <button type="button" style={tabStyle(!isMasuk)} onClick={() => setTab("daftar")}>
              Daftar
            </button>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {!isMasuk && (
              <div>
                <span style={label}>NAMA LENGKAP</span>
                <input style={field} type="text" placeholder="Zahra Nusantara" required />
              </div>
            )}
            <div>
              <span style={label}>EMAIL</span>
              <input style={field} type="email" placeholder="kamu@email.com" required />
            </div>
            <div>
              <span style={label}>KATA SANDI</span>
              <input style={field} type="password" placeholder="••••••••" required />
            </div>

            {isMasuk ? (
              <div style={{ textAlign: "right" }}>
                <a
                  href="#"
                  style={{ fontSize: 13, fontWeight: 800, color: "#1B6CA8" }}
                >
                  Lupa kata sandi?
                </a>
              </div>
            ) : (
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#51718B",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree((a) => !a)}
                  required
                  style={{ width: 18, height: 18, marginTop: 2, accentColor: "#2EAF73" }}
                />
                <span>
                  Saya setuju dengan{" "}
                  <a href="#" style={{ color: "#1B6CA8", fontWeight: 800 }}>
                    Ketentuan Layanan
                  </a>{" "}
                  &amp;{" "}
                  <a href="#" style={{ color: "#1B6CA8", fontWeight: 800 }}>
                    Kebijakan Privasi
                  </a>{" "}
                  NusaWorld.
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={!isMasuk && !agree}
              style={{
                width: "100%",
                background: !isMasuk && !agree ? "#A9D9C3" : "#2EAF73",
                color: "#fff",
                fontFamily: "inherit",
                fontSize: 15.5,
                fontWeight: 800,
                padding: "13px",
                borderRadius: 99,
                border: "none",
                boxShadow: !isMasuk && !agree ? "none" : "0 4px 0 #1D9E75",
                cursor: !isMasuk && !agree ? "not-allowed" : "pointer",
              }}
            >
              {isMasuk ? "Masuk →" : "Buat Akun →"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: 18,
              fontSize: 13,
              fontWeight: 700,
              color: "#7E96AA",
            }}
          >
            {isMasuk ? "Belum punya akun? " : "Sudah punya akun? "}
            <button
              type="button"
              onClick={() => setTab(isMasuk ? "daftar" : "masuk")}
              style={{
                background: "none",
                border: "none",
                color: "#1B6CA8",
                fontWeight: 800,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {isMasuk ? "Daftar gratis" : "Masuk di sini"}
            </button>
          </p>
          <p style={{ textAlign: "center", marginTop: 10 }}>
            <Link href="/" style={{ fontSize: 12.5, fontWeight: 700, color: "#9DB2C4" }}>
              ← Kembali ke beranda
            </Link>
          </p>
        </div>
      </div>

      <p
        style={{
          position: "relative",
          zIndex: 3,
          margin: "26px 0 0",
          fontSize: 13,
          fontWeight: 700,
          color: "rgba(255,255,255,.85)",
          textAlign: "center",
        }}
      >
        الْعَرَبِيَّةُ مُمْتِعَة — Bahasa Arab itu menyenangkan · © 2026 NusaWorld
      </p>
    </div>
  );
}
