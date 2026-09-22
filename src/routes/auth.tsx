import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Leaf, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Sign in — EcoWallet" },
    { name: "description", content: "Sign in to your EcoWallet financial and carbon dashboard." },
    { property: "og:title", content: "Sign in — EcoWallet" },
    { property: "og:description", content: "Access your EcoWallet financial and carbon dashboard." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    if (signup) {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin, data: { display_name: name || "EcoWallet User" } } });
      setBusy(false);
      if (error) return setMessage(error.message);
      if (!data.session) return setMessage("Check your email to confirm your account, then sign in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMessage(error.message);
    }
    navigate({ to: "/" });
  }

  async function googleSignIn() {
    setBusy(true); setMessage("");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    setBusy(false);
    if (result.error) setMessage(result.error.message);
    else if (!result.redirected) navigate({ to: "/" });
  }

  return <main className="grid min-h-screen place-items-center bg-transparent px-4 py-10">
    <div className="w-full max-w-md">
      <LinkLogo />
      <section className="eco-card mt-7 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase text-primary">Welcome to EcoWallet</p>
        <h1 className="mt-2 text-3xl font-extrabold">{signup ? "Create your account" : "Welcome back"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{signup ? "Start tracking your money and environmental impact." : "Sign in to view your dashboard."}</p>
        <form className="mt-7 space-y-4" onSubmit={submit}>
          {signup && <div className="space-y-2"><Label htmlFor="name">Display name</Label><div className="relative"><UserRound className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input id="name" value={name} onChange={e => setName(e.target.value)} className="pl-10" placeholder="Sarah" required /></div></div>}
          <div className="space-y-2"><Label htmlFor="email">Email</Label><div className="relative"><Mail className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" placeholder="you@example.com" required /></div></div>
          <div className="space-y-2"><Label htmlFor="password">Password</Label><div className="relative"><LockKeyhole className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input id="password" type="password" minLength={6} value={password} onChange={e => setPassword(e.target.value)} className="pl-10" placeholder="At least 6 characters" required /></div></div>
          {message && <p className="glass-inset rounded-lg p-3 text-xs text-foreground" role="status">{message}</p>}
          <Button className="w-full" size="lg" disabled={busy}>{busy ? "Please wait…" : signup ? "Create Account" : "Sign In"}</Button>
        </form>
        <div className="my-5 flex items-center gap-3 text-[10px] uppercase text-muted-foreground"><span className="h-px flex-1 bg-border"/>or<span className="h-px flex-1 bg-border"/></div>
        <Button variant="outline" size="lg" className="w-full" onClick={googleSignIn} disabled={busy}><span className="text-base font-extrabold">G</span>Continue with Google</Button>
        <p className="mt-6 text-center text-xs text-muted-foreground">{signup ? "Already have an account?" : "New to EcoWallet?"} <button className="font-bold text-primary" onClick={() => { setSignup(!signup); setMessage(""); }}>{signup ? "Sign in" : "Create account"}</button></p>
      </section>
    </div>
  </main>;
}

function LinkLogo() { return <a href="/" className="mx-auto flex w-fit items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground"><Leaf /></span><div><div className="text-xl font-extrabold text-primary">EcoWallet</div><div className="text-[10px] uppercase text-muted-foreground">Finance with purpose</div></div></a>; }