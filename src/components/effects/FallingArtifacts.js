'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function FallingArtifacts() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const shakeRef = useRef({ x: 0, y: 0 });
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

    // Track mouse movement for background shake
    const handleMouseMove = (e) => {
      // Calculate normalized mouse position from center (-1 to 1)
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseRef.current = {
        x: (e.clientX - centerX) / centerX,
        y: (e.clientY - centerY) / centerY,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Rectangular artifact with natural physics - SLOWED DOWN ~55%
    class RectArtifact {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -100 - Math.random() * 300;

        // SLOWED DOWN: Natural free-fall physics (~55% slower)
        this.velocity = 0;
        this.acceleration = 0.001 + Math.random() * 0.01;
        this.maxSpeed = 0.2 + Math.random() * 0.5;

        // Wider rectangles
        this.width = 40 + Math.random() * 12;
        this.height = 20 + Math.random() * 6;

        this.opacity = 0.01 + Math.random() * 0.05;

        // Rotation with natural wobble
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.005 + Math.random() * 0.01;
        this.wobbleAmplitude = 0.3 + Math.random() * 0.5;

        // Horizontal drift - slowed
        this.driftSpeed = (Math.random() - 0.5) * 0.1;
      }

      update() {
        // Natural acceleration with terminal velocity
        this.velocity = Math.min(this.velocity + this.acceleration, this.maxSpeed);
        this.y += this.velocity;

        // Horizontal drift
        this.x += this.driftSpeed + Math.sin(this.wobble) * 0.1;

        // Natural wobble rotation
        this.wobble += this.wobbleSpeed;
        this.rotation += this.rotationSpeed + Math.sin(this.wobble) * 0.005;

        if (this.y > canvas.height + 100) {
          this.reset();
        }
      }

      draw() {
        const isDark = resolvedTheme === 'dark';
        const baseColor = isDark ? '255, 255, 255' : '0, 0, 0';
        const glowColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';

        ctx.save();
        // Apply background shake offset to each particle's position
        ctx.translate(this.x + shakeRef.current.x, this.y + shakeRef.current.y);
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
      p.velocity = Math.random() * p.maxSpeed;
      particles.push(p);
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth interpolation for background shake based on mouse position
      const shakeIntensity = 8; // Max pixels of shake
      const targetShakeX = mouseRef.current.x * shakeIntensity;
      const targetShakeY = mouseRef.current.y * shakeIntensity;

      // Smooth easing for shake effect
      shakeRef.current.x += (targetShakeX - shakeRef.current.x) * 0.08;
      shakeRef.current.y += (targetShakeY - shakeRef.current.y) * 0.08;

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
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
