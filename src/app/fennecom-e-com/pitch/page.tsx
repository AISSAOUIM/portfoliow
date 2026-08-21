"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShoppingBag, BarChart3, Truck, Shield, Globe, Zap,
  Check, Package, CreditCard, Users, TrendingUp,
  ChevronDown, ArrowRight, Store, Bot, Palette,
  BadgeDollarSign, X, MessageCircle, Mail
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return { count, ref };
}

function StatCard({ num, label, suffix = "", color }: { num: number; label: string; suffix?: string; color: string }) {
  const { count, ref } = useCounter(num);
  return (
    <div className="stat-card">
      <div className="stat-num" style={{ color }}>
        <span ref={ref}>{count}</span>{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button onClick={() => setOpen(!open)} className="faq-btn">
        <span>{q}</span>
        <ChevronDown style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.3s", width: 16, height: 16, color: "rgba(255,255,255,0.4)" }} />
      </button>
      {open && <p className="faq-answer">{a}</p>}
    </div>
  );
}

export default function FennecomPitchPage() {
  const [billingAnnual, setBillingAnnual] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const monthly = { starter: 49, growth: 99, enterprise: 199 };
  const annual = {
    starter: Math.round(49 * 12 * 0.75),
    growth: Math.round(99 * 12 * 0.75),
    enterprise: Math.round(199 * 12 * 0.75),
  };
  const prices = billingAnnual ? annual : monthly;
  const period = billingAnnual ? "/yr" : "/mo";

  const features = [
    { icon: Store, color: "#2e9e54", title: "Multi-Tenant Storefronts", desc: "Each client gets their own branded store, domain, admin panel, and isolated database — all from one deployment." },
    { icon: Globe, color: "#3b82f6", title: "Arabic-First / RTL Native", desc: "100% RTL layout, Arabic typography, multi-language routing (AR/EN/FR) and MENA-region currency support (SAR, DZD, USD)." },
    { icon: Package, color: "#f59e0b", title: "Fragrance ERP Modules", desc: "Specialized Oud grading, Dehn Oud stock, mixed oil formulas, Boukhour, Burners, Atomizers & Gift Boxes management." },
    { icon: BarChart3, color: "#a855f7", title: "Real-Time Analytics & AI", desc: "AI-powered sales analytics, inventory forecasting, AI Landing Page Builder, and AI Product Description Generator." },
    { icon: Truck, color: "#06b6d4", title: "10+ Shipping Integrations", desc: "Yalidine, Maystro, Noest, ZR Express, Procolis, Kazi Tour, Guepex, EMS and more — auto-configured per tenant." },
    { icon: CreditCard, color: "#ec4899", title: "Payment Gateways", desc: "Stripe, PayPal, Dahabia (CIB), BaridiMob, CCP — configured per region for maximum checkout conversion." },
    { icon: TrendingUp, color: "#10b981", title: "Google Merchant & Ads", desc: "Auto XML Product Feed for Google Merchant Center, Google Ads conversion tracking, GTM and GA4 — per store." },
    { icon: Users, color: "#f97316", title: "Staff & Operations", desc: "Attendance tracking, check-in/out, break management, seller commissions, and full financial P&L accounting." },
    { icon: Bot, color: "#8b5cf6", title: "AI Content Suite", desc: "AI Landing Builder, AI Product Copywriter, AI Analytics Advisor — powered by Google Gemini." },
    { icon: Shield, color: "#2e9e54", title: "Security & Auth", desc: "NextAuth.js, Role-based access (USER / ADMIN / OWNER), per-tenant isolated Postgres databases." },
    { icon: Palette, color: "#e11d48", title: "Full White-Label Theming", desc: "Every color, font, logo, and UI element is configurable per store via environment variables & admin panel." },
    { icon: Zap, color: "#eab308", title: "Docker & VPS Ready", desc: "Production Docker Compose + Nginx + SSL. Deploy any new tenant in under 5 minutes with automated scripts." },
  ];

  const plans = [
    {
      name: "Starter", nameAr: "مبتدئ", key: "starter" as const,
      color: "#2e9e54", grad: "from-emerald-900/30 to-emerald-950/50",
      border: "rgba(46,158,84,0.2)", badge: "",
      desc: "Perfect for a single perfume store owner getting started online.",
      features: ["1 Branded Storefront", "Arabic RTL + Multi-language", "Product & Order Management", "1 Shipping Integration", "BaridiMob / CCP Payment", "Basic Analytics Dashboard", "Admin Panel Access", "Email Support"],
    },
    {
      name: "Growth", nameAr: "نمو", key: "growth" as const,
      color: "#f59e0b", grad: "from-amber-900/30 to-amber-950/50",
      border: "rgba(245,158,11,0.35)", badge: "Most Popular",
      desc: "For growing fragrance brands that need multi-category management.",
      features: ["1 Branded Storefront", "Oud, Boukhour & Perfume Modules", "Google Merchant Center Feed", "All Shipping Integrations", "Stripe + PayPal + Local Payments", "AI Product Descriptions", "Staff Attendance Tracking", "Financial P&L Dashboard", "Priority Support"],
    },
    {
      name: "Enterprise", nameAr: "مؤسسي", key: "enterprise" as const,
      color: "#a855f7", grad: "from-purple-900/30 to-purple-950/50",
      border: "rgba(168,85,247,0.2)", badge: "Full Power",
      desc: "For agencies and large fragrance houses managing multiple brands.",
      features: ["Up to 5 Branded Storefronts", "All Modules (Oud, Clothes, Cosmetics…)", "Google Ads + GA4 + GTM Integration", "AI Landing Page Builder", "AI Sales Analytics Advisor", "Custom Theming Per Tenant", "Full Staff & Payroll System", "API Access & Custom Integrations", "Dedicated Technical Support", "Monthly Strategy Call"],
    },
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #040c0e; color: #fff; font-family: 'Inter', system-ui, sans-serif; }
        a { text-decoration: none; color: inherit; }
        .grad-text {
          background: linear-gradient(135deg, #2e9e54 0%, #D4AF37 50%, #7a1540 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .glass {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 16px; border-radius: 100px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: #2e9e54;
        }
        /* STAT */
        .stat-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; text-align: center; transition: transform .3s; }
        .stat-card:hover { transform: scale(1.05); }
        .stat-num { font-size: clamp(32px, 5vw, 44px); font-weight: 800; margin-bottom: 8px; }
        .stat-label { color: rgba(255,255,255,0.5); font-size: 13px; }
        /* FEATURE CARD */
        .feat-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 24px; transition: transform .3s; }
        .feat-card:hover { transform: scale(1.02); }
        .feat-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
        /* PRICING */
        .plan-card { background: rgba(255,255,255,0.04); border-radius: 20px; overflow: hidden; position: relative; transition: transform .3s; }
        .plan-card:hover { transform: translateY(-4px); }
        .plan-header { padding: 28px; }
        .plan-body { padding: 28px; padding-top: 20px; }
        .plan-price { font-size: 52px; font-weight: 800; color: #fff; }
        .plan-feat-list { list-style: none; margin-bottom: 24px; display: flex; flex-direction: column; gap: 12px; }
        .plan-feat-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.7); }
        .plan-btn { width: 100%; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 13px; cursor: pointer; border: none; transition: transform .2s; }
        .plan-btn:hover { transform: scale(1.03); }
        /* BUYOUT */
        .buyout-card { background: rgba(255,255,255,0.04); border-radius: 20px; overflow: hidden; }
        /* FAQ */
        .faq-item { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; overflow: hidden; }
        .faq-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; background: none; border: none; color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 600; cursor: pointer; text-align: left; transition: background .2s; }
        .faq-btn:hover { background: rgba(255,255,255,0.04); }
        .faq-answer { padding: 0 20px 18px; font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.8; }
        /* TOGGLE */
        .toggle-track { width: 48px; height: 24px; border-radius: 100px; position: relative; cursor: pointer; border: none; transition: background .3s; }
        .toggle-thumb { position: absolute; top: 4px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: left .3s; }
        /* NAVBAR */
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; border-bottom: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
        .nav-links { display: flex; gap: 24px; }
        .nav-links a { font-size: 13px; color: rgba(255,255,255,0.5); transition: color .2s; }
        .nav-links a:hover { color: #fff; }
        @media (max-width: 640px) { .nav-links { display: none; } }
        /* MODAL */
        .modal-overlay { position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center; padding: 16px; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px); }
        .modal-box { background: rgba(10,20,15,0.95); border: 1px solid rgba(46,158,84,0.3); border-radius: 20px; padding: 32px; max-width: 420px; width: 100%; position: relative; }
        .contact-row { display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; transition: background .2s; cursor: pointer; }
        .contact-row:hover { background: rgba(255,255,255,0.08); }
        /* BLOB */
        .blob1 { position: fixed; top: -15%; left: -10%; width: 50%; height: 50%; border-radius: 50%; filter: blur(160px); background: radial-gradient(circle, rgba(27,94,55,0.18) 0%, transparent 70%); pointer-events: none; }
        .blob2 { position: fixed; bottom: -15%; right: -10%; width: 40%; height: 50%; border-radius: 50%; filter: blur(140px); background: radial-gradient(circle, rgba(122,21,64,0.14) 0%, transparent 70%); pointer-events: none; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .float { animation: float 4s ease-in-out infinite; }
        @keyframes pulse-g { 0%,100% { box-shadow: 0 0 20px rgba(46,158,84,0.3); } 50% { box-shadow: 0 0 40px rgba(46,158,84,0.6); } }
        .pulse-g { animation: pulse-g 2.5s ease-in-out infinite; }
        /* GRID HELPERS */
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        @media (max-width: 900px) { .grid-4 { grid-template-columns: repeat(2, 1fr); } .grid-3 { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .grid-4 { grid-template-columns: repeat(2, 1fr); } .grid-3 { grid-template-columns: 1fr; } .grid-2 { grid-template-columns: 1fr; } }
        .section { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
        .text-center { text-align: center; }
        h1 { font-size: clamp(40px, 7vw, 80px); font-weight: 800; line-height: 1.05; letter-spacing: -1px; }
        h2 { font-size: clamp(30px, 4vw, 48px); font-weight: 800; line-height: 1.15; }
        .section-sub { color: rgba(255,255,255,0.45); font-size: 16px; max-width: 520px; margin: 16px auto 0; line-height: 1.7; }
        .cta-primary { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; border-radius: 100px; font-weight: 700; color: #fff; font-size: 15px; cursor: pointer; border: none; background: linear-gradient(135deg, #1b5e37 0%, #7a1540 100%); box-shadow: 0 0 30px rgba(27,94,55,0.35); transition: transform .2s; }
        .cta-primary:hover { transform: scale(1.05); }
        .cta-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; border-radius: 100px; font-weight: 600; color: rgba(255,255,255,0.7); font-size: 15px; cursor: pointer; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); transition: transform .2s; }
        .cta-secondary:hover { transform: scale(1.05); background: rgba(255,255,255,0.1); }
      `}</style>

      <div className="blob1" />
      <div className="blob2" />

      {/* ── NAVBAR ── */}
      <nav className="nav">
        <div className="nav-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, background: "linear-gradient(135deg,#1b5e37,#7a1540)" }}>🪷</div>
            <span style={{ fontWeight: 700, fontSize: 15 }}>Fennecom <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>SaaS</span></span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#buyout">Buy Codebase</a>
            <a href="#faq">FAQ</a>
          </div>
          <button onClick={() => setContactOpen(true)} className="cta-primary pulse-g" style={{ padding: "8px 20px", fontSize: 13 }}>
            <MessageCircle style={{ width: 15, height: 15 }} /> Contact Us
          </button>
        </div>
      </nav>

      <main style={{ paddingTop: 64 }}>

        {/* ── HERO ── */}
        <section className="section text-center" style={{ paddingTop: 80, paddingBottom: 48 }}>
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <span className="badge">✦ The MENA Perfume E-commerce Platform</span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} style={{ marginTop: 28 }}>
            Launch Your Perfume<br /><span className="grad-text">Empire Online.</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="section-sub">
            The only Arabic-native, multi-tenant SaaS built exclusively for luxury perfume & fragrance brands in the Gulf & MENA region. Powered by Next.js 14, Docker, and a full fragrance ERP.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 36, marginBottom: 56 }}>
            <a href="#pricing" className="cta-primary">Get Started <ArrowRight style={{ width: 16, height: 16 }} /></a>
            <a href="#buyout" className="cta-secondary"><BadgeDollarSign style={{ width: 16, height: 16 }} /> Buy Full Codebase</a>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 14 }}>Live stores powered by this platform</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {["Almaram 🪷", "Golden Garden 🌹", "Tasneem 🌸", "Chicfemme 💄", "Elhimma 🕌", "Fennecom ✨"].map(s => (
                <span key={s} className="glass" style={{ padding: "8px 18px", borderRadius: 100, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{s}</span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 72px" }}>
          <div className="grid-4">
            <StatCard num={6} label="Live Tenant Stores" suffix="+" color="#2e9e54" />
            <StatCard num={50000} label="Lines of Production Code" suffix="+" color="#f59e0b" />
            <StatCard num={10} label="Shipping Integrations" suffix="+" color="#a855f7" />
            <StatCard num={428} label="Revenue Generated ($)" color="#ec4899" />
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="section">
          <div className="text-center" style={{ marginBottom: 52 }}>
            <span className="badge">Platform Features</span>
            <h2 style={{ marginTop: 18 }}>Everything You Need to<br /><span className="grad-text">Dominate the Market.</span></h2>
          </div>
          <div className="grid-3">
            {features.map((f, i) => (
              <motion.div key={f.title} className="feat-card" variants={fadeUp} initial="hidden" whileInView="show" custom={i % 3} viewport={{ once: true }}>
                <div className="feat-icon" style={{ background: f.color + "20" }}>
                  <f.icon style={{ width: 20, height: 20, color: f.color }} />
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="section">
          <div className="text-center" style={{ marginBottom: 52 }}>
            <span className="badge">💰 Pricing Plans</span>
            <h2 style={{ marginTop: 18 }}>Simple, Transparent<br /><span className="grad-text">Subscription Plans.</span></h2>
            <p className="section-sub">Start small or go enterprise. No hidden fees. Cancel anytime. Includes full setup & Arabic support.</p>
            {/* Toggle */}
            <div className="glass" style={{ display: "inline-flex", alignItems: "center", gap: 14, marginTop: 28, padding: "8px 20px", borderRadius: 100 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: !billingAnnual ? "#fff" : "rgba(255,255,255,0.4)" }}>Monthly</span>
              <button onClick={() => setBillingAnnual(!billingAnnual)} className="toggle-track" style={{ background: billingAnnual ? "#2e9e54" : "rgba(255,255,255,0.15)" }}>
                <span className="toggle-thumb" style={{ left: billingAnnual ? 28 : 4 }} />
              </button>
              <span style={{ fontSize: 14, fontWeight: 500, color: billingAnnual ? "#fff" : "rgba(255,255,255,0.4)" }}>
                Annual <span style={{ fontSize: 11, fontWeight: 700, color: "#4ade80" }}>-25%</span>
              </span>
            </div>
          </div>

          <div className="grid-3" style={{ alignItems: "start" }}>
            {plans.map((plan, i) => (
              <motion.div key={plan.name} className="plan-card" style={{ border: `1px solid ${plan.border}`, boxShadow: plan.badge === "Most Popular" ? `0 0 30px ${plan.color}20` : "none" }}
                variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}>
                {plan.badge && (
                  <div style={{ position: "absolute", top: 16, right: 16, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, background: plan.color + "25", color: plan.color }}>
                    {plan.badge}
                  </div>
                )}
                <div className="plan-header" style={{ background: `linear-gradient(135deg, ${plan.color}18, transparent)` }}>
                  <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: plan.color, marginBottom: 4 }}>{plan.nameAr}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{plan.name}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 20, lineHeight: 1.6 }}>{plan.desc}</p>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                    <span className="plan-price">${prices[plan.key]}</span>
                    <span style={{ color: "rgba(255,255,255,0.4)", marginBottom: 8, fontSize: 13 }}>{period}</span>
                  </div>
                  {billingAnnual && <p style={{ fontSize: 11, color: plan.color, marginTop: 4 }}>Billed ${prices[plan.key]} per year</p>}
                </div>
                <div className="plan-body">
                  <ul className="plan-feat-list">
                    {plan.features.map(f => (
                      <li key={f}><Check style={{ width: 15, height: 15, color: plan.color, flexShrink: 0 }} />{f}</li>
                    ))}
                  </ul>
                  <button onClick={() => setContactOpen(true)} className="plan-btn" style={{ background: plan.color + "20", border: `1px solid ${plan.color}40`, color: plan.color }}>
                    Get Started with {plan.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.28)", fontSize: 12, marginTop: 28 }}>
            🔒 All plans include SSL, automated backups, and 2-week onboarding support. Prices in USD.
          </p>
        </section>

        {/* ── BUYOUT ── */}
        <section id="buyout" className="section">
          <div className="text-center" style={{ marginBottom: 52 }}>
            <span className="badge">🏆 Own The Platform</span>
            <h2 style={{ marginTop: 18 }}>Buy the Full<br /><span className="grad-text">Codebase & IP.</span></h2>
            <p className="section-sub">Don&apos;t want subscriptions? Own the entire platform outright. One-time payment, full codebase, exclusive rights — yours forever.</p>
          </div>

          <div className="grid-2">
            {/* Standard */}
            <motion.div className="buyout-card" style={{ border: "1px solid rgba(59,130,246,0.25)" }} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div style={{ padding: 32, background: "linear-gradient(135deg, rgba(30,58,138,0.3), rgba(30,27,75,0.5))" }}>
                <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#60a5fa", display: "block", marginBottom: 8 }}>Standard</span>
                <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Codebase Sale</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>Source code + full IP transfer. You host, you own, you scale.</p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  <span style={{ fontSize: 58, fontWeight: 800 }}>$3,500</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>one-time</span>
                </div>
                <p style={{ fontSize: 11, color: "#60a5fa", marginTop: 6 }}>With active VPS + live tenants transferred</p>
              </div>
              <div style={{ padding: 32, paddingTop: 20 }}>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                  {["Complete Next.js 14 Source Code", "All Admin & ERP Modules", "Live VPS Server + Docker Setup", "All Active Tenant Databases", "Domain & SSL Configuration", "Deployment Automation Scripts", "2 Weeks Technical Handover", "Full Code Documentation"].map(f => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                      <Check style={{ width: 15, height: 15, color: "#60a5fa", flexShrink: 0, marginTop: 2 }} />{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setContactOpen(true)} className="plan-btn" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)", color: "#60a5fa" }}>
                  Inquire About Standard Buyout
                </button>
              </div>
            </motion.div>

            {/* Exclusive Gulf */}
            <motion.div className="buyout-card" style={{ border: "1px solid rgba(245,158,11,0.35)", boxShadow: "0 0 40px rgba(245,158,11,0.08)" }} variants={fadeUp} initial="hidden" whileInView="show" custom={0.1} viewport={{ once: true }}>
              <div style={{ padding: 32, background: "linear-gradient(135deg, rgba(120,53,15,0.3), rgba(76,29,149,0.4))" }}>
                <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#fbbf24", display: "block", marginBottom: 8 }}>⭐ Premium — Exclusive</span>
                <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Gulf Exclusive Deal</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>Full codebase + guaranteed <span style={{ color: "#fbbf24", fontWeight: 700 }}>Non-Compete</span> for the entire Gulf & MENA region.</p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  <span style={{ fontSize: 58, fontWeight: 800 }}>$7,500</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>one-time</span>
                </div>
                <p style={{ fontSize: 11, color: "#fbbf24", marginTop: 6 }}>Codebase only (no users transferred). Regional exclusivity included.</p>
              </div>
              <div style={{ padding: 32, paddingTop: 20 }}>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                  {[
                    "Full Source Code + All Modules",
                    "Signed Regional Non-Compete Agreement",
                    "Won't sell to any Gulf/MENA e-commerce competitor",
                    "Google Merchant Center & Ads Integration",
                    "Full Fragrance ERP (Oud, Boukhour, Cosmetics…)",
                    "AI Content Suite (Gemini AI powered)",
                    "Docker + VPS Deployment Guide",
                    "30 Days Dedicated Technical Support",
                    "White-Label Rebranding Assistance",
                    "Monthly Strategy Call (3 months)",
                  ].map(f => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                      <Check style={{ width: 15, height: 15, color: "#fbbf24", flexShrink: 0, marginTop: 2 }} />{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setContactOpen(true)} className="plan-btn" style={{ background: "linear-gradient(135deg, #92400e, #6d28d9)", color: "#fff", boxShadow: "0 0 20px rgba(245,158,11,0.2)" }}>
                  🏆 Claim Gulf Exclusivity — $7,500
                </button>
              </div>
            </motion.div>
          </div>

          <div className="glass" style={{ marginTop: 36, borderRadius: 16, padding: "20px 28px", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7 }}>
              💡 A software agency in Saudi Arabia or UAE would quote <strong style={{ color: "rgba(255,255,255,0.7)" }}>$15,000 – $35,000+</strong> to build a comparable custom platform from scratch.
              You get the same result, immediately deployable, at a fraction of the cost.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="section" style={{ maxWidth: 760 }}>
          <div className="text-center" style={{ marginBottom: 44 }}>
            <span className="badge">FAQ</span>
            <h2 style={{ marginTop: 18 }}>Frequently Asked<br /><span className="grad-text">Questions.</span></h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { q: "Is the platform ready to use out-of-the-box?", a: "Yes. The platform is live in production with active stores. Upon purchase, you receive a fully configured VPS, all Docker containers running, active databases, and a step-by-step handover guide." },
              { q: "Can I add more tenant stores after buying?", a: "Absolutely. Adding a new store takes less than 5 minutes using the provided deployment scripts. The multi-tenant architecture supports unlimited storefronts from a single codebase." },
              { q: "What does the Non-Compete agreement cover?", a: "All GCC countries (Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman) and North Africa (Algeria, Morocco, Egypt, Tunisia). The seller guarantees not to sell, license, or deploy the same codebase to any competing e-commerce perfume or fragrance business in this region." },
              { q: "What tech stack is required to maintain it?", a: "Next.js 14 / TypeScript knowledge is helpful. The system is containerized with Docker and comes with full documentation. Any Node.js developer can maintain and extend it." },
              { q: "Can subscription plans cover Gulf/Saudi stores?", a: "Yes. The platform is 100% Arabic RTL, supports SAR currency, and includes Google Merchant Center feeds optimized for Saudi Arabia targeting. Built specifically for the Gulf market." },
              { q: "What payment methods do Saudi customers get at checkout?", a: "Stripe (Visa/Mastercard), PayPal, and the platform can be extended to support Mada or STC Pay via Stripe's Saudi gateway. The admin panel lets you enable/disable payment methods per store." },
              { q: "Do subscriptions include hosting?", a: "Yes. All subscription plans include hosting on our VPS infrastructure. Buyout plans transfer the server to you, or we help you migrate to any cloud provider (AWS, GCP, DigitalOcean, Hetzner)." },
            ].map(item => <FAQ key={item.q} q={item.q} a={item.a} />)}
          </div>
        </section>

        {/* ── CTA FOOTER ── */}
        <section className="section text-center" style={{ paddingTop: 20, paddingBottom: 80 }}>
          <div className="glass" style={{ borderRadius: 28, padding: "64px 40px", border: "1px solid rgba(46,158,84,0.2)", boxShadow: "0 0 60px rgba(27,94,55,0.1)" }}>
            <div className="float" style={{ fontSize: 52, marginBottom: 24 }}>🪷</div>
            <h2>Ready to Launch Your<br /><span className="grad-text">Perfume Empire?</span></h2>
            <p className="section-sub">Whether you want a monthly subscription or full ownership of the platform — let&apos;s talk. We&apos;ll have you live in days, not months.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 32 }}>
              <button onClick={() => setContactOpen(true)} className="cta-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
                <MessageCircle style={{ width: 18, height: 18 }} /> Start a Conversation
              </button>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 12, lineHeight: 1.8 }}>
            © 2026 Fennecom SaaS — Multi-Tenant Perfume E-commerce Platform<br />
            <a href="https://fennecom.com" style={{ transition: "color .2s" }} onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")} onMouseLeave={e => (e.currentTarget.style.color = "")}>fennecom.com</a>
          </p>
        </footer>

      </main>

      {/* ── CONTACT MODAL ── */}
      {contactOpen && (
        <div className="modal-overlay" onClick={() => setContactOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button onClick={() => setContactOpen(false)} style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.5)" }}>
              <X style={{ width: 15, height: 15 }} />
            </button>
            <div style={{ fontSize: 32, marginBottom: 14 }}>🪷</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Get in Touch</h3>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.6 }}>Contact us to get started with a subscription or discuss a codebase purchase.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="https://wa.me/213541467641?text=Hello%21%20I%20am%20interested%20in%20Fennecom%20SaaS." target="_blank" rel="noopener noreferrer" className="contact-row" style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)" }}>
                <MessageCircle style={{ width: 20, height: 20, color: "#25d366" }} />
                <div><p style={{ fontWeight: 600, fontSize: 14, color: "#25d366" }}>WhatsApp Instant Chat</p><p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>+213 541 46 76 41</p></div>
              </a>
              <a href="https://mostaql.com" target="_blank" rel="noopener noreferrer" className="contact-row">
                <MessageCircle style={{ width: 20, height: 20, color: "#fbbf24" }} />
                <div><p style={{ fontWeight: 600, fontSize: 14 }}>Mostaql (مستقل)</p><p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Send a project request directly</p></div>
              </a>
              <a href="https://fennecom.com" target="_blank" rel="noopener noreferrer" className="contact-row">
                <Globe style={{ width: 20, height: 20, color: "#4ade80" }} />
                <div><p style={{ fontWeight: 600, fontSize: 14 }}>Portfolio</p><p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>fennecom.com</p></div>
              </a>
            </div>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: 12, marginTop: 24 }}>Typical response time: instant on WhatsApp</p>
          </div>
        </div>
      )}

      {/* ── FLOATING WHATSAPP BUBBLE ── */}
      <a
        href="https://wa.me/213541467641?text=Hello%21%20I%20am%20interested%20in%20Fennecom%20SaaS."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 90,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 18px",
          borderRadius: 100,
          fontWeight: 700,
          color: "#fff",
          fontSize: 14,
          background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
          boxShadow: "0 8px 30px rgba(37,211,102,0.45)",
          textDecoration: "none",
          transition: "transform .2s, box-shadow .2s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 12px 36px rgba(37,211,102,0.6)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,211,102,0.45)";
        }}
      >
        <MessageCircle style={{ width: 22, height: 22 }} />
        <span>WhatsApp Us</span>
      </a>
    </>
  );
}
