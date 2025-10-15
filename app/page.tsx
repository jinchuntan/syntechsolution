
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Rocket,
  Handshake,
  LineChart,
  Cpu,
  GraduationCap,
  Gauge,
  BarChart3,
  Users,
  FileBadge2,
  Building2,
  CircuitBoard,
  Stethoscope,
  Palette,
  Briefcase,
  CalendarClock,
  ShieldCheck,
  Timer,
  LogOut,
  KeyRound,
  LockKeyhole,
} from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Section({ id, children, className = "" }:{id?:string; children: React.ReactNode; className?:string}) {
  return (
    <section id={id} className={`max-w-6xl mx-auto px-6 md:px-8 ${className}`}>
      {children}
    </section>
  );
}

export default function App() {
  const [hash, setHash] = useState<string>(typeof window !== "undefined" ? window.location.hash : "");
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  if (hash === "#admin") return <AdminPortal />;
  return <SyntechSite />;
}

function AdminPortal() {
  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("syntech_admin_authed") === "true";
  });

  const handleLogout = () => {
    localStorage.removeItem("syntech_admin_authed");
    setAuthed(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full bg-neutral-50 text-neutral-900">
        <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
          <div className="max-w-5xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-black" />
              <span className="font-semibold tracking-tight">Syntech Admin</span>
            </div>
            <nav className="text-sm">
              <a className="hover:opacity-70" href="#">← Back to site</a>
            </nav>
          </div>
        </header>

        {!authed ? <AdminLogin onSuccess={() => setAuthed(true)} /> : <AdminDashboard onLogout={handleLogout} />}
      </div>
    </MotionConfig>
  );
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      localStorage.setItem("syntech_admin_authed", "true");
      setError(null);
      onSuccess();
    } else {
      setError("Invalid credentials. Try admin / admin.");
    }
  };

  return (
    <Section className="py-20">
      <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-md mx-auto">
        <Card className="rounded-3xl">
          <CardHeader>
            <div className="flex items-center gap-2 text-neutral-500 text-xs uppercase tracking-wider"><LockKeyhole className="h-4 w-4"/> Admin Login</div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to manage your ImmersiFair deployments.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-3">
              <div>
                <div className="text-xs text-neutral-600 mb-1">Username</div>
                <Input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="admin" />
              </div>
              <div>
                <div className="text-xs text-neutral-600 mb-1">Password</div>
                <Input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="••••••" />
              </div>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <Button type="submit" className="rounded-2xl"><KeyRound className="h-4 w-4 mr-2"/> Sign in</Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="py-6 text-center">
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        <div className="text-xs text-neutral-600 mt-1">{label}</div>
      </CardContent>
    </Card>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const stats = useMemo(() => [
    { value: "6", label: "Live stations" },
    { value: "214", label: "Simulations today" },
    { value: "68%", label: "Badge earn rate" },
    { value: "14", label: "Shortlists" },
  ], []);

  return (
    <>
      <Section className="py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
            <p className="text-neutral-600 mt-1">Quick snapshot of your ImmersiFair event. (Demo data)</p>
          </div>
          <Button className="rounded-2xl bg-white text-black border" onClick={onLogout}><LogOut className="h-4 w-4 mr-2"/>Log out</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {stats.map((s, i) => <Stat key={i} value={s.value} label={s.label} />)}
        </div>
      </Section>

      <Section className="pb-20">
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Recent sign‑ins</CardTitle>
              <CardDescription>Top performers and engagement (demo)</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-neutral-700 space-y-2 list-disc pl-5">
                <li>ENG Hub – PCB Debug – Avg score 3.2★</li>
                <li>MED Hub – Suturing – Avg score 2.9★</li>
                <li>BUS Hub – Client pitch – Avg score 3.4★</li>
                <li>CRE Hub – 3D Modeling – Avg score 3.1★</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Common quick tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-3">
              <Button className="rounded-2xl">Export CSV</Button>
              <Button className="rounded-2xl">Invite Recruiter</Button>
              <Button className="rounded-2xl">Pause Station</Button>
              <Button className="rounded-2xl">Reset Leaderboard</Button>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, org, message }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setName(""); setEmail(""); setOrg(""); setMessage("");
    } catch (err:any) {
      setStatus("error");
      setError(err?.message || "Something went wrong");
    }
  }

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Send a message</CardTitle>
        <CardDescription>We’ll get back to you shortly.</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" ? (
          <div className="text-green-700 text-sm">Thanks! Your message was sent. We’ll reply soon.</div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-3">
            <div>
              <div className="text-xs text-neutral-600 mb-1">Full name</div>
              <Input value={name} onChange={e=>setName(e.target.value)} placeholder="Jane Doe" required />
            </div>
            <div>
              <div className="text-xs text-neutral-600 mb-1">Work email</div>
              <Input value={email} onChange={e=>setEmail(e.target.value)} placeholder="jane@company.com" type="email" required />
            </div>
            <div>
              <div className="text-xs text-neutral-600 mb-1">Organization</div>
              <Input value={org} onChange={e=>setOrg(e.target.value)} placeholder="Company / University" />
            </div>
            <div>
              <div className="text-xs text-neutral-600 mb-1">Message</div>
              <Textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="What would you like to build together?" rows={5} required />
            </div>
            {status === "error" && <div className="text-sm text-red-600">{error}</div>}
            <Button type="submit" className="rounded-2xl" disabled={status === "loading"}>{status === "loading" ? "Sending…" : "Submit"}</Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

function ProgressBar(){
  const { scrollYProgress } = useScroll();
  return (
    <motion.div style={{ scaleX: scrollYProgress }} className="fixed left-0 right-0 top-0 h-[3px] origin-left bg-neutral-900/80 z-50" />
  );
}

function Orbs(){
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-neutral-100 blur-3xl animate-pulse"/>
      <div className="absolute bottom-0 -right-24 h-80 w-80 rounded-full bg-neutral-100 blur-3xl animate-[float_10s_ease-in-out_infinite]"/>
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>
    </div>
  );
}

function Marquee({ items }: { items: string[] }){
  return (
    <div className="w-full overflow-hidden border-y bg-neutral-50">
      <div className="flex gap-10 animate-[marquee_22s_linear_infinite] whitespace-nowrap py-4">
        {items.concat(items).map((t,i)=>(<span key={i} className="text-sm text-neutral-500">{t}</span>))}
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

function Tilt({ children }: { children: React.ReactNode }){
  return (
    <div className="group [perspective:900px]">
      <div className="transition-transform duration-300 group-hover:-rotate-x-3 group-hover:rotate-y-3 group-hover:-translate-y-1 [transform-style:preserve-3d]">
        {children}
      </div>
    </div>
  );
}

function SolutionTabs(){
  const tabs = [
    {key:"eng", name:"Engineering", desc:"PCB debug, assembly and prototyping sims.", bullets:["Continuity test","Replace component","Quality check"]},
    {key:"med", name:"Medical", desc:"Suturing and clinical workflows.", bullets:["Knot tying","Incision & suture","Aseptic steps"]},
    {key:"bus", name:"Business", desc:"Client pitch & negotiation.", bullets:["Discovery","Proposal","Objection handling"]},
    {key:"cre", name:"Creative", desc:"3D modeling & animation.", bullets:["Blockout","Refine","Render"]},
  ];
  const [active, setActive] = useState("eng");
  const cur = tabs.find(t=>t.key===active)!;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map(t=>(
          <Button key={t.key} onClick={()=>setActive(t.key)} className={active===t.key?"":"bg-white text-black border"}>{t.name}</Button>
        ))}
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Card className="rounded-3xl md:col-span-2">
          <CardHeader>
            <CardTitle>{cur.name} preview</CardTitle>
            <CardDescription>{cur.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 rounded-2xl bg-gradient-to-br from-neutral-100 to-white border grid place-items-center text-neutral-500">
              <span>Short demo clip / image placeholder</span>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Challenge steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-700">
              {cur.bullets.map((b,i)=>(<li key={i}>{b}</li>))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FAQAccordion(){
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    {q:"How long is each simulation?", a:"5–12 minutes, optimized for fair throughput with instant feedback."},
    {q:"Do students need prior VR experience?", a:"No. We provide an onboarding flow; staff can assist in <30 seconds."},
    {q:"Can employers sponsor custom modules?", a:"Yes—branding, analytics, and shortlisting integrations are available."},
  ];
  return (
    <Section className="py-16">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">FAQ</h2>
      <div className="mt-6 divide-y">
        {items.map((it, i)=> (
          <div key={i} className="py-4">
            <button onClick={()=> setOpen(open===i?null:i)} className="w-full text-left flex items-center justify-between">
              <span className="font-medium">{it.q}</span>
              <span className="text-neutral-500">{open===i?"–":"+"}</span>
            </button>
            {open===i && (
              <motion.div initial={{height:0, opacity:0}} animate={{height:"auto", opacity:1}} className="overflow-hidden text-neutral-700 mt-2">
                {it.a}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

function AnimatedNumber({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      setDisplay(Math.floor(p * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <>{display.toLocaleString()}</>;
}

function ParallaxHero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, 60]);
  const y2 = useTransform(scrollY, [0, 400], [0, -40]);
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-50 via-white to-neutral-50"/>
      <motion.div style={{ y: y2 }} className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-neutral-100 blur-3xl"/>
      <Section className="py-16 md:py-24 text-center">
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Badge className="rounded-full px-3 py-1">VR + Haptics + Employability</Badge>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">
            Redefining the learning & recruiting experience with VR
          </h1>
          <p className="mt-4 text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            We build sustainable, cost‑effective VR solutions with custom haptic gloves that turn
            career fairs and training into immersive, hands‑on experiences—transforming resumes
            into proof of skill.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#solution"><Button className="rounded-2xl"><Rocket className="mr-2 h-4 w-4"/>Explore ImmersiFair</Button></a>
            <a href="#contact"><Button className="rounded-2xl bg-white text-black border">Talk to our team</Button></a>
          </div>
        </motion.div>
      </Section>
      <motion.div style={{ y: y1 }} className="pointer-events-none select-none mx-auto max-w-5xl px-6 pb-6">
        <div className="h-32 md:h-40 rounded-3xl bg-gradient-to-r from-neutral-100 to-white border flex items-center justify-center text-neutral-500">
          <span className="text-sm md:text-base">Scroll to see the hero subtly move</span>
        </div>
      </motion.div>
    </div>
  );
}

function SyntechSite() {
  return (
    <MotionConfig reducedMotion="user">
      <ProgressBar/>
      <Orbs/>
      <div className="min-h-screen w-full bg-white text-neutral-900 antialiased">
        {/* NAV */}
        <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
          <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-black" />
              <span className="font-semibold tracking-tight">Syntech Solutions</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#about" className="hover:opacity-70">About</a>
              <a href="#solution" className="hover:opacity-70">ImmersiFair</a>
              <a href="#features" className="hover:opacity-70">Features</a>
              <a href="#metrics" className="hover:opacity-70">Outcomes</a>
              <a href="#how" className="hover:opacity-70">How it works</a>
              <a href="#revenue" className="hover:opacity-70">Revenue</a>
              <a href="#timeline" className="hover:opacity-70">Timeline</a>
              <a href="#contact" className="hover:opacity-70">Partner</a>
              <a href="#admin" className="hover:opacity-70">Admin</a>
            </nav>
            <div className="flex items-center gap-2">
              <a href="#contact"><Button className="rounded-2xl">Partner with us</Button></a>
            </div>
          </div>
        </header>

        {/* HERO */}
        <ParallaxHero/>
        <Marquee items={["Partner: Talentbank","Partner: University Hub","Sponsor: MedCare Asia","Sponsor: TechWorks","Community: Youth Careers MY"]}/>

        {/* ABOUT */}
        <Section id="about" className="py-16 md:py-24 grid md:grid-cols-2 gap-10 items-start">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Who we are</h2>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              Syntech Solutions delivers sustainable VR training systems that combine Meta‑class headsets
              with affordable ESP32‑powered haptic gloves. Our focus is high‑impact, safe, hands‑on
              learning for medical, engineering, creative and business students—especially for skills like
              suturing, assembly, design sprints and client simulations.
            </p>
          </motion.div>
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:pl-10">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>What we do</CardTitle>
                <CardDescription>
                  ImmersiFair: a VR platform for career fairs that converts passive CV drops into
                  5–12 minute, haptics‑enabled skill challenges with instant feedback and micro‑credentials.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {[
                  {icon: <Gauge/>, title: "3‑star skill ratings", desc: "Precision, creativity, efficiency."},
                  {icon: <FileBadge2/>, title: "Digital badges", desc: "Shareable, verified credentials."},
                  {icon: <BarChart3/>, title: "Recruiter analytics", desc: "Real‑time performance insights."},
                  {icon: <Users/>, title: "Higher engagement", desc: "+35–60% dwell & participation."},
                ].map((f, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="p-2 rounded-xl bg-neutral-100">{f.icon}</div>
                    <div>
                      <div className="font-medium">{f.title}</div>
                      <div className="text-sm text-neutral-600">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Section>

        {/* SOLUTION */}
        <Section id="solution" className="py-16 md:py-24">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="flex items-center gap-2">
              <Handshake className="h-5 w-5"/>
              <p className="uppercase tracking-wider text-xs text-neutral-500">ImmersiFair</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-2">Experiential employability, at scale</h2>
            <p className="mt-3 text-neutral-700 max-w-3xl">
              Students complete short, realistic challenges in VR—diagnose a circuit fault, run a client
              negotiation, model in 3D, or practice surgical sutures—with tactile realism from our
              in‑house haptic gloves. Recruiters get data that goes beyond resumes to assess accuracy,
              problem‑solving and adaptability. Universities and fair organizers gain dashboards that turn
              traffic into actionable employability insights.
            </p>

            <div className="mt-8">
              <SolutionTabs/>
            </div>
          </motion.div>
        </Section>

        {/* FEATURES */}
        <Section id="features" className="py-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Key features</h2>
          <p className="text-neutral-700 mt-2 max-w-3xl">Built for Talentbank‑scale fairs and campus deployments.</p>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              {icon: <Cpu/>, title: "ESP32 haptic gloves", desc: "Force, vibration & tactile feedback—cost‑effective and robust."},
              {icon: <LineChart/>, title: "Analytics dashboard", desc: "Booth engagement, scores, trends and top performers."},
              {icon: <GraduationCap/>, title: "Micro‑credentials", desc: "Co‑branded, verifiable badges shareable on LinkedIn."},
              {icon: <ShieldCheck/>, title: "Safe & repeatable", desc: "Practice risky workflows in a controlled digital twin."},
              {icon: <Timer/>, title: "5–12 minute sims", desc: "Optimized for fair traffic with instant feedback & replays."},
              {icon: <Building2/>, title: "Sponsor modules", desc: "Branded challenges for employer ROI and recall."},
            ].map((f, i) => (
              <Tilt key={i}>
                <Card className="rounded-3xl">
                  <CardHeader className="pb-2">
                    <div className="p-2 rounded-xl bg-neutral-100 w-fit">{f.icon}</div>
                    <CardTitle className="mt-2 text-xl">{f.title}</CardTitle>
                    <CardDescription>{f.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </Tilt>
            ))}
          </div>
        </Section>

        {/* METRICS */}
        <Section id="metrics" className="py-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Target outcomes</h2>
          <p className="text-neutral-700 mt-2 max-w-3xl">Clear, measurable wins for students, recruiters and organizers.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {[
              {kpi: 50, suffix:"%", label: "booth→demo conversion"},
              {kpi: 30, suffix:"%", label: "recruiter engagement uplift"},
              {kpi: 10, suffix:"%", label: "demo→interview conversion"},
              {kpi: 60, suffix:"%", label: "longer dwell & participation (up to)"},
              {kpi: 70, suffix:"%", label: "badge earn rate"},
              {kpi: 40, suffix:"%", label: "faster shortlisting (time‑to‑hire)"},
            ].map((m, i) => (
              <Card key={i} className="rounded-3xl">
                <CardContent className="py-8 text-center">
                  <div className="text-4xl font-bold tracking-tight"><AnimatedNumber value={m.kpi}/> {m.suffix}</div>
                  <div className="text-sm text-neutral-600 mt-1">{m.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* HOW IT WORKS */}
        <Section id="how" className="py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">How it works at a fair</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {[ 
              {step:1, title:"Smart registration", desc:"Each student gets a unique digital ID to unlock sims and track achievements."},
              {step:2, title:"Enter themed hubs", desc:"Engineering, Creative, Business, Medical—short, realistic challenges."},
              {step:3, title:"Haptic realism", desc:"Affordable ESP32 gloves simulate force, texture and resistance."},
              {step:4, title:"Instant feedback", desc:"3‑star skill ratings and error guidance drive faster improvement."},
              {step:5, title:"Leaderboards & badges", desc:"Gamification boosts replays, dwell time and social sharing."},
              {step:6, title:"Recruiter scans", desc:"Live performance summaries shift CV chats into skill‑first conversations."},
              {step:7, title:"Post‑fair analytics", desc:"Subscribing employers access dashboards and follow up with top talent."},
            ].map((s) => (
              <Card key={s.step} className="rounded-3xl">
                <CardHeader className="pb-2">
                  <Badge className="rounded-full w-fit">Step {s.step}</Badge>
                  <CardTitle className="mt-2 text-xl">{s.title}</CardTitle>
                  <CardDescription>{s.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Section>

        {/* REVENUE */}
        <Section id="revenue" className="py-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Revenue & partnership model</h2>
          <p className="text-neutral-700 mt-2 max-w-3xl">Multiple scalable streams—while keeping student access free.</p>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              {icon:<Building2/>, title:"Tiered sponsorships", desc:"Branded sims with engagement reports and talent insights."},
              {icon:<Users/>, title:"Exhibitor VR add‑ons", desc:"Upgrade any booth with ImmersiFair challenges."},
              {icon:<BarChart3/>, title:"Recruiter analytics", desc:"Subscription dashboards with skills, scores & trends."},
              {icon:<GraduationCap/>, title:"University licensing", desc:"Campus events and Talentbank Academy integration."},
              {icon:<CalendarClock/>, title:"Hardware rental/setup", desc:"Stations, gloves and on‑site support for events."},
              {icon:<ShieldCheck/>, title:"Corporate‑funded access", desc:"Free for students; sponsors fund engagement."},
            ].map((r,i)=> (
              <Card key={i} className="rounded-3xl">
                <CardHeader className="pb-2">
                  <div className="p-2 rounded-xl bg-neutral-100 w-fit">{r.icon}</div>
                  <CardTitle className="mt-2 text-xl">{r.title}</CardTitle>
                  <CardDescription>{r.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Section>

        {/* TIMELINE */}
        <Section id="timeline" className="py-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Roadmap</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              {title:"Phase 1 — Prototype", when:"Q4 2025 – Q1 2026", points:["Unity XR MVP sims","Data pipeline","Haptic glove integration"]},
              {title:"Phase 2 — Pilot", when:"Q1 – Q2 2026", points:["University & employer pilots","Live fair deployments","Refine UX & dashboards"]},
              {title:"Phase 3 — Launch & scale", when:"Q2 – Q3 2026+", points:["Flagship Talentbank launch","Sponsor tiers & subs","Academy integration"]},
            ].map((t,i)=> (
              <Card key={i} className="rounded-3xl">
                <CardHeader>
                  <CardTitle>{t.title}</CardTitle>
                  <CardDescription>{t.when}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5 text-neutral-700">
                    {t.points.map((p, j)=> <li key={j}>{p}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section className="py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Ready to build the future of employability?</h2>
            <p className="mt-3 text-neutral-700">Let’s co‑design a sponsored module, run a pilot at your fair, or license ImmersiFair for campus events.</p>
            <a href="#contact"><Button className="mt-6 rounded-2xl">Start a partnership</Button></a>
          </div>
        </Section>

        {/* FAQ */}
        {FAQAccordion()}

        {/* CONTACT */}
        <Section id="contact" className="py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Partner with Syntech</h3>
              <p className="mt-3 text-neutral-700">Tell us about your event, faculty or sponsorship idea. We’ll reply with a tailored proposal within 1–2 business days.</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {[
                  {k:"Email", v:"hello@syntech.example"},
                  {k:"HQ", v:"Kuala Lumpur, Malaysia"},
                  {k:"Focus", v:"VR training • Haptics • Analytics"},
                  {k:"Availability", v:"Pilots from Q1 2026"},
                ].map((i, idx)=> (
                  <Card key={idx} className="rounded-2xl"><CardContent className="py-4"><div className="text-xs text-neutral-500">{i.k}</div><div className="font-medium">{i.v}</div></CardContent></Card>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </Section>

        {/* FOOTER */}
        <footer className="border-t">
          <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 text-sm text-neutral-600 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Syntech Solutions • All rights reserved</div>
            <div className="flex gap-6">
              <a href="#about">About</a>
              <a href="#solution">ImmersiFair</a>
              <a href="#revenue">Partners</a>
              <a href="#contact">Contact</a>
              <a href="#admin">Admin</a>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
