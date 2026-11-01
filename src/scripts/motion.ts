// Scroll reveals, parallax, marquee, counters, header auto-hide and magnetic buttons.
// Everything is skipped under prefers-reduced-motion (counters keep their final value).

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ease = 'cubic-bezier(.16,1,.3,1)';

type Kind = 'up' | 'text' | 'image' | 'slide';
const presets: Record<Kind, Keyframe[]> = {
  up: [{ opacity: 0, transform: 'translateY(48px)', filter: 'blur(8px)' }, { opacity: 1, transform: 'none', filter: 'blur(0px)' }],
  text: [{ opacity: 0, transform: 'translateY(0.35em)', filter: 'blur(16px)' }, { opacity: 1, transform: 'none', filter: 'blur(0px)' }],
  image: [{ clipPath: 'inset(16% 10% 16% 10% round 32px)', transform: 'scale(1.1)' }, { clipPath: 'inset(0% 0% 0% 0% round 16px)', transform: 'none' }],
  slide: [{ opacity: 0, transform: 'translateX(160px)' }, { opacity: 1, transform: 'none' }],
};

// Builds a paused reveal held on its first keyframe, then lifts the CSS pre-hide.
function makeReveal(el: HTMLElement, kind: Kind, delay: number) {
  const a = el.animate(presets[kind] ?? presets.up, {
    duration: kind === 'image' ? 1500 : 1100, delay, easing: ease, fill: 'both',
  });
  a.pause();
  a.currentTime = 0;
  a.onfinish = () => a.cancel();
  el.classList.add('is-revealed');
  return a;
}

function setupReveals() {
  const groups = new Map<Element, Animation[]>();
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (!el.closest('[data-reveal-stagger]')) groups.set(el, [makeReveal(el, el.dataset.reveal as Kind, 0)]);
  });
  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((c) => {
    const load = c.dataset.revealStagger === 'load';
    const anims = [...c.children].map((el, i) =>
      makeReveal(el as HTMLElement, el.tagName === 'H1' ? 'text' : 'up', load ? 150 + i * 110 : i * 90),
    );
    if (load) anims.forEach((a) => a.play());
    else groups.set(c, anims);
  });
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      groups.get(e.target)?.forEach((a) => a.play());
      io.unobserve(e.target);
    }),
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );
  groups.forEach((_, el) => io.observe(el));
}

function setupCounters() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-count]')];
  const render = (t: number) => els.forEach((el) => {
    el.textContent = Math.round(Number(el.dataset.count) * t) + (el.dataset.suffix ?? '');
  });
  render(0);
  const start = performance.now() + 400, dur = 1600;
  const tick = (now: number) => {
    const p = Math.min(1, Math.max(0, (now - start) / dur));
    render(1 - Math.pow(1 - p, 3));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function setupMagnetic() {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.translate = `${((e.clientX - r.left - r.width / 2) * 0.3).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * 0.4).toFixed(1)}px`;
    });
    el.addEventListener('mouseleave', () => { el.style.translate = '0 0'; });
  });
}

// Hero headline sweeps in from the left; its outlined trails arrive later, like a motion smear settling.
function setupHeadline() {
  const h = document.querySelector<HTMLElement>('[data-headline]');
  if (!h) return;
  const layers: [string, number][] = [['.solid', 250], ['.t1', 380], ['.t2', 480]];
  layers.forEach(([sel, delay]) => {
    const el = h.querySelector<HTMLElement>(sel);
    if (!el) return;
    const a = el.animate(
      [
        { opacity: 0, transform: 'translateX(-12%)', filter: 'blur(14px)' },
        { opacity: 1, transform: 'none', filter: sel === '.t2' ? 'blur(1px)' : 'blur(0px)' },
      ],
      { duration: 1300, delay, easing: ease, fill: 'backwards' },
    );
    el.classList.add('is-revealed');
    a.onfinish = () => a.cancel();
  });
}

function setupScrollEffects() {
  const headline = document.querySelector<HTMLElement>('[data-headline]');
  let trail = 0.05;
  const setTrail = (v: number) => { trail = v; headline?.style.setProperty('--trail', `${v.toFixed(3)}em`); };

  const track = document.querySelector<HTMLElement>('[data-marquee]');
  const mq = track?.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: 38000, iterations: Infinity });

  const header = document.querySelector<HTMLElement>('[data-autohide]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const par = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
  const parX = [...document.querySelectorAll<HTMLElement>('[data-parallax-x]')];

  let lastY = window.scrollY, ticking = false;
  const frame = () => {
    ticking = false;
    const y = window.scrollY, vh = window.innerHeight, w = window.innerWidth;
    const vel = y - lastY;
    if (header && (!menu || menu.hidden)) {
      if (vel > 2 && y > 240) header.style.translate = '0 -100%';
      else if (vel < -2 || y < 240) header.style.translate = '0 0';
    }
    par.forEach((el) => {
      const r = el.getBoundingClientRect();
      const off = r.top + r.height / 2 - vh / 2;
      el.style.translate = `0 ${(off * -Number(el.dataset.parallax) * (w < 900 ? 0.4 : 1)).toFixed(1)}px`;
    });
    parX.forEach((el) => {
      const r = el.getBoundingClientRect();
      const off = r.top + r.height / 2 - vh / 2;
      el.style.translate = `${(off * Number(el.dataset.parallaxX) * Math.min(1, w / 1200)).toFixed(1)}px 0`;
    });
    if (mq) mq.playbackRate = (vel >= 0 ? 1 : -1) * (1 + Math.min(5, Math.abs(vel) * 0.12));
    setTrail(Math.max(trail, 0.05 + Math.min(0.4, Math.abs(vel) * 0.01)));
    lastY = y;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }, { passive: true });
  frame();

  // Ease the marquee and headline trails back to rest once scrolling stops.
  setInterval(() => {
    if (mq && Math.abs(mq.playbackRate) > 1.01) mq.playbackRate = mq.playbackRate * 0.9 + Math.sign(mq.playbackRate) * 0.1;
    if (trail > 0.051) setTrail(trail * 0.88 + 0.05 * 0.12);
  }, 60);
}

// The progress bar is informational, so it runs even with reduced motion.
const bar = document.querySelector<HTMLElement>('[data-progress]');
if (bar) {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.scale = `${max > 0 ? window.scrollY / max : 0} 1`;
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// Header stays transparent over the hero and turns solid once the hero scrolls away.
const siteHeader = document.querySelector<HTMLElement>('[data-autohide]');
const hero = document.querySelector<HTMLElement>('[data-hero]');
if (siteHeader && hero) {
  const update = () => {
    siteHeader.classList.toggle('is-solid', hero.getBoundingClientRect().bottom <= siteHeader.offsetHeight);
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

if (!reduce) {
  setupReveals();
  setupHeadline();
  setupCounters();
  setupMagnetic();
  setupScrollEffects();
}
