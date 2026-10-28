import React, { useEffect, useRef, useState } from 'react';
import { sounds } from '../utils/audio';

/** Count a number up when it scrolls into view — small delight, big clarity. */
function useCountUp(target, duration = 700) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      });
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [target, duration]);

  return [value, ref];
}

function ActiveAgentsCard({ theme, activeCount, maxCount }) {
  const isDark = theme === 'dark';
  const [shown, ref] = useCountUp(activeCount);

  return (
    <div
      ref={ref}
      className={`p-5 rounded-2xl border transition-colors hover:shadow-lg hover:-translate-y-0.5 duration-300 ${
        isDark ? 'bg-[#0E1A33]/80 border-[#22324F]' : 'bg-white border-[#E3E8F2] shadow-sm'
      }`}
    >
      <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
        ACTIVE AGENTS
      </p>

      <div className="flex items-baseline gap-2 mb-4">
        <span className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-[#15121F]'}`}>
          {shown}
        </span>
        <span className="text-sm font-semibold text-slate-400">/ {maxCount}</span>
        <span className="text-xs text-slate-400 ml-1">limit {maxCount}</span>
      </div>

      {/* Progress with a travelling light */}
      <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#15284A]' : 'bg-[#EEF1F7]'}`}>
        <div
          className="h-full rounded-full progress-shine transition-all duration-700"
          style={{
            width: `${(activeCount / maxCount) * 100}%`,
            background: 'linear-gradient(90deg, #1F5FD9, #38BDF8, #1F5FD9)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>
    </div>
  );
}

function RolesCoveredCard({ theme, activeRole, onSelectRole }) {
  const isDark = theme === 'dark';
  const roles = ['Observer', 'Contributor', 'Triager', 'Reviewer', 'Dispatcher', 'Merger', 'Admin Merger'];

  return (
    <div className={`p-5 rounded-2xl border transition-colors hover:shadow-lg hover:-translate-y-0.5 duration-300 ${
      isDark ? 'bg-[#0E1A33]/80 border-[#22324F]' : 'bg-white border-[#E3E8F2] shadow-sm'
    }`}>
      <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
        ROLES COVERED
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {roles.map((r) => {
          const isActive = r === activeRole;
          return (
            <button
              key={r}
              onClick={(e) => {
                sounds.playPop();
                const rect = e.currentTarget.getBoundingClientRect();
                window.dispatchEvent(new CustomEvent('ziki:burst', {
                  detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
                }));
                onSelectRole(r);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer btn-jelly ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-600/20 dark:text-blue-400 dark:border-blue-500/30 font-bold badge-shimmer'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {r}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AgentSummaryCards({
  theme,
  activeRole,
  onSelectRole,
  activeCount = 2,
  maxCount = 5
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ActiveAgentsCard theme={theme} activeCount={activeCount} maxCount={maxCount} />
      <RolesCoveredCard theme={theme} activeRole={activeRole} onSelectRole={onSelectRole} />
    </div>
  );
}
