/* ========================================
   RIGOLIZIA — Main TypeScript
   Animations, Carousels, Parallax
   ======================================== */

import './style.css';

import siteContent from './data/content.json';
import communityContent from './data/community.json';

// ── Types ──
interface Gem {
  id: number;
  image: string;
  alt: string;
  label: string;
  driftClass: string;
}

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

// ── Initial Render ──
function initDynamicContent(): void {
  renderHeroGems();
  renderIconicPlaces();
  renderCommunityPosts();
}

function renderHeroGems(): void {
  const desktopContainer = document.getElementById('floating-images');
  const mobileContainer = document.getElementById('hero-mobile-gallery');
  if (!desktopContainer || !mobileContainer) return;

  desktopContainer.innerHTML = '';
  mobileContainer.innerHTML = '';

  siteContent.heroGems.forEach((gem: Gem) => {
    // Desktop Parallax Layer
    const layer = document.createElement('div');
    layer.className = 'parallax-layer';
    layer.innerHTML = `
      <div class="gem-card ${gem.driftClass}">
        <img src="${gem.image}" alt="${gem.alt}" loading="eager" />
        <span>${gem.label}</span>
      </div>
    `;
    desktopContainer.appendChild(layer);

    // Mobile Gallery Card
    const mobileCard = document.createElement('div');
    mobileCard.className = 'gem-card';
    mobileCard.innerHTML = `
      <img src="${gem.image}" alt="${gem.alt}" />
      <span>${gem.label}</span>
    `;
    mobileContainer.appendChild(mobileCard);
  });

  initParallax();
}

function renderIconicPlaces(): void {
  const track = document.getElementById('places-track');
  const dotsContainer = document.getElementById('places-dots');
  if (!track || !dotsContainer) return;

  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  siteContent.places.forEach((place: Place, index: number) => {
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
    // Encode the URL for the iframe src
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

// ── Parallax logic ──
function initParallax(): void {
  const layers = document.querySelectorAll<HTMLElement>('.parallax-layer');
  if (!layers.length) return;

  const updateParallax = () => {
    if (layers[0] && getComputedStyle(layers[0]).display === 'none') return;
    const scrollY = window.scrollY;
    layers.forEach((layer, index) => {
      const speedsY = [0.12, 0.22, 0.08, 0.18, 0.28];
      const speedsX = [0.03, -0.04, 0.02, -0.02, 0.05];
      const yOffset = scrollY * (speedsY[index % speedsY.length] || 0.1);
      const xOffset = scrollY * (speedsX[index % speedsX.length] || 0.05);
      layer.style.transform = `translate3d(${xOffset}px, -${yOffset}px, 0)`;
    });
  };

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();
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
  initDynamicContent();
  initNavbar();
  initFadeAnimations();
});

