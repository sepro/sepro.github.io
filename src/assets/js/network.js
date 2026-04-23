// Force-directed network animation for the hero canvas.
// Ported from the React prototype in design/CV.html.
(function () {
  const canvas = document.getElementById('hero-network');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const N = 70;
  const LINK = 160;
  const SPRING = 0.000018;
  const DAMP = 0.992;
  const REPULSE = 55;
  const REPULSE_FORCE = 0.028;
  const LONG_REPULSE = 220;
  const LONG_F = 0.0000028;
  const CENTER_PULL = 0.0000022;
  const RANDOM_WALK = 0.022;
  const KICK_PERIOD = 80;
  const KICK_MAG = 0.9;
  const MAX_SPEED = 0.9;
  const MAX_SPEED_EXPLODE = 8;
  const EXPLOSION_INTERVAL_MS = 15000;
  const EXPLOSION_DURATION_MS = 1200;

  const accentRgbVar = getComputedStyle(canvas)
    .getPropertyValue('--accent-rgb')
    .trim() || '0 135 140';
  const [cr, cg, cb] = accentRgbVar.split(/\s+|,/).map(Number);

  let nodes = [];
  let frameCount = 0;
  let lastExplosion = performance.now();
  let exploding = false;
  let animId = null;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    if (nodes.length === 0) {
      nodes = Array.from({ length: N }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 1.6,
      }));
    }
  }

  function triggerExplosion() {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    exploding = true;
    for (const n of nodes) {
      const dx = n.x - cx;
      const dy = n.y - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const mag = 5.5 + Math.random() * 3.5;
      n.vx += (dx / dist) * mag;
      n.vy += (dy / dist) * mag;
    }
    setTimeout(() => { exploding = false; }, EXPLOSION_DURATION_MS);
  }

  function tick() {
    frameCount++;
    const now = performance.now();
    if (now - lastExplosion > EXPLOSION_INTERVAL_MS) {
      lastExplosion = now;
      triggerExplosion();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        const nx = dx / dist;
        const ny = dy / dist;

        if (dist < LINK) {
          const force = SPRING * (dist - LINK * 0.52);
          a.vx += nx * force; a.vy += ny * force;
          b.vx -= nx * force; b.vy -= ny * force;
          const alpha = (1 - dist / LINK) * 0.22;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        if (dist < REPULSE) {
          const push = (REPULSE_FORCE * (1 - dist / REPULSE)) / (dist + 1);
          a.vx -= nx * push; a.vy -= ny * push;
          b.vx += nx * push; b.vy += ny * push;
        }

        if (dist < LONG_REPULSE) {
          const push2 = LONG_F * (LONG_REPULSE - dist);
          a.vx -= nx * push2; a.vy -= ny * push2;
          b.vx += nx * push2; b.vy += ny * push2;
        }
      }

      a.vx += (canvas.width / 2 - a.x) * CENTER_PULL;
      a.vy += (canvas.height / 2 - a.y) * CENTER_PULL;

      a.vx += (Math.random() - 0.5) * RANDOM_WALK;
      a.vy += (Math.random() - 0.5) * RANDOM_WALK;

      if (frameCount % KICK_PERIOD === i % KICK_PERIOD) {
        a.vx += (Math.random() - 0.5) * KICK_MAG;
        a.vy += (Math.random() - 0.5) * KICK_MAG;
      }

      a.vx *= DAMP; a.vy *= DAMP;
      const spd = Math.hypot(a.vx, a.vy);
      const maxSpd = exploding ? MAX_SPEED_EXPLODE : MAX_SPEED;
      if (spd > maxSpd) {
        a.vx *= maxSpd / spd;
        a.vy *= maxSpd / spd;
      }

      a.x += a.vx; a.y += a.vy;
      if (a.x < 0) { a.x = 0; a.vx = Math.abs(a.vx); }
      if (a.x > canvas.width) { a.x = canvas.width; a.vx = -Math.abs(a.vx); }
      if (a.y < 0) { a.y = 0; a.vy = Math.abs(a.vy); }
      if (a.y > canvas.height) { a.y = canvas.height; a.vy = -Math.abs(a.vy); }

      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${cr},${cg},${cb},0.45)`;
      ctx.fill();
    }

    animId = requestAnimationFrame(tick);
  }

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement);
  tick();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && animId) {
      cancelAnimationFrame(animId);
      animId = null;
    } else if (!document.hidden && !animId) {
      animId = requestAnimationFrame(tick);
    }
  });
})();
