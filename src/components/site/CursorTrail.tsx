"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { STILL, params } from "@/lib/scroll";

const SPRITES = [
  "/images/sufi-special-coffee.jpg",
  "/images/veg-burger.jpg",
  "/images/blue-ocean.jpg",
  "/images/tiramisu-dessert.jpg",
  "/images/kitkat-shake.jpg",
  "/images/grilled-cheese.jpg",
  "/images/iced-americano.jpg",
  "/images/sufi-special-dessert.jpg",
  "/images/masala-chai.jpg",
  "/images/loaded-fries.jpg",
  "/images/pina-colada.jpg",
  "/images/biscoff-shake.jpg",
];


type Sprite = { id: number; x: number; y: number; src: string; rot: number; exiting: boolean };

export function CursorTrail({ hostRef }: { hostRef: React.RefObject<HTMLElement | null> }) {
  const [sprites, setSprites] = useState<Sprite[]>([]);
  const state = useRef({ dist: 0, lx: 0, ly: 0, i: 0, id: 0, started: false, lastTouch: 0 });
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    if (params().get("trail") === "demo") setDemo(true);
  }, []);

  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || STILL()) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const touch = !window.matchMedia("(pointer:fine)").matches;
    setCoarse(touch);

    const timers: number[] = [];
    const STEP = touch ? 64 : 92;
    const MAX = touch ? 5 : 8;

    const push = (x: number, y: number) => {
      const s = state.current;
      if (!s.started) {
        s.started = true;
        s.lx = x;
        s.ly = y;
        return;
      }
      s.dist += Math.hypot(x - s.lx, y - s.ly);
      s.lx = x;
      s.ly = y;
      if (s.dist < STEP) return;
      s.dist = 0;
      const id = ++s.id;
      const src = SPRITES[s.i++ % SPRITES.length];
      setSprites((prev) =>
        [...prev, { id, x, y, src, rot: (Math.random() - 0.5) * 12, exiting: false }].slice(-MAX),
      );
      timers.push(
        window.setTimeout(
          () => setSprites((p) => p.map((sp) => (sp.id === id ? { ...sp, exiting: true } : sp))),
          720,
        ),
      );
      timers.push(
        window.setTimeout(() => setSprites((p) => p.filter((sp) => sp.id !== id)), 1200),
      );
    };

    const onMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      push(e.clientX - rect.left, e.clientY - rect.top);
    };

    const onEnd = () => {
      state.current.started = false;
      state.current.dist = 0;
      state.current.lastTouch = Date.now();
    };

    // Warm the sprite cache so cards paint instantly on first touch.
    SPRITES.forEach((src) => {
      const im = new Image();
      im.decoding = "async";
      im.src = src;
    });



    if (touch) {
      // Touch-driven only: a card pops exactly where the finger touches.
      const burst = (x: number, y: number) => {
        const rect = host.getBoundingClientRect();
        const s = state.current;
        s.lastTouch = Date.now();
        const n = s.i++;
        const px = Math.max(30, Math.min(rect.width - 30, x));
        const py = Math.max(30, Math.min(rect.height - 30, y));
        const id = ++s.id;
        const src = SPRITES[n % SPRITES.length];
        setSprites((prev) =>
          [...prev, { id, x: px, y: py, src, rot: (Math.random() - 0.5) * 14, exiting: false }].slice(-8),
        );

        timers.push(
          window.setTimeout(
            () => setSprites((p) => p.map((sp) => (sp.id === id ? { ...sp, exiting: true } : sp))),
            900,
          ),
        );
        timers.push(
          window.setTimeout(() => setSprites((p) => p.filter((sp) => sp.id !== id)), 1400),
        );
      };

      const onStart = (e: TouchEvent) => {
        const t = e.touches[0];
        if (!t) return;
        const rect = host.getBoundingClientRect();
        state.current.started = true;
        state.current.lx = t.clientX - rect.left;
        state.current.ly = t.clientY - rect.top;
        state.current.dist = 0;
        burst(state.current.lx, state.current.ly);
      };

      const onSlide = (e: TouchEvent) => {
        const t = e.touches[0];
        if (!t) return;
        const rect = host.getBoundingClientRect();
        const x = t.clientX - rect.left;
        const y = t.clientY - rect.top;
        const s = state.current;
        s.dist += Math.hypot(x - s.lx, y - s.ly);
        s.lx = x;
        s.ly = y;
        if (s.dist < 56) return;
        s.dist = 0;
        burst(x, y);
      };

      host.addEventListener("touchstart", onStart, { passive: true });
      host.addEventListener("touchmove", onSlide, { passive: true });
      host.addEventListener("touchend", onEnd);
      host.addEventListener("touchcancel", onEnd);

      return () => {
        host.removeEventListener("touchstart", onStart);
        host.removeEventListener("touchmove", onSlide);
        host.removeEventListener("touchend", onEnd);
        host.removeEventListener("touchcancel", onEnd);
        timers.forEach(window.clearTimeout);
      };
    } else {
      host.addEventListener("mousemove", onMove);
    }
    return () => {
      host.removeEventListener("mousemove", onMove);
      timers.forEach(window.clearTimeout);
    };

  }, [hostRef]);



  const list: Sprite[] = demo
    ? Array.from({ length: 7 }, (_, i) => ({
        id: i,
        x: 180 + i * 120,
        y: 90 + i * 60,
        src: SPRITES[i % SPRITES.length],
        rot: (i - 3) * 3,
        exiting: false,
      }))
    : sprites;

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {list.map((s) => (
        <motion.div
          key={s.id}
          className={coarse ? "absolute w-[min(27vw,170px)]" : "absolute w-[min(13vw,230px)]"}
          style={{ left: s.x, top: s.y }}
          initial={{ scale: 0.4, opacity: 0, x: "-50%", y: "-50%", rotate: s.rot }}
          animate={
            s.exiting
              ? { scale: 0.95, opacity: 0, x: "-50%", y: "-50%", rotate: s.rot }
              : { scale: 1, opacity: 0.94, x: "-50%", y: "-50%", rotate: s.rot }
          }
          transition={
            s.exiting
              ? { duration: 0.46, ease: "easeOut" }
              : { type: "spring", stiffness: 330, damping: 24 }
          }
        >
          <div className="photo-card aspect-[4/5]">
            <img src={s.src} alt="" className="h-full w-full object-cover" loading="eager" decoding="async" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
