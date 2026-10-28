import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, Zap, Heart, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function AgentCanvas({
  theme = 'light',
  agentMode = 'copilot', // 'restricted' | 'copilot' | 'autonomous'
  agentName = 'Chinenye (Antigravity)',
  taskAbsorbedCount = 14,
  onAgentPoke = () => {},
  feedingTask = null,
  onTaskEaten = () => {}
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const stateRef = useRef({
    // Core position and physics
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    radius: 95,
    baseRadius: 95,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    // Squash & stretch deformation
    stretchX: 1,
    stretchY: 1,
    // Mouse tracking for Weavesilk ribbon
    mouseX: 0,
    mouseY: 0,
    mouseActive: false,
    mouseHistory: [],
    // Ripple shockwaves
    ripples: [],
    // Particles
    particles: [],
    // Sparks & floating XP numbers
    floatingTexts: [],
    // Time
    time: 0,
  });

  const [interactiveStats, setInteractiveStats] = useState({
    pokes: 0,
    happiness: 96,
  });

  // Color profiles based on Agent Mode & Theme (Lusion iridescence)
  const getPalette = useCallback(() => {
    const isDark = theme === 'dark';
    switch (agentMode) {
      case 'restricted':
        return {
          primary: isDark ? '#818CF8' : '#6366F1',
          secondary: isDark ? '#C084FC' : '#9333EA',
          accent: isDark ? '#38BDF8' : '#0284C7',
          glow: isDark ? 'rgba(129, 140, 248, 0.45)' : 'rgba(99, 102, 241, 0.3)',
          ribbon: isDark ? 'rgba(192, 132, 252, 0.75)' : 'rgba(99, 102, 241, 0.8)',
          speed: 0.02,
          noiseScale: 14,
        };
      case 'autonomous':
        return {
          primary: isDark ? '#F59E0B' : '#EA580C',
          secondary: isDark ? '#EC4899' : '#DB2777',
          accent: isDark ? '#EF4444' : '#DC2626',
          glow: isDark ? 'rgba(245, 158, 11, 0.5)' : 'rgba(234, 88, 12, 0.35)',
          ribbon: isDark ? 'rgba(236, 72, 153, 0.85)' : 'rgba(219, 39, 119, 0.85)',
          speed: 0.06,
          noiseScale: 28,
        };
      case 'copilot':
      default:
        return {
          primary: isDark ? '#38BDF8' : '#2563EB', // Blue
          secondary: isDark ? '#818CF8' : '#4F46E5', // Indigo
          accent: isDark ? '#34D399' : '#059669', // Emerald
          glow: isDark ? 'rgba(56, 189, 248, 0.45)' : 'rgba(37, 99, 235, 0.25)',
          ribbon: isDark ? 'rgba(56, 189, 248, 0.8)' : 'rgba(37, 99, 235, 0.85)',
          speed: 0.035,
          noiseScale: 18,
        };
    }
  }, [agentMode, theme]);

  // Handle task feeding trigger
  useEffect(() => {
    if (feedingTask) {
      const state = stateRef.current;
      state.radius = state.baseRadius * 1.5;
      sounds.playSquish();
      sounds.playVictory();

      state.ripples.push({
        r: 10,
        maxR: 300,
        alpha: 1,
        color: theme === 'dark' ? '#34D399' : '#059669',
      });

      state.floatingTexts.push({
        x: state.x,
        y: state.y - 50,
        text: `+100 XP [${feedingTask.title}]`,
        alpha: 1,
        vy: -2,
      });

      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 6;
        state.particles.push({
          x: state.x,
          y: state.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2.5 + Math.random() * 4,
          alpha: 1,
          color: ['#2563EB', '#38BDF8', '#10B981', '#EC4899'][Math.floor(Math.random() * 4)],
          life: 1,
        });
      }

      setInteractiveStats((prev) => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 5),
      }));

      onTaskEaten();
    }
  }, [feedingTask, onTaskEaten, theme]);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Default agent rest position: on the right side if desktop, center if mobile
      const defaultX = rect.width > 900 ? rect.width * 0.78 : rect.width * 0.5;
      const defaultY = rect.height * 0.48;

      stateRef.current.targetX = defaultX;
      stateRef.current.targetY = defaultY;
      if (stateRef.current.x === 0) {
        stateRef.current.x = defaultX;
        stateRef.current.y = defaultY;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const isDark = theme === 'dark';
    const initialParticles = [];
    for (let i = 0; i < 40; i++) {
      initialParticles.push({
        angle: Math.random() * Math.PI * 2,
        dist: 120 + Math.random() * 110,
        speed: (0.006 + Math.random() * 0.012) * (Math.random() > 0.5 ? 1 : -1),
        yOffset: (Math.random() - 0.5) * 40,
        size: 1.5 + Math.random() * 3,
        alpha: 0.25 + Math.random() * 0.6,
        color: isDark
          ? (Math.random() > 0.5 ? '#38BDF8' : '#818CF8')
          : (Math.random() > 0.5 ? '#2563EB' : '#6366F1'),
      });
    }

    const render = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const state = stateRef.current;
      const palette = getPalette();

      ctx.clearRect(0, 0, w, h);
      state.time += palette.speed;

      // Spring physics (Free movement without clipping!)
      if (!state.isDragging) {
        const k = 0.06;
        const damping = 0.86;
        const ax = (state.targetX - state.x) * k;
        const ay = (state.targetY - state.y) * k;
        state.vx = (state.vx + ax) * damping;
        state.vy = (state.vy + ay) * damping;
        state.x += state.vx;
        state.y += state.vy;

        state.radius += (state.baseRadius - state.radius) * 0.08;
        state.stretchX += (1 - state.stretchX) * 0.1;
        state.stretchY += (1 - state.stretchY) * 0.1;
      }

      // 1. WEAVESILK GENERATIVE RIBBONS (Extends freely across text and whole section!)
      if (state.mouseActive) {
        state.mouseHistory.unshift({ x: state.mouseX, y: state.mouseY, time: state.time });
        if (state.mouseHistory.length > 25) state.mouseHistory.pop();

        ctx.save();
        for (let r = 0; r < 4; r++) {
          ctx.beginPath();
          ctx.strokeStyle = palette.ribbon;
          ctx.lineWidth = 2.2 - r * 0.35;
          ctx.lineCap = 'round';
          ctx.shadowBlur = isDark ? 16 : 8;
          ctx.shadowColor = palette.primary;

          const startX = state.mouseX;
          const startY = state.mouseY;
          const endX = state.x;
          const endY = state.y;

          ctx.moveTo(startX, startY);

          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;
          const wavePhase = state.time * 2 + r * 1.3;
          const waveAmp = Math.sin(wavePhase) * (25 + r * 10);

          const perpX = -(endY - startY) * 0.06 * (r % 2 === 0 ? 1 : -1);
          const perpY = (endX - startX) * 0.06 * (r % 2 === 0 ? 1 : -1);

          ctx.quadraticCurveTo(
            midX + perpX + waveAmp,
            midY + perpY + waveAmp,
            endX,
            endY
          );
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. ORBITING PARTICLES
      initialParticles.forEach((p) => {
        p.angle += p.speed;
        const px = state.x + Math.cos(p.angle) * p.dist;
        const py = state.y + Math.sin(p.angle) * (p.dist * 0.42) + p.yOffset;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.6 + Math.sin(state.time * 3 + p.angle) * 0.4);
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      // 3. RIPPLES & SHOCKWAVES
      for (let i = state.ripples.length - 1; i >= 0; i--) {
        const rp = state.ripples[i];
        rp.r += 5;
        rp.alpha *= 0.94;

        ctx.save();
        ctx.beginPath();
        ctx.arc(state.x, state.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = rp.color || palette.accent;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = rp.alpha;
        ctx.shadowBlur = isDark ? 16 : 8;
        ctx.shadowColor = rp.color || palette.accent;
        ctx.stroke();
        ctx.restore();

        if (rp.alpha < 0.02 || rp.r > rp.maxR) {
          state.ripples.splice(i, 1);
        }
      }

      // 4. LUSION LIVING FLUID AGENT CORE (Freely movable everywhere!)
      ctx.save();
      ctx.translate(state.x, state.y);
      ctx.scale(state.stretchX, state.stretchY);

      // Outer Aura Glow
      const auraGradient = ctx.createRadialGradient(0, 0, state.radius * 0.5, 0, 0, state.radius * 1.9);
      auraGradient.addColorStop(0, palette.glow);
      auraGradient.addColorStop(0.65, 'rgba(0,0,0,0)');
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(0, 0, state.radius * 1.9, 0, Math.PI * 2);
      ctx.fill();

      // Fluid Organic Blob Path
      const numPoints = 64;
      ctx.beginPath();
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const noise1 = Math.sin(angle * 3 + state.time * 2) * palette.noiseScale;
        const noise2 = Math.cos(angle * 5 - state.time * 1.5) * (palette.noiseScale * 0.6);
        const noise3 = Math.sin(angle * 7 + state.time * 3) * (palette.noiseScale * 0.25);
        const currentR = state.radius + noise1 + noise2 + noise3;

        const bx = Math.cos(angle) * currentR;
        const by = Math.sin(angle) * currentR;

        if (i === 0) ctx.moveTo(bx, by);
        else ctx.lineTo(bx, by);
      }
      ctx.closePath();

      // Liquid Gradient Fill
      const coreGradient = ctx.createLinearGradient(
        -state.radius,
        -state.radius,
        state.radius * 1.2,
        state.radius * 1.2
      );
      coreGradient.addColorStop(0, palette.primary);
      coreGradient.addColorStop(0.5, palette.secondary);
      coreGradient.addColorStop(1, palette.accent);

      ctx.fillStyle = coreGradient;
      ctx.shadowBlur = isDark ? 35 : 22;
      ctx.shadowColor = palette.primary;
      ctx.fill();

      // Inner Translucent Core
      const innerGlow = ctx.createRadialGradient(
        -state.radius * 0.25,
        -state.radius * 0.3,
        0,
        0,
        0,
        state.radius
      );
      innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      innerGlow.addColorStop(0.3, 'rgba(255, 255, 255, 0.25)');
      innerGlow.addColorStop(0.8, isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.12)');
      innerGlow.addColorStop(1, isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.35)');
      ctx.fillStyle = innerGlow;
      ctx.fill();

      // Dynamic Specular Highlight (Eyes follow mouse freely across whole page!)
      let lightX = -state.radius * 0.3;
      let lightY = -state.radius * 0.35;
      if (state.mouseActive) {
        const dx = (state.mouseX - state.x) * 0.12;
        const dy = (state.mouseY - state.y) * 0.12;
        lightX = Math.max(-state.radius * 0.5, Math.min(state.radius * 0.5, lightX + dx));
        lightY = Math.max(-state.radius * 0.5, Math.min(state.radius * 0.5, lightY + dy));
      }

      ctx.beginPath();
      ctx.arc(lightX, lightY, state.radius * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FFFFFF';
      ctx.fill();

      // Agent Cute Pupil
      ctx.beginPath();
      ctx.arc(lightX * 0.6, lightY * 0.6, state.radius * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();

      // 5. CELEBRATION SPARKS & FLOATING XP
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const pt = state.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.08;
        pt.alpha *= 0.96;

        ctx.save();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.shadowColor = pt.color;
        ctx.fill();
        ctx.restore();

        if (pt.alpha < 0.02) state.particles.splice(i, 1);
      }

      for (let i = state.floatingTexts.length - 1; i >= 0; i--) {
        const ft = state.floatingTexts[i];
        ft.y += ft.vy;
        ft.alpha *= 0.97;

        ctx.save();
        ctx.font = 'bold 14px "JetBrains Mono", monospace';
        ctx.fillStyle = isDark ? '#34D399' : '#059669';
        ctx.globalAlpha = ft.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = isDark ? '#34D399' : '#059669';
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();

        if (ft.alpha < 0.02) state.floatingTexts.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [getPalette, theme]);

  const handleMouseDown = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const state = stateRef.current;

    const dist = Math.hypot(clickX - state.x, clickY - state.y);

    if (dist < state.radius * 1.3) {
      state.isDragging = true;
      state.dragStartX = clickX - state.x;
      state.dragStartY = clickY - state.y;
      sounds.playSquish();
    } else {
      state.ripples.push({
        r: 10,
        maxR: 200,
        alpha: 0.9,
      });
      sounds.playPop();
    }

    setInteractiveStats((prev) => ({
      ...prev,
      pokes: prev.pokes + 1,
    }));
    onAgentPoke();
  };

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const state = stateRef.current;

    state.mouseX = mx;
    state.mouseY = my;
    state.mouseActive = true;

    if (state.isDragging) {
      const prevX = state.x;
      const prevY = state.y;
      state.x = mx - state.dragStartX;
      state.y = my - state.dragStartY;

      const dx = state.x - prevX;
      const dy = state.y - prevY;
      state.stretchX = 1 + Math.abs(dx) * 0.012;
      state.stretchY = 1 + Math.abs(dy) * 0.012;
    }
  };

  const handleMouseUp = () => {
    const state = stateRef.current;
    if (state.isDragging) {
      state.isDragging = false;
      // Spring bounce back to target
      state.vx = (state.targetX - state.x) * 0.22;
      state.vy = (state.targetY - state.y) * 0.22;
      sounds.playChime(600);

      state.ripples.push({
        r: 15,
        maxR: 220,
        alpha: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    stateRef.current.mouseActive = false;
    handleMouseUp();
  };

  const recenterAgent = () => {
    const state = stateRef.current;
    state.x = state.targetX;
    state.y = state.targetY;
    state.vx = 0;
    state.vy = 0;
    state.radius = state.baseRadius;
    sounds.playChime(500);
  };

  const isDark = theme === 'dark';

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
      style={{ zIndex: 10 }}
    >
      {/* NO SQUARE, NO RESTRICTIVE BORDER, NO CLIPPING! */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />

      {/* Subtle Recenter Button in corner */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          recenterAgent();
        }}
        title="Recenter Agent"
        className={`absolute top-4 right-4 p-2 rounded-full border transition active:scale-95 shadow-sm ${
          isDark 
            ? 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white' 
            : 'bg-white/80 border-slate-200 text-slate-600 hover:text-black'
        }`}
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
