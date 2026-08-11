"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, Rocket, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  const projects = [
    {
      title: "Curazon Platform",
      description: "A full-stack educational and interactive platform featuring real-time collaboration, AI integration, and advanced asset generation (PDF exportations).",
      tags: ["React", "Node.js", "Socket.io", "Gemini AI", "Google Cloud Run"],
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
      color: "from-purple-500/20 to-purple-900/20",
      border: "border-purple-500/30",
    },
    {
      title: "Fennecom (E-commerce SaaS)",
      description: "A modern Next.js 14 e-commerce system built for multiple storefronts like Almaram and Tasneem. Features secure Stripe/PayPal integration and Serverless Postgres.",
      tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
      icon: <Briefcase className="w-6 h-6 text-blue-400" />,
      color: "from-blue-500/20 to-blue-900/20",
      border: "border-blue-500/30",
    },
    {
      title: "ROLMAX TEX S.L.",
      description: "A professional corporate website for technical fabrics and PVC tarpaulins featuring localization, secure authentication, and inquiry management.",
      tags: ["Next.js 14", "NextAuth", "Prisma", "Tailwind CSS"],
      icon: <Code2 className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-500/20 to-emerald-900/20",
      border: "border-emerald-500/30",
    },
    {
      title: "Harb Al-Shamela",
      description: "A strategic multiplayer desktop game (Naval Battle) featuring a custom card system and auto-saving mechanisms.",
      tags: ["Java 23", "JavaFX", "Gradle", "JSVG"],
      icon: <CheckCircle2 className="w-6 h-6 text-orange-400" />,
      color: "from-orange-500/20 to-orange-900/20",
      border: "border-orange-500/30",
    }
  ];

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 rounded-full glass text-sm font-medium text-accent-light mb-6 inline-block">
            Welcome to my creative space
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Crafting Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-blue-400">
              Experiences.
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            A showcase of my premium projects across full-stack development, modern SaaS solutions, and desktop engineering.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 rounded-full bg-accent hover:bg-accent-light text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              View Work
            </button>
            <button className="px-8 py-3 rounded-full glass hover:bg-white/10 transition-all duration-300 font-medium">
              Contact Me
            </button>
          </div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`glass-card rounded-2xl p-8 transition-all duration-300 group cursor-pointer border ${project.border} hover:shadow-2xl hover:shadow-${project.color.split("-")[1]}-500/10`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color}`}>
                  {project.icon}
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full hover:bg-white/10">
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-6 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500">© 2026 Portfolio. Designed with precision.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Github</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
