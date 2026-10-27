import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import ZikiSidebar from './components/ZikiSidebar';
import ZikiTopNav from './components/ZikiTopNav';
import AgentCanvas from './components/AgentCanvas';
import AgentSettingsPanel from './components/AgentSettingsPanel';
import TaskSnacks from './components/TaskSnacks';
import AgentTable from './components/AgentTable';
import ReferenceModal from './components/ReferenceModal';
import { sounds } from './utils/audio';
import { Sparkles, Check, Bot, Sliders, ExternalLink } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [agentMode, setAgentMode] = useState('copilot'); // 'restricted' | 'copilot' | 'autonomous'
  const [agentName, setAgentName] = useState('Ziki-Agent-Zero');
  const [selectedModel, setSelectedModel] = useState('claude-3-5-sonnet');
  const [temperature, setTemperature] = useState(0.4);
  const [taskAbsorbedCount, setTaskAbsorbedCount] = useState(14);
  const [feedingTask, setFeedingTask] = useState(null);
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sensory Permission Matrix State
  const [permissions, setPermissions] = useState({
    autoAuthorize: {
      label: 'Auto-Authorize Commits',
      desc: 'Allow agent to commit verified bug fixes without human delay',
      enabled: true,
    },
    sandboxMode: {
      label: 'Safety Sandbox Enforced',
      desc: 'Isolate agent execution inside a virtual Docker sandbox',
      enabled: true,
    },
    deepTriage: {
      label: 'Deep Issue Triaging',
      desc: 'Analyze stack traces and auto-reproduce bug reports',
      enabled: true,
    },
    directPRMerge: {
      label: 'Direct PR Merging',
      desc: 'Permit auto-merge only when 100% test coverage passes',
      enabled: false,
    },
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSound = () => {
    const isNowOn = sounds.toggle();
    setSoundEnabled(isNowOn);
    if (isNowOn) sounds.playPop();
  };

  const togglePermission = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: !prev[key].enabled,
      },
    }));
  };

  const handleFeedTask = (task) => {
    setFeedingTask(task);
    setTaskAbsorbedCount((prev) => prev + 1);
  };

  const handleTaskEaten = () => {
    setFeedingTask(null);
    showToast(`Task absorbed by ${agentName}! Verified and queued.`, 'success');
  };

  const handleSelectAgent = (name, mode) => {
    setAgentName(name);
    setAgentMode(mode || 'copilot');
    showToast(`Loaded ${name} into Living Synapse.`, 'info');
  };

  const handleSave = () => {
    sounds.playVictory();
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#14B8A6', '#06B6D4', '#6366F1', '#F59E0B'],
    });

    showToast(`Settings synchronized with Ziki.dev successfully!`, 'success');
  };

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${
      isDark ? 'dark bg-[#080B11] text-slate-100' : 'light bg-[#F8FAFC] text-slate-900'
    }`}>
      {/* 1. Authentic Ziki Left Sidebar */}
      <ZikiSidebar
        theme={theme}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenGuide={() => setIsReferenceModalOpen(true)}
      />

      {/* 2. Main Page Content (Ziki Settings > Agents) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
        {/* Top Header Bar */}
        <ZikiTopNav
          theme={theme}
          onOpenGuide={() => setIsReferenceModalOpen(true)}
        />

        {/* Page Inner Content */}
        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto flex flex-col gap-8">
          {/* Header Title Section of https://ziki.dev/settings/agents */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/60">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold">
                  PAGE: /settings/agents
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-500 font-mono">HNG15 Whimsical Design Deliverable</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Agent Settings & Autonomy Controls
              </h1>
              <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Manage your team's autonomous AI agents, models, and execution boundaries under human oversight. The element below is enhanced with the <strong>Whimsical Living Synapse</strong>.
              </p>
            </div>

            <button
              onClick={() => setIsReferenceModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-teal-500/20 via-indigo-500/20 to-teal-500/10 border border-teal-500/30 text-teal-300 hover:border-teal-400 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Design References Guide</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Whimsical Living Synapse Hub (Lusion + Weavesilk + Puture) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Columns: Living Agent Canvas & Draggable Task Snacks */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <AgentCanvas
                theme={theme}
                agentMode={agentMode}
                agentName={agentName}
                taskAbsorbedCount={taskAbsorbedCount}
                feedingTask={feedingTask}
                onTaskEaten={handleTaskEaten}
              />

              {/* Puture Draggable Task Snacks */}
              <TaskSnacks theme={theme} onFeedTask={handleFeedTask} />
            </div>

            {/* Right 5 Columns: Agent Settings & Sensory Permission Matrix */}
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
                onSave={handleSave}
              />
            </div>
          </div>

          {/* Registered Agents Table */}
          <AgentTable
            theme={theme}
            currentAgentName={agentName}
            onSelectAgent={handleSelectAgent}
          />
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 glass-panel px-4 py-3 rounded-2xl border shadow-2xl flex items-center gap-3 animate-bounce ${
          isDark ? 'border-teal-500/40' : 'border-teal-400'
        }`}>
          <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-medium font-mono ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            {toastMessage.msg}
          </span>
        </div>
      )}

      {/* References & Documentation Modal */}
      <ReferenceModal
        isOpen={isReferenceModalOpen}
        onClose={() => setIsReferenceModalOpen(false)}
      />
    </div>
  );
}
