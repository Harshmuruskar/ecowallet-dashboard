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
    { title: "Luxe Resort — Management Dashboard" },
    { name: "description", content: "Track revenue, bookings, and guest satisfaction in one luxury dashboard." },
    { property: "og:title", content: "Luxe Resort — Management Dashboard" },
    { property: "og:description", content: "Track revenue, bookings, and guest satisfaction in one dashboard." },
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
  { name: "Ocean View Suite", time: "Today, 9:34 AM", amount: "+$450.00", co2: "Room", icon: CircleDollarSign, income: true },
  { name: "Fine Dining Booking", time: "Today, 8:12 AM", amount: "+$210.00", co2: "Dining", icon: ShoppingBasket, income: true },
  { name: "Spa Treatment", time: "Yesterday, 6:40 PM", amount: "+$180.00", co2: "Spa", icon: Sparkles, income: true },
  { name: "Supplier Invoice", time: "Aug 12, 10:00 AM", amount: "−$1,200.00", co2: "Cost", icon: ReceiptText, income: false },
  { name: "Maintenance", time: "Aug 10, 4:18 PM", amount: "−$340.00", co2: "Cost", icon: Zap, income: false },
];

const spark = [{v:30},{v:42},{v:36},{v:50},{v:47},{v:67},{v:60},{v:82}];
const monthly = [
  {day:"Aug 1", kg:31},{day:"Aug 4",kg:35},{day:"Aug 7",kg:30},{day:"Aug 10",kg:38},
  {day:"Aug 14",kg:42},{day:"Aug 18",kg:37},{day:"Aug 22",kg:34},{day:"Aug 26",kg:29},{day:"Aug 30",kg:25},
];

function Sidebar({ open, close }: { open: boolean; close: () => void }) {
  return <aside className={`${open ? "translate-x-0" : "-translate-x-full"} glass-panel fixed inset-y-0 left-0 z-40 flex w-[220px] flex-col border-r px-4 py-6 transition-transform lg:translate-x-0`}>
    <div className="mb-8 flex items-center gap-3 px-2">
      <span className="grid size-10 place-items-center rounded-[14px] bg-primary text-primary-foreground shadow-sm"><Sparkles className="size-5" /></span>
      <div><div className="font-serif text-lg font-bold tracking-tight text-primary">Luxe Resort</div><div className="text-[11px] font-medium text-muted-foreground">Management</div></div>
      <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={close} aria-label="Close menu"><X /></Button>
    </div>
    <div className="glass-inset mb-7 flex items-center gap-3 rounded-xl p-3">
      <div className="grid size-10 place-items-center rounded-full bg-primary/15 text-primary"><UserRound /></div>
      <div><div className="text-sm font-bold">Sarah</div><div className="mt-0.5 text-[10px] font-semibold uppercase text-primary">Premium User</div></div>
    </div>
    <nav className="space-y-1">
      {nav.map(([label, Icon], i) => <a key={label} href={`#${label.toLowerCase()}`} onClick={close} className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition-colors ${i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-card hover:text-foreground"}`}><Icon className="size-4" />{label}</a>)}
    </nav>
    <div className="mt-auto space-y-3 pt-8">
      <div className="glass-inset rounded-xl px-3 py-3 text-xs font-medium text-muted-foreground"><Sparkles className="mr-1.5 inline size-4 text-primary" />Guests Online: <b className="text-foreground">124</b></div>
      <Button className="w-full rounded-full font-semibold shadow-sm"><Plus />New Booking</Button>
      <SignOutButton />
    </div>
  </aside>;
}

function SignOutButton() {
  const navigate = useNavigate();
  return <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth", replace: true }); }}><LogOut />Sign Out</Button>;
}

function CardTitle({ children }: { children: React.ReactNode }) { return <h2 className="font-serif text-[17px] font-semibold tracking-tight text-foreground">{children}</h2>; }

function Dashboard() {
  const [menu, setMenu] = useState(false);
  const [period, setPeriod] = useState("This Month");
  const [name, setName] = useState("Sarah");
  useEffect(() => { void supabase.auth.getUser().then(async ({ data }) => {
    if (!data.user) return;
    const { data: profile } = await supabase.from("profiles").select("display_name").eq("user_id", data.user.id).maybeSingle();
    if (profile?.display_name) setName(profile.display_name);
  }); }, []);

  return <div className="min-h-screen bg-transparent text-foreground">
    {menu && <button className="fixed inset-0 z-30 bg-background/80 lg:hidden" aria-label="Close menu backdrop" onClick={() => setMenu(false)} />}
    <Sidebar open={menu} close={() => setMenu(false)} />
    <div className="lg:ml-[220px] xl:mr-[236px]">
      <main className="min-w-0 p-4 sm:p-6 lg:p-7">
        <header className="mb-6 flex flex-wrap items-center gap-3">
          <Button variant="outline" size="icon" className="lg:hidden rounded-full shadow-sm" onClick={() => setMenu(true)} aria-label="Open menu"><Menu /></Button>
          <div className="mr-auto"><p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Resort & Restaurant</p><h1 className="mt-1 font-serif text-3xl font-bold tracking-tight sm:text-4xl">Welcome {name}</h1></div>
          <Button variant="outline" className="hidden sm:flex rounded-full font-medium shadow-sm">Last 30 Days<ChevronDown /></Button>
          <Button variant="outline" size="icon" aria-label="Notifications" className="rounded-full shadow-sm"><Bell className="size-4" /></Button>
          <Button variant="outline" size="icon" aria-label="Share dashboard" className="rounded-full shadow-sm"><Share2 className="size-4" /></Button>
        </header>

        <section className="grid gap-4 2xl:grid-cols-[0.9fr_1.1fr]">
          <div className="eco-card flex min-h-[330px] flex-col p-5">
            <CardTitle>Total Revenue</CardTitle>
            <div className="mt-5 font-serif text-5xl font-bold tracking-tighter text-foreground">$42,480.00</div>
            <div className="mt-2 text-[13px] font-semibold text-positive">+2.45% <span className="font-medium text-muted-foreground">This Month</span></div>
            <div className="mt-2 h-32 w-full">
              <ResponsiveContainer width="100%" height="100%"><AreaChart data={spark}><defs><linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.32}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs><Area type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={3} fill="url(#sparkFill)" /></AreaChart></ResponsiveContainer>
            </div>
            <div className="mt-auto flex gap-3"><Button className="flex-1 rounded-full font-semibold shadow-sm"><Plus />Add</Button><Button variant="outline" className="flex-1 rounded-full font-semibold shadow-sm"><Send />Send</Button></div>
          </div>
          <div className="eco-card p-5">
            <div className="mb-3 flex items-center justify-between"><CardTitle>Recent Transactions</CardTitle><button className="text-xs font-bold text-primary">View all</button></div>
            <div className="divide-y divide-border">{transactions.map((t) => <div key={t.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3">
              <span className="glass-inset grid size-9 place-items-center rounded-lg text-primary"><t.icon className="size-4" /></span>
              <div className="min-w-0"><p className="truncate text-sm font-semibold">{t.name}</p><p className="text-[11px] text-muted-foreground">{t.time}</p></div>
              <div className="text-right"><p className={`text-sm font-bold ${t.income ? "text-positive" : "text-negative"}`}>{t.amount}</p><span className="glass-inset rounded-full px-2 py-0.5 text-[10px] text-muted-foreground">{t.co2}</span></div>
            </div>)}</div>
          </div>
        </section>

        <section className="my-4 grid grid-cols-2 gap-3 2xl:grid-cols-4">
          {[["Room Revenue","$36,200","text-positive"],["Restaurant","$14,350","text-positive"],["Available Tables","12","text-foreground"],["Occupancy Rate","85%","text-positive"]].map(([label,value,color]) => <div key={label} className="eco-card p-5"><p className="text-[13px] font-medium text-muted-foreground">{label}</p><p className={`mt-2 font-serif text-3xl font-bold tracking-tight ${color}`}>{value}</p></div>)}
        </section>

        <section className="eco-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-4"><CardTitle>Guest Satisfaction Insights</CardTitle><div className="glass-inset flex rounded-full p-1">{["This Month","This Week","This Year"].map((p) => <button key={p} onClick={() => setPeriod(p)} className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${period === p ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{p}</button>)}</div></div>
          <div className="mt-5 grid items-center gap-7 2xl:grid-cols-[1fr_240px]">
            <div><p className="mb-2 text-xs font-semibold text-muted-foreground">Weekly Booking Trends</p><div className="h-52"><ResponsiveContainer width="100%" height="100%"><LineChart data={monthly} margin={{left:-18,right:8,top:8}}><CartesianGrid stroke="var(--border)" vertical={false}/><XAxis dataKey="day" tick={{fill:"var(--muted-foreground)",fontSize:10}} axisLine={false} tickLine={false}/><YAxis tick={{fill:"var(--muted-foreground)",fontSize:10}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:"var(--surface-deep)",border:"1px solid var(--border)",borderRadius:8}} formatter={(value) => [`${value} Bookings`, "Count"]}/><Line type="monotone" dataKey="kg" stroke="var(--primary)" strokeWidth={3} dot={false} activeDot={{r:5,fill:"var(--primary)"}}/></LineChart></ResponsiveContainer></div></div>
            <div><p className="mb-4 text-center text-xs font-semibold text-muted-foreground">Revenue Breakdown</p><div className="eco-donut relative mx-auto size-36 rounded-full"><div className="absolute inset-5 grid place-items-center rounded-full bg-card text-center"><div><b className="font-serif text-xl">$50K</b><p className="text-[10px] text-muted-foreground">Revenue</p></div></div></div><div className="mt-4 space-y-2 text-xs">{[["Rooms","bg-positive-soft","55%"],["Dining","bg-primary","30%"],["Spa & Other","bg-warning","15%"]].map(([n,c,v]) => <div key={n} className="flex items-center"><i className={`mr-2 size-2 rounded-full ${c}`} /><span className="text-muted-foreground">{n}</span><b className="ml-auto">{v}</b></div>)}</div></div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-4"><span className="text-xs text-muted-foreground">Total Revenue Growth</span><b className="text-xl text-positive">+18.4%</b><span className="text-xs text-muted-foreground">Your resort is performing exceptionally well this season.</span></div>
        </section>
      </main>
    </div>
    <RightPanel />
  </div>;
}

function RightPanel() {
  return <aside className="glass-panel border-t p-4 xl:fixed xl:inset-y-0 xl:right-0 xl:w-[236px] xl:overflow-y-auto xl:border-l xl:border-t-0">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
      <section className="eco-card p-4"><div className="flex items-center justify-between"><CardTitle>Monthly Revenue Target</CardTitle><button className="text-[11px] font-bold text-primary">Edit Goal</button></div><div className="relative mx-auto mt-4 grid size-28 place-items-center"><svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface-deep)" strokeWidth="9"/><circle cx="60" cy="60" r="50" fill="none" stroke="var(--primary)" strokeWidth="9" strokeLinecap="round" strokeDasharray="314" strokeDashoffset="126"/></svg><div className="text-center"><b className="font-serif text-2xl">60%</b><p className="text-[9px] text-muted-foreground">of monthly target</p></div></div></section>
      <section className="eco-card p-4"><CardTitle>Resort Operations</CardTitle><div className="mt-3 space-y-3">{["Review VIP guest arrivals.","Confirm evening dining reservations.","Check spa therapist schedules."].map(t => <div key={t} className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground"><Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />{t}</div>)}</div></section>
      <section className="eco-card p-4 sm:col-span-2 xl:col-span-1"><CardTitle>Resort Highlights</CardTitle><div className="mt-3 grid grid-cols-2 gap-2"><div className="glass-inset rounded-lg p-2 text-center"><UserRound className="mx-auto size-4 text-primary"/><p className="mt-1 text-[9px] text-muted-foreground">Guests Today</p><b className="font-serif text-lg">342</b></div><div className="glass-inset rounded-lg p-2 text-center"><Sparkles className="mx-auto size-4 text-primary"/><p className="mt-1 text-[9px] text-muted-foreground">Satisfaction</p><b className="font-serif text-lg">4.9/5</b></div></div></section>
    </div>
  </aside>;
}
