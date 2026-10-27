import React from 'react';
import { Search, Plus, Sparkles, Bell, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function ZikiTopNav({ theme, onOpenGuide }) {
  const isDark = theme === 'dark';

  return (
    <header className={`h-16 border-b px-6 flex items-center justify-between transition-colors ${
      isDark ? 'bg-[#0B0F19]/90 border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-500 hover:text-slate-400">Settings</span>
        <span className="text-slate-600">/</span>
        <span className="font-semibold text-teal-400 font-mono">Agents & Autonomy</span>
        <span className="text-slate-600">/</span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20">
          https://ziki.dev/settings/agents
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs w-64 ${
          isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search agents or models..."
            className="bg-transparent border-none focus:outline-none w-full text-xs"
          />
        </div>

        {/* Whimsical Guide Button */}
        <button
          onClick={onOpenGuide}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:border-indigo-400 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden md:inline">Whimsical Design Specs</span>
          <span className="md:hidden">Specs</span>
        </button>

        {/* Register Agent CTA */}
        <button
          onClick={() => sounds.playPop()}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 transition shadow-md shadow-teal-500/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Agent</span>
        </button>
      </div>
    </header>
  );
}
