import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export const params = () =>
  typeof window === "undefined" ? new URLSearchParams() : new URLSearchParams(window.location.search);

export const STILL = () => params().has("still");
export const NOINTRO = () => params().has("nointro") || params().has("still");
export const SLOW = () => params().has("slow");
export const RIBBON_FREEZE = () => params().get("ribbon");

/** One fresh Lenis instance per page. */
export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, [enabled]);
}

export const getScroll = () =>
  typeof window === "undefined" ? 0 : (window.__lenis?.scroll ?? window.scrollY);

export function scrollToY(y: number) {
  if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -12, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

/** Lenis smooth mode does not emit native window scroll — subscribe to both. */
export function onLenisScroll(fn: () => void) {
  let attached = false;
  let timer = 0;
  const attach = () => {
    if (window.__lenis && !attached) {
      window.__lenis.on("scroll", fn);
      attached = true;
    }
    if (!attached) timer = window.setTimeout(attach, 120);
  };
  attach();
  window.addEventListener("scroll", fn, { passive: true });
  fn();
  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("scroll", fn);
    if (attached) window.__lenis?.off("scroll", fn);
  };
}
