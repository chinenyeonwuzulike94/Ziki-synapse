import React from 'react';
import { Bot, CheckCircle2, Shield, MoreVertical, Sliders, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function AgentTable({ theme, onSelectAgent, currentAgentName }) {
  const isDark = theme === 'dark';

  const agents = [
    {
      id: 'ag-01',
      name: 'Ziki-Agent-Zero',
      role: 'Core Solver & Bug Triager',
      model: 'Claude 3.5 Sonnet',
      mode: 'Co-Pilot',
      modeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      status: 'Active (Connected to Synapse)',
      tasks: 14,
      tokens: '412K / 1M',
    },
    {
      id: 'ag-02',
      name: 'Agent-Verifier-Alpha',
      role: 'Independent QA & Test Runner',
      model: 'Gemini 1.5 Pro',
      mode: 'Autonomous',
      modeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      status: 'Idle (Listening for PRs)',
      tasks: 8,
      tokens: '180K / 1M',
    },
    {
      id: 'ag-03',
      name: 'Agent-Triager-Sentinel',
      role: 'Issue Deduplication & Context Gate',
      model: 'DeepSeek-V3',
      mode: 'Restricted',
      modeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      status: 'Active',
      tasks: 29,
      tokens: '58K / 1M',
    },
  ];

  return (
    <div className={`w-full rounded-2xl border overflow-hidden mt-8 transition-colors ${
      isDark ? 'bg-[#101726]/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
    }`}>
      {/* Table Header */}
      <div className={`p-4 border-b flex items-center justify-between ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Bot className="w-4 h-4 text-teal-400" />
            Registered Autonomous Agents (3)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any agent to load its live whimsical synapse into the interactive canvas above.
          </p>
        </div>

        <span className="text-xs font-mono text-teal-400">
          ● All gates operational
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className={`font-mono uppercase text-[10px] tracking-wider border-b ${
            isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            <tr>
              <th className="py-3 px-4">Agent Name</th>
              <th className="py-3 px-4">Model Engine</th>
              <th className="py-3 px-4">Autonomy Mode</th>
              <th className="py-3 px-4">Tasks Handled</th>
              <th className="py-3 px-4">Token Quota</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-slate-800/80' : 'divide-slate-100'}`}>
            {agents.map((ag) => {
              const isSelected = ag.name === currentAgentName;
              return (
                <tr
                  key={ag.id}
                  onClick={() => {
                    sounds.playPop();
                    onSelectAgent(ag.name, ag.mode.toLowerCase().replace('-', ''));
                  }}
                  className={`transition-colors cursor-pointer ${
                    isSelected
                      ? (isDark ? 'bg-teal-500/10' : 'bg-teal-50')
                      : (isDark ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50')
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-teal-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {ag.name[0]}
                      </div>
                      <div>
                        <span className={`font-semibold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {ag.name}
                        </span>
                        <span className="text-[10px] text-slate-500">{ag.role}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {ag.model}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border font-medium ${ag.modeColor}`}>
                      {ag.mode}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-teal-400">
                    {ag.tasks} issues
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {ag.tokens}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                        isSelected
                          ? 'bg-teal-500 text-slate-950 font-bold border-teal-400'
                          : (isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200')
                      }`}
                    >
                      {isSelected ? 'Loaded in Synapse' : 'Load in Synapse'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
