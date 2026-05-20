import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  Check,
  ChevronRight,
  CircleUserRound,
  Code2,
  Handshake,
  Home,
  Laptop,
  Lock,
  Mail,
  MessageCircle,
  Mic,
  Music2,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SkipForward,
  SlidersHorizontal,
  Sparkles,
  Users,
  Volume2,
  Waves,
  Wifi,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { brand, chats, communities, notifications, opportunities, students } from "./data/mock";
import { cn } from "./lib/utils";
import { getSocket } from "./lib/socket";

const navItems = [
  { key: "home", label: "Home", icon: Home },
  { key: "discover", label: "Match", icon: Sparkles },
  { key: "chat", label: "Teams", icon: MessageCircle },
  { key: "community", label: "Explore", icon: Users },
  { key: "profile", label: "Profile", icon: CircleUserRound },
  { key: "settings", label: "Settings", icon: Settings },
] as const;

type View = (typeof navItems)[number]["key"];
type Student = (typeof students)[number];
type ChatMessage = {
  id: number;
  name: string;
  text: string;
  side: "left" | "right";
  time: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [active, setActive] = useState<View>("home");
  const [discoverIndex, setDiscoverIndex] = useState(0);
  const [callActive, setCallActive] = useState(false);
  const student = students[discoverIndex % students.length];

  const screen = useMemo(() => {
    if (active === "discover") return <MatchScreen student={student} setDiscoverIndex={setDiscoverIndex} />;
    if (active === "chat") return <TeamChatScreen setCallActive={setCallActive} />;
    if (active === "community") return <ExploreScreen />;
    if (active === "profile") return <ProfileScreen setActive={setActive} />;
    if (active === "settings") return <SettingsScreen />;
    return <HomeScreen setActive={setActive} />;
  }, [active, discoverIndex, student]);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden pb-28 text-white">
      <div className="pointer-events-none fixed inset-0 opacity-55">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-5 px-3 py-3 sm:px-5 lg:grid-cols-[260px_minmax(0,1fr)_310px] lg:py-6">
        <DesktopRail active={active} setActive={setActive} />
        <section className="min-w-0">
          <TopBar active={active} setActive={setActive} />
          <AnimatePresence mode="wait">
            <motion.div key={active} variants={fadeUp} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.28 }}>
              {screen}
            </motion.div>
          </AnimatePresence>
        </section>
        <LandingPanel setActive={setActive} setCallActive={setCallActive} />
      </div>

      <BottomNav active={active} setActive={setActive} />
      <AnimatePresence>{callActive && <VoiceCallOverlay onClose={() => setCallActive(false)} />}</AnimatePresence>
    </main>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-[-12%] right-[-10%] h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <section className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_430px]">
        <div className="space-y-6">
          <BrandLockup />
          <div>
            <Badge className="mb-4 border-cyan-300/30 bg-cyan-300/10 text-cyan-100">BMSIT verified web app</Badge>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
              Find your study group, hackathon team, dance crew, or music circle.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
              CampusCircle starts with a private BMSIT login. Students enter using USN and college email, then match into goal-based groups and chat rooms.
            </p>
          </div>
          <div className="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            <IntentPill icon={BookOpen} title="Study" count="DSA, ML, DBMS" />
            <IntentPill icon={Code2} title="Build" count="Projects, hacks" />
            <IntentPill icon={Waves} title="Dance" count="Fest crews" />
            <IntentPill icon={Music2} title="Music" count="Jam rooms" />
          </div>
        </div>

        <Card className="p-5">
          <div className="mb-5 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 via-fuchsia-400 to-amber-300 text-xl font-black text-zinc-950">
              C
            </div>
            <h2 className="mt-4 text-2xl font-black tracking-tight">Login to CampusCircle</h2>
            <p className="mt-1 text-sm text-zinc-400">Only BMSIT students can enter.</p>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">USN</span>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-3">
                <ShieldCheck className="h-5 w-5 text-cyan-300" />
                <input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500" placeholder="1BY23CS001" defaultValue="1BY23CS042" />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">College email</span>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-3">
                <Mail className="h-5 w-5 text-cyan-300" />
                <input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500" placeholder="name@bmsit.in" defaultValue="student@bmsit.in" />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Password</span>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-3">
                <Lock className="h-5 w-5 text-cyan-300" />
                <input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500" type="password" placeholder="Password" defaultValue="campus123" />
              </div>
            </label>

            <Button className="w-full" onClick={onLogin}>
              Enter BMSIT network <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <MiniMetric value="USN" label="Verified" />
            <MiniMetric value="OTP" label="Ready" />
            <MiniMetric value="Groups" label="Private" />
          </div>
        </Card>
      </section>
    </main>
  );
}

function BrandLockup({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("flex items-center gap-3 rounded-lg text-left", onClick && "transition hover:opacity-80")}
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 via-fuchsia-400 to-amber-300 text-lg font-black text-zinc-950 shadow-glow">
        C
      </div>
      <div>
        <p className="text-base font-black tracking-tight">{brand.appName}</p>
        <p className="text-xs text-zinc-400">{brand.shortCampus} match network</p>
      </div>
    </button>
  );
}

function DesktopRail({ active, setActive }: { active: View; setActive: (view: View) => void }) {
  return (
    <aside className="sticky top-6 hidden h-[calc(100vh-48px)] flex-col justify-between rounded-lg border border-white/10 bg-white/[0.065] p-4 shadow-glass backdrop-blur-2xl lg:flex">
      <div className="space-y-6">
        <BrandLockup onClick={() => setActive("profile")} />
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={cn(
                "flex h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold text-zinc-400 transition hover:bg-white/10 hover:text-white",
                active === item.key && "bg-white/12 text-white shadow-inner",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
              {active === item.key && <span className="ml-auto h-2 w-2 rounded-full bg-cyan-300" />}
            </button>
          ))}
        </nav>
      </div>
      <Card className="p-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <ShieldCheck className="h-4 w-4 text-emerald-300" />
          BMSIT email only
        </div>
        <p className="mt-2 text-xs leading-5 text-zinc-400">No public photo feed. Just verified students matching by goals, skills, and availability.</p>
      </Card>
    </aside>
  );
}

function TopBar({ active, setActive }: { active: View; setActive: (view: View) => void }) {
  return (
    <header className="sticky top-0 z-20 mb-3 rounded-lg border border-white/10 bg-zinc-950/70 p-3 backdrop-blur-2xl lg:static lg:bg-white/[0.065]">
      <div className="flex items-center justify-between gap-3">
        <div className="lg:hidden">
          <BrandLockup onClick={() => setActive("profile")} />
        </div>
        <div className="hidden min-w-0 lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{brand.campus}</p>
          <h1 className="truncate text-2xl font-black tracking-tight">{navItems.find((item) => item.key === active)?.label}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="icon" aria-label="Search matches" onClick={() => setActive("community")}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="secondary" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function HomeScreen({ setActive }: { setActive: (view: View) => void }) {
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">BMSIT only</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">
              Your BMSIT dashboard for matching into useful student groups.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              Create or join groups for DSA practice, hackathons, mini-projects, dance, singing, club work, and campus events. Every room starts from a real goal.
            </p>
          </div>
          <Button className="w-full sm:w-auto" onClick={() => setActive("discover")}>
            Start matching <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <IntentPill icon={Code2} title="Hackathon" count="42 builders" />
          <IntentPill icon={BookOpen} title="Study" count="31 learners" />
          <IntentPill icon={Waves} title="Dance" count="9 performers" />
          <IntentPill icon={Music2} title="Singing" count="14 artists" />
        </div>
      </Card>

      <Card className="p-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-300" />
            <span className="font-bold">Best matches for you</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setActive("discover")}>
            See all <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {students.slice(0, 3).map((person) => (
            <StudentMatchMini key={person.name} person={person} />
          ))}
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {opportunities.map((item) => (
          <OpportunityCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

function MatchScreen({ student, setDiscoverIndex }: { student: Student; setDiscoverIndex: React.Dispatch<React.SetStateAction<number>> }) {
  const next = () => setDiscoverIndex((index) => index + 1);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
      <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={next} whileDrag={{ rotate: 3, scale: 0.98 }}>
        <Card className="relative min-h-[620px] overflow-hidden p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_84%_22%,rgba(244,114,182,0.18),transparent_35%)]" />
          <div className="relative flex h-full min-h-[588px] flex-col justify-between">
            <div className="flex items-center justify-between">
              <Badge className="border-emerald-300/30 bg-emerald-300/15 text-emerald-100">
                <Wifi className="h-3 w-3" /> {student.online ? "Online now" : "Recently active"}
              </Badge>
              <div className="grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-black/35 text-center backdrop-blur-xl">
                <span className="text-lg font-black">{student.match}%</span>
                <span className="-mt-5 text-[10px] text-zinc-400">match</span>
              </div>
            </div>

            <div className="mx-auto grid w-full max-w-lg place-items-center py-8 text-center">
              <img className="h-28 w-28 rounded-full border-4 border-white/15 object-cover shadow-glow" src={student.avatar} alt={student.name} />
              <h2 className="mt-5 text-4xl font-black tracking-tight">{student.name}</h2>
              <p className="mt-1 text-zinc-300">{student.department} · {student.semester} · Section {student.section}</p>
              <div className="mt-5 rounded-lg border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Goal</p>
                <p className="mt-2 text-xl font-black">{student.intent}</p>
                <p className="mt-2 text-sm text-zinc-300">{student.lookingFor}</p>
              </div>
              <p className="mt-4 max-w-md text-sm leading-6 text-zinc-300">{student.bio}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {student.interests.map((interest) => <Badge key={interest}>{interest}</Badge>)}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <MiniMetric value={String(student.mutuals)} label="Mutuals" />
                <MiniMetric value={student.availability} label="Free" />
                <MiniMetric value={student.clubs.length.toString()} label="Clubs" />
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button variant="secondary" size="icon" aria-label="Skip" onClick={next}>
                  <X className="h-5 w-5" />
                </Button>
                <Button className="h-14 px-6" aria-label="Invite to match" onClick={next}>
                  <Handshake className="h-5 w-5" /> Invite
                </Button>
                <Button variant="secondary" size="icon" aria-label="Wave" onClick={next}>
                  <Zap className="h-5 w-5 text-amber-300" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      <div className="space-y-3">
        <Segmented options={["Learn", "Build", "Perform"]} />
        <Card className="p-4">
          <p className="font-bold">Why you match</p>
          <div className="mt-3 space-y-2">
            {student.clubs.map((club) => (
              <div key={club} className="flex items-center justify-between rounded-lg bg-white/8 p-3 text-sm">
                <span>{club}</span>
                <Badge>{student.mutuals} peers</Badge>
              </div>
            ))}
            <div className="rounded-lg bg-white/8 p-3 text-sm">
              <p className="text-zinc-300">Shared intent</p>
              <p className="mt-1 font-semibold">{student.status}</p>
            </div>
          </div>
        </Card>
        <EmptyState title="No random swiping" text="Every card is based on goal, skill fit, time, and BMSIT verification." icon={SkipForward} />
      </div>
    </div>
  );
}

function TeamChatScreen({ setCallActive }: { setCallActive: (value: boolean) => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, name: "Aanya", text: "I can handle frontend. Need someone for auth + database.", side: "left", time: "10:21" },
    { id: 2, name: "You", text: "I can do Supabase and maybe the dashboard.", side: "right", time: "10:22" },
    { id: 3, name: "Kabir", text: "Nice. I'll make the hardware demo if we choose IoT angle.", side: "left", time: "10:23" },
  ]);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const conversationId = "team-ai";
  const socket = getSocket();

  // Join conversation and listen for live events
  useEffect(() => {
    if (!socket) return;
    socket.emit("conversation:join", { conversationId });

    const handleNew = (message: any) => {
      setMessages((cur) => [...cur, message]);
    };

    const handleTyping = ({ userId, isTyping: typing }: any) => {
      setIsTyping(typing);
    };

    socket.on("message:new", handleNew);
    socket.on("typing:update", handleTyping);

    return () => {
      socket.off("message:new", handleNew);
      socket.off("typing:update", handleTyping);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const message = { id: Date.now(), name: "You", text, side: "right", time: now };

    if (socket) {
      socket.emit("message:send", { conversationId, message });
      // locally optimistically append
      setMessages((current) => [...current, message]);
    } else {
      // fallback to local-only behaviour
      setMessages((current) => [...current, message]);
      window.setTimeout(() => {
        setMessages((current) => [
          ...current,
          {
            id: Date.now() + 1,
            name: "Aanya",
            text: "Cool, adding this to the plan. Let's lock roles before 7 PM.",
            side: "left",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setIsTyping(false);
      }, 900);
    }

    setDraft("");
    setIsTyping(true);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
      <Card className="p-3">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tight">Team rooms</h2>
          <Badge>Goal-based</Badge>
        </div>
        <div className="space-y-2">
          {chats.map((chat) => (
            <button key={chat.name} className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition hover:bg-white/10">
              <div className="relative">
                <img className="h-12 w-12 rounded-full object-cover" src={chat.avatar} alt={chat.name} />
                <span className={cn("absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-950", chat.online ? "bg-emerald-300" : "bg-zinc-500")} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{chat.name}</p>
                <p className="truncate text-xs text-zinc-400">{chat.last}</p>
              </div>
              <div className="text-right text-xs text-zinc-500">
                <p>{chat.time}</p>
                {chat.unread > 0 && <span className="mt-1 inline-grid h-5 min-w-5 place-items-center rounded-full bg-cyan-300 px-1 text-zinc-950">{chat.unread}</span>}
              </div>
            </button>
          ))}
        </div>
      </Card>
      <Card className="flex min-h-[620px] flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 p-3">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-fuchsia-400 font-black text-zinc-950">AI</div>
            <div>
              <p className="font-bold">AI Hackathon Team</p>
              <p className="text-xs text-emerald-300">4 members · looking for backend</p>
            </div>
          </div>
          <Button variant="secondary" size="icon" aria-label="Team voice call" onClick={() => setCallActive(true)}>
            <Phone className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 space-y-3 p-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} side={message.side} name={message.name} text={message.text} time={message.time} />
          ))}
          <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-3 text-sm">
            <p className="font-bold text-cyan-100">Team checklist</p>
            <div className="mt-2 grid gap-2">
              {["Choose problem statement", "Assign frontend/backend", "Make 5-min demo plan"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-zinc-300">
                  <Check className="h-4 w-4 text-emerald-300" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-zinc-300">
            <span className="flex gap-1">
              {[0, 1, 2].map((bar) => <span key={bar} className="h-4 w-1 animate-waveform rounded-full bg-cyan-300" style={{ animationDelay: `${bar * 120}ms` }} />)}
            </span>
            Voice note · 0:12
          </div>
          {isTyping && (
            <div className="flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs text-zinc-400">
              <span className="flex gap-1">
                {[0, 1, 2].map((dot) => <span key={dot} className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" style={{ animationDelay: `${dot * 120}ms` }} />)}
              </span>
              Aanya is typing
            </div>
          )}
        </div>
        <div className="border-t border-white/10 p-3">
          <form onSubmit={sendMessage} className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Message the team..."
            />
            <Button size="icon" aria-label="Send live chat message" type="submit"><Send className="h-5 w-5" /></Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

function ExploreScreen() {
  return (
    <div className="space-y-4">
      <Card className="p-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
          <Search className="h-5 w-5 text-zinc-400" />
          <input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500" placeholder="Search DSA, hackathon, dance, singing, department, semester" />
          <SlidersHorizontal className="h-5 w-5 text-cyan-300" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["CSE", "AIML", "4th Sem", "Hackathon", "Dance", "Singing", "Evenings"].map((filter) => <Badge key={filter}>{filter}</Badge>)}
        </div>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        {communities.map((community) => (
          <Card key={community.title} className="overflow-hidden p-4">
            <div className={cn("mb-5 h-1.5 rounded-full bg-gradient-to-r", community.tone)} />
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-black tracking-tight">{community.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{community.meta}</p>
              </div>
              <Button variant="secondary" size="icon" aria-label={community.title}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Card className="p-4">
        <h3 className="text-lg font-black">Open team requests</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {opportunities.map((item) => <OpportunityCard key={item.title} item={item} compact />)}
        </div>
      </Card>
    </div>
  );
}

function ProfileScreen({ setActive }: { setActive: (view: View) => void }) {
  const me = students[0];
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img className="h-24 w-24 rounded-full border-4 border-white/10 object-cover" src={me.avatar} alt={me.name} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-3xl font-black tracking-tight">{me.name}</h2>
                <Badge className="text-cyan-200"><ShieldCheck className="h-3 w-3" /> BMSIT verified</Badge>
              </div>
              <p className="mt-1 text-zinc-400">{me.department} · {me.semester} · Section {me.section}</p>
              <p className="mt-2 text-sm text-cyan-200">{me.intent}</p>
            </div>
          </div>
          <Button variant="secondary" onClick={() => setActive("chat")}>Open teams</Button>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-200">{me.bio}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <MiniMetric value="12" label="Matches" />
          <MiniMetric value="4" label="Teams" />
          <MiniMetric value="8" label="Clubs" />
        </div>
      </Card>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="p-4">
          <h3 className="font-black">Skills and interests</h3>
          <div className="mt-3 flex flex-wrap gap-2">{me.skills.concat(me.interests).map((skill) => <Badge key={skill}>{skill}</Badge>)}</div>
        </Card>
        <Card className="p-4">
          <h3 className="font-black">Current goals</h3>
          <div className="mt-3 grid gap-2">
            {[me.intent, "Find 2 consistent teammates", "Join one BMSIT club project"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg bg-white/8 p-3 text-sm">
                <Sparkles className="h-4 w-4 text-amber-300" />
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function SettingsScreen() {
  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Account</p>
            <h2 className="mt-1 text-3xl font-black tracking-tight">Settings</h2>
            <p className="mt-2 text-sm text-zinc-400">Manage profile visibility, group invites, notifications, and BMSIT verification.</p>
          </div>
          <Settings className="h-7 w-7 text-zinc-400" />
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="p-4">
          <h3 className="font-black">Privacy</h3>
          <div className="mt-3 space-y-2">
            <SettingRow label="Show availability" enabled />
            <SettingRow label="Show department and semester" enabled />
            <SettingRow label="Allow team invites" enabled />
            <SettingRow label="Show verified badge" enabled />
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-black">Communication</h3>
          <div className="mt-3 space-y-2">
            <SettingRow label="Group chat notifications" enabled />
            <SettingRow label="Voice room invites" enabled />
            <SettingRow label="Email reminders" enabled={false} />
            <SettingRow label="Block/report controls" enabled={false} danger />
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-black">Verification</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <MiniMetric value="1BY23CS042" label="USN" />
          <MiniMetric value="student@bmsit.in" label="College email" />
          <MiniMetric value="BMSIT" label="Campus" />
        </div>
      </Card>
    </div>
  );
}

function LandingPanel({
  setCallActive,
}: {
  setActive: (view: View) => void;
  setCallActive: (value: boolean) => void;
}) {
  return (
    <aside className="hidden space-y-4 lg:block">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black">Landing overview</h2>
          <Badge>BMSIT</Badge>
        </div>
        <div className="mt-4 space-y-3">
          {["USN login", "Choose goals", "Match students", "Open group chat"].map((step, index) => (
            <button
              key={step}
              className="flex w-full items-center gap-3 rounded-lg bg-white/6 p-3 text-left text-sm text-zinc-300 transition hover:bg-white/10"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-xs font-black">
                {index + 1}
              </span>
              {step}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3">
          <label className="text-xs font-semibold text-zinc-400">BMSIT credentials</label>
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
            <Lock className="h-4 w-4 text-cyan-300" />
            <span className="text-sm">1BY23CS042 · student@bmsit.in</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {["4", "8", "1", "9"].map((num) => <span key={num} className="grid h-11 place-items-center rounded-lg bg-white/10 font-black">{num}</span>)}
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black">Notifications</h2>
          <Bell className="h-5 w-5 text-amber-300" />
        </div>
        <div className="mt-3 space-y-2">
          {notifications.map((note) => (
            <div key={note} className="rounded-lg bg-white/8 p-3 text-sm text-zinc-300">{note}</div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black">Dashboard summary</h2>
          <ShieldCheck className="h-5 w-5 text-emerald-300" />
        </div>
        <div className="mt-3 space-y-2">
          {["USN verified", "4 active team rooms", "12 student matches", "2 pending invites"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg bg-white/8 p-3 text-sm">
              <Check className="h-4 w-4 text-emerald-300" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Card>

      <Button className="w-full" onClick={() => setCallActive(true)}>
        <Phone className="h-5 w-5" /> Start team voice
      </Button>
    </aside>
  );
}

function BottomNav({ active, setActive }: { active: View; setActive: (view: View) => void }) {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-6 gap-1 rounded-2xl border border-white/10 bg-zinc-950/82 p-2 shadow-glass backdrop-blur-2xl lg:hidden">
      {navItems.map((item) => (
        <button
          key={item.key}
          aria-label={item.label}
          title={item.label}
          onClick={() => setActive(item.key)}
          className={cn("relative grid h-12 place-items-center rounded-xl text-zinc-500 transition", active === item.key && "bg-white/10 text-white")}
        >
          <item.icon className="h-5 w-5" />
          {active === item.key && <motion.span layoutId="active-pill" className="absolute -bottom-1 h-1 w-8 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-300" />}
        </button>
      ))}
    </nav>
  );
}

function VoiceCallOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-sm rounded-lg border border-white/10 bg-zinc-950/90 p-5 text-center shadow-glass">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-cyan-300 via-fuchsia-400 to-amber-300 text-3xl font-black text-zinc-950 ring-4 ring-cyan-400/20">AI</div>
        <h2 className="mt-4 text-2xl font-black">AI Hackathon Team</h2>
        <p className="text-sm text-zinc-400">BMSIT team voice room</p>
        <div className="my-8 flex h-16 items-center justify-center gap-1">
          {Array.from({ length: 22 }).map((_, index) => (
            <span key={index} className="w-1 animate-waveform rounded-full bg-gradient-to-t from-fuchsia-400 to-cyan-300" style={{ height: `${18 + (index % 7) * 6}px`, animationDelay: `${index * 42}ms` }} />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="secondary" size="icon" aria-label="Mute"><Mic className="h-5 w-5" /></Button>
          <Button variant="secondary" size="icon" aria-label="Speaker"><Volume2 className="h-5 w-5" /></Button>
          <Button variant="secondary" size="icon" aria-label="Laptop"><Laptop className="h-5 w-5" /></Button>
          <Button variant="danger" size="icon" aria-label="End call" onClick={onClose}><Phone className="h-5 w-5 rotate-[135deg]" /></Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function IntentPill({ icon: Icon, title, count }: { icon: LucideIcon; title: string; count: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <Icon className="h-5 w-5 text-cyan-300" />
      <p className="mt-3 font-black">{title}</p>
      <p className="text-xs text-zinc-400">{count}</p>
    </div>
  );
}

function StudentMatchMini({ person }: { person: Student }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <div className="flex items-center gap-3">
        <img className="h-12 w-12 rounded-full object-cover" src={person.avatar} alt={person.name} />
        <div className="min-w-0">
          <p className="truncate font-bold">{person.name}</p>
          <p className="truncate text-xs text-zinc-400">{person.intent}</p>
        </div>
      </div>
      <div className="mt-3 h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" style={{ width: `${person.match}%` }} />
      </div>
      <p className="mt-2 text-xs text-zinc-500">{person.department} · {person.availability}</p>
    </div>
  );
}

function OpportunityCard({ item, compact = false }: { item: (typeof opportunities)[number]; compact?: boolean }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge className="mb-3 text-cyan-200">{item.category}</Badge>
          <h3 className="text-lg font-black tracking-tight">{item.title}</h3>
          <p className="mt-1 text-sm text-zinc-400">{item.need} · {item.time}</p>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-sm font-black">{item.match}%</div>
      </div>
      {!compact && (
        <div className="mt-4 flex -space-x-2">
          {item.members.map((member) => <img key={member.name} className="h-9 w-9 rounded-full border-2 border-zinc-950 object-cover" src={member.avatar} alt={member.name} />)}
          <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-zinc-950 bg-white/10 text-xs">+</span>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
      </div>
      <Button variant="secondary" className="mt-4 w-full">
        Request to join <ChevronRight className="h-4 w-4" />
      </Button>
    </Card>
  );
}

function Segmented({ options }: { options: string[] }) {
  const [selected, setSelected] = useState(options[0]);
  return (
    <Card className="grid grid-cols-3 gap-1 p-1">
      {options.map((option) => (
        <button key={option} onClick={() => setSelected(option)} className={cn("h-10 rounded-lg text-sm font-bold text-zinc-400 transition", selected === option && "bg-white text-zinc-950")}>
          {option}
        </button>
      ))}
    </Card>
  );
}

function MiniMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/8 p-3">
      <p className="truncate text-lg font-black">{value}</p>
      <p className="text-xs text-zinc-400">{label}</p>
    </div>
  );
}

function SettingRow({ label, enabled, danger = false }: { label: string; enabled: boolean; danger?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white/8 p-3 text-sm">
      <span>{label}</span>
      <span className={cn("h-6 w-11 rounded-full p-1 transition", danger ? "bg-rose-400/25" : enabled ? "bg-emerald-300/30" : "bg-white/10")}>
        <span className={cn("block h-4 w-4 rounded-full transition", danger ? "bg-rose-300" : enabled ? "translate-x-5 bg-emerald-200" : "bg-zinc-500")} />
      </span>
    </div>
  );
}

function MessageBubble({ side, name, text, time }: { side: "left" | "right"; name: string; text: string; time?: string }) {
  return (
    <div className={cn("max-w-[82%] rounded-lg p-3 text-sm", side === "right" ? "ml-auto bg-gradient-to-r from-fuchsia-500 to-rose-400 text-white" : "bg-white/10 text-zinc-200")}>
      <p className="mb-1 text-xs font-bold opacity-70">{name}</p>
      {text}
      {time && <p className="mt-1 text-[10px] opacity-60">{time}</p>}
    </div>
  );
}

function EmptyState({ title, text, icon: Icon }: { title: string; text: string; icon: LucideIcon }) {
  return (
    <Card className="p-4 text-center">
      <Icon className="mx-auto h-8 w-8 text-zinc-500" />
      <p className="mt-3 font-bold">{title}</p>
      <p className="mt-1 text-sm text-zinc-400">{text}</p>
    </Card>
  );
}

export default App;
