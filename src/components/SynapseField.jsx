import { useEffect, useRef } from 'react';

/**
 * SynapseField — the ambient layer that keeps the whimsy alive across the
 * WHOLE page instead of inside one box.
 *
 * - particles drift on a slow sine field (the "wave" motion)
 * - faint links form between near neighbours, like a synapse net
 * - the cursor gently pushes particles away and lights nearby links
 * - any element can emit a burst via window.dispatchEvent(new CustomEvent('ziki:burst', { detail:{ x, y } }))
 */
export default function SynapseField({ theme = 'light' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    const bursts = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const palette = theme === 'dark'
      ? { dot: 'rgba(143, 201, 255, ', link: 'rgba(143, 201, 255, ', wave: 'rgba(124, 92, 255, ' }
      : { dot: 'rgba(31, 95, 217, ', link: 'rgba(31, 95, 217, ', wave: 'rgba(124, 92, 255, ' };

    const makeParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.8 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.45,
      amp: 6 + Math.random() * 18,
      drift: 0.08 + Math.random() * 0.22,
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.round((width * height) / 22000));
      particles = Array.from({ length: count }, makeParticle);
    };

    const onMove = (e) => { pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true; };
    const onLeave = () => { pointer.active = false; pointer.x = -9999; pointer.y = -9999; };
    const onBurst = (e) => {
      const { x, y } = e.detail || {};
      if (typeof x !== 'number' || typeof y !== 'number') return;
      for (let i = 0; i < 14; i += 1) {
        const a = (Math.PI * 2 * i) / 14 + Math.random() * 0.4;
        const v = 1.6 + Math.random() * 2.4;
        bursts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, r: 1 + Math.random() * 1.8 });
      }
    };

    const drawWave = (t, offset, alpha, amp, wavelength) => {
      ctx.beginPath();
      for (let x = 0; x <= width; x += 14) {
        const y = height * offset + Math.sin(x / wavelength + t) * amp
          + Math.sin(x / (wavelength * 0.43) + t * 1.7) * (amp * 0.35);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `${palette.wave}${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const frame = (time) => {
      const t = time / 1400;
      ctx.clearRect(0, 0, width, height);

      // slow travelling waves behind everything
      drawWave(t, 0.24, theme === 'dark' ? 0.1 : 0.07, 22, 320);
      drawWave(t * 0.8 + 1.6, 0.62, theme === 'dark' ? 0.08 : 0.05, 30, 420);
      drawWave(t * 1.2 + 3.1, 0.88, theme === 'dark' ? 0.07 : 0.045, 18, 260);

      for (const p of particles) {
        p.x += p.drift;
        if (p.x > width + 20) { p.x = -20; p.y = Math.random() * height; }
        const waveY = p.y + Math.sin(t * p.speed * 2 + p.phase) * p.amp;

        let px = p.x;
        let py = waveY;
        if (pointer.active) {
          const dx = px - pointer.x;
          const dy = py - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 26000 && d2 > 1) {
            const d = Math.sqrt(d2);
            const push = (1 - d / 161) * 16;
            px += (dx / d) * push;
            py += (dy / d) * push;
          }
        }
        p._x = px;
        p._y = py;
      }

      // synapse links
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a._x - b._x;
          const dy = a._y - b._y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 15000) {
            const alpha = (1 - d2 / 15000) * (theme === 'dark' ? 0.16 : 0.1);
            ctx.strokeStyle = `${palette.link}${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a._x, a._y);
            ctx.lineTo(b._x, b._y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p._x, p._y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${palette.dot}${theme === 'dark' ? 0.5 : 0.35})`;
        ctx.fill();
      }

      for (let i = bursts.length - 1; i >= 0; i -= 1) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vy += 0.05;
        b.life -= 0.022;
        if (b.life <= 0) { bursts.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * b.life, 0, Math.PI * 2);
        ctx.fillStyle = `${palette.dot}${b.life * 0.8})`;
        ctx.fill();
      }

      raf = window.requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('ziki:burst', onBurst);

    if (reduced) {
      // draw one calm static frame, no animation loop
      frame(0);
      window.cancelAnimationFrame(raf);
      raf = 0;
    } else {
      raf = window.requestAnimationFrame(frame);
    }

    const onVisibility = () => {
      if (document.hidden && raf) { window.cancelAnimationFrame(raf); raf = 0; }
      else if (!document.hidden && !raf && !reduced) { raf = window.requestAnimationFrame(frame); }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('ziki:burst', onBurst);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}

/** Fire a particle burst from a UI element's live position. */
export function burstFrom(el, detailY) {
  if (!el || typeof window === 'undefined') return;
  const r = el.getBoundingClientRect();
  window.dispatchEvent(new CustomEvent('ziki:burst', {
    detail: { x: r.left + r.width / 2, y: typeof detailY === 'number' ? detailY : r.top + r.height / 2 },
  }));
}
