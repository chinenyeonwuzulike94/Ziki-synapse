import React from 'react';
import { 
  Plus, 
  Activity, 
  FileText, 
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
  ChevronRight
} from 'lucide-react';
import { sounds } from '../utils/audio';

export default function ZikiSidebar({ 
  theme, 
  onToggleTheme, 
  soundEnabled, 
  onToggleSound, 
  onOpenGuide,
  onCreateAgent,
  onOpenActivity,
  onOpenAuditLog
}) {
  const isDark = theme === 'dark';

  return (
    <aside className={`w-64 flex-shrink-0 flex flex-col justify-between border-r min-h-screen p-4 transition-colors hidden md:flex ${
      isDark ? 'bg-[#0B0F19] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
    }`}>
      {/* Top Brand & Actions */}
      <div className="flex flex-col gap-5">
        {/* Brand */}
        <div className="flex items-center justify-between px-2">
          <a href="https://ziki.dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 group">
            <svg width="26" height="22" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2h19l-9 12 9 13H8l9-13L8 2z" fill="#2563EB" />
            </svg>
            <span className={`font-bold text-base tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ziki-whimsical
            </span>
          </a>
        </div>

        {/* PRIMARY ACTION BUTTONS IN THE SIDEBAR (As requested!) */}
        <div className="flex flex-col gap-2 pt-1 pb-3 border-b border-slate-800/60">
          {/* Create Agent Button */}
          <button
            onClick={() => {
              sounds.playPop();
              onCreateAgent();
            }}
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Agent</span>
          </button>

          {/* Activity & Approvals Button */}
          <button
            onClick={() => {
              sounds.playPop();
              onOpenActivity();
            }}
            className={`w-full py-2 px-3 rounded-xl font-semibold text-xs border transition active:scale-95 flex items-center gap-2 cursor-pointer ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800' 
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-blue-500" />
            <span>Activity & Approvals</span>
          </button>

          {/* Agent Audit Log Button */}
          <button
            onClick={() => {
              sounds.playPop();
              onOpenAuditLog();
            }}
            className={`w-full py-2 px-3 rounded-xl font-semibold text-xs border transition active:scale-95 flex items-center gap-2 cursor-pointer ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800' 
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            <span>Agent Audit Log</span>
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex flex-col gap-1 text-xs font-medium">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1">
            Workspace
          </div>
          <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold border ${
            isDark ? 'bg-blue-600/15 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}>
            <Bot className="w-4 h-4 text-blue-500" />
            <span>My Agents</span>
            <span className="ml-auto w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          </div>

          <a href="#issues" className="flex items-center gap-2.5 px-3 py-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-slate-500/10 transition">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
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
            <span>Goals</span>
          </a>
          <a href="#points" className="flex items-center gap-2.5 px-3 py-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-slate-500/10 transition">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Points Ledger</span>
          </a>
        </nav>
      </div>

      {/* Bottom Profile, Guide & Toggles */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
        {/* Whimsical Guide Button */}
        <button
          onClick={onOpenGuide}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 border border-blue-500/30 text-blue-500 hover:border-blue-400 transition"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            Whimsical Guide
          </span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        </button>

        {/* Toggles */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
              className="p-2 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-blue-500" /> : <VolumeX className="w-3.5 h-3.5" />}
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
            v1.2.0
          </span>
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 px-2 pt-1">
          <div className="w-8 h-8 rounded-full bg-[#C026D3] flex items-center justify-center font-bold text-white text-xs">
            C
          </div>
          <div className="flex flex-col">
            <span className={`text-xs font-semibold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Chinenye O.
            </span>
            <span className="text-[10px] text-blue-500 font-mono">Workspace Owner</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
