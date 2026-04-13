'use client';

import { useEffect, useRef, useState } from 'react';

// ====================== TYPES ======================
type ClockEntry = {
  city: string;
  label: string;
  timeZone: string;
  time: string;
};

type RepoCard = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  updated_at: string;
  language: string;
  stargazers_count: number;
  topics?: string[];
};

type Headline = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
};

// ====================== CONSTANTS ======================
const clockZones = [
  { city: 'London', label: 'Policy & capital markets', timeZone: 'Europe/London' },
  { city: 'Rome', label: 'Operational home base', timeZone: 'Europe/Rome' },
  { city: 'New York', label: 'Infrastructure & energy markets', timeZone: 'America/New_York' },
  { city: 'Singapore', label: 'Global deployment horizon', timeZone: 'Asia/Singapore' },
];

const strengths = [
  {
    title: 'Deterministic Cyber-Physical Systems',
    body: 'I design control architectures where embedded logic, RTOS scheduling, and real-time signal integrity guarantee predictable, safety-critical behavior.',
  },
  {
    title: 'Grid Intelligence & DER Coordination',
    body: 'I build operational platforms that translate distributed energy resources, grid telemetry, and market signals into verifiable control loops.',
  },
  {
    title: 'AI-Native Orchestration Layers',
    body: 'I create middleware that fuses high-level AI reasoning with low-level hardware constraints, making complex systems legible to operators and engineers.',
  },
  {
    title: 'Verification & Validation (V&V)',
    body: 'Every system I deliver includes formal verification pathways, simulation harnesses, and hardware-in-the-loop testing to ensure deterministic execution.',
  },
];

const architectureLayers = [
  {
    title: 'Embedded Control Layer',
    project: 'RTOS + Signal Integrity',
    description:
      'Hard real-time kernels, interrupt handling, and deterministic scheduling that guarantee bounded latency in safety-critical environments.',
  },
  {
    title: 'Grid Operating Layer',
    project: 'GridOS',
    description:
      'Digital command surface for observability, coordination, and closed-loop control of smart grids and DER fleets.',
  },
  {
    title: 'AI Orchestration Layer',
    project: 'NeuralBridge',
    description:
      'Middleware that connects human intent, large language models, and physical actuators while preserving deterministic guarantees.',
  },
  {
    title: 'Autonomous & Sensing Layer',
    project: 'Robotics & LiDAR Fusion',
    description:
      'Perception pipelines and embodied intelligence that translate sensor data into verifiable physical actions.',
  },
];

const flagshipInitiatives = [
  {
    title: 'NeuralBridge',
    href: 'https://github.com/iceccarelli/neuralbridge',
    summary:
      'AI-native middleware for human-to-model orchestration in safety-critical cyber-physical environments.',
  },
  {
    title: 'GridOS',
    href: 'https://github.com/iceccarelli/GridOS',
    summary:
      'Control-oriented operating surface for smart-grid intelligence, DER coordination, and real-time observability.',
  },
  {
    title: 'DERIM',
    href: 'https://github.com/iceccarelli/derim-middleware',
    summary:
      'Distributed energy resource intelligence middleware focused on verifiable coordination and grid-aware execution.',
  },
  {
    title: 'Robot LiDAR Fusion',
    href: 'https://github.com/iceccarelli/robot-lidar-fusion',
    summary:
      'Real-time perception and sensor fusion stack bridging software intelligence with physical autonomy.',
  },
];

const trustedSources = [
  {
    title: 'MIT Technology Review',
    href: 'https://www.technologyreview.com/',
    focus: 'Frontier signals in AI infrastructure and industrial systems.',
  },
  {
    title: 'MIT Energy Initiative',
    href: 'https://energy.mit.edu/',
    focus: 'Research-grounded perspective on energy systems and grid modernization.',
  },
  {
    title: 'International Energy Agency',
    href: 'https://www.iea.org/',
    focus: 'Global market intelligence on electricity systems and energy security.',
  },
  {
    title: 'NREL',
    href: 'https://www.nrel.gov/',
    focus: 'Applied research in grid integration, renewables, and system deployment.',
  },
  {
    title: 'BloombergNEF',
    href: 'https://about.bnef.com/',
    focus: 'Investment and technology intelligence across energy transition.',
  },
  {
    title: 'AWS Energy',
    href: 'https://aws.amazon.com/energy/',
    focus: 'Enterprise-grade benchmark for cloud-native infrastructure and control systems.',
  },
];

const marketThemes = [
  {
    title: 'Compute & Model Infrastructure',
    body: 'Monitoring the economics of AI infrastructure to inform deterministic orchestration strategies.',
  },
  {
    title: 'Energy Transition & Grid Flexibility',
    body: 'Live signals that shape the operational context of my grid intelligence and DER work.',
  },
  {
    title: 'Industrial Systems Execution',
    body: 'Companies translating technological possibility into verifiable, large-scale deployment.',
  },
];

const phdApplications = [
  {
    title: 'TIME Application Job-ID: V000010767',
    href: 'https://www.jobs.rwth-aachen.de/index.php?ac=jobad&id=11302',
    area: 'Technology and Innovation Management (RWTH Aachen)',
    description: 'SAFeR Grid pathway – technology management for next-generation grid systems.',
    docs: [
      {
        label: 'Motivation Letter',
        meta: '2 pages • 21 March 2026',
        href: 'https://raw.githubusercontent.com/iceccarelli/vincenzo-grimaldi-portfolio/main/Vincenzo_Ceccarelli_Grimaldi_Motivation_Letter_TIM_SAFEr_Grid.pdf',
      },
      {
        label: 'Curriculum Vitae',
        meta: '4 pages • March 2026',
        href: 'https://raw.githubusercontent.com/iceccarelli/vincenzo-grimaldi-portfolio/main/Vincenzo_Ceccarelli_Grimaldi_CV_TIM_SAFEr_Grid.pdf',
      },
    ],
  },
  {
    title: 'ACS Application Job-ID: V000010837',
    href: 'https://www.jobs.rwth-aachen.de/index.php?ac=jobad&id=11383&language=2',
    area: 'Institute for Automation of Complex Power Systems (E.ON Energy Research Center)',
    description: 'Automation, power systems, and interdisciplinary grid research pathway.',
    docs: [
      {
        label: 'Motivation Letter',
        meta: '2 pages • 22 March 2026',
        href: 'https://raw.githubusercontent.com/iceccarelli/vincenzo-grimaldi-portfolio/main/Vincenzo_Ceccarelli_Grimaldi_Motivation_Letter_ACS_SAFEr_Grid.pdf',
      },
      {
        label: 'Curriculum Vitae',
        meta: '4 pages • March 2026',
        href: 'https://raw.githubusercontent.com/iceccarelli/vincenzo-grimaldi-portfolio/main/Vincenzo_Ceccarelli_Grimaldi_CV_ACS_SAFEr_Grid.pdf',
      },
    ],
  },
];

const fallbackHeadlines: Headline[] = [
  {
    title: 'MIT Technology Review — How AI infrastructure is reshaping industrial control systems',
    link: 'https://www.technologyreview.com/',
    pubDate: 'Live source',
    source: 'MIT Technology Review',
    category: 'AI & Control',
  },
  {
    title: 'MIT Energy — Grid modernization and the future of distributed energy resources',
    link: 'https://news.mit.edu/topic/energy',
    pubDate: 'Live source',
    source: 'MIT News',
    category: 'Energy Systems',
  },
  {
    title: 'IEA — Global electricity market outlook and grid flexibility requirements',
    link: 'https://www.iea.org/news',
    pubDate: 'Live source',
    source: 'IEA',
    category: 'Policy & Markets',
  },
];

const fallbackRepos: RepoCard[] = [
  {
    id: 1,
    name: 'NeuralBridge',
    description: 'AI-native middleware for deterministic human-to-model orchestration in CPS.',
    html_url: 'https://github.com/iceccarelli/neuralbridge',
    updated_at: new Date().toISOString(),
    language: 'Python',
    stargazers_count: 0,
  },
  {
    id: 2,
    name: 'GridOS',
    description: 'Control-oriented smart-grid operating surface with real-time observability.',
    html_url: 'https://github.com/iceccarelli/GridOS',
    updated_at: new Date().toISOString(),
    language: 'TypeScript',
    stargazers_count: 0,
  },
];

// ====================== UTILITIES ======================
function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone,
  }).format(new Date());
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

// ====================== SYSTEM STATUS WAVEFORM (Canvas) ======================
function SystemStatusWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 20; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 20; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Main sine wave (control signal)
      ctx.strokeStyle = '#7dd3fc';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#38bdf8';
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2 + Math.sin((x + t) * 0.018) * 28;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary wave (feedback)
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.7)';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#34d399';
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2 + Math.sin((x + t) * 0.023 + 1.8) * 18;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Data points
      ctx.fillStyle = '#f4f8ff';
      for (let i = 0; i < 8; i++) {
        const x = (canvas.width / 8) * i + (t % 80);
        const y = canvas.height / 2 + Math.sin((x + t) * 0.018) * 28;
        ctx.fillRect(x, y - 3, 6, 6);
      }

      t += 2.8;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="system-waveform"
      aria-label="Live system status waveform"
    />
  );
}

// ====================== MAIN PAGE COMPONENT ======================
export default function Home() {
  const [clocks, setClocks] = useState<ClockEntry[]>(
    clockZones.map((zone) => ({ ...zone, time: formatTime(zone.timeZone) })),
  );
  const [repoCards, setRepoCards] = useState<RepoCard[]>(fallbackRepos);
  const [headlines, setHeadlines] = useState<Headline[]>(fallbackHeadlines);
  const [lastSync, setLastSync] = useState('Refreshing live signals...');

  const tickerTapeRef = useRef<HTMLDivElement | null>(null);
  const marketOverviewRef = useRef<HTMLDivElement | null>(null);

  // Live clocks
  useEffect(() => {
    const interval = window.setInterval(() => {
      setClocks(clockZones.map((zone) => ({ ...zone, time: formatTime(zone.timeZone) })));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  // TradingView widgets
  useEffect(() => {
    const loadWidget = (
      ref: HTMLDivElement | null,
      scriptSource: string,
      config: Record<string, unknown>,
    ) => {
      if (!ref) return;
      ref.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
      const script = document.createElement('script');
      script.src = scriptSource;
      script.async = true;
      script.type = 'text/javascript';
      script.innerHTML = JSON.stringify(config);
      ref.appendChild(script);
    };

    loadWidget(tickerTapeRef.current, 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js', {
      symbols: [
        { proName: 'NASDAQ:NVDA', title: 'NVIDIA' },
        { proName: 'NASDAQ:MSFT', title: 'Microsoft' },
        { proName: 'NASDAQ:AMZN', title: 'Amazon' },
        { proName: 'NASDAQ:TSLA', title: 'Tesla' },
        { proName: 'NYSE:NEE', title: 'NextEra Energy' },
        { proName: 'NASDAQ:ENPH', title: 'Enphase' },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: 'adaptive',
      colorTheme: 'dark',
      locale: 'en',
    });

    loadWidget(
      marketOverviewRef.current,
      'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js',
      {
        colorTheme: 'dark',
        dateRange: '12M',
        showChart: true,
        locale: 'en',
        width: '100%',
        height: 480,
        largeChartUrl: 'https://github.com/iceccarelli',
        isTransparent: true,
        showSymbolLogo: true,
        tabs: [
          { title: 'AI & Cloud', symbols: [{ s: 'NASDAQ:NVDA' }, { s: 'NASDAQ:MSFT' }, { s: 'NASDAQ:AMZN' }, { s: 'NASDAQ:GOOGL' }] },
          { title: 'Energy & Grid', symbols: [{ s: 'NYSE:NEE' }, { s: 'NASDAQ:ENPH' }, { s: 'NASDAQ:TSLA' }, { s: 'NYSE:GEV' }] },
          { title: 'Industrial Systems', symbols: [{ s: 'NYSE:ETN' }, { s: 'NYSE:PH' }, { s: 'NASDAQ:HON' }, { s: 'NYSE:EMR' }] },
        ],
      },
    );
  }, []);

  // Live intelligence fetch with CPS-focused GitHub filtering
  useEffect(() => {
    let cancelled = false;

    const fetchSignals = async () => {
      try {
        const githubPromise = fetch('https://api.github.com/users/iceccarelli/repos?sort=updated&per_page=100', {
          headers: { Accept: 'application/vnd.github+json' },
        }).then((res) => res.json());

        const feedSources = [
          { source: 'MIT Technology Review', category: 'AI & Control', url: 'https://www.technologyreview.com/feed/' },
          { source: 'MIT News', category: 'Energy Systems', url: 'https://news.mit.edu/rss/topic/energy' },
        ];

        const newsPromise = Promise.all(
          feedSources.map(async (feed) => {
            const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`);
            const data = await res.json();
            if (data.status !== 'ok' || !Array.isArray(data.items)) return [];
            return data.items.slice(0, 4).map((item: any) => ({
              title: item.title ?? 'Untitled update',
              link: item.link ?? feed.url,
              pubDate: item.pubDate ?? 'Live source',
              source: feed.source,
              category: feed.category,
            }));
          }),
        );

        const [githubData, newsData] = await Promise.all([githubPromise, newsPromise]);

        if (!cancelled && Array.isArray(githubData)) {
          const cpsPatterns = [
            { matcher: /neuralbridge|neural|bridge/i, fallbackName: 'NeuralBridge', priority: 1 },
            { matcher: /gridos|grid|os/i, fallbackName: 'GridOS', priority: 1 },
            { matcher: /derim|der|energy|grid/i, fallbackName: 'DERIM', priority: 2 },
            { matcher: /robot|lidar|fusion|slam|perception|embedded|rtos/i, fallbackName: 'Robotics & Sensing', priority: 2 },
            { matcher: /control|signal|rtos|vhdl|verilog|embedded/i, fallbackName: 'Control Systems', priority: 3 },
          ];

          const matched = cpsPatterns
            .map((pattern) => {
              const found = githubData.find((repo: any) => pattern.matcher.test(repo.name ?? ''));
              if (!found) return null;
              return {
                id: found.id,
                name: found.name,
                description: found.description || `${pattern.fallbackName} – CPS engineering artifact`,
                html_url: found.html_url,
                updated_at: found.updated_at,
                language: found.language || 'Multi-language',
                stargazers_count: found.stargazers_count || 0,
              } as RepoCard;
            })
            .filter(Boolean) as RepoCard[];

          const remainder = githubData
            .filter((repo: any) => !matched.some((m) => m.id === repo.id))
            .slice(0, 2)
            .map((repo: any) => ({
              id: repo.id,
              name: repo.name,
              description: repo.description ?? 'Recent CPS-aligned development',
              html_url: repo.html_url,
              updated_at: repo.updated_at,
              language: repo.language ?? 'Multi-language',
              stargazers_count: repo.stargazers_count ?? 0,
            }));

          if (!cancelled) {
            setRepoCards([...matched, ...remainder].slice(0, 6));
          }
        }

        const flattenedNews = newsData.flat().sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()).slice(0, 6);
        if (!cancelled && flattenedNews.length > 0) setHeadlines(flattenedNews);

        if (!cancelled) {
          setLastSync(
            `Last refreshed ${new Intl.DateTimeFormat('en-GB', {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            }).format(new Date())}`,
          );
        }
      } catch {
        if (!cancelled) {
          setLastSync('Live sources temporarily unavailable — curated CPS signals still visible.');
        }
      }
    };

    fetchSignals();
    const interval = window.setInterval(fetchSignals, 1000 * 60 * 15);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <main className="portfolio-shell">
      {/* ====================== HERO SECTION ====================== */}
      <section className="section-shell hero-section" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <div>
            <span className="section-kicker">CYBER-PHYSICAL SYSTEMS • DETERMINISTIC CONTROL • GRID INTELLIGENCE</span>
            <h1>
              <span className="gradient-text">Designing deterministic cyber-physical systems that make complex control loops operational, verifiable, and alive</span> .
            </h1>
            </div>
            <p className="hero-lead">
              At the intersection of embedded logic, real-time operating systems, AI orchestration, and grid-scale infrastructure.
              My work translates high-stakes technical complexity into systems that are predictable, legible, and deployable in safety-critical environments.
            </p>
            <p>
              This portfolio is a living engineering record — connecting live market intelligence, flagship repositories, research trajectory, and implementation signals to demonstrate a coherent CPS execution path.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#live-intelligence">
                Enter the Live Intelligence Hub
              </a>
              <a className="secondary-button" href="#flagship-systems">
                Explore Flagship Systems
              </a>
              <a className="secondary-button" href="https://github.com/iceccarelli" target="_blank" rel="noreferrer">
                GitHub Proof of Work
              </a>
            </div>
          </div>

          {/* Hero Portrait + Waveform Panel */}
          <aside className="glass-panel spotlight-border hero-panel">
            <div className="hero-portrait-shell">
              <img
                src="https://raw.githubusercontent.com/iceccarelli/vincenzo-grimaldi-portfolio/main/Vincenzo_Grimaldi_footer_picture_website.jpg"
                alt="Vincenzo Grimaldi"
                className="hero-portrait"
              />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <SystemStatusWaveform />
            </div>

            <div className="panel-topline" style={{ marginTop: '1.5rem' }}>
              <span className="live-dot" />
              <span>Vincenzo Grimaldi — CPS Engineer</span>
            </div>
            <h2>
              Engineering deterministic systems that connect intelligence, infrastructure, and verifiable execution.
            </h2>
            <div className="metric-pills">
              <span className="metric-pill">Embedded Control</span>
              <span className="metric-pill">Grid Intelligence</span>
              <span className="metric-pill">AI Orchestration</span>
              <span className="metric-pill">RTOS &amp; V&amp;V</span>
            </div>
          </aside>
        </div>
      </section>

      {/* ====================== GLOBAL ORIENTATION ====================== */}
      <section className="section-shell">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Global Orientation</span>
            <h2 className="compact-heading">Working across time zones, markets, and operational horizons.</h2>
          </div>
          <div className="clock-marquee" aria-label="Global clocks">
            <div className="clock-marquee-track">
              {clocks.concat(clocks).map((clock, index) => (
                <article className="signal-chip" key={`${clock.city}-${index}`}>
                  <span className="chip-city">{clock.city}</span>
                  <strong>{clock.time}</strong>
                  <small>{clock.label}</small>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== ABOUT THE WORK ====================== */}
      <section className="section-shell content-section" id="about">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">About the Work</span>
            <h2>A portfolio engineered for technical credibility in cyber-physical systems.</h2>
          </div>
        </div>
        <div className="two-column-layout">
          <div className="glass-panel immersive-card">
            <p>
              I do not treat AI, software, infrastructure, energy, and robotics as isolated domains.
              I integrate them into deterministic cyber-physical systems where every layer — from RTOS scheduling to AI orchestration — is verifiable and safety-critical.
            </p>
            <p>
              This site is structured to move visitors from high-level systems thinking → technical substance → live operational signals → immediate action.
            </p>
          </div>
          <div className="feature-stack">
            {strengths.map((strength) => (
              <article className="glass-panel feature-card" key={strength.title}>
                <h3>{strength.title}</h3>
                <p>{strength.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== ARCHITECTURE ====================== */}
      <section className="section-shell content-section" id="architecture">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Architecture of Value Creation</span>
            <h2>The projects form layers of one coherent cyber-physical systems thesis.</h2>
          </div>
        </div>
        <div className="card-grid four-up">
          {architectureLayers.map((layer) => (
            <article className="glass-panel glow-card" key={layer.title}>
              <span className="card-label">{layer.title}</span>
              <h3>{layer.project}</h3>
              <p>{layer.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ====================== FLAGSHIP SYSTEMS ====================== */}
      <section className="section-shell content-section" id="flagship-systems">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Flagship Systems</span>
            <h2>Selected initiatives that demonstrate depth, direction, and execution quality.</h2>
          </div>
        </div>
        <div className="card-grid two-up">
          {flagshipInitiatives.map((initiative) => (
            <article className="glass-panel immersive-card" key={initiative.title}>
              <div className="card-topline">
                <span className="live-dot muted" />
                <span>Flagship Initiative</span>
              </div>
              <h3>{initiative.title}</h3>
              <p>{initiative.summary}</p>
              <a className="text-link" href={initiative.href} target="_blank" rel="noreferrer">
                View repository →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ====================== LIVE INTELLIGENCE HUB ====================== */}
      <section className="section-shell content-section" id="live-intelligence">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Live Intelligence Hub</span>
            <h2>A Bloomberg-style surface for CPS-relevant signals, market context, and execution momentum.</h2>
            <p className="section-intro">{lastSync}</p>
          </div>
        </div>

        <div className="tradingview-widget-shell glass-panel">
          <div ref={tickerTapeRef} className="tradingview-widget-container" />
        </div>

        <div className="insight-grid">
          {/* Headlines */}
          <article className="glass-panel data-column">
            <div className="panel-topline">
              <span className="live-dot" />
              <span>Reputable CPS &amp; Energy Signals</span>
            </div>
            <h3>Headlines worth watching</h3>
            <div className="data-list">
              {headlines.map((headline) => (
                <a
                  className="data-list-item"
                  href={headline.link}
                  key={`${headline.source}-${headline.title}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="item-meta">{headline.category} • {headline.source}</span>
                  <strong>{headline.title}</strong>
                  <small>{formatDate(headline.pubDate)}</small>
                </a>
              ))}
            </div>
          </article>

          {/* GitHub CPS Repos */}
          <article className="glass-panel data-column">
            <div className="panel-topline">
              <span className="live-dot" />
              <span>Active CPS &amp; Firmware Development</span>
            </div>
            <h3>Repositories expressing strongest technical value</h3>
            <div className="data-list">
              {repoCards.map((repo) => (
                <a
                  className="data-list-item"
                  href={repo.html_url}
                  key={repo.id}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="item-meta">
                    {repo.language} • Updated {formatDate(repo.updated_at)} • Stars {repo.stargazers_count}
                  </span>
                  <strong>{repo.name}</strong>
                  <small>{repo.description}</small>
                </a>
              ))}
            </div>
          </article>
        </div>

        <div className="tradingview-widget-shell glass-panel market-overview-shell">
          <div className="panel-topline">
            <span className="live-dot" />
            <span>Market Context Aligned with CPS Interests</span>
          </div>
          <div ref={marketOverviewRef} className="tradingview-widget-container market-widget" />
        </div>

        <div className="card-grid three-up market-thesis-grid">
          {marketThemes.map((theme) => (
            <article className="glass-panel glow-card" key={theme.title}>
              <h3>{theme.title}</h3>
              <p>{theme.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ====================== TRUSTED ECOSYSTEM ====================== */}
      <section className="section-shell content-section" id="ecosystem">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Trusted Ecosystem</span>
            <h2>Institutions and platforms that anchor the domains I operate in.</h2>
          </div>
        </div>
        <div className="card-grid three-up">
          {trustedSources.map((source) => (
            <a className="glass-panel source-card" href={source.href} key={source.title} target="_blank" rel="noreferrer">
              <span className="card-label">Trusted Reference</span>
              <h3>{source.title}</h3>
              <p>{source.focus}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ====================== RESEARCH TRAJECTORY ====================== */}
      <section className="section-shell content-section" id="phd">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Research Trajectory</span>
            <h2>Selected academic applications and supporting documents as part of the broader CPS narrative.</h2>
          </div>
        </div>
        <div className="card-grid two-up">
          {phdApplications.map((application) => (
            <article className="glass-panel immersive-card" key={application.title}>
              <span className="card-label">Research Application</span>
              <h3>{application.title}</h3>
              <p>{application.area}</p>
              <p>{application.description}</p>
              <a className="text-link" href={application.href} target="_blank" rel="noreferrer">
                Open application listing →
              </a>
              <div className="data-list" style={{ marginTop: '1rem' }}>
                {application.docs.map((doc) => (
                  <a className="data-list-item" href={doc.href} key={doc.href} target="_blank" rel="noreferrer">
                    <span className="item-meta">Supporting Document</span>
                    <strong>{doc.label}</strong>
                    <small>{doc.meta}</small>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ====================== CONNECT ====================== */}
      <section className="section-shell content-section" id="connect">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Continue the Conversation</span>
            <h2>If this systems-level thinking resonates, the next step should be immediate.</h2>
            <p>
              Whether you are exploring AI-native middleware, smart-grid operating systems, embedded control platforms,
              robotics, or large-scale research collaboration — this portfolio is structured to make technical value visible.
            </p>
          </div>
          <div className="hero-actions">
            <a className="primary-button" href="https://github.com/iceccarelli" target="_blank" rel="noreferrer">
              GitHub Profile
            </a>
            <a className="secondary-button" href="#ecosystem">
              Trusted Ecosystem
            </a>
            <a className="secondary-button" href="mailto:vincenzo@grimaldi.engineering">
              Email — vincenzo@grimaldi.engineering
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
