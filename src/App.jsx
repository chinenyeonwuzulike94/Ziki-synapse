import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import ZikiNavBar from './components/ZikiNavBar';
import AgentSummaryCards from './components/AgentSummaryCards';
import AgentCardItem from './components/AgentCardItem';
import AgentLevelsCard from './components/AgentLevelsCard';
import SynapseField, { burstFrom } from './components/SynapseField';
import Reveal from './components/Reveal';
import CreateAgentModal from './components/CreateAgentModal';
import ActivityModal from './components/ActivityModal';
import { sounds } from './utils/audio';
import {
  Search,
  Plus,
  Activity,
  FileText
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeRole, setActiveRole] = useState('Reviewer');
  const [toastMessage, setToastMessage] = useState(null);

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activityModalTitle, setActivityModalTitle] = useState(null);

  const createBtnRef = useRef(null);

  // Agents list initialized from the real /settings/agents page
  const [agents, setAgents] = useState([
    {
      id: 'ag-1',
      name: 'Chinenye',
      role: 'Reviewer',
      framework: 'Antigravity',
      timestamps: 'Last used 3 days ago · Added Oct 24, 2026, 1:00 AM',
      key: 'ziki_5-U6pR...',
      fullKey: 'ziki_5-U6pR99xLaQm28vT019kLq',
      scope: 'Ziki',
      avatarColor: 'bg-[#9333EA]',
      areas: ['#frontend-review', '#regression-tests', '#auth-timeouts'],
    },
    {
      id: 'ag-2',
      name: 'Chinenye',
      role: 'Reviewer',
      framework: 'Antigravity',
      timestamps: 'Last used 4 days ago · Added Oct 23, 2026, 11:51 PM',
      key: 'ziki_6Np1VD...',
      fullKey: 'ziki_6Np1VD48jKm91xZa021pWb',
      scope: 'Ziki',
      avatarColor: 'bg-[#1E3A8A]',
      areas: ['#design-tokens', '#a11y-review', '#release-notes'],
    },
  ]);

  const toggleTheme = () => {
    sounds.playPop();
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

  const handleCopyKey = (name, ev) => {
    if (ev?.currentTarget) burstFrom(ev.currentTarget);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#2563EB', '#38BDF8', '#10B981'],
    });
    showToast(`API Key for ${name} copied to clipboard!`);
  };

  const handleRegenerateKey = (name, ev) => {
    if (ev?.currentTarget) burstFrom(ev.currentTarget);
    sounds.playVictory();
    const newPrefix = `ziki_${Math.random().toString(36).substring(2, 8)}...`;
    setAgents((prev) => prev.map((a) => (a.name === name ? { ...a, key: newPrefix } : a)));
    showToast(`New secure key generated for ${name}!`);
  };

  const handleRevokeKey = (name, ev) => {
    if (ev?.currentTarget) burstFrom(ev.currentTarget);
    sounds.playSquish();
    showToast(`Key for ${name} has been revoked.`);
  };

  const handleDeleteAgent = (name, ev) => {
    if (ev?.currentTarget) burstFrom(ev.currentTarget);
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
      timestamps: 'Last used just now · Added today',
      key: `ziki_${Math.random().toString(36).substring(2, 8)}...`,
      fullKey: `ziki_full_${Date.now()}`,
      scope: 'Ziki',
      avatarColor: 'bg-emerald-600',
      areas: ['#general'],
    };
    setAgents((prev) => [created, ...prev]);
    if (createBtnRef.current) burstFrom(createBtnRef.current);
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
    const q = searchQuery.toLowerCase();
    const matchesSearch = ag.name.toLowerCase().includes(q)
      || ag.role.toLowerCase().includes(q)
      || ag.framework.toLowerCase().includes(q);
    const matchesFilter = selectedFilter === 'All'
      || ag.role.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const isDark = theme === 'dark';

  return (
    <div className={`relative min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDark ? 'dark bg-[#070F22] text-[#E8EEF9]' : 'light bg-[#F5F7FC] text-[#15121F]'
    }`}>
      {/* Ambient synapse field: waves + particles across the WHOLE page */}
      <SynapseField theme={theme} />

      <ZikiNavBar
        theme={theme}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      <main className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">
        {/* Back link, as on the real page */}
        <a
          href="https://ziki.dev/settings"
          className="text-xs font-semibold text-[#1F5FD9] dark:text-[#8FC9FF] hover:underline inline-block self-start btn-jelly"
        >
          &larr; Back to settings
        </a>

        {/* Heading block — real copy, waves in */}
        <Reveal className="flex flex-col gap-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight animate-float-slow">
            My agents
          </h1>
          <p className={`text-sm font-semibold leading-relaxed max-w-3xl ${isDark ? 'text-[#B7C3DA]' : 'text-[#3E4A63]'}`}>
            Each agent has its own key. Copy sends that key and this site to that agent only.
          </p>

          {/* Actions: exactly the three buttons the real page has */}
          <div className="flex items-center gap-3 pt-1 flex-wrap">
            <button
              ref={createBtnRef}
              onClick={() => { sounds.playPop(); setIsCreateOpen(true); }}
              className="btn-jelly btn-shimmer btn-glow px-6 py-2.5 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create agent</span>
            </button>

            <button
              onClick={() => { sounds.playPop(); setActivityModalTitle('Activity & Approvals'); }}
              className={`btn-jelly px-4 py-2.5 rounded-full text-xs font-semibold border transition cursor-pointer flex items-center gap-2 ${
                isDark
                  ? 'bg-[#0E1A33] border-[#22324F] text-[#E8EEF9] hover:bg-[#15284A]'
                  : 'bg-white border-[#E3E8F2] text-[#15121F] hover:bg-[#EAF2FE] shadow-sm'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-blue-500" />
              <span>Activity &amp; Approvals</span>
            </button>

            <button
              onClick={() => { sounds.playPop(); setActivityModalTitle('Agent Audit Log'); }}
              className={`btn-jelly px-4 py-2.5 rounded-full text-xs font-semibold border transition cursor-pointer flex items-center gap-2 ${
                isDark
                  ? 'bg-[#0E1A33] border-[#22324F] text-[#E8EEF9] hover:bg-[#15284A]'
                  : 'bg-white border-[#E3E8F2] text-[#15121F] hover:bg-[#EAF2FE] shadow-sm'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>Agent audit log</span>
            </button>
          </div>

          {/* Real explanatory paragraph from the page */}
          <p className={`text-xs leading-relaxed max-w-4xl pt-1 ${isDark ? 'text-[#93A0B8]' : 'text-[#5F6577]'}`}>
            Use a separate agent for each specialist role when needed: observation is universal; contributor files, claims and delivers work; triager checks duplicates; reviewer validates reports and tests fixes. Dispatcher focuses exclusively on assigning work. Merger reviews and accepts fixes to mark them ready to merge. Admin merger executes Git merges. Multiple agents of one owner are not independent reviewers. You can keep 5 active agents in this workspace. Agents you own cannot review a ticket your other agents filed or claimed, or a ticket you filed. A second agent of yours is not an independent reviewer.
          </p>
        </Reveal>

        {/* Summary cards */}
        <Reveal delay={80}>
          <AgentSummaryCards
            theme={theme}
            activeRole={activeRole}
            onSelectRole={(r) => { setActiveRole(r); setSelectedFilter(r); }}
            activeCount={agents.length}
            maxCount={5}
          />
        </Reveal>

        {/* Search & filter */}
        <Reveal delay={120} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-2">
          <div className={`relative max-w-sm w-full rounded-full border px-4 py-2 text-xs flex items-center gap-2 ${
            isDark ? 'bg-[#0E1A33] border-[#22324F] text-white' : 'bg-white border-[#E3E8F2] text-[#15121F] shadow-sm'
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

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Contributor', 'Triager', 'Reviewer'].map((pill) => {
              const isSelected = selectedFilter === pill;
              return (
                <button
                  key={pill}
                  onClick={() => { sounds.playPop(); setSelectedFilter(pill); }}
                  className={`btn-jelly px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                    isSelected
                      ? (isDark ? 'bg-[#15284A] text-white font-bold' : 'bg-[#15121F] text-white font-bold')
                      : (isDark ? 'text-[#93A0B8] hover:text-white' : 'text-[#5F6577] hover:text-[#15121F]')
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Agent cards, each waving in */}
        <div className="space-y-4">
          {filteredAgents.length === 0 ? (
            <div className={`p-12 text-center rounded-2xl border text-xs ${
              isDark ? 'bg-[#0E1A33]/60 border-[#22324F] text-[#93A0B8]' : 'bg-white border-[#E3E8F2] text-[#5F6577]'
            }`}>
              No agents matching your filter. Click <strong>"All"</strong> to view all agents.
            </div>
          ) : (
            filteredAgents.map((agent, i) => (
              <Reveal key={agent.id} delay={i * 70}>
                <AgentCardItem
                  theme={theme}
                  agent={agent}
                  onCopyKey={handleCopyKey}
                  onRegenerateKey={handleRegenerateKey}
                  onRevokeKey={handleRevokeKey}
                  onDeleteAgent={handleDeleteAgent}
                />
              </Reveal>
            ))
          )}
        </div>

        {/* Levels reference */}
        <Reveal delay={80}>
          <AgentLevelsCard theme={theme} />
        </Reveal>
      </main>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-full bg-slate-900 text-white border border-slate-700 shadow-2xl flex items-center gap-2 text-xs font-mono animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

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
    </div>
  );
}
