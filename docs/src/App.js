This is excellent! I'll update the app with the complete rubric showing different requirements for Vlog vs Podcast, plus the two example scripts. Let me implement this:
Action: file_editor create /app/frontend/src/App.js --file-text "import { useState, useEffect } from \"react\";
import \"@/App.css\";
import { BrowserRouter, Routes, Route, useNavigate } from \"react-router-dom\";
import axios from \"axios\";
import { Mic, Video, Users, BookOpen, Target, Search, FileText, CheckCircle, Lock, Trash2, Eye, ChevronRight, PenTool, Sparkles, Globe, Play, RefreshCw, CheckSquare } from \"lucide-react\";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ============ UNIT 3 VOCABULARY ============
const UNIT3_VOCABULARY = {
  environment: [\"carbon footprint\", \"climate change\", \"electric cars\", \"endangered animals\", \"fossil fuels\", \"greenhouse gases\", \"household rubbish\", \"plastic packaging\", \"recycling bins\", \"solar energy\"],
  globalIssues: [\"animal rights\", \"climate change\", \"gender equality\", \"homelessness\", \"pandemic\", \"pollution\", \"poverty\", \"racism\"]
};

// ============ RUBRIC DATA ============
const RUBRIC = {
  vlog: {
    length: \"1:30–2:00\",
    speakingTime: \"25–40 seconds each OR 3+ lines\",
    facts: 4,
    causes: 2,
    effects: 2,
    solutions: 3,
    indefinitePronouns: 5,
    conditionals: { first: 2, second: 2, total: 4 },
    opinions: 2,
    persuasive: 1,
    roles: [
      { role: \"A - Anchor\", tasks: \"intro + problem + 1–2 facts\" },
      { role: \"B - Reporter\", tasks: \"causes/effects + indefinite pronouns + 1–2 facts\" },
      { role: \"C - Solutions\", tasks: \"solutions + conditionals + closing\" }
    ]
  },
  podcast: {
    length: \"2:00–3:00\",
    speakingTime: \"35–60 seconds each OR 4+ lines\",
    facts: 5,
    causes: \"2–3\",
    effects: \"2–3\",
    solutions: 4,
    indefinitePronouns: 6,
    conditionals: { first: 2, second: 3, total: 5 },
    opinions: 3,
    persuasive: 1,
    callToAction: 1,
    roles: [
      { role: \"A - Host\", tasks: \"intro + overview + 1–2 facts\" },
      { role: \"B - Co-host\", tasks: \"causes/effects + indefinite pronouns + 1–2 facts\" },
      { role: \"C - Co-host\", tasks: \"solutions + conditionals + closing + call to action\" }
    ]
  }
};

// ============ EXAMPLE SCRIPTS ============
const EXAMPLE_SCRIPTS = {
  vlog: `**Student A (Anchor)**
Hi, we are Group EcoWave. Today we're talking about plastic pollution in the ocean. This problem is serious in many coastal areas, and it affects animals, people, and tourism.
Fact one: a lot of plastic comes from single-use bottles and bags.
Fact two: plastic can stay in the sea for many years.
In my opinion, this is important because it damages nature and our health.

**Student B (Reporter)**
Fact three: many animals eat plastic because they think it is food.
Fact four: microplastics can enter the food chain.
This happens because people buy too much plastic and they don't recycle enough. Another cause is that some companies use too much packaging.
As a result, animals get injured and beaches become dirty. Also, communities can lose money from tourism.
**Everyone** is affected in some way, but **someone** needs to take action. If **nobody** helps, **nothing** will change. We must do **something** now.

**Student C (Solutions)**
We have three solutions. First, governments can limit single-use plastic. Second, schools and communities can organize clean-ups. Third, people can use reusable bottles and bags.
If we use reusable bottles, we **will** reduce plastic waste.
If schools teach recycling, students **will** change their habits.
If companies used less packaging, oceans **would** be cleaner.
If everyone brought a reusable bag, there **would** be less rubbish.
We should start today because small actions make a big difference. Thanks for watching!

✅ Conditionals: 2 first + 2 second
✅ Indefinite pronouns: everyone, someone, nobody, nothing, something`,

  podcast: `**Student A (Host)**
Welcome to our podcast. We are Group BrightFuture, and today's episode is about fast fashion. Fast fashion is cheap clothing made very quickly, and it is a problem in many countries because it creates waste and pollution.
Fact one: people often buy clothes they don't really need.
Fact two: many items are worn only a few times and then thrown away.
I believe this matters because it affects the environment and workers.

**Student B (Co-host)**
Let's break it down. Fact three: making clothes uses a lot of water and energy.
Fact four: some factories produce pollution that harms rivers.
Fact five: workers can have low pay and unsafe conditions.
This happens because companies want fast production and low costs, and people want cheap trends.
As a result, there is more landfill waste and more carbon emissions.
**Everyone** plays a role here. **Someone** might think one T-shirt is **nothing**, but it becomes **something** big when millions of people do it. If **nobody** changes, **nothing** improves.

**Student C (Co-host: solutions)**
So what can we do? Here are four solutions. First, governments can require better working conditions. Second, companies can reduce production and improve materials. Third, people can buy fewer, better-quality clothes. Fourth, we can swap, repair, or donate instead of throwing things away.
If we buy fewer clothes, we **will** reduce waste.
If schools talk about responsible shopping, students **will** think before buying.
If companies paid workers fairly, conditions **would** improve.
If people repaired clothes instead of replacing them, there **would** be less landfill.
If everyone chose quality over trends, the industry **would** change.
In my opinion, we should act now because our choices matter. Thanks for listening—see you next time!

✅ Conditionals: 2 first + 3 second
✅ Indefinite pronouns: everyone, someone, nothing, something, nobody`
};

// ============ LANDING PAGE ============
const Landing = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: \"\", members: [\"\", \"\", \"\"], projectType: \"podcast\" });
  const [error, setError] = useState(\"\");

  useEffect(() => { fetchGroups(); }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${API}/groups`);
      setGroups(res.data);
    } catch (e) { console.error(e); }
  };

  const createGroup = async () => {
    if (!newGroup.name.trim()) { setError(\"Please enter a group name\"); return; }
    const validMembers = newGroup.members.filter(m => m.trim());
    if (validMembers.length < 1) { setError(\"Add at least one member\"); return; }
    try {
      const res = await axios.post(`${API}/groups`, {
        group_name: newGroup.name,
        members: validMembers,
        project_type: newGroup.projectType
      });
      navigate(`/project/${res.data.id}`);
    } catch (e) { setError(e.response?.data?.detail || \"Error creating group\"); }
  };

  return (
    <div className=\"min-h-screen bg-[#F9FAFB] p-4 md:p-8\" data-testid=\"landing-page\">
      <div className=\"max-w-4xl mx-auto\">
        <header className=\"text-center mb-12\">
          <div className=\"inline-flex items-center gap-3 bg-black text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(139,92,246,1)] mb-6\">
            <Globe className=\"w-8 h-8\" />
            <span className=\"font-bold text-xl uppercase tracking-wider\">Unit 3</span>
          </div>
          <h1 className=\"text-3xl md:text-5xl font-bold tracking-tighter uppercase text-black mb-4\" style={{fontFamily: 'Outfit, sans-serif'}}>
            Global Issues:<br/>Making a Difference
          </h1>
          <p className=\"text-lg text-gray-600 max-w-xl mx-auto\">6 days, 6 steps. Complete your mission!</p>
        </header>

        <div className=\"flex flex-col md:flex-row gap-4 justify-center mb-12\">
          <button onClick={() => setShowCreate(true)} className=\"bg-[#A3E635] text-black border-2 border-black hover:bg-[#84cc16] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase tracking-wide py-4 px-8 flex items-center justify-center gap-2\" data-testid=\"create-group-btn\">
            <Users className=\"w-5 h-5\" /> New Group
          </button>
          <button onClick={() => navigate('/teacher')} className=\"bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase tracking-wide py-4 px-8 flex items-center justify-center gap-2\" data-testid=\"teacher-btn\">
            <Lock className=\"w-5 h-5\" /> Teacher Panel
          </button>
        </div>

        {showCreate && (
          <div className=\"fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50\" data-testid=\"create-group-modal\">
            <div className=\"bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto\">
              <h2 className=\"text-2xl font-bold uppercase mb-6 flex items-center gap-2\">
                <Sparkles className=\"w-6 h-6 text-[#8B5CF6]\" /> New Group
              </h2>
              {error && <div className=\"bg-red-100 border-2 border-red-500 p-3 mb-4 text-red-700 font-medium\">{error}</div>}
              <div className=\"space-y-4\">
                <div>
                  <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">Group Name</label>
                  <input type=\"text\" value={newGroup.name} onChange={(e) => setNewGroup({...newGroup, name: e.target.value})} className=\"w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]\" placeholder=\"E.g.: EcoWave\" data-testid=\"group-name-input\" />
                </div>
                <div>
                  <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">Project Type</label>
                  <div className=\"grid grid-cols-2 gap-3\">
                    <button type=\"button\" onClick={() => setNewGroup({...newGroup, projectType: 'podcast'})} className={`p-4 border-2 border-black flex flex-col items-center gap-2 ${newGroup.projectType === 'podcast' ? 'bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]' : 'bg-white hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`} data-testid=\"type-podcast-btn\">
                      <Mic className=\"w-8 h-8\" /><span className=\"font-bold text-sm\">Podcast</span><span className=\"text-xs opacity-75\">2:00-3:00</span>
                    </button>
                    <button type=\"button\" onClick={() => setNewGroup({...newGroup, projectType: 'vlog'})} className={`p-4 border-2 border-black flex flex-col items-center gap-2 ${newGroup.projectType === 'vlog' ? 'bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]' : 'bg-white hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`} data-testid=\"type-vlog-btn\">
                      <Video className=\"w-8 h-8\" /><span className=\"font-bold text-sm\">Video Blog</span><span className=\"text-xs opacity-75\">1:30-2:00</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">Members (3 students)</label>
                  {newGroup.members.map((m, i) => (
                    <input key={i} type=\"text\" value={m} onChange={(e) => { const members = [...newGroup.members]; members[i] = e.target.value; setNewGroup({...newGroup, members}); }} className=\"w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-2\" placeholder={`Student ${i + 1}`} data-testid={`member-input-${i}`} />
                  ))}
                </div>
              </div>
              <div className=\"flex gap-3 mt-6\">
                <button onClick={() => {setShowCreate(false); setError(\"\");}} className=\"flex-1 bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase py-3\" data-testid=\"cancel-create-btn\">Cancel</button>
                <button onClick={createGroup} className=\"flex-1 bg-black text-white border-2 border-black hover:bg-[#8B5CF6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase py-3\" data-testid=\"confirm-create-btn\">Create</button>
              </div>
            </div>
          </div>
        )}

        {groups.length > 0 && (
          <div>
            <h2 className=\"text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-2\"><BookOpen className=\"w-5 h-5\" /> Continue Project</h2>
            <div className=\"grid gap-4\">
              {groups.map(g => {
                const completed = [g.day1?.completed, g.day2?.completed, g.day3?.completed, g.day4?.completed, g.day5?.completed, g.day6?.completed].filter(Boolean).length;
                const isPodcast = g.project_type === 'podcast' || !g.project_type;
                return (
                  <button key={g.id} onClick={() => navigate(`/project/${g.id}`)} className=\"w-full bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all text-left flex items-center justify-between\" data-testid={`group-card-${g.id}`}>
                    <div className=\"flex items-center gap-3\">
                      {isPodcast ? <Mic className=\"w-5 h-5 text-[#8B5CF6]\" /> : <Video className=\"w-5 h-5 text-[#F472B6]\" />}
                      <div>
                        <h3 className=\"font-bold text-lg\">{g.group_name}</h3>
                        <p className=\"text-gray-600 text-sm\">{g.members?.join(\", \")}</p>
                      </div>
                    </div>
                    <div className=\"flex items-center gap-3\">
                      <div className=\"bg-[#A3E635] border-2 border-black px-3 py-1 font-bold text-sm\">{completed}/6</div>
                      <ChevronRight className=\"w-5 h-5\" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============ CHECKBOX ============
const Checkbox = ({ checked, onChange, label }) => (
  <label className=\"flex items-start gap-3 cursor-pointer p-3 hover:bg-gray-50 border-2 border-black mb-2 bg-white\">
    <button type=\"button\" onClick={() => onChange(!checked)} className={`w-6 h-6 border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5 ${checked ? 'bg-[#A3E635]' : 'bg-white'}`}>
      {checked && <CheckSquare className=\"w-5 h-5\" />}
    </button>
    <span className=\"text-sm\">{label}</span>
  </label>
);

// ============ PROJECT PAGE ============
const ProjectPage = () => {
  const navigate = useNavigate();
  const groupId = window.location.pathname.split('/').pop();
  const [group, setGroup] = useState(null);
  const [activeDay, setActiveDay] = useState(1);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetchGroup(); }, [groupId]);

  const fetchGroup = async () => {
    try {
      const res = await axios.get(`${API}/groups/${groupId}`);
      setGroup(res.data);
      const days = [res.data.day1, res.data.day2, res.data.day3, res.data.day4, res.data.day5, res.data.day6];
      const firstIncomplete = days.findIndex(d => !d?.completed);
      setActiveDay(firstIncomplete === -1 ? 6 : firstIncomplete + 1);
    } catch (e) { navigate('/'); }
  };

  const updateDay = (day, field, value) => {
    setGroup(prev => ({ ...prev, [`day${day}`]: { ...prev[`day${day}`], [field]: value } }));
    setSaved(false);
  };

  const saveDay = async (day) => {
    setSaving(true);
    try {
      await axios.put(`${API}/groups/${groupId}/day`, { day, data: group[`day${day}`] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const markComplete = async (day) => {
    const dayData = {...group[`day${day}`], completed: true};
    setSaving(true);
    try {
      await axios.put(`${API}/groups/${groupId}/day`, { day, data: dayData });
      setGroup(prev => ({ ...prev, [`day${day}`]: dayData }));
      if (day < 6) setActiveDay(day + 1);
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  if (!group) return <div className=\"min-h-screen bg-[#F9FAFB] flex items-center justify-center\"><div className=\"animate-pulse text-xl font-bold\">Loading...</div></div>;

  const isPodcast = group.project_type === 'podcast' || !group.project_type;
  const rubric = isPodcast ? RUBRIC.podcast : RUBRIC.vlog;
  const exampleScript = isPodcast ? EXAMPLE_SCRIPTS.podcast : EXAMPLE_SCRIPTS.vlog;

  const days = [
    { num: 1, title: \"Planning\", icon: Target, color: \"#8B5CF6\" },
    { num: 2, title: \"Research\", icon: Search, color: \"#F472B6\" },
    { num: 3, title: \"Language\", icon: BookOpen, color: \"#06B6D4\" },
    { num: 4, title: \"Script\", icon: PenTool, color: \"#F59E0B\" },
    { num: 5, title: \"Production\", icon: Play, color: \"#10B981\" },
    { num: 6, title: \"Reflection\", icon: RefreshCw, color: \"#A3E635\" },
  ];

  return (
    <div className=\"min-h-screen bg-[#F9FAFB]\" data-testid=\"project-page\">
      <header className=\"bg-black text-white p-4 border-b-4 border-[#A3E635]\">
        <div className=\"max-w-6xl mx-auto flex items-center justify-between\">
          <button onClick={() => navigate('/')} className=\"flex items-center gap-2 hover:text-[#A3E635]\">
            <Globe className=\"w-6 h-6\" /><span className=\"font-bold uppercase tracking-wider hidden md:inline\">Unit 3</span>
          </button>
          <div className=\"text-center\">
            <h1 className=\"font-bold text-lg flex items-center justify-center gap-2\">
              {isPodcast ? <Mic className=\"w-4 h-4\" /> : <Video className=\"w-4 h-4\" />}
              {group.group_name}
            </h1>
            <p className=\"text-sm text-gray-400\">{group.members?.join(\" • \")} | {isPodcast ? 'Podcast' : 'Vlog'} ({rubric.length})</p>
          </div>
          <div className=\"w-20\"></div>
        </div>
      </header>

      <div className=\"max-w-6xl mx-auto p-4 md:p-8\">
        <div className=\"grid grid-cols-1 md:grid-cols-12 gap-6\">
          {/* Navigation */}
          <div className=\"md:col-span-3\">
            <div className=\"bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4\">
              <h2 className=\"font-bold uppercase tracking-widest text-sm mb-4\">Steps</h2>
              <div className=\"space-y-2\">
                {days.map(d => {
                  const isComplete = group[`day${d.num}`]?.completed;
                  const isActive = activeDay === d.num;
                  return (
                    <button key={d.num} onClick={() => setActiveDay(d.num)} className={`w-full text-left p-3 border-2 border-black flex items-center gap-3 transition-all ${isActive ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]' : isComplete ? 'bg-[#A3E635]' : 'bg-white hover:bg-gray-100'}`} data-testid={`day-${d.num}-btn`}>
                      {isComplete ? <CheckCircle className=\"w-5 h-5 flex-shrink-0\" /> : <d.icon className=\"w-5 h-5 flex-shrink-0\" style={{color: isActive ? 'white' : d.color}} />}
                      <div><div className=\"font-bold text-sm\">Day {d.num}</div><div className=\"text-xs opacity-75\">{d.title}</div></div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className=\"md:col-span-9\">
            <div className=\"bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6\">
              
              {/* DAY 1 */}
              {activeDay === 1 && (
                <div data-testid=\"day-1-form\">
                  <h2 className=\"text-2xl font-bold uppercase mb-6 flex items-center gap-2\"><Target className=\"w-6 h-6 text-[#8B5CF6]\" /> Day 1: Planning</h2>
                  
                  <div className=\"bg-blue-50 border-2 border-black p-4 mb-6\">
                    <h3 className=\"font-bold text-sm mb-2\">🌍 Choose ONE Global Issue:</h3>
                    <div className=\"flex flex-wrap gap-2\">
                      {UNIT3_VOCABULARY.globalIssues.map(issue => (
                        <span key={issue} className=\"bg-white border border-black px-2 py-1 text-xs font-medium\">{issue}</span>
                      ))}
                    </div>
                  </div>

                  <div className=\"space-y-6\">
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">🎯 Your Topic</label>
                      <input type=\"text\" value={group.day1?.topic || \"\"} onChange={(e) => updateDay(1, 'topic', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]\" placeholder=\"e.g., Plastic pollution, Fast fashion, Climate change...\" data-testid=\"day1-topic\" />
                    </div>
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">📍 What + Where + Who it affects ({isPodcast ? '2 sentences' : '1 sentence'})</label>
                      <textarea value={group.day1?.why_this_topic || \"\"} onChange={(e) => updateDay(1, 'why_this_topic', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]\" placeholder=\"Example: Plastic pollution is a serious problem in coastal areas. It affects animals, people, and tourism.\" data-testid=\"day1-why\" />
                    </div>
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">📢 Main Message</label>
                      <textarea value={group.day1?.what_to_communicate || \"\"} onChange={(e) => updateDay(1, 'what_to_communicate', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]\" placeholder=\"What do you want people to do after watching/listening?\" data-testid=\"day1-communicate\" />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 2 */}
              {activeDay === 2 && (
                <div data-testid=\"day-2-form\">
                  <h2 className=\"text-2xl font-bold uppercase mb-6 flex items-center gap-2\"><Search className=\"w-6 h-6 text-[#F472B6]\" /> Day 2: Research</h2>
                  
                  <div className=\"bg-yellow-50 border-2 border-black p-4 mb-6\">
                    <h3 className=\"font-bold text-sm mb-2\">📋 Your {isPodcast ? 'Podcast' : 'Vlog'} needs:</h3>
                    <div className=\"grid grid-cols-2 md:grid-cols-4 gap-2 text-xs\">
                      <div className=\"bg-white border border-black p-2 text-center\"><div className=\"font-bold text-lg\">{rubric.facts}</div>Facts</div>
                      <div className=\"bg-white border border-black p-2 text-center\"><div className=\"font-bold text-lg\">{rubric.causes}</div>Causes</div>
                      <div className=\"bg-white border border-black p-2 text-center\"><div className=\"font-bold text-lg\">{rubric.effects}</div>Effects</div>
                      <div className=\"bg-white border border-black p-2 text-center\"><div className=\"font-bold text-lg\">{rubric.solutions}</div>Solutions</div>
                    </div>
                  </div>

                  <div className=\"space-y-6\">
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">🔍 Sources</label>
                      <textarea value={group.day2?.sources || \"\"} onChange={(e) => updateDay(2, 'sources', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]\" placeholder=\"List websites, videos, articles...\" data-testid=\"day2-sources\" />
                    </div>
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">📊 Facts ({rubric.facts} required)</label>
                      <textarea value={group.day2?.learnings || \"\"} onChange={(e) => updateDay(2, 'learnings', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[120px]\" placeholder=\"Fact 1:&#10;Fact 2:&#10;Fact 3:&#10;Fact 4:&#10;...\" data-testid=\"day2-learnings\" />
                    </div>
                    <div className=\"grid md:grid-cols-2 gap-4\">
                      <div>
                        <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">⚡ Causes ({rubric.causes})</label>
                        <textarea value={group.day2?.causes || \"\"} onChange={(e) => updateDay(2, 'causes', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]\" placeholder=\"Cause 1:&#10;Cause 2:\" data-testid=\"day2-causes\" />
                      </div>
                      <div>
                        <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">💥 Effects ({rubric.effects})</label>
                        <textarea value={group.day2?.effects || \"\"} onChange={(e) => updateDay(2, 'effects', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]\" placeholder=\"Effect 1:&#10;Effect 2:\" data-testid=\"day2-effects\" />
                      </div>
                    </div>
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">💡 Solutions ({rubric.solutions} required)</label>
                      <textarea value={group.day2?.target_audience || \"\"} onChange={(e) => updateDay(2, 'target_audience', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]\" placeholder=\"1. Big solution (government/global):&#10;2. Community/school solution:&#10;3. Personal solution:&#10;4. ...\" data-testid=\"day2-solutions\" />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 3 */}
              {activeDay === 3 && (
                <div data-testid=\"day-3-form\">
                  <h2 className=\"text-2xl font-bold uppercase mb-6 flex items-center gap-2\"><BookOpen className=\"w-6 h-6 text-[#06B6D4]\" /> Day 3: Language</h2>
                  
                  {/* GRAMMAR REQUIREMENTS */}
                  <div className=\"bg-red-50 border-2 border-black p-4 mb-6\">
                    <h3 className=\"font-bold text-sm uppercase mb-3\">⚠️ REQUIRED GRAMMAR for {isPodcast ? 'Podcast' : 'Vlog'}:</h3>
                    <div className=\"grid md:grid-cols-2 gap-4\">
                      <div className=\"bg-white border-2 border-black p-3\">
                        <h4 className=\"font-bold text-sm mb-2\">🔵 CONDITIONALS ({rubric.conditionals.total} total)</h4>
                        <p className=\"text-xs mb-2\"><strong>{rubric.conditionals.first}× First:</strong> \"If we ___, we <strong>will</strong> ___.\"</p>
                        <p className=\"text-xs\"><strong>{rubric.conditionals.second}× Second:</strong> \"If people ___, they <strong>would</strong> ___.\"</p>
                      </div>
                      <div className=\"bg-white border-2 border-black p-3\">
                        <h4 className=\"font-bold text-sm mb-2\">🟣 INDEFINITE PRONOUNS ({rubric.indefinitePronouns} total)</h4>
                        <p className=\"text-xs\">someone, anyone, <strong>everyone</strong>, nobody, <strong>something</strong>, anything, <strong>everything</strong>, <strong>nothing</strong>, somewhere, anywhere, <strong>everywhere</strong>, nowhere</p>
                      </div>
                    </div>
                  </div>

                  {/* TEMPLATES */}
                  <div className=\"bg-green-50 border-2 border-black p-4 mb-6\">
                    <h3 className=\"font-bold text-sm uppercase mb-2\">📝 EASY TEMPLATES - Copy these!</h3>
                    <div className=\"grid md:grid-cols-2 gap-4 text-xs\">
                      <div>
                        <p className=\"font-bold mb-1\">Conditionals:</p>
                        <p className=\"bg-white p-2 border border-gray-300 mb-1\">\"If we use reusable bottles, we <strong>will</strong> reduce waste.\"</p>
                        <p className=\"bg-white p-2 border border-gray-300\">\"If everyone recycled, there <strong>would</strong> be less pollution.\"</p>
                      </div>
                      <div>
                        <p className=\"font-bold mb-1\">Indefinite Pronouns:</p>
                        <p className=\"bg-white p-2 border border-gray-300 mb-1\">\"<strong>Everyone</strong> is affected.\"</p>
                        <p className=\"bg-white p-2 border border-gray-300 mb-1\">\"<strong>Someone</strong> should do <strong>something</strong>.\"</p>
                        <p className=\"bg-white p-2 border border-gray-300\">\"If <strong>nobody</strong> acts, <strong>nothing</strong> changes.\"</p>
                      </div>
                    </div>
                  </div>

                  {/* VOCABULARY */}
                  <div className=\"bg-blue-50 border-2 border-black p-4 mb-6\">
                    <h3 className=\"font-bold text-sm uppercase mb-2\">📖 UNIT 3 VOCABULARY - Use these words!</h3>
                    <div className=\"flex flex-wrap gap-1\">
                      {UNIT3_VOCABULARY.environment.map(w => (
                        <span key={w} className=\"bg-white border border-gray-300 px-2 py-0.5 text-xs\">{w}</span>
                      ))}
                    </div>
                  </div>

                  {/* CHECKLIST */}
                  <div className=\"space-y-4 mb-6\">
                    <Checkbox checked={group.day3?.grammar_second_conditional || false} onChange={(v) => updateDay(3, 'grammar_second_conditional', v)} label={<span>I wrote <strong>{rubric.conditionals.total} conditionals</strong> ({rubric.conditionals.first} first + {rubric.conditionals.second} second)</span>} />
                    <Checkbox checked={group.day3?.grammar_indefinite_pronouns || false} onChange={(v) => updateDay(3, 'grammar_indefinite_pronouns', v)} label={<span>I used <strong>{rubric.indefinitePronouns} indefinite pronouns</strong></span>} />
                    <Checkbox checked={group.day3?.grammar_compound_nouns || false} onChange={(v) => updateDay(3, 'grammar_compound_nouns', v)} label={<span>I used <strong>compound nouns</strong> from Unit 3</span>} />
                  </div>

                  {/* ROLES */}
                  <div className=\"bg-purple-50 border-2 border-black p-4 mb-6\">
                    <h3 className=\"font-bold text-sm uppercase mb-2\">👥 ROLES - Who says what?</h3>
                    <div className=\"space-y-2\">
                      {rubric.roles.map((r, i) => (
                        <div key={i} className=\"bg-white border border-black p-2 text-sm\">
                          <strong>{r.role}:</strong> {r.tasks}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className=\"space-y-6\">
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">📝 Write your CONDITIONALS here ({rubric.conditionals.total} sentences)</label>
                      <textarea value={group.day3?.introduction || \"\"} onChange={(e) => updateDay(3, 'introduction', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[120px]\" placeholder=\"1st conditional: If we..., we will...&#10;1st conditional: If..., ... will...&#10;2nd conditional: If..., ... would...&#10;2nd conditional: If..., ... would...\" data-testid=\"day3-conditionals\" />
                    </div>
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">📝 Write your INDEFINITE PRONOUNS sentences ({rubric.indefinitePronouns} uses)</label>
                      <textarea value={group.day3?.development || \"\"} onChange={(e) => updateDay(3, 'development', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[120px]\" placeholder=\"Everyone is affected...&#10;Someone should do something...&#10;If nobody acts, nothing changes...\" data-testid=\"day3-pronouns\" />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 4 */}
              {activeDay === 4 && (
                <div data-testid=\"day-4-form\">
                  <h2 className=\"text-2xl font-bold uppercase mb-6 flex items-center gap-2\"><PenTool className=\"w-6 h-6 text-[#F59E0B]\" /> Day 4: Script</h2>
                  
                  {/* REQUIREMENTS SUMMARY */}
                  <div className=\"bg-yellow-50 border-2 border-black p-4 mb-6\">
                    <h3 className=\"font-bold text-sm uppercase mb-2\">📋 {isPodcast ? 'PODCAST' : 'VLOG'} REQUIREMENTS:</h3>
                    <div className=\"grid grid-cols-2 md:grid-cols-4 gap-2 text-xs\">
                      <div className=\"bg-white border border-black p-2 text-center\"><strong>Length:</strong><br/>{rubric.length}</div>
                      <div className=\"bg-white border border-black p-2 text-center\"><strong>Each person:</strong><br/>{rubric.speakingTime}</div>
                      <div className=\"bg-white border border-black p-2 text-center\"><strong>Conditionals:</strong><br/>{rubric.conditionals.total} total</div>
                      <div className=\"bg-white border border-black p-2 text-center\"><strong>Indef. Pronouns:</strong><br/>{rubric.indefinitePronouns} total</div>
                    </div>
                  </div>

                  {/* STRUCTURE */}
                  <div className=\"bg-blue-50 border-2 border-black p-4 mb-6\">
                    <h3 className=\"font-bold text-sm uppercase mb-2\">📝 REQUIRED STRUCTURE:</h3>
                    <ol className=\"text-xs space-y-1 list-decimal list-inside\">
                      {isPodcast ? (
                        <>
                          <li>Welcome + topic + episode goal</li>
                          <li>Explain the problem simply</li>
                          <li>Facts (5) + source if possible</li>
                          <li>Causes (2-3) + effects (2-3)</li>
                          <li><strong>Indefinite pronouns block</strong> (2-3 sentences)</li>
                          <li><strong>Conditionals block</strong> (5 lines)</li>
                          <li>Solutions (4) + call-to-action + outro</li>
                        </>
                      ) : (
                        <>
                          <li>Greeting + topic</li>
                          <li>Problem + where + who</li>
                          <li>Facts (4)</li>
                          <li>Causes (2) + effects (2)</li>
                          <li><strong>Indefinite pronouns block</strong> (1-2 sentences)</li>
                          <li><strong>Conditionals block</strong> (4 lines)</li>
                          <li>Solutions (3) + closing</li>
                        </>
                      )}
                    </ol>
                  </div>

                  {/* EXAMPLE SCRIPT */}
                  <div className=\"bg-green-50 border-2 border-black p-4 mb-6\">
                    <h3 className=\"font-bold text-sm uppercase mb-2\">✅ COMPLETE EXAMPLE ({isPodcast ? 'Podcast - Fast Fashion' : 'Vlog - Plastic Pollution'}):</h3>
                    <div className=\"bg-white border border-gray-300 p-3 max-h-80 overflow-y-auto\">
                      <pre className=\"whitespace-pre-wrap text-xs font-mono\">{exampleScript}</pre>
                    </div>
                  </div>

                  {/* SENTENCE STARTERS */}
                  <div className=\"bg-purple-50 border-2 border-black p-4 mb-6\">
                    <h3 className=\"font-bold text-sm uppercase mb-2\">💬 SENTENCE STARTERS - Use these!</h3>
                    <div className=\"flex flex-wrap gap-2 text-xs\">
                      {isPodcast ? (
                        <>
                          <span className=\"bg-white border border-black px-2 py-1\">\"In today's episode...\"</span>
                          <span className=\"bg-white border border-black px-2 py-1\">\"Let's break it down...\"</span>
                          <span className=\"bg-white border border-black px-2 py-1\">\"The main problem is...\"</span>
                          <span className=\"bg-white border border-black px-2 py-1\">\"This leads to...\"</span>
                          <span className=\"bg-white border border-black px-2 py-1\">\"What can we do?\"</span>
                        </>
                      ) : (
                        <>
                          <span className=\"bg-white border border-black px-2 py-1\">\"Today we're talking about...\"</span>
                          <span className=\"bg-white border border-black px-2 py-1\">\"One fact is...\"</span>
                          <span className=\"bg-white border border-black px-2 py-1\">\"This happens because...\"</span>
                          <span className=\"bg-white border border-black px-2 py-1\">\"As a result...\"</span>
                          <span className=\"bg-white border border-black px-2 py-1\">\"A solution is...\"</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className=\"space-y-6\">
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">📄 YOUR COMPLETE SCRIPT</label>
                      <textarea value={group.day4?.draft_script || \"\"} onChange={(e) => updateDay(4, 'draft_script', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[400px] font-mono text-sm\" placeholder={`**Student A (${isPodcast ? 'Host' : 'Anchor'})**\n[Write their part here...]\n\n**Student B (${isPodcast ? 'Co-host' : 'Reporter'})**\n[Write their part here...]\n\n**Student C (${isPodcast ? 'Co-host: solutions' : 'Solutions'})**\n[Write their part here...]`} data-testid=\"day4-script\" />
                    </div>
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">⏱️ Total Duration (must be {rubric.length})</label>
                      <input type=\"text\" value={group.day4?.estimated_duration || \"\"} onChange={(e) => updateDay(4, 'estimated_duration', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]\" placeholder=\"e.g., 2 minutes 15 seconds\" data-testid=\"day4-duration\" />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 5 */}
              {activeDay === 5 && (
                <div data-testid=\"day-5-form\">
                  <h2 className=\"text-2xl font-bold uppercase mb-6 flex items-center gap-2\"><Play className=\"w-6 h-6 text-[#10B981]\" /> Day 5: Production</h2>
                  
                  <div className=\"bg-green-50 border-2 border-black p-4 mb-6\">
                    <h3 className=\"font-bold text-sm uppercase mb-2\">🛠️ FREE TOOLS:</h3>
                    <div className=\"grid md:grid-cols-2 gap-4 text-xs\">
                      <div><p className=\"font-bold\">📻 Podcast:</p><p>Phone voice recorder, Audacity, Anchor.fm</p></div>
                      <div><p className=\"font-bold\">🎬 Video:</p><p>Phone camera, CapCut, Canva Video</p></div>
                    </div>
                  </div>

                  <div className=\"space-y-6\">
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">🎭 Rehearsal Notes</label>
                      <textarea value={group.day5?.rehearsal_notes || \"\"} onChange={(e) => updateDay(5, 'rehearsal_notes', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]\" placeholder=\"How many times did you practice? What improved?\" data-testid=\"day5-rehearsal\" />
                    </div>
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">🛠️ Tools Used</label>
                      <input type=\"text\" value={group.day5?.production_tools || \"\"} onChange={(e) => updateDay(5, 'production_tools', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]\" placeholder=\"e.g., Phone camera, CapCut...\" data-testid=\"day5-tools\" />
                    </div>
                    <div className=\"bg-[#A3E635] border-2 border-black p-4\">
                      <h3 className=\"font-bold text-sm uppercase mb-2\">🎉 SUBMIT YOUR {isPodcast ? 'PODCAST' : 'VLOG'}!</h3>
                      <p className=\"text-xs\">Upload and paste the link below.</p>
                    </div>
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">🔗 Link</label>
                      <input type=\"url\" value={group.day5?.media_link || \"\"} onChange={(e) => updateDay(5, 'media_link', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]\" placeholder=\"https://...\" data-testid=\"day5-link\" />
                    </div>
                  </div>
                </div>
              )}

              {/* DAY 6 */}
              {activeDay === 6 && (
                <div data-testid=\"day-6-form\">
                  <h2 className=\"text-2xl font-bold uppercase mb-6 flex items-center gap-2\"><RefreshCw className=\"w-6 h-6 text-[#A3E635]\" /> Day 6: Reflection</h2>
                  <div className=\"space-y-6\">
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">📚 What did you learn?</label>
                      <textarea value={group.day6?.what_learned || \"\"} onChange={(e) => updateDay(6, 'what_learned', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]\" placeholder=\"About the topic? About English? About making videos/podcasts?\" data-testid=\"day6-learned\" />
                    </div>
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">⚡ What was difficult?</label>
                      <textarea value={group.day6?.challenges_faced || \"\"} onChange={(e) => updateDay(6, 'challenges_faced', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]\" placeholder=\"What challenges did you face?\" data-testid=\"day6-challenges\" />
                    </div>
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">👥 How did you work as a team?</label>
                      <textarea value={group.day6?.team_collaboration || \"\"} onChange={(e) => updateDay(6, 'team_collaboration', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]\" placeholder=\"Who did what?\" data-testid=\"day6-team\" />
                    </div>
                    <div>
                      <label className=\"text-sm font-bold uppercase tracking-widest block mb-2\">⭐ Rate your experience (1-10)</label>
                      <textarea value={group.day6?.overall_experience || \"\"} onChange={(e) => updateDay(6, 'overall_experience', e.target.value)} className=\"w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]\" placeholder=\"Rate 1-10 and explain...\" data-testid=\"day6-experience\" />
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className=\"flex flex-col md:flex-row gap-3 mt-8 pt-6 border-t-2 border-black\">
                <button onClick={() => saveDay(activeDay)} disabled={saving} className=\"flex-1 bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase py-3 flex items-center justify-center gap-2 disabled:opacity-50\" data-testid=\"save-btn\">
                  <FileText className=\"w-5 h-5\" /> {saving ? \"Saving...\" : saved ? \"Saved!\" : \"Save\"}
                </button>
                <button onClick={() => markComplete(activeDay)} disabled={saving} className=\"flex-1 bg-[#A3E635] text-black border-2 border-black hover:bg-[#84cc16] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase py-3 flex items-center justify-center gap-2 disabled:opacity-50\" data-testid=\"complete-btn\">
                  <CheckCircle className=\"w-5 h-5\" /> Complete Day {activeDay}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ TEACHER DASHBOARD ============
const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState(\"\");
  const [error, setError] = useState(\"\");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const login = async () => {
    try { await axios.post(`${API}/teacher/login`, { password }); setAuthenticated(true); fetchGroups(); }
    catch (e) { setError(\"Incorrect password\"); }
  };

  const fetchGroups = async () => { try { const res = await axios.get(`${API}/groups`); setGroups(res.data); } catch (e) { console.error(e); } };
  const deleteGroup = async (id) => { if (!window.confirm(\"Delete this group?\")) return; try { await axios.delete(`${API}/groups/${id}`); setGroups(groups.filter(g => g.id !== id)); if (selectedGroup?.id === id) setSelectedGroup(null); } catch (e) { console.error(e); } };

  if (!authenticated) {
    return (
      <div className=\"min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4\" data-testid=\"teacher-login\">
        <div className=\"bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md\">
          <h1 className=\"text-2xl font-bold uppercase mb-6 flex items-center gap-2\"><Lock className=\"w-6 h-6\" /> Teacher Panel</h1>
          {error && <div className=\"bg-red-100 border-2 border-red-500 p-3 mb-4 text-red-700\">{error}</div>}
          <input type=\"password\" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && login()} className=\"w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4\" placeholder=\"Password\" data-testid=\"teacher-password\" />
          <button onClick={login} className=\"w-full bg-black text-white border-2 border-black hover:bg-[#8B5CF6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase py-3\" data-testid=\"teacher-login-btn\">Enter</button>
          <button onClick={() => navigate('/')} className=\"w-full mt-3 text-gray-600 hover:text-black\">← Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-[#F9FAFB]\" data-testid=\"teacher-dashboard\">
      <header className=\"bg-black text-white p-4 border-b-4 border-[#8B5CF6]\">
        <div className=\"max-w-7xl mx-auto flex items-center justify-between\">
          <div className=\"flex items-center gap-2\"><Lock className=\"w-6 h-6\" /><span className=\"font-bold uppercase\">Teacher Panel</span></div>
          <button onClick={() => navigate('/')} className=\"hover:text-[#A3E635]\">← Exit</button>
        </div>
      </header>

      <div className=\"max-w-7xl mx-auto p-4 md:p-8\">
        <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-6\">
          <div className=\"lg:col-span-1\">
            <div className=\"bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4\">
              <h2 className=\"font-bold uppercase text-sm mb-4\">Groups ({groups.length})</h2>
              {groups.length === 0 ? <p className=\"text-gray-500 text-sm\">No groups yet</p> : (
                <div className=\"space-y-2\">
                  {groups.map(g => {
                    const completed = [g.day1?.completed, g.day2?.completed, g.day3?.completed, g.day4?.completed, g.day5?.completed, g.day6?.completed].filter(Boolean).length;
                    const isPodcast = g.project_type === 'podcast' || !g.project_type;
                    return (
                      <div key={g.id} className={`border-2 border-black p-3 cursor-pointer ${selectedGroup?.id === g.id ? 'bg-[#8B5CF6] text-white' : 'bg-white hover:bg-gray-100'}`} onClick={() => setSelectedGroup(g)} data-testid={`teacher-group-${g.id}`}>
                        <div className=\"flex justify-between items-start\">
                          <div className=\"flex items-center gap-2\">
                            {isPodcast ? <Mic className=\"w-4 h-4\" /> : <Video className=\"w-4 h-4\" />}
                            <div><h3 className=\"font-bold\">{g.group_name}</h3><p className=\"text-xs opacity-75\">{g.members?.join(\", \")}</p></div>
                          </div>
                          <div className={`px-2 py-1 text-xs font-bold border-2 ${selectedGroup?.id === g.id ? 'border-white' : 'border-black bg-[#A3E635]'}`}>{completed}/6</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className=\"lg:col-span-2\">
            {selectedGroup ? (
              <div className=\"bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 max-h-[80vh] overflow-y-auto\">
                <div className=\"flex justify-between items-start mb-6 pb-4 border-b-2 border-black\">
                  <div>
                    <h2 className=\"text-2xl font-bold\">{selectedGroup.group_name}</h2>
                    <p className=\"text-gray-600\">{selectedGroup.members?.join(\" • \")}</p>
                    <p className=\"text-sm text-gray-500\">{(selectedGroup.project_type === 'podcast' || !selectedGroup.project_type) ? 'Podcast (2:00-3:00)' : 'Vlog (1:30-2:00)'}</p>
                  </div>
                  <button onClick={() => deleteGroup(selectedGroup.id)} className=\"bg-red-500 text-white border-2 border-black p-2\" data-testid=\"delete-group-btn\"><Trash2 className=\"w-5 h-5\" /></button>
                </div>
                <div className=\"space-y-4\">
                  {[1, 2, 3, 4, 5, 6].map(day => {
                    const dayData = selectedGroup[`day${day}`];
                    const isComplete = dayData?.completed;
                    const titles = [\"Planning\", \"Research\", \"Language\", \"Script\", \"Production\", \"Reflection\"];
                    return (
                      <div key={day} className={`border-2 border-black p-4 ${isComplete ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <div className=\"flex items-center gap-2 mb-3\">
                          {isComplete ? <CheckCircle className=\"w-5 h-5 text-green-600\" /> : <div className=\"w-5 h-5 border-2 border-black rounded-full\" />}
                          <h3 className=\"font-bold\">Day {day}: {titles[day-1]}</h3>
                        </div>
                        {day === 1 && dayData && (<div className=\"text-sm space-y-1\"><p><strong>Topic:</strong> {dayData.topic || \"-\"}</p><p><strong>Context:</strong> {dayData.why_this_topic || \"-\"}</p><p><strong>Message:</strong> {dayData.what_to_communicate || \"-\"}</p></div>)}
                        {day === 2 && dayData && (<div className=\"text-sm space-y-1\"><p><strong>Sources:</strong> {dayData.sources || \"-\"}</p><p><strong>Facts:</strong> {dayData.learnings || \"-\"}</p><p><strong>Causes:</strong> {dayData.causes || \"-\"}</p><p><strong>Effects:</strong> {dayData.effects || \"-\"}</p><p><strong>Solutions:</strong> {dayData.target_audience || \"-\"}</p></div>)}
                        {day === 3 && dayData && (<div className=\"text-sm space-y-1\"><p><strong>Grammar:</strong> {[dayData.grammar_second_conditional && \"Conditionals ✓\", dayData.grammar_indefinite_pronouns && \"Indef. Pronouns ✓\", dayData.grammar_compound_nouns && \"Compound Nouns ✓\"].filter(Boolean).join(\", \") || \"-\"}</p><p><strong>Conditionals:</strong> {dayData.introduction || \"-\"}</p><p><strong>Indef. Pronouns:</strong> {dayData.development || \"-\"}</p></div>)}
                        {day === 4 && dayData && (<div className=\"text-sm space-y-1\"><p><strong>Duration:</strong> {dayData.estimated_duration || \"-\"}</p><p><strong>Script:</strong></p><pre className=\"bg-white border p-2 whitespace-pre-wrap text-xs max-h-40 overflow-y-auto\">{dayData.draft_script || \"-\"}</pre></div>)}
                        {day === 5 && dayData && (<div className=\"text-sm space-y-1\"><p><strong>Rehearsal:</strong> {dayData.rehearsal_notes || \"-\"}</p><p><strong>Tools:</strong> {dayData.production_tools || \"-\"}</p>{dayData.media_link && <p><strong>Link:</strong> <a href={dayData.media_link} target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-blue-600 underline\">{dayData.media_link}</a></p>}</div>)}
                        {day === 6 && dayData && (<div className=\"text-sm space-y-1\"><p><strong>Learned:</strong> {dayData.what_learned || \"-\"}</p><p><strong>Challenges:</strong> {dayData.challenges_faced || \"-\"}</p><p><strong>Teamwork:</strong> {dayData.team_collaboration || \"-\"}</p><p><strong>Experience:</strong> {dayData.overall_experience || \"-\"}</p></div>)}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className=\"bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-12 text-center\">
                <Eye className=\"w-12 h-12 mx-auto mb-4 text-gray-400\" /><p className=\"text-gray-500\">Select a group to view</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className=\"App\" style={{fontFamily: 'Manrope, sans-serif'}}>
      <BrowserRouter>
        <Routes>
          <Route path=\"/\" element={<Landing />} />
          <Route path=\"/project/:id\" element={<ProjectPage />} />
          <Route path=\"/teacher\" element={<TeacherDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
"
Observation: Overwrite successful: /app/frontend/src/App.js
