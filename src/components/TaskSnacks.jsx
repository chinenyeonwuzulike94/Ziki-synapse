import React, { useState } from 'react';
import { Plus, Sparkles, Bot, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/audio';

const INITIAL_TASKS = [
  { id: 't1', title: 'Fix Memory Leak in Auth', type: 'bug', darkColor: 'from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-300', lightColor: 'from-rose-50 to-red-50 border-rose-200 text-rose-900' },
  { id: 't2', title: 'Authorize PR #402 (Websocket)', type: 'pr', darkColor: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-300', lightColor: 'from-cyan-50 to-blue-50 border-cyan-200 text-cyan-900' },
  { id: 't3', title: 'Run Full E2E Test Suite', type: 'test', darkColor: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300', lightColor: 'from-emerald-50 to-teal-50 border-emerald-200 text-emerald-900' },
  { id: 't4', title: 'Auto-Triage 12 Stale Issues', type: 'triage', darkColor: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-300', lightColor: 'from-amber-50 to-yellow-50 border-amber-200 text-amber-900' },
  { id: 't5', title: 'Deploy Staging Canary V2', type: 'deploy', darkColor: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300', lightColor: 'from-purple-50 to-indigo-50 border-purple-200 text-purple-900' },
];

export default function TaskSnacks({ theme = 'dark', onFeedTask }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [customInput, setCustomInput] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const isDark = theme === 'dark';

  const handleFeed = (task) => {
    sounds.playPop();
    onFeedTask(task);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    setTimeout(() => {
      setTasks((prev) => [...prev, { ...task, id: `t-${Date.now()}` }]);
    }, 4000);
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const newTask = {
      id: `t-${Date.now()}`,
      title: customInput.trim(),
      type: 'custom',
      darkColor: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-300',
      lightColor: 'from-indigo-50 to-purple-50 border-indigo-200 text-indigo-900',
    };
    setTasks((prev) => [newTask, ...prev]);
    setCustomInput('');
    setShowAddModal(false);
    sounds.playChime(600);
  };

  return (
    <div className={`w-full glass-panel rounded-3xl p-6 border mt-6 shadow-xl ${
      isDark ? 'border-slate-800/80 shadow-black/40' : 'border-slate-200/90 shadow-slate-300/30'
    }`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`text-base font-semibold flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              <Bot className="w-4 h-4 text-cyan-500" />
              Tactile Task Snacks (Puture-style Playground)
            </h3>
            <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border ${
              isDark ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-cyan-50 text-cyan-700 border-cyan-200'
            }`}>
              Interactive
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Click any task below to "feed" it directly into the Agent Core and test its permission execution!
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Test Task</span>
        </button>
      </div>

      {/* Task Bouncy Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => handleFeed(task)}
            className={`group relative text-left p-3.5 rounded-2xl border bg-gradient-to-br ${
              isDark ? task.darkColor : task.lightColor
            } transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95 cursor-pointer`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                #{task.type}
              </span>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
              }`}>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>

            <p className={`text-xs font-medium leading-snug line-clamp-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              {task.title}
            </p>

            <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-cyan-500 group-hover:text-cyan-400">
              <Sparkles className="w-3 h-3" />
              <span>Feed to Agent</span>
            </div>
          </button>
        ))}
      </div>

      {/* Custom Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md glass-panel rounded-3xl p-6 border shadow-2xl ${
            isDark ? 'border-slate-700' : 'border-slate-300'
          }`}>
            <h4 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Create Test Task</h4>
            <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Enter any issue or pull request title you want to feed to your living agent.
            </p>
            <form onSubmit={handleAddCustom}>
              <input
                type="text"
                autoFocus
                placeholder="e.g. Refactor API routes for speed..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-cyan-500 mb-4 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2 rounded-xl text-xs transition ${
                    isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-black'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition shadow-lg shadow-cyan-500/20"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
