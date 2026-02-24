import { useState, useEffect, useRef } from "react";

const PROFILE_IMG = "data:image/jpeg;base64,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";

const CV_PDF_URL = "/Curriculo_EndriwBento.pdf";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Stack", href: "#stack" },
  { label: "Projetos", href: "#projetos" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Certificação", href: "#certificacao" },
  { label: "Contato", href: "#contato" },
];

const STACK = [
  { name: "Java", icon: "☕", category: "Core" },
  { name: "Spring Boot", icon: "🍃", category: "Framework" },
  { name: "JPA / Hibernate", icon: "🗄️", category: "ORM" },
  { name: "MongoDB", icon: "🍃", category: "NoSQL" },
  { name: "JDBC", icon: "🔌", category: "Core" },
  { name: "APIs REST", icon: "🌐", category: "Backend" },
  { name: "SQL / NoSQL", icon: "💾", category: "Database" },
  { name: "POO", icon: "🧱", category: "Paradigma" },
  { name: "Collections & Generics", icon: "📦", category: "Java" },
  { name: "Lambda & Stream API", icon: "⚡", category: "Java" },
  { name: "Tratamento de Exceções", icon: "🛡️", category: "Java" },
  { name: "Git & GitHub", icon: "🔀", category: "Versionamento" },
];

const PROJECTS = [
  {
    title: "API REST com Spring Boot + JPA",
    desc: "API REST com arquitetura em camadas, CRUD completo, tratamento de exceções e persistência com JPA/Hibernate.",
    tags: ["Java", "Spring Boot", "JPA", "Hibernate", "REST"],
    link: "https://github.com/EndriwEngSoft/workshop-springboot4-jpa",
    icon: "🗄️",
    color: "#4ade80",
  },
  {
    title: "API REST com MongoDB",
    desc: "API REST com banco NoSQL aplicando modelagem de dados, relacionamento entre documentos e boas práticas de design.",
    tags: ["Java", "Spring Boot", "MongoDB", "NoSQL"],
    link: "https://github.com/EndriwEngSoft/workshop-springboot4-mongodb",
    icon: "🍃",
    color: "#34d399",
  },
  {
    title: "Sistema de Xadrez em Java",
    desc: "Aplicação de xadrez totalmente em Java, explorando encapsulamento, herança, polimorfismo e modelagem de domínio.",
    tags: ["Java", "POO", "Encapsulamento", "Herança", "Polimorfismo"],
    link: "https://github.com/EndriwEngSoft/chess-system",
    icon: "♟️",
    color: "#a78bfa",
  },
];

const DIFERENCIAIS = [
  { icon: "🏗️", title: "Base sólida em POO", desc: "Fundamentos aprofundados em Programação Orientada a Objetos" },
  { icon: "🌐", title: "APIs REST", desc: "Experiência prática desenvolvendo e consumindo APIs RESTful" },
  { icon: "💾", title: "Bancos Relacionais & NoSQL", desc: "Conhecimento em SQL, JPA/Hibernate e MongoDB" },
  { icon: "✨", title: "Código Limpo", desc: "Boas práticas de clean code e arquitetura em camadas" },
  { icon: "🗺️", title: "Roadmap Estruturado", desc: "Evolução contínua: Java, Cloud, Automação e Backend avançado" },
];

function useScrollAnimation() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function AnimatedSection({ children, className = "" }) {
  const [ref, visible] = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("endriwbento@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const t = dark
    ? {
        bg: "#0a0a0f",
        bgCard: "#12121a",
        bgCardHover: "#1a1a26",
        border: "#1e1e2e",
        borderLight: "#2a2a3a",
        text: "#e2e8f0",
        textMuted: "#94a3b8",
        textFaint: "#475569",
        accent: "#4ade80",
        accentDim: "#22c55e",
        accentBg: "rgba(74,222,128,0.08)",
        accentBorder: "rgba(74,222,128,0.2)",
        navBg: "rgba(10,10,15,0.92)",
        tagBg: "rgba(74,222,128,0.1)",
        tagText: "#4ade80",
        shadow: "0 4px 32px rgba(0,0,0,0.5)",
        shadowHover: "0 8px 40px rgba(74,222,128,0.12)",
        gradHero: "radial-gradient(ellipse 80% 60% at 60% 0%, rgba(74,222,128,0.07) 0%, transparent 70%)",
        gridLine: "rgba(255,255,255,0.03)",
      }
    : {
        bg: "#f8fafc",
        bgCard: "#ffffff",
        bgCardHover: "#f0fdf4",
        border: "#e2e8f0",
        borderLight: "#cbd5e1",
        text: "#0f172a",
        textMuted: "#475569",
        textFaint: "#94a3b8",
        accent: "#16a34a",
        accentDim: "#15803d",
        accentBg: "rgba(22,163,74,0.08)",
        accentBorder: "rgba(22,163,74,0.2)",
        navBg: "rgba(248,250,252,0.95)",
        tagBg: "rgba(22,163,74,0.1)",
        tagText: "#16a34a",
        shadow: "0 4px 24px rgba(0,0,0,0.08)",
        shadowHover: "0 8px 32px rgba(22,163,74,0.15)",
        gradHero: "radial-gradient(ellipse 80% 60% at 60% 0%, rgba(22,163,74,0.06) 0%, transparent 70%)",
        gridLine: "rgba(0,0,0,0.04)",
      };

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: t.bg, color: t.text, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(74,222,128,0.25); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(74,222,128,0.3); border-radius: 3px; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px; border-radius: 8px;
          background: ${t.accent}; color: #0a0a0f;
          font-weight: 600; font-size: 14px; cursor: pointer;
          border: none; transition: all 0.2s; letter-spacing: 0.01em;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(74,222,128,0.3); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: 8px;
          background: transparent; color: ${t.text};
          font-weight: 500; font-size: 14px; cursor: pointer;
          border: 1px solid ${t.border}; transition: all 0.2s;
        }
        .btn-ghost:hover { border-color: ${t.accent}; color: ${t.accent}; background: ${t.accentBg}; }
        .card {
          background: ${t.bgCard}; border: 1px solid ${t.border};
          border-radius: 16px; transition: all 0.3s;
        }
        .card:hover { border-color: ${t.accentBorder}; box-shadow: ${t.shadowHover}; transform: translateY(-3px); }
        .nav-link {
          color: ${t.textMuted}; font-size: 14px; font-weight: 500;
          padding: 8px 12px; border-radius: 6px; cursor: pointer;
          transition: all 0.2s; background: none; border: none;
        }
        .nav-link:hover { color: ${t.accent}; background: ${t.accentBg}; }
        .section-label {
          display: inline-flex; align-items: center; gap: 8px;
          color: ${t.accent}; font-size: 13px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          font-family: 'DM Mono', monospace; margin-bottom: 12px;
        }
        .badge {
          display: inline-block; padding: 4px 10px; border-radius: 6px;
          background: ${t.tagBg}; color: ${t.tagText};
          font-size: 12px; font-weight: 500; font-family: 'DM Mono', monospace;
        }
        .grid-bg {
          background-image: linear-gradient(${t.gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .typing-cursor::after { content: "|"; animation: blink 1s infinite; color: ${t.accent}; }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse-ring { 0% { transform: scale(0.95); opacity:0.7; } 100% { transform: scale(1.15); opacity:0; } }
        .float { animation: float 4s ease-in-out infinite; }
        .tag { display:inline-block; padding:4px 10px; border-radius:6px; background:${t.tagBg}; color:${t.tagText}; font-size:12px; font-weight:500; margin:3px; font-family:'DM Mono',monospace; }
        @media(max-width:768px){ .hero-grid{ flex-direction:column-reverse!important; } .hide-mobile{ display:none!important; } }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? t.navBg : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "none",
        transition: "all 0.3s", padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, fontWeight: 600, color: t.accent }}>
            endriw<span style={{ color: t.textMuted }}>.dev</span>
          </span>

          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV_LINKS.map(l => (
              <button key={l.label} className="nav-link" onClick={() => scrollTo(l.href)}>{l.label}</button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setDark(!dark)} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 16, transition: "all 0.2s" }}>
              {dark ? "☀️" : "🌙"}
            </button>
            <button className="hide-mobile btn-primary" onClick={() => scrollTo("#contato")}>
              Contato
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: t.text, fontSize: 18 }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: t.bgCard, borderBottom: `1px solid ${t.border}`, padding: "12px 24px" }}>
            {NAV_LINKS.map(l => (
              <div key={l.label} onClick={() => scrollTo(l.href)} style={{ padding: "12px 0", borderBottom: `1px solid ${t.border}`, color: t.textMuted, cursor: "pointer", fontSize: 15 }}>
                {l.label}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}>
        <div style={{ position: "absolute", inset: 0, background: t.gradHero, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px", width: "100%" }}>
          <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: 60, justifyContent: "space-between" }}>
            <AnimatedSection style={{ flex: 1 }}>
              <div>
                <div className="section-label" style={{ marginBottom: 20 }}>
                  <span>●</span> Disponível para oportunidades
                </div>
                <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
                  Endriw<br />
                  <span style={{ color: t.accent }}>Bento</span>
                </h1>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(13px, 2vw, 15px)", color: t.textMuted, marginBottom: 24, lineHeight: 1.6 }}>
                  Desenvolvedor Backend Java<br />
                  <span style={{ color: t.accent }}>Estudante de Engenharia de Software</span>
                </p>
                <p style={{ color: t.textMuted, fontSize: 16, lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>
                  Apaixonado por construir APIs robustas e escaláveis com Java e Spring Boot. Foco em boas práticas, arquitetura limpa e evolução contínua.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
                  <a href={CV_PDF_URL} download="Curriculo_EndriwBento.pdf" className="btn-primary">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download CV
                  </a>
                  <a href="https://github.com/EndriwEngSoft" target="_blank" rel="noreferrer" className="btn-primary" style={{ background: dark ? "#1e1e2e" : "#0f172a", color: "#e2e8f0" }}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <a href="https://linkedin.com/in/endriw-bento/" target="_blank" rel="noreferrer" className="btn-ghost">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, color: t.textMuted, fontSize: 14 }}>
                  <span>📍</span> Rio Grande do Sul, Brasil
                </div>
              </div>
            </AnimatedSection>

            {/* Profile Photo */}
            <AnimatedSection>
              <div className="float" style={{ position: "relative", flexShrink: 0 }}>
                <div style={{
                  width: 280, height: 280,
                  borderRadius: "50%",
                  border: `2px solid ${t.accent}`,
                  padding: 4,
                  boxShadow: `0 0 0 8px ${t.accentBg}, 0 20px 60px rgba(74,222,128,0.15)`,
                  position: "relative",
                }}>
                  <img
                    src={PROFILE_IMG}
                    alt="Endriw Bento"
                    style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", objectPosition: "center top" }}
                  />
                  <div style={{
                    position: "absolute", bottom: 12, right: 12,
                    background: t.accent, borderRadius: "50%",
                    width: 24, height: 24,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}>
                    <span style={{ fontSize: 12 }}>✓</span>
                  </div>
                </div>
                {/* Tech badges floating */}
                <div style={{ position: "absolute", top: -10, right: -10, background: dark ? "#1a1a26" : "#fff", border: `1px solid ${t.border}`, borderRadius: 10, padding: "6px 12px", fontSize: 12, fontFamily: "'DM Mono', monospace", color: t.accent, boxShadow: t.shadow }}>
                  Spring Boot 🍃
                </div>
                <div style={{ position: "absolute", bottom: 10, left: -20, background: dark ? "#1a1a26" : "#fff", border: `1px solid ${t.border}`, borderRadius: 10, padding: "6px 12px", fontSize: 12, fontFamily: "'DM Mono', monospace", color: t.textMuted, boxShadow: t.shadow }}>
                  ☕ Java Dev
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: t.textFaint, fontSize: 12, letterSpacing: "0.1em" }}>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, transparent, ${t.accent})` }} />
          <span style={{ fontFamily: "'DM Mono', monospace" }}>scroll</span>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label"><span>//</span> sobre mim</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, marginBottom: 48 }}>
            Quem sou eu
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            <div>
              <p style={{ color: t.textMuted, lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
                Sou estudante de <strong style={{ color: t.text }}>Engenharia de Software</strong> com foco em desenvolvimento backend utilizando Java, com formação sólida em Programação Orientada a Objetos e experiência prática em projetos reais.
              </p>
              <p style={{ color: t.textMuted, lineHeight: 1.8, fontSize: 16 }}>
                Tenho experiência no desenvolvimento de <strong style={{ color: t.text }}>APIs REST com Spring Boot</strong>, integração com bancos de dados relacionais e NoSQL, além de aplicação de boas práticas de arquitetura e versionamento com Git.
              </p>
            </div>
            <div>
              <p style={{ color: t.textMuted, lineHeight: 1.8, fontSize: 16, marginBottom: 28 }}>
                Atualmente sigo um roadmap contínuo focado em <strong style={{ color: t.accent }}>Java, automação, cloud e backend avançado</strong>, buscando minha primeira oportunidade como desenvolvedor para construir soluções eficientes, escaláveis e bem estruturadas.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {DIFERENCIAIS.map(d => (
                  <div key={d.title} style={{
                    background: t.accentBg, border: `1px solid ${t.accentBorder}`,
                    borderRadius: 10, padding: "10px 16px", fontSize: 13,
                    display: "flex", alignItems: "center", gap: 8, color: t.text,
                  }}>
                    <span>{d.icon}</span>
                    <span style={{ fontWeight: 500 }}>{d.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* STACK */}
      <section id="stack" style={{ padding: "100px 24px", background: dark ? "#0d0d14" : "#f1f5f9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div className="section-label"><span>//</span> tecnologias</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, marginBottom: 16 }}>Stack & Tecnologias</h2>
            <p style={{ color: t.textMuted, fontSize: 16, marginBottom: 48 }}>Ferramentas e tecnologias que utilizo no dia a dia</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
              {STACK.map((s, i) => (
                <div key={s.name} className="card" style={{
                  padding: "20px", cursor: "default",
                  animationDelay: `${i * 50}ms`,
                  background: t.bgCard, border: `1px solid ${t.border}`,
                }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: t.accent, fontFamily: "'DM Mono', monospace" }}>{s.category}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label"><span>//</span> portfólio</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, marginBottom: 16 }}>Projetos</h2>
          <p style={{ color: t.textMuted, fontSize: 16, marginBottom: 48 }}>Projetos práticos desenvolvidos durante minha formação</p>
          {/* Projeto Principal em destaque */}
            <a href={PROJECTS[0].link} target="_blank" rel="noreferrer" className="card" style={{
              padding: 32, display: "flex", flexDirection: "column", gap: 16,
              textDecoration: "none", color: "inherit", marginBottom: 24,
              border: `2px solid ${t.accentBorder}`,
              background: `linear-gradient(135deg, ${t.bgCard}, ${t.accentBg})`,
              boxShadow: `0 0 0 1px ${t.accentBorder}, inset 0 1px 0 rgba(255,255,255,0.05)`,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 16, right: 16,
                background: t.accent, color: "#0a0a0f",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                padding: "4px 10px", borderRadius: 6,
                fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
              }}>⭐ Projeto Principal</div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16, flexShrink: 0,
                  background: `linear-gradient(135deg, ${PROJECTS[0].color}33, ${PROJECTS[0].color}11)`,
                  border: `1px solid ${PROJECTS[0].color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30,
                }}>{PROJECTS[0].icon}</div>
                <div style={{ flex: 1, paddingRight: 80 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.3, marginBottom: 6 }}>{PROJECTS[0].title}</h3>
                  <p style={{ color: t.textMuted, fontSize: 15, lineHeight: 1.7 }}>{PROJECTS[0].desc}</p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
                {PROJECTS[0].tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: t.accent, fontSize: 13, fontWeight: 600 }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Ver no GitHub →
              </div>
            </a>

            {/* Demais projetos */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {PROJECTS.slice(1).map((p, i) => (
              <a key={p.title} href={p.link} target="_blank" rel="noreferrer" className="card" style={{
                padding: 28, display: "flex", flexDirection: "column", gap: 16,
                textDecoration: "none", color: "inherit",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: `linear-gradient(135deg, ${p.color}22, ${p.color}11)`,
                    border: `1px solid ${p.color}33`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                  }}>{p.icon}</div>
                  <svg width="18" height="18" fill="none" stroke={t.textFaint} strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>
                <h3 style={{ fontWeight: 600, fontSize: 16, lineHeight: 1.4 }}>{p.title}</h3>
                <p style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
                  {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: t.accent, fontSize: 13, fontWeight: 500 }}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  Ver no GitHub
                </div>
              </a>
            ))}
            </div>
        </AnimatedSection>
      </section>

      {/* EXPERIÊNCIA */}
      <section id="experiencia" style={{ padding: "100px 24px", background: dark ? "#0d0d14" : "#f1f5f9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div className="section-label"><span>//</span> trajetória</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, marginBottom: 48 }}>Experiência</h2>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 22, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, ${t.accent}, transparent)` }} />
              <div className="card" style={{ marginLeft: 56, padding: "28px 32px", position: "relative" }}>
                <div style={{
                  position: "absolute", left: -46, top: 28,
                  width: 14, height: 14, borderRadius: "50%",
                  background: t.accent, border: `3px solid ${t.bg}`,
                  boxShadow: `0 0 0 4px ${t.accentBg}`,
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Desenvolvedor Backend Java</h3>
                    <p style={{ color: t.accent, fontSize: 14, fontFamily: "'DM Mono', monospace" }}>Formação Prática — Projetos Aplicados</p>
                  </div>
                  <span className="badge">2024 — Presente</span>
                </div>
                <p style={{ color: t.textMuted, lineHeight: 1.75, fontSize: 15, marginBottom: 20 }}>
                  Projetos práticos e estudos aplicados com foco em desenvolvimento backend utilizando Java e Spring Boot. Desenvolvimento de APIs REST com arquitetura em camadas, integração com bancos relacionais e NoSQL, aplicação de conceitos de POO e boas práticas de desenvolvimento.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Java", "Spring Boot", "JPA", "MongoDB", "REST", "Git", "POO"].map(t2 => <span key={t2} className="tag">{t2}</span>)}
                </div>
              </div>

              <div className="card" style={{ marginLeft: 56, padding: "28px 32px", position: "relative", marginTop: 24 }}>
                <div style={{
                  position: "absolute", left: -46, top: 28,
                  width: 14, height: 14, borderRadius: "50%",
                  background: t.borderLight, border: `3px solid ${t.bg}`,
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Engenharia de Software</h3>
                    <p style={{ color: t.textMuted, fontSize: 14, fontFamily: "'DM Mono', monospace" }}>Graduação em andamento</p>
                  </div>
                  <span className="badge">Em andamento</span>
                </div>
                <p style={{ color: t.textMuted, lineHeight: 1.75, fontSize: 15 }}>
                  Formação acadêmica em Engenharia de Software, com base sólida em fundamentos da computação, algoritmos, estruturas de dados, e desenvolvimento de software.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CERTIFICAÇÃO */}
      <section id="certificacao" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label"><span>//</span> educação</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, marginBottom: 48 }}>Certificação</h2>
          <a href="https://ude.my/UC-8553c0b3-a718-4212-b176-baf5ac058f09" target="_blank" rel="noreferrer" className="card" style={{
            display: "block", padding: "32px 36px", textDecoration: "none", color: "inherit",
            background: `linear-gradient(135deg, ${t.bgCard}, ${t.accentBg})`,
            borderColor: t.accentBorder, maxWidth: 600,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg, ${t.accent}33, ${t.accent}11)`,
                border: `1px solid ${t.accentBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
              }}>📜</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Udemy</div>
                <h3 style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.4, marginBottom: 8 }}>
                  Formação Completa em Java: Programação Orientada a Objetos + Projetos
                </h3>
                <p style={{ color: t.textMuted, fontSize: 14, marginBottom: 16 }}>Emitido em Fevereiro de 2026</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: t.accent, fontSize: 13, fontWeight: 600 }}>
                  Ver certificado
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </AnimatedSection>
      </section>

      {/* CONTATO */}
      <section id="contato" style={{ padding: "100px 24px", background: dark ? "#0d0d14" : "#f1f5f9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div className="section-label"><span>//</span> vamos conversar</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, marginBottom: 16 }}>Entre em Contato</h2>
            <p style={{ color: t.textMuted, fontSize: 16, marginBottom: 48, maxWidth: 500 }}>
              Aberto a oportunidades de desenvolvimento backend Java. Vamos conversar sobre como posso contribuir com seu time!
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, maxWidth: 700 }}>
              {[
                { icon: "✉️", label: "Email", value: "endriwbento@gmail.com", action: copyEmail, actionLabel: copied ? "Copiado! ✓" : "Copiar" },
                { icon: "📱", label: "Telefone", value: "053 99105-0104", href: "tel:+55053991050104" },
                { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/endriw-bento", href: "https://linkedin.com/in/endriw-bento/" },
                { icon: "🐙", label: "GitHub", value: "EndriwEngSoft", href: "https://github.com/EndriwEngSoft" },
              ].map(item => (
                <div key={item.label} className="card" style={{ padding: "20px 24px" }}>
                  <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
                  <div style={{ color: t.textMuted, fontSize: 12, fontFamily: "'DM Mono', monospace", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</div>
                  <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 12, wordBreak: "break-all" }}>{item.value}</div>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" style={{ color: t.accent, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      Acessar →
                    </a>
                  ) : (
                    <button onClick={item.action} style={{ background: "none", border: "none", cursor: "pointer", color: t.accent, fontSize: 13, fontWeight: 600, padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
                      {item.actionLabel}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${t.border}`, padding: "32px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", color: t.textMuted, fontSize: 14 }}>
            endriw<span style={{ color: t.accent }}>.dev</span> — Desenvolvido por Endriw Bento
          </span>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <a href="https://linkedin.com/in/endriw-bento/" target="_blank" rel="noreferrer" style={{ color: t.textMuted, fontSize: 14, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = t.accent} onMouseLeave={e => e.target.style.color = t.textMuted}>LinkedIn</a>
            <a href="https://github.com/EndriwEngSoft" target="_blank" rel="noreferrer" style={{ color: t.textMuted, fontSize: 14, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = t.accent} onMouseLeave={e => e.target.style.color = t.textMuted}>GitHub</a>
            <a href="mailto:endriwbento@gmail.com" style={{ color: t.textMuted, fontSize: 14, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = t.accent} onMouseLeave={e => e.target.style.color = t.textMuted}>Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
