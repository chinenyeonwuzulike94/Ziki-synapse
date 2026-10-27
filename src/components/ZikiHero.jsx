import React from 'react';
import { ArrowRight, Sparkles, Shield, Bot, GitPullRequest, CheckCircle2 } from 'lucide-react';

export default function ZikiHero({ theme }) {
  const isDark = theme === 'dark';

  return (
    <section className="relative pt-12 pb-20 px-4 max-w-5xl mx-auto text-center" id="top">
      {/* Eyebrow Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium mb-8 shadow-sm transition-colors cursor-pointer hover:border-teal-500/50"
        style={{
          background: isDark ? 'rgba(20, 184, 166, 0.08)' : 'rgba(20, 184, 166, 0.06)',
          borderColor: isDark ? 'rgba(20, 184, 166, 0.25)' : 'rgba(20, 184, 166, 0.2)',
          color: isDark ? '#2DD4BF' : '#0F766E'
        }}
      >
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-teal-400" />
        <span>Human + AI workflows</span>
        <span className="opacity-40">•</span>
        <span className="underline underline-offset-2">Explore the product ↗</span>
      </div>

      {/* Hero Kicker */}
      <p className="text-xs uppercase tracking-widest font-mono text-teal-500 font-semibold mb-3">
        Collaborative software delivery
      </p>

      {/* Hero Title (Ziki authentic typography) */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.08]">
        Move every issue{' '}
        <span className="relative inline-flex items-center text-teal-400 font-extrabold mx-1">
          f
          <span className="w-7 sm:w-10 h-3 sm:h-4 bg-teal-500/20 border border-teal-500/40 rounded-full mx-0.5 inline-flex items-center p-0.5">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-teal-400 animate-pulse" />
          </span>
          rward
        </span>
        <br />
        <span className="font-normal italic font-serif text-slate-400">
          with your agents
        </span>
      </h1>

      {/* Hero Subtitle */}
      <p className={`max-w-2xl mx-auto text-base sm:text-lg mb-8 leading-relaxed ${
        isDark ? 'text-slate-400' : 'text-slate-600'
      }`}>
        Agents discover issues, propose a plan, deliver fixes, and validate work on behalf of your team. Every action is permissioned, attributable, and under human control.
      </p>

      {/* Hero Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
        <a
          href="#whimsical-agent"
          className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-sm bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 group"
        >
          <span>Interact with Living Agent</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

        <a
          href="#how-it-works"
          className={`w-full sm:w-auto px-6 py-3 rounded-full font-medium text-sm border transition-all ${
            isDark 
              ? 'border-white/10 hover:bg-white/5 text-slate-300' 
              : 'border-slate-300 hover:bg-slate-100 text-slate-700'
          }`}
        >
          See how it works
        </a>
      </div>

      {/* Bottom Integrations Pill Bar */}
      <div className={`p-4 rounded-2xl border max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
        isDark ? 'bg-slate-900/40 border-white/5 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}>
        <span className="font-mono text-[11px] uppercase tracking-wider opacity-60">
          Built around your workflow
        </span>
        <div className="flex items-center gap-4 font-medium">
          <span className="flex items-center gap-1.5 text-teal-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Issues
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Bot className="w-3.5 h-3.5" /> Agents
          </span>
          <span className="flex items-center gap-1.5 text-indigo-400">
            <GitPullRequest className="w-3.5 h-3.5" /> Pull requests
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Shield className="w-3.5 h-3.5" /> Reviews
          </span>
        </div>
      </div>
    </section>
  );
}
