/* ========================================
   RIGOLIZIA — Main TypeScript
   Animations, Carousels, Parallax
   ======================================== */

import './style.css';

// ── Fade-In Animations via IntersectionObserver ──
function initFadeAnimations(): void {
  const fadeElements = document.querySelectorAll<HTMLElement>(
    '.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale'
  );

  if (!fadeElements.length) return;

  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  fadeElements.forEach((el) => observer.observe(el));
}

// ── Navbar scroll effect ──
function initNavbar(): void {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 80) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ── Floating image parallax on scroll ──
function initParallax(): void {
  const floatingImages = document.querySelectorAll<HTMLElement>('.floating-img');
  if (!floatingImages.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        floatingImages.forEach((img, index) => {
          const speed = 0.08 + index * 0.04;
          const yOffset = scrollY * speed;
          img.style.transform = `translateY(-${yOffset}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ── Carousel Configuration ──
interface CarouselOptions {
  trackId: string;
  prevId: string;
  nextId: string;
  dotsId: string;
  autoplay?: boolean;
  interval?: number;
}

// ── Generic Carousel class ──
class Carousel {
  private track: HTMLElement | null;
  private prevBtn: HTMLElement | null;
  private nextBtn: HTMLElement | null;
  private dotsContainer: HTMLElement | null;
  private currentIndex: number;
  private totalSlides: number;
  private autoplayInterval: number;
  private autoplayTimer: ReturnType<typeof setInterval> | null;
  private isAutoplay: boolean;

  constructor(options: CarouselOptions) {
    const { trackId, prevId, nextId, dotsId, autoplay = true, interval = 6000 } = options;

    this.track = document.getElementById(trackId);
    this.prevBtn = document.getElementById(prevId);
    this.nextBtn = document.getElementById(nextId);
    this.dotsContainer = document.getElementById(dotsId);

    if (!this.track) return;

    this.currentIndex = 0;
    this.totalSlides = this.track.children.length;
    this.autoplayInterval = interval;
    this.autoplayTimer = null;
    this.isAutoplay = autoplay;

    this.init();
  }

  private init(): void {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prev();
        this.resetAutoplay();
      });
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.next();
        this.resetAutoplay();
      });
    }

    if (this.dotsContainer) {
      this.dotsContainer.addEventListener('click', (e: Event) => {
        const dot = (e.target as HTMLElement).closest<HTMLElement>('.carousel-dot');
        if (dot) {
          const index = parseInt(dot.dataset.index ?? '0', 10);
          this.goTo(index);
          this.resetAutoplay();
        }
      });
    }

    this.initSwipe();

    if (this.isAutoplay) {
      this.startAutoplay();
    }
  }

  private goTo(index: number): void {
    if (!this.track) return;

    if (index < 0) index = this.totalSlides - 1;
    if (index >= this.totalSlides) index = 0;

    this.currentIndex = index;
    this.track.style.transform = `translateX(-${index * 100}%)`;
    this.updateDots();
  }

  private next(): void {
    this.goTo(this.currentIndex + 1);
  }

  private prev(): void {
    this.goTo(this.currentIndex - 1);
  }

  private updateDots(): void {
    if (!this.dotsContainer) return;
    const dots = this.dotsContainer.querySelectorAll<HTMLElement>('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }

  private startAutoplay(): void {
    this.autoplayTimer = setInterval(() => this.next(), this.autoplayInterval);
  }

  private resetAutoplay(): void {
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);
    if (this.isAutoplay) this.startAutoplay();
  }

  private initSwipe(): void {
    if (!this.track) return;

    let startX = 0;

    this.track.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );

    this.track.addEventListener(
      'touchend',
      (e: TouchEvent) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            this.next();
          } else {
            this.prev();
          }
          this.resetAutoplay();
        }
      },
      { passive: true }
    );
  }
}

// ── Facebook SDK Initialization ──
//
// To embed real Facebook posts:
//
// 1. Replace the placeholder HTML inside each .fb-embed-card with:
//    <div class="fb-post" data-href="YOUR_FACEBOOK_POST_URL" data-width="500"></div>
//
// 2. The Facebook SDK will automatically render the embeds.
//
// Example post URL format:
//    https://www.facebook.com/YourPage/posts/1234567890
//
function initFacebookSDK(): void {
  const fbPosts = document.querySelectorAll('.fb-post');
  if (!fbPosts.length) return;

  (window as Record<string, unknown>).fbAsyncInit = function () {
    (window as Record<string, unknown> & { FB: { init: (config: object) => void } }).FB.init({
      xfbml: true,
      version: 'v19.0',
    });
  };

  const script = document.createElement('script');
  script.src = 'https://connect.facebook.net/en_US/sdk.js';
  script.async = true;
  script.defer = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

// ── Initialize everything on DOM ready ──
document.addEventListener('DOMContentLoaded', () => {
  initFadeAnimations();
  initNavbar();
  initParallax();

  // Iconic Places Carousel
  new Carousel({
    trackId: 'places-track',
    prevId: 'places-prev',
    nextId: 'places-next',
    dotsId: 'places-dots',
    autoplay: true,
    interval: 6000,
  });

  // Facebook Carousel (enable when you have more posts):
  // new Carousel({
  //   trackId: 'fb-track',
  //   prevId: 'fb-prev',
  //   nextId: 'fb-next',
  //   dotsId: 'fb-dots',
  //   autoplay: false,
  // });

  initFacebookSDK();
});
