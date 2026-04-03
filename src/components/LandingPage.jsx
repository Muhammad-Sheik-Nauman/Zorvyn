import { useState, useEffect, useRef } from 'react';
import { LuSun, LuMoon, LuActivity, LuTrendingUp, LuChartPie, LuLock, LuSearch, LuZap, LuSave, LuSmartphone } from 'react-icons/lu';
import { useApp } from '../context/AppContext';
import '../landing.css';

/* ── tiny hook: animate number on scroll ── */
function useCounter(target, duration = 1800, trigger) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const ease = t => 1 - Math.pow(1 - t, 3);
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round(ease(p) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return val;
}

/* ── animated stat item ── */
function StatItem({ value, suffix = '', label, trigger }) {
  const count = useCounter(value, 1600, trigger);
  return (
    <div className="lp-stat">
      <span className="lp-stat-value">{count}{suffix}</span>
      <span className="lp-stat-label">{label}</span>
    </div>
  );
}

/* ── reveal on scroll ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`lp-reveal ${visible ? 'lp-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   FEATURE CARDS DATA
───────────────────────────────────────── */
const features = [
  {
    icon: <LuActivity />,
    color: 'indigo',
    title: 'Live Dashboard',
    desc: "Get a real-time bird's-eye view of your balance, income, and expenses with beautifully animated summary cards.",
  },
  {
    icon: <LuTrendingUp />,
    color: 'teal',
    title: 'Balance Trends',
    desc: 'Visualize 6 months of income vs. expense history with interactive area charts — spot patterns at a glance.',
  },
  {
    icon: <LuChartPie />,
    color: 'purple',
    title: 'Spending Breakdown',
    desc: 'An interactive donut chart breaks down your spending across 13 categories so you know exactly where money goes.',
  },
  {
    icon: <LuLock />,
    color: 'pink',
    title: 'Role-Based Access',
    desc: 'Switch between Admin (full CRUD) and Viewer (read-only) roles — perfect for shared household or team budgets.',
  },
  {
    icon: <LuSearch />,
    color: 'blue',
    title: 'Smart Transactions',
    desc: 'Search, filter, sort, and export your transactions as CSV. Add, edit, or delete with a clean, validated form.',
  },
  {
    icon: <LuZap />,
    color: 'amber',
    title: 'AI-Style Insights',
    desc: 'Automatic savings rate, top spending categories, average daily spend, and monthly comparisons — all computed live.',
  },
  {
    icon: <LuMoon />,
    color: 'slate',
    title: 'Dark & Light Mode',
    desc: 'A beautifully crafted dark theme with a one-click toggle to light mode, persisted across sessions.',
  },
  {
    icon: <LuSave />,
    color: 'green',
    title: 'Offline-First',
    desc: 'All your data is persisted to localStorage — no account, no cloud, no internet required. Your data stays yours.',
  },
  {
    icon: <LuSmartphone />,
    color: 'orange',
    title: 'Fully Responsive',
    desc: 'Pixel-perfect layouts from 320 px phones to 4K monitors with a collapsible sidebar and adaptive grids.',
  },
];

/* ─────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────── */
const testimonials = [
  {
    text: 'Finally a finance app that doesn\'t look like a spreadsheet. The insights page alone saved me $200 last month.',
    name: 'Sarah K.',
    role: 'Freelance Designer',
    avatar: 'SK',
    color: '#6366f1',
  },
  {
    text: 'I switched from Mint to FinTrack and never looked back. The dark theme and real-time charts are just chef\'s kiss.',
    name: 'Marcus T.',
    role: 'Software Engineer',
    avatar: 'MT',
    color: '#22d3a5',
  },
  {
    text: 'The role-based access is genius — my partner uses Viewer mode so they can see our spending without messing anything up.',
    name: 'Priya R.',
    role: 'Product Manager',
    avatar: 'PR',
    color: '#a78bfa',
  },
];

/* ─────────────────────────────────────────
   PRICING
───────────────────────────────────────── */
const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Everything you need to start tracking.',
    cta: 'Get Started',
    primary: false,
    features: ['Unlimited transactions', 'Dashboard & charts', 'CSV export', 'Dark/Light mode'],
  },
  {
    name: 'Pro',
    price: '$4',
    period: 'per month',
    desc: 'Advanced insights for power users.',
    cta: 'Start Free Trial',
    primary: true,
    badge: 'Most Popular',
    features: ['Everything in Free', 'AI spending predictions', 'Budget goals & alerts', 'Multi-account support', 'Priority support'],
  },
  {
    name: 'Team',
    price: '$12',
    period: 'per month',
    desc: 'Collaborate on finances together.',
    cta: 'Contact Sales',
    primary: false,
    features: ['Everything in Pro', 'Up to 5 members', 'Admin/Viewer RBAC', 'Shared categories', 'Audit log'],
  },
];

/* ─────────────────────────────────────────
   MINI MOCK DASHBOARD
───────────────────────────────────────── */
function MockDashboard() {
  return (
    <div className="lp-mock" aria-hidden="true">
      {/* browser chrome */}
      <div className="lp-mock-bar">
        <span className="lp-dot lp-dot-r" />
        <span className="lp-dot lp-dot-y" />
        <span className="lp-dot lp-dot-g" />
        <span className="lp-mock-url">app.fintrack.io — Dashboard</span>
      </div>
      <div className="lp-mock-body">
        {/* sidebar */}
        <div className="lp-mock-sidebar">
          <div className="lp-mock-brand">
            <img src="/FinTrack.png" alt="Logo" className="lp-mock-brand-ico" />
            <span>FinTrack</span>
          </div>
          {['Dashboard', 'Transactions', 'Insights'].map((n, i) => (
            <div key={n} className={`lp-mock-nav ${i === 0 ? 'lp-mock-nav-active' : ''}`}>{n}</div>
          ))}
        </div>
        {/* content */}
        <div className="lp-mock-content">
          <div className="lp-mock-header-row">
            <div>
              <div className="lp-mock-h1">Good Morning, Alex 👋</div>
              <div className="lp-mock-h2">Here's your financial overview</div>
            </div>
            <div className="lp-mock-badge">Admin</div>
          </div>
          {/* cards */}
          <div className="lp-mock-cards">
            {[
              { label: 'Total Balance', val: '$12,840', change: '↑ 8.2%', color: 'var(--lp-text)', up: true },
              { label: 'Income', val: '$5,200', change: '↑ 4.1%', color: '#22d3a5', up: true },
              { label: 'Expenses', val: '$2,360', change: '↓ 1.5%', color: '#f87171', up: false },
              { label: 'Transactions', val: '184', change: 'Last 6 mo', color: 'var(--lp-text)', up: null },
            ].map(c => (
              <div key={c.label} className="lp-mock-card">
                <div className="lp-mock-card-lbl">{c.label}</div>
                <div className="lp-mock-card-val" style={{ color: c.color }}>{c.val}</div>
                <div className={`lp-mock-card-chg ${c.up === true ? 'lp-up' : c.up === false ? 'lp-dn' : 'lp-neu'}`}>{c.change}</div>
              </div>
            ))}
          </div>
          {/* charts */}
          <div className="lp-mock-charts">
            <div className="lp-mock-chart-box">
              <div className="lp-mock-chart-title">Balance Trend</div>
              <svg viewBox="0 0 260 80" preserveAspectRatio="none" style={{ width: '100%', height: 72 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3a5" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22d3a5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,60 C40,55 80,30 120,25 C160,20 200,35 260,18 L260,80 L0,80 Z" fill="url(#g2)" />
                <path d="M0,60 C40,55 80,30 120,25 C160,20 200,35 260,18" fill="none" stroke="#22d3a5" strokeWidth="1.5" />
                <path d="M0,70 C40,68 80,58 120,52 C160,46 200,50 260,42 L260,80 L0,80 Z" fill="url(#g1)" />
                <path d="M0,70 C40,68 80,58 120,52 C160,46 200,50 260,42" fill="none" stroke="#6366f1" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="lp-mock-chart-box">
              <div className="lp-mock-chart-title">Spending</div>
              <div className="lp-donut-wrap">
                <svg viewBox="0 0 70 70" style={{ width: 64, height: 64 }}>
                  <circle cx="35" cy="35" r="26" fill="none" stroke="#6366f1" strokeWidth="10" strokeDasharray="60 103" strokeDashoffset="-4" strokeLinecap="round" />
                  <circle cx="35" cy="35" r="26" fill="none" stroke="#22d3a5" strokeWidth="10" strokeDasharray="38 103" strokeDashoffset="-64" strokeLinecap="round" />
                  <circle cx="35" cy="35" r="26" fill="none" stroke="#a78bfa" strokeWidth="10" strokeDasharray="22 103" strokeDashoffset="-102" strokeLinecap="round" />
                  <text x="35" y="32" textAnchor="middle" fill="#e8e8e8" fontSize="7" fontWeight="700">$2.3k</text>
                  <text x="35" y="40" textAnchor="middle" fill="#6b6b6b" fontSize="5">total</text>
                </svg>
                <div className="lp-donut-legend">
                  {[['#6366f1', 'Food'], ['#22d3a5', 'Transport'], ['#a78bfa', 'Shopping']].map(([c, l]) => (
                    <div key={l} className="lp-legend-row"><span className="lp-legend-dot" style={{ background: c }} />{l}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN LANDING PAGE
───────────────────────────────────────── */
export default function LandingPage({ onEnter }) {
  const [statsRef, statsVisible] = useReveal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { state, dispatch } = useApp();
  const isDark = state.darkMode;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  // smooth scroll helper
  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const ThemeIcon = isDark ? LuSun : LuMoon;

  return (
    <div className={`lp-root ${isDark ? '' : 'lp-light'}`}>
      {/* ── BACKGROUND ── */}
      <div className="lp-bg" aria-hidden="true" />
      <div className="lp-orb lp-orb-1" aria-hidden="true" />
      <div className="lp-orb lp-orb-2" aria-hidden="true" />
      <div className="lp-orb lp-orb-3" aria-hidden="true" />

      {/* ════════════════════ NAV ════════════════════ */}
      <nav className={`lp-nav ${isScrolled ? 'lp-nav-scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <a href="#" className="lp-nav-logo" onClick={e => { e.preventDefault(); scrollTo('hero'); }}>
          <img src="/FinTrack.png" alt="FinTrack" className="lp-nav-logo-ico" />
          FinTrack
        </a>
        <ul className={`lp-nav-links ${mobileMenuOpen ? 'lp-nav-open' : ''}`} role="list">
          <li><button className="lp-nav-link" onClick={() => scrollTo('features')}>Features</button></li>
          <li><button className="lp-nav-link" onClick={() => scrollTo('how')}>How it works</button></li>
          <li><button className="lp-nav-link" onClick={() => scrollTo('pricing')}>Pricing</button></li>
          <li><button className="lp-nav-link" onClick={() => scrollTo('testimonials')}>Reviews</button></li>
          <li>
            <button id="nav-open-app-btn" className="lp-btn lp-btn-primary lp-nav-cta" onClick={onEnter}>
              Open App →
            </button>
          </li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            id="nav-theme-btn-mobile"
            className="lp-theme-btn"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <ThemeIcon size={16} strokeWidth={2} />
          </button>
          <button
            className="lp-mobile-menu-btn"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen(v => !v)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* ════════════════════ HERO ════════════════════ */}
      <section id="hero" className="lp-hero">
        <div className="lp-hero-badge">
          <span className="lp-badge-dot" />
          Now in open beta - free forever
        </div>

        <h1 className="lp-hero-h1">
          Your money,<br />
          <span className="lp-gradient-text">finally under control.</span>
        </h1>

        <p className="lp-hero-sub">
          FinTrack is the all-in-one personal finance dashboard that turns raw transactions
          into crystal-clear insights — beautifully designed, blazing fast, and 100% private.
        </p>

        <div className="lp-hero-actions">
          <button id="hero-get-started-btn" className="lp-btn lp-btn-primary lp-btn-lg" onClick={onEnter}>
            Get Started — It's Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
          <button id="hero-see-how-btn" className="lp-btn lp-btn-ghost lp-btn-lg" onClick={() => scrollTo('how')}>
            See how it works
          </button>
        </div>

        <div className="lp-hero-trust">
          <span className="lp-trust-avatars" aria-hidden="true">
            {['A', 'M', 'P', 'S', 'R'].map((l, i) => (
              <span key={i} className="lp-avatar" style={{ background: ['#6366f1', '#22d3a5', '#a78bfa', '#f472b6', '#60a5fa'][i], left: i * 22 }}>{l}</span>
            ))}
          </span>
          <span className="lp-trust-text">Loved by <strong>2,400+</strong> users</span>
          <span className="lp-trust-stars" aria-label="5 stars">★★★★★</span>
        </div>

        {/* Mock dashboard preview */}
        <div className="lp-preview-wrap">
          <div className="lp-preview-glow" aria-hidden="true" />
          <MockDashboard />
        </div>
      </section>

      {/* ════════════════════ STATS ════════════════════ */}
      <section className="lp-stats-section" ref={statsRef} aria-label="Key statistics">
        <StatItem value={2400} suffix="+" label="Active Users" trigger={statsVisible} />
        <div className="lp-stats-divider" aria-hidden="true" />
        <StatItem value={13} label="Spending Categories" trigger={statsVisible} />
        <div className="lp-stats-divider" aria-hidden="true" />
        <StatItem value={100} suffix="%" label="Client-Side & Private" trigger={statsVisible} />
        <div className="lp-stats-divider" aria-hidden="true" />
        <StatItem value={6} label="Months of History" trigger={statsVisible} />
      </section>

      {/* ════════════════════ FEATURES ════════════════════ */}
      <section id="features" className="lp-section lp-features-section">
        <Reveal>
          <div className="lp-section-badge">✦ Features</div>
          <h2 className="lp-section-title">Everything you need,<br />nothing you don't.</h2>
          <p className="lp-section-sub">
            Built for people who want real financial clarity — not a product trying to upsell a credit card.
          </p>
        </Reveal>

        <div className="lp-features-grid">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 50}>
              <div className={`lp-feature-card lp-feature-${f.color}`} tabIndex={0}>
                <div className="lp-feature-icon">{f.icon}</div>
                <h3 className="lp-feature-title">{f.title}</h3>
                <p className="lp-feature-desc">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <section id="how" className="lp-section lp-how-section">
        <Reveal>
          <div className="lp-section-badge">⚡ How it works</div>
          <h2 className="lp-section-title">Up and running<br />in under 30 seconds.</h2>
        </Reveal>

        <div className="lp-steps">
          {[
            { n: '01', icon: '🖱️', title: 'Open the App', desc: 'Click "Get Started" — no sign-up, no email, no credit card. Just open and go.' },
            { n: '02', icon: '💳', title: 'Add Transactions', desc: 'Log income and expenses with a category, date, and description. Or use the pre-loaded demo data.' },
            { n: '03', icon: '📊', title: 'See Your Insights', desc: 'The dashboard, charts, and insights page update instantly. Filter, sort, and find patterns in seconds.' },
            { n: '04', icon: '📤', title: 'Export & Share', desc: 'Download your filtered transactions as a CSV anytime. Your data, your format.' },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="lp-step">
                <div className="lp-step-num">{s.n}</div>
                <div className="lp-step-icon">{s.icon}</div>
                <h3 className="lp-step-title">{s.title}</h3>
                <p className="lp-step-desc">{s.desc}</p>
                {i < 3 && <div className="lp-step-arrow" aria-hidden="true" />}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════ TESTIMONIALS ════════════════════ */}
      <section id="testimonials" className="lp-section lp-testi-section">
        <Reveal>
          <div className="lp-section-badge">💬 What users say</div>
          <h2 className="lp-section-title">Real people,<br />real results.</h2>
        </Reveal>

        <div className="lp-testi-grid">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="lp-testi-card">
                <div className="lp-testi-stars" aria-label="5 stars">★★★★★</div>
                <p className="lp-testi-text">"{t.text}"</p>
                <div className="lp-testi-author">
                  <span className="lp-testi-avatar" style={{ background: t.color }}>{t.avatar}</span>
                  <div>
                    <div className="lp-testi-name">{t.name}</div>
                    <div className="lp-testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════ PRICING ════════════════════ */}
      <section id="pricing" className="lp-section lp-pricing-section">
        <Reveal>
          <div className="lp-section-badge">💳 Pricing</div>
          <h2 className="lp-section-title">Simple, honest pricing.</h2>
          <p className="lp-section-sub">Start free. Upgrade when you're ready. Cancel anytime.</p>
        </Reveal>

        <div className="lp-plans-grid">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className={`lp-plan-card ${p.primary ? 'lp-plan-featured' : ''}`}>
                {p.badge && <div className="lp-plan-badge">{p.badge}</div>}
                <div className="lp-plan-name">{p.name}</div>
                <div className="lp-plan-price">
                  <span className="lp-plan-amount">{p.price}</span>
                  <span className="lp-plan-period"> / {p.period}</span>
                </div>
                <p className="lp-plan-desc">{p.desc}</p>
                <ul className="lp-plan-features" role="list">
                  {p.features.map(f => (
                    <li key={f} role="listitem">
                      <span className="lp-plan-check" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  id={`pricing-${p.name.toLowerCase()}-btn`}
                  className={`lp-btn ${p.primary ? 'lp-btn-primary' : 'lp-btn-ghost'} lp-plan-cta`}
                  onClick={onEnter}
                >
                  {p.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════ CTA BANNER ════════════════════ */}
      <section className="lp-cta-section">
        <Reveal>
          <div className="lp-cta-card">
            <div className="lp-cta-icon" aria-hidden="true">⚡</div>
            <h2 className="lp-cta-title">
              Take control of your finances.<br />
              <span className="lp-gradient-text">Start today — it's free.</span>
            </h2>
            <p className="lp-cta-sub">
              No account needed. No data leaves your device. Just open the app and start tracking.
            </p>
            <button id="cta-open-app-btn" className="lp-btn lp-btn-primary lp-btn-xl" onClick={onEnter}>
              Open FinTrack Dashboard
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </Reveal>
      </section>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer className="lp-footer" role="contentinfo">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/FinTrack.png" alt="FinTrack" className="lp-nav-logo-ico" style={{ width: 64, height: 64, background: 'transparent' }} />
              <span>FinTrack</span>
            </div>
            <p className="lp-footer-tagline">Your finances, your privacy.</p>
          </div>
          <div className="lp-footer-links-group">
            <div className="lp-footer-col">
              <div className="lp-footer-col-title">Product</div>
              <button className="lp-footer-link" onClick={() => scrollTo('features')}>Features</button>
              <button className="lp-footer-link" onClick={() => scrollTo('pricing')}>Pricing</button>
              <button className="lp-footer-link" onClick={() => scrollTo('how')}>How it works</button>
            </div>
            <div className="lp-footer-col">
              <div className="lp-footer-col-title">Company</div>
              <button className="lp-footer-link" onClick={() => { }}>About</button>
              <button className="lp-footer-link" onClick={() => { }}>Blog</button>
              <button className="lp-footer-link" onClick={() => { }}>Contact</button>
            </div>
            <div className="lp-footer-col">
              <div className="lp-footer-col-title">Legal</div>
              <button className="lp-footer-link" onClick={() => { }}>Privacy</button>
              <button className="lp-footer-link" onClick={() => { }}>Terms</button>
            </div>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <p>© 2025 FinTrack. Built with React + Vite. All data stays on your device.</p>
        </div>
      </footer>
    </div>
  );
}
