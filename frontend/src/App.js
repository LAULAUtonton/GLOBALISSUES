import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mic, Video, Users, BookOpen, Target, Search, MessageSquare, FileText, CheckCircle, Lock, Trash2, Eye, ChevronRight, PenTool, Sparkles, Globe, Play, RefreshCw, CheckSquare, Square } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ============ LANDING PAGE ============
const Landing = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", members: ["", "", ""], projectType: "podcast" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${API}/groups`);
      setGroups(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const createGroup = async () => {
    if (!newGroup.name.trim()) {
      setError("Please enter a group name");
      return;
    }
    const validMembers = newGroup.members.filter(m => m.trim());
    if (validMembers.length < 1) {
      setError("Add at least one member");
      return;
    }
    try {
      const res = await axios.post(`${API}/groups`, {
        group_name: newGroup.name,
        members: validMembers,
        project_type: newGroup.projectType
      });
      navigate(`/project/${res.data.id}`);
    } catch (e) {
      setError(e.response?.data?.detail || "Error creating group");
    }
  };

  const selectGroup = (id) => {
    navigate(`/project/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8" data-testid="landing-page">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(139,92,246,1)] mb-6">
            <Globe className="w-8 h-8" />
            <span className="font-bold text-xl uppercase tracking-wider">The Studio</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-black mb-4" style={{fontFamily: 'Outfit, sans-serif'}}>
            Global Issues:<br/>Making a Difference
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto" style={{fontFamily: 'Manrope, sans-serif'}}>
            Create your podcast or video log step by step. 6 days, 6 levels. Complete your mission!
          </p>
        </header>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => setShowCreate(true)}
            className="bg-[#A3E635] text-black border-2 border-black hover:bg-[#84cc16] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase tracking-wide py-4 px-8 flex items-center justify-center gap-2 transition-all"
            data-testid="create-group-btn"
          >
            <Users className="w-5 h-5" />
            New Group
          </button>
          <button
            onClick={() => navigate('/teacher')}
            className="bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase tracking-wide py-4 px-8 flex items-center justify-center gap-2 transition-all"
            data-testid="teacher-btn"
          >
            <Lock className="w-5 h-5" />
            Teacher Panel
          </button>
        </div>

        {/* Create Group Modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" data-testid="create-group-modal">
            <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#8B5CF6]" />
                New Group
              </h2>
              
              {error && (
                <div className="bg-red-100 border-2 border-red-500 p-3 mb-4 text-red-700 font-medium">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold uppercase tracking-widest block mb-2">Group Name</label>
                  <input
                    type="text"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                    className="w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] focus:border-black outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    placeholder="E.g.: The Change Makers"
                    data-testid="group-name-input"
                  />
                </div>

                {/* Project Type Selection */}
                <div>
                  <label className="text-sm font-bold uppercase tracking-widest block mb-2">Project Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNewGroup({...newGroup, projectType: 'podcast'})}
                      className={`p-4 border-2 border-black flex flex-col items-center gap-2 transition-all ${
                        newGroup.projectType === 'podcast' 
                          ? 'bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]' 
                          : 'bg-white hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      }`}
                      data-testid="type-podcast-btn"
                    >
                      <Mic className="w-8 h-8" />
                      <span className="font-bold text-sm">Radio Podcast</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewGroup({...newGroup, projectType: 'vlog'})}
                      className={`p-4 border-2 border-black flex flex-col items-center gap-2 transition-all ${
                        newGroup.projectType === 'vlog' 
                          ? 'bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]' 
                          : 'bg-white hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      }`}
                      data-testid="type-vlog-btn"
                    >
                      <Video className="w-8 h-8" />
                      <span className="font-bold text-sm">Video Log</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-bold uppercase tracking-widest block mb-2">Members</label>
                  {newGroup.members.map((m, i) => (
                    <input
                      key={i}
                      type="text"
                      value={m}
                      onChange={(e) => {
                        const members = [...newGroup.members];
                        members[i] = e.target.value;
                        setNewGroup({...newGroup, members});
                      }}
                      className="w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] focus:border-black outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-2"
                      placeholder={`Student ${i + 1}`}
                      data-testid={`member-input-${i}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {setShowCreate(false); setError("");}}
                  className="flex-1 bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase py-3"
                  data-testid="cancel-create-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={createGroup}
                  className="flex-1 bg-black text-white border-2 border-black hover:bg-[#8B5CF6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase py-3"
                  data-testid="confirm-create-btn"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Groups */}
        {groups.length > 0 && (
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Continue Project
            </h2>
            <div className="grid gap-4">
              {groups.map(g => {
                const completed = [g.day1?.completed, g.day2?.completed, g.day3?.completed, g.day4?.completed, g.day5?.completed, g.day6?.completed].filter(Boolean).length;
                const isPodcast = g.project_type === 'podcast' || !g.project_type;
                return (
                  <button
                    key={g.id}
                    onClick={() => selectGroup(g.id)}
                    className="w-full bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all text-left flex items-center justify-between"
                    data-testid={`group-card-${g.id}`}
                  >
                    <div className="flex items-center gap-3">
                      {isPodcast ? <Mic className="w-5 h-5 text-[#8B5CF6]" /> : <Video className="w-5 h-5 text-[#F472B6]" />}
                      <div>
                        <h3 className="font-bold text-lg">{g.group_name}</h3>
                        <p className="text-gray-600 text-sm">{g.members?.join(", ")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-[#A3E635] border-2 border-black px-3 py-1 font-bold text-sm">
                        {completed}/6
                      </div>
                      <ChevronRight className="w-5 h-5" />
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

// ============ CHECKBOX COMPONENT ============
const Checkbox = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 border-2 border-black mb-2">
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-6 h-6 border-2 border-black flex items-center justify-center ${checked ? 'bg-[#A3E635]' : 'bg-white'}`}
    >
      {checked && <CheckSquare className="w-5 h-5" />}
    </button>
    <span className="text-sm">{label}</span>
  </label>
);

// ============ PROJECT PAGE (SURVEY) ============
const ProjectPage = () => {
  const navigate = useNavigate();
  const groupId = window.location.pathname.split('/').pop();
  const [group, setGroup] = useState(null);
  const [activeDay, setActiveDay] = useState(1);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchGroup();
  }, [groupId]);

  const fetchGroup = async () => {
    try {
      const res = await axios.get(`${API}/groups/${groupId}`);
      setGroup(res.data);
      const days = [res.data.day1, res.data.day2, res.data.day3, res.data.day4, res.data.day5, res.data.day6];
      const firstIncomplete = days.findIndex(d => !d?.completed);
      setActiveDay(firstIncomplete === -1 ? 6 : firstIncomplete + 1);
    } catch (e) {
      console.error(e);
      navigate('/');
    }
  };

  const updateDay = (day, field, value) => {
    setGroup(prev => ({
      ...prev,
      [`day${day}`]: {
        ...prev[`day${day}`],
        [field]: value
      }
    }));
    setSaved(false);
  };

  const saveDay = async (day) => {
    setSaving(true);
    try {
      await axios.put(`${API}/groups/${groupId}/day`, {
        day: day,
        data: group[`day${day}`]
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const markComplete = async (day) => {
    const dayData = {...group[`day${day}`], completed: true};
    setSaving(true);
    try {
      await axios.put(`${API}/groups/${groupId}/day`, {
        day: day,
        data: dayData
      });
      setGroup(prev => ({
        ...prev,
        [`day${day}`]: dayData
      }));
      if (day < 6) setActiveDay(day + 1);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  if (!group) return <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center"><div className="animate-pulse text-xl font-bold">Loading...</div></div>;

  const isPodcast = group.project_type === 'podcast' || !group.project_type;
  const projectLabel = isPodcast ? "Podcast" : "Video Log";

  const days = [
    { num: 1, title: "Planning", icon: Target, color: "#8B5CF6" },
    { num: 2, title: "Research", icon: Search, color: "#F472B6" },
    { num: 3, title: "Language", icon: BookOpen, color: "#06B6D4" },
    { num: 4, title: "Script", icon: PenTool, color: "#F59E0B" },
    { num: 5, title: "Production", icon: Play, color: "#10B981" },
    { num: 6, title: "Reflection", icon: RefreshCw, color: "#A3E635" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]" data-testid="project-page">
      {/* Header */}
      <header className="bg-black text-white p-4 border-b-4 border-[#A3E635]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:text-[#A3E635] transition-colors">
            <Globe className="w-6 h-6" />
            <span className="font-bold uppercase tracking-wider hidden md:inline">Global Issues</span>
          </button>
          <div className="text-center">
            <h1 className="font-bold text-lg flex items-center justify-center gap-2">
              {isPodcast ? <Mic className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              {group.group_name}
            </h1>
            <p className="text-sm text-gray-400">{group.members?.join(" • ")}</p>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Day Navigation */}
          <div className="md:col-span-3">
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <h2 className="font-bold uppercase tracking-widest text-sm mb-4">Levels</h2>
              <div className="space-y-2">
                {days.map(d => {
                  const isComplete = group[`day${d.num}`]?.completed;
                  const isActive = activeDay === d.num;
                  return (
                    <button
                      key={d.num}
                      onClick={() => setActiveDay(d.num)}
                      className={`w-full text-left p-3 border-2 border-black flex items-center gap-3 transition-all ${
                        isActive ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]' :
                        isComplete ? 'bg-[#A3E635]' : 'bg-white hover:bg-gray-100'
                      }`}
                      data-testid={`day-${d.num}-btn`}
                    >
                      {isComplete ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <d.icon className="w-5 h-5 flex-shrink-0" style={{color: isActive ? 'white' : d.color}} />
                      )}
                      <div>
                        <div className="font-bold text-sm">Day {d.num}</div>
                        <div className="text-xs opacity-75">{d.title}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="md:col-span-9">
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              {/* Day 1 - Planning */}
              {activeDay === 1 && (
                <div data-testid="day-1-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6 text-[#8B5CF6]" />
                    Day 1: Planning
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🎯 Chosen Topic (Global Issue)</label>
                      <input
                        type="text"
                        value={group.day1?.topic || ""}
                        onChange={(e) => updateDay(1, 'topic', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder={`What global issue is your ${projectLabel} about?`}
                        data-testid="day1-topic"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔄 Alternative or Related Topics</label>
                      <textarea
                        value={group.day1?.alternative_topics || ""}
                        onChange={(e) => updateDay(1, 'alternative_topics', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="What other topics could you have chosen?"
                        data-testid="day1-alternatives"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">❓ Why This Topic?</label>
                      <textarea
                        value={group.day1?.why_this_topic || ""}
                        onChange={(e) => updateDay(1, 'why_this_topic', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="Why is it important? Why does it interest you?"
                        data-testid="day1-why"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📢 What Do You Want to Communicate?</label>
                      <textarea
                        value={group.day1?.what_to_communicate || ""}
                        onChange={(e) => updateDay(1, 'what_to_communicate', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="What is the main message?"
                        data-testid="day1-communicate"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Day 2 - Research */}
              {activeDay === 2 && (
                <div data-testid="day-2-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <Search className="w-6 h-6 text-[#F472B6]" />
                    Day 2: Research
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔍 Where Did You Find Information?</label>
                      <textarea
                        value={group.day2?.sources || ""}
                        onChange={(e) => updateDay(2, 'sources', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="Websites, books, interviews, videos..."
                        data-testid="day2-sources"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">💡 What Did You Learn?</label>
                      <textarea
                        value={group.day2?.learnings || ""}
                        onChange={(e) => updateDay(2, 'learnings', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[120px]"
                        placeholder="Interesting facts, important data..."
                        data-testid="day2-learnings"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">👥 Who Would Be Interested in This Information?</label>
                      <textarea
                        value={group.day2?.target_audience || ""}
                        onChange={(e) => updateDay(2, 'target_audience', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="Who is your audience? Teenagers, adults, experts...?"
                        data-testid="day2-audience"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Day 3 - Language & Structure */}
              {activeDay === 3 && (
                <div data-testid="day-3-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-[#06B6D4]" />
                    Day 3: Language & Structure
                  </h2>
                  
                  {/* Grammar Checklist */}
                  <div className="bg-blue-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-3">📚 Unit 3 Grammar Checklist</h3>
                    <p className="text-xs text-gray-600 mb-3">Check the grammar structures you will use in your {projectLabel}:</p>
                    <Checkbox 
                      checked={group.day3?.grammar_present_perfect || false}
                      onChange={(v) => updateDay(3, 'grammar_present_perfect', v)}
                      label="Present Perfect (have/has + past participle) - e.g., 'Climate change has affected...'"
                    />
                    <Checkbox 
                      checked={group.day3?.grammar_comparatives || false}
                      onChange={(v) => updateDay(3, 'grammar_comparatives', v)}
                      label="Comparatives & Superlatives - e.g., 'more important than', 'the biggest problem'"
                    />
                    <Checkbox 
                      checked={group.day3?.grammar_connectors || false}
                      onChange={(v) => updateDay(3, 'grammar_connectors', v)}
                      label="Connectors (however, therefore, although, because, furthermore)"
                    />
                    <Checkbox 
                      checked={group.day3?.grammar_passive_voice || false}
                      onChange={(v) => updateDay(3, 'grammar_passive_voice', v)}
                      label="Passive Voice - e.g., 'Actions are being taken...', 'It was discovered that...'"
                    />
                  </div>

                  {/* Message Structure */}
                  <div className="space-y-6">
                    <div className="bg-gray-100 border-2 border-black p-4">
                      <p className="font-bold text-sm">📝 Structure Your Message (3 Parts):</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">1️⃣ Introduction (Hook your audience!)</label>
                      <textarea
                        value={group.day3?.introduction || ""}
                        onChange={(e) => updateDay(3, 'introduction', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="How will you start? A question? A shocking fact? A story?"
                        data-testid="day3-intro"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">2️⃣ Development (Main content)</label>
                      <textarea
                        value={group.day3?.development || ""}
                        onChange={(e) => updateDay(3, 'development', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="Main points: What? Why? How? Examples?"
                        data-testid="day3-dev"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">3️⃣ Conclusion (Call to action!)</label>
                      <textarea
                        value={group.day3?.conclusion || ""}
                        onChange={(e) => updateDay(3, 'conclusion', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="How will you end? What action do you want your audience to take?"
                        data-testid="day3-conclusion"
                      />
                    </div>
                    
                    {/* Vocabulary */}
                    <div className="bg-yellow-50 border-2 border-black p-4">
                      <h3 className="font-bold text-sm uppercase mb-3">📖 Key Vocabulary (Minimum 10 words)</h3>
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">Key Words & Expressions</label>
                      <textarea
                        value={group.day3?.key_vocabulary || ""}
                        onChange={(e) => updateDay(3, 'key_vocabulary', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="List at least 10 key words related to your topic..."
                        data-testid="day3-vocab"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">Definitions (in English)</label>
                      <textarea
                        value={group.day3?.vocabulary_definitions || ""}
                        onChange={(e) => updateDay(3, 'vocabulary_definitions', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="Write the definition of each key word in English..."
                        data-testid="day3-definitions"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🗣️ Language Style</label>
                      <input
                        type="text"
                        value={group.day3?.language_style || ""}
                        onChange={(e) => updateDay(3, 'language_style', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="Formal, informal, persuasive, informative..."
                        data-testid="day3-style"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Day 4 - Script */}
              {activeDay === 4 && (
                <div data-testid="day-4-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <PenTool className="w-6 h-6 text-[#F59E0B]" />
                    Day 4: Script & Visual Plan
                  </h2>
                  
                  {/* Script Template */}
                  <div className="bg-orange-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-2">📝 Script Template</h3>
                    <div className="text-xs text-gray-700 font-mono bg-white p-3 border border-gray-300">
                      {isPodcast ? (
                        <pre className="whitespace-pre-wrap">{`[INTRO - 30 sec]
Host 1: "Welcome to [Podcast Name]! I'm [Name]..."
Host 2: "And I'm [Name]. Today we're talking about..."
[Sound effect / Music]

[SEGMENT 1 - 1 min]
Host 1: "So, what exactly is [topic]?"
Host 2: "Well, according to our research..."

[SEGMENT 2 - 1 min]  
Host 1: "Why should we care about this?"
Host 2: "Because..."

[SEGMENT 3 - 1 min]
Host 1: "What can we do about it?"
Host 2: "There are several things..."

[OUTRO - 30 sec]
Host 1: "Thanks for listening!"
Host 2: "Don't forget to..."
[Closing music]`}</pre>
                      ) : (
                        <pre className="whitespace-pre-wrap">{`[SCENE 1 - INTRO - 30 sec]
Location: [Where?]
Visual: [What do viewers see?]
Speaker: "Hi everyone! Welcome to..."

[SCENE 2 - THE PROBLEM - 1 min]
Location: [Where?]
Visual: [Images/Graphics to show?]
Speaker: "Today we're discussing..."

[SCENE 3 - THE FACTS - 1 min]
Location: [Where?]  
Visual: [Charts? Photos? Interviews?]
Speaker: "According to..."

[SCENE 4 - SOLUTIONS - 1 min]
Location: [Where?]
Visual: [What do viewers see?]
Speaker: "Here's what we can do..."

[SCENE 5 - OUTRO - 30 sec]
Location: [Where?]
Visual: [Final shot]
Speaker: "Thanks for watching..."
[End screen / Subscribe reminder]`}</pre>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📄 Your Script (First Draft)</label>
                      <textarea
                        value={group.day4?.draft_script || ""}
                        onChange={(e) => updateDay(4, 'draft_script', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[300px] font-mono text-sm"
                        placeholder="Write your full script following the template above..."
                        data-testid="day4-script"
                      />
                    </div>

                    <div className="bg-purple-50 border-2 border-black p-4">
                      <h3 className="font-bold text-sm uppercase mb-2">🎨 Visual Plan / Storyboard</h3>
                      <p className="text-xs text-gray-600">Describe what your {projectLabel} will look like. What will the audience see/hear?</p>
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🖼️ Visual Description / Sketch</label>
                      <textarea
                        value={group.day4?.visual_sketch || ""}
                        onChange={(e) => updateDay(4, 'visual_sketch', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[150px]"
                        placeholder={isPodcast ? 
                          "Describe: Background music? Sound effects? Who speaks when? Tone of voice?" :
                          "Describe each scene: Location? Camera angles? Graphics? Text on screen? Transitions?"
                        }
                        data-testid="day4-visual"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">⏱️ Estimated Duration</label>
                      <div className="bg-green-50 border-2 border-black p-3 mb-2">
                        <p className="text-sm font-medium">⚠️ Minimum: 3 minutes | Maximum: 5 minutes</p>
                      </div>
                      <input
                        type="text"
                        value={group.day4?.estimated_duration || ""}
                        onChange={(e) => updateDay(4, 'estimated_duration', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="e.g., 3 minutes 30 seconds"
                        data-testid="day4-duration"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Day 5 - Production */}
              {activeDay === 5 && (
                <div data-testid="day-5-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <Play className="w-6 h-6 text-[#10B981]" />
                    Day 5: Rehearsal, Recording & Submission
                  </h2>
                  
                  {/* Production Tools */}
                  <div className="bg-green-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-2">🛠️ Recommended Tools</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-bold mb-1">📻 For Podcast:</p>
                        <ul className="text-xs space-y-1 text-gray-700">
                          <li>• Audacity (free audio editor)</li>
                          <li>• Anchor.fm (free recording)</li>
                          <li>• Phone voice recorder</li>
                          <li>• GarageBand (Mac/iOS)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold mb-1">🎬 For Video Log:</p>
                        <ul className="text-xs space-y-1 text-gray-700">
                          <li>• CapCut (free video editor)</li>
                          <li>• iMovie (Mac/iOS)</li>
                          <li>• Canva Video</li>
                          <li>• Phone camera</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🎭 Rehearsal Notes</label>
                      <textarea
                        value={group.day5?.rehearsal_notes || ""}
                        onChange={(e) => updateDay(5, 'rehearsal_notes', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="What did you practice? What needs improvement? Timing issues?"
                        data-testid="day5-rehearsal"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🛠️ Tools You Used</label>
                      <textarea
                        value={group.day5?.production_tools || ""}
                        onChange={(e) => updateDay(5, 'production_tools', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[80px]"
                        placeholder="What apps/tools did you use to record and edit?"
                        data-testid="day5-tools"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📅 Recording Date</label>
                      <input
                        type="text"
                        value={group.day5?.recording_date || ""}
                        onChange={(e) => updateDay(5, 'recording_date', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="When did you record? (e.g., January 15, 2026)"
                        data-testid="day5-date"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📄 Final Script (Revised)</label>
                      <textarea
                        value={group.day5?.final_script || ""}
                        onChange={(e) => updateDay(5, 'final_script', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[200px] font-mono text-sm"
                        placeholder="Paste your final, corrected script here..."
                        data-testid="day5-final-script"
                      />
                    </div>

                    <div className="bg-[#A3E635] border-2 border-black p-4">
                      <h3 className="font-bold text-sm uppercase mb-2">🎉 Submit Your {projectLabel}!</h3>
                      <p className="text-xs mb-3">Upload to YouTube, Google Drive, or any platform and paste the link below.</p>
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔗 Link to Your {projectLabel}</label>
                      <input
                        type="url"
                        value={group.day5?.media_link || ""}
                        onChange={(e) => updateDay(5, 'media_link', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="https://youtube.com/... or https://drive.google.com/..."
                        data-testid="day5-link"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Day 6 - Reflection */}
              {activeDay === 6 && (
                <div data-testid="day-6-form">
                  <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <RefreshCw className="w-6 h-6 text-[#A3E635]" />
                    Day 6: Reflection
                  </h2>
                  
                  <div className="bg-purple-50 border-2 border-black p-4 mb-6">
                    <h3 className="font-bold text-sm uppercase mb-2">🪞 Time to Reflect!</h3>
                    <p className="text-xs text-gray-600">Think about your experience creating this project. Be honest and thoughtful.</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">📚 What Did You Learn?</label>
                      <textarea
                        value={group.day6?.what_learned || ""}
                        onChange={(e) => updateDay(6, 'what_learned', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="What new things did you learn about the topic? About creating a podcast/video? About English?"
                        data-testid="day6-learned"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">⚡ Challenges You Faced</label>
                      <textarea
                        value={group.day6?.challenges_faced || ""}
                        onChange={(e) => updateDay(6, 'challenges_faced', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="What was difficult? How did you solve the problems?"
                        data-testid="day6-challenges"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">👥 Team Collaboration</label>
                      <textarea
                        value={group.day6?.team_collaboration || ""}
                        onChange={(e) => updateDay(6, 'team_collaboration', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="How did you work as a team? Who did what? How did you communicate?"
                        data-testid="day6-team"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">🔄 What Would You Change?</label>
                      <textarea
                        value={group.day6?.what_would_change || ""}
                        onChange={(e) => updateDay(6, 'what_would_change', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="If you could do this project again, what would you do differently?"
                        data-testid="day6-change"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-bold uppercase tracking-widest block mb-2">⭐ Overall Experience</label>
                      <textarea
                        value={group.day6?.overall_experience || ""}
                        onChange={(e) => updateDay(6, 'overall_experience', e.target.value)}
                        className="w-full border-2 border-black bg-white p-3 focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[100px]"
                        placeholder="How was the experience? Did you enjoy it? Would you recommend this project?"
                        data-testid="day6-experience"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col md:flex-row gap-3 mt-8 pt-6 border-t-2 border-black">
                <button
                  onClick={() => saveDay(activeDay)}
                  disabled={saving}
                  className="flex-1 bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                  data-testid="save-btn"
                >
                  <FileText className="w-5 h-5" />
                  {saving ? "Saving..." : saved ? "Saved!" : "Save"}
                </button>
                <button
                  onClick={() => markComplete(activeDay)}
                  disabled={saving}
                  className="flex-1 bg-[#A3E635] text-black border-2 border-black hover:bg-[#84cc16] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                  data-testid="complete-btn"
                >
                  <CheckCircle className="w-5 h-5" />
                  Complete Day {activeDay}
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
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const login = async () => {
    try {
      await axios.post(`${API}/teacher/login`, { password });
      setAuthenticated(true);
      fetchGroups();
    } catch (e) {
      setError("Incorrect password");
    }
  };

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${API}/groups`);
      setGroups(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteGroup = async (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      await axios.delete(`${API}/groups/${id}`);
      setGroups(groups.filter(g => g.id !== id));
      if (selectedGroup?.id === id) setSelectedGroup(null);
    } catch (e) {
      console.error(e);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4" data-testid="teacher-login">
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Teacher Panel
          </h1>
          {error && (
            <div className="bg-red-100 border-2 border-red-500 p-3 mb-4 text-red-700 font-medium">
              {error}
            </div>
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && login()}
            className="w-full border-2 border-black bg-white p-3 text-lg focus:ring-2 focus:ring-[#A3E635] outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4"
            placeholder="Password"
            data-testid="teacher-password"
          />
          <button
            onClick={login}
            className="w-full bg-black text-white border-2 border-black hover:bg-[#8B5CF6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase py-3"
            data-testid="teacher-login-btn"
          >
            Enter
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full mt-3 text-gray-600 hover:text-black font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]" data-testid="teacher-dashboard">
      {/* Header */}
      <header className="bg-black text-white p-4 border-b-4 border-[#8B5CF6]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6" />
            <span className="font-bold uppercase tracking-wider">Teacher Panel</span>
          </div>
          <button onClick={() => navigate('/')} className="hover:text-[#A3E635] transition-colors">
            ← Exit
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Groups List */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <h2 className="font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Groups ({groups.length})
              </h2>
              {groups.length === 0 ? (
                <p className="text-gray-500 text-sm">No groups yet</p>
              ) : (
                <div className="space-y-2">
                  {groups.map(g => {
                    const completed = [g.day1?.completed, g.day2?.completed, g.day3?.completed, g.day4?.completed, g.day5?.completed, g.day6?.completed].filter(Boolean).length;
                    const isPodcast = g.project_type === 'podcast' || !g.project_type;
                    return (
                      <div
                        key={g.id}
                        className={`border-2 border-black p-3 cursor-pointer transition-all ${
                          selectedGroup?.id === g.id ? 'bg-[#8B5CF6] text-white' : 'bg-white hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedGroup(g)}
                        data-testid={`teacher-group-${g.id}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            {isPodcast ? <Mic className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                            <div>
                              <h3 className="font-bold">{g.group_name}</h3>
                              <p className="text-xs opacity-75">{g.members?.join(", ")}</p>
                            </div>
                          </div>
                          <div className={`px-2 py-1 text-xs font-bold border-2 ${selectedGroup?.id === g.id ? 'border-white' : 'border-black bg-[#A3E635]'}`}>
                            {completed}/6
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Group Details */}
          <div className="lg:col-span-2">
            {selectedGroup ? (
              <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6 sticky top-0 bg-white pb-4 border-b-2 border-black">
                  <div className="flex items-center gap-3">
                    {(selectedGroup.project_type === 'podcast' || !selectedGroup.project_type) ? 
                      <Mic className="w-6 h-6 text-[#8B5CF6]" /> : 
                      <Video className="w-6 h-6 text-[#F472B6]" />
                    }
                    <div>
                      <h2 className="text-2xl font-bold">{selectedGroup.group_name}</h2>
                      <p className="text-gray-600">{selectedGroup.members?.join(" • ")}</p>
                      <span className="text-sm text-gray-500">
                        {(selectedGroup.project_type === 'podcast' || !selectedGroup.project_type) ? 'Radio Podcast' : 'Video Log'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteGroup(selectedGroup.id)}
                    className="bg-red-500 text-white border-2 border-black p-2 hover:bg-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    data-testid="delete-group-btn"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Day Responses */}
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map(day => {
                    const dayData = selectedGroup[`day${day}`];
                    const isComplete = dayData?.completed;
                    const titles = ["Planning", "Research", "Language & Structure", "Script & Visual", "Production", "Reflection"];
                    
                    return (
                      <div key={day} className={`border-2 border-black p-4 ${isComplete ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          {isComplete ? <CheckCircle className="w-5 h-5 text-green-600" /> : <div className="w-5 h-5 border-2 border-black rounded-full" />}
                          <h3 className="font-bold">Day {day}: {titles[day-1]}</h3>
                        </div>
                        
                        {day === 1 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>Topic:</strong> {dayData.topic || "-"}</p>
                            <p><strong>Alternatives:</strong> {dayData.alternative_topics || "-"}</p>
                            <p><strong>Why:</strong> {dayData.why_this_topic || "-"}</p>
                            <p><strong>Message:</strong> {dayData.what_to_communicate || "-"}</p>
                          </div>
                        )}
                        {day === 2 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>Sources:</strong> {dayData.sources || "-"}</p>
                            <p><strong>Learnings:</strong> {dayData.learnings || "-"}</p>
                            <p><strong>Audience:</strong> {dayData.target_audience || "-"}</p>
                          </div>
                        )}
                        {day === 3 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>Grammar Used:</strong> {[
                              dayData.grammar_present_perfect && "Present Perfect",
                              dayData.grammar_comparatives && "Comparatives",
                              dayData.grammar_connectors && "Connectors",
                              dayData.grammar_passive_voice && "Passive Voice"
                            ].filter(Boolean).join(", ") || "-"}</p>
                            <p><strong>Introduction:</strong> {dayData.introduction || "-"}</p>
                            <p><strong>Development:</strong> {dayData.development || "-"}</p>
                            <p><strong>Conclusion:</strong> {dayData.conclusion || "-"}</p>
                            <p><strong>Vocabulary:</strong> {dayData.key_vocabulary || "-"}</p>
                            <p><strong>Definitions:</strong> {dayData.vocabulary_definitions || "-"}</p>
                            <p><strong>Style:</strong> {dayData.language_style || "-"}</p>
                          </div>
                        )}
                        {day === 4 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>Script:</strong></p>
                            <pre className="bg-white border border-gray-300 p-2 whitespace-pre-wrap text-xs max-h-40 overflow-y-auto">{dayData.draft_script || "-"}</pre>
                            <p><strong>Visual Plan:</strong> {dayData.visual_sketch || "-"}</p>
                            <p><strong>Duration:</strong> {dayData.estimated_duration || "-"}</p>
                          </div>
                        )}
                        {day === 5 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>Rehearsal Notes:</strong> {dayData.rehearsal_notes || "-"}</p>
                            <p><strong>Tools Used:</strong> {dayData.production_tools || "-"}</p>
                            <p><strong>Recording Date:</strong> {dayData.recording_date || "-"}</p>
                            <p><strong>Final Script:</strong></p>
                            <pre className="bg-white border border-gray-300 p-2 whitespace-pre-wrap text-xs max-h-40 overflow-y-auto">{dayData.final_script || "-"}</pre>
                            {dayData.media_link && (
                              <p><strong>Link:</strong> <a href={dayData.media_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{dayData.media_link}</a></p>
                            )}
                          </div>
                        )}
                        {day === 6 && dayData && (
                          <div className="text-sm space-y-2">
                            <p><strong>What Learned:</strong> {dayData.what_learned || "-"}</p>
                            <p><strong>Challenges:</strong> {dayData.challenges_faced || "-"}</p>
                            <p><strong>Team Work:</strong> {dayData.team_collaboration || "-"}</p>
                            <p><strong>Would Change:</strong> {dayData.what_would_change || "-"}</p>
                            <p><strong>Experience:</strong> {dayData.overall_experience || "-"}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-12 text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Select a group to view their responses</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ APP ============
function App() {
  return (
    <div className="App" style={{fontFamily: 'Manrope, sans-serif'}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
