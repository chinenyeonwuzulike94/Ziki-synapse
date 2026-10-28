import React from 'react';
import { X, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function ActivityModal({ isOpen, onClose, title, theme }) {
  if (!isOpen) return null;

  const isDark = theme === 'dark';

  const mockLogs = [
    { time: '10 mins ago', agent: 'Chinenye (Antigravity)', action: 'Validated regression tests for PR #402', status: 'Accepted' },
    { time: '1 hour ago', agent: 'Chinenye (Antigravity)', action: 'Reviewed and confirmed issue #89', status: 'Approved' },
    { time: '3 hours ago', agent: 'Chinenye (Antigravity)', action: 'Verified auth token expiration logic', status: 'Passed' },
    { time: '1 day ago', agent: 'Chinenye (Antigravity)', action: 'Generated test verdict: 47/47 passing', status: 'Complete' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl relative ${
        isDark ? 'bg-[#0F172A] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
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
          <Activity className="w-5 h-5 text-blue-500" />
          <h3 className="text-base font-bold">{title}</h3>
        </div>

        <div className="space-y-2.5 text-xs">
          {mockLogs.map((log, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <p className="font-semibold">{log.action}</p>
                <p className="text-[10px] text-slate-500">{log.agent} • {log.time}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                {log.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
