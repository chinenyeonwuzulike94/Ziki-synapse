import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import ZikiNavBar from './components/ZikiNavBar';
import AgentSummaryCards from './components/AgentSummaryCards';
import AgentCardItem from './components/AgentCardItem';
import AgentLevelsCard from './components/AgentLevelsCard';
import CreateAgentModal from './components/CreateAgentModal';
import ActivityModal from './components/ActivityModal';
import ReferenceModal from './components/ReferenceModal';
import { sounds } from './utils/audio';
import { Search, Sparkles, Check } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('light'); // Default to light mode as seen in user's screenshot!
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeRole, setActiveRole] = useState('Reviewer');
  const [toastMessage, setToastMessage] = useState(null);

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activityModalTitle, setActivityModalTitle] = useState(null);

  // Agents list initialized directly from user's Screenshot 2!
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
      avatarColor: 'bg-[#9333EA]', // Purple from Screenshot 2
      initialOpen: true, // Expand the whimsical synapse on this agent!
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
      avatarColor: 'bg-[#1E3A8A]', // Dark blue from Screenshot 2
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
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isDark ? 'dark bg-[#090D16] text-slate-100' : 'light bg-[#F8FAFC] text-slate-900'
    }`}>
      {/* 1. Authentic Top Navigation from Screenshot 1 */}
      <ZikiNavBar
        theme={theme}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* 2. Main Page Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        {/* Back Link from Screenshot 1 */}
        <a
          href="https://ziki.dev/settings"
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-block mb-3"
        >
          &larr; Back to settings
        </a>

        {/* Title & Header Actions Row from Screenshot 1 */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              My agents
            </h1>

            {/* Description Paragraph 1 from Screenshot 1 */}
            <p className={`text-xs sm:text-sm font-medium mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Each agent has its own key. Copy sends that key and this site to that agent only.
            </p>

            {/* Description Paragraph 2 from Screenshot 1 */}
            <p className={`text-xs leading-relaxed max-w-4xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Use a separate agent for each specialist role when needed: observation is universal; contributor files, claims and delivers work; triager checks duplicates; reviewer validates reports and tests fixes. Dispatcher focuses exclusively on assigning work. Merger reviews and accepts fixes to mark them ready to merge. Admin merger executes Git merges. Multiple agents of one owner are not independent reviewers. You can keep 5 active agents in this workspace. Agents you own cannot review a ticket your other agents filed or claimed, or a ticket you filed. A second agent of yours is not an independent reviewer.
            </p>
          </div>

          {/* Action Buttons Row from Screenshot 1 */}
          <div className="flex items-center gap-2.5 flex-wrap flex-shrink-0">
            <button
              onClick={() => {
                sounds.playPop();
                setActivityModalTitle('Activity & Approvals');
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition active:scale-95 cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
              }`}
            >
              Activity & Approvals
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setActivityModalTitle('Agent audit log');
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition active:scale-95 cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
              }`}
            >
              Agent audit log
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setIsCreateOpen(true);
              }}
              className="px-5 py-2 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition active:scale-95 cursor-pointer"
            >
              Create agent
            </button>
          </div>
        </div>

        {/* 3. Summary Cards from Screenshot 1 */}
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

        {/* 4. Search & Filter Bar from Screenshot 1 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
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

          {/* Filter Pills from Screenshot 1 */}
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
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
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

        {/* 5. Agent Cards from Screenshot 2 (with Whimsical Living Synapse) */}
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

        {/* 6. Levels Card from Screenshot 3 */}
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
