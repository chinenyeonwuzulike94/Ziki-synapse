import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Trash2, 
  AlertTriangle,
  X
} from 'lucide-react';
import AgentCanvas from './AgentCanvas';
import TaskSnacks from './TaskSnacks';
import { sounds } from '../utils/audio';

export default function AgentCardItem({
  theme,
  agent,
  onCopyKey,
  onRegenerateKey,
  onRevokeKey,
  onDeleteAgent
}) {
  const [showWhimsical, setShowWhimsical] = useState(agent.initialOpen || false);
  const [copied, setCopied] = useState(false);
  const [selectedRole, setSelectedRole] = useState(agent.role || 'Reviewer');
  const [selectedScope, setSelectedScope] = useState(agent.scope || 'Ziki');
  const [showPreferredAreas, setShowPreferredAreas] = useState(false);
  const [taskCount, setTaskCount] = useState(agent.initialTasks || 14);
  const [feedingTask, setFeedingTask] = useState(null);
  const [showSyncModal, setShowSyncModal] = useState(false);

  const isDark = theme === 'dark';

  const handleCopy = () => {
    sounds.playPop();
    navigator.clipboard?.writeText(agent.fullKey || agent.key);
    setCopied(true);
    onCopyKey(agent.name);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeed = (task) => {
    setFeedingTask(task);
    setTaskCount((prev) => prev + 1);
  };

  const handleTaskEaten = () => {
    setFeedingTask(null);
  };

  return (
    <div className={`rounded-2xl border transition-all mb-4 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 hover:scale-[1.005] duration-300 group relative ${
      isDark ? 'bg-[#101726]/80 border-slate-800 hover:border-blue-400/40' : 'bg-white border-slate-200/90 shadow-sm hover:border-blue-400'
    }`}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      {/* Main Agent Row matching Screenshot 2 */}
      <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Avatar, Name, Timestamps, Key */}
        <div className="flex items-start gap-4 flex-1">
          {/* Avatar CH from Screenshot 2 */}
          <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0 shadow-sm transition-all group-hover:scale-110 group-hover:rotate-3 ${agent.avatarColor}`}>
            CH
          </div>

          <div className="flex flex-col gap-1 w-full">
            {/* Title & Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {agent.name}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
                {selectedRole}
              </span>
            </div>

            {/* Subtitle: Antigravity */}
            <p className="text-xs text-slate-500 font-medium">
              {agent.framework || 'Antigravity'}
            </p>

            {/* Timestamps */}
            <p className="text-xs text-slate-400">
              {agent.timestamps}
            </p>

            {/* Link: Messages and instructions */}
            <a href="#messages" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-block mt-0.5">
              Messages and instructions
            </a>

            {/* Key Pill Row from Screenshot 2 */}
            <div className="flex items-center gap-2 mt-2">
              <div className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-2 border ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                <span>{agent.key}</span>
                <span className="text-slate-400">•</span>
                <span className="font-sans font-medium text-slate-500">Ziki</span>
              </div>

              <button
                onClick={handleCopy}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all flex items-center gap-1.5 shadow-sm active:scale-95 hover:shadow-md hover:shadow-blue-500/30 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Role & Scope Selectors + Actions from Screenshot 2 */}
        <div className="flex flex-col gap-3 lg:items-end w-full lg:w-auto">
          {/* Dropdown 1: Role Selector (Reviewer ∨) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <div className={`relative px-4 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between gap-4 cursor-pointer min-w-[200px] ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <select
                value={selectedRole}
                onChange={(e) => {
                  sounds.playPop();
                  setSelectedRole(e.target.value);
                }}
                className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer"
              >
                <option value="Reviewer">Reviewer</option>
                <option value="Contributor">Contributor</option>
                <option value="Triager">Triager</option>
                <option value="Observer">Observer</option>
                <option value="Dispatcher">Dispatcher</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 2: Scope Selector (Ziki ∨) */}
            <div className={`relative px-4 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between gap-4 cursor-pointer min-w-[120px] ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <select
                value={selectedScope}
                onChange={(e) => {
                  sounds.playPop();
                  setSelectedScope(e.target.value);
                }}
                className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer"
              >
                <option value="Ziki">Ziki</option>
                <option value="Zedu">Zedu</option>
                <option value="Global">Global</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Buttons Row: Regenerate key, Revoke, Delete from Screenshot 2 */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onRegenerateKey(agent.name)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition active:scale-95 ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              Regenerate key
            </button>

            <button
              onClick={() => onRevokeKey(agent.name)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition active:scale-95"
            >
              Revoke
            </button>

            <button
              onClick={() => onDeleteAgent(agent.name)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition active:scale-95"
            >
              Delete
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setShowSyncModal(true);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition active:scale-95 ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              Sync Session
            </button>
          </div>

          {/* Bottom Preferred Areas link from Screenshot 2 */}
          <button
            onClick={() => {
              sounds.playPop();
              setShowPreferredAreas(!showPreferredAreas);
            }}
            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start lg:self-end mt-1"
          >
            <span>▶ Preferred areas</span>
          </button>
        </div>
      </div>

      {/* Preferred Areas Expandable */}
      {showPreferredAreas && (
        <div className={`px-6 pb-4 pt-1 text-xs border-t ${
          isDark ? 'border-slate-800 bg-slate-950/40 text-slate-400' : 'border-slate-100 bg-slate-50 text-slate-600'
        }`}>
          <p className="font-semibold mb-1">Assigned Areas of Responsibility:</p>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-mono text-[10px]">#frontend-review</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-mono text-[10px]">#regression-tests</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-mono text-[10px]">#auth-timeouts</span>
          </div>
        </div>
      )}

      {/* WHIMSICAL LIVING SYNAPSE TOGGLE BAR */}
      <div className={`px-6 py-2.5 border-t flex items-center justify-between ${
        isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-blue-50/50 border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
            Whimsical Living Synapse
          </span>
          <span className="text-[10px] text-slate-500 hidden sm:inline">
            (Lusion 3D fluid core + Weavesilk ribbons + Puture task snacks)
          </span>
        </div>

        <button
          onClick={() => {
            sounds.playPop();
            setShowWhimsical(!showWhimsical);
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{showWhimsical ? 'Collapse Synapse' : 'Expand Living Synapse'}</span>
        </button>
      </div>

      {/* EXPANDABLE WHIMSICAL LIVING SYNAPSE SECTION */}
      {showWhimsical && (
        <div className={`p-6 border-t ${
          isDark ? 'border-slate-800 bg-[#0B0F19]' : 'border-slate-200 bg-slate-50'
        }`}>
          {/* Lusion Living Agent Canvas */}
          <AgentCanvas
            theme={theme}
            agentMode={selectedRole.toLowerCase() === 'reviewer' ? 'copilot' : 'autonomous'}
            agentName={agent.name}
            taskAbsorbedCount={taskCount}
            feedingTask={feedingTask}
            onTaskEaten={handleTaskEaten}
          />

          {/* Puture Draggable Task Snacks */}
          <TaskSnacks theme={theme} onFeedTask={handleFeed} />
        </div>
      )}

      {/* Sync Session Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl relative ${
            isDark ? 'bg-[#0F172A] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => {
                sounds.playPop();
                setShowSyncModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-500/20 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold">Human-Agent Interaction Sync</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className={`w-full h-48 rounded-xl border-2 border-dashed flex items-center justify-center ${
                isDark ? 'border-slate-700 bg-slate-900/50' : 'border-slate-300 bg-slate-50'
              }`}>
                <div className="text-center space-y-2">
                  <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded grid grid-cols-3 gap-1 p-2">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className={`rounded-sm ${[0,2,4,6,8].includes(i) ? 'bg-slate-900' : 'bg-white'}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Scan this code with your mobile device or external console to bridge workflows, approve budgets, or manually override this agent's actions.
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    sounds.playPop();
                    setShowSyncModal(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
