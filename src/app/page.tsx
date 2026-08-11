"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Code2, Rocket, Briefcase, ChevronRight,
  CheckCircle2, Menu, X, Mail, GitBranch, Link2,
  Layers, Database, Globe, Cpu, Zap, Star
} from "lucide-react";

/* ─── Data ─── */
const navLinks = ["About", "Projects", "Skills", "Contact"];

const skills = [
  { name: "React / Next.js", level: 92, icon: <Globe className="w-4 h-4" /> },
  { name: "Node.js / Express", level: 88, icon: <Layers className="w-4 h-4" /> },
  { name: "PostgreSQL / Prisma", level: 82, icon: <Database className="w-4 h-4" /> },
  { name: "Java / JavaFX", level: 78, icon: <Cpu className="w-4 h-4" /> },
  { name: "Docker / Cloud Run", level: 75, icon: <Zap className="w-4 h-4" /> },
];

const projects = [
  {
    id: "fennecom",
    title: "Fennecom",
    subtitle: "E-commerce SaaS Platform",
    description:
      "A modern Next.js 14 multi-storefront e-commerce system powering brands like Almaram & Tasneem. Features secure Stripe/PayPal integration, Serverless Postgres, real-time inventory, and a full admin dashboard.",
    tags: ["Next.js 14", "Prisma", "PostgreSQL", "Stripe", "PayPal"],
    logo: "/fennecom.png",
    image: null,
    logoSize: 120,
    color: "from-[#1b5e37]/30 to-[#7a1540]/20",
    border: "border-[#2e9e54]/30",
    glow: "glow-border-green",
    accent: "#2e9e54",
    icon: <Briefcase className="w-5 h-5" style={{ color: "#2e9e54" }} />,
    badge: "SaaS",
  },
  {
    id: "curazon",
    title: "Curazon",
    subtitle: "Interactive Learning Platform",
    description:
      "A full-stack educational platform featuring real-time collaboration via Socket.io, Gemini AI integration, AI-powered content generation, and advanced PDF export capabilities on Google Cloud Run.",
    tags: ["React", "Node.js", "Socket.io", "Gemini AI", "Google Cloud Run"],
    logo: "/curazon-logo.svg",
    image: null,
    logoSize: 100,
    color: "from-[#7a1540]/25 to-[#f5941e]/15",
    border: "border-[#a01e56]/30",
    glow: "glow-border-maroon",
    accent: "#a01e56",
    icon: <Rocket className="w-5 h-5" style={{ color: "#a01e56" }} />,
    badge: "EdTech",
  },
  {
    id: "rolmax",
    title: "ROLMAX TEX S.L.",
    subtitle: "Corporate Website",
    description:
      "A professional, multilingual corporate website for technical fabrics and PVC tarpaulins. Features multi-language support, NextAuth secure authentication, and a full inquiry-management CMS.",
    tags: ["Next.js 14", "NextAuth", "Prisma", "i18n", "Tailwind CSS"],
    logo: "/rolmax-logo.png",
    image: null,
    logoSize: 130,
    color: "from-[#1e2d4a]/30 to-[#2e4a7a]/20",
    border: "border-blue-600/30",
    glow: "glow-border-amber",
    accent: "#3b82f6",
    icon: <Code2 className="w-5 h-5" style={{ color: "#3b82f6" }} />,
    badge: "Corporate",
  },
  {
    id: "harb",
    title: "Harb Al-Shamela",
    subtitle: "Strategic Naval Battle Game",
    description:
      "A strategic multiplayer desktop naval battle game built in Java 23 + JavaFX. Features a custom SVG card system, auto-saving state, AI opponents, and a full Gradle build pipeline.",
    tags: ["Java 23", "JavaFX", "Gradle", "JSVG", "AI"],
    logo: "/navelbattel.png",
    image: null,
    logoSize: 90,
    color: "from-[#3d2800]/30 to-[#f5941e]/15",
    border: "border-[#f5941e]/30",
    glow: "glow-border-amber",
    accent: "#f5941e",
    icon: <CheckCircle2 className="w-5 h-5" style={{ color: "#f5941e" }} />,
    badge: "Game",
  },
];

/* ─── Animations ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } }),
};

/* ─── Component ─── */
export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <main className="min-h-screen bg-mesh relative overflow-hidden">

      {/* ── Ambient orbs ── */}
      <div className="fixed top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[160px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(27,94,55,0.18) 0%, transparent 70%)" }} />
      <div className="fixed bottom-[-15%] right-[-10%] w-[40%] h-[50%] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(122,21,64,0.14) 0%, transparent 70%)" }} />

      {/* ══════════════════════════════
          NAVBAR
      ══════════════════════════════ */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur shadow-lg" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <Image src="/fennecom.png" alt="Fennecom" fill style={{ objectFit: "contain" }} className="p-1" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="grad-text">Fennecom</span>
              <span className="text-white/40 font-light"> | Dev</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())}
                className="nav-link text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium">
                {l}
              </button>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #1b5e37, #7a1540)",
                boxShadow: "0 0 20px rgba(27,94,55,0.3)",
              }}>
              <Mail className="w-4 h-4" />
              Hire Me
            </button>
            <button id="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg glass">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden nav-blur border-t border-white/05">
              <div className="px-6 py-4 flex flex-col gap-3">
                {navLinks.map((l) => (
                  <button key={l} onClick={() => scrollTo(l.toLowerCase())}
                    className="text-left text-white/70 hover:text-white py-2 text-sm font-medium border-b border-white/05 transition-colors">
                    {l}
                  </button>
                ))}
                <button onClick={() => scrollTo("contact")}
                  className="mt-2 px-5 py-2 rounded-full text-sm font-semibold text-center"
                  style={{ background: "linear-gradient(135deg, #1b5e37, #7a1540)" }}>
                  Hire Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section id="hero" className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24 flex flex-col items-center text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <span className="section-badge mb-8">
            <Star className="w-3 h-3" /> Available for Projects
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6">
          Crafting Digital<br />
          <span className="grad-text">Experiences.</span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Full-stack engineer specializing in modern SaaS, e-commerce platforms, and desktop engineering.
          Every project is crafted with precision and purpose.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
          className="flex flex-wrap gap-4 justify-center">
          <button id="view-work-btn" onClick={() => scrollTo("projects")}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #1b5e37 0%, #7a1540 100%)",
              boxShadow: "0 0 30px rgba(27,94,55,0.35)",
            }}>
            View My Work <ChevronRight className="w-4 h-4" />
          </button>
          <button id="contact-btn-hero" onClick={() => scrollTo("contact")}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 glass hover:bg-white/10">
            <Mail className="w-4 h-4" /> Contact Me
          </button>
        </motion.div>

        {/* Floating fennecom logo as hero graphic */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
          className="mt-20 relative">
          <div className="animate-float relative w-56 h-56 md:w-72 md:h-72 mx-auto">
            <div className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{ background: "radial-gradient(circle, #2e9e54 0%, #7a1540 60%, transparent 100%)" }} />
            <div className="relative w-full h-full rounded-3xl flex items-center justify-center glass"
              style={{ border: "1px solid rgba(46,158,84,0.2)" }}>
              <Image src="/fennecom.png" alt="Fennecom Logo" width={220} height={220}
                style={{ objectFit: "contain" }} className="drop-shadow-2xl p-4" />
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -top-4 -left-4 md:-left-16 glass px-3 py-1.5 rounded-full text-xs font-semibold animate-float"
            style={{ animationDelay: "0.5s", border: "1px solid rgba(46,158,84,0.3)", color: "#2e9e54" }}>
            ✦ Full-Stack Dev
          </div>
          <div className="absolute -bottom-4 -right-4 md:-right-16 glass px-3 py-1.5 rounded-full text-xs font-semibold animate-float"
            style={{ animationDelay: "1s", border: "1px solid rgba(245,148,30,0.3)", color: "#f5941e" }}>
            ✦ 4+ Projects
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════
          ABOUT
      ══════════════════════════════ */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <span className="section-badge mb-6">About Me</span>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12 items-center mt-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Building the web, <span className="grad-text">one layer at a time.</span>
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-5">
              I&apos;m a passionate full-stack engineer who builds scalable, real-world applications.
              From multi-tenant e-commerce SaaS platforms to AI-powered education tools and desktop games —
              I bridge the gap between elegant design and robust engineering.
            </p>
            <p className="text-white/55 text-base leading-relaxed">
              My work is shaped by clarity, performance, and a deep respect for the end user.
              I love turning complex requirements into clean, maintainable code.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" id="github-link"
                className="p-3 rounded-full glass hover:bg-white/10 transition-all duration-300 hover:scale-110"
                style={{ border: "1px solid rgba(46,158,84,0.25)" }}>
                <GitBranch className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" id="linkedin-link"
                className="p-3 rounded-full glass hover:bg-white/10 transition-all duration-300 hover:scale-110"
                style={{ border: "1px solid rgba(46,158,84,0.25)" }}>
                <Link2 className="w-5 h-5" />
              </a>
              <a href="mailto:hello@example.com" id="email-link"
                className="p-3 rounded-full glass hover:bg-white/10 transition-all duration-300 hover:scale-110"
                style={{ border: "1px solid rgba(245,148,30,0.25)" }}>
                <Mail className="w-5 h-5" style={{ color: "#f5941e" }} />
              </a>
            </div>
          </motion.div>

          {/* Stats cards */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}
            className="grid grid-cols-2 gap-4">
            {[
              { label: "Projects Delivered", value: "4+", color: "#2e9e54" },
              { label: "Technologies Used", value: "15+", color: "#f5941e" },
              { label: "Lines of Code", value: "50K+", color: "#a01e56" },
              { label: "Years of Practice", value: "3+", color: "#3b82f6" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-extrabold mb-1" style={{ color: s.color }}>{s.value}</div>
                <div className="text-white/45 text-sm">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          PROJECTS
      ══════════════════════════════ */}
      <section id="projects" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="flex flex-col items-start mb-14">
          <span className="section-badge mb-5">Featured Projects</span>
          <div className="flex items-center gap-4 w-full">
            <h2 className="text-4xl md:text-5xl font-bold whitespace-nowrap">Things I&apos;ve Built</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/15 to-transparent ml-4" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              id={`project-${project.id}`}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              whileHover={{ y: -6 }}
              onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
              className={`glass-card rounded-2xl overflow-hidden cursor-pointer border transition-all duration-400 ${project.border} ${project.glow}`}
              style={{ "--tw-shadow-color": project.accent } as React.CSSProperties}>

              {/* Card top: logo showcase */}
              <div className={`relative h-36 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <div className="relative z-10 px-6">
                  <Image
                    src={project.logo!}
                    alt={project.title}
                    width={project.logoSize}
                    height={project.logoSize}
                    style={{ objectFit: "contain", maxHeight: 100 }}
                    className="drop-shadow-2xl"
                  />
                </div>
                {/* Badge */}
                <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(0,0,0,0.45)", border: `1px solid ${project.accent}40`, color: project.accent }}>
                  {project.badge}
                </span>
              </div>

              {/* Card body */}
              <div className="p-7">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg" style={{ background: `${project.accent}18` }}>
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
                      <p className="text-xs font-medium" style={{ color: project.accent }}>{project.subtitle}</p>
                    </div>
                  </div>
                  <button
                    id={`open-${project.id}`}
                    className="p-2 rounded-full transition-all duration-200 hover:bg-white/10"
                    style={{ border: `1px solid ${project.accent}30`, color: project.accent }}>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-white/50 text-sm mb-5 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill px-3 py-1 text-xs font-medium rounded-full text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          SKILLS
      ══════════════════════════════ */}
      <section id="skills" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="flex flex-col items-start mb-14">
          <span className="section-badge mb-5">Technical Skills</span>
          <div className="flex items-center gap-4 w-full">
            <h2 className="text-4xl md:text-5xl font-bold">My Arsenal</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/15 to-transparent ml-4" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            {skills.map((skill, i) => (
              <motion.div key={skill.name} variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true }} custom={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className="flex items-center gap-2 text-sm font-medium text-white/75">
                    <span className="p-1.5 rounded-md" style={{ background: "rgba(46,158,84,0.15)", color: "#2e9e54" }}>
                      {skill.icon}
                    </span>
                    {skill.name}
                  </span>
                  <span className="text-xs font-bold" style={{ color: "#f5941e" }}>{skill.level}%</span>
                </div>
                <div className="skill-bar-track h-2">
                  <motion.div className="skill-bar-fill h-full"
                    initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech badges grid */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}
            className="glass-card rounded-2xl p-7">
            <h3 className="text-lg font-semibold mb-6 text-white/80">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "TypeScript", "React", "Next.js", "Node.js",
                "Express", "PostgreSQL", "Prisma", "Docker",
                "Stripe", "Socket.io", "Gemini AI", "Java",
                "JavaFX", "Gradle", "NextAuth", "Cloud Run"
              ].map((tech, i) => (
                <motion.span key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="tag-pill px-3.5 py-1.5 text-xs font-medium rounded-full text-white/60 cursor-default">
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          CONTACT
      ══════════════════════════════ */}
      <section id="contact" className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center mb-12">
          <span className="section-badge mx-auto mb-6">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-6">Let&apos;s Work Together</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Have a project in mind? I&apos;d love to hear about it.
            Drop me a message and I&apos;ll get back to you promptly.
          </p>
        </motion.div>

        <motion.form variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
          id="contact-form" className="glass-card rounded-2xl p-8 flex flex-col gap-5"
          style={{ border: "1px solid rgba(46,158,84,0.2)" }}
          onSubmit={(e) => e.preventDefault()}>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm text-white/55 font-medium">Name</label>
              <input id="name" type="text" placeholder="Your name"
                className="rounded-xl px-4 py-3 text-sm bg-white/05 border border-white/10
                  focus:outline-none focus:border-[#2e9e54] focus:bg-white/08 transition-all duration-200 text-white placeholder-white/25" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-white/55 font-medium">Email</label>
              <input id="email" type="email" placeholder="your@email.com"
                className="rounded-xl px-4 py-3 text-sm bg-white/05 border border-white/10
                  focus:outline-none focus:border-[#2e9e54] focus:bg-white/08 transition-all duration-200 text-white placeholder-white/25" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-sm text-white/55 font-medium">Subject</label>
            <input id="subject" type="text" placeholder="Project inquiry"
              className="rounded-xl px-4 py-3 text-sm bg-white/05 border border-white/10
                focus:outline-none focus:border-[#2e9e54] focus:bg-white/08 transition-all duration-200 text-white placeholder-white/25" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm text-white/55 font-medium">Message</label>
            <textarea id="message" rows={5} placeholder="Tell me about your project..."
              className="rounded-xl px-4 py-3 text-sm bg-white/05 border border-white/10
                focus:outline-none focus:border-[#2e9e54] focus:bg-white/08 transition-all duration-200
                text-white placeholder-white/25 resize-none" />
          </div>

          <button id="send-btn" type="submit"
            className="mt-2 self-start flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #1b5e37 0%, #7a1540 100%)",
              boxShadow: "0 0 25px rgba(27,94,55,0.3)",
            }}>
            <Mail className="w-4 h-4" /> Send Message
          </button>
        </motion.form>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer className="relative z-10 border-t mt-12 py-10"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5">
          {/* Left: brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <Image src="/fennecom.png" alt="Fennecom" fill style={{ objectFit: "contain" }} className="p-1" />
            </div>
            <span className="text-sm text-white/40">
              © {new Date().getFullYear()} — <span className="grad-text font-semibold">Fennecom Dev Portfolio</span>
            </span>
          </div>

          {/* Center: project logos */}
          <div className="flex items-center gap-5 opacity-40 hover:opacity-70 transition-opacity duration-300">
            <Image src="/curazon-logo.svg" alt="Curazon" width={64} height={28} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            <div className="w-px h-5 bg-white/20" />
            <Image src="/rolmax-logo.png" alt="Rolmax" width={72} height={28} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </div>

          {/* Right: links */}
          <div className="flex gap-5 text-sm">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
              <GitBranch className="w-4 h-4" /> GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
              <Link2 className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
