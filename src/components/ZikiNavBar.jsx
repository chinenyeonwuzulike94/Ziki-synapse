import React from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Bell, 
  ChevronDown, 
  Sparkles, 
  Bot, 
  Trophy, 
  Compass, 
  Megaphone, 
  ShieldCheck 
} from 'lucide-react';
import { sounds } from '../utils/audio';

export default function ZikiNavBar({ 
  theme, 
  onToggleTheme, 
  soundEnabled, 
  onToggleSound, 
  onOpenGuide 
}) {
  const isDark = theme === 'dark';

  return (
    <header className={`w-full border-b px-4 sm:px-8 py-2.5 flex items-center justify-between transition-colors sticky top-0 z-40 ${
      isDark ? 'bg-[#0B0F19] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
    }`}>
      {/* Left: Brand & Navigation from Screenshot 1 */}
      <div className="flex items-center gap-6">
        {/* Brand: Ziki-whimsical */}
        <a href="https://ziki.dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 group">
          <svg width="26" height="22" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2h19l-9 12 9 13H8l9-13L8 2z" fill="#2563EB" />
          </svg>
          <div className="flex items-center gap-1.5">
            <span className={`font-bold text-base tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ziki-whimsical
            </span>
          </div>
        </a>

        {/* Workspace Dropdown: Zedu ∨ */}
        <div className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer hover:opacity-80">
          <span>Zedu</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </div>

        {/* Header Links with Icons from Screenshot 1 */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer">
            <Compass className="w-3.5 h-3.5" />
            <span>Product</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Marketing</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Security</span>
          </span>
        </nav>
      </div>

      {/* Right Actions from Screenshot 1 */}
      <div className="flex items-center gap-3">
        {/* Whimsical Spec Guide Button */}
        <button
          onClick={onOpenGuide}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>Whimsical Guide</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          className={`p-2 rounded-full border text-xs transition ${
            isDark 
              ? (soundEnabled ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-slate-900 border-slate-800 text-slate-500')
              : (soundEnabled ? 'bg-slate-100 border-slate-300 text-blue-600' : 'bg-slate-100 border-slate-200 text-slate-400')
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* PROMINENT Light & Dark Mode Toggle Switch */}
        <button
          onClick={() => {
            sounds.playPop();
            onToggleTheme();
          }}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className={`px-3 py-1.5 rounded-full border text-xs flex items-center gap-1.5 font-semibold transition cursor-pointer shadow-sm ${
            isDark 
              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
              : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
          }`}
        >
          {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {/* Agents Dropdown Pill */}
        <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <Bot className="w-3.5 h-3.5 text-blue-500" />
          <span>Agents</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </div>

        {/* User Pill: C Chinenye Onwuzulike ∨ */}
        <div className={`flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border text-xs font-semibold cursor-pointer ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}>
          <div className="w-6 h-6 rounded-full bg-[#C026D3] text-white flex items-center justify-center font-bold text-xs">
            C
          </div>
          <span className="hidden sm:inline">Chinenye Onwuzulike</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </div>

        {/* Points Badge: 🏆 2056.4 pts */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">
          <Trophy className="w-3.5 h-3.5" />
          <span>2056.4 pts</span>
        </div>

        {/* Notification Bell with Badge 2 */}
        <div className="relative p-1.5 cursor-pointer text-slate-600 dark:text-slate-400 hover:text-blue-500">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
            2
          </span>
        </div>
      </div>
    </header>
  );
}
