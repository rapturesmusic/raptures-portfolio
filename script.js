const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = window.localStorage.getItem('portfolio-theme') || 'light';

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.querySelector('.theme-label').textContent = isDark ? 'Light mode' : 'Dark mode';
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☼' : '◐';
  }
};

applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  window.localStorage.setItem('portfolio-theme', nextTheme);
  applyTheme(nextTheme);
});

document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.case-visual[data-video-id]').forEach((visual) => {
  const preview = visual.querySelector('.video-preview');
  const videoId = visual.dataset.videoId;
  let stopTimer;

  const startPreview = () => {
    window.clearTimeout(stopTimer);
    if (!preview.querySelector('iframe')) {
      const iframe = document.createElement('iframe');
      iframe.title = 'Video preview';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&mute=0&controls=0&loop=1&playlist=' + videoId + '&playsinline=1&rel=0&modestbranding=1';
      preview.appendChild(iframe);
    }
    visual.classList.add('is-previewing');
  };

  const stopPreview = () => {
    window.clearTimeout(stopTimer);
    stopTimer = window.setTimeout(() => {
      if (!visual.matches(':hover') && !visual.contains(document.activeElement)) {
        preview.replaceChildren();
        visual.classList.remove('is-previewing');
      }
    }, 250);
  };

  visual.addEventListener('mouseenter', startPreview);
  visual.addEventListener('mouseleave', stopPreview);
  visual.addEventListener('focusin', startPreview);
  visual.addEventListener('focusout', stopPreview);
});