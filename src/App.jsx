import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import AgentCanvas from './components/AgentCanvas';
import AgentSettingsPanel from './components/AgentSettingsPanel';
import TaskSnacks from './components/TaskSnacks';
import ReferenceModal from './components/ReferenceModal';
import { sounds } from './utils/audio';
import { Check, Sparkles } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [agentMode, setAgentMode] = useState('copilot'); // 'restricted' | 'copilot' | 'autonomous'
  const [agentName, setAgentName] = useState('Ziki-Agent-Zero');
  const [selectedModel, setSelectedModel] = useState('claude-3-5-sonnet');
  const [temperature, setTemperature] = useState(0.4);
  const [taskAbsorbedCount, setTaskAbsorbedCount] = useState(0);
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

  const handleSave = () => {
    sounds.playVictory();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#06B6D4', '#6366F1', '#F59E0B', '#10B981'],
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
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDark ? 'dark bg-[#08090C] text-slate-100' : 'light bg-[#F8FAFC] text-slate-900'
    }`}>
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenReferences={() => setIsReferenceModalOpen(true)}
      />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
        {/* Banner Announcement */}
        <div className={`w-full glass-panel rounded-2xl p-4 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg ${
          isDark
            ? 'border-indigo-500/20 bg-gradient-to-r from-indigo-900/20 via-slate-900/40 to-cyan-900/20'
            : 'border-indigo-200 bg-gradient-to-r from-indigo-50 via-white to-cyan-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Whimsical Redesign of Ziki.dev's Agent Settings & Permissions Hub
              </p>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Inspired by <strong className="text-indigo-500">Lusion.co</strong> (organic 3D physics), <strong className="text-cyan-500">Weavesilk.com</strong> (generative light ribbons), and <strong className="text-amber-500">Puture.co.kr</strong> (tactile toys). Supports both Dark & Light modes.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsReferenceModalOpen(true)}
            className="text-xs text-indigo-500 hover:text-indigo-600 font-mono underline underline-offset-4 flex-shrink-0"
          >
            View Design Breakdown &rarr;
          </button>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: The Living Agent Core (Lusion + Weavesilk) */}
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

          {/* Right: The Redesigned Agent Settings Form */}
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
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 glass-panel px-4 py-3 rounded-2xl border shadow-2xl flex items-center gap-3 animate-bounce ${
          isDark ? 'border-indigo-500/40' : 'border-indigo-300'
        }`}>
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
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

      {/* Footer */}
      <footer className={`w-full border-t py-4 px-8 text-center text-xs flex flex-col sm:flex-row items-center justify-between gap-2 ${
        isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-500'
      }`}>
        <span>Ziki.dev Whimsical Redesign — HNG15 Individual Task</span>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <a
            href="https://github.com/chinenyeonwuzulike94/Ziki-synapse"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-500 transition"
          >
            GitHub Repository
          </a>
          <span>•</span>
          <a
            href="https://ziki.dev"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-500 transition"
          >
            Original Ziki.dev
          </a>
        </div>
      </footer>
    </div>
  );
}
