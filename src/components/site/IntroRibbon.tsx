"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RIBBON_FREEZE, SLOW } from "@/lib/scroll";

// Single continuous bezier ribbon shaped like a folded satin ribbon: enters
// from the left, sweeps right, curls back to the left, then exits right.
const D =
  "M-120 240 C280 190 760 200 1080 330 C1360 445 1310 640 960 700 C620 758 330 730 240 830 C170 910 420 980 1740 1010";

const EASE: [number, number, number, number] = [0.3, 0.25, 0.25, 1];

// Length of the visible travelling ribbon segment (pathLength = 1).
const SEG = 0.34;

const FREEZE: Record<string, { offset: number; width: number }> = {
  cover: { offset: -0.07, width: 90 },
  full: { offset: -0.4, width: 90 },
  exit: { offset: -0.8, width: 90 },
};

export function IntroRibbon({
  onDone,
  color = "#006241",
}: {
  onDone: () => void;
  color?: string;
}) {
  const freeze = RIBBON_FREEZE();
  const slow = SLOW();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (freeze) {
      setReady(true);
      return;
    }
    let raf1 = 0;
    let raf2 = 0;
    let cancelled = false;
    const go = () => {
      if (cancelled) return;
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => !cancelled && setReady(true));
      });
    };
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) {
      fonts.ready.then(go).catch(go);
      window.setTimeout(go, 150);
    } else {
      go();
    }
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [freeze]);

  useEffect(() => {
    if (freeze) return;
    const safety = window.setTimeout(onDone, slow ? 10000 : 2200);
    return () => {
      window.clearTimeout(safety);
    };
  }, [freeze, slow, onDone]);

  const frozen = freeze ? FREEZE[freeze] : null;
  const dur = slow ? 9 : 1.6;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] overflow-hidden"
      style={{ width: "100vw", height: "100vh" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1600 1160"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {frozen ? (
          <path
            d={D}
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeWidth={frozen.width}
            strokeDashoffset={frozen.offset}
          />
        ) : (
          <motion.path
            d={D}
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            /* a single travelling segment: head draws in, tail follows out */
            strokeDasharray={`${SEG} 1`}
            strokeWidth={90}
            shapeRendering="optimizeSpeed"
            initial={{ strokeDashoffset: SEG }}
            animate={{ strokeDashoffset: ready ? -1 : SEG }}
            transition={ready ? { duration: dur, ease: EASE } : { duration: 0 }}
            onAnimationComplete={() => ready && onDone()}
          />
        )}
      </svg>
    </div>
  );
}
