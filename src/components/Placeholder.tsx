import Link from "next/link";

export default function Placeholder({
  emoji,
  title,
  desc,
  backHref = "/dashboard",
  backLabel = "← Kembali ke Peta",
}: {
  emoji: string;
  title: string;
  desc: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "linear-gradient(180deg,#BBDFF5 0%,#DDF0FB 55%,#F2F8FB 100%)",
        fontFamily: "var(--font-nunito), Nunito, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 440,
          textAlign: "center",
          background: "rgba(255,255,255,.85)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,.6)",
          borderRadius: 26,
          padding: "44px 36px",
          boxShadow: "0 18px 50px rgba(10,40,71,.12)",
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 14 }} className="anim-coin">
          {emoji}
        </div>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: "#0A2847",
            letterSpacing: "-.5px",
            marginBottom: 10,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#51718B",
            marginBottom: 26,
            lineHeight: 1.6,
          }}
        >
          {desc}
        </p>
        <Link
          href={backHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#2EAF73",
            color: "#fff",
            fontSize: 15,
            fontWeight: 800,
            padding: "12px 26px",
            borderRadius: 99,
            boxShadow: "0 4px 0 #1D9E75",
          }}
        >
          {backLabel}
        </Link>
      </div>
    </div>
  );
}
