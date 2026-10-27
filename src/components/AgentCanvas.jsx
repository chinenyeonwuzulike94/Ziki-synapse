import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, Zap, Heart, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function AgentCanvas({
  theme = 'dark',
  agentMode = 'copilot', // 'restricted' | 'copilot' | 'autonomous'
  agentName = 'Ziki-Agent-Zero',
  taskAbsorbedCount = 0,
  onAgentPoke = () => {},
  feedingTask = null,
  onTaskEaten = () => {}
}) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    // Core position and physics
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    radius: 120,
    baseRadius: 120,
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
    happiness: 94,
    energy: '98%',
  });

  // Color profiles based on Agent Mode & Theme (Lusion iridescence adapted for light/dark)
  const getPalette = useCallback(() => {
    const isDark = theme === 'dark';
    switch (agentMode) {
      case 'restricted':
        return {
          primary: isDark ? '#818CF8' : '#6366F1', // Indigo
          secondary: isDark ? '#C084FC' : '#9333EA', // Purple
          accent: isDark ? '#38BDF8' : '#0284C7', // Sky
          glow: isDark ? 'rgba(129, 140, 248, 0.4)' : 'rgba(99, 102, 241, 0.25)',
          ribbon: isDark ? 'rgba(192, 132, 252, 0.7)' : 'rgba(126, 34, 206, 0.75)',
          speed: 0.02,
          noiseScale: 14,
        };
      case 'autonomous':
        return {
          primary: isDark ? '#F59E0B' : '#EA580C', // Amber / Orange
          secondary: isDark ? '#EC4899' : '#DB2777', // Pink
          accent: isDark ? '#EF4444' : '#DC2626', // Red
          glow: isDark ? 'rgba(245, 158, 11, 0.5)' : 'rgba(234, 88, 12, 0.3)',
          ribbon: isDark ? 'rgba(236, 72, 153, 0.8)' : 'rgba(190, 24, 93, 0.85)',
          speed: 0.06,
          noiseScale: 28,
        };
      case 'copilot':
      default:
        return {
          primary: isDark ? '#06B6D4' : '#0891B2', // Cyan
          secondary: isDark ? '#6366F1' : '#4F46E5', // Indigo
          accent: isDark ? '#10B981' : '#059669', // Emerald
          glow: isDark ? 'rgba(6, 182, 212, 0.45)' : 'rgba(8, 145, 178, 0.25)',
          ribbon: isDark ? 'rgba(99, 102, 241, 0.75)' : 'rgba(79, 70, 229, 0.8)',
          speed: 0.035,
          noiseScale: 20,
        };
    }
  }, [agentMode, theme]);

  // Handle task feeding trigger
  useEffect(() => {
    if (feedingTask) {
      const state = stateRef.current;
      state.radius = state.baseRadius * 1.45;
      sounds.playSquish();
      sounds.playVictory();

      state.ripples.push({
        r: 10,
        maxR: 260,
        alpha: 1,
        color: theme === 'dark' ? '#10B981' : '#059669',
      });

      state.floatingTexts.push({
        x: state.x,
        y: state.y - 40,
        text: `+100 XP [${feedingTask.title}]`,
        alpha: 1,
        vy: -2,
      });

      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 5;
        state.particles.push({
          x: state.x,
          y: state.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 4,
          alpha: 1,
          color: ['#06B6D4', '#F59E0B', '#10B981', '#EC4899'][Math.floor(Math.random() * 4)],
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

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      stateRef.current.targetX = rect.width / 2;
      stateRef.current.targetY = rect.height / 2;
      if (stateRef.current.x === 0) {
        stateRef.current.x = stateRef.current.targetX;
        stateRef.current.y = stateRef.current.targetY;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const isDark = theme === 'dark';
    const initialParticles = [];
    for (let i = 0; i < 45; i++) {
      initialParticles.push({
        angle: Math.random() * Math.PI * 2,
        dist: 140 + Math.random() * 120,
        speed: (0.005 + Math.random() * 0.015) * (Math.random() > 0.5 ? 1 : -1),
        yOffset: (Math.random() - 0.5) * 50,
        size: 1.5 + Math.random() * 3,
        alpha: 0.2 + Math.random() * 0.6,
        color: isDark
          ? (Math.random() > 0.5 ? '#06B6D4' : '#818CF8')
          : (Math.random() > 0.5 ? '#0891B2' : '#6366F1'),
      });
    }

    const render = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const state = stateRef.current;
      const palette = getPalette();

      ctx.clearRect(0, 0, w, h);
      state.time += palette.speed;

      // Spring physics
      if (!state.isDragging) {
        const k = 0.08;
        const damping = 0.85;
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

      // 1. WEAVESILK GENERATIVE RIBBONS
      if (state.mouseActive) {
        state.mouseHistory.unshift({ x: state.mouseX, y: state.mouseY, time: state.time });
        if (state.mouseHistory.length > 25) state.mouseHistory.pop();

        ctx.save();
        for (let r = 0; r < 4; r++) {
          ctx.beginPath();
          ctx.strokeStyle = palette.ribbon;
          ctx.lineWidth = 2.2 - r * 0.3;
          ctx.lineCap = 'round';
          ctx.shadowBlur = isDark ? 14 : 6;
          ctx.shadowColor = palette.primary;

          const startX = state.mouseX;
          const startY = state.mouseY;
          const endX = state.x;
          const endY = state.y;

          ctx.moveTo(startX, startY);

          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;
          const wavePhase = state.time * 2 + r * 1.2;
          const waveAmp = Math.sin(wavePhase) * (20 + r * 8);

          const perpX = -(endY - startY) * 0.05 * (r % 2 === 0 ? 1 : -1);
          const perpY = (endX - startX) * 0.05 * (r % 2 === 0 ? 1 : -1);

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
        const py = state.y + Math.sin(p.angle) * (p.dist * 0.45) + p.yOffset;

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
        rp.r += 4.5;
        rp.alpha *= 0.94;

        ctx.save();
        ctx.beginPath();
        ctx.arc(state.x, state.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = rp.color || palette.accent;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = rp.alpha;
        ctx.shadowBlur = isDark ? 15 : 6;
        ctx.shadowColor = rp.color || palette.accent;
        ctx.stroke();
        ctx.restore();

        if (rp.alpha < 0.02 || rp.r > rp.maxR) {
          state.ripples.splice(i, 1);
        }
      }

      // 4. LUSION LIVING FLUID AGENT CORE
      ctx.save();
      ctx.translate(state.x, state.y);
      ctx.scale(state.stretchX, state.stretchY);

      // Outer Aura Glow
      const auraGradient = ctx.createRadialGradient(0, 0, state.radius * 0.5, 0, 0, state.radius * 1.8);
      auraGradient.addColorStop(0, palette.glow);
      auraGradient.addColorStop(0.6, 'rgba(0,0,0,0)');
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(0, 0, state.radius * 1.8, 0, Math.PI * 2);
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
      ctx.shadowBlur = isDark ? 35 : 20;
      ctx.shadowColor = palette.primary;
      ctx.fill();

      // Inner Bioluminescent / Translucent Core
      const innerGlow = ctx.createRadialGradient(
        -state.radius * 0.25,
        -state.radius * 0.3,
        0,
        0,
        0,
        state.radius
      );
      innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
      innerGlow.addColorStop(0.3, 'rgba(255, 255, 255, 0.25)');
      innerGlow.addColorStop(0.8, isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)');
      innerGlow.addColorStop(1, isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = innerGlow;
      ctx.fill();

      // Dynamic Specular Highlight (eyes follow mouse)
      let lightX = -state.radius * 0.3;
      let lightY = -state.radius * 0.35;
      if (state.mouseActive) {
        const dx = (state.mouseX - state.x) * 0.15;
        const dy = (state.mouseY - state.y) * 0.15;
        lightX = Math.max(-state.radius * 0.5, Math.min(state.radius * 0.5, lightX + dx));
        lightY = Math.max(-state.radius * 0.5, Math.min(state.radius * 0.5, lightY + dy));
      }

      ctx.beginPath();
      ctx.arc(lightX, lightY, state.radius * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FFFFFF';
      ctx.fill();

      // Agent Cute Pupil / Core Heart
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
        ctx.fillStyle = isDark ? '#10B981' : '#059669';
        ctx.globalAlpha = ft.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = isDark ? '#10B981' : '#059669';
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
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const state = stateRef.current;

    const dist = Math.hypot(clickX - state.x, clickY - state.y);

    if (dist < state.radius * 1.2) {
      state.isDragging = true;
      state.dragStartX = clickX - state.x;
      state.dragStartY = clickY - state.y;
      sounds.playSquish();
    } else {
      state.ripples.push({
        r: 10,
        maxR: 180,
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
    const rect = canvasRef.current.getBoundingClientRect();
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
      state.stretchX = 1 + Math.abs(dx) * 0.015;
      state.stretchY = 1 + Math.abs(dy) * 0.015;
    }
  };

  const handleMouseUp = () => {
    const state = stateRef.current;
    if (state.isDragging) {
      state.isDragging = false;
      state.vx = (state.targetX - state.x) * 0.25;
      state.vy = (state.targetY - state.y) * 0.25;
      sounds.playChime(600);

      state.ripples.push({
        r: 15,
        maxR: 200,
        alpha: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    stateRef.current.mouseActive = false;
    handleMouseUp();
  };

  const resetAgentPosition = () => {
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
    <div className={`relative w-full h-[520px] rounded-3xl overflow-hidden glass-panel border shadow-2xl flex items-center justify-center ${
      isDark ? 'border-slate-800/80 shadow-black/40' : 'border-slate-200/90 shadow-slate-300/30'
    }`}>
      {/* Background Subtle Gradient Grid */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
      <div className={`absolute inset-0 pointer-events-none opacity-40 ${
        isDark
          ? 'bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:32px_32px]'
          : 'bg-[linear-gradient(to_right,#94a3b815_1px,transparent_1px),linear-gradient(to_bottom,#94a3b815_1px,transparent_1px)] bg-[size:32px_32px]'
      }`} />

      {/* Top Interactive HUD Bar */}
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute opacity-75" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
          </div>
          <div>
            <span className={`text-xs font-mono font-semibold tracking-wider uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {agentName}
            </span>
            <div className={`flex items-center gap-2 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span>Mode: <strong className="capitalize text-indigo-500">{agentMode}</strong></span>
              <span>•</span>
              <span>Fed: <strong className="text-emerald-500">{taskAbsorbedCount} tasks</strong></span>
            </div>
          </div>
        </div>

        {/* Quick HUD Metrics */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className={`glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>Happiness {interactiveStats.happiness}%</span>
          </div>

          <button
            onClick={resetAgentPosition}
            title="Recenter Agent"
            className={`p-1.5 rounded-full glass-pill transition ${
              isDark ? 'hover:bg-slate-700/50 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-600 hover:text-black'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Main Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Bottom Canvas Hints */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
        <div className={`glass-pill px-4 py-1.5 rounded-full text-xs flex items-center gap-3 shadow-lg ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-500" />
            Move cursor for Weavesilk ribbons
          </span>
          <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>|</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-amber-500" />
            Drag or poke to squish
          </span>
        </div>
      </div>
    </div>
  );
}
