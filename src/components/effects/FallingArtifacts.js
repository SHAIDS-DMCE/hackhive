'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function FallingArtifacts() {
  const canvasRef = useRef(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Rectangular artifact with natural physics
    class RectArtifact {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -100 - Math.random() * 300;

        // Natural free-fall physics
        this.velocity = 0;
        this.acceleration = 0.02 + Math.random() * 0.03; // Gravity
        this.maxSpeed = 1.5 + Math.random() * 1.5;

        // Wider rectangles
        this.width = 30 + Math.random() * 20;
        this.height = 10 + Math.random() * 8;

        this.opacity = 0.06 + Math.random() * 0.12;

        // Rotation with natural wobble
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.01 + Math.random() * 0.02;
        this.wobbleAmplitude = 0.3 + Math.random() * 0.5;

        // Horizontal drift
        this.driftSpeed = (Math.random() - 0.5) * 0.3;
      }

      update() {
        // Natural acceleration with terminal velocity
        this.velocity = Math.min(this.velocity + this.acceleration, this.maxSpeed);
        this.y += this.velocity;

        // Horizontal drift
        this.x += this.driftSpeed + Math.sin(this.wobble) * 0.2;

        // Natural wobble rotation
        this.wobble += this.wobbleSpeed;
        this.rotation += this.rotationSpeed + Math.sin(this.wobble) * 0.01;

        if (this.y > canvas.height + 100) {
          this.reset();
        }
      }

      draw() {
        const isDark = resolvedTheme === 'dark';
        const baseColor = isDark ? '255, 255, 255' : '0, 0, 0';
        const glowColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Subtle glow effect
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw rectangle with glow
        ctx.fillStyle = `rgba(${baseColor}, ${this.opacity})`;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore();
      }
    }

    // Fewer particles (reduced count)
    const particleCount = Math.min(15, Math.floor(window.innerWidth / 100));
    for (let i = 0; i < particleCount; i++) {
      const p = new RectArtifact();
      p.y = Math.random() * canvas.height;
      p.velocity = Math.random() * p.maxSpeed; // Start with some velocity
      particles.push(p);
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
