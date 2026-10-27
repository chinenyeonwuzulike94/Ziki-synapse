import React, { useState } from 'react';
import { Volume2, VolumeX, BookOpen, Github, Sun, Moon } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Navbar({ theme, onToggleTheme, onOpenReferences }) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const isNowOn = sounds.toggle();
    setSoundEnabled(isNowOn);
    if (isNowOn) sounds.playPop();
  };

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 w-full glass-panel border-b px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors ${
      isDark ? 'border-slate-800/80 bg-[#12141A]/75' : 'border-slate-200/80 bg-white/80'
    }`}>
      {/* Brand & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <a href="https://ziki.dev" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
              <span className="font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">
                Z
              </span>
            </div>
          </div>
          <div>
            <span className={`font-bold text-sm tracking-tight transition-colors ${
              isDark ? 'text-white group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-indigo-600'
            }`}>
              Ziki Synapse
            </span>
            <div className={`flex items-center gap-1.5 text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span>Settings</span>
              <span>/</span>
              <span className="text-cyan-500 font-semibold">Agents</span>
            </div>
          </div>
        </a>

        <div className={`hidden md:flex items-center gap-2 pl-4 border-l text-xs ${
          isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Living Agent Core Active</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Theme Toggle (Dark / Light) */}
        <button
          onClick={() => {
            sounds.playPop();
            onToggleTheme();
          }}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
              : 'bg-slate-100 border-slate-300 text-indigo-600 hover:bg-slate-200'
          }`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span className="hidden sm:inline text-xs font-mono">
            {isDark ? 'Light' : 'Dark'}
          </span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition ${
            isDark
              ? (soundEnabled ? 'bg-slate-800 border-slate-700 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-500')
              : (soundEnabled ? 'bg-slate-100 border-slate-300 text-cyan-600' : 'bg-slate-100 border-slate-200 text-slate-400')
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden sm:inline text-xs font-mono">
            {soundEnabled ? 'Audio On' : 'Muted'}
          </span>
        </button>

        {/* References Guide Modal Button */}
        <button
          onClick={onOpenReferences}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition ${
            isDark
              ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border-indigo-500/40 text-indigo-200 hover:text-white hover:border-indigo-400'
              : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
          <span className="hidden sm:inline">Design References</span>
          <span className="sm:hidden">Info</span>
        </button>

        {/* GitHub Link */}
        <a
          href="https://github.com/chinenyeonwuzulike94/Ziki-synapse"
          target="_blank"
          rel="noreferrer"
          className={`p-2 rounded-xl glass-pill transition ${
            isDark ? 'hover:bg-slate-800 text-slate-300 hover:text-white' : 'hover:bg-slate-200 text-slate-700 hover:text-black'
          }`}
          title="View GitHub Repository"
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}
