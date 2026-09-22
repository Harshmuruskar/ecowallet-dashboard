import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  Bell, Bike, ChevronDown, CircleDollarSign, Gauge, HandCoins, HelpCircle, Home,
  Leaf, Lightbulb, LogOut, Menu, Plus, ReceiptText, Send, Settings, Share2,
  ShoppingBasket, Sparkles, TrendingUp, UserRound, WalletCards, X, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "EcoWallet — Financial & Carbon Dashboard" },
    { name: "description", content: "Track spending, savings, and your carbon impact in one EcoWallet dashboard." },
    { property: "og:title", content: "EcoWallet — Financial & Carbon Dashboard" },
    { property: "og:description", content: "Track spending, savings, and your carbon impact in one dashboard." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Dashboard,
});

const nav = [
  ["Dashboard", Gauge], ["Overview", Home], ["Wallet", WalletCards], ["Transactions", ReceiptText],
  ["Analytics", TrendingUp], ["Settings", Settings], ["Help", HelpCircle],
] as const;

const transactions = [
  { name: "Starbucks", time: "Today, 9:34 AM", amount: "−$5.20", co2: "2.1 kg", icon: CircleDollarSign, income: false },
  { name: "Ride Share", time: "Today, 8:12 AM", amount: "−$12.80", co2: "1.2 kg", icon: Bike, income: false },
  { name: "Whole Foods", time: "Yesterday, 6:40 PM", amount: "−$54.20", co2: "3.5 kg", icon: ShoppingBasket, income: false },
  { name: "Monthly Salary", time: "Aug 12, 10:00 AM", amount: "+$2,400.00", co2: "0 kg", icon: HandCoins, income: true },
  { name: "Electricity Bill", time: "Aug 10, 4:18 PM", amount: "−$62.00", co2: "—", icon: Zap, income: false },
];

const spark = [{v:30},{v:42},{v:36},{v:50},{v:47},{v:67},{v:60},{v:82}];
const monthly = [
  {day:"Aug 1", kg:31},{day:"Aug 4",kg:35},{day:"Aug 7",kg:30},{day:"Aug 10",kg:38},
  {day:"Aug 14",kg:42},{day:"Aug 18",kg:37},{day:"Aug 22",kg:34},{day:"Aug 26",kg:29},{day:"Aug 30",kg:25},
];

function Sidebar({ open, close }: { open: boolean; close: () => void }) {
  return <aside className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 flex w-[220px] flex-col border-r border-border bg-surface-deep/80 px-4 py-6 backdrop-blur-xl transition-transform lg:translate-x-0`}>
    <div className="mb-8 flex items-center gap-3 px-2">
      <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground"><Leaf className="size-5" /></span>
      <div><div className="font-extrabold text-primary">EcoWallet</div><div className="text-xs text-muted-foreground">Dashboard</div></div>
      <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={close} aria-label="Close menu"><X /></Button>
    </div>
    <div className="mb-7 flex items-center gap-3 rounded-xl bg-card p-3">
      <div className="grid size-10 place-items-center rounded-full bg-primary/15 text-primary"><UserRound /></div>
      <div><div className="text-sm font-bold">Sarah</div><div className="mt-0.5 text-[10px] font-semibold uppercase text-primary">Premium User</div></div>
    </div>
    <nav className="space-y-1">
      {nav.map(([label, Icon], i) => <a key={label} href={`#${label.toLowerCase()}`} onClick={close} className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition-colors ${i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-card hover:text-foreground"}`}><Icon className="size-4" />{label}</a>)}
    </nav>
    <div className="mt-auto space-y-3 pt-8">
      <div className="rounded-xl bg-background px-3 py-3 text-xs text-muted-foreground"><Leaf className="mr-1.5 inline size-4 text-primary" />CO₂ Saved: <b className="text-foreground">18.2 Kg</b></div>
      <Button className="w-full"><Plus />Add Transaction</Button>
      <SignOutButton />
    </div>
  </aside>;
}

function SignOutButton() {
  const navigate = useNavigate();
  return <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth", replace: true }); }}><LogOut />Sign Out</Button>;
}

function CardTitle({ children }: { children: React.ReactNode }) { return <h2 className="text-sm font-bold text-foreground">{children}</h2>; }

function Dashboard() {
  const [menu, setMenu] = useState(false);
  const [period, setPeriod] = useState("This Month");
  const [name, setName] = useState("Sarah");
  useEffect(() => { void supabase.auth.getUser().then(async ({ data }) => {
    if (!data.user) return;
    const { data: profile } = await supabase.from("profiles").select("display_name").eq("user_id", data.user.id).maybeSingle();
    if (profile?.display_name) setName(profile.display_name);
  }); }, []);

  return <div className="min-h-screen bg-background text-foreground">
    {menu && <button className="fixed inset-0 z-30 bg-background/80 lg:hidden" aria-label="Close menu backdrop" onClick={() => setMenu(false)} />}
    <Sidebar open={menu} close={() => setMenu(false)} />
    <div className="lg:ml-[220px] xl:mr-[236px]">
      <main className="min-w-0 p-4 sm:p-6 lg:p-7">
        <header className="mb-6 flex flex-wrap items-center gap-3">
          <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setMenu(true)} aria-label="Open menu"><Menu /></Button>
          <div className="mr-auto"><p className="text-xs font-semibold uppercase text-primary">Financial overview</p><h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">Welcome {name}!</h1></div>
          <Button variant="outline" className="hidden sm:flex">Last 30 Days<ChevronDown /></Button>
          <Button variant="outline" size="icon" aria-label="Notifications"><Bell /></Button>
          <Button variant="outline" size="icon" aria-label="Share dashboard"><Share2 /></Button>
        </header>

        <section className="grid gap-4 2xl:grid-cols-[0.9fr_1.1fr]">
          <div className="eco-card flex min-h-[330px] flex-col p-5">
            <CardTitle>Total Balance</CardTitle>
            <div className="mt-5 text-4xl font-extrabold">$12,480.00</div>
            <div className="mt-2 text-sm font-semibold text-positive">+2.45% <span className="font-normal text-muted-foreground">This Month</span></div>
            <div className="mt-2 h-32 w-full">
              <ResponsiveContainer width="100%" height="100%"><AreaChart data={spark}><defs><linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.32}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs><Area type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={3} fill="url(#sparkFill)" /></AreaChart></ResponsiveContainer>
            </div>
            <div className="mt-auto flex gap-3"><Button className="flex-1"><Plus />Add</Button><Button variant="outline" className="flex-1"><Send />Send</Button></div>
          </div>
          <div className="eco-card p-5">
            <div className="mb-3 flex items-center justify-between"><CardTitle>Recent Transactions</CardTitle><button className="text-xs font-bold text-primary">View all</button></div>
            <div className="divide-y divide-border">{transactions.map((t) => <div key={t.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3">
              <span className="grid size-9 place-items-center rounded-lg bg-background text-primary"><t.icon className="size-4" /></span>
              <div className="min-w-0"><p className="truncate text-sm font-semibold">{t.name}</p><p className="text-[11px] text-muted-foreground">{t.time}</p></div>
              <div className="text-right"><p className={`text-sm font-bold ${t.income ? "text-positive" : "text-negative"}`}>{t.amount}</p><span className="rounded-full bg-background px-2 py-0.5 text-[10px] text-muted-foreground">CO₂ {t.co2}</span></div>
            </div>)}</div>
          </div>
        </section>

        <section className="my-4 grid grid-cols-2 gap-3 2xl:grid-cols-4">
          {[["Total Income","$6,200","text-positive"],["Total Expense","$3,350","text-negative"],["Available Budget","$1,500","text-foreground"],["Savings Rate","45%","text-positive"]].map(([label,value,color]) => <div key={label} className="eco-card p-4"><p className="text-xs text-muted-foreground">{label}</p><p className={`mt-2 text-xl font-extrabold ${color}`}>{value}</p></div>)}
        </section>

        <section className="eco-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-4"><CardTitle>Carbon Footprint Insights</CardTitle><div className="flex rounded-lg bg-background p-1">{["This Month","This Week","This Year"].map((p) => <button key={p} onClick={() => setPeriod(p)} className={`rounded-md px-3 py-1.5 text-[11px] font-bold ${period === p ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{p}</button>)}</div></div>
          <div className="mt-5 grid items-center gap-7 2xl:grid-cols-[1fr_240px]">
            <div><p className="mb-2 text-xs font-semibold text-muted-foreground">Monthly CO₂ Output</p><div className="h-52"><ResponsiveContainer width="100%" height="100%"><LineChart data={monthly} margin={{left:-18,right:8,top:8}}><CartesianGrid stroke="var(--border)" vertical={false}/><XAxis dataKey="day" tick={{fill:"var(--muted-foreground)",fontSize:10}} axisLine={false} tickLine={false}/><YAxis tick={{fill:"var(--muted-foreground)",fontSize:10}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:"var(--surface-deep)",border:"1px solid var(--border)",borderRadius:8}} formatter={(value) => [`${value} Kg CO₂e`, "Output"]}/><Line type="monotone" dataKey="kg" stroke="var(--primary)" strokeWidth={3} dot={false} activeDot={{r:5,fill:"var(--primary)"}}/></LineChart></ResponsiveContainer></div></div>
            <div><p className="mb-4 text-center text-xs font-semibold text-muted-foreground">Carbon Breakdown</p><div className="eco-donut relative mx-auto size-36 rounded-full"><div className="absolute inset-5 grid place-items-center rounded-full bg-card text-center"><div><b className="text-xl">126 kg</b><p className="text-[10px] text-muted-foreground">CO₂e</p></div></div></div><div className="mt-4 space-y-2 text-xs">{[["Transportation","bg-positive-soft","44%"],["Home","bg-primary","34%"],["Other","bg-warning","22%"]].map(([n,c,v]) => <div key={n} className="flex items-center"><i className={`mr-2 size-2 rounded-full ${c}`} /><span className="text-muted-foreground">{n}</span><b className="ml-auto">{v}</b></div>)}</div></div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-4"><span className="text-xs text-muted-foreground">Total CO₂ Reduced</span><b className="text-xl text-positive">18.4%</b><span className="text-xs text-muted-foreground">Your Carbon Footprint Is Improving Steadily. Keep Up The Good Work!</span></div>
        </section>
      </main>
    </div>
    <RightPanel />
  </div>;
}

function RightPanel() {
  return <aside className="border-t border-border bg-surface-deep/80 p-4 backdrop-blur-xl xl:fixed xl:inset-y-0 xl:right-0 xl:w-[236px] xl:overflow-y-auto xl:border-l xl:border-t-0">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
      <section className="eco-card p-4"><div className="flex items-center justify-between"><CardTitle>My Carbon Goals</CardTitle><button className="text-[11px] font-bold text-primary">Edit Goal</button></div><div className="relative mx-auto mt-4 grid size-28 place-items-center"><svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface-deep)" strokeWidth="9"/><circle cx="60" cy="60" r="50" fill="none" stroke="var(--primary)" strokeWidth="9" strokeLinecap="round" strokeDasharray="314" strokeDashoffset="126"/></svg><div className="text-center"><b className="text-2xl">60%</b><p className="text-[9px] text-muted-foreground">of monthly target</p></div></div></section>
      <section className="eco-card p-4"><CardTitle>Eco-Tips</CardTitle><div className="mt-3 space-y-3">{["Choose public transport twice this week.","Unplug idle devices overnight.","Try one plant-based meal today."].map(t => <div key={t} className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground"><Lightbulb className="mt-0.5 size-4 shrink-0 text-warning" />{t}</div>)}</div></section>
      <section className="eco-card p-4 sm:col-span-2 xl:col-span-1"><CardTitle>Offset Your Impact</CardTitle><div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">{[["Amazon Reforestation Project","https://picsum.photos/seed/amazonforest/480/240"],["GreenWind Energy Project","https://picsum.photos/seed/windenergy/480/240"]].map(([title,img]) => <article key={title} className="overflow-hidden rounded-xl bg-background"><img src={img} alt="Environmental project" className="h-20 w-full object-cover"/><div className="p-3"><p className="min-h-8 text-[11px] font-bold leading-snug">{title}</p><Button size="sm" className="mt-2 w-full">Support</Button></div></article>)}</div></section>
      <section className="eco-card p-4 sm:col-span-2 xl:col-span-1"><CardTitle>Your Eco Impact</CardTitle><div className="mt-3 grid grid-cols-2 gap-2"><div className="rounded-lg bg-background p-2 text-center"><Leaf className="mx-auto size-4 text-primary"/><p className="mt-1 text-[9px] text-muted-foreground">Trees Planted</p><b className="text-sm">15</b></div><div className="rounded-lg bg-background p-2 text-center"><Sparkles className="mx-auto size-4 text-primary"/><p className="mt-1 text-[9px] text-muted-foreground">CO₂ Offset</p><b className="text-sm">500 kg</b></div></div></section>
    </div>
  </aside>;
}
