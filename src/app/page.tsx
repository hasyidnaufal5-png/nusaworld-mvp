"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CityScene from "@/components/CityScene";

export default function LandingPage() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO 3D */}
      <header className="hero3d" id="hero">
        <CityScene />
        <div className="hero-overlay">
          <div className="hero-card">
            <div className="hero-badge">★ Baru — Track Siap Umroh, 8 minggu</div>
            <h1>
              Belajar Bahasa Arab itu <span className="hl">Menyenangkan</span>.
            </h1>
            <p className="hero-sub">
              Setiap quest yang kamu selesaikan membangun kotamu — gedung demi
              gedung. Kurikulum Arab per tujuan, terasa seperti main game.
            </p>
            <div className="hero-ctas">
              <Link className="btn" href="/quest-gratis">
                Coba 10 Soal Gratis →
              </Link>
              <a className="btn ghost" href="#cara">
                Lihat cara kerja
              </a>
            </div>
            <div className="hero-micro">
              <span>✓ Tanpa daftar</span>
              <span>✓ Tanpa kartu kredit</span>
              <span>✓ Mulai dari nol</span>
            </div>
          </div>
        </div>
      </header>

      {/* TRACKS */}
      <section className="tracks" id="tracks">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="kicker">KELAS</span>
          <h2>Kamu mau belajar Arab untuk apa?</h2>
          <p className="lead" style={{ margin: "0 auto" }}>
            Pilih jalurmu. Kurikulum tersusun per tujuan — bukan satu ukuran
            untuk semua.
          </p>
          <div className="track-grid">
            <div className="tcard feat rv">
              <div className="star">★ Paling diminati</div>
              <div className="ico" style={{ background: "#E1F5EE" }}>
                🕋
              </div>
              <h3>Siap Umroh</h3>
              <p>
                Kuasai doa, ritual, dan sapaan ibadah — siap berangkat dengan
                percaya diri.
              </p>
              <div className="est">⏱ 8 minggu · 3 level</div>
            </div>
            <div className="tcard rv">
              <div className="ico" style={{ background: "#E3F0F9" }}>
                💬
              </div>
              <h3>Percakapan Sehari-hari</h3>
              <p>
                Ngobrol santai — sapaan, keluarga, aktivitas harian, sampai
                level mahir.
              </p>
              <div className="est">⏱ 10 minggu · 4 level</div>
            </div>
            <div className="tcard rv">
              <div className="ico" style={{ background: "#FFF6D6" }}>
                💼
              </div>
              <h3>Arabic Bisnis</h3>
              <p>
                Korespondensi, meeting, dan negosiasi untuk karier di Timur
                Tengah.
              </p>
              <div className="est">⏱ 12 minggu · 4 level</div>
            </div>
            <div className="tcard rv">
              <div className="ico" style={{ background: "#F0EBFA" }}>
                ✈️
              </div>
              <h3>Arabic Travel</h3>
              <p>
                Bandara, hotel, arah jalan — percaya diri menjelajah negeri
                Arab.
              </p>
              <div className="est">⏱ 6 minggu · 2 level</div>
            </div>
          </div>
          <p className="track-note">
            Semua jalur dimulai dari fondasi yang sama: L1 Iqro (baca huruf)
            &amp; L2 Gramatika (Nahwu + Sharaf).
          </p>
        </div>
      </section>

      {/* CARA KERJA */}
      <section id="cara">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="kicker">Cara Kerja</span>
          <h2>Semudah tiga langkah</h2>
          <div className="steps-grid">
            <div className="step rv">
              <div className="num">1</div>
              <h3>Pilih Kelasmu</h3>
              <p>
                Umroh, percakapan, bisnis, atau travel. Setiap jalur punya
                outcome dan estimasi waktu yang jelas.
              </p>
            </div>
            <div className="step rv">
              <div className="num">2</div>
              <h3>Kerjakan quest, dapat koin</h3>
              <p>
                10–15 soal per sesi, tiga babak dari mudah ke sulit. Cuma 5–8
                menit . progres tersimpan otomatis.
              </p>
            </div>
            <div className="step rv">
              <div className="num">3</div>
              <h3>Bangun kota bersama</h3>
              <p>
                Koinmu jadi rumah, toko, dan taman di Dunia Game. kota bersama
                semua pemain NusaWorld.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DUNIA GAME */}
      <section className="game" id="game">
        <div className="wrap game-grid">
          <div>
            <span className="kicker">Dunia Game</span>
            <h2>Koin hanya dari belajar. Tidak bisa dibeli uang.</h2>
            <p className="lead">
              Kota virtualmu adalah cermin nyata dari belajarmu. Kota yang besar
              = dedikasi belajar, bukan isi dompet.
            </p>
            <div className="game-feats">
              <div className="gf rv">
                <div className="gi">⚔️</div>
                <div>
                  <h4>Duel kosakata lintas bahasa</h4>
                  <p>
                    Pemain Arab bisa menantang pemain Jepang atau Mandarin —
                    satu kota untuk semua bahasa.
                  </p>
                </div>
              </div>
              <div className="gf rv">
                <div className="gi">🏠</div>
                <div>
                  <h4>Bangun kota &amp; rumahmu sendiri</h4>
                  <p>
                    Setiap koin dari quest bisa jadi bangunan. Kotamu tumbuh
                    seiring kemampuan bahasamu.
                  </p>
                </div>
              </div>
              <div className="gf rv">
                <div className="gi">🛡️</div>
                <div>
                  <h4>Tanpa gacha. Tanpa energy bar.</h4>
                  <p>
                    Tidak ada hukuman kehilangan koin, tidak ada tekanan
                    finansial. Aman untuk semua umur.
                  </p>
                </div>
              </div>
            </div>
            <div className="game-note">
              💡 Semakin banyak bahasa kamu pelajari, semakin cepat kotamu
              berkembang.
            </div>
          </div>
          <div className="city-card rv">
            <svg viewBox="0 0 560 400" aria-label="Preview kota NusaWorld">
              <rect width="560" height="400" fill="#0E3A66" />
              <circle cx="60" cy="40" r="2" fill="rgba(255,255,255,.5)" />
              <circle cx="500" cy="30" r="1.6" fill="rgba(93,202,165,.6)" />
              <circle cx="320" cy="22" r="1.4" fill="rgba(255,255,255,.35)" />
              <circle cx="430" cy="64" r="1.4" fill="rgba(245,197,24,.6)" />
              <ellipse cx="280" cy="280" rx="245" ry="105" fill="#0D6147" />
              <ellipse cx="280" cy="270" rx="228" ry="94" fill="#2EAF73" />
              <ellipse cx="280" cy="282" rx="74" ry="30" fill="#EFD9A7" />
              <ellipse cx="280" cy="282" rx="46" ry="18" fill="#E5C98C" />
              <rect x="116" y="206" width="74" height="56" rx="6" fill="#FDFBF4" />
              <path d="M121 210 q32 -38 64 0 z" fill="#1D9E75" />
              <rect x="142" y="232" width="20" height="30" rx="9" fill="#1B6CA8" />
              <rect x="196" y="194" width="11" height="68" rx="5" fill="#FDFBF4" />
              <path d="M194 196 q7.5 -15 15 0 z" fill="#1D9E75" />
              <rect x="368" y="216" width="56" height="44" rx="5" fill="#E67E22" />
              <path d="M364 220 l32 -22 l32 22 z" fill="#D35400" />
              <rect x="384" y="238" width="16" height="22" rx="3" fill="#8C3F08" />
              <rect x="434" y="230" width="44" height="34" rx="5" fill="#F0C04A" />
              <path d="M430 234 l26 -18 l26 18 z" fill="#D9A90C" />
              <rect x="236" y="196" width="38" height="32" rx="4" fill="#A9D5EE" />
              <path d="M232 200 l23 -17 l23 17 z" fill="#1B6CA8" />
              <rect x="292" y="200" width="38" height="30" rx="4" fill="#F0997B" />
              <path d="M288 204 l23 -16 l23 16 z" fill="#C95C36" />
              <circle cx="100" cy="286" r="14" fill="#1D9E75" />
              <rect x="97.6" y="294" width="4.8" height="12" fill="#8A5A2B" />
              <circle cx="478" cy="290" r="12" fill="#1D9E75" />
              <rect x="476" y="297" width="4" height="10" fill="#8A5A2B" />
              <circle cx="356" cy="306" r="11" fill="#2EAF73" />
              <rect x="354.2" y="312" width="3.6" height="9" fill="#8A5A2B" />
              <path
                d="M180 276 Q230 296 280 286 Q340 274 396 268"
                fill="none"
                stroke="#F5C518"
                strokeWidth="3"
                strokeDasharray="8,7"
                strokeLinecap="round"
              />
              <circle cx="262" cy="276" r="8" fill="#8E44AD" />
              <rect x="256" y="282" width="12" height="12" rx="4" fill="#8E44AD" />
              <circle cx="298" cy="284" r="8" fill="#2471A3" />
              <rect x="292" y="290" width="12" height="12" rx="4" fill="#2471A3" />
              <rect
                x="246"
                y="226"
                width="106"
                height="26"
                rx="13"
                fill="#042C53"
                stroke="rgba(93,202,165,.4)"
              />
              <text
                x="299"
                y="243"
                fontFamily="Nunito,sans-serif"
                fontSize="12.5"
                fontWeight="800"
                fill="#5DCAA5"
                textAnchor="middle"
              >
                ⚔ Duel: あ vs ب
              </text>
              <rect
                x="426"
                y="22"
                width="112"
                height="32"
                rx="16"
                fill="rgba(4,44,83,.85)"
                stroke="rgba(245,197,24,.4)"
              />
              <circle cx="446" cy="38" r="9" fill="#F5C518" />
              <text
                x="446"
                y="42"
                fontSize="10"
                fontWeight="800"
                fill="#6E5302"
                textAnchor="middle"
                fontFamily="Nunito,sans-serif"
              >
                ن
              </text>
              <text
                x="492"
                y="43"
                fontFamily="Nunito,sans-serif"
                fontSize="14"
                fontWeight="800"
                fill="#fff"
                textAnchor="middle"
              >
                1.240
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* HARGA */}
      <section id="harga">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="kicker">Harga</span>
          <h2>Bayar sekali. Bukan langganan.</h2>
          <p className="lead" style={{ margin: "0 auto" }}>
            Beli putus per level akses selamanya. Tidak ada tagihan bulanan yang
            diam-diam jalan terus.
          </p>
          <div className="price-grid">
            <div className="pcard rv">
              <div className="pname">Mulai Gratis</div>
              <div className="pdesc">Tanpa daftar · langsung coba</div>
              <div className="pprice">Rp 0</div>
              <div className="punit">selamanya</div>
              <ul>
                <li>
                  <span className="ck">✓</span> Quest penjajakan — 10 soal
                </li>
                <li>
                  <span className="ck">✓</span> Tanpa akun &amp; login
                </li>
                <li>
                  <span className="ck">✓</span> Tidak ada batas waktu
                </li>
                <li>
                  <span className="ck">✓</span> Preview semua jalur
                </li>
              </ul>
              <Link
                className="btn ghost"
                href="/quest-gratis"
                style={{ justifyContent: "center" }}
              >
                Coba Sekarang
              </Link>
            </div>
            <div className="pcard feat rv">
              <div className="rec">Rekomendasi</div>
              <div className="pname">Satu Level Arab</div>
              <div className="pdesc">Beli putus · akses selamanya</div>
              <div className="pprice">
                Rp 99rb <small>/level</small>
              </div>
              <div className="punit">sekali bayar — bukan per bulan</div>
              <ul>
                <li>
                  <span className="ck">✓</span> 4 kelas · ±20 quest
                </li>
                <li>
                  <span className="ck">✓</span> PDF + latihan + video
                </li>
                <li>
                  <span className="ck">✓</span> Akses Dunia Game
                </li>
                <li>
                  <span className="ck">✓</span> Teman AI personal
                </li>
                <li>
                  <span className="ck">✓</span> Progress &amp; rapor
                </li>
              </ul>
              <Link className="btn" href="/login">
                Beli Level 1 →
              </Link>
            </div>
            <div className="pcard rv">
              <div className="pname">Paket Tiga Akun</div>
              <div className="pdesc">Untuk keluarga · lebih hemat</div>
              <div className="pprice">
                Rp 249rb <small>/paket</small>
              </div>
              <div className="punit">3 akun · 1 level per akun</div>
              <ul>
                <li>
                  <span className="ck">✓</span> 3 akun terpisah
                </li>
                <li>
                  <span className="ck">✓</span> Dasbor pantau progres
                </li>
                <li>
                  <span className="ck">✓</span> Laporan via WhatsApp
                </li>
                <li>
                  <span className="ck">✓</span> Hemat vs 3× beli sendiri
                </li>
              </ul>
              <Link
                className="btn ghost"
                href="/login"
                style={{ justifyContent: "center" }}
              >
                Ambil Paket
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="kicker">FAQ</span>
          <h2>Pertanyaan yang sering muncul</h2>
          <div className="faq-list">
            <details>
              <summary>
                Bisa mulai dari nol, belum kenal huruf Arab sama sekali?{" "}
                <span className="pm">+</span>
              </summary>
              <div className="ans">
                Bisa. L1 Iqro dirancang khusus dari nol — dari mengenal bentuk
                huruf sampai lancar membaca, lewat quest tracing dan latihan
                bertahap.
              </div>
            </details>
            <details>
              <summary>
                Berapa lama sampai bisa baca huruf Arab?{" "}
                <span className="pm">+</span>
              </summary>
              <div className="ans">
                Rata-rata 14 hari dengan satu quest per hari (5–8 menit). Progres
                tersimpan otomatis, jadi santai saja kalau bolong sehari.
              </div>
            </details>
            <details>
              <summary>
                Ada langganan bulanan? <span className="pm">+</span>
              </summary>
              <div className="ans">
                Tidak ada. Semua beli putus per level dengan akses selamanya.
                Bayar sekali, selesai.
              </div>
            </details>
            <details>
              <summary>
                Bedanya sama Duolingo? <span className="pm">+</span>
              </summary>
              <div className="ans">
                Tiga hal: jalur per tujuan (termasuk Track Umroh yang sangat
                spesifik), kurikulum Nahwu–Sharaf terstruktur seperti pesantren
                modern, dan Dunia Game sosial lintas bahasa tempat semua pemain
                membangun satu kota bersama. Koin hanya bisa didapat dari belajar
                — tidak bisa dibeli.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="wrap">
          <div className="final rv">
            <h2>Mulai bangun kotamu hari ini.</h2>
            <p>
              10 soal pertama tanpa daftar, tanpa kartu kredit. Setiap jawaban
              benar adalah satu batu bata kotamu.
            </p>
            <Link className="btn" href="/quest-gratis">
              Mulai Belajar →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div style={{ fontSize: 18, fontWeight: 900 }}>
            <span style={{ color: "var(--ocean)" }}>Nusa</span>
            <span style={{ color: "var(--green)" }}>World</span>
          </div>
          <div className="ar">الْعَرَبِيَّةُ مُمْتِعَة</div>
          <div>Bahasa Arab itu menyenangkan.</div>
          <div className="tagline">Jelajahi · Bicara · Mendunia</div>
          <div style={{ marginTop: 18, fontSize: 12.5 }}>
            © 2026 NusaWorld — Opsi 5 · Kota Koin
          </div>
        </div>
      </footer>
    </>
  );
}
