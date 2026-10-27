import React from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function ReferenceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full glass-pill hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Whimsical Design Blueprint</h2>
            <p className="text-xs text-slate-400">HNG15 Individual Task Deliverable #2 Documentation</p>
          </div>
        </div>

        {/* Step-by-Step Breakdown */}
        <div className="space-y-6 text-sm text-slate-300">
          {/* Step 1 & 3: Product & Element */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider mb-2">
              Steps 1 & 3: Selected Product & Target Element
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Product:</span>
                <a
                  href="https://ziki.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-white hover:text-cyan-400 flex items-center gap-1 mt-0.5"
                >
                  Ziki (Collaborative AI Delivery Platform)
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Specific Element Redesigned:</span>
                <a
                  href="https://ziki.dev/settings/agents"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-cyan-300 hover:underline flex items-center gap-1 mt-0.5"
                >
                  https://ziki.dev/settings/agents
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  (Agent Permissions & Autonomy Settings Hub)
                </span>
              </div>
            </div>
          </div>

          {/* Step 2: Whimsical References */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-3">
              Step 2: Whimsical Design References & Inspirations
            </h3>

            <div className="space-y-3">
              {/* Lusion */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                <div>
                  <a
                    href="https://lusion.co/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-white hover:text-indigo-300 flex items-center gap-1.5"
                  >
                    Lusion.co
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <p className="text-xs text-slate-400 mt-1">
                    <strong>Inspired:</strong> The living, organic 3D fluid agent core that breathes, undulates, ripples with chromatic gradients, and squishes with real-time physics.
                  </p>
                </div>
              </div>

              {/* Weavesilk */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <div>
                  <a
                    href="https://weavesilk.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-white hover:text-cyan-300 flex items-center gap-1.5"
                  >
                    Weavesilk.com
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <p className="text-xs text-slate-400 mt-1">
                    <strong>Inspired:</strong> The glowing generative light ribbons connecting the human cursor to the agent core, visualizing the "neural handshake" and permission tether.
                  </p>
                </div>
              </div>

              {/* Puture */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                <div>
                  <a
                    href="https://puture.co.kr/en/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-white hover:text-amber-300 flex items-center gap-1.5"
                  >
                    Puture.co.kr
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <p className="text-xs text-slate-400 mt-1">
                    <strong>Inspired:</strong> Playful bouncy physics, draggable task snacks (`[Fix Memory Leak]`, etc.) you can feed into the agent, tactile permission switches, and celebratory sound FX.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Before & After Redesign Comparison */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Step 4: The Whimsical Redesign Transformation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-200">
                <strong className="block text-rose-400 mb-1">Before (Standard UI):</strong>
                Static form tables, boring checkboxes, silent toggles, and cold text status labels like "Active / Inactive".
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-200">
                <strong className="block text-emerald-400 mb-1">After (Whimsical Redesign):</strong>
                A living, squishy 3D fluid organism, generative glowing ribbon tethers, interactive draggable task feeding, and sensory audio feedback.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-indigo-500 hover:bg-indigo-400 text-white transition shadow-lg shadow-indigo-500/20"
          >
            Back to Playground
          </button>
        </div>
      </div>
    </div>
  );
}
