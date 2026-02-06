import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Mic,
  Video,
  Users,
  BookOpen,
  Target,
  Search,
  FileText,
  CheckCircle,
  Lock,
  Trash2,
  Eye,
  ChevronRight,
  PenTool,
  Sparkles,
  Globe,
  Play,
  RefreshCw,
  CheckSquare
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = `${BACKEND_URL}/api`;

// ============ UNIT 3 VOCABULARY ============
// NOTE: keeping your structure as-is
const UNIT3_VOCABULARY = {
  environment: [
    "carbon footprint",
    "climate change",
    "electric cars",
    "endangered animals",
    "fossil fuels",
    "greenhouse gases",
    "household rubbish",
    "plastic packaging",
    "recycling bins",
    "solar energy"
  ],
  globalIssues: [
    "animal rights",
    "climate change",
    "gender equality",
    "homelessness",
    "pandemic",
    "pollution",
    "poverty",
    "racism"
  ]
};

// ============ RUBRIC DATA ============
const RUBRIC = {
  vlog: {
    length: "1:30–2:00",
    speakingTime: "25–40 seconds each OR 3+ lines",
    facts: 4,
    causes: 2,
    effects: 2,
    solutions: 3,
    indefinitePronouns: 5,
    conditionals: { first: 2, second: 2, total: 4 },
    opinions: 2,
    persuasive: 1,
    roles: [
      { role: "A - Anchor", tasks: "intro + problem + 1–2 facts" },
      { role: "B - Reporter", tasks: "causes/effects + indefinite pronouns + 1–2 facts" },
      { role: "C - Solutions", tasks: "solutions + conditionals + closing" }
    ]
  },
  podcast: {
    length: "2:00–3:00",
    speakingTime: "35–60 seconds each OR 4+ lines",
    facts: 5,
    causes: "2–3",
    effects: "2–3",
    solutions: 4,
    indefinitePronouns: 6,
    conditionals: { first: 2, second: 3, total: 5 },
    opinions: 3,
    persuasive: 1,
    callToAction: 1,
    roles: [
      { role: "A - Host", tasks: "intro + overview + 1–2 facts" },
      { role: "B - Co-host", tasks: "causes/effects + indefinite pronouns + 1–2 facts" },
      { role: "C - Co-host", tasks: "solutions + conditionals + closing + call to action" }
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
    const validMembers = newGroup.members.filter((m) => m.trim());
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

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8" data-testid="landing-page">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(139,92,246,1)] mb-6">
            <Globe className="w-8 h-8" />
            <span className="font-bold text-xl uppercase tracking-wider">Unit 3</span>
          </div>
          <h1
            className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-black mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Global Issues:<br />
            Making a Difference
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">6 days, 6 steps. Complete your mission!</p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => setShowCreate(true)}
            className="bg-[#A3E635] text-black border-2 border-black hover:bg-[#84cc16] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase tracking-wide py-4 px-8 flex items-center justify-center gap-2"
            data-testid="create-group-btn"
          >
            <Users className="w-5 h-5" /> New Group
          </button>
          <button
            onClick={() => navigate("/teacher")}
            className="bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none font-bold uppercase tracking-wide py-4 px-8 flex items-ce
