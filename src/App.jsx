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
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-8 py-6 flex flex-col gap-5">
        {/* Back Link */}
        <a
          href="https://ziki.dev/settings"
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5 self-start"
        >
          <span>&larr;</span>
          <span>Back to settings</span>
        </a>

        {/* ========================================================================= */}
        {/* 3. HERO SECTION */}
        {/* ========================================================================= */}
        <section className={`relative rounded-3xl border shadow-lg transition-all p-6 sm:p-8 overflow-hidden ${
          isDark 
            ? 'bg-[#101726]/80 border-slate-800 shadow-black/40' 
            : 'bg-white border-slate-200/90 shadow-slate-200/40'
        }`}>
          <AgentCanvas
            theme={theme}
            agentMode={synapseMode}
            agentName={synapseAgentName}
            taskAbsorbedCount={taskCount}
            feedingTask={feedingTask}
            onTaskEaten={handleTaskEaten}
          />

          <div className="relative z-20 max-w-2xl pointer-events-none flex flex-col gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Sparkles className="w-3 h-3" />
                <span>Agents</span>
              </span>
              <span className="text-[11px] text-slate-400">•</span>
              <span className="text-[11px] text-slate-500 font-mono">ziki.dev/settings/agents</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                My agents
              </h1>

              <p className={`text-sm font-semibold leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Each agent has its own key. Copying sends that key and this site to that agent only.
              </p>

              <p className={`text-xs leading-relaxed max-w-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Assign each agent a role — Observer, Contributor, Triager, Reviewer, Dispatcher, Merger, or Admin Merger. Up to 5 active agents. Agents cannot review their own or each other's submissions.
              </p>
            </div>

            {/* FUN WHIMSICAL ANIMATED BUTTONS (Pointer-events-auto for interactive clicking!) */}
            <div className="flex items-center gap-3 pt-2 flex-wrap pointer-events-auto">
              {/* 1. Create Agent: Ultra Whimsical - Very Visible */}
              <button
                onClick={(e) => {
                  sounds.playPop();
                  confetti({
                    particleCount: 150,
                    spread: 90,
                    origin: { y: 0.7 },
                    colors: ['#2563EB', '#38BDF8', '#10B981', '#F59E0B', '#EC4899', '#A855F7'],
                    angle: 90,
                    ticks: 300,
                  });
                  setIsCreateOpen(true);
                }}
                className="btn-jelly btn-shimmer btn-glow btn-bounce px-7 py-3 rounded-full text-sm font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white shadow-2xl shadow-blue-600/60 transition-all cursor-pointer flex items-center gap-2.5 relative overflow-hidden group animate-pulse"
                style={{ animationDuration: '2s' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Plus className="w-5 h-5 transition-transform group-hover:rotate-180 group-hover:scale-125 relative z-10" />
                <span className="relative z-10 drop-shadow-lg">✨ CREATE AGENT ✨</span>
              </button>

              {/* 2. Activity & Approvals: Super Playful */}
              <button
                onClick={(e) => {
                  sounds.playPop();
                  confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
                    colors: ['#38BDF8', '#3B82F6', '#06B6D4', '#22D3EE', '#0EA5E9'],
                    ticks: 250,
                    startVelocity: 45,
                  });
                  setActivityModalTitle('Activity & Approvals');
                }}
                className={`btn-jelly btn-wiggle px-5 py-3 rounded-full text-sm font-bold border-2 transition-all cursor-pointer flex items-center gap-2 hover:scale-110 hover:shadow-2xl relative overflow-hidden group ${
                  isDark 
                    ? 'bg-gradient-to-r from-slate-900/90 to-cyan-900/50 backdrop-blur-sm border-cyan-400 text-cyan-300 hover:from-slate-800 hover:to-cyan-800/60 hover:border-cyan-300' 
                    : 'bg-gradient-to-r from-white/95 to-cyan-50 backdrop-blur-sm border-cyan-400 text-cyan-700 hover:from-cyan-50 hover:to-cyan-100 hover:border-cyan-500 shadow-lg'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Activity className="w-4 h-4 text-cyan-500 animate-bounce relative z-10" style={{ animationDuration: '1s' }} />
                <span className="relative z-10">🎉 ACTIVITY & APPROVALS</span>
              </button>

              {/* 3. Agent Audit Log: Extra Bouncy */}
              <button
                onClick={(e) => {
                  sounds.playPop();
                  confetti({
                    particleCount: 70,
                    spread: 65,
                    origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
                    colors: ['#A855F7', '#8B5CF6', '#EC4899', '#F43F5E', '#D946EF'],
                    ticks: 220,
                    startVelocity: 40,
                    gravity: 0.7,
                  });
                  setActivityModalTitle('Agent Audit Log');
                }}
                className={`btn-jelly btn-rubber-band px-5 py-3 rounded-full text-sm font-bold border-2 transition-all cursor-pointer flex items-center gap-2 hover:scale-110 hover:shadow-2xl relative overflow-hidden group ${
                  isDark 
                    ? 'bg-gradient-to-r from-slate-900/90 to-purple-900/50 backdrop-blur-sm border-purple-400 text-purple-300 hover:from-slate-800 hover:to-purple-800/60 hover:border-purple-300' 
                    : 'bg-gradient-to-r from-white/95 to-purple-50 backdrop-blur-sm border-purple-400 text-purple-700 hover:from-purple-50 hover:to-purple-100 hover:border-purple-500 shadow-lg'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <FileText className="w-4 h-4 text-purple-500 animate-pulse relative z-10" />
                <span className="relative z-10">📜 AGENT AUDIT LOG</span>
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

          <div className="relative z-20 mt-6 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 pointer-events-auto">
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
