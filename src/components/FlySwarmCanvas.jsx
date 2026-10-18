import { useEffect, useRef } from 'react';

export default function FlySwarmCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // माउस व टच ट्रैकिंग
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      lastMoved: Date.now(),
      isIdle: false,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.lastMoved = Date.now();
      mouse.isIdle = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.lastMoved = Date.now();
        mouse.isIdle = false;
      }
    };

    // वेब ऑडियो सिंथेसाइज़र (Bzz साउंड के लिए बिना किसी mp3 फाइल के)
    let audioCtx = null;
    const playBuzzSound = () => {
      try {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } catch (err) {
        // ऑडियो पॉलिसी साइलेंट फेल
      }
    };

    // सुप्रीम कोर्ट "Hammer Strike" शॉकवेव्स
    const shockwaves = [];
    const handlePointerDown = (e) => {
      const x = e.clientX || (e.touches && e.touches[0]?.clientX) || width / 2;
      const y = e.clientY || (e.touches && e.touches[0]?.clientY) || height / 2;

      playBuzzSound();

      shockwaves.push({
        x,
        y,
        radius: 8,
        maxRadius: 180,
        opacity: 1,
        hammerScale: 1.6,
        rotation: (Math.random() - 0.5) * 0.5,
      });

      // मक्खियों का 3D में तितर-बितर होना
      flies.forEach((fly) => {
        const dx = fly.x - x;
        const dy = fly.y - y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 300) {
          const power = (1 - dist / 300) * 35;
          fly.vx += (dx / dist) * power;
          fly.vy += (dy / dist) * power;
          fly.altitude = 48; // Z-axis पर ऊपर उछलना
          fly.isPerched = false;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);

    // गोल्डन डस्ट पार्टिकल्स
    const particles = [];

    // उन्नत 3D मक्खी क्लास
    class Advanced3DFly {
      constructor(isLeader = false) {
        this.isLeader = isLeader;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.altitude = isLeader ? 26 : 14 + Math.random() * 12;
        this.baseSize = isLeader ? 20 : 12 + Math.random() * 6;
        this.wingPhase = Math.random() * Math.PI * 2;
        this.heading = 0;
        this.banking = 0;
        this.wobble = Math.random() * 100;
        this.isPerched = false;
        this.groomingPhase = 0;
      }

      update() {
        this.wobble += 0.04;

        // यदि कर्सर 2.5 सेकंड तक नहीं हिला, तो मक्खियां बैठ जाएंगी
        if (mouse.isIdle && Math.hypot(mouse.x - this.x, mouse.y - this.y) < 120) {
          this.isPerched = true;
        } else {
          this.isPerched = false;
        }

        if (this.isPerched) {
          this.vx *= 0.6;
          this.vy *= 0.6;
          this.altitude += (3 - this.altitude) * 0.1; // जमीन पर बैठना
          this.groomingPhase += 0.15;
        } else {
          // नेचुरल ऑर्बिटिंग फिजिक्स
          const orbitAngle = this.wobble * 2.2;
          const orbitRadius = this.isLeader ? 35 : 70 + Math.sin(this.wobble) * 45;
          const targetX = mouse.x + Math.cos(orbitAngle) * orbitRadius;
          const targetY = mouse.y + Math.sin(orbitAngle) * orbitRadius;

          const dx = targetX - this.x;
          const dy = targetY - this.y;
          const dist = Math.hypot(dx, dy);

          const accel = this.isLeader ? 0.07 : 0.04;
          if (dist > 15) {
            this.vx += (dx / dist) * accel;
            this.vy += (dy / dist) * accel;
          }

          // ऑर्गेनिक जिटर (Jitter)
          this.vx += (Math.random() - 0.5) * 1.2;
          this.vy += (Math.random() - 0.5) * 1.2;

          this.vx *= 0.91;
          this.vy *= 0.91;

          // 3D ऊंचाई का संतुलन
          const normalAlt = this.isLeader ? 24 : 14;
          this.altitude += (normalAlt - this.altitude) * 0.08;
        }

        this.x += this.vx;
        this.y += this.vy;

        // टर्निंग और 3D बैंकिंग गणना
        const currentSpeed = Math.hypot(this.vx, this.vy);
        const targetHeading = Math.atan2(this.vy, this.vx);
        const turnRate = targetHeading - this.heading;
        this.heading += turnRate * 0.25;
        this.banking = Math.max(-0.6, Math.min(0.6, turnRate * 2.5));

        // पंखों की गति (बैठने पर पंख शांत रहेंगे)
        if (!this.isPerched) {
          this.wingPhase += 0.85 + currentSpeed * 0.12;
        }

        // स्क्रीन बाउंड्रीज
        const pad = 40;
        if (this.x < -pad) this.x = width + pad;
        if (this.x > width + pad) this.x = -pad;
        if (this.y < -pad) this.y = height + pad;
        if (this.y > height + pad) this.y = -pad;

        // गोल्डन डस्ट पार्टिकल ट्रेल
        if (this.isLeader && !this.isPerched && Math.random() > 0.45) {
          particles.push({
            x: this.x - Math.cos(this.heading) * 14,
            y: this.y - Math.sin(this.heading) * 14,
            radius: Math.random() * 2 + 1,
            life: 1,
          });
        }
      }

      draw() {
        ctx.save();

        const S = this.baseSize;
        const depthScale = 1 + this.altitude * 0.025;

        // 1. जमीन पर रियलिस्टिक 3D शैडो
        const shadowOffset = this.altitude * 0.7;
        ctx.save();
        ctx.translate(this.x + shadowOffset, this.y + shadowOffset);
        ctx.rotate(this.heading + Math.PI / 2);
        ctx.scale(depthScale * 0.9, depthScale * 0.9);
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0.12, 0.45 - this.altitude * 0.009)})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, S * 0.45, S * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 2. मुख्य मक्खी (3D झुकाव और बैंकिंग के साथ)
        ctx.translate(this.x, this.y);
        ctx.rotate(this.heading + Math.PI / 2);
        ctx.scale(depthScale, depthScale);

        // बैंकिंग रोल (जब मक्खी मुड़ती है)
        ctx.transform(1, 0, this.banking * 0.3, 1, 0, 0);

        // Micro Legs (6 पैर + बैठने पर हाथ रगड़ने का एनिमेशन)
        ctx.strokeStyle = '#262626';
        ctx.lineWidth = 1.1;
        const groomOffset = this.isPerched ? Math.sin(this.groomingPhase * 2) * 2 : 0;

        [-1, 1].forEach((side) => {
          ctx.beginPath();
          // आगे के पैर
          ctx.moveTo(side * (S * 0.2), -S * 0.2);
          ctx.lineTo(side * (S * 0.65) + (side > 0 ? groomOffset : -groomOffset), -S * 0.55);
          // बीच के पैर
          ctx.moveTo(side * (S * 0.25), 0);
          ctx.lineTo(side * (S * 0.85), S * 0.05);
          // पिछले पैर
          ctx.moveTo(side * (S * 0.2), S * 0.3);
          ctx.lineTo(side * (S * 0.75), S * 0.75);
          ctx.stroke();
        });

        // Abdomen (पिछला हिस्सा - 3D ग्रेडेड)
        const abdGrad = ctx.createLinearGradient(0, 0, 0, S);
        abdGrad.addColorStop(0, this.isLeader ? '#f5c518' : '#2d2d2d');
        abdGrad.addColorStop(1, this.isLeader ? '#b8860b' : '#141414');
        ctx.fillStyle = abdGrad;
        ctx.beginPath();
        ctx.ellipse(0, S * 0.38, S * 0.38, S * 0.58, 0, 0, Math.PI * 2);
        ctx.fill();

        // Abdomen स्ट्राइप्स
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, S * 0.25, S * 0.32, 0.2, Math.PI - 0.2);
        ctx.arc(0, S * 0.45, S * 0.3, 0.2, Math.PI - 0.2);
        ctx.stroke();

        // Thorax (छाती का हिस्सा)
        const thxGrad = ctx.createRadialGradient(0, -S * 0.05, 2, 0, -S * 0.05, S * 0.4);
        thxGrad.addColorStop(0, '#444444');
        thxGrad.addColorStop(1, '#1a1a1a');
        ctx.fillStyle = thxGrad;
        ctx.beginPath();
        ctx.ellipse(0, -S * 0.05, S * 0.33, S * 0.32, 0, 0, Math.PI * 2);
        ctx.fill();

        // 3D इंद्रधनुषी पंख (Holographic Iridescent Wings)
        const flap = this.isPerched ? 0.95 : Math.sin(this.wingPhase);
        const wingScaleX = Math.abs(flap);

        [-1, 1].forEach((side) => {
          ctx.save();
          ctx.translate(side * (S * 0.16), -S * 0.12);
          ctx.rotate(side * (this.isPerched ? 0.3 : 0.45 + flap * 0.2));
          ctx.scale(side * wingScaleX, 1);

          const wingGrad = ctx.createLinearGradient(0, 0, S * 1.1, S * 1.6);
          wingGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
          wingGrad.addColorStop(0.4, 'rgba(245, 197, 24, 0.5)');
          wingGrad.addColorStop(0.8, 'rgba(56, 189, 248, 0.35)');
          wingGrad.addColorStop(1, 'rgba(236, 72, 153, 0.2)');

          ctx.fillStyle = wingGrad;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.lineWidth = 0.7;

          ctx.beginPath();
          ctx.ellipse(S * 0.55, S * 0.65, S * 0.38, S * 0.95, 0.35, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // पंखों की नसें (Veins)
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(S * 0.55, S * 1.2);
          ctx.moveTo(S * 0.3, S * 0.5);
          ctx.lineTo(S * 0.75, S * 0.75);
          ctx.stroke();

          ctx.restore();
        });

        // Head (सिर)
        ctx.fillStyle = '#111111';
        ctx.beginPath();
        ctx.arc(0, -S * 0.42, S * 0.23, 0, Math.PI * 2);
        ctx.fill();

        // 3D बायोनिक आंखें (Compound Eyes)
        const eyeGrad = ctx.createRadialGradient(0, -S * 0.48, 1, 0, -S * 0.48, S * 0.25);
        eyeGrad.addColorStop(0, '#ff6d00');
        eyeGrad.addColorStop(1, '#b91c1c');
        ctx.fillStyle = eyeGrad;

        ctx.beginPath();
        ctx.arc(-S * 0.16, -S * 0.48, S * 0.12, 0, Math.PI * 2);
        ctx.arc(S * 0.16, -S * 0.48, S * 0.12, 0, Math.PI * 2);
        ctx.fill();

        // आंखों पर लाइट ग्लिंट (Specular Highlight)
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-S * 0.13, -S * 0.51, S * 0.038, 0, Math.PI * 2);
        ctx.arc(S * 0.19, -S * 0.51, S * 0.038, 0, Math.PI * 2);
        ctx.fill();

        // लीडर मक्खी का गोल्डन रिंग हेलो
        if (this.isLeader) {
          ctx.strokeStyle = 'rgba(245, 197, 24, 0.6)';
          ctx.lineWidth = 1.6;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(0, 0, S * 1.5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.restore();
      }
    }

    // स्क्रीन साइज के अनुसार मक्खियों की संख्या
    const isMobile = width < 768;
    const count = isMobile ? 5 : 8;

    const flies = [new Advanced3DFly(true)];
    for (let i = 0; i < count; i++) {
      flies.push(new Advanced3DFly(false));
    }

    // 60FPS रेंडर लूप
    let animId;
    let isTabActive = true;

    const handleVisibility = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const loop = () => {
      if (!isTabActive) {
        animId = requestAnimationFrame(loop);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // सुचारू माउस ईज़िंग
      mouse.x += (mouse.targetX - mouse.x) * 0.09;
      mouse.y += (mouse.targetY - mouse.y) * 0.09;

      // निष्क्रियता जांच (Idle detection)
      if (Date.now() - mouse.lastMoved > 2500) {
        mouse.isIdle = true;
      }

      // डस्ट पार्टिकल्स रेंडरिंग
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.025;
        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.fillStyle = `rgba(245, 197, 24, ${p.life * 0.55})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // सुप्रीम कोर्ट हथौड़ा शॉकवेव रेंडरिंग
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 7;
        sw.opacity -= 0.025;
        sw.hammerScale += 0.015;

        if (sw.opacity <= 0) {
          shockwaves.splice(i, 1);
        } else {
          ctx.save();

          // डबल शॉकवेव रिंग
          ctx.strokeStyle = `rgba(245, 197, 24, ${sw.opacity * 0.8})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = `rgba(255, 109, 0, ${sw.opacity * 0.5})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius * 0.7, 0, Math.PI * 2);
          ctx.stroke();

          // बीच में हथौड़ा स्टैंप (Supreme Court Satire)
          ctx.translate(sw.x, sw.y);
          ctx.rotate(sw.rotation);
          ctx.font = `${Math.floor(32 * sw.hammerScale)}px system-ui`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.globalAlpha = sw.opacity;
          ctx.fillText('🔨', 0, 0);

          ctx.restore();
        }
      }

      // मक्खियों का अपडेट व रेंडर
      flies.forEach((fly) => {
        fly.update();
        fly.draw();
      });

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 w-full h-full select-none"
    />
  );
}