/**
 * Black Label Lifestyle - Shared Micro-Interactions, Filtering & Concierge Controller
 */
import { initAdminAnalytics, recordRealSiteVisit } from './admin-analytics.ts';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChatbotWidget } from './chatbot/ChatbotWidget.tsx';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function initChatbot(): void {
  let rootContainer = document.getElementById('blacklabel-chatbot-root');
  if (!rootContainer) {
    rootContainer = document.createElement('div');
    rootContainer.id = 'blacklabel-chatbot-root';
    document.body.appendChild(rootContainer);
  }

  // Prevent multiple mounts
  if ((rootContainer as any)._reactMounted) return;
  (rootContainer as any)._reactMounted = true;

  try {
    const root = createRoot(rootContainer);
    root.render(React.createElement(ChatbotWidget));
  } catch (err) {
    console.error('Failed to mount Black Label Concierge Chatbot:', err);
  }
}

function initSite(): void {
  // Mount site-wide Black Label Concierge Chatbot
  initChatbot();

  // 0. Record real site visit for this domain on every page
  recordRealSiteVisit();

  // Initialize Admin Analytics if on admin page
  initAdminAnalytics();

  // 1. Mobile Off-Canvas Drawer Setup
  const openButtons = document.querySelectorAll<HTMLElement>('[data-mobile-menu-open]');
  const closeButtons = document.querySelectorAll<HTMLElement>('[data-mobile-menu-close]');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const drawerContent = document.getElementById('mobile-drawer-content');

  function openMenu(): void {
    if (!drawer) return;
    drawer.classList.remove('hidden');
    document.body.classList.add('mobile-drawer-open');
    requestAnimationFrame(() => {
      backdrop?.classList.remove('opacity-0');
      backdrop?.classList.add('opacity-100');
      drawerContent?.classList.remove('translate-x-full');
      drawerContent?.classList.add('translate-x-0');
    });
  }

  function closeMenu(): void {
    if (!drawer) return;
    backdrop?.classList.remove('opacity-100');
    backdrop?.classList.add('opacity-0');
    drawerContent?.classList.remove('translate-x-0');
    drawerContent?.classList.add('translate-x-full');

    setTimeout(() => {
      drawer.classList.add('hidden');
      document.body.classList.remove('mobile-drawer-open');
    }, 250);
  }

  openButtons.forEach((btn) => btn.addEventListener('click', openMenu));
  closeButtons.forEach((btn) => btn.addEventListener('click', closeMenu));
  backdrop?.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && drawer && !drawer.classList.contains('hidden')) {
      closeMenu();
    }
  });

  // 2. Smooth scroll for anchor links
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 3. Sticky Header Elevation on Scroll
  const header = document.querySelector<HTMLElement>('header[data-sticky-header]');
  if (header) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 20) {
          header.classList.add('bg-[#060709]/95', 'shadow-2xl', 'border-[#c5a059]/30');
          header.classList.remove('bg-[#060709]/85', 'border-[#c5a059]/20');
        } else {
          header.classList.remove('bg-[#060709]/95', 'shadow-2xl', 'border-[#c5a059]/30');
          header.classList.add('bg-[#060709]/85', 'border-[#c5a059]/20');
        }
      },
      { passive: true }
    );
  }

  // 4. Interactive Division Filter Tabs (Home Page) - High-performance, zero-latency switcher
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter-category]');
  const divisionArticles = document.querySelectorAll<HTMLElement>('[data-division-category]');

  if (filterButtons.length > 0 && divisionArticles.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-filter-category') || 'all';

        // 1. Instant button states (0ms latency)
        filterButtons.forEach((b) => {
          const isActive = b === button;
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
          if (isActive) {
            b.classList.remove('bg-white/[0.04]', 'text-[#e6e0d4]/85', 'hover:text-[#faf8f5]', 'hover:bg-white/[0.08]', 'border', 'border-white/10');
            b.classList.add('bg-[#c5a059]', 'text-[#060709]', 'font-semibold', 'shadow-sm');
          } else {
            b.classList.remove('bg-[#c5a059]', 'text-[#060709]', 'font-semibold', 'shadow-sm');
            b.classList.add('bg-white/[0.04]', 'text-[#e6e0d4]/85', 'hover:text-[#faf8f5]', 'hover:bg-white/[0.08]', 'border', 'border-white/10');
          }
        });

        // 2. Filter cards immediately without stagger delay lag
        divisionArticles.forEach((article) => {
          // Instantly wipe any inline transition-delay from scroll-reveal stagger
          article.style.transitionDelay = '0ms';

          const cardCategory = article.getAttribute('data-division-category') || '';
          const matches = category === 'all' || cardCategory.includes(category);

          if (matches) {
            const wasHidden = article.classList.contains('hidden') || article.style.display === 'none';
            article.classList.remove('hidden');
            article.style.display = 'flex';
            article.classList.add('revealed');

            if (wasHidden) {
              article.style.opacity = '0';
              article.style.transform = 'translateY(6px) scale(0.985)';
              article.style.transition = 'opacity 0.15s ease-out, transform 0.15s ease-out';
              requestAnimationFrame(() => {
                article.style.opacity = '1';
                article.style.transform = 'translate(0, 0) scale(1)';
              });
            } else {
              article.style.opacity = '1';
              article.style.transform = 'translate(0, 0) scale(1)';
              article.style.transition = '';
            }
          } else {
            article.classList.add('hidden');
            article.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Interactive Time Freedom Calculator (Home & Lifestyle Pages)
  const calculatorCheckboxes = document.querySelectorAll<HTMLInputElement>('[data-hours]');
  const totalHoursDisplay = document.getElementById('total-reclaimed-hours');
  const monthlyHoursDisplay = document.getElementById('monthly-reclaimed-hours');
  const progressBar = document.getElementById('reclaimed-progress-bar') as HTMLElement | null;

  if (calculatorCheckboxes.length > 0 && totalHoursDisplay) {
    function updateTotalHours(): void {
      let total = 0;
      calculatorCheckboxes.forEach((cb) => {
        const card = cb.closest('[data-service-card]') as HTMLElement | null;
        if (cb.checked) {
          total += parseInt(cb.getAttribute('data-hours') || '0', 10);
          if (card) {
            card.classList.add('border-[#c5a059]/60', 'bg-[#12161f]');
            card.classList.remove('border-white/[0.08]', 'bg-[#090b0e]');
          }
        } else {
          if (card) {
            card.classList.remove('border-[#c5a059]/60', 'bg-[#12161f]');
            card.classList.add('border-white/[0.08]', 'bg-[#090b0e]');
          }
        }
      });
      // Cap at 48 hours weekly factual ceiling
      const displayVal = Math.min(total, 48);
      if (totalHoursDisplay) {
        totalHoursDisplay.textContent = `${displayVal} hrs`;
      }
      if (monthlyHoursDisplay) {
        const monthlyVal = Math.round(displayVal * 4.33);
        monthlyHoursDisplay.textContent = `~${monthlyVal} hrs / mo`;
      }
      if (progressBar) {
        const percentage = Math.min(100, Math.round((displayVal / 48) * 100));
        progressBar.style.width = `${percentage}%`;
      }
    }

    calculatorCheckboxes.forEach((cb) => {
      cb.addEventListener('change', updateTotalHours);
    });
    updateTotalHours();
  }

  // 6. Concierge & Priority Intake Form Handlers
  const conciergeForm = document.getElementById('concierge-inquiry-form') as HTMLFormElement | null;
  const formSuccess = document.getElementById('form-success-banner');

  if (conciergeForm) {
    conciergeForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name') as HTMLInputElement | null;
      const emailInput = document.getElementById('form-email') as HTMLInputElement | null;
      const divisionInput = document.getElementById('form-division') as HTMLSelectElement | null;
      const messageInput = document.getElementById('form-message') as HTMLTextAreaElement | null;

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const division = divisionInput?.value || 'General Concierge';
      const message = messageInput?.value.trim() || '';

      const subject = encodeURIComponent(`Black Label Concierge: [${division}] Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Inquiry to Black Label Concierge Desk:\n` +
        `======================================\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Division Selected: ${division}\n\n` +
        `Objectives & Message:\n${message}\n\n` +
        `--------------------------------------\n` +
        `Origin: Millennium Tower, San Francisco`
      );

      // Open mailto
      window.location.href = `mailto:concierge@blacklabel.life?subject=${subject}&body=${body}`;

      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // Priority Intake Form on Homepage
  const priorityForm = document.getElementById('priority-intake-form') as HTMLFormElement | null;
  const prioritySuccess = document.getElementById('priority-form-success');

  if (priorityForm) {
    priorityForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const nameInput = document.getElementById('priority-name') as HTMLInputElement | null;
      const emailInput = document.getElementById('priority-email') as HTMLInputElement | null;
      const divisionInput = document.getElementById('priority-division') as HTMLSelectElement | null;
      const notesInput = document.getElementById('priority-notes') as HTMLTextAreaElement | null;

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const division = divisionInput?.value || 'Priority Intake';
      const notes = notesInput?.value.trim() || '';

      const subject = encodeURIComponent(`Priority Intake Mandate: [${division}] - ${name}`);
      const body = encodeURIComponent(
        `Black Label Priority Intake Terminal:\n` +
        `======================================\n` +
        `Principal / Executive: ${name}\n` +
        `Direct Contact: ${email}\n` +
        `Primary Division: ${division}\n\n` +
        `Executive Mandate / Notes:\n${notes}\n\n` +
        `--------------------------------------\n` +
        `Headquarters: Millennium Tower, 301 Mission St, San Francisco\n` +
        `Protocol: Under 2 Hour Executive Response SLA`
      );

      window.location.href = `mailto:concierge@blacklabel.life?subject=${subject}&body=${body}`;

      if (prioritySuccess) {
        prioritySuccess.classList.remove('hidden');
        prioritySuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // 7. Luxury Section & Element Entrance Animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
            const targetEl = entry.target as HTMLElement;
            setTimeout(() => {
              targetEl.style.transitionDelay = '0ms';
            }, 600);
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.05,
      }
    );

    // Apply staggered delays to child elements in stagger containers
    document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((container) => {
      const children = Array.from(container.children) as HTMLElement[];
      children.forEach((child, index) => {
        const customDelay = child.getAttribute('data-delay');
        const delayMs = customDelay ? parseInt(customDelay, 10) : (index % 8) * 80;
        child.style.transitionDelay = `${delayMs}ms`;

        // If child doesn't already have its own reveal type, inherit or default to reveal-scale-up or fade-up
        if (!child.hasAttribute('data-reveal')) {
          child.setAttribute('data-reveal', 'scale');
        }
      });
    });

    // Collect all elements intended to reveal (explicit data-reveal, sections, or stagger children)
    const elementsToReveal = document.querySelectorAll<HTMLElement>(
      '[data-reveal], [data-reveal-section], [data-reveal-stagger] > *'
    );

    elementsToReveal.forEach((el) => {
      const type = el.getAttribute('data-reveal') || 'fade-up';
      el.classList.add('reveal-init');

      if (type === 'scale') {
        el.classList.add('reveal-scale-up');
      } else if (type === 'slide-left') {
        el.classList.add('reveal-slide-left');
      } else if (type === 'slide-right') {
        el.classList.add('reveal-slide-right');
      } else if (type === 'fade') {
        el.classList.add('reveal-fade');
      } else {
        el.classList.add('reveal-fade-up');
      }

      // Check if element is already within viewport on load
      const rect = el.getBoundingClientRect();
      const isVisibleOnLoad = rect.top < window.innerHeight - 30;

      if (isVisibleOnLoad) {
        // Stagger initial viewport elements slightly for a cinematic load
        setTimeout(() => {
          el.classList.add('revealed');
        }, 60);
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    // If reduced motion or no IntersectionObserver, ensure everything is fully visible immediately
    document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-section], [data-reveal-stagger] > *').forEach((el) => {
      el.classList.add('revealed');
    });
  }

  // 10. Interactive 3D Tilt tracking on Luxury Graphic Cards
  const tiltCards = document.querySelectorAll<HTMLElement>('[data-luxury-card-tilt]');
  tiltCards.forEach((card) => {
    let bounds: DOMRect;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease';
    }

    function onMouseMove(e: MouseEvent) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      const xPct = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
      const yPct = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

      const rotateX = -yPct * 6; // max 6 deg tilt
      const rotateY = xPct * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function onMouseLeave() {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });

  // 11. Home Page Hero Interactive Multi-Plane Parallax
  const heroSection = document.getElementById('hero');
  const heroBgLayer = document.querySelector<HTMLElement>('[data-hero-parallax-bg]');
  const heroContentLayer = document.querySelector<HTMLElement>('[data-hero-parallax-content]');
  const heroParticlesLayer = document.querySelector<HTMLElement>('[data-hero-parallax-particles]');

  if (heroSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovering = false;
    let rafId: number | null = null;

    function renderHeroParallax() {
      // Smooth lerp (linear interpolation) for buttery fluid luxury feel
      currentX += (mouseX - currentX) * 0.04;
      currentY += (mouseY - currentY) * 0.04;

      if (heroBgLayer) {
        heroBgLayer.style.transform = `translate3d(${(-currentX * 14).toFixed(2)}px, ${(-currentY * 10).toFixed(2)}px, 0)`;
      }
      if (heroParticlesLayer) {
        heroParticlesLayer.style.transform = `translate3d(${(currentX * 22).toFixed(2)}px, ${(currentY * 16).toFixed(2)}px, 0)`;
      }
      if (heroContentLayer) {
        heroContentLayer.style.transform = `translate3d(${(currentX * 6).toFixed(2)}px, ${(currentY * 4).toFixed(2)}px, 0)`;
      }

      if (isHovering || Math.abs(mouseX - currentX) > 0.001 || Math.abs(mouseY - currentY) > 0.001) {
        rafId = requestAnimationFrame(renderHeroParallax);
      } else {
        rafId = null;
      }
    }

    heroSection.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      // Normalized coordinates between -1 and 1
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (!rafId) {
        rafId = requestAnimationFrame(renderHeroParallax);
      }
    }, { passive: true });

    heroSection.addEventListener('mouseenter', () => {
      isHovering = true;
      if (!rafId) {
        rafId = requestAnimationFrame(renderHeroParallax);
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      isHovering = false;
      mouseX = 0;
      mouseY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(renderHeroParallax);
      }
    });
  }

  // 11. Interactive Luxury Dark Map (Millennium Tower, San Francisco)
  const mapElement = document.getElementById('contact-map');
  if (mapElement) {
    try {
      // Millennium Tower coordinates: 301 Mission St, San Francisco, CA 94105
      const SF_COORDS: [number, number] = [37.7903, -122.397];

      const map = L.map('contact-map', {
        center: SF_COORDS,
        zoom: 16,
        zoomControl: false,
        scrollWheelZoom: false,
      });

      // CartoDB Dark Matter basemap
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
      }).addTo(map);

      // Custom Gold Monogram Marker
      const goldIcon = L.divIcon({
        className: 'custom-gold-marker-container',
        html: `
          <div class="relative flex flex-col items-center group cursor-pointer -translate-x-1/2 -translate-y-full">
            <div class="absolute -top-3 w-12 h-12 rounded-full bg-[#c5a059]/25 animate-ping pointer-events-none"></div>
            <div class="relative z-10 w-10 h-10 rounded-full bg-[#060709] border-2 border-[#c5a059] flex items-center justify-center shadow-[0_0_25px_rgba(197,160,89,0.8)] group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 text-[#c5a059]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
              </svg>
            </div>
            <div class="w-1.5 h-3 bg-[#c5a059] rounded-b-sm shadow-[0_2px_4px_rgba(0,0,0,0.8)]"></div>
          </div>
        `,
        iconSize: [40, 50],
        iconAnchor: [20, 50],
        popupAnchor: [0, -45],
      });

      const marker = L.marker(SF_COORDS, { icon: goldIcon }).addTo(map);

      const popupHtml = `
        <div class="p-3 text-left font-sans max-w-[280px]">
          <div class="text-[9px] font-mono uppercase tracking-[0.2em] text-[#c5a059] font-semibold mb-1">
            Global Headquarters
          </div>
          <h4 class="text-base font-serif font-medium text-[#faf8f5] leading-snug">
            Millennium Tower
          </h4>
          <p class="text-xs text-[#dcd6ca]/90 mt-1 leading-relaxed">
            301 Mission St · SoMa<br />San Francisco, CA 94105
          </p>
          <div class="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#a69f91]">
            <span>Executive Protocol: Active</span>
            <span class="text-emerald-400 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 24/7 Coverage
            </span>
          </div>
          <div class="mt-3 flex gap-2">
            <a href="https://maps.apple.com/?q=Millennium+Tower,+301+Mission+St,+San+Francisco,+CA+94105" target="_blank" rel="noopener" class="flex-1 text-center py-1.5 px-2 bg-[#c5a059] hover:bg-[#dfc182] text-[#060709] text-[10px] font-semibold uppercase tracking-wider rounded-sm transition-colors">
              Apple Maps
            </a>
            <a href="https://maps.google.com/?q=301+Mission+St,+San+Francisco,+CA+94105" target="_blank" rel="noopener" class="flex-1 text-center py-1.5 px-2 bg-white/10 hover:bg-white/20 text-[#faf8f5] text-[10px] font-semibold uppercase tracking-wider rounded-sm transition-colors">
              Google Maps
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: 'luxury-map-popup',
        closeButton: true,
        autoClose: false,
      });

      // Automatically open the popup
      setTimeout(() => {
        marker.openPopup();
      }, 500);

      // Wire zoom and center controls
      document.getElementById('map-zoom-in')?.addEventListener('click', () => map.zoomIn());
      document.getElementById('map-zoom-out')?.addEventListener('click', () => map.zoomOut());
      document.getElementById('map-recenter')?.addEventListener('click', () => {
        map.setView(SF_COORDS, 16, { animate: true });
        marker.openPopup();
      });
    } catch (e) {
      console.warn('Map initialization error:', e);
    }
  }

  // 12. Contact Form with Interactive Luxury Confirmation
  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
  const contactSuccess = document.getElementById('contact-success-banner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
      const emailInput = document.getElementById('contact-email') as HTMLInputElement | null;
      const phoneInput = document.getElementById('contact-phone') as HTMLInputElement | null;
      const divisionInput = document.getElementById('contact-division') as HTMLSelectElement | null;
      const urgencyInput = document.getElementById('contact-urgency') as HTMLSelectElement | null;
      const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement | null;
      const channelInput = document.querySelector<HTMLInputElement>('input[name="preferred_channel"]:checked');

      const name = nameInput?.value.trim() || 'Principal';
      const email = emailInput?.value.trim() || '';
      const phone = phoneInput?.value.trim() || 'Not provided';
      const division = divisionInput?.value || 'General Concierge';
      const urgency = urgencyInput?.value || 'Immediate';
      const channel = channelInput?.value || 'Email';
      const message = messageInput?.value.trim() || '';

      const ticketRef = 'BLL-SF-' + Math.floor(100000 + Math.random() * 900000);

      const ticketEl = document.getElementById('contact-ticket-ref');
      if (ticketEl) ticketEl.textContent = ticketRef;

      const subject = encodeURIComponent(`[${ticketRef}] Mandate: [${division}] - ${name}`);
      const body = encodeURIComponent(
        `BLACK LABEL SOVEREIGN MANDATE TRANSMISSION\n` +
        `=======================================================\n` +
        `Reference ID: ${ticketRef}\n` +
        `Principal / Client: ${name}\n` +
        `Direct Email: ${email}\n` +
        `Direct Phone / Signal: ${phone}\n` +
        `Primary Division: ${division}\n` +
        `Urgency / Timeline: ${urgency}\n` +
        `Preferred Contact Channel: ${channel}\n\n` +
        `Mandate & Objectives:\n` +
        `${message}\n\n` +
        `-------------------------------------------------------\n` +
        `Dispatch Anchor: Millennium Tower, 301 Mission St, San Francisco\n` +
        `Service Level: Confidential Executive Protocol (Under 2 Hr SLA)\n`
      );

      // Open user's email client
      window.location.href = `mailto:concierge@blacklabel.life?subject=${subject}&body=${body}`;

      if (contactSuccess) {
        contactSuccess.classList.remove('hidden');
        contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // 13. High-End Concierge Terminal & Architectural Tower Controls (/concierge)
  initConciergeTerminal();
}

function initConciergeTerminal(): void {
  // 13.1 Perspective Tab Switcher (Google Map / Tower Architecture / Arrival Protocols)
  const viewButtons = document.querySelectorAll<HTMLButtonElement>('[data-terminal-view]');
  const viewMap = document.getElementById('terminal-view-map');
  const viewTower = document.getElementById('terminal-view-tower');
  const viewProtocols = document.getElementById('terminal-view-protocols');

  if (viewButtons.length > 0) {
    viewButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.terminalView;

        // Update button visual states
        viewButtons.forEach((b) => {
          const isActive = b === btn;
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
          if (isActive) {
            b.className = 'px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#060709] bg-[#c5a059] font-semibold rounded-sm transition-all focus-visible:outline-none';
          } else {
            b.className = 'px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#a69f91] hover:text-[#faf8f5] hover:bg-white/[0.05] rounded-sm transition-all focus-visible:outline-none';
          }
        });

        // Toggle Views
        if (viewMap) viewMap.classList.toggle('hidden', view !== 'map');
        if (viewTower) viewTower.classList.toggle('hidden', view !== 'tower');
        if (viewProtocols) viewProtocols.classList.toggle('hidden', view !== 'protocols');
      });
    });
  }

  // 13.2 Tower Architectural Floor Elevation Selector
  const towerButtons = document.querySelectorAll<HTMLButtonElement>('[data-tower-level]');
  const towerContentEl = document.getElementById('tower-level-content');

  const TOWER_LEVEL_DATA: Record<string, { title: string; alt: string; badge: string; desc: string; cap: string; access: string }> = {
    '60': {
      title: 'Level 60 — The Sovereign Sky Penthouse',
      alt: 'ALTITUDE: 645 FT',
      badge: 'PENTHOUSE ELEVATION',
      desc: 'Occupying the premier apex of Millennium Tower, our private showcase residence offers 360-degree panoramic vantage of the Bay Bridge, downtown skyline, and Golden Gate corridor. Features private entertainer\'s terrace and bespoke interior staging by Black Label Design.',
      cap: 'Up to 60 Guests',
      access: 'Executive Escort Only',
    },
    '48': {
      title: 'Level 48 — Black Label Command Chambers',
      alt: 'ALTITUDE: 520 FT',
      badge: 'EXECUTIVE DISPATCH',
      desc: 'Central operational headquarters for all eight Black Label divisions. Housing senior concierge officers, private intake chambers, encrypted communications suites, and sovereign transaction vaults for ultra-high-net-worth principals.',
      cap: 'Direct Liaison Desk',
      access: 'Biometric Clearance',
    },
    '10': {
      title: 'Level 10 — Private Dining Salon & Wine Vault',
      alt: 'ALTITUDE: 130 FT',
      badge: 'CLUB LEVEL AMENITIES',
      desc: 'Exclusive access to the private dining room curated by Chef Michael Mina, a temperature-controlled 5,000-bottle wine cellar, private sommelier tasting terrace, and 5,500 sq ft fitness center by Jay Wright.',
      cap: 'Private Tasting & Dinners',
      access: 'Member & Resident Access',
    },
    '1': {
      title: 'Ground Level — Fremont St Porte-Cochère & Valet',
      alt: 'ALTITUDE: 25 FT',
      badge: 'RESIDENTIAL ARRIVAL',
      desc: 'Covered, private arrival courtyard off Fremont Street between Mission and Howard. Uniformed 24/7 white-glove valet attendants, continuous security monitoring, and subterranean staging for exotics and armored executive vehicles.',
      cap: 'Subterranean Staging',
      access: '24/7 Attendant Valet',
    },
  };

  if (towerButtons.length > 0 && towerContentEl) {
    towerButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const level = btn.dataset.towerLevel || '60';
        const data = TOWER_LEVEL_DATA[level];
        if (!data) return;

        // Update button styles
        towerButtons.forEach((b) => {
          const isSelected = b === btn;
          if (isSelected) {
            b.className = 'w-full text-left p-3 rounded-sm border border-[#c5a059] bg-[#c5a059]/10 transition-all flex items-center justify-between group';
            b.querySelector('.font-mono')?.classList.add('text-[#c5a059]', 'font-semibold');
            b.querySelector('.font-mono')?.classList.remove('text-[#a69f91]');
          } else {
            b.className = 'w-full text-left p-3 rounded-sm border border-white/10 hover:border-[#c5a059]/50 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex items-center justify-between group';
            b.querySelector('.font-mono')?.classList.remove('text-[#c5a059]', 'font-semibold');
            b.querySelector('.font-mono')?.classList.add('text-[#a69f91]');
          }
        });

        // Update Content
        towerContentEl.innerHTML = `
          <div class="flex items-center justify-between border-b border-white/[0.08] pb-3 animate-fade-in">
            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">${data.badge}</span>
            <span class="text-xs font-mono text-[#a69f91]">${data.alt}</span>
          </div>
          <h5 class="text-lg font-serif text-[#faf8f5]">${data.title}</h5>
          <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
            ${data.desc}
          </p>
          <div class="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono text-[#a69f91]">
            <div class="bg-white/[0.02] p-2 border border-white/5 rounded-sm">
              <span class="text-[#c5a059] block">Specification</span>
              <span>${data.cap}</span>
            </div>
            <div class="bg-white/[0.02] p-2 border border-white/5 rounded-sm">
              <span class="text-[#c5a059] block">Access Clearance</span>
              <span>${data.access}</span>
            </div>
          </div>
        `;
      });
    });
  }

  // 13.3 Copy Address Button with Tactile Feedback
  const copyBtn = document.querySelector<HTMLButtonElement>('[data-copy-address]');
  const copyLabel = document.getElementById('copy-address-label');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const address = copyBtn.dataset.copyAddress || '301 Mission St, San Francisco, CA 94105';
      navigator.clipboard?.writeText(address).then(() => {
        if (copyLabel) {
          copyLabel.textContent = 'Address Copied!';
          copyBtn.classList.add('text-emerald-400');
          setTimeout(() => {
            copyLabel.textContent = 'Copy Address';
            copyBtn.classList.remove('text-emerald-400');
          }, 2500);
        }
      }).catch(() => {
        if (copyLabel) copyLabel.textContent = '301 Mission St';
      });
    });
  }

  // 13.4 Concierge Desk Form Submission with High-Fidelity Intake Confirmation
  const divisionSelect = document.getElementById('form-division') as HTMLSelectElement | null;
  const conciergeForm = document.getElementById('concierge-inquiry-form') as HTMLFormElement | null;
  const conciergeSuccess = document.getElementById('form-success-banner');
  const tokenRefEl = document.getElementById('success-token-ref');
  const resetBtn = document.getElementById('reset-mandate-form-btn');

  if (conciergeForm) {
    conciergeForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const emailInput = document.getElementById('form-email') as HTMLInputElement | null;
      const phoneInput = document.getElementById('form-phone') as HTMLInputElement | null;
      const messageInput = document.getElementById('form-message') as HTMLTextAreaElement | null;

      const email = emailInput?.value.trim() || '';
      const phone = phoneInput?.value.trim() || 'Not specified';
      const division = divisionSelect?.value || 'General Concierge';
      const message = messageInput?.value.trim() || '';

      const tokenRef = 'BLL-SF-' + Math.floor(100000 + Math.random() * 900000);
      if (tokenRefEl) tokenRefEl.textContent = tokenRef;

      const subject = encodeURIComponent(`[${tokenRef}] Sovereign Mandate: [${division}]`);
      const body = encodeURIComponent(
        `BLACK LABEL SOVEREIGN MANDATE TRANSMISSION\n` +
        `=======================================================\n` +
        `Reference Token: ${tokenRef}\n` +
        `Confidential Email: ${email}\n` +
        `Direct Telephone / Signal: ${phone}\n` +
        `Target Division / Scope: ${division}\n\n` +
        `Mandate Objectives & Scope:\n` +
        `${message}\n\n` +
        `-------------------------------------------------------\n` +
        `Origin Dispatch: Millennium Tower, 301 Mission St, San Francisco\n` +
        `Service Level: Confidential Executive Protocol (< 2 Hr Response SLA)\n`
      );

      // Trigger native email client
      window.location.href = `mailto:concierge@blacklabel.life?subject=${subject}&body=${body}`;

      if (conciergeSuccess) {
        conciergeSuccess.classList.remove('hidden');
        conciergeSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        conciergeForm.reset();
        if (conciergeSuccess) conciergeSuccess.classList.add('hidden');
      });
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}

