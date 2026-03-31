/* ========================================
   RIGOLIZIA — Main TypeScript
   Animations, Carousels, i18n
   ======================================== */

import './style.css';

import siteContent from './data/content.json';
import communityContent from './data/community.json';
import translations from './data/translations.json';

// ── Types ──
type Language = 'en' | 'it';

interface Place {
  id: number;
  image: string;
  alt: string;
  title: string;
  description: string;
}

interface FBPost {
  id: number;
  url: string;
  height?: number;
}

// ── State ──
let currentLang: Language = (localStorage.getItem('preferredLang') as Language) || 'en';
let heroInterval: number | null = null;

// ── i18n Logic ──
function initLanguage(): void {
  const langButtons = document.querySelectorAll('.lang-dropdown button');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang') as Language;
      if (lang) setLanguage(lang);
    });
  });

  updateLanguageUI();
}

function setLanguage(lang: Language): void {
  currentLang = lang;
  localStorage.setItem('preferredLang', lang);
  updateLanguageUI();
  
  // Re-render dynamic components that need it
  renderIconicPlaces();
  renderCommunityPosts(); 
}

function updateLanguageUI(): void {
  // Update button text
  const langDisplay = document.querySelector('.lang-current');
  if (langDisplay) langDisplay.textContent = currentLang.toUpperCase();

  // Update static elements with data-i18n
  const elements = document.querySelectorAll<HTMLElement>('[data-i18n]');
  const dictionary = (translations as any)[currentLang];
  
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && dictionary[key]) {
      el.innerHTML = dictionary[key];
    }
  });

  // Update document lang
  document.documentElement.lang = currentLang;
}

// ── Initial Render ──
function initDynamicContent(): void {
  initHeroCarousel();
  renderIconicPlaces();
  renderCommunityPosts();
}

/**
 * ── Hero Background Carousel ──
 * Switches between beautiful wide shots of Rigolizia
 */
function initHeroCarousel(): void {
  const container = document.getElementById('hero-carousel');
  if (!container) return;

  const images = [
    './images/hero-village.png',
    './images/hero-countryside.png',
    './images/hero-church.png',
    './images/carousel-sunset.png'
  ];

  // Clear and Create slides
  container.innerHTML = '';
  const slides: HTMLElement[] = [];

  images.forEach((src, idx) => {
    const div = document.createElement('div');
    div.className = `hero-slide ${idx === 0 ? 'active' : ''}`;
    div.style.backgroundImage = `url('${src}')`;
    container.appendChild(div);
    slides.push(div);
  });

  let currentIdx = 0;
  if (heroInterval) clearInterval(heroInterval);

  heroInterval = setInterval(() => {
    slides[currentIdx].classList.remove('active');
    currentIdx = (currentIdx + 1) % slides.length;
    slides[currentIdx].classList.add('active');
  }, 8000) as unknown as number;
}

function renderIconicPlaces(): void {
  const track = document.getElementById('places-track');
  const dotsContainer = document.getElementById('places-dots');
  if (!track || !dotsContainer) return;

  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  const places = (siteContent as any)[currentLang].places;

  places.forEach((place: Place, index: number) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `
      <img src="${place.image}" alt="${place.alt}" />
      <div class="carousel-overlay">
        <h3>${place.title}</h3>
        <p>${place.description}</p>
      </div>
    `;
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('data-index', index.toString());
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dotsContainer.appendChild(dot);
  });

  new Carousel('places-carousel', 'places-track', 'places-prev', 'places-next', 'places-dots');
}

function renderCommunityPosts(): void {
  const track = document.getElementById('fb-track');
  const dotsContainer = document.getElementById('fb-dots');
  if (!track || !dotsContainer) return;

  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  communityContent.facebookPosts.forEach((post: FBPost, index: number) => {
    const encodedUrl = encodeURIComponent(post.url);
    const iframeSrc = `https://www.facebook.com/plugins/post.php?href=${encodedUrl}&show_text=true&width=500`;
    const height = post.height || 600;

    const card = document.createElement('div');
    card.className = 'fb-embed-card';
    card.innerHTML = `
      <iframe 
        src="${iframeSrc}" 
        width="100%" 
        height="${height}" 
        style="border:none;overflow:hidden;border-radius:8px;" 
        scrolling="no" 
        frameborder="0" 
        allowfullscreen="true" 
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
      </iframe>
    `;
    track.appendChild(card);

    if (communityContent.facebookPosts.length > 1) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('data-index', index.toString());
      dot.setAttribute('aria-label', `Go to group ${index + 1}`);
      dotsContainer.appendChild(dot);
    }
  });

  new Carousel('fb-carousel', 'fb-track', 'fb-prev', 'fb-next', 'fb-dots');
}

// ── Generic Intersection Observer ──
function initFadeAnimations(): void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale')
          .forEach((el) => observer.observe(el));
}

// ── Navbar & Mobile Menu ──
function initNavbar(): void {
  const nav = document.getElementById('main-nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!nav || !navToggle || !navLinks) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    document.body.classList.toggle('no-scroll');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-active');
      document.body.classList.remove('no-scroll');
    });
  });
}

// ── Carousel class ──
class Carousel {
  container: HTMLElement;
  track: HTMLElement;
  prevBtn: HTMLElement | null;
  nextBtn: HTMLElement | null;
  dots: HTMLElement[];
  currentIndex: number = 0;
  slides: HTMLElement[];
  autoplayInterval: number | null = null;

  constructor(containerId: string, trackId: string, prevBtnId: string, nextBtnId: string, dotsId: string) {
    this.container = document.getElementById(containerId)!;
    this.track = document.getElementById(trackId)!;
    this.prevBtn = document.getElementById(prevBtnId);
    this.nextBtn = document.getElementById(nextBtnId);
    const dotEls = document.getElementById(dotsId)?.children;
    this.dots = dotEls ? Array.from(dotEls) as HTMLElement[] : [];
    this.slides = Array.from(this.track.children) as HTMLElement[];

    if (!this.container || !this.track || this.slides.length === 0) return;
    this.init();
  }

  init() {
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });

    let startX = 0;
    this.container.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    this.container.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
    }, { passive: true });

    if (this.container.id === 'places-carousel') this.startAutoplay();
  }

  goTo(index: number) {
    this.currentIndex = index;
    this.update();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.update();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.update();
  }

  update() {
    if (!this.slides.length) return;
    const slideWidth = this.slides[0].offsetWidth;
    const gap = this.container.id === 'fb-carousel' ? 32 : 0;
    this.track.style.transform = `translateX(-${this.currentIndex * (slideWidth + gap)}px)`;
    this.dots.forEach((dot, i) => dot.classList.toggle('active', i === this.currentIndex));
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.next(), 6000);
  }
}

// ── App Init ──
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initDynamicContent();
  initNavbar();
  initFadeAnimations();

  const s = document.createElement('script');
  s.src = 'https://connect.facebook.net/en_US/sdk.js';
  s.async = true; s.defer = true; s.crossOrigin = 'anonymous';
  document.head.appendChild(s);
});
