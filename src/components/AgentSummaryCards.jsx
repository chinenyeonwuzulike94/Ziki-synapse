import React from 'react';
import { sounds } from '../utils/audio';

export default function AgentSummaryCards({ 
  theme, 
  activeRole, 
  onSelectRole,
  activeCount = 2,
  maxCount = 5 
}) {
  const isDark = theme === 'dark';

  const roles = [
    'Observer',
    'Contributor',
    'Triager',
    'Reviewer',
    'Dispatcher',
    'Merger',
    'Admin Merger',
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {/* 1. ACTIVE AGENTS CARD from Screenshot 1 */}
      <div className={`p-5 rounded-2xl border transition-colors ${
        isDark ? 'bg-[#101726]/70 border-slate-800' : 'bg-white border-slate-200/90 shadow-sm'
      }`}>
        <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
          ACTIVE AGENTS
        </p>

        <div className="flex items-baseline gap-2 mb-4">
          <span className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {activeCount}
          </span>
          <span className="text-sm font-semibold text-slate-400">
            / {maxCount}
          </span>
          <span className="text-xs text-slate-400 ml-1">
            limit {maxCount}
          </span>
        </div>

        {/* Progress Bar (40% width blue line) */}
        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-500" 
            style={{ width: `${(activeCount / maxCount) * 100}%` }}
          />
        </div>
      </div>

      {/* 2. ROLES COVERED CARD from Screenshot 1 */}
      <div className={`p-5 rounded-2xl border transition-colors ${
        isDark ? 'bg-[#101726]/70 border-slate-800' : 'bg-white border-slate-200/90 shadow-sm'
      }`}>
        <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
          ROLES COVERED
        </p>

        {/* Role Pills List from Screenshot 1 */}
        <div className="flex flex-wrap items-center gap-2">
          {roles.map((r) => {
            const isReviewer = r === activeRole;
            return (
              <button
                key={r}
                onClick={() => {
                  sounds.playPop();
                  onSelectRole(r);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                  isReviewer
                    ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-600/20 dark:text-blue-400 dark:border-blue-500/30 font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
