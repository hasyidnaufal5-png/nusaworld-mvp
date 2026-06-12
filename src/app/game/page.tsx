import type { Metadata } from "next";
import GameViewer from "./_components/GameViewer";

export const metadata: Metadata = {
  title: "Dunia Game — Galeri Aset 3D | NusaWorld",
  description:
    "Viewer aset 3D NusaWorld: jelajahi model bangunan, karakter, dan hewan untuk Dunia Game.",
};

export default function GamePage() {
  return <GameViewer />;
}
