import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

import seoul540 from "../assets/personal-photos/seoul-540.jpg";
import starTrails from "../assets/personal-photos/star-trails.jpg";
import fieldTripSky from "../assets/personal-photos/field-trip-sky.jpg";
import hangzhouWestLake from "../assets/personal-photos/hangzhou-west-lake.jpg";
import crowdMotion from "../assets/personal-photos/crowd-motion.jpg";
import celebratingCollaboration from "../assets/personal-photos/celebrating-collaboration.jpg";
import groupphoto1 from "../assets/personal-photos/groupphoto1.jpg";
import astrophotography from "../assets/personal-photos/astrophotography.jpg";

// SLICES - Things kept on the desk
import moonTelescope from "../assets/personal-photos/moon-telescope.jpg";
import filmContactSheet from "../assets/personal-photos/film-contact-sheet.jpg";
import coffeeLatte from "../assets/personal-photos/coffee-latte.jpg";
import groupphoto2 from "../assets/personal-photos/groupphoto2.jpg";

// Intro - Life photos
import hainanLife from "../assets/personal-photos/hainan-life.jpg";
import bostonLife from "../assets/personal-photos/boston-life.jpg";
import newyorkLife from "../assets/personal-photos/newyork-life.jpg";

// ─── palette ─────────────────────────────────────────────────────────────────
const C = {
  bone: "#f3ecdf",
  green: "#243c29",
  red: "#eb5b48",
  pink: "#efb5c2",
  ink: "#161718",
};

// ─── typography shorthands ────────────────────────────────────────────────────
const MONO = '"DM Mono", monospace';
const SERIF = 'Fraunces, "Noto Serif SC", serif';
const SANS = '"DM Sans", sans-serif';

// ─── data ─────────────────────────────────────────────────────────────────────
// ─── translations ──────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    nav: {
      about: "About",
      research: "Research",
      resume: "Resume",
      notes: "Notes",
      contact: "Contact",
    },
    hero: {
      title: "Neuroscience / Computer Science",
      subtitle: "Smith College undergraduate. Zebrafish developmental biology at Barresi Lab. Data infrastructure research at Smith College.",
      location: "Shanghai · Seoul · Northampton",
      archive: "Personal archive / 2026",
    },
    intro: {
      title: "From Qingdao & Shanghai,<br />looking outward.",
      desc: "I am Zihan, born in Qingdao, raised in Shanghai. A Smith College student and INFJ with a soft spot for quiet rooms, imagined worlds, and projects that reward patience.",
    },
    about: {
      title: "About",
      desc: "I work between <strong>wet lab biology</strong>, computation, and visual culture. In the day: zebrafish, HCR, confocal microscopy and reverse engineering. Interests: film frames, skywatching, coffee, and erhu.",
    },
    research: "Research",
    photography: "Photography",
    notes: "Notes",
    resume: "Resume",
  },
  zh: {
    nav: {
      about: "关于",
      research: "科研",
      resume: "简历",
      notes: "笔记",
      contact: "联系",
    },
    hero: {
      title: "神经科学 / 计算机科学",
      subtitle: "Smith College 本科生。Barresi Lab 斑马鱼发育生物学研究。Smith College 数据基础设施研究。",
      location: "青岛 · 上海 · 首尔 · 北汉普顿",
      archive: "个人档案 / 2026",
    },
    intro: {
      title: "来自青岛与上海，<br />向外看。",
      desc: "我是子涵，生于青岛，长于上海。Smith College 学生，INFJ，喜欢安静的房间、想象的世界和需要耐心的项目。",
    },
    about: {
      title: "关于",
      desc: "我在<strong>湿实验生物学</strong>、计算和视觉文化之间工作。白天：斑马鱼、HCR、共聚焦显微镜和逆向工程。兴趣：胶片影像、天文观测、咖啡和二胡。",
    },
    research: "科研",
    photography: "摄影",
    notes: "笔记",
    resume: "简历",
  },
};

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Research" },
  { href: "#resume", label: "Resume" },
  { href: "#notes", label: "Notes" },
  { href: "#contact", label: "Contact" },
];

const TAGS = ["QINGDAO → SHANGHAI → SEOUL → NORTHAMPTON", "INFJ", "FILM", "ERHU", "ASTROPHOTOGRAPHY", "COFFEE"];

const SLICES = [
  { num: "01", title: "Nightwatch", sub: "星轨、月亮、架好望远镜后等待", img: moonTelescope, big: true },
  { num: "02", title: "35mm", sub: "胶片与暗房", img: filmContactSheet, big: false },
  { num: "03", title: "Kitchen notes", sub: "咖啡与调酒", img: coffeeLatte, big: false },
  { num: "04", title: "Erhu", sub: "练习，一点点地", img: groupphoto2, big: false },
];

const PROJECTS = [
  {
    index: "01", title: "Radial glia & Metrn/MetrnL",
    tags: "Barresi Lab · Smith College · 2025.11 —",
    desc: "研究 metrn/metrn-like 敲低对斑马鱼脊髓放射状胶质细胞发育的影响；用 HCR、免疫染色和共聚焦显微镜量化空间表达模式。",
  },
  {
    index: "02", title: "EEG & purchase intention",
    tags: "SKKU Summer Program · 2026.07",
    desc: "以 Python 完成 EEG 数据采集、预处理、统计分析与可视化，并结合 LLM 辅助文本分析。",
  },
  {
    index: "03", title: "Android reverse engineering",
    tags: "Data Infrastructure Lab · 2026.01 —",
    desc: "分析 App 内嵌逻辑与数据隐私漏洞，参与学术论文撰写。",
  },
  {
    index: "04", title: "Metrn/MetrnL muscle development",
    tags: "SURF · Smith College · 2026.05 — 06",
    desc: "开展全胚胎和冷冻切片免疫染色，以 Fiji 和 R 量化肌纤维方向。",
  },
];

const CV_ITEMS = [
  { date: "2025.11 — PRESENT", title: "Research Assistant", place: "Barresi Lab, Smith College", desc: "研究斑马鱼脊髓放射状胶质细胞发育，以 HCR、免疫染色和共聚焦显微镜开展实验；在 Celebrating Collaborations 展示成果。" },
  { date: "2026.01 — PRESENT", title: "Research Assistant", place: "Data Infrastructure Lab, Smith College", desc: "开展 Android 逆向工程和数据隐私研究。" },
  { date: "2026.07", title: "Research Project", place: "Sungkyunkwan University Summer Program", desc: "研究 EEG 信号与消费者购买意图的关系，完成数据处理、统计与可视化流程。" },
  { date: "2026.01 — PRESENT", title: "Teaching Assistant", place: "BIO 133 · Smith College", desc: "准备实验试剂与器材，协助本科生实验课程。" },
];

const SKILLS = ["Python", "R", "MATLAB", "HCR", "Immunostaining", "PCR", "Confocal", "Fiji", "Git", "Film photography"];

const NOTES_LIST = [];

const INTERNAL_NOTES = [
  { top: "10%", left: "10%", text: "Do I dare disturb the universe?", bg: "rgba(248,242,232,0.94)", color: "#2f2a22" },
  { top: "14%", left: "80%", text: "Research is a long, quiet conversation with the world.", bg: "rgba(230,236,229,0.92)", color: "#1f3324" },
  { top: "18%", left: "48%", text: "I contain multitude.", bg: "rgba(241,228,226,0.9)", color: "#3f2f2a" },
  { top: "32%", left: "25%", text: "The margin note becomes the most honest part.", bg: "rgba(255,250,238,0.92)", color: "#2f2a22" },
  { top: "36%", left: "70%", text: "Hidden thoughts are scattered like field notes.", bg: "rgba(235,244,239,0.9)", color: "#2d3f2e" },
  { top: "48%", left: "15%", text: "A small circle of light can change how you see the page.", bg: "rgba(245,240,232,0.93)", color: "#312a20" },
  { top: "54%", left: "60%", text: "I love infinitely the new day,\ntoday's sun,\ntoday's horse,\ntoday's rowan tree.", bg: "rgba(247,243,237,0.92)", color: "#2d2a22" },
  { top: "60%", left: "33%", text: "I keep my notebooks full of small, scattered questions.", bg: "rgba(252,245,239,0.92)", color: "#342f27" },
  { top: "68%", left: "82%", text: "Slow observation feels like learning another language.", bg: "rgba(238,244,239,0.9)", color: "#22312a" },
  { top: "76%", left: "40%", text: "The hidden note feels like a secret in a familiar book.", bg: "rgba(250,244,236,0.93)", color: "#2f2c22" },
  { top: "84%", left: "18%", text: "I want the page to hold thoughts that only appear when you look close.", bg: "rgba(234,236,238,0.9)", color: "#293035" },
  { top: "86%", left: "72%", text: "This is a quiet layer of internal world notes.", bg: "rgba(249,244,239,0.92)", color: "#2d2a24" },
];

const GALLERY = [
  { src: seoul540, caption: "SEOUL / 2026", tag: "35mm", r: -3, dy: 0 },
  { src: starTrails, caption: "STAR TRAILS / MA", tag: "LONG EXP", r: 2, dy: -24 },
  { src: fieldTripSky, caption: "FIELD NOTES / SKY", tag: "ASTRO", r: -1.5, dy: 16 },
  { src: hangzhouWestLake, caption: "WEST LAKE / 2025", tag: "TRAVEL", r: 3, dy: -8 },
  { src: crowdMotion, caption: "CROWD MOTION", tag: "SLOW EXP", r: -2, dy: 20 },
  { src: celebratingCollaboration, caption: "COLLABORATION", tag: "RESEARCH", r: 1.5, dy: -16 },
  { src: groupphoto1, caption: "GROUP / ERHU", tag: "STILL LIFE", r: -3, dy: 12 },
  { src: astrophotography, caption: "ASTRO / FIELD", tag: "NIGHT", r: 2.5, dy: -20 },
];

// ─── wrap style ────────────────────────────────────────────────────────────────
const wrap: React.CSSProperties = {
  width: "min(1320px, calc(100% - 44px))",
  margin: "0 auto",
};

// ─── Reveal ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(28px)",
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function InternalWorld() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [wrapperRect, setWrapperRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const updateRect = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      setWrapperRect(wrapper.getBoundingClientRect());
    };
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        setPos({ x: -9999, y: -9999 });
        return;
      }
      setPos({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
      {INTERNAL_NOTES.map((note, index) => {
        const noteX = wrapperRect ? (parseFloat(note.left) / 100) * wrapperRect.width : 0;
        const noteY = wrapperRect ? (parseFloat(note.top) / 100) * wrapperRect.height : 0;
        const distance = Math.hypot(pos.x - noteX, pos.y - noteY);
        const visible = distance < 72;

        const rotate = index % 2 === 0 ? -2 : 2;
        return (
          <div key={index} style={{
            position: "absolute",
            top: note.top,
            left: note.left,
            opacity: visible ? 1 : 0,
            transform: visible ? `translate(-50%, -50%) scale(1) rotate(${rotate}deg)` : `translate(-50%, -50%) scale(0.92) rotate(${rotate}deg)`,
            transition: "opacity 0.16s ease, transform 0.16s ease",
            fontFamily: SANS,
            fontSize: 12,
            lineHeight: 1.45,
            color: note.color,
            background: note.bg,
            padding: "6px 10px",
            borderRadius: 10,
            transformOrigin: "center",
            boxShadow: visible ? "0 10px 22px rgba(0,0,0,0.1)" : "none",
            maxWidth: 160,
            whiteSpace: "normal",
            pointerEvents: "none",
          }}>
            {note.text}
          </div>
        );
      })}
    </div>
  );
}

// ─── SectionHead ──────────────────────────────────────────────────────────────
function SectionHead({ index, title, desc, dark }: { index: string; title: string; desc: string; dark?: boolean }) {
  const border = dark ? "rgba(243,236,223,0.45)" : C.ink;
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
      paddingBottom: 18, borderBottom: `1px solid ${border}`,
    }} className="section-head-grid">
      <div>
        <span style={{ font: `500 10px/1.2 ${MONO}`, letterSpacing: "0.09em", textTransform: "uppercase", color: dark ? "rgba(243,236,223,0.55)" : "#9b9890" }}>
          {index} /
        </span>
        <h2 style={{
          fontFamily: SERIF, fontWeight: 500,
          fontSize: "clamp(40px, 6vw, 82px)", lineHeight: 0.9, letterSpacing: "-0.05em",
          marginTop: 8, whiteSpace: "pre-line",
        }}>{title}</h2>
      </div>
      <p style={{ maxWidth: 350, marginTop: "auto", color: dark ? "#b9b6ae" : "#55534f", fontSize: 14, lineHeight: 1.65, fontFamily: SANS }}>
        {desc}
      </p>
    </div>
  );
}

// ─── Cursor ───────────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [big, setBig] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dotRef.current) return;
      dotRef.current.style.left = e.clientX + "px";
      dotRef.current.style.top = e.clientY + "px";
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setBig(!!(el.closest("a, button, [data-mag]")));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div ref={dotRef} style={{
      position: "fixed", pointerEvents: "none", zIndex: 9999,
      width: big ? 58 : 12, height: big ? 58 : 12,
      borderRadius: "50%",
      background: C.bone,
      mixBlendMode: "difference",
      transform: "translate(-50%, -50%)",
      transition: "width 0.3s ease, height 0.3s ease",
    }} />
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", inset: "0 0 auto", zIndex: 20,
      color: C.bone, mixBlendMode: "difference",
      transition: "background 0.3s",
    }}>
      <nav style={{ ...wrap, height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#home" data-mag style={{
          fontFamily: SERIF, fontSize: 21, fontWeight: 500, lineHeight: 1,
          color: "inherit", textDecoration: "none",
        }}>Z.H.</a>

        <div className="nav-links" style={{ display: "flex", gap: 22 }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} data-mag style={{
              font: `500 10px/1 ${MONO}`, letterSpacing: "0.07em", textTransform: "uppercase",
              color: "inherit", textDecoration: "none",
              opacity: active === l.href.slice(1) ? 1 : 0.65,
              transition: "opacity 0.2s",
            }}>{l.label}</a>
          ))}
        </div>

        <button
          onClick={() => setOpen(o => !o)}
          className="nav-toggle"
          style={{ background: "none", border: 0, color: "inherit", fontSize: 22, cursor: "pointer", lineHeight: 1, padding: 4 }}
        >
          {open ? "×" : "+"}
        </button>
      </nav>

      {open && (
        <div style={{
          background: C.ink, padding: "20px 22px",
          display: "flex", flexDirection: "column", gap: 20,
        }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              font: `500 11px/1 ${MONO}`, letterSpacing: "0.07em", textTransform: "uppercase",
              color: C.bone, textDecoration: "none",
            }}>{l.label}</a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ language, setLanguage }: { language: "en" | "zh"; setLanguage: (lang: "en" | "zh") => void }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const t = TRANSLATIONS[language];

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };

  return (
    <section id="home" onMouseMove={onMove} style={{
      position: "relative", minHeight: "100svh",
      padding: "112px 0 48px",
      background: C.green, color: C.bone, overflow: "hidden",
    }}>

      {/* parallax ring */}
      <div style={{
        position: "absolute",
        width: "68vw", height: "68vw",
        right: "-16vw", top: "-27vw",
        border: `1px solid rgba(243,236,223,0.5)`,
        borderRadius: "50%",
        boxShadow: "0 0 0 42px rgba(243,236,223,0.06), 0 0 0 85px rgba(243,236,223,0.03)",
        transform: `translate(${mouse.x * 22}px, ${mouse.y * 18}px)`,
        transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
        pointerEvents: "none",
      }} />

      {/* second faint ring */}
      <div style={{
        position: "absolute",
        width: "40vw", height: "40vw",
        left: "-8vw", bottom: "-12vw",
        border: `1px solid rgba(243,236,223,0.15)`,
        borderRadius: "50%",
        transform: `translate(${mouse.x * -14}px, ${mouse.y * -10}px)`,
        transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
        pointerEvents: "none",
      }} />

      {/* Language toggle */}
      <div style={{
        position: "absolute",
        top: 112,
        right: 20,
        zIndex: 10,
        display: "flex",
        gap: 8,
      }}>
        <button
          onClick={() => setLanguage("en")}
          style={{
            padding: "4px 10px",
            font: `500 10px ${MONO}`,
            letterSpacing: "0.05em",
            border: `1px solid ${language === "en" ? C.bone : "rgba(243,236,223,0.3)"}`,
            background: language === "en" ? C.bone : "transparent",
            color: language === "en" ? C.green : C.bone,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("zh")}
          style={{
            padding: "4px 10px",
            font: `500 10px ${MONO}`,
            letterSpacing: "0.05em",
            border: `1px solid ${language === "zh" ? C.bone : "rgba(243,236,223,0.3)"}`,
            background: language === "zh" ? C.bone : "transparent",
            color: language === "zh" ? C.green : C.bone,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          中文
        </button>
      </div>

      <div style={{
        ...wrap,
        position: "relative", zIndex: 1,
        minHeight: "calc(100svh - 160px)",
        display: "grid",
        gridTemplateColumns: "0.82fr 1.18fr",
        alignItems: "end", gap: 30,
      }} className="hero-grid">
        <div style={{ alignSelf: "start" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            font: `500 10px/1.3 ${MONO}`, letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            <span>{t.hero.archive}</span>
            <span>{t.hero.location}</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{ maxWidth: 310, marginTop: 52 }}
          >
            <span style={{ font: `500 10px/1.2 ${MONO}`, letterSpacing: "0.09em", textTransform: "uppercase", color: "rgba(212,216,207,0.8)" }}>
              {t.hero.title}
            </span>
            <p style={{ marginTop: 14, color: "#c8ccbc", fontSize: 13, lineHeight: 1.7, fontFamily: SANS }}>
              {t.hero.subtitle}
            </p>
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          style={{
            margin: "0 -10px -16px",
            fontFamily: SERIF, fontWeight: 500,
            fontSize: "clamp(76px, 13.8vw, 202px)",
            lineHeight: 0.72, letterSpacing: "-0.06em",
            whiteSpace: "nowrap",
          }}
        >
          Zihan<br />
          <i style={{ display: "block", marginLeft: "18vw", color: C.pink, fontWeight: 400, fontStyle: "italic" }}>
            Z<em style={{ color: C.red, fontStyle: "normal" }}>h</em>ang
          </i>
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        style={{
          position: "absolute",
          left: "calc((100% - min(1320px, calc(100% - 44px))) / 2 + 22px)",
          bottom: 42,
          display: "flex", alignItems: "center", gap: 10,
          font: `500 9px/1 ${MONO}`, letterSpacing: "0.08em", textTransform: "uppercase",
          color: "rgba(243,236,223,0.6)",
        }}
      >
        <span style={{ display: "block", width: 38, height: 1, background: "currentColor" }} />
        Scroll to enter
      </motion.div>
    </section>
  );
}

// ─── Intro ────────────────────────────────────────────────────────────────────
function Intro({ language }: { language: "en" | "zh" }) {
  const t = TRANSLATIONS[language];
  return (
    <section style={{ background: C.bone, padding: "92px 0" }}>
      <div style={wrap} className="intro-grid-wrap">
        <div style={{
          display: "grid", gridTemplateColumns: "0.82fr 1.18fr",
          gap: 58, alignItems: "start",
        }} className="two-col-grid">
          <Reveal>
            <div>
              <span style={{ font: `500 10px/1.2 ${MONO}`, letterSpacing: "0.09em", textTransform: "uppercase", color: "#9b9890" }}>
                00 / {language === "en" ? "A little more personal" : "更个人一些"}
              </span>
              <h2 style={{
                fontFamily: SERIF, fontWeight: 500,
                fontSize: "clamp(47px, 6vw, 86px)",
                lineHeight: 0.87, letterSpacing: "-0.055em",
                marginTop: 10,
              }} dangerouslySetInnerHTML={{ __html: t.intro.title }}>
              </h2>
              <p style={{ maxWidth: 380, marginTop: 22, fontSize: 15, lineHeight: 1.65, color: "#55534f", fontFamily: SANS }}>
                {t.intro.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 26 }}>
                {TAGS.map(t => (
                  <span key={t} style={{
                    border: `1px solid ${C.ink}`, padding: "6px 9px",
                    font: `500 9px/1 ${MONO}`, letterSpacing: "0.05em",
                    transition: "background 0.2s, color 0.2s",
                    cursor: "default",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.ink; (e.currentTarget as HTMLElement).style.color = C.bone; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = ""; }}
                    data-mag
                  >{t}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ display: "grid", gap: 13 }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 0.85fr",
                gridTemplateRows: "190px 190px",
                gap: 13,
              }}>
                {[
                  { src: hainanLife, caption: "HAINAN", span: true, rotate: -2, mt: 0, ml: 0 },
                  { src: bostonLife, caption: "BOSTON", span: false, rotate: 3, mt: 23, ml: 0 },
                  { src: newyorkLife, caption: "NEW YORK", span: false, rotate: 1, mt: 0, ml: 30 },
                ].map((img, i) => (
                  <figure key={i} style={{
                    position: "relative", margin: 0, overflow: "hidden",
                    background: C.ink,
                    border: "7px solid #fffaf0",
                    boxShadow: `7px 8px 0 ${C.ink}`,
                    transform: `rotate(${img.rotate}deg)`,
                    gridRow: img.span ? "span 2" : undefined,
                    marginTop: img.mt,
                    marginLeft: img.ml,
                    transition: "transform 0.35s ease",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = `rotate(0deg) scale(1.03)`}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = `rotate(${img.rotate}deg)`}
                    data-mag
                  >
                    <img
                      src={img.src}
                      alt={img.caption}
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.04) saturate(0.76)", display: "block" }}
                    />
                    <figcaption style={{
                      position: "absolute", left: 9, bottom: 8,
                      padding: "4px 6px", background: C.bone,
                      font: `500 8px/1 ${MONO}`, letterSpacing: "0.05em", color: C.ink,
                    }}>{img.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
function Ticker() {
  const items = ["INFJ", "✳", "CAPRICORN", "✳", "FILM PHOTOGRAPHER", "✳", "ERHU PLAYER", "✳"];
  const doubled = [...items, ...items];
  return (
    <div style={{
      display: "flex", alignItems: "center", height: 51,
      overflow: "hidden", background: C.red, color: C.ink,
      borderTop: `1px solid ${C.ink}`, borderBottom: `1px solid ${C.ink}`,
    }}>
      <div style={{
        flex: "none", whiteSpace: "nowrap",
        font: `500 24px/1 ${SERIF}`,
        animation: "marquee 23s linear infinite",
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ paddingRight: 25 }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About({ language }: { language: "en" | "zh" }) {
  const t = TRANSLATIONS[language];
  return (
    <section id="about" style={{ background: C.bone, padding: "105px 0" }}>
      <div style={wrap}>
        <SectionHead index="01" title={language === "en" ? "Close\nobservation." : "仔细\n观察。"} desc={language === "en" ? "Research-minded, image-minded. A practice built around attention to detail, repetition, and evidence." : "以研究和影像为核心。通过关注细节、重复和证据构建的实践。"} />
        <div style={{
          display: "grid", gridTemplateColumns: "1.05fr 0.95fr",
          gap: "7vw", paddingTop: 52,
        }} className="two-col-grid">
          <Reveal>
            <p style={{
              fontFamily: SERIF,
              fontSize: "clamp(23px, 2.7vw, 40px)",
              lineHeight: 1.1, fontWeight: 500,
            }} dangerouslySetInnerHTML={{ __html: t.about.desc }}>
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <figure style={{
              position: "relative",
              maxWidth: 430, justifySelf: "end",
              padding: "11px 11px 48px",
              background: "#fcf8ee",
              boxShadow: `15px 15px 0 ${C.ink}`,
              transform: "rotate(3deg)",
              margin: 0,
              transition: "transform 0.4s ease",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "rotate(0deg)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "rotate(3deg)"}
              data-mag
            >
              <img
                src="https://images.unsplash.com/photo-1594609058337-4b094a308dc1?w=430&h=410&fit=crop&auto=format"
                alt="Field notes"
                style={{ display: "block", width: "100%", aspectRatio: "1.05", objectFit: "cover", filter: "contrast(1.06) saturate(0.72)" }}
              />
              <div style={{
                position: "absolute", bottom: 18, left: 18,
                font: `500 10px/1 ${MONO}`, letterSpacing: "0.07em", color: C.ink,
              }}>FIELD NOTES / 2026</div>
              <div style={{
                position: "absolute", left: -38, top: -36,
                width: 93, aspectRatio: "1",
                border: `2px solid ${C.red}`, borderRadius: "50%",
                display: "grid", placeItems: "center",
                color: C.red, background: "#fcf8ee",
                font: `500 9px/1.25 ${MONO}`,
                textAlign: "center",
                transform: "rotate(-13deg)",
              }}>ZIHAN<br />ZHANG<br />ARCHIVE</div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Off Duty ─────────────────────────────────────────────────────────────────
function OffDuty() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section style={{ background: C.pink, padding: "105px 0" }}>
      <div style={wrap}>
        <SectionHead index="02" title={"Things kept\non the desk."} desc="Not a detour from the work. Another way of practicing observation." />
        <Reveal>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr 0.85fr",
            gridTemplateRows: "240px 240px",
            gap: 14, marginTop: 32,
          }} className="slice-grid">
            {SLICES.map((s, i) => (
              <article
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                data-mag
                style={{
                  position: "relative", overflow: "hidden",
                  border: `1px solid ${C.ink}`,
                  gridRow: s.big ? "span 2" : undefined,
                  cursor: "pointer",
                  transform: hovered === i ? "scale(1.025)" : "scale(1)",
                  transition: "transform 0.35s ease",
                }}
              >
                <img
                  src={s.img}
                  alt={s.title}
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover",
                    filter: hovered === i ? "contrast(1.1) saturate(0.85)" : "contrast(1.06) saturate(0.65)",
                    transition: "filter 0.35s ease",
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: hovered === i ? "rgba(22,23,24,0.25)" : "rgba(22,23,24,0.45)",
                  transition: "background 0.35s",
                }} />
                <span style={{
                  position: "absolute", zIndex: 1, right: 17, top: 15,
                  font: `500 10px/1 ${MONO}`, color: C.bone,
                }}>{s.num}</span>
                <h3 style={{
                  position: "absolute", zIndex: 1, left: 18, bottom: 18,
                  fontFamily: SERIF, fontWeight: 500,
                  fontSize: s.big ? "clamp(34px, 5vw, 69px)" : "clamp(20px, 2.4vw, 33px)",
                  lineHeight: 1, color: C.bone,
                }}>
                  {s.title}
                  <span style={{ display: "block", marginTop: 7, font: `400 11px/1.3 ${SANS}`, color: "rgba(243,236,223,0.8)" }}>{s.sub}</span>
                </h3>
                <div style={{ position: "absolute", inset: 10, border: "1px solid rgba(22,23,24,0.45)", pointerEvents: "none" }} />
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section id="projects" style={{ background: C.bone, padding: "105px 0" }}>
      <div style={wrap}>
        <SectionHead index="03" title={"Evidence,\nnot adjectives."} desc="Ongoing research and projects; methods are part of the story." />
        <div style={{ borderTop: `1px solid ${C.ink}`, marginTop: 42 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <article
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                data-mag
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr 0.9fr 28px",
                  alignItems: "center", gap: 24,
                  padding: hovered === i ? "24px 16px" : "24px 0",
                  borderBottom: `1px solid ${C.ink}`,
                  background: hovered === i ? C.red : "transparent",
                  transition: "padding 0.25s ease, background 0.25s ease",
                  cursor: "pointer",
                }} className="project-row"
              >
                <span style={{ font: `500 11px/1 ${MONO}` }}>{p.index}</span>
                <div>
                  <h3 style={{
                    fontFamily: SERIF, fontWeight: 500,
                    fontSize: "clamp(22px, 3vw, 43px)",
                    lineHeight: 0.95, letterSpacing: "-0.035em",
                  }}>{p.title}</h3>
                  <div style={{
                    font: `500 9px/1.4 ${MONO}`, letterSpacing: "0.05em", textTransform: "uppercase",
                    color: hovered === i ? C.ink : C.green, marginTop: 5,
                    transition: "color 0.25s",
                  }}>{p.tags}</div>
                </div>
                <p style={{
                  color: hovered === i ? C.ink : "#55534f", fontSize: 12, lineHeight: 1.6, fontFamily: SANS,
                  transition: "color 0.25s",
                }}>{p.desc}</p>
                <span style={{
                  font: `500 30px/1 ${SERIF}`,
                  transform: hovered === i ? "translate(4px,-4px)" : "none",
                  transition: "transform 0.25s ease",
                  display: "block",
                }}>↗</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Resume ───────────────────────────────────────────────────────────────────
function Resume() {
  return (
    <section id="resume" style={{ background: C.green, color: C.bone, padding: "105px 0" }}>
      <div style={wrap}>
        <SectionHead index="04" title="Field record." desc="A structured account, kept visually quiet enough to read." dark />
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: 60, marginTop: 37,
        }} className="two-col-grid">
          <aside>
            <span style={{ font: `500 11px/1.5 ${MONO}`, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Smith College
            </span>
            <p style={{ maxWidth: 190, marginTop: 18, color: "#c3c9bf", font: `400 12px/1.65 ${SANS}` }}>
              BA in Neuroscience + Computer Science<br /><br />
              GPA 3.96 / 4.0<br /><br />
              Northampton, MA
            </p>
          </aside>

          <Reveal>
            <div>
              {CV_ITEMS.map((item, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "140px 1fr", gap: 20,
                  padding: "17px 0",
                  borderTop: "1px solid rgba(243,236,223,0.4)",
                  borderBottom: i === CV_ITEMS.length - 1 ? "1px solid rgba(243,236,223,0.4)" : undefined,
                }} className="cv-row">
                  <div style={{ font: `500 10px/1.45 ${MONO}`, letterSpacing: "0.04em", color: C.pink }}>
                    {item.date}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: SERIF, fontSize: 21, lineHeight: 1.1, fontWeight: 500 }}>{item.title}</h3>
                    <div style={{ margin: "3px 0 7px", color: C.pink, font: `500 10px/1.4 ${MONO}`, letterSpacing: "0.03em" }}>{item.place}</div>
                    <p style={{ maxWidth: 630, color: "#d6d8d1", fontSize: 12, lineHeight: 1.6, fontFamily: SANS }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 35 }}>
            {SKILLS.map(s => (
              <span key={s}
                data-mag
                style={{
                  padding: "7px 10px",
                  border: "1px solid rgba(243,236,223,0.45)",
                  font: `500 9px/1 ${MONO}`, letterSpacing: "0.04em",
                  transition: "background 0.2s, color 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.bone; (e.currentTarget as HTMLElement).style.color = C.ink; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = ""; }}
              >{s}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Notes ────────────────────────────────────────────────────────────────────
function Notes() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section id="notes" style={{ background: C.bone, padding: "105px 0 0" }}>
      <div style={wrap}>
        <SectionHead index="05" title={"Still\ndeveloping."} desc="Small future entries, kept open." />
        <div style={{ marginTop: 38, borderTop: `1px solid ${C.ink}` }}>
          {NOTES_LIST.map((note, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-mag
              style={{
                display: "flex", justifyContent: "space-between", gap: 20,
                padding: "22px 0",
                borderBottom: `1px solid ${C.ink}`,
                font: `500 clamp(20px, 2.8vw, 37px)/1 ${SERIF}`,
                color: hovered === i ? C.red : C.ink,
                transition: "color 0.2s",
                cursor: "default",
              }}
            >
              <span>{note}</span>
              <time style={{
                alignSelf: "center",
                font: `500 10px/1 ${MONO}`,
                letterSpacing: "0.06em",
                color: hovered === i ? C.red : "#b0aea8",
                transition: "color 0.2s",
              }}>SOON</time>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [hover, setHover] = useState(false);
  return (
    <section id="contact" style={{ padding: "88px 0", background: C.red }}>
      <div style={wrap}>
        <span style={{ font: `500 10px/1 ${MONO}`, letterSpacing: "0.09em", textTransform: "uppercase" }}>
          Correspondence
        </span>
        <h2 style={{
          maxWidth: 990,
          fontFamily: SERIF, fontWeight: 500,
          fontSize: "clamp(50px, 9.5vw, 142px)",
          lineHeight: 0.78, letterSpacing: "-0.065em",
          marginTop: 12,
        }}>
          {"Let's make"}<br />
          <em style={{ color: C.bone, fontWeight: 400, fontStyle: "italic" }}>contact.</em>
        </h2>
        <div style={{
          display: "flex", justifyContent: "space-between", gap: 22,
          marginTop: 48, paddingTop: 14, borderTop: `1px solid ${C.ink}`,
        }} className="contact-bottom">
          <p style={{ maxWidth: 300, fontSize: 14, lineHeight: 1.65, fontFamily: SANS }}>
            For research, collaboration, or a particularly good question.
          </p>
          <a
            href="mailto:hzhang29@smith.edu"
            data-mag
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              font: `500 14px/1 ${MONO}`,
              textDecoration: "underline", textUnderlineOffset: 4,
              color: hover ? C.bone : C.ink,
              transition: "color 0.2s",
            }}
          >
            hzhang29@smith.edu ↗
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Photography ──────────────────────────────────────────────────────────────
function Photography() {
  const stripRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollBase = useRef(0);

  const onDown = (e: React.MouseEvent) => {
    if (!stripRef.current) return;
    dragging.current = true;
    startX.current = e.clientX;
    scrollBase.current = stripRef.current.scrollLeft;
    stripRef.current.style.cursor = "grabbing";
  };

  const onMove = (e: React.MouseEvent) => {
    if (!dragging.current || !stripRef.current) return;
    e.preventDefault();
    const dx = e.clientX - startX.current;
    stripRef.current.scrollLeft = scrollBase.current - dx * 1.1;
  };

  const stopDrag = () => {
    dragging.current = false;
    if (stripRef.current) stripRef.current.style.cursor = "grab";
  };

  return (
    <section style={{ background: C.ink, color: C.bone, padding: "105px 0 100px", overflow: "hidden" }}>
      <div style={{ ...wrap, marginBottom: 52 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 20, paddingBottom: 20,
          borderBottom: "1px solid rgba(243,236,223,0.25)",
        }} className="section-head-grid">
          <div>
            <span style={{ font: `500 10px/1.2 ${MONO}`, letterSpacing: "0.09em", textTransform: "uppercase", color: "rgba(243,236,223,0.45)" }}>
              06 / Photography
            </span>
            <h2 style={{
              fontFamily: SERIF, fontWeight: 500,
              fontSize: "clamp(40px, 6vw, 82px)",
              lineHeight: 0.9, letterSpacing: "-0.05em",
              marginTop: 8,
            }}>
              Archive.
              <br />
              <em style={{ color: C.pink, fontStyle: "italic", fontWeight: 400 }}>Drag to explore.</em>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <p style={{ maxWidth: 350, color: "rgba(243,236,223,0.55)", fontSize: 13, lineHeight: 1.7, fontFamily: SANS }}>
              Photographs taken on film and digital. Seoul streets at dusk, star trails over western Massachusetts, winter campus mornings.
            </p>
            <div style={{
              marginTop: 24, font: `500 9px/1 ${MONO}`, letterSpacing: "0.07em",
              color: "rgba(243,236,223,0.35)", display: "flex", alignItems: "center", gap: 8,
            }}>
              <span>← drag →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable strip */}
      <div
        ref={stripRef}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          overflowX: "auto",
          paddingTop: 72,
          paddingBottom: 72,
          paddingLeft: "max(44px, calc((100% - 1320px) / 2 + 22px))",
          paddingRight: "max(44px, calc((100% - 1320px) / 2 + 22px))",
          cursor: "grab",
          userSelect: "none",
          scrollbarWidth: "none",
          msOverflowStyle: "none" as any,
        }}
        className="photo-strip"
      >
        {GALLERY.map((photo, i) => (
          <Polaroid key={i} photo={photo} index={i} />
        ))}
      </div>
    </section>
  );
}

function Polaroid({ photo, index }: { photo: typeof GALLERY[0]; index: number }) {
  const [h, setH] = useState(false);
  const gap = index % 2 === 0 ? 52 : 36;
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      data-mag
      style={{
        flex: "none",
        width: 210,
        marginRight: gap,
        padding: "10px 10px 44px",
        background: "#fffaf0",
        boxShadow: h
          ? `0 20px 40px rgba(0,0,0,0.5)`
          : `${photo.r > 0 ? 8 : -8}px 10px 0 rgba(0,0,0,0.6)`,
        transform: h
          ? `rotate(0deg) translateY(-12px) scale(1.05)`
          : `rotate(${photo.r}deg) translateY(${photo.dy}px)`,
        transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease",
        position: "relative",
        zIndex: h ? 10 : 1,
      }}
    >
      <img
        src={photo.src}
        alt={photo.caption}
        draggable={false}
        style={{
          display: "block", width: "100%", aspectRatio: "4/3",
          objectFit: "cover",
          filter: h ? "contrast(1.06) saturate(0.88)" : "contrast(1.06) saturate(0.68)",
          transition: "filter 0.4s ease",
        }}
      />
      {/* tag badge */}
      <div style={{
        position: "absolute", top: 10, right: 10,
        padding: "3px 6px", background: C.red,
        font: `500 7px/1 ${MONO}`, letterSpacing: "0.06em",
        color: C.bone,
      }}>{photo.tag}</div>
      {/* caption */}
      <div style={{
        paddingTop: 10,
        font: `500 8px/1.5 ${MONO}`,
        letterSpacing: "0.07em",
        color: C.ink,
      }}>{photo.caption}</div>
      {/* frame number */}
      <div style={{
        position: "absolute", bottom: 14, right: 14,
        font: `400 9px/1 ${MONO}`,
        color: "rgba(22,23,24,0.3)",
      }}>{String(index + 1).padStart(2, "0")}</div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "18px 0", background: C.ink, color: C.bone }}>
      <div style={{
        ...wrap,
        display: "flex", justifyContent: "space-between", gap: 15,
        font: `500 9px/1 ${MONO}`, letterSpacing: "0.05em",
      }}>
        <span>© 2026 Zihan Zhang</span>
        <span>Neuroscience / Computer Science</span>
      </div>
    </footer>
  );
}

// ─── Global styles ────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @keyframes marquee { to { transform: translateX(-50%) } }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; }
  .photo-strip::-webkit-scrollbar { display: none; }

  @media (max-width: 768px) {
    .two-col-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .intro-grid-wrap .two-col-grid { gap: 40px !important; }
    .section-head-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
    .hero-grid { grid-template-columns: 1fr !important; }
    .slice-grid {
      grid-template-columns: 1fr 1fr !important;
      grid-template-rows: 220px 160px 160px !important;
    }
    .slice-grid article:first-child {
      grid-column: span 2 !important;
      grid-row: auto !important;
    }
    .project-row {
      grid-template-columns: 48px 1fr 20px !important;
    }
    .project-row p,
    .project-row .tags { display: none; }
    .cv-row { grid-template-columns: 1fr !important; gap: 6px !important; }
    .contact-bottom { flex-direction: column !important; gap: 16px !important; }
    .nav-links { display: none !important; }
    .nav-toggle { display: block !important; }
  }

  @media (min-width: 769px) {
    .nav-toggle { display: none !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`;

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("home");
  const [language, setLanguage] = useState<"en" | "zh">("en");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-42% 0px -50%" }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <Cursor />
      <Nav active={active} />
      <div style={{ position: "relative" }}>
        <main>
          <Hero language={language} setLanguage={setLanguage} />
          <Intro language={language} />
          <Ticker />
          <About language={language} />
          <OffDuty language={language} />
          <Projects language={language} />
          <Resume language={language} />
          <Notes language={language} />
          <Contact />
          <Photography language={language} />
        </main>
        <InternalWorld />
      </div>
      <Footer />
    </>
  );
}
