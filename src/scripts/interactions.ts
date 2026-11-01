// Mobile menu, community gallery controls and the enquiry form.

const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
if (toggle && menu) {
  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
}

const gallery = document.querySelector<HTMLElement>('[data-gallery]');
if (gallery) {
  const step = (dir: number) =>
    gallery.scrollBy({ left: dir * Math.min(460, gallery.clientWidth * 0.8), behavior: 'smooth' });
  document.querySelector('[data-gallery-prev]')?.addEventListener('click', () => step(-1));
  document.querySelector('[data-gallery-next]')?.addEventListener('click', () => step(1));
  gallery.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
  });

  // Mouse drag-to-scroll; touch devices use native scrolling.
  gallery.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const x0 = e.pageX, s0 = gallery.scrollLeft;
    gallery.style.scrollSnapType = 'none';
    gallery.style.cursor = 'grabbing';
    const move = (ev: MouseEvent) => { gallery.scrollLeft = s0 - (ev.pageX - x0); };
    const up = () => {
      gallery.style.scrollSnapType = '';
      gallery.style.cursor = '';
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  });
}

const form = document.querySelector<HTMLFormElement>('[data-enquiry-form]');
const success = document.querySelector<HTMLElement>('[data-enquiry-success]');
if (form && success) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: send `new FormData(form)` to the real enquiry backend before showing success.
    const first = String(new FormData(form).get('name') ?? '').trim().split(' ')[0];
    success.querySelector('[data-sent-name]')!.textContent = first || 'friend';
    form.hidden = true;
    success.hidden = false;
  });
  success.querySelector('[data-enquiry-reset]')?.addEventListener('click', () => {
    form.reset();
    success.hidden = true;
    form.hidden = false;
  });
}
