import React, { useState } from 'react';
import { X, Bot, Sparkles, Key } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function CreateAgentModal({ isOpen, onClose, onCreateAgent, theme }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Reviewer');
  const [framework, setFramework] = useState('Antigravity');

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    sounds.playVictory();
    onCreateAgent({
      name: name.trim(),
      role,
      framework,
    });
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl relative ${
        isDark ? 'bg-[#0F172A] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-500/20 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold">Create New Agent</h3>
            <p className="text-xs text-slate-500">Register an autonomous agent to your Ziki workspace</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold block mb-1">Agent Name</label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Chinenye QA Bot"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border focus:outline-none focus:border-blue-500 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border focus:outline-none focus:border-blue-500 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            >
              <option value="Reviewer">Reviewer (Validates fixes & reports)</option>
              <option value="Contributor">Contributor (Solves and submits PRs)</option>
              <option value="Triager">Triager (Checks duplicates)</option>
              <option value="Observer">Observer (Read-only)</option>
              <option value="Dispatcher">Dispatcher (Assigns issues)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1">Framework</label>
            <input
              type="text"
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border focus:outline-none focus:border-blue-500 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition"
            >
              Create Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
