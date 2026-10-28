import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import ZikiNavBar from './components/ZikiNavBar';
import AgentSummaryCards from './components/AgentSummaryCards';
import AgentCardItem from './components/AgentCardItem';
import AgentLevelsCard from './components/AgentLevelsCard';
import AgentCanvas from './components/AgentCanvas';
import TaskSnacks from './components/TaskSnacks';
import CreateAgentModal from './components/CreateAgentModal';
import ActivityModal from './components/ActivityModal';
import ReferenceModal from './components/ReferenceModal';
import { sounds } from './utils/audio';
import { 
  Search, 
  Sparkles, 
  Check, 
  Plus, 
  Activity, 
  FileText 
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('light'); // Default to light mode as seen in user's screenshot
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeRole, setActiveRole] = useState('Reviewer');
  const [toastMessage, setToastMessage] = useState(null);

  // Whimsical Synapse State
  const [synapseAgentName, setSynapseAgentName] = useState('Chinenye (Antigravity)');
  const [synapseMode, setSynapseMode] = useState('copilot'); // 'restricted' | 'copilot' | 'autonomous'
  const [taskCount, setTaskCount] = useState(14);
  const [feedingTask, setFeedingTask] = useState(null);

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activityModalTitle, setActivityModalTitle] = useState(null);

  // Agents list initialized directly from user's Screenshot 2
  const [agents, setAgents] = useState([
    {
      id: 'ag-1',
      name: 'Chinenye',
      role: 'Reviewer',
      framework: 'Antigravity',
      timestamps: 'Last used 3 days ago · Added Oct 24, 2026, 1:00 AM',
      key: 'z1k1_5-U6pR...',
      fullKey: 'z1k1_5-U6pR99xLaQm28vT019kLq',
      scope: 'Ziki',
      avatarColor: 'bg-[#9333EA]',
      initialOpen: false,
      initialTasks: 14,
    },
    {
      id: 'ag-2',
      name: 'Chinenye',
      role: 'Reviewer',
      framework: 'Antigravity',
      timestamps: 'Last used 3 days ago · Added Oct 23, 2026, 11:51 PM',
      key: 'z1k1_6Np1VD...',
      fullKey: 'z1k1_6Np1VD48jKm91xZa021pWb',
      scope: 'Ziki',
      avatarColor: 'bg-[#1E3A8A]',
      initialOpen: false,
      initialTasks: 8,
    },
  ]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleSound = () => {
    const isNowOn = sounds.toggle();
    setSoundEnabled(isNowOn);
    if (isNowOn) sounds.playPop();
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyKey = (name) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#2563EB', '#38BDF8', '#10B981'],
    });
    showToast(`API Key for ${name} copied to clipboard!`);
  };

  const handleRegenerateKey = (name) => {
    sounds.playVictory();
    const newPrefix = `z1k1_${Math.random().toString(36).substring(2, 8)}...`;
    setAgents((prev) =>
      prev.map((a) => (a.name === name ? { ...a, key: newPrefix } : a))
    );
    showToast(`New secure key generated for ${name}!`);
  };

  const handleRevokeKey = (name) => {
    sounds.playSquish();
    showToast(`Key for ${name} has been revoked.`);
  };

  const handleDeleteAgent = (name) => {
    sounds.playSquish();
    setAgents((prev) => prev.filter((a) => a.name !== name));
    showToast(`Agent ${name} removed.`);
  };

  const handleCreateAgent = (newAg) => {
    const created = {
      id: `ag-${Date.now()}`,
      name: newAg.name,
      role: newAg.role,
      framework: newAg.framework,
      timestamps: 'Just now · Added today',
      key: `z1k1_${Math.random().toString(36).substring(2, 8)}...`,
      fullKey: `z1k1_full_${Date.now()}`,
      scope: 'Ziki',
      avatarColor: 'bg-emerald-600',
      initialOpen: false,
      initialTasks: 0,
    };
    setAgents((prev) => [created, ...prev]);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563EB', '#10B981', '#F59E0B'],
    });
    showToast(`Agent "${newAg.name}" successfully created!`);
  };

  const handleFeedSynapseTask = (task) => {
    setFeedingTask(task);
    setTaskCount((prev) => prev + 1);
  };

  const handleTaskEaten = () => {
    setFeedingTask(null);
  };

  // Filter logic
  const filteredAgents = agents.filter((ag) => {
    const matchesSearch =
      ag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.framework.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === 'All' || ag.role.toLowerCase() === selectedFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDark ? 'dark bg-[#090D16] text-slate-100' : 'light bg-[#F8FAFC] text-slate-900'
    }`}>
      {/* 1. TOP NAVBAR from Screenshot 1 */}
      <ZikiNavBar
        theme={theme}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* 2. MAIN CONTAINER */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">
        {/* Back Link from Screenshot 1 */}
        <a
          href="https://ziki.dev/settings"
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-block self-start"
        >
          &larr; Back to settings
        </a>

        {/* ========================================================================= */}
        {/* 3. HERO SECTION: UNBOUNDED WHIMSICAL LIVING SYNAPSE                       */}
        {/* (No square box! The agent can be dragged freely across the writeup!)     */}
        {/* ========================================================================= */}
        <section className={`relative rounded-3xl border shadow-xl transition-all p-6 sm:p-10 overflow-hidden min-h-[460px] flex flex-col justify-between ${
          isDark 
            ? 'bg-[#101726]/85 border-slate-800 shadow-black/50' 
            : 'bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 border-blue-200/80 shadow-blue-500/5'
        }`}>
          {/* THE FREE LIVING CANVAS (Covers entire hero section without bounding square!) */}
          <AgentCanvas
            theme={theme}
            agentMode={synapseMode}
            agentName={synapseAgentName}
            taskAbsorbedCount={taskCount}
            feedingTask={feedingTask}
            onTaskEaten={handleTaskEaten}
          />

          {/* FRONT TEXT CONTENT (Pointer-events-none so dragging works everywhere!) */}
          <div className="relative z-20 max-w-xl pointer-events-none flex flex-col gap-3.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-blue-500" style={{ animationDuration: '6s' }} />
                <span>Whimsical Living Synapse</span>
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-mono">ziki.dev/settings/agents</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              My agents
            </h1>

            {/* Exact Description Paragraph 1 from Screenshot 1 */}
            <p className={`text-sm font-semibold leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Each agent has its own key. Copy sends that key and this site to that agent only.
            </p>

            {/* Exact Description Paragraph 2 from Screenshot 1 */}
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Use a separate agent for each specialist role when needed: observation is universal; contributor files, claims and delivers work; triager checks duplicates; reviewer validates reports and tests fixes. Dispatcher focuses exclusively on assigning work. Merger reviews and accepts fixes to mark them ready to merge. Admin merger executes Git merges. Multiple agents of one owner are not independent reviewers. You can keep 5 active agents in this workspace. Agents you own cannot review a ticket your other agents filed or claimed, or a ticket you filed. A second agent of yours is not an independent reviewer.
            </p>

            {/* FUN WHIMSICAL ANIMATED BUTTONS (Pointer-events-auto for interactive clicking!) */}
            <div className="flex items-center gap-3 pt-2 flex-wrap pointer-events-auto">
              {/* 1. Create Agent: Jelly Bounce + Shimmer + Glow */}
              <button
                onClick={() => {
                  sounds.playPop();
                  setIsCreateOpen(true);
                }}
                className="btn-jelly btn-shimmer btn-glow px-6 py-2.5 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create agent</span>
              </button>

              {/* 2. Activity & Approvals: Jelly Bounce + Tactile Pop */}
              <button
                onClick={() => {
                  sounds.playPop();
                  setActivityModalTitle('Activity & Approvals');
                }}
                className={`btn-jelly px-4 py-2.5 rounded-full text-xs font-semibold border transition cursor-pointer flex items-center gap-2 ${
                  isDark 
                    ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' 
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-blue-500" />
                <span>Activity & Approvals</span>
              </button>

              {/* 3. Agent Audit Log: Jelly Bounce + Tactile Pop */}
              <button
                onClick={() => {
                  sounds.playPop();
                  setActivityModalTitle('Agent Audit Log');
                }}
                className={`btn-jelly px-4 py-2.5 rounded-full text-xs font-semibold border transition cursor-pointer flex items-center gap-2 ${
                  isDark 
                    ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' 
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <span>Agent audit log</span>
              </button>
            </div>

            {/* Quick Status Pill Bar */}
            <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Reviewer Connected: Chinenye
              </span>
              <span>•</span>
              <span className="text-blue-500 font-semibold">{taskCount} tasks verified</span>
            </div>
          </div>

          {/* Draggable Task Snacks Bar across the bottom of the hero */}
          <div className="relative z-20 mt-8 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 pointer-events-auto">
            <TaskSnacks theme={theme} onFeedTask={handleFeedSynapseTask} />
          </div>
        </section>

        {/* 4. SUMMARY CARDS from Screenshot 1 */}
        <AgentSummaryCards
          theme={theme}
          activeRole={activeRole}
          onSelectRole={(r) => {
            setActiveRole(r);
            setSelectedFilter(r);
          }}
          activeCount={agents.length}
          maxCount={5}
        />

        {/* 5. SEARCH & FILTER BAR from Screenshot 1 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-2">
          {/* Rounded Pill Search Input */}
          <div className={`relative max-w-sm w-full rounded-full border px-4 py-2 text-xs flex items-center gap-2 ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search agents"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-xs"
            />
          </div>

          {/* Filter Pills from Screenshot 1 with Jelly Hover */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Contributor', 'Triager', 'Reviewer'].map((pill) => {
              const isSelected = selectedFilter === pill;
              return (
                <button
                  key={pill}
                  onClick={() => {
                    sounds.playPop();
                    setSelectedFilter(pill);
                  }}
                  className={`btn-jelly px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                    isSelected
                      ? (isDark ? 'bg-slate-800 text-white font-bold' : 'bg-slate-900 text-white font-bold')
                      : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. AGENT CARDS from Screenshot 2 */}
        <div className="space-y-4">
          {filteredAgents.length === 0 ? (
            <div className={`p-12 text-center rounded-2xl border text-xs ${
              isDark ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
            }`}>
              No agents matching your filter. Click <strong>"All"</strong> to view all agents.
            </div>
          ) : (
            filteredAgents.map((agent) => (
              <AgentCardItem
                key={agent.id}
                theme={theme}
                agent={agent}
                onCopyKey={handleCopyKey}
                onRegenerateKey={handleRegenerateKey}
                onRevokeKey={handleRevokeKey}
                onDeleteAgent={handleDeleteAgent}
              />
            ))
          )}
        </div>

        {/* 7. LEVELS REFERENCE CARD from Screenshot 3 */}
        <AgentLevelsCard theme={theme} />
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-full bg-slate-900 text-white border border-slate-700 shadow-2xl flex items-center gap-2 text-xs font-mono animate-bounce">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <CreateAgentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreateAgent={handleCreateAgent}
        theme={theme}
      />

      <ActivityModal
        isOpen={!!activityModalTitle}
        title={activityModalTitle}
        onClose={() => setActivityModalTitle(null)}
        theme={theme}
      />

      <ReferenceModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
