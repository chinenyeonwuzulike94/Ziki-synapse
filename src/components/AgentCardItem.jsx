import React, { useState } from 'react';
import {
  ChevronDown,
  Copy,
  Check,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { sounds } from '../utils/audio';

export default function AgentCardItem({
  theme,
  agent,
  onCopyKey,
  onRegenerateKey,
  onRevokeKey,
  onDeleteAgent
}) {
  const [copied, setCopied] = useState(false);
  const [selectedRole, setSelectedRole] = useState(agent.role || 'Reviewer');
  const [selectedScope, setSelectedScope] = useState(agent.scope || 'Ziki');
  const [showPreferredAreas, setShowPreferredAreas] = useState(false);

  const isDark = theme === 'dark';

  const initials = (agent.name || 'A')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const handleCopy = (e) => {
    sounds.playPop();
    navigator.clipboard?.writeText(agent.fullKey || agent.key);
    setCopied(true);
    onCopyKey(agent.name, e);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`group rounded-2xl border transition-all duration-300 mb-0 overflow-hidden spot-hover ${
      isDark
        ? 'bg-[#0E1A33]/90 border-[#22324F] hover:border-[#8FC9FF]/40'
        : 'bg-white border-[#E3E8F2] shadow-sm hover:border-[#1F5FD9]/40'
    }`}>
      <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: identity, key */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm text-white flex-shrink-0 shadow-sm ${agent.avatarColor} animate-tilt-slow`}>
            {initials}
          </div>

          <div className="flex flex-col gap-1 w-full min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#15121F]'}`}>
                {agent.name}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 badge-shimmer">
                {selectedRole}
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium">{agent.framework || 'Antigravity'}</p>
            <p className="text-xs text-slate-400">{agent.timestamps}</p>

            <a href="#messages" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-block mt-0.5">
              Messages and instructions
            </a>

            {/* Key row */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <div className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-2 border overflow-hidden relative ${
                isDark ? 'bg-[#070F22] border-[#22324F] text-[#B7C3DA]' : 'bg-[#F5F7FC] border-[#E3E8F2] text-[#3E4A63]'
              }`}>
                <span>{agent.key}</span>
                <span className="text-slate-400">•</span>
                <span className="font-sans font-medium text-slate-500">{selectedScope}</span>
              </div>

              <button
                onClick={handleCopy}
                className="btn-jelly px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: selectors + actions */}
        <div className="flex flex-col gap-3 lg:items-end w-full lg:w-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <div className={`relative px-4 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between gap-4 cursor-pointer min-w-[170px] ${
              isDark ? 'bg-[#070F22] border-[#22324F] text-white' : 'bg-white border-[#E3E8F2] text-[#15121F]'
            }`}>
              <select
                value={selectedRole}
                onChange={(e) => { sounds.playPop(); setSelectedRole(e.target.value); }}
                className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer"
                aria-label={`Level for ${agent.name}`}
              >
                <option value="Reviewer">Reviewer</option>
                <option value="Contributor">Contributor</option>
                <option value="Triager">Triager</option>
                <option value="Observer">Observer</option>
                <option value="Dispatcher">Dispatcher</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            <div className={`relative px-4 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between gap-4 cursor-pointer min-w-[120px] ${
              isDark ? 'bg-[#070F22] border-[#22324F] text-white' : 'bg-white border-[#E3E8F2] text-[#15121F]'
            }`}>
              <select
                value={selectedScope}
                onChange={(e) => { sounds.playPop(); setSelectedScope(e.target.value); }}
                className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer"
                aria-label={`Project for the new key`}
              >
                <option value="Ziki">Ziki</option>
                <option value="Testing">Testing</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={(e) => onRegenerateKey(agent.name, e)}
              className="btn-jelly px-4 py-1.5 rounded-full text-xs font-semibold border transition active:scale-95 flex items-center gap-1.5 cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-100"
              style={{ borderColor: isDark ? '#22324F' : '#E3E8F2' }}
            >
              <RefreshCw className="w-3 h-3" />
              Regenerate key
            </button>

            <button
              onClick={(e) => onRevokeKey(agent.name, e)}
              className="btn-jelly px-4 py-1.5 rounded-full text-xs font-semibold border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition active:scale-95 cursor-pointer"
            >
              Revoke
            </button>

            <button
              onClick={(e) => onDeleteAgent(agent.name, e)}
              className="btn-jelly px-4 py-1.5 rounded-full text-xs font-semibold border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition active:scale-95 cursor-pointer"
            >
              <span className="inline-flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete</span>
            </button>
          </div>

          <button
            onClick={() => { sounds.playPop(); setShowPreferredAreas(!showPreferredAreas); }}
            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start lg:self-end mt-1 cursor-pointer"
          >
            <span>Preferred areas</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showPreferredAreas ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Preferred areas expandable */}
      {showPreferredAreas && (
        <div className={`px-6 pb-4 pt-3 text-xs border-t animate-slide-down ${
          isDark ? 'border-[#1A2844] bg-[#070F22]/60 text-[#93A0B8]' : 'border-[#EEF1F7] bg-[#F8FAFD] text-[#5F6577]'
        }`}>
          <p className="font-semibold mb-2">Assigned areas of responsibility:</p>
          <div className="flex gap-2 flex-wrap">
            {(agent.areas || ['#general']).map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-mono text-[10px] badge-shimmer">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
