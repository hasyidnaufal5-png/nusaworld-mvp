"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Kota isometrik 3D yang tumbuh — port verbatim dari "Opsi 5 - Kota Koin v2.html".
 * Drag untuk memutar; si Penyu mengitari kota; koin melayang; awan bergerak.
 */
export default function CityScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const hint = hintRef.current;
    if (!host) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      if (hint) hint.style.display = "none";
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      33,
      host.clientWidth / host.clientHeight,
      0.1,
      120
    );
    camera.position.set(17, 13, 17);
    camera.lookAt(2.5, 0.6, 0);

    scene.add(new THREE.HemisphereLight(0xcfe9ff, 0x9ab98f, 0.95));
    const sun = new THREE.DirectionalLight(0xfff4d6, 1.1);
    sun.position.set(8, 14, 6);
    scene.add(sun);

    const M = (c: number, o?: THREE.MeshStandardMaterialParameters) =>
      new THREE.MeshStandardMaterial(
        Object.assign(
          { color: c, flatShading: true, roughness: 0.85, metalness: 0.04 },
          o || {}
        )
      );
    const city = new THREE.Group();
    city.position.x = 3.2;

    const grass = new THREE.Mesh(
      new THREE.BoxGeometry(15.5, 1.3, 15.5),
      M(0x2eaf73)
    );
    grass.position.y = -0.65;
    city.add(grass);
    const soil = new THREE.Mesh(
      new THREE.BoxGeometry(16.3, 1.1, 16.3),
      M(0xc9a86b)
    );
    soil.position.y = -1.7;
    city.add(soil);
    const roadA = new THREE.Mesh(
      new THREE.BoxGeometry(15.5, 0.12, 2.1),
      M(0xefd9a7)
    );
    roadA.position.y = 0.06;
    city.add(roadA);
    const roadB = new THREE.Mesh(
      new THREE.BoxGeometry(2.1, 0.12, 15.5),
      M(0xefd9a7)
    );
    roadB.position.y = 0.06;
    city.add(roadB);

    const defs: number[][] = [
      [-4.6, -4.6, 2.2, 2.4, 2.2, 0xfdfbf4, 0x1d9e75],
      [-2.2, -5.2, 1.7, 1.6, 1.7, 0xa9d5ee, 0x1b6ca8],
      [-5.2, -2.2, 1.7, 1.9, 1.7, 0xf0997b, 0xc95c36],
      [4.4, -4.4, 2.0, 3.0, 2.0, 0xf0c04a, 0xd9a90c],
      [2.2, -5.0, 1.6, 1.5, 1.6, 0xfdfbf4, 0xe67e22],
      [5.2, -2.0, 1.7, 2.2, 1.7, 0xa9d5ee, 0x1b6ca8],
      [4.6, 4.6, 2.3, 1.8, 2.3, 0xf0997b, 0xc95c36],
      [2.1, 5.1, 1.6, 2.6, 1.6, 0xfdfbf4, 0x1d9e75],
      [5.2, 2.1, 1.6, 1.4, 1.6, 0xf0c04a, 0xd9a90c],
      [-2.2, 5.0, 1.8, 1.7, 1.8, 0xa9d5ee, 0xe67e22],
    ];
    const builds: THREE.Group[] = [];
    defs.forEach((d, i) => {
      const g = new THREE.Group();
      const bod = new THREE.Mesh(
        new THREE.BoxGeometry(d[2], d[3], d[4]),
        M(d[5])
      );
      bod.position.y = d[3] / 2;
      g.add(bod);
      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(d[2] * 0.78, d[3] * 0.5, 4),
        M(d[6])
      );
      roof.position.y = d[3] + d[3] * 0.25;
      roof.rotation.y = Math.PI / 4;
      g.add(roof);
      g.position.set(d[0], 0, d[1]);
      g.scale.set(1, 0.001, 1);
      g.userData.delay = 0.25 + i * 0.22;
      city.add(g);
      builds.push(g);
    });

    // Masjid
    const mosque = new THREE.Group();
    const mb = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.5, 2.3), M(0xfdfbf4));
    mb.position.y = 0.75;
    mosque.add(mb);
    const md = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
      M(0x1d9e75, { roughness: 0.5 })
    );
    md.position.y = 1.5;
    mosque.add(md);
    const ms = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 8, 6),
      M(0xf5c518, { emissive: 0x7a5c00 })
    );
    ms.position.y = 2.7;
    mosque.add(ms);
    const mm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.23, 2.6, 8),
      M(0xfdfbf4)
    );
    mm.position.set(1.8, 1.3, 0.7);
    mosque.add(mm);
    const mt = new THREE.Mesh(
      new THREE.ConeGeometry(0.3, 0.6, 8),
      M(0x1d9e75)
    );
    mt.position.set(1.8, 2.9, 0.7);
    mosque.add(mt);
    mosque.position.set(-4.4, 0, 2.6);
    mosque.scale.set(1, 0.001, 1);
    mosque.userData.delay = 2.6;
    city.add(mosque);
    builds.push(mosque);

    // Penyu mengambang
    const turtle = new THREE.Group();
    const tshell = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 9, 7),
      M(0x085041)
    );
    tshell.scale.set(1, 0.6, 1.2);
    tshell.position.y = 0.44;
    turtle.add(tshell);
    const tshellTop = new THREE.Mesh(
      new THREE.SphereGeometry(0.95, 7, 5),
      M(0x0f6e56)
    );
    tshellTop.scale.set(1, 0.62, 1.18);
    tshellTop.position.y = 0.65;
    turtle.add(tshellTop);
    const thexC = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.34, 0.14, 6),
      M(0xef9f27, { emissive: 0x6b4408 })
    );
    thexC.position.y = 1.22;
    turtle.add(thexC);
    const thexA = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.11, 6),
      M(0x2471a3)
    );
    thexA.position.set(0.5, 1.12, 0.4);
    thexA.rotation.z = -0.3;
    turtle.add(thexA);
    const thexB = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.11, 6),
      M(0x8e44ad)
    );
    thexB.position.set(-0.5, 1.12, 0.4);
    thexB.rotation.z = 0.3;
    turtle.add(thexB);
    const thexD = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.11, 6),
      M(0x1e8449)
    );
    thexD.position.set(0, 1.14, -0.62);
    thexD.rotation.x = 0.32;
    turtle.add(thexD);
    const thead = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 10, 8),
      M(0x2eaf73)
    );
    thead.position.set(0, 0.5, 1.48);
    turtle.add(thead);
    const teyeL = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 8, 6),
      M(0xffffff, { roughness: 0.4 })
    );
    teyeL.position.set(-0.21, 0.65, 1.84);
    turtle.add(teyeL);
    const teyeR = teyeL.clone();
    teyeR.position.x = 0.21;
    turtle.add(teyeR);
    const tpupL = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 8, 6),
      M(0x042c53, { roughness: 0.3 })
    );
    tpupL.position.set(-0.21, 0.66, 1.94);
    turtle.add(tpupL);
    const tpupR = tpupL.clone();
    tpupR.position.x = 0.21;
    turtle.add(tpupR);
    const mkFlipper = (x: number, z: number, rz: number) => {
      const f = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6), M(0x1d9e75));
      f.scale.set(1.25, 0.25, 0.55);
      f.position.set(x, 0.34, z);
      f.rotation.z = rz;
      return f;
    };
    const tfl1 = mkFlipper(-1.2, 0.64, 0.35),
      tfl2 = mkFlipper(1.2, 0.64, -0.35),
      tfl3 = mkFlipper(-1.0, -0.76, 0.3),
      tfl4 = mkFlipper(1.0, -0.76, -0.3);
    [tfl1, tfl2, tfl3, tfl4].forEach((f) => turtle.add(f));
    turtle.position.set(5.5, 6.0, 0);
    city.add(turtle);

    // Pohon
    const tree = (x: number, z: number, s: number) => {
      const g = new THREE.Group();
      const tr = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08 * s, 0.11 * s, 0.45 * s, 6),
        M(0x8a5a2b)
      );
      tr.position.y = 0.22 * s;
      const tp = new THREE.Mesh(
        new THREE.ConeGeometry(0.4 * s, 0.9 * s, 6),
        M(0x0f6e56)
      );
      tp.position.y = 0.85 * s;
      g.add(tr);
      g.add(tp);
      g.position.set(x, 0, z);
      return g;
    };
    (
      [
        [-1.6, -2.6, 1],
        [-2.8, 1.6, 1.2],
        [1.7, 2.6, 1],
        [2.7, -1.7, 0.9],
        [-6.4, 5.6, 1.1],
        [6.3, -6.2, 1],
        [6.4, 6.3, 0.9],
        [-6.3, -6.4, 1],
      ] as number[][]
    ).forEach((p) => city.add(tree(p[0], p[1], p[2])));

    // Koin melayang
    const coins: THREE.Mesh[] = [];
    const coinGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.14, 18);
    const coinMat = M(0xf5c518, {
      roughness: 0.3,
      metalness: 0.55,
      emissive: 0x5c4503,
    });
    (
      [
        [-4.6, 4.6, -4.6],
        [4.4, 6.4, -4.4],
        [2.1, 6.2, 5.1],
        [-4.4, 4.4, 2.6],
        [0, 5.6, 0],
      ] as number[][]
    ).forEach((p, i) => {
      const c = new THREE.Mesh(coinGeo, coinMat);
      c.position.set(p[0], p[1], p[2]);
      c.rotation.z = Math.PI / 2;
      c.userData = { baseY: p[1], ph: i * 1.4 };
      coins.push(c);
      city.add(c);
    });

    scene.add(city);

    // Awan
    const cloud = (x: number, y: number, z: number, s: number) => {
      const g = new THREE.Group();
      const m = M(0xffffff, { roughness: 1 });
      (
        [
          [0, 0, 0, 1],
          [0.9, 0.18, 0.2, 0.7],
          [-1, 0.1, -0.1, 0.75],
          [0.2, 0.4, -0.3, 0.6],
        ] as number[][]
      ).forEach((b) => {
        const p = new THREE.Mesh(
          new THREE.SphereGeometry(0.8 * b[3] * s, 8, 6),
          m
        );
        p.position.set(b[0] * s, b[1] * s, b[2] * s);
        g.add(p);
      });
      g.position.set(x, y, z);
      return g;
    };
    const clouds = [
      cloud(-9, 8, -6, 1.2),
      cloud(10, 9.5, -8, 1),
      cloud(2, 10, -12, 1.4),
    ];
    clouds.forEach((c) => scene.add(c));

    // Drag rotate
    let targetRot = 0.12,
      rot = 0.12,
      dragging = false,
      lastX = 0,
      dragged = false;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      targetRot += (e.clientX - lastX) * 0.007;
      lastX = e.clientX;
      if (!dragged && hint) {
        dragged = true;
        hint.style.opacity = "0";
        hint.style.transition = "opacity .6s";
      }
    };
    const onUp = () => {
      dragging = false;
    };
    host.addEventListener("pointerdown", onDown);
    addEventListener("pointermove", onMove);
    addEventListener("pointerup", onUp);

    const fitRenderer = () => {
      const w = host.clientWidth,
        h = host.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    addEventListener("resize", fitRenderer);
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(fitRenderer)
        : null;
    ro?.observe(host);
    fitRenderer();

    const easeOutBack = (x: number) => {
      const c1 = 1.70158,
        c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    };
    let t = 0;
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const fx = 0.7;
      t += 0.016;
      if (!dragging && !reduce) targetRot += 0.0017 * fx;
      rot += (targetRot - rot) * 0.08;
      city.rotation.y = rot;
      builds.forEach((b) => {
        const p = Math.min(Math.max((t - b.userData.delay) / 1.1, 0), 1);
        const s = p === 0 ? 0.001 : easeOutBack(p);
        b.scale.y = Math.max(s, 0.001);
      });
      coins.forEach((c) => {
        c.position.y =
          c.userData.baseY + Math.sin(t * 1.3 + c.userData.ph) * 0.35 * fx;
        c.rotation.y += 0.02 * (fx + 0.2);
      });
      clouds.forEach((c, i) => {
        c.position.x += 0.004 * (i + 1) * fx;
        if (c.position.x > 16) c.position.x = -16;
      });
      if (!reduce) {
        const tAngle = t * 0.15;
        turtle.position.x = Math.cos(tAngle) * 5.5;
        turtle.position.z = Math.sin(tAngle) * 5.5;
        turtle.position.y = 6.0 + Math.sin(t * 1.1) * 0.55 * fx;
        turtle.rotation.y = -tAngle;
        turtle.rotation.z = Math.sin(t * 0.9) * 0.06 * fx;
        turtle.rotation.x = Math.sin(t * 1.1 + 1) * 0.04 * fx;
        const tPad = Math.sin(t * 2.4) * 0.5 * fx;
        tfl1.rotation.z = 0.35 + tPad * 0.55;
        tfl2.rotation.z = -0.35 - tPad * 0.55;
        tfl3.rotation.z = 0.3 - tPad * 0.4;
        tfl4.rotation.z = -0.3 + tPad * 0.4;
      }
      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointerdown", onDown);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerup", onUp);
      removeEventListener("resize", fitRenderer);
      ro?.disconnect();
      renderer.dispose();
      if (renderer.domElement.parentNode === host)
        host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div id="scene" ref={hostRef} aria-label="Kota NusaWorld 3D — tarik untuk memutar" />
      <div className="drag-hint" ref={hintRef}>
        ↻ &nbsp;Tarik untuk memutar — si Penyu mengitari kotamu!
      </div>
    </>
  );
}
