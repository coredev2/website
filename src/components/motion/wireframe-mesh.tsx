"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { usePrefersReducedMotion, useIsCoarsePointer } from "@/lib/prefers-reduced-motion";

/**
 * An undulating wireframe terrain, built from explicit horizontal/vertical
 * line segments (not a triangulated PlaneGeometry -> WireframeGeometry,
 * which would add diagonal lines we don't want). Vertex Y is displaced each
 * frame with layered sine waves for the "rolling terrain" look.
 *
 * `three` is imported at runtime inside the effect (not at module scope) —
 * a plain top-level `import * as THREE from "three"` was found to make
 * Next/Turbopack's SSR of this route permanently bake in the route's
 * loading.tsx fallback instead of the real content (reproducible even with
 * a trivial no-op use of the import, and even in a static-export build).
 * A runtime `import()` keeps `three` out of anything the server needs to
 * reference, sidestepping that bug entirely; `import type` above keeps
 * TypeScript types without pulling in the runtime module.
 */
export function WireframeMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const coarsePointer = useIsCoarsePointer();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      if (cancelled || !container) return;

      const segments = coarsePointer ? 16 : 28;
      const size = 26;
      const step = size / segments;
      const rowsColor = new THREE.Color("#1d5fe0");
      const colsColor = new THREE.Color("#38bdf8");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.set(0, 3.4, 7.5);
      camera.rotation.x = -0.55;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarsePointer ? 1.5 : 2));
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      group.position.set(0, -1.2, -4);
      scene.add(group);

      const rowLines: THREE.Line[] = [];
      const colLines: THREE.Line[] = [];

      for (let row = 0; row <= segments; row++) {
        const positions = new Float32Array((segments + 1) * 3);
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const material = new THREE.LineBasicMaterial({
          color: rowsColor,
          transparent: true,
          opacity: 0.35,
        });
        rowLines.push(new THREE.Line(geometry, material));
      }

      for (let col = 0; col <= segments; col++) {
        const positions = new Float32Array((segments + 1) * 3);
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const material = new THREE.LineBasicMaterial({
          color: colsColor,
          transparent: true,
          opacity: 0.22,
        });
        colLines.push(new THREE.Line(geometry, material));
      }

      [...rowLines, ...colLines].forEach((line) => group.add(line));

      function heightAt(x: number, z: number, t: number) {
        return (
          Math.sin(x * 0.5 + t) * 0.5 +
          Math.cos(z * 0.4 + t * 0.7) * 0.4 +
          Math.sin((x + z) * 0.25 + t * 0.5) * 0.3
        );
      }

      function updateGeometry(t: number) {
        for (let row = 0; row <= segments; row++) {
          const z = row * step;
          const positions = rowLines[row].geometry.attributes.position;
          for (let col = 0; col <= segments; col++) {
            const x = col * step - size / 2;
            positions.setXYZ(col, x, heightAt(x, z, t), -z);
          }
          positions.needsUpdate = true;
        }

        for (let col = 0; col <= segments; col++) {
          const x = col * step - size / 2;
          const positions = colLines[col].geometry.attributes.position;
          for (let row = 0; row <= segments; row++) {
            const z = row * step;
            positions.setXYZ(row, x, heightAt(x, z, t), -z);
          }
          positions.needsUpdate = true;
        }
      }

      function resize() {
        const { clientWidth, clientHeight } = container!;
        if (!clientWidth || !clientHeight) return;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
      }

      resize();
      updateGeometry(0);
      renderer.render(scene, camera);

      window.addEventListener("resize", resize);

      let frame = 0;
      if (!reducedMotion) {
        const start = performance.now();
        const tick = () => {
          const elapsed = (performance.now() - start) / 1000;
          updateGeometry(elapsed * 0.4);
          renderer.render(scene, camera);
          frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      }

      cleanup = () => {
        if (frame) cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        [...rowLines, ...colLines].forEach((line) => {
          line.geometry.dispose();
          (line.material as THREE.Material).dispose();
        });
        renderer.dispose();
        container.removeChild(renderer.domElement);
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reducedMotion, coarsePointer]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full"
    />
  );
}
