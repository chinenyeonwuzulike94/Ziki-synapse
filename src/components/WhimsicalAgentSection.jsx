import React from 'react';
import AgentCanvas from './AgentCanvas';
import AgentSettingsPanel from './AgentSettingsPanel';
import TaskSnacks from './TaskSnacks';
import { Sparkles, Sliders, Shield, ExternalLink } from 'lucide-react';

export default function WhimsicalAgentSection({
  theme,
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
  taskAbsorbedCount,
  feedingTask,
  onFeedTask,
  onTaskEaten,
  onSave,
  onOpenModal
}) {
  const isDark = theme === 'dark';

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto w-full" id="whimsical-agent">
      {/* Section Head matching Ziki authentic layout */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium mb-3 border bg-teal-500/10 border-teal-500/30 text-teal-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Redesigned Element: ziki.dev/settings/agents</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Agents ask before they act.<br />
          <span className="font-serif italic font-normal text-teal-400">
            People make the call.
          </span>
        </h2>

        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Instead of flat, silent forms, your agent is reimagined as a <strong>Living Agent Synapse</strong> inspired by{' '}
          <a href="https://lusion.co" target="_blank" rel="noreferrer" className="text-indigo-400 underline underline-offset-2">Lusion</a>,{' '}
          <a href="https://weavesilk.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline underline-offset-2">Weavesilk</a>, and{' '}
          <a href="https://puture.co.kr/en/" target="_blank" rel="noreferrer" className="text-amber-400 underline underline-offset-2">Puture</a>.
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={onOpenModal}
            className="text-xs text-teal-400 hover:underline flex items-center gap-1 font-mono"
          >
            <span>Read Whimsical Design Guide & References</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Grid: Living Agent Canvas + Settings Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Living Agent Canvas & Task Snacks */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <AgentCanvas
            theme={theme}
            agentMode={agentMode}
            agentName={agentName}
            taskAbsorbedCount={taskAbsorbedCount}
            feedingTask={feedingTask}
            onTaskEaten={onTaskEaten}
          />

          {/* Draggable Task Snacks (Puture Playground) */}
          <TaskSnacks theme={theme} onFeedTask={onFeedTask} />
        </div>

        {/* Right Column: Authentic Agent Settings & Permissions Hub */}
        <div className="lg:col-span-5">
          <AgentSettingsPanel
            theme={theme}
            agentMode={agentMode}
            setAgentMode={setAgentMode}
            agentName={agentName}
            setAgentName={setAgentName}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            temperature={temperature}
            setTemperature={setTemperature}
            permissions={permissions}
            togglePermission={togglePermission}
            onSave={onSave}
          />
        </div>
      </div>
    </section>
  );
}
