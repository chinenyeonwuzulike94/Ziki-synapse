import React from 'react';
import { Shield, Sliders, Lock, Zap, Save } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function AgentSettingsPanel({
  theme = 'dark',
  agentMode,
  setAgentMode,
  agentName,
  setAgentName,
  selectedModel,
  setSelectedModel,
  temperature,
  setTemperature,
  permissions,
  togglePermission,
  onSave
}) {
  const isDark = theme === 'dark';

  const models = [
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet (Latest)', badge: 'Recommended' },
    { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro (1M Context)', badge: 'Fast' },
    { id: 'gpt-4o', name: 'GPT-4o (Omni)', badge: 'Vision' },
    { id: 'deepseek-v3', name: 'DeepSeek-V3 Reasoning', badge: 'Math & Logic' },
  ];

  const handleModeChange = (mode) => {
    sounds.playPop();
    setAgentMode(mode);
  };

  const handleToggle = (key) => {
    sounds.playPop();
    togglePermission(key);
  };

  return (
    <div className={`w-full glass-panel rounded-3xl p-6 border shadow-2xl flex flex-col gap-6 ${
      isDark ? 'border-slate-800/80 shadow-black/40' : 'border-slate-200/90 shadow-slate-300/30'
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between pb-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div>
          <h2 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Sliders className="w-5 h-5 text-indigo-500" />
            Agent Synapse Configuration
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Ziki.dev Settings / Agents / Neural Matrix
          </p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${
          isDark
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}>
          ● Synced to Ziki
        </span>
      </div>

      {/* 1. Mode Selector (Whimsical Presets) */}
      <div>
        <label className={`text-xs font-semibold uppercase tracking-wider block mb-2.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Autonomy Operating Mode
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => handleModeChange('restricted')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              agentMode === 'restricted'
                ? (isDark ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-indigo-50 border-indigo-500 text-indigo-900 shadow-md')
                : (isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300')
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>Restricted</span>
              <Lock className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Read-only assistance. Every write requires human approval.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('copilot')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              agentMode === 'copilot'
                ? (isDark ? 'bg-cyan-600/20 border-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-cyan-50 border-cyan-500 text-cyan-900 shadow-md')
                : (isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300')
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-bold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>Co-Pilot (Default)</span>
              <Shield className="w-3.5 h-3.5 text-cyan-500" />
            </div>
            <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Collaborative pairing. Drafts PRs, auto-fixes code issues.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('autonomous')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              agentMode === 'autonomous'
                ? (isDark ? 'bg-amber-600/20 border-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-amber-50 border-amber-500 text-amber-900 shadow-md')
                : (isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300')
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-bold ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>Autonomous</span>
              <Zap className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Full velocity. Discovers bugs, bids on issues, executes solutions.
            </p>
          </button>
        </div>
      </div>

      {/* 2. Model Selection & Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={`text-xs font-semibold uppercase tracking-wider block mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Agent Identifier
          </label>
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:border-indigo-500 font-mono ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 text-white'
                : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
        </div>

        <div>
          <label className={`text-xs font-semibold uppercase tracking-wider block mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Underlying AI Engine
          </label>
          <select
            value={selectedModel}
            onChange={(e) => {
              sounds.playPop();
              setSelectedModel(e.target.value);
            }}
            className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:border-indigo-500 font-medium ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 text-white'
                : 'bg-white border-slate-300 text-slate-900'
            }`}
          >
            {models.map((m) => (
              <option key={m.id} value={m.id} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                {m.name} ({m.badge})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Temperature Slider */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Creativity & Temperature Dial
          </label>
          <span className="text-xs font-mono font-semibold text-indigo-500">{temperature}</span>
        </div>
        <input
          type="range"
          min="0.0"
          max="1.0"
          step="0.05"
          value={temperature}
          onChange={(e) => {
            setTemperature(parseFloat(e.target.value));
          }}
          className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-500 ${
            isDark ? 'bg-slate-800' : 'bg-slate-200'
          }`}
        />
        <div className={`flex justify-between text-[10px] font-mono mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          <span>0.0 (Strict / Deterministic)</span>
          <span>1.0 (Whimsical / Creative)</span>
        </div>
      </div>

      {/* 4. Tactile Permission Matrix (Puture Toggles) */}
      <div>
        <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Sensory Permission Matrix
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {Object.entries(permissions).map(([key, item]) => (
            <div
              key={key}
              onClick={() => handleToggle(key)}
              className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all select-none ${
                item.enabled
                  ? (isDark ? 'bg-slate-800/80 border-indigo-500/50 shadow-sm' : 'bg-indigo-50/80 border-indigo-300 shadow-sm')
                  : (isDark ? 'bg-slate-950/40 border-slate-800/80 opacity-60 hover:opacity-100' : 'bg-slate-100/60 border-slate-200 opacity-70 hover:opacity-100')
              }`}
            >
              <div className="pr-2">
                <p className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{item.label}</p>
                <p className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
              </div>

              <div
                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
                  item.enabled ? 'bg-indigo-500 justify-end' : (isDark ? 'bg-slate-800 justify-start' : 'bg-slate-300 justify-start')
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Save & Sync Action */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onSave}
          className="w-full py-3.5 rounded-2xl font-semibold text-sm bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white shadow-xl shadow-indigo-500/25 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Synapse & Sync to Ziki</span>
        </button>
      </div>
    </div>
  );
}
