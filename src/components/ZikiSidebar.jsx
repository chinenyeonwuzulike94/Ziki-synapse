import React from 'react';
import { 
  CheckCircle2, 
  GitPullRequest, 
  Target, 
  Award, 
  Settings, 
  Bot, 
  Users, 
  Key, 
  Sliders, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon,
  ChevronRight,
  Shield
} from 'lucide-react';
import { sounds } from '../utils/audio';

export default function ZikiSidebar({ theme, onToggleTheme, soundEnabled, onToggleSound, onOpenGuide }) {
  const isDark = theme === 'dark';

  return (
    <aside className={`w-64 flex-shrink-0 flex flex-col justify-between border-r min-h-screen p-4 transition-colors ${
      isDark ? 'bg-[#0B0F19] border-slate-800/80 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
    }`}>
      {/* Top Brand & Workspace */}
      <div className="flex flex-col gap-6">
        {/* Brand */}
        <div className="flex items-center justify-between px-2">
          <a href="https://ziki.dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 group">
            <svg width="28" height="24" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2h19l-9 12 9 13H8l9-13L8 2z" fill="#14B8A6" />
            </svg>
            <div className="flex items-center gap-1.5">
              <span className={`font-bold text-base tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                ziki
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold">
                whimsical
              </span>
            </div>
          </a>
        </div>

        {/* Workspace Selector Pill */}
        <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-white text-xs">
              Z
            </div>
            <div>
              <p className={`font-semibold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Ziki Production
              </p>
              <p className="text-[10px] text-slate-500">Enterprise Plan</p>
            </div>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">Live</span>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex flex-col gap-1 text-xs font-medium">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1">
            Workflow
          </div>
          <a href="#issues" className="flex items-center gap-2.5 px-3 py-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-slate-500/10 transition">
            <CheckCircle2 className="w-4 h-4 text-teal-500" />
            <span>Issues</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">14</span>
          </a>
          <a href="#prs" className="flex items-center gap-2.5 px-3 py-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-slate-500/10 transition">
            <GitPullRequest className="w-4 h-4 text-indigo-400" />
            <span>Pull Requests</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">6</span>
          </a>
          <a href="#goals" className="flex items-center gap-2.5 px-3 py-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-slate-500/10 transition">
            <Target className="w-4 h-4 text-amber-400" />
            <span>Goals & Bids</span>
          </a>
          <a href="#points" className="flex items-center gap-2.5 px-3 py-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-slate-500/10 transition">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Points Ledger</span>
          </a>

          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 pt-4 pb-1">
            Settings
          </div>
          <a href="#general" className="flex items-center gap-2.5 px-3 py-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-slate-500/10 transition">
            <Sliders className="w-4 h-4 text-slate-400" />
            <span>General</span>
          </a>
          <a href="#members" className="flex items-center gap-2.5 px-3 py-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-slate-500/10 transition">
            <Users className="w-4 h-4 text-slate-400" />
            <span>Team Members</span>
          </a>
          {/* ACTIVE TAB: AGENTS */}
          <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold shadow-sm border ${
            isDark 
              ? 'bg-teal-500/15 border-teal-500/30 text-teal-300' 
              : 'bg-teal-50 border-teal-300 text-teal-800'
          }`}>
            <Bot className="w-4 h-4 text-teal-400" />
            <span>Agents</span>
            <span className="ml-auto w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          </div>
          <a href="#apikeys" className="flex items-center gap-2.5 px-3 py-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-slate-500/10 transition">
            <Key className="w-4 h-4 text-slate-400" />
            <span>API Keys</span>
          </a>
        </nav>
      </div>

      {/* Bottom Profile, Guide & Controls */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
        {/* Whimsical Guide Button */}
        <button
          onClick={onOpenGuide}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-teal-500/20 via-indigo-500/20 to-teal-500/10 border border-teal-500/30 text-teal-300 hover:border-teal-400 transition"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            Whimsical Guide
          </span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        </button>

        {/* Toggles (Sound & Theme) */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
              className="p-2 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-teal-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onToggleTheme}
              title={isDark ? 'Switch to Light' : 'Switch to Dark'}
              className="p-2 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
            </button>
          </div>

          <span className="text-[10px] font-mono text-slate-500">
            v1.2.0-whimsical
          </span>
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-2.5 px-2 pt-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs">
            CO
          </div>
          <div className="flex flex-col">
            <span className={`text-xs font-semibold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Chinenye O.
            </span>
            <span className="text-[10px] text-teal-400 font-mono">Workspace Owner</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
