'use client';

import { useEffect, useRef, useState } from 'react';
import Payments from './components/Payments';
import Image from 'next/image';

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
  { city: 'Lima', label: 'Policy & capital markets', timeZone: 'America/Lima' },
  { city: 'Toronto', label: 'Operational home base', timeZone: 'America/Toronto' },
  { city: 'New York', label: 'Infrastructure & energy markets', timeZone: 'America/New_York' },
  { city: 'Frankfurt', label: 'Infrastructure & energy markets', timeZone: 'Europe/Berlin' },
  { city: 'Beijing', label: 'Global deployment horizon', timeZone: 'Asia/Shanghai' },
];

const strengths = [
  {
    title: 'Deterministic Physics-Informed AI Systems',
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

// UPDATED: physics-informed is now #1 with special live demo treatment
const flagshipInitiatives = [
  {
    title: 'physics-informed',
    href: 'https://github.com/iceccarelli/physics-informed',
    liveUrl: 'https://physics-informed.vercel.app/',
    summary: 'Production-grade interactive simulator for cross-domain CIM + ThreMA ontology, physics-informed neural networks, RL security agents, and IEEE 9-Bus cyber-physical validation (Grimaldi 2025 RWTH Aachen Master Thesis)',
    isLive: true,
  },
  {
    title: 'NeuralBridge',
    href: 'https://github.com/iceccarelli/neuralbridge',
    summary:
      'AI-native middleware for human-to-model orchestration in safety-critical physics-informed environments.',
    published: false,
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
    published: false,
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

// ====================== ORIGINAL 7 VISUALIZERS (PRESERVED) ======================
function GridLoadFrequencySimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(52, 211, 153, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 25; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 20; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.strokeStyle = '#7dd3fc';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#38bdf8';
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2 +
                  Math.sin((x + time) * 0.015) * 20 +
                  Math.sin((x + time) * 0.045) * 5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = 'rgba(52, 211, 153, 0.8)';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#34d399';
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2 +
                  Math.sin((x + time) * 0.015 + 2.5) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#f0fdf4';
      ctx.shadowBlur = 0;
      for (let i = 0; i < 10; i++) {
        const x = (canvas.width / 10) * i + (time % 50);
        const y = canvas.height / 2 + Math.sin((x + time) * 0.015) * 20;
        ctx.fillRect(x - 2, y - 2, 4, 4);
      }

      time += 2.5;
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
      aria-label="Grid load and frequency regulation simulation"
    />
  );
}

function NeuralBridgeActivityMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const nodes = [
      { x: 0.2, y: 0.3 }, { x: 0.5, y: 0.6 }, { x: 0.8, y: 0.4 },
      { x: 0.35, y: 0.7 }, { x: 0.65, y: 0.25 }, { x: 0.15, y: 0.55 },
      { x: 0.85, y: 0.65 }
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], [1, 4], [4, 5], [5, 6], [6, 0], [2, 6]
    ];

    const particles = edges.map(([startIdx, endIdx]) => ({
      startIdx,
      endIdx,
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.01,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(125, 211, 252, 0.1)';
      ctx.lineWidth = 0.5;
      for (let x = 20; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 20; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const nodePositions = nodes.map(n => ({
        x: n.x * canvas.width,
        y: n.y * (canvas.height - 20) + 10,
      }));

      ctx.shadowBlur = 8;
      ctx.shadowColor = '#38bdf8';
      edges.forEach(([startIdx, endIdx]) => {
        const start = nodePositions[startIdx];
        const end = nodePositions[endIdx];
        const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
        gradient.addColorStop(0, 'rgba(125, 211, 252, 0.6)');
        gradient.addColorStop(1, 'rgba(52, 211, 153, 0.6)');

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      ctx.shadowBlur = 12;
      ctx.shadowColor = '#7dd3fc';
      nodePositions.forEach(pos => {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#f8fafc';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.shadowBlur = 0;
      particles.forEach(p => {
        const start = nodePositions[p.startIdx];
        const end = nodePositions[p.endIdx];
        const currentX = start.x + (end.x - start.x) * p.progress;
        const currentY = start.y + (end.y - start.y) * p.progress;

        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.fill();

        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
      });

      time += 1;
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
      aria-label="NeuralBridge agent communication flow"
    />
  );
}

function DERMCoordinationField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const assets = Array.from({ length: 25 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: 0,
      vy: 0,
    }));

    const anchors = [
      { x: 0.25, y: 0.5 },
      { x: 0.75, y: 0.5 },
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const updateAssets = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      assets.forEach(asset => {
        let fx = 0, fy = 0;
        let nearestAnchor = anchors[0];
        let minDist = Math.hypot(asset.x - nearestAnchor.x, asset.y - nearestAnchor.y);
        if (Math.hypot(asset.x - anchors[1].x, asset.y - anchors[1].y) < minDist) {
          nearestAnchor = anchors[1];
        }
        fx += (nearestAnchor.x - asset.x) * 0.005;
        fy += (nearestAnchor.y - asset.y) * 0.005;

        assets.forEach(other => {
          if (other === asset) return;
          const dx = asset.x - other.x;
          const dy = asset.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 0.1 && dist > 0) {
            fx += (dx / dist) * 0.01;
            fy += (dy / dist) * 0.01;
          }
        });

        if (asset.x < 0.05) fx += 0.01;
        if (asset.x > 0.95) fx -= 0.01;
        if (asset.y < 0.05) fy += 0.01;
        if (asset.y > 0.95) fy -= 0.01;

        asset.vx = (asset.vx + fx) * 0.9;
        asset.vy = (asset.vy + fy) * 0.9;
        asset.x += asset.vx * 0.8;
        asset.y += asset.vy * 0.8;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(52, 211, 153, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 25; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 20; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.shadowBlur = 15;
      ctx.shadowColor = '#34d399';
      anchors.forEach(anchor => {
        const pulse = 1 + Math.sin(time * 0.1) * 0.1;
        ctx.beginPath();
        ctx.arc(anchor.x * canvas.width, anchor.y * canvas.height, 8 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 211, 153, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.shadowBlur = 8;
      ctx.shadowColor = '#7dd3fc';
      ctx.lineWidth = 0.5;
      assets.forEach(asset => {
        let nearestAnchor = anchors[0];
        let minDist = Math.hypot(asset.x - nearestAnchor.x, asset.y - nearestAnchor.y);
        if (Math.hypot(asset.x - anchors[1].x, asset.y - anchors[1].y) < minDist) {
          nearestAnchor = anchors[1];
        }
        if (minDist < 0.3) {
          ctx.beginPath();
          ctx.moveTo(asset.x * canvas.width, asset.y * canvas.height);
          ctx.lineTo(nearestAnchor.x * canvas.width, nearestAnchor.y * canvas.height);
          ctx.strokeStyle = 'rgba(125, 211, 252, 0.4)';
          ctx.stroke();
        }
      });

      ctx.shadowBlur = 0;
      assets.forEach(asset => {
        ctx.beginPath();
        ctx.arc(asset.x * canvas.width, asset.y * canvas.height, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#f8fafc';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      updateAssets();
      time += 1;
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
      aria-label="DER coordination field for distributed energy resources"
    />
  );
}

function LidarPointCloudVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let angle = 0;

    const numPoints = 180;
    const points = Array.from({ length: numPoints }, (_, i) => {
      const a = (i / numPoints) * Math.PI * 2;
      return {
        angle: a,
        distance: 30 + Math.random() * 28,
        height: Math.sin(a * 3) * 15 + 50,
      };
    });

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(52, 211, 153, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 12; i++) {
        const rad = (i / 12) * (canvas.width * 0.4);
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, rad, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(
          canvas.width / 2 + Math.cos(a) * canvas.width * 0.45,
          canvas.height / 2 + Math.sin(a) * canvas.height * 0.45
        );
        ctx.stroke();
      }

      ctx.fillStyle = '#7dd3fc';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#38bdf8';
      points.forEach(p => {
        const currentAngle = p.angle + angle * 0.018;
        const dist = p.distance + Math.sin(angle * 0.3) * 4;
        const x = canvas.width / 2 + Math.cos(currentAngle) * dist;
        const y = canvas.height / 2 + Math.sin(currentAngle) * dist * 0.5;

        const size = 2 + (p.height / 100) * 4;
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      });

      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.lineTo(
        canvas.width / 2 + Math.cos(angle) * canvas.width * 0.45,
        canvas.height / 2 + Math.sin(angle) * canvas.height * 0.45
      );
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 0;
      ctx.stroke();

      angle += 0.032;
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
      aria-label="Simulated LiDAR point cloud scan"
    />
  );
}

function ControlSystemStepResponse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const setpoint = 0.72;
    let response = 0.1;
    let derivative = 0;
    const history: number[] = Array(240).fill(0.1);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const updateResponse = () => {
      const error = setpoint - response;
      response += error * 0.048;
      derivative = error * 0.12;

      history.shift();
      history.push(response);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(125, 211, 252, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 25; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 20; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(0, canvas.height - setpoint * canvas.height);
      ctx.lineTo(canvas.width, canvas.height - setpoint * canvas.height);
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      for (let i = 0; i < history.length; i++) {
        const x = (i / (history.length - 1)) * canvas.width;
        const y = canvas.height - history[i] * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#7dd3fc';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#38bdf8';
      ctx.stroke();

      ctx.beginPath();
      for (let i = 0; i < history.length; i++) {
        const x = (i / (history.length - 1)) * canvas.width;
        const derivValue = (history[i] - (history[i - 1] || history[0])) * 180;
        const y = canvas.height / 2 + derivValue * 18;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.8)';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#34d399';
      ctx.stroke();

      updateResponse();
      time += 1;
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
      aria-label="Control system step response visualization"
    />
  );
}

// ====================== NEW VISUALIZERS (PRESERVED) ======================
function PINNSolverCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;
    let residual = 1.0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(125, 211, 252, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 25; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 20; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.strokeStyle = '#7dd3fc';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#38bdf8';
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2 + Math.sin((x + time) * 0.018) * 25 * (1 - residual);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      residual = Math.max(0.02, residual * 0.985);
      ctx.fillStyle = 'rgba(52, 211, 153, 0.9)';
      ctx.fillRect(20, canvas.height - 25, (canvas.width - 40) * (1 - residual), 8);

      ctx.fillStyle = '#f0fdf4';
      ctx.font = '500 10px monospace';
      ctx.fillText(`Physics residual: ${(residual * 100).toFixed(1)}%`, 30, canvas.height - 35);

      time += 2;
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
      aria-label="Physics-Informed Neural Network solver – guaranteeing physically consistent predictions"
    />
  );
}

function AgenticMARLField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const agents = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: 0,
      vy: 0,
      color: Math.random() > 0.5 ? '#7dd3fc' : '#34d399',
    }));

    const anchors = [
      { x: 0.25, y: 0.5 },
      { x: 0.75, y: 0.5 },
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const updateAgents = () => {
      agents.forEach((agent) => {
        let fx = 0, fy = 0;
        let nearest = anchors[0];
        let minDist = Math.hypot(agent.x - nearest.x, agent.y - nearest.y);
        if (Math.hypot(agent.x - anchors[1].x, agent.y - anchors[1].y) < minDist) nearest = anchors[1];
        fx += (nearest.x - agent.x) * 0.008;
        fy += (nearest.y - agent.y) * 0.008;

        agents.forEach((other) => {
          if (other === agent) return;
          const dx = agent.x - other.x;
          const dy = agent.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 0.12 && dist > 0) {
            fx += (dx / dist) * 0.018;
            fy += (dy / dist) * 0.018;
          }
        });

        if (agent.x < 0.05) fx += 0.012;
        if (agent.x > 0.95) fx -= 0.012;
        if (agent.y < 0.05) fy += 0.012;
        if (agent.y > 0.95) fy -= 0.012;

        agent.vx = (agent.vx + fx) * 0.88;
        agent.vy = (agent.vy + fy) * 0.88;
        agent.x += agent.vx * 0.75;
        agent.y += agent.vy * 0.75;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(52, 211, 153, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 25; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 20; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.shadowBlur = 18;
      ctx.shadowColor = '#34d399';
      anchors.forEach((anchor) => {
        const pulse = 1 + Math.sin(time * 0.12) * 0.12;
        ctx.beginPath();
        ctx.arc(anchor.x * canvas.width, anchor.y * canvas.height, 9 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 211, 153, 0.25)';
        ctx.fill();
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });

      ctx.shadowBlur = 6;
      ctx.shadowColor = '#7dd3fc';
      ctx.lineWidth = 1;
      agents.forEach((agent) => {
        let nearest = anchors[0];
        let minDist = Math.hypot(agent.x - nearest.x, agent.y - nearest.y);
        if (Math.hypot(agent.x - anchors[1].x, agent.y - anchors[1].y) < minDist) nearest = anchors[1];
        if (minDist < 0.35) {
          ctx.beginPath();
          ctx.moveTo(agent.x * canvas.width, agent.y * canvas.height);
          ctx.lineTo(nearest.x * canvas.width, nearest.y * canvas.height);
          ctx.strokeStyle = 'rgba(125, 211, 252, 0.45)';
          ctx.stroke();
        }
      });

      ctx.shadowBlur = 0;
      agents.forEach((agent) => {
        ctx.beginPath();
        ctx.arc(agent.x * canvas.width, agent.y * canvas.height, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#f8fafc';
        ctx.fill();
        ctx.strokeStyle = agent.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.fillStyle = '#7dd3fc';
      ctx.font = '600 11px monospace';
      ctx.fillText('MARL + Physics Rewards', canvas.width - 148, 22);

      updateAgents();
      time += 1;
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
      aria-label="Agentic MARL coordination field – multi-agent reinforcement learning with physics-informed rewards"
    />
  );
}

// ====================== ROTATOR WRAPPER ======================
const visualizers = [
  GridLoadFrequencySimulator,
  NeuralBridgeActivityMap,
  AgenticMARLField,
  PINNSolverCanvas,
  DERMCoordinationField,
  LidarPointCloudVisualizer,
  ControlSystemStepResponse,
];

function SystemInsightVisualizerRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const CurrentVisualizer = visualizers[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visualizers.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return <CurrentVisualizer />;
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

  // Live intelligence fetch
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
      {/* HERO SECTION */}
      <section className="section-shell hero-section" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <div>
              <span className="section-kicker">PHYSICS-INFORMED SYSTEMS • DETERMINISTIC CONTROL • GRID INTELLIGENCE</span>
              <h1>
                <span className="gradient-text">Designing deterministic, physics-informed intelligence that transforms complex control systems into operational, verifiable, and adaptive realities.</span>
              </h1>
            </div>
            <p className="hero-lead">
              At the intersection of embedded logic, real-time operating systems, AI orchestration, and grid-scale infrastructure.
              My work translates high-stakes technical complexity into systems that are predictable, legible, and deployable in safety-critical environments.
            </p>
            <p>
              Connecting live market intelligence, flagship repositories, research trajectory, and implementation signals to demonstrate coherent execution paths across both the immersive portfolio and the developer surface on GitHub.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#thesis-simulator">
                🚀 Launch Live Thesis Simulator
              </a>
              <a className="secondary-button" href="#live-intelligence">
                Enter the Live Intelligence Hub
              </a>
              <a className="secondary-button" href="#flagship-systems">
                Explore Flagship Systems
              </a>
              <a className="secondary-button" href="https://github.com/iceccarelli" target="_blank" rel="noreferrer">
                GitHub Profile
              </a>
            </div>
          </div>

          <aside className="glass-panel spotlight-border hero-panel">
            <div className="hero-portrait-shell">
              <Image
                src="/Vincenzo_Grimaldi_footer_picture_website.jpg"
                alt="Vincenzo Grimaldi"
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 40vw"
                className="hero-portrait"
              />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <SystemInsightVisualizerRotator />
            </div>

            <div className="panel-topline" style={{ marginTop: '1.5rem' }}>
              <span className="live-dot" />
              <span>Vincenzo Grimaldi — Physics-Informed Cyber-Physical Systems Engineer</span>
            </div>
            <h2>
              Engineering deterministic systems that connect AI-driven infrastructure with verifiable physical execution.
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

      {/* GLOBAL ORIENTATION */}
      <section className="section-shell">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Global Orientation</span>
            <h2 className="compact-heading">Operational Time Zones</h2>
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

      {/* ABOUT THE WORK */}
      <section className="section-shell content-section" id="about">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">About the Work</span>
            <h2>A portfolio engineered for technical credibility in physics-informed systems.</h2>
          </div>
        </div>
        <div className="two-column-layout">
          <div className="glass-panel immersive-card">
            <p>
              I do not treat AI, software, infrastructure, energy, and robotics as isolated domains.
              I integrate them into deterministic physics-informed systems where every layer — from RTOS scheduling to AI orchestration — is verifiable and safety-critical.
            </p>
            <p>
              This site and my GitHub profile form two complementary surfaces of the same mission: one cinematic and immersive, the other precise and developer-first.
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

      {/* PHYSICS-INFORMED INTELLIGENCE LAYER */}
      <section className="section-shell content-section" id="physics-informed">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Physics-Informed Intelligence Layer</span>
            <h2>Where the Laws of Physics Meet Deterministic AI</h2>
          </div>
          <div className="two-column-layout">
            <div>
              <p className="section-intro">
                Physics-informed intelligence does not stop at pattern recognition. It constrains learning with the same governing equations that define the physical system.
              </p>

              <div className="math-block" style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ fontSize: '1.2rem', lineHeight: 1.7, fontWeight: 700 }}>
                  <span style={{ color: 'var(--accent-strong)' }}>Total objective</span> = Data fidelity + <span style={{ color: 'var(--success)' }}>Physics penalty</span>
                </div>
                <div style={{ color: 'var(--muted-strong)' }}>
                  The model is penalized whenever its predictions violate the governing dynamics of the system.
                </div>
                <div style={{ padding: '1rem 1.1rem', border: '1px solid rgba(125, 211, 252, 0.16)', borderRadius: '16px', background: 'rgba(8, 15, 28, 0.72)', fontFamily: 'monospace' }}>
                  L<sub>total</sub> = L<sub>data</sub> + λL<sub>physics</sub><br />
                  L<sub>physics</sub> = ‖∂u/∂t + N[u]‖²
                </div>
              </div>
            </div>
            <div>
              <h3>Next evolution of GridOS + NeuralBridge</h3>
              <p>
                Real-time surrogate models for Optimal Power Flow and inverter control — systems that are not merely intelligent, but operationally trustworthy under physical constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2025 MASTER THESIS — LIVE SIMULATOR (NEW FLAGSHIP SECTION) */}
      <section className="section-shell content-section" id="thesis-simulator">
        <div className="glass-panel cta-panel spotlight-border" style={{ borderColor: '#34d399', borderWidth: '3px', boxShadow: '0 0 60px rgba(52, 211, 153, 0.25)' }}>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold tracking-[2px]">2025 RWTH AACHEN MASTER THESIS</div>
            <div className="px-4 py-1.5 rounded-full bg-emerald-500 text-black text-sm font-extrabold flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full animate-pulse" /> LIVE PRODUCTION DEMO
            </div>
          </div>

          <h2 className="text-4xl tracking-tighter">Data Modeling in a Cross-domain Ontology for Cyber Intelligence in Smart-Grids Using Reinforcement Learning</h2>
          <p className="mt-2 text-xl text-emerald-400">Vincenzo Grimaldi • Matriculation No. 353970 • RWTH Aachen University • June 2025</p>

          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg">
                This thesis establishes the first systematic integration of the <strong>Common Information Model (CIM)</strong> with the <strong>ThreMA cybersecurity framework</strong>, creating unified semantic representations that connect physical power components with security concepts including vulnerabilities and protective measures.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['CIM–ThreMA Cross-Domain Ontology', '5 Formal Semantic Mappings', 'IEEE 9-Bus Cyber Testbed', '4 Documented Attack Scenarios', 'Q-Learning RL Security Agent', 'Cross-Domain SNR Metric'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20 text-emerald-300">{tag}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <a 
                href="https://physics-informed.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="primary-button bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xl py-5 flex items-center justify-center gap-3"
              >
                🚀 LAUNCH LIVE THESIS SIMULATOR
              </a>
              <a 
                href="https://github.com/iceccarelli/physics-informed" 
                target="_blank" 
                rel="noopener noreferrer"
                className="secondary-button text-center text-lg py-4"
              >
                View Full Source on GitHub →
              </a>
              <p className="text-center text-xs text-emerald-400/70">Validated on enhanced IEEE 9-Bus system with realistic network infrastructure and documented attack scenarios</p>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="section-shell content-section" id="architecture">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Architecture of Value Creation</span>
            <h2>The projects form layers of one coherent physics-informed systems thesis.</h2>
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

      {/* FLAGSHIP SYSTEMS */}
      <section className="section-shell content-section" id="flagship-systems">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Flagship Systems</span>
            <h2>Selected initiatives that demonstrate depth, direction, and execution quality.</h2>
          </div>
        </div>
        <div className="card-grid two-up">
          {flagshipInitiatives.map((initiative, index) => (
            <article 
              className={`glass-panel immersive-card ${initiative.isLive ? 'border-emerald-500 border-2' : ''}`} 
              key={index}
              style={initiative.isLive ? { boxShadow: '0 0 40px rgba(52, 211, 153, 0.3)' } : {}}
            >
              <div className="card-topline">
                <span className="live-dot muted" />
                <span>{initiative.isLive ? 'LIVE PRODUCTION DEMO' : 'Flagship Initiative'}</span>
              </div>
              <h3>{initiative.title}</h3>
              <p>{initiative.summary}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {initiative.isLive ? (
                  <>
                    <a className="primary-button bg-emerald-500 hover:bg-emerald-600 text-black" href={initiative.liveUrl} target="_blank" rel="noreferrer">
                      Launch Live Demo →
                    </a>
                    <a className="secondary-button" href={initiative.href} target="_blank" rel="noreferrer">
                      View Source
                    </a>
                  </>
                ) : (
                  initiative.published === false ? (
                    <span className="text-link" style={{ opacity: 0.55, cursor: 'default' }}>
                      Private repository — available on request
                    </span>
                  ) : (
                  <>
                    <a className="text-link" href={initiative.href} target="_blank" rel="noreferrer">
                      View repository →
                    </a>
                    <a className="text-link" href={initiative.href} target="_blank" rel="noreferrer" style={{ color: '#34d399' }}>
                      ★ Star on GitHub
                    </a>
                  </>
                  )
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="glass-panel cta-panel spotlight-border" style={{ marginTop: '2rem' }}>
          <div>
            <span className="section-kicker">Developer Surface</span>
            <h3 style={{ marginTop: 0 }}>The same mission, inspected in code.</h3>
            <p>All flagship systems are open source on GitHub. Star them to support the work.</p>
          </div>
          <a className="primary-button" href="https://github.com/iceccarelli" target="_blank" rel="noreferrer">
            Open GitHub Profile →
          </a>
        </div>
      </section>

      {/* LIVE INTELLIGENCE HUB */}
      <section className="section-shell content-section" id="live-intelligence">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Live Intelligence Hub</span>
            <h2>Relevant market value and news context, and momentum.</h2>
            <p className="section-intro">{lastSync}</p>
          </div>
        </div>

        <div className="tradingview-widget-shell glass-panel">
          <div ref={tickerTapeRef} className="tradingview-widget-container" />
        </div>

        <div className="insight-grid">
          <article className="glass-panel data-column">
            <div className="panel-topline">
              <span className="live-dot" />
              <span>Reputable CPS &amp; Energy Signals</span>
            </div>
            <h3>Headlines worth watching</h3>
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
              <span>Active CPS &amp; Firmware Development</span>
            </div>
            <h3>Repositories expressing strongest technical value</h3>
            <div className="data-list">
              {repoCards.map((repo) => (
                <a className="data-list-item" href={repo.html_url} key={repo.id} target="_blank" rel="noreferrer">
                  <span className="item-meta">
                    {repo.language} • Updated {formatDate(repo.updated_at)} • {repo.stargazers_count} stars
                  </span>
                  <strong>{repo.name}</strong>
                  <small>{repo.description}</small>
                  <div style={{ marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 600 }}>
                      ★ Star on GitHub
                    </span>
                  </div>
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

      {/* QUANTIFIED IMPACT DASHBOARD */}
      <section className="section-shell content-section">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Quantified Value Generation</span>
            <h2>Proven impact in simulation and deployment</h2>
          </div>
          <div className="impact-dashboard">
            <div className="impact-card"><strong>22% reduction</strong><br/>grid curtailment via DERIM + MARL</div>
            <div className="impact-card"><strong>Sub-8 ms</strong><br/>deterministic latency (NeuralBridge)</div>
            <div className="impact-card"><strong>99.999% uptime</strong><br/>RTOS + PINN-augmented V&amp;V</div>
            <div className="impact-card"><strong>15–40% higher</strong><br/>renewable penetration</div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL EXPERIENCE */}
      <section className="section-shell content-section">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Professional Experience</span>
            <h2>Grid Networks Engineer – Deutsche Bahn</h2>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>ITk Fachspezialist – Digitisation of High-Voltage Assets</strong><br />DB InfraGO AG • Aug 2024 – Present</p>
            <p style={{ color: 'var(--muted-strong)' }}>Leading digitalisation strategy for railway traction HV grids; IT/OT convergence, KRITIS-compliant cybersecurity governance, and resilience engineering.</p>
            
            <p style={{ marginTop: '1.5rem' }}><strong>Industrial Engineering Intern – High-Voltage Maintenance</strong><br />DB Fahrzeuginstandhaltung GmbH &amp; DB Netz AG • Jun 2022 – Sep 2024</p>
            <p style={{ color: 'var(--muted-strong)' }}>Lifecycle management of traction power substations, asset condition monitoring, and critical systems maintenance.</p>
          </div>
        </div>
      </section>

      {/* STANDARDS MASTERY */}
      <section className="section-shell content-section">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Standards Mastery</span>
            <h2>Protocols &amp; Frameworks</h2>
          </div>
          <div className="standards-grid">
            <div className="standards-card">IEC 61850 • CIM • OCPP • SunSpec</div>
            <div className="standards-card">ROS 2 • HELICS • TLA+</div>
            <div className="standards-card">IEC 62351 • NERC CIP • NIS2 • EU CRA</div>
          </div>
        </div>
      </section>

      {/* TRUSTED ECOSYSTEM */}
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

      {/* CONNECT */}
      <Payments />

      <section className="section-shell content-section" id="connect">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Continue the Conversation</span>
            <h2>If this systems-level thinking resonates, the next step should be immediate.</h2>
            <p>
              Whether you are exploring AI-native middleware, smart-grid operating systems, embedded control platforms, robotics, or large-scale research collaboration — both surfaces (this portfolio and GitHub) are structured to make technical value visible.
            </p>
          </div>
          <div className="hero-actions">
            <a className="primary-button" href="https://github.com/iceccarelli" target="_blank" rel="noreferrer">
              GitHub Profile
            </a>
            <a className="secondary-button" href="#ecosystem">
              Trusted Ecosystem
            </a>
            <a className="secondary-button" href="mailto:vincenzo@igrimaldi.engineering">
              Email — vincenzo@igrimaldi.engineering
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
