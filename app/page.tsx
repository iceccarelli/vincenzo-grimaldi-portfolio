'use client';

import { useEffect, useRef, useState } from 'react';
import Payments from './components/Payments';
import ContactForm from './components/ContactForm';
import CapabilitySystem from './components/CapabilitySystem';
import Image from 'next/image';

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
  return (
    <main>
      {/* HERO */}
      <section className="section-shell hero-section" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <div>
              <span className="section-kicker">Physics-Informed Systems • Deterministic Control • Grid Intelligence</span>
              <h1>
                <span className="gradient-text">Designing deterministic, physics-informed intelligence for safety-critical control and grid systems.</span>
              </h1>
            </div>
            <p className="hero-lead">
              At the intersection of embedded logic, real-time operating systems, AI orchestration, and grid-scale
              infrastructure. My work translates high-stakes technical complexity into systems that are predictable,
              legible, and deployable in safety-critical environments.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#thesis-simulator">
                Launch the thesis simulator
              </a>
              <a className="secondary-button" href="#capabilities">
                See what I build
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
              <span>Grid Networks Engineer, DB InfraGO AG</span>
            </div>
            <div className="metric-pills">
              <span className="metric-pill">Embedded Control</span>
              <span className="metric-pill">Grid Intelligence</span>
              <span className="metric-pill">AI Orchestration</span>
              <span className="metric-pill">RTOS &amp; V&amp;V</span>
            </div>
          </aside>
        </div>
      </section>

      {/* ABOUT + EXPERIENCE — merged: the claim and the job that backs it */}
      <section className="section-shell content-section" id="about">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">About the work</span>
            <h2>I integrate AI, software, energy and robotics into systems where every layer is verifiable.</h2>
            <p>
              I do not treat them as isolated domains. From RTOS scheduling to AI orchestration, each layer has to be
              checkable before the one above it is allowed to depend on it.
            </p>
          </div>

          <div className="experience-block" id="experience">
            <span className="capability-provenance-label">Currently</span>
            <p>
              <strong>ITk Fachspezialist — Digitisation of high-voltage assets</strong>
              <br />
              DB InfraGO AG · Aug 2024 – present · Frankfurt
            </p>
            <p className="experience-detail">
              Digitalisation of railway traction HV grids, IT/OT convergence, and KRITIS-aligned cybersecurity
              governance for mission-critical rail infrastructure.
            </p>

            <span className="capability-provenance-label">Previously</span>
            <p>
              <strong>Industrial Engineering Intern — High-voltage maintenance</strong>
              <br />
              DB Fahrzeuginstandhaltung GmbH &amp; DB Netz AG · Jun 2022 – Sep 2024
            </p>
            <p className="experience-detail">
              Lifecycle management of traction power substations, asset condition monitoring, and predictive
              maintenance.
            </p>
          </div>
        </div>
      </section>

      {/* CAPABILITY REGISTER + WORK REGISTRY */}
      <CapabilitySystem />

      {/* PHYSICS-INFORMED INTELLIGENCE LAYER */}
      <section className="section-shell content-section" id="physics-informed">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Physics-informed intelligence</span>
            <h2>Where the laws of physics meet deterministic AI</h2>
          </div>
          <div className="two-column-layout">
            <div>
              <p className="section-intro">
                Physics-informed intelligence does not stop at pattern recognition. It constrains learning with the
                same governing equations that define the physical system.
              </p>

              <div className="math-block" style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ fontSize: '1.2rem', lineHeight: 1.7, fontWeight: 700 }}>
                  <span style={{ color: 'var(--accent-strong)' }}>Total objective</span> = Data fidelity +{' '}
                  <span style={{ color: 'var(--success)' }}>Physics penalty</span>
                </div>
                <div style={{ color: 'var(--muted-strong)' }}>
                  The model is penalised whenever its predictions violate the governing dynamics of the system.
                </div>
                <div
                  style={{
                    padding: '1rem 1.1rem',
                    border: '1px solid rgba(125, 211, 252, 0.16)',
                    borderRadius: '16px',
                    background: 'rgba(8, 15, 28, 0.72)',
                    fontFamily: 'monospace',
                  }}
                >
                  L<sub>total</sub> = L<sub>data</sub> + &lambda;L<sub>physics</sub>
                  <br />
                  L<sub>physics</sub> = &#8214;&part;u/&part;t + N[u]&#8214;&sup2;
                </div>
              </div>
            </div>
            <div>
              <h3>Where this is heading</h3>
              <p>
                Real-time surrogate models for optimal power flow and inverter control — systems that are not merely
                intelligent, but operationally trustworthy under physical constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THESIS SIMULATOR — the one thing a visitor can open and use */}
      <section className="section-shell content-section" id="thesis-simulator">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">RWTH Aachen M.Sc. thesis · June 2025</span>
            <h2>Data modelling in a cross-domain ontology for cyber intelligence in smart grids using reinforcement learning</h2>
            <p className="section-intro">
              The first systematic integration of the Common Information Model (CIM) with the ThreMA cybersecurity
              framework: unified semantic representations connecting physical power components with vulnerabilities and
              protective measures. Validated on an enhanced IEEE 9-bus system.
            </p>
          </div>

          <div className="thesis-tags">
            {[
              'CIM–ThreMA cross-domain ontology',
              '5 formal semantic mappings',
              'IEEE 9-bus cyber testbed',
              '4 documented attack scenarios',
              'Q-learning RL security agent',
              'Cross-domain SNR metric',
            ].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="hero-actions">
            <a className="primary-button" href="https://physics-informed.vercel.app/" target="_blank" rel="noreferrer">
              Open the simulator
            </a>
          </div>
        </div>
      </section>

      <Payments />

      {/* CONNECT */}
      <section className="section-shell content-section" id="connect">
        <div className="glass-panel cta-panel spotlight-border">
          <div>
            <span className="section-kicker">Connect</span>
            <h2>If this systems-level thinking resonates, the next step should be immediate.</h2>
            <p>
              AI-native middleware, smart-grid operating systems, embedded control platforms, robotics, or research
              collaboration. The repositories are private; access is granted on request.
            </p>
          </div>
          <div className="hero-actions">
            <a className="secondary-button" href="mailto:vincenzo@igrimaldi.engineering">
              vincenzo@igrimaldi.engineering
            </a>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
