"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${stuck ? " stuck" : ""}`}>
      <div className="nav-in">
        <a className="logo" href="#">
          <span>
            <span className="n1">Nusa</span>
            <span className="n2">World</span>
          </span>
        </a>
        <div className="nav-links">
          <a href="#tracks">Kelas</a>
          <a href="#cara">Cara Kerja</a>
          <a href="#game">Dunia Game</a>
          <a href="#harga">Harga</a>
        </div>
        <div className="nav-cta">
          <Link className="nav-masuk" href="/login">
            Masuk
          </Link>
          <Link className="btn sm" href="/quest-gratis">
            Mulai Gratis
          </Link>
        </div>
      </div>
    </nav>
  );
}
