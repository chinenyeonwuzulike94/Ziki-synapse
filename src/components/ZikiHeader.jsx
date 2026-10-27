import React, { useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, ArrowUpRight, Sparkles, BookOpen } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function ZikiHeader({ theme, onToggleTheme, onOpenModal }) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const isNowOn = sounds.toggle();
    setSoundEnabled(isNowOn);
    if (isNowOn) sounds.playPop();
  };

  const isDark = theme === 'dark';

  return (
    <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4 w-full">
      <div className={`w-full py-2.5 px-4 sm:px-6 rounded-full border flex items-center justify-between transition-colors shadow-lg ${
        isDark 
          ? 'bg-[#0E131F]/90 backdrop-blur-md border-white/10 text-white' 
          : 'bg-white/90 backdrop-blur-md border-slate-200 text-slate-900 shadow-slate-200/50'
      }`}>
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2 group">
          <svg width="28" height="24" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2h19l-9 12 9 13H8l9-13L8 2z" fill="#14B8A6" />
          </svg>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base tracking-tight">ziki</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
              whimsical
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium">
          <a href="#how-it-works" className="hover:text-teal-400 transition-colors">How it works</a>
          <a href="#whimsical-agent" className="flex items-center gap-1.5 text-teal-400 font-semibold hover:text-teal-300">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Living Agent</span>
          </a>
          <a href="#developers" className="hover:text-teal-400 transition-colors">Developers</a>
          <a href="#points" className="hover:text-teal-400 transition-colors">Points</a>
          <button 
            onClick={onOpenModal} 
            className="flex items-center gap-1 opacity-70 hover:opacity-100 hover:text-teal-400 transition-colors"
          >
            <BookOpen className="w-3 h-3" />
            <span>Guide</span>
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {/* Whimsical Sound Toggle with Animated Equalizer */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute ambient sound' : 'Unmute sound'}
            className={`p-2 rounded-full border text-xs flex items-center gap-1.5 transition ${
              isDark
                ? (soundEnabled ? 'bg-slate-800/80 border-teal-500/30 text-teal-400' : 'bg-slate-900 border-white/5 text-slate-500')
                : (soundEnabled ? 'bg-slate-100 border-teal-500/30 text-teal-600' : 'bg-slate-100 border-slate-200 text-slate-400')
            }`}
          >
            {soundEnabled ? (
              <div className="flex items-center gap-0.5 h-3 px-0.5">
                <span className="w-0.5 bg-teal-400 rounded-full eq-bar-1" />
                <span className="w-0.5 bg-teal-400 rounded-full eq-bar-2" />
                <span className="w-0.5 bg-teal-400 rounded-full eq-bar-3" />
              </div>
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              sounds.playPop();
              onToggleTheme();
            }}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-full border text-xs transition ${
              isDark
                ? 'bg-slate-800/80 border-white/10 text-amber-400 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Primary CTA */}
          <a
            href="#whimsical-agent"
            className="hidden sm:flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all shadow-md shadow-teal-500/20"
          >
            <span>Try Agent</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
