'use client';

import { useEffect, useRef, useState } from 'react';

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
};

type Headline = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
};

const clockZones = [
  { city: 'London', label: 'Financial and policy pulse', timeZone: 'Europe/London' },
  { city: 'Rome', label: 'Operational home base', timeZone: 'Europe/Rome' },
  { city: 'New York', label: 'Capital and infrastructure markets', timeZone: 'America/New_York' },
  { city: 'Singapore', label: 'Global systems and deployment horizon', timeZone: 'Asia/Singapore' },
];

const strengths = [
  {
    title: 'AI-Orchestrated Engineering',
    body:
      'I design systems where intelligent agents, data pipelines, and software interfaces work together as one operating layer instead of as disconnected tools.',
  },
  {
    title: 'Energy and Grid Intelligence',
    body:
      'My work gravitates toward energy systems, DER coordination, grid visibility, and the infrastructure required to translate complexity into decisions.',
  },
  {
    title: 'Platform and Interface Design',
    body:
      'I care deeply about the interface between technical depth and human understanding, which means building software that is rigorous, legible, and strategically persuasive.',
  },
  {
    title: 'Research-Led Execution',
    body:
      'I work at the intersection of implementation and inquiry, where technical experimentation becomes a structured thesis about what the future of infrastructure should look like.',
  },
];

const architectureLayers = [
  {
    title: 'Interface Layer',
    project: 'NeuralBridge',
    description:
      'A conversational orchestration environment that turns commands, workflows, and model coordination into a usable systems layer.',
  },
  {
    title: 'Grid Operating Layer',
    project: 'GridOS',
    description:
      'A digital command surface for monitoring, interpreting, and coordinating smart-grid intelligence in a way that feels operational rather than abstract.',
  },
  {
    title: 'Asset and DER Coordination',
    project: 'DERIM and adjacent grid work',
    description:
      'Projects that connect distributed energy resources, analytics, and operational logic into systems that can support real decision-making.',
  },
  {
    title: 'Embodied / Autonomous Layer',
    project: 'Robotics and sensing work',
    description:
      'Experiments in LiDAR, perception, and robotics that demonstrate how intelligence can move from dashboards into physical environments.',
  },
];

const flagshipInitiatives = [
  {
    title: 'NeuralBridge',
    href: 'https://github.com/iceccarelli/neuralbridge',
    summary:
      'Positioned as a middleware and orchestration layer for human-to-model interaction, system tooling, and intelligent workflows.',
  },
  {
    title: 'GridOS',
    href: 'https://github.com/iceccarelli/GridOS',
    summary:
      'A control-oriented smart-grid experience designed to make infrastructure intelligence observable, navigable, and operationally meaningful.',
  },
  {
    title: 'DERIM',
    href: 'https://github.com/iceccarelli/derim-middleware',
    summary:
      'A distributed energy orientation that reflects an interest in coordinating assets, signals, and grid-aware software for real-world utility.',
  },
  {
    title: 'Robot LiDAR Fusion',
    href: 'https://github.com/iceccarelli/robot-lidar-fusion',
    summary:
      'Robotics and perception work that extends my engineering profile beyond software interfaces and into the intelligence of physical systems.',
  },
];

const trustedSources = [
  {
    title: 'MIT Technology Review',
    href: 'https://www.technologyreview.com/',
    focus: 'Signals at the frontier of AI, computing, and industrial transformation.',
  },
  {
    title: 'MIT Energy Initiative',
    href: 'https://energy.mit.edu/',
    focus: 'Research-grounded perspective on energy systems, transition pathways, and infrastructure strategy.',
  },
  {
    title: 'International Energy Agency',
    href: 'https://www.iea.org/',
    focus: 'Global context for markets, electricity systems, energy security, and policy direction.',
  },
  {
    title: 'NREL',
    href: 'https://www.nrel.gov/',
    focus: 'Applied research across grid integration, renewables, and system deployment.',
  },
  {
    title: 'BloombergNEF',
    href: 'https://about.bnef.com/',
    focus: 'Market intelligence around energy transition, clean technology, and investment direction.',
  },
  {
    title: 'AWS for Energy',
    href: 'https://aws.amazon.com/energy/',
    focus: 'A strong benchmark for cloud-native infrastructure communication and enterprise-grade technical positioning.',
  },
];

const marketThemes = [
  {
    title: 'Compute and Model Infrastructure',
    body:
      'A live watch on AI infrastructure names helps position my work within the economics of compute, deployment, and intelligent systems.',
  },
  {
    title: 'Energy Transition and Grid Flexibility',
    body:
      'Monitoring energy and electrification signals reinforces the operational context behind my grid and DER interests.',
  },
  {
    title: 'Industrial and Systems Execution',
    body:
      'I pay attention to the companies and institutions translating technological possibility into deployment, scale, and reliability.',
  },
];

const phdApplications = [
  {
    title: 'TIME Application Job-ID: V000010767',
    href: 'https://www.jobs.rwth-aachen.de/index.php?ac=jobad&id=11302',
    area: 'Technology and Innovation Management (RWTH Aachen University)',
    description:
      'Application pathway connected to technology and innovation management within the broader SAFEr Grid context.',
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
    description:
      'Application pathway aligned with automation, power systems, and interdisciplinary grid research.',
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
    title: 'MIT Technology Review coverage on how AI infrastructure is reshaping industrial strategy',
    link: 'https://www.technologyreview.com/',
    pubDate: 'Live source',
    source: 'MIT Technology Review',
    category: 'AI & Systems',
  },
  {
    title: 'MIT Energy research and energy-transition reporting relevant to grid modernization',
    link: 'https://news.mit.edu/topic/energy',
    pubDate: 'Live source',
    source: 'MIT News',
    category: 'Energy Systems',
  },
  {
    title: 'International Energy Agency market and policy analysis for electricity and energy security',
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
    description: 'AI-native middleware and orchestration for human-to-model workflows.',
    html_url: 'https://github.com/iceccarelli/neuralbridge',
    updated_at: new Date().toISOString(),
    language: 'Python',
    stargazers_count: 0,
  },
  {
    id: 2,
    name: 'GridOS',
    description: 'An operating concept for digital grid intelligence and smart-infrastructure control.',
    html_url: 'https://github.com/iceccarelli/GridOS',
    updated_at: new Date().toISOString(),
    language: 'TypeScript',
    stargazers_count: 0,
  },
];

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

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export default function Home() {
  const [clocks, setClocks] = useState<ClockEntry[]>(
    clockZones.map((zone) => ({ ...zone, time: formatTime(zone.timeZone) })),
  );
  const [repoCards, setRepoCards] = useState<RepoCard[]>(fallbackRepos);
  const [headlines, setHeadlines] = useState<Headline[]>(fallbackHeadlines);
  const [lastSync, setLastSync] = useState('Refreshing live signals...');
  const tickerTapeRef = useRef<HTMLDivElement | null>(null);
  const marketOverviewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setClocks(clockZones.map((zone) => ({ ...zone, time: formatTime(zone.timeZone) })));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadWidget = (
      ref: HTMLDivElement | null,
      scriptSource: string,
      config: Record<string, unknown>,
    ) => {
      if (!ref) {
        return;
      }

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
          {
            title: 'AI & Cloud',
            symbols: [
              { s: 'NASDAQ:NVDA', d: 'NVIDIA' },
              { s: 'NASDAQ:MSFT', d: 'Microsoft' },
              { s: 'NASDAQ:AMZN', d: 'Amazon' },
              { s: 'NASDAQ:GOOGL', d: 'Alphabet' },
            ],
          },
          {
            title: 'Energy & Grid',
            symbols: [
              { s: 'NYSE:NEE', d: 'NextEra Energy' },
              { s: 'NASDAQ:ENPH', d: 'Enphase' },
              { s: 'NASDAQ:TSLA', d: 'Tesla Energy' },
              { s: 'NYSE:GEV', d: 'GE Vernova' },
            ],
          },
          {
            title: 'Industrial Systems',
            symbols: [
              { s: 'NYSE:ETN', d: 'Eaton' },
              { s: 'NYSE:PH', d: 'Parker Hannifin' },
              { s: 'NASDAQ:HON', d: 'Honeywell' },
              { s: 'NYSE:EMR', d: 'Emerson' },
            ],
          },
        ],
      },
    );
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchSignals = async () => {
      try {
        const githubPromise = fetch('https://api.github.com/users/iceccarelli/repos?sort=updated&per_page=100', {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        }).then((response) => response.json());

        const feedSources = [
          {
            source: 'MIT Technology Review',
            category: 'AI & Systems',
            url: 'https://www.technologyreview.com/feed/',
          },
          {
            source: 'MIT News',
            category: 'Energy Systems',
            url: 'https://news.mit.edu/rss/topic/energy',
          },
        ];

        const newsPromise = Promise.all(
          feedSources.map(async (feed) => {
            const response = await fetch(
              `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`,
            );
            const data = await response.json();

            if (data.status !== 'ok' || !Array.isArray(data.items)) {
              return [] as Headline[];
            }

            return data.items.slice(0, 4).map((item: { title?: string; link?: string; pubDate?: string }) => ({
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
          const repoPatterns = [
            {
              matcher: /neuralbridge/i,
              fallbackName: 'NeuralBridge',
              description:
                'AI-native middleware and orchestration for human-to-model workflows and operational interfaces.',
            },
            {
              matcher: /gridos/i,
              fallbackName: 'GridOS',
              description:
                'A control-oriented experience for smart-grid intelligence, visibility, and digital operations.',
            },
            {
              matcher: /der/i,
              fallbackName: 'DERIM',
              description:
                'Distributed energy systems thinking focused on coordination, intelligence, and infrastructure utility.',
            },
            {
              matcher: /robot|lidar|fusion|slam|vision/i,
              fallbackName: 'Robotics and Sensing',
              description:
                'Autonomy, sensing, and robotics work bridging software intelligence with physical environments.',
            },
          ];

          const matched = repoPatterns
            .map((pattern, index) => {
              const found = githubData.find((repo: { name?: string }) =>
                pattern.matcher.test(repo.name ?? ''),
              );

              if (!found) {
                return null;
              }

              return {
                id: found.id ?? index + 1,
                name: found.name ?? pattern.fallbackName,
                description: found.description || pattern.description,
                html_url: found.html_url ?? 'https://github.com/iceccarelli',
                updated_at: found.updated_at ?? new Date().toISOString(),
                language: found.language ?? 'Multi-language',
                stargazers_count: found.stargazers_count ?? 0,
              } satisfies RepoCard;
            })
            .filter(Boolean) as RepoCard[];

          const remainder = githubData
            .filter(
              (repo: { id: number }) => !matched.some((selected) => selected.id === repo.id),
            )
            .slice(0, 2)
            .map(
              (repo: {
                id: number;
                name: string;
                description: string | null;
                html_url: string;
                updated_at: string;
                language: string | null;
                stargazers_count: number;
              }) => ({
                id: repo.id,
                name: repo.name,
                description:
                  repo.description ??
                  'A recent project update that extends the engineering narrative across software, systems, and infrastructure.',
                html_url: repo.html_url,
                updated_at: repo.updated_at,
                language: repo.language ?? 'Multi-language',
                stargazers_count: repo.stargazers_count ?? 0,
              }),
            );

          if (matched.length > 0) {
            setRepoCards([...matched, ...remainder].slice(0, 6));
          }
        }

        const flattenedNews = newsData
          .flat()
          .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
          .slice(0, 6);

        if (!cancelled && flattenedNews.length > 0) {
          setHeadlines(flattenedNews);
        }

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
          setLastSync('Live sources temporarily unavailable — curated signals still visible.');
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
      <section className="section-shell hero-section" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="section-kicker">AI systems • energy intelligence • digital infrastructure</span>
            <h1>
              I build engineering experiences that make <span className="gradient-text">complex systems feel
              operational, legible, and alive</span>.
            </h1>
            <p className="hero-lead">
              My work sits at the convergence of intelligent software, energy systems, digital operations, and
              interface design. I focus on translating technical complexity into systems that are understandable,
              actionable, and operationally useful for people working close to infrastructure, research, and deployment.
            </p>
            <p>
              This portfolio brings together live market context, flagship repositories, research documents, and
              implementation signals so that visitors can understand both the technical depth of the work and the
              direction in which it is evolving. The intention is not only to present projects, but to show a coherent
              engineering trajectory grounded in execution.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#live-intelligence">
                Enter the live intelligence hub
              </a>
              <a className="secondary-button" href="#flagship-systems">
                Explore flagship systems
              </a>
              <a className="secondary-button" href="https://github.com/iceccarelli" target="_blank" rel="noreferrer">
                Review GitHub proof of work
              </a>
            </div>
          </div>

          <aside className="glass-panel spotlight-border hero-panel">
            <div className="hero-portrait-shell">
              <img
                src="https://raw.githubusercontent.com/iceccarelli/vincenzo-grimaldi-portfolio/main/Vincenzo_Grimaldi_footer_picture_website.jpg"
                alt="Vincenzo Ceccarelli Grimaldi"
                className="hero-portrait"
              />
            </div>
            <div className="panel-topline">
              <span className="live-dot" />
              <span>In Brief</span>
            </div>
            <h2>Engineering and Personal Branding around systems that are cyber-physical in nature that which connects intelligence, infrastructure, and execution.</h2>
            <div className="metric-pills">
              <span className="metric-pill">AI-native middleware</span>
              <span className="metric-pill">Grid and DER intelligence</span>
              <span className="metric-pill">Robotics and sensing</span>
              <span className="metric-pill">Research-led systems design</span>
            </div>
            <div className="mini-note-grid">
              <div className="mini-note">
                <strong>To my Portfolio</strong>
                <p>Keeping up with the state-of-the-art technology which entagles work that is technically rigorous, strategically focused, and continuously moving from concept toward deployable and value creation systems.</p>
              </div>
              <div className="mini-note">
                <strong>How the following is structured</strong>
                <p>It connects live intelligence, selected repositories, trusted external context, and supporting documents.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell">
        <div className="glass-panel cta-panel spotlight-border">
            <span className="section-kicker">Global orientation</span>
            <h2 className="compact-heading">Working across markets, research horizons, and operational contexts.</h2>
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

      <section className="section-shell content-section" id="about">
        <div className="glass-panel cta-panel spotlight-border">
          <span className="section-kicker">About the work</span>
          <h2>A portfolio engineered to translate technical depth into trust, clarity, and strategic curiosity.</h2>
        </div>
        <div className="two-column-layout">
          <div className="glass-panel immersive-card">
            <p>
              The value I aim to create comes from integration. I am not interested in treating AI, software,
              infrastructure, energy, interfaces, robotics, and research as separate domains. I am interested in the
              moments where they become one system, because that is where the most meaningful cyber-physical engineering leverage often
              appears.
            </p>
            <p>
              On GitHub, this shows up through projects that move from orchestration layers to digital operating systems,
              from grid and DER thinking to sensing and autonomy. On this website, it should feel equally coherent. Every
              section is therefore designed to help readers move naturally from high-level impression to technical
              substance, then from substance to live relevance, and finally from relevance to action.
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

      <section className="section-shell content-section" id="architecture">
        <div className="glass-panel cta-panel spotlight-border">
          <span className="section-kicker">Architecture of value creation</span>
          <h2>The projects are strongest when understood as layers of one larger systems thesis.</h2>
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

      <section className="section-shell content-section" id="flagship-systems">
        <div className="glass-panel cta-panel spotlight-border">
          <span className="section-kicker">Flagship systems</span>
          <h2>Selected initiatives that communicate the direction, seriousness, and range of the engineering work.</h2>
        </div>
        <div className="card-grid two-up">
          {flagshipInitiatives.map((initiative) => (
            <article className="glass-panel immersive-card" key={initiative.title}>
              <div className="card-topline">
                <span className="live-dot muted" />
                <span>Flagship initiative</span>
              </div>
              <h3>{initiative.title}</h3>
              <p>{initiative.summary}</p>
              <a className="text-link" href={initiative.href} target="_blank" rel="noreferrer">
                Open related work
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell content-section" id="live-intelligence">
        <div className="glass-panel cta-panel spotlight-border">
          <span className="section-kicker">Live intelligence hub</span>
          <h2>A more Bloomberg-like surface for understanding what I build, what I watch, and where the momentum is moving.</h2>
          <p className="section-intro">{lastSync}</p>
        </div>

        <div className="tradingview-widget-shell glass-panel">
          <div ref={tickerTapeRef} className="tradingview-widget-container" />
        </div>

        <div className="insight-grid">
          <article className="glass-panel data-column">
            <div className="panel-topline">
              <span className="live-dot" />
              <span>Reputable niche headlines</span>
            </div>
            <h3>AI, systems, and energy signals worth watching</h3>
            <div className="data-list">
              {headlines.map((headline) => (
                <a className="data-list-item" href={headline.link} key={`${headline.source}-${headline.title}`} target="_blank" rel="noreferrer">
                  <span className="item-meta">{headline.category} • {headline.source}</span>
                  <strong>{headline.title}</strong>
                  <small>{formatDate(headline.pubDate)}</small>
                </a>
              ))}
            </div>
          </article>

          <article className="glass-panel data-column">
            <div className="panel-topline">
              <span className="live-dot" />
              <span>GitHub project pulse</span>
            </div>
            <h3>Repositories that currently express the strongest value creation</h3>
            <div className="data-list">
              {repoCards.map((repo) => (
                <a className="data-list-item" href={repo.html_url} key={repo.id} target="_blank" rel="noreferrer">
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
            <span>Market context aligned with my interests</span>
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

      <section className="section-shell content-section" id="ecosystem">
        <div className="glass-panel cta-panel spotlight-border">
          <span className="section-kicker">Trusted ecosystem</span>
          <h2>Institutions, publications, and platforms that anchor the markets and technical domains I care about most.</h2>
        </div>
        <div className="card-grid three-up">
          {trustedSources.map((source) => (
            <a className="glass-panel source-card" href={source.href} key={source.title} target="_blank" rel="noreferrer">
              <span className="card-label">Trusted reference</span>
              <h3>{source.title}</h3>
              <p>{source.focus}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section-shell content-section" id="phd">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
          <span className="section-kicker">Selected academic applications</span>
          <h2>Original application links and supporting documents presented as part of the broader research narrative.</h2>
          </div>
        </div>
        <div className="card-grid two-up">
          {phdApplications.map((application) => (
            <article className="glass-panel immersive-card" key={application.title}>
              <span className="card-label">Research application</span>
              <h3>{application.title}</h3>
              <p>{application.area}</p>
              <p>{application.description}</p>
              <a className="text-link" href={application.href} target="_blank" rel="noreferrer">
                Open application listing
              </a>
              <div className="data-list" style={{ marginTop: '1rem' }}>
                {application.docs.map((doc) => (
                  <a className="data-list-item" href={doc.href} key={doc.href} target="_blank" rel="noreferrer">
                    <span className="item-meta">Supporting document</span>
                    <strong>{doc.label}</strong>
                    <small>{doc.meta}</small>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell content-section" id="connect">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Continue the conversation</span>
            <h2>If this work resonates, the next step should feel immediate and obvious.</h2>
            <p>
              Whether the interest is AI-native middleware, smart-grid operating systems, digital infrastructure,
              robotics, research collaboration, or a larger systems conversation, this website is now structured to make
              that value visible.
            </p>
          </div>
          <div className="hero-actions">
            <a className="primary-button" href="https://github.com/iceccarelli" target="_blank" rel="noreferrer">
              GitHub profile
            </a>
            <a className="secondary-button" href="#ecosystem">
              Trusted ecosystem
            </a>
            <a className="secondary-button" href="mailto:vince.ceccarelli@gmail.com">
              Email me
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
