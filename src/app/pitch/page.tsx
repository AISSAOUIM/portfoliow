"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, BarChart3, Truck, Shield, Globe, Zap,
  Check, ArrowRight, Star, Package, CreditCard, Users,
  ChevronDown, Sparkles, TrendingUp, Lock, Headphones,
  X, MessageCircle, Clock, Award, ChevronRight
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }),
};

function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as any, { once: true });

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
    <div className="glass-card rounded-2xl p-6 text-center">
      <div className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color }}>
        <span ref={ref}>{count}</span>{suffix}
      </div>
      <div className="text-white/50 text-sm">{label}</div>
    </div>
  );
}

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [msg, setMsg] = useState("");

  const handleWhatsApp = () => {
    if (!name || !phone) { alert("Please enter your name and phone number"); return; }
    const text = "Hello! I am interested in Fennecom SaaS.\n\nName: " + name + "\nPhone: " + phone + "\nCity: " + city + "\nMessage: " + msg;
    window.open("https://wa.me/213541467641?text=" + encodeURIComponent(text), "_blank");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg rounded-2xl p-8 relative"
            style={{
              background: "linear-gradient(145deg, rgba(20,28,22,0.98), rgba(12,8,16,0.98))",
              border: "1px solid rgba(46,158,84,0.3)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(46,158,84,0.1)",
            }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors">
              <X className="w-4 h-4 text-white/60" />
            </button>
            <div className="mb-6">
              <span className="section-badge mb-3 inline-flex">Book Free Demo</span>
              <h3 className="text-2xl font-bold mt-3">Let&apos;s Get You Started</h3>
              <p className="text-white/50 text-sm mt-1">Fill in your details and we&apos;ll reach out within 24 hours.</p>
            </div>
            <div className="flex flex-col gap-4">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name / Store name" className="pitch-input" />
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="WhatsApp / Phone number" className="pitch-input" />
              <input value={city} onChange={e => setCity(e.target.value)} placeholder="Country / City" className="pitch-input" />
              <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Tell us about your store..." rows={3} className="pitch-input resize-none" />
              <button onClick={handleWhatsApp}
                className="flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02] mt-2"
                style={{ background: "linear-gradient(135deg, #25d366, #128c7e)", boxShadow: "0 0 30px rgba(37,211,102,0.3)" }}>
                <MessageCircle className="w-5 h-5" />
                Send via WhatsApp
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const features = [
  { icon: <ShoppingBag className="w-6 h-6" />, title: "Multi-Storefront Management", desc: "Run unlimited branded storefronts from a single admin dashboard. Each brand gets its own URL, theme, and catalog.", color: "#2e9e54", bg: "rgba(46,158,84,0.1)" },
  { icon: <Package className="w-6 h-6" />, title: "Smart Inventory Tracking", desc: "Track products by ml, units, boxes, or custom units. Get low-stock alerts before you run out.", color: "#f5941e", bg: "rgba(245,148,30,0.1)" },
  { icon: <CreditCard className="w-6 h-6" />, title: "Integrated Payments", desc: "Accept Stripe, PayPal, and local payment methods. Automated invoicing with professional PDF receipts.", color: "#a01e56", bg: "rgba(160,30,86,0.1)" },
  { icon: <Truck className="w-6 h-6" />, title: "Shipping & Logistics", desc: "Integrated with Yalidine and other carriers. Auto-fill shipping forms, track packages in real time.", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Real-Time Analytics", desc: "Know your top-selling products, peak hours, revenue trends, and customer behavior live.", color: "#2e9e54", bg: "rgba(46,158,84,0.1)" },
  { icon: <Globe className="w-6 h-6" />, title: "Multilingual & RTL", desc: "Full Arabic, French, and English support with proper right-to-left layout. Built for the MENA market.", color: "#f5941e", bg: "rgba(245,148,30,0.1)" },
  { icon: <Users className="w-6 h-6" />, title: "Customer Management", desc: "CRM built-in. Customer history, favorites, loyalty tracking, and targeted offers.", color: "#a01e56", bg: "rgba(160,30,86,0.1)" },
  { icon: <Shield className="w-6 h-6" />, title: "Enterprise Security", desc: "SSL/TLS encryption, role-based access control, daily backups, and 99.9% uptime SLA.", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
];

const plans = [
  { name: "Monthly", badge: "OFFER", price: "$75", period: "/month", setup: "+ $1,000 setup (was $1,500)", trial: "First 10 days FREE", color: "#2e9e54", glow: "rgba(46,158,84,0.25)", border: "rgba(46,158,84,0.35)", popular: false, features: ["Fully managed hosting", "We handle all setup", "Product catalog entry", "Custom domain linking", "Tech support & updates"], cta: "Start Free Trial" },
  { name: "Annual", badge: "BEST VALUE", price: "$1,000", period: "/year", setup: "+ $500 setup (was $1,000)", trial: "First 10 days FREE", color: "#f5941e", glow: "rgba(245,148,30,0.3)", border: "rgba(245,148,30,0.5)", popular: true, features: ["Fully managed hosting", "We handle all setup", "Product catalog entry", "Custom domain linking", "Tech support & updates"], cta: "Get Best Deal" },
  { name: "Full Ownership", badge: "YOURS FOREVER", price: "$5,000", period: " one-time", setup: "No recurring fees", trial: "", color: "#a01e56", glow: "rgba(160,30,86,0.25)", border: "rgba(160,30,86,0.35)", popular: false, features: ["Full source code", "Setup on your server", "Custom brand identity", "Team training", "3 months free support"], cta: "Own It Forever" },
  { name: "Enterprise", badge: "SCALE UP", price: "$10k+", period: " custom", setup: "Tailored to your needs", trial: "", color: "#3b82f6", glow: "rgba(59,130,246,0.2)", border: "rgba(59,130,246,0.35)", popular: false, features: ["POS integration", "ERP integration", "Custom mobile app", "12 months support", "Custom features"], cta: "Contact for Quote" },
];

const testimonials = [
  { name: "متجر المارام", title: "Perfume Boutique — Algeria", text: "النظام غيّر طريقة عملنا كلياً. نتبع الزيوت بالمليلتر، الفواتير احترافية والإدارة سهلة.", stars: 5, avatar: "🏪" },
  { name: "Golden Garden Store", title: "E-commerce — MENA Region", text: "The multi-storefront feature is incredible. We run 3 brands from one dashboard — no duplication, no hassle.", stars: 5, avatar: "🌿" },
  { name: "Tasneem Boutique", title: "Luxury Perfumes — Online", text: "Shipping integration with Yalidine alone saves us 2 hours daily. ROI was immediate.", stars: 5, avatar: "✨" },
];

const faqs = [
  { q: "Do I need any technical knowledge?", a: "Absolutely not. We handle 100% of the technical setup — servers, hosting, domain, SSL, everything. You just run your business." },
  { q: "Can I run multiple brands?", a: "Yes! Fennecom is built as a multi-tenant SaaS. Each brand gets its own storefront, catalog, and URL — all managed from one dashboard." },
  { q: "What happens after the free trial?", a: "After your 10-day free trial, you choose the plan that fits you best. No credit card required to start." },
  { q: "Is my data secure?", a: "Enterprise-grade security: SSL encryption, daily automated backups, role-based access, and 99.9% uptime SLA." },
  { q: "Can I migrate my existing products?", a: "Yes. Our setup service includes full product catalog migration. Just send us your data and we handle the rest." },
];

export default function PitchPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        .pitch-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 12px 16px;
          color: white;
          font-size: 0.875rem;
          width: 100%;
          outline: none;
          transition: all 0.2s;
        }
        .pitch-input::placeholder { color: rgba(255,255,255,0.3); }
        .pitch-input:focus {
          border-color: rgba(46,158,84,0.5);
          background: rgba(46,158,84,0.06);
          box-shadow: 0 0 0 3px rgba(46,158,84,0.1);
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-btn {
          background: linear-gradient(90deg, #1b5e37, #f5941e, #7a1540, #1b5e37);
          background-size: 300% 100%;
          animation: shimmer 4s linear infinite;
        }
        @keyframes gradMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .grad-hero {
          background: linear-gradient(135deg, #2e9e54, #f5941e, #a01e56, #2e9e54);
          background-size: 300% 300%;
          animation: gradMove 6s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .feature-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.15) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.14);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .plan-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.2) 100%);
          backdrop-filter: blur(14px);
          border-radius: 20px;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .plan-card:hover { transform: translateY(-8px); }
      `}</style>

      <main className="min-h-screen bg-mesh relative overflow-hidden">
        <div className="fixed top-[-20%] left-[-15%] w-[60%] h-[60%] rounded-full blur-[200px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(27,94,55,0.2) 0%, transparent 70%)" }} />
        <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full blur-[180px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(122,21,64,0.18) 0%, transparent 70%)" }} />

        <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

        {/* NAV */}
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur shadow-xl" : ""}`}>
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-[#2e9e54]/50 transition-colors">
                <Image src="/fennecom.png" alt="Fennecom" fill style={{ objectFit: "contain" }} className="p-1.5" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2e9e54] via-[#f5941e] to-[#7a1540]">Fennecom</span>
                <span className="text-white/30 font-light text-base"> | SaaS</span>
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm text-white/60">
              {["features", "pricing", "faq"].map(s => (
                <button key={s} onClick={() => scrollTo(s)} className="nav-link capitalize hover:text-white transition-colors">{s}</button>
              ))}
            </nav>
            <button onClick={() => setModalOpen(true)} id="nav-cta-btn"
              className="shimmer-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105">
              <Sparkles className="w-4 h-4" />
              Get Free Demo
            </button>
          </div>
        </header>

        {/* HERO */}
        <section id="hero" className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="section-badge mx-auto mb-8 inline-flex">
              <Sparkles className="w-3 h-3" />
              The #1 E-commerce SaaS for Perfume Boutiques
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Sell More.<br />
            <span className="grad-hero">Manage Less.</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-white/55 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The complete e-commerce platform built exclusively for perfume shops, boutiques, and fragrance brands.
            Multi-storefront, multilingual, fully managed — so you can focus on selling.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="flex flex-wrap gap-4 justify-center mb-16">
            <button onClick={() => setModalOpen(true)} id="hero-cta-btn"
              className="shimmer-btn flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:scale-105"
              style={{ boxShadow: "0 0 40px rgba(46,158,84,0.3)" }}>
              Start Free — 10 Days Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => scrollTo("features")} id="hero-features-btn"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold glass hover:bg-white/10 transition-all duration-300 hover:scale-105">
              See Features <ChevronDown className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Hero Dashboard Mock */}
          <motion.div variants={scaleIn} initial="hidden" animate="show" custom={4} className="relative max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(27,94,55,0.15), rgba(122,21,64,0.1))",
                border: "1px solid rgba(46,158,84,0.2)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(46,158,84,0.1)",
              }}>
              <div className="p-6 md:p-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(46,158,84,0.2)" }}>
                      <BarChart3 className="w-4 h-4 text-[#2e9e54]" />
                    </div>
                    <span className="font-semibold text-white/80 text-sm">Fennecom Dashboard</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: "Revenue Today", val: "$1,248", icon: <TrendingUp className="w-3 h-3" />, color: "#2e9e54" },
                    { label: "Active Orders", val: "34", icon: <ShoppingBag className="w-3 h-3" />, color: "#f5941e" },
                    { label: "Low Stock", val: "7", icon: <Package className="w-3 h-3" />, color: "#a01e56" },
                    { label: "New Customers", val: "12", icon: <Users className="w-3 h-3" />, color: "#3b82f6" },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl p-4 text-left"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="flex items-center gap-1.5 mb-2" style={{ color: s.color }}>
                        {s.icon}<span className="text-xs text-white/40">{s.label}</span>
                      </div>
                      <div className="text-xl font-bold text-white">{s.val}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="px-4 py-3 border-b text-xs font-semibold text-white/40 grid grid-cols-4 gap-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <span>Order ID</span><span>Product</span><span>Status</span><span>Total</span>
                  </div>
                  {[
                    { id: "#2841", prod: "Oud Al Layl", status: "Shipped", amt: "$89", sc: "#2e9e54" },
                    { id: "#2840", prod: "Rose Noir Oil", status: "Processing", amt: "$42", sc: "#f5941e" },
                    { id: "#2839", prod: "Bakhour Al Oud", status: "Delivered", amt: "$120", sc: "#2e9e54" },
                    { id: "#2838", prod: "Musk Amber Box", status: "Pending", amt: "$67", sc: "#a01e56" },
                  ].map(r => (
                    <div key={r.id} className="px-4 py-3 text-sm grid grid-cols-4 gap-4 items-center hover:bg-white/[0.02] transition-colors">
                      <span className="text-white/50 font-mono text-xs">{r.id}</span>
                      <span className="text-white/80 font-medium text-xs truncate">{r.prod}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold inline-block w-fit"
                        style={{ color: r.sc, background: r.sc + "18", border: "1px solid " + r.sc + "30" }}>{r.status}</span>
                      <span className="text-white/70 text-xs font-medium">{r.amt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 md:-left-8 glass px-3 py-2 rounded-xl text-xs font-bold shadow-xl"
              style={{ border: "1px solid rgba(46,158,84,0.4)", color: "#2e9e54" }}>
              <TrendingUp className="w-3 h-3 inline mr-1" />+127% Revenue
            </motion.div>
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-4 md:-right-8 glass px-3 py-2 rounded-xl text-xs font-bold shadow-xl"
              style={{ border: "1px solid rgba(245,148,30,0.4)", color: "#f5941e" }}>
              <Zap className="w-3 h-3 inline mr-1" />Real-Time Sync
            </motion.div>
          </motion.div>
        </section>

        {/* STATS */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard num={30} suffix="+" label="Perfume-Specific Features" color="#2e9e54" />
            <StatCard num={6} suffix="+" label="Inventory Types Supported" color="#f5941e" />
            <StatCard num={100} suffix="%" label="Tailored for Perfumeries" color="#a01e56" />
            <StatCard num={99} suffix=".9%" label="Uptime SLA Guaranteed" color="#3b82f6" />
          </motion.div>
        </section>

        {/* PROBLEM */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <span className="section-badge mx-auto mb-6 inline-flex">The Problem</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">Still managing your shop<br /><span className="grad-text">the old way?</span></h2>
            <p className="text-white/50 max-w-xl mx-auto">Most perfume shop owners struggle with the same painful bottlenecks every day.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col gap-4">
              {[
                { icon: "📄", text: "Manual paper-based inventory", sub: "Never knowing how much stock remains" },
                { icon: "📱", text: "Orders lost in WhatsApp chats", sub: "No centralized order management" },
                { icon: "🧾", text: "Handwritten invoices", sub: "Unprofessional & error-prone" },
                { icon: "📉", text: "Zero analytics or insights", sub: "Flying blind on what sells" },
                { icon: "🚚", text: "Manual shipping data entry", sub: "Wasting hours on logistics" },
              ].map((p, i) => (
                <motion.div key={p.text} variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="flex items-start gap-4 glass rounded-xl p-4">
                  <span className="text-2xl mt-0.5">{p.icon}</span>
                  <div>
                    <div className="text-white/85 font-semibold text-sm">{p.text}</div>
                    <div className="text-white/40 text-xs mt-0.5">{p.sub}</div>
                  </div>
                  <X className="w-4 h-4 text-red-400/70 ml-auto mt-0.5 flex-shrink-0" />
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #2e9e54 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
              <div className="relative z-10">
                <div className="text-7xl md:text-8xl font-extrabold mb-3" style={{ color: "#2e9e54" }}>98%</div>
                <p className="text-white/65 text-base leading-relaxed max-w-xs mx-auto">
                  of perfume shops have <strong className="text-white/90">no specialized digital system</strong>
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-[#f5941e] font-bold text-sm">This is your competitive advantage.</p>
                  <p className="text-white/40 text-xs mt-1">Be the first in your area to go digital with Fennecom.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <span className="section-badge mx-auto mb-6 inline-flex">Features</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">Everything in<br /><span className="grad-text">one platform.</span></h2>
            <p className="text-white/50 max-w-xl mx-auto">No patchwork of tools. One system built from scratch for fragrance businesses.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="feature-card group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: f.bg, color: f.color }}>{f.icon}</div>
                <h3 className="font-bold text-white/90 mb-2 text-sm">{f.title}</h3>
                <p className="text-white/45 text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHY FENNECOM */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass-card rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <span className="section-badge mb-6 inline-flex">Why Fennecom?</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                  No other platform speaks<br /><span className="grad-text">the language of perfume.</span>
                </h2>
                <p className="text-white/55 text-base leading-relaxed mb-8">
                  Generic e-commerce tools don&apos;t understand milliliter oil tracking, cacheté, boukhour, burners, or gift box assembly.
                  Fennecom was built ground-up with these workflows in mind.
                </p>
                <div className="flex flex-col gap-3">
                  {["Track oils by ml, not just units","Manage cacheté, boukhour & burners","Gift box builder with wrapping options","Yalidine & regional shipping integrated","Arabic, French & English — RTL-ready"].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(46,158,84,0.15)", border: "1px solid rgba(46,158,84,0.3)" }}>
                        <Check className="w-3 h-3 text-[#2e9e54]" />
                      </div>
                      <span className="text-white/75 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setModalOpen(true)} id="why-cta-btn"
                  className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm transition-all duration-300 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #1b5e37, #7a1540)", boxShadow: "0 0 25px rgba(27,94,55,0.3)" }}>
                  See a Live Demo <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="p-8 md:p-12 border-t md:border-t-0 md:border-l flex flex-col justify-center gap-4"
                style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.15)" }}>
                {[
                  { icon: <Zap className="w-5 h-5" />, label: "10-Day Free Trial", sub: "No credit card. No commitment." },
                  { icon: <Headphones className="w-5 h-5" />, label: "24/7 Dedicated Support", sub: "Real humans, not bots." },
                  { icon: <Lock className="w-5 h-5" />, label: "Enterprise Security", sub: "SSL + daily backups." },
                  { icon: <Award className="w-5 h-5" />, label: "Made for MENA Market", sub: "Arabic-first by design." },
                  { icon: <Clock className="w-5 h-5" />, label: "Live in 48 Hours", sub: "We set everything up for you." },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-colors">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-[#f5941e]"
                      style={{ background: "rgba(245,148,30,0.1)", border: "1px solid rgba(245,148,30,0.2)" }}>{item.icon}</div>
                    <div>
                      <div className="text-white/85 font-semibold text-sm">{item.label}</div>
                      <div className="text-white/40 text-xs">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <span className="section-badge mx-auto mb-6 inline-flex">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">An investment that<br /><span className="grad-text">pays for itself.</span></h2>
            <p className="text-white/50 max-w-xl mx-auto">Choose the plan that fits your store. Every plan includes the full platform.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="plan-card relative"
                style={{
                  border: "1px solid " + plan.border,
                  boxShadow: plan.popular ? "0 0 0 1px " + plan.border + ", 0 20px 60px " + plan.glow : "0 8px 30px rgba(0,0,0,0.2)",
                  transform: plan.popular ? "scale(1.03)" : undefined,
                }}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: plan.color, boxShadow: "0 4px 15px " + plan.glow }}>MOST POPULAR</div>
                )}
                <div className="p-6">
                  <span className="text-xs font-bold mb-3 block" style={{ color: plan.color }}>{plan.badge}</span>
                  <h3 className="text-xl font-bold mb-4 text-white">{plan.name}</h3>
                  <div className="mb-1">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-white/40 text-sm ml-1">{plan.period}</span>
                  </div>
                  <div className="text-sm text-white/50 mb-2">{plan.setup}</div>
                  {plan.trial && (
                    <div className="text-xs font-bold mb-5 px-2 py-1 rounded-full inline-block"
                      style={{ color: plan.color, background: plan.color + "15", border: "1px solid " + plan.color + "30" }}>
                      ✓ {plan.trial}
                    </div>
                  )}
                  <div className="h-px my-5" style={{ background: "linear-gradient(90deg, transparent, " + plan.color + "40, transparent)" }} />
                  <div className="flex flex-col gap-3 mb-6">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                        <span className="text-white/65 text-xs">{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setModalOpen(true)} id={"plan-cta-" + i}
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: plan.popular ? "linear-gradient(135deg, " + plan.color + ", " + plan.color + "cc)" : plan.color + "18",
                      color: plan.popular ? "white" : plan.color,
                      border: "1px solid " + plan.color + "40",
                      boxShadow: plan.popular ? "0 8px 20px " + plan.glow : undefined,
                    }}>{plan.cta}</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <span className="section-badge mx-auto mb-6 inline-flex">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">Trusted by<br /><span className="grad-text">real stores.</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="glass-card rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-[#f5941e] text-[#f5941e]" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{ background: "rgba(46,158,84,0.15)", border: "1px solid rgba(46,158,84,0.2)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-white/85 font-bold text-sm">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative z-10 max-w-3xl mx-auto px-6 py-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <span className="section-badge mx-auto mb-6 inline-flex">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">Common Questions</h2>
          </motion.div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div key={faq.q} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="glass-card rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div className="flex items-center justify-between px-6 py-5">
                  <span className="font-semibold text-white/85 text-sm pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-4 h-4 text-white/40 flex-shrink-0" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-6 pb-5 text-white/50 text-sm leading-relaxed border-t"
                        style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                        <div className="pt-4">{faq.a}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
          <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden text-center px-8 py-16"
            style={{
              background: "linear-gradient(135deg, rgba(27,94,55,0.3) 0%, rgba(122,21,64,0.25) 50%, rgba(245,148,30,0.15) 100%)",
              border: "1px solid rgba(46,158,84,0.25)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 80px rgba(46,158,84,0.1)",
            }}>
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="relative z-10">
              <span className="section-badge mx-auto mb-6 inline-flex">
                <Sparkles className="w-3 h-3" /> Limited Time Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 mt-4">
                Ready to transform<br /><span className="grad-text">your store?</span>
              </h2>
              <p className="text-white/55 text-lg max-w-xl mx-auto mb-10">
                Start with a 10-day free trial. We set everything up — store, products, domain — within 48 hours.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button onClick={() => setModalOpen(true)} id="final-cta-btn"
                  className="shimmer-btn flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:scale-105"
                  style={{ boxShadow: "0 0 50px rgba(46,158,84,0.4)" }}>
                  <Sparkles className="w-5 h-5" />
                  Book Free Demo Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a href="https://wa.me/213541467641?text=Hello%21%20I%20am%20interested%20in%20Fennecom%20SaaS." target="_blank" rel="noopener noreferrer" id="wa-btn"
                  className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #25d366, #128c7e)", boxShadow: "0 0 30px rgba(37,211,102,0.3)" }}>
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="relative z-10 border-t py-8 mt-4" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/35">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Image src="/fennecom.png" alt="Fennecom" fill style={{ objectFit: "contain" }} className="p-1" />
              </div>
              <span>© {new Date().getFullYear()} Fennecom SaaS — Professional E-commerce for Perfumeries.</span>
            </div>
            <a href="/" className="hover:text-white/70 transition-colors">← Back to Portfolio</a>
          </div>
        </footer>

        {/* FLOATING WHATSAPP BUBBLE */}
        <a
          href="https://wa.me/213541467641?text=Hello%21%20I%20am%20interested%20in%20Fennecom%20SaaS."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full font-bold text-white text-sm shadow-2xl transition-all duration-300 hover:scale-110 group"
          style={{
            background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
            boxShadow: "0 8px 30px rgba(37,211,102,0.45)",
          }}
        >
          <MessageCircle className="w-6 h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out">
            Chat on WhatsApp
          </span>
        </a>
      </main>
    </>
  );
}
