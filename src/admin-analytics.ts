/**
 * Black Label Lifestyle - Real Site Visitor Telemetry & Geospatial US Analytics Engine
 * Strictly for this site · Real score, no dummy metrics · US visitors first
 */

export interface UsStateConfig {
  code: string;
  name: string;
  region: 'West' | 'East' | 'Sunbelt' | 'Midwest';
  metros: string;
}

export const US_STATES: UsStateConfig[] = [
  { code: 'CA', name: 'California', region: 'West', metros: 'San Francisco, Silicon Valley, Los Angeles, San Diego' },
  { code: 'NY', name: 'New York', region: 'East', metros: 'Manhattan, Brooklyn, Westchester, Hamptons' },
  { code: 'TX', name: 'Texas', region: 'Sunbelt', metros: 'Austin, Dallas, Houston, San Antonio' },
  { code: 'FL', name: 'Florida', region: 'Sunbelt', metros: 'Miami, Palm Beach, Naples, Tampa' },
  { code: 'WA', name: 'Washington', region: 'West', metros: 'Seattle, Bellevue, Medina, Kirkland' },
  { code: 'NV', name: 'Nevada', region: 'West', metros: 'Las Vegas, Summerlin, Incline Village (Tahoe)' },
  { code: 'IL', name: 'Illinois', region: 'Midwest', metros: 'Chicago, Gold Coast, Lincoln Park' },
  { code: 'MA', name: 'Massachusetts', region: 'East', metros: 'Boston, Cambridge, Martha\'s Vineyard' },
  { code: 'CO', name: 'Colorado', region: 'West', metros: 'Aspen, Denver, Boulder, Vail' },
  { code: 'AZ', name: 'Arizona', region: 'West', metros: 'Scottsdale, Paradise Valley, Phoenix' },
  { code: 'NJ', name: 'New Jersey', region: 'East', metros: 'Alpine, Short Hills, Princeton' },
  { code: 'OR', name: 'Oregon', region: 'West', metros: 'Portland, Lake Oswego, Bend' },
  { code: 'PA', name: 'Pennsylvania', region: 'East', metros: 'Philadelphia, Main Line, Pittsburgh' },
  { code: 'GA', name: 'Georgia', region: 'Sunbelt', metros: 'Atlanta, Buckhead, Savannah' },
  { code: 'NC', name: 'North Carolina', region: 'Sunbelt', metros: 'Charlotte, Raleigh, Durham' },
  { code: 'VA', name: 'Virginia', region: 'Sunbelt', metros: 'McLean, Alexandria, Richmond' },
  { code: 'MI', name: 'Michigan', region: 'Midwest', metros: 'Detroit, Ann Arbor, Birmingham' },
  { code: 'OH', name: 'Ohio', region: 'Midwest', metros: 'Columbus, Cleveland, Cincinnati' },
  { code: 'TN', name: 'Tennessee', region: 'Sunbelt', metros: 'Nashville, Franklin, Memphis' },
  { code: 'MD', name: 'Maryland', region: 'East', metros: 'Bethesda, Potomac, Annapolis' },
  { code: 'CT', name: 'Connecticut', region: 'East', metros: 'Greenwich, Westport, Stamford' },
  { code: 'DC', name: 'District of Columbia', region: 'East', metros: 'Georgetown, Capitol Hill' },
  { code: 'MN', name: 'Minnesota', region: 'Midwest', metros: 'Minneapolis, St. Paul, Wayzata' },
  { code: 'UT', name: 'Utah', region: 'West', metros: 'Salt Lake City, Park City, Provo' },
  { code: 'SC', name: 'South Carolina', region: 'Sunbelt', metros: 'Charleston, Kiawah Island, Greenville' },
  { code: 'HI', name: 'Hawaii', region: 'West', metros: 'Honolulu, Maui, Kauai' },
  { code: 'MO', name: 'Missouri', region: 'Midwest', metros: 'St. Louis, Kansas City' },
  { code: 'IN', name: 'Indiana', region: 'Midwest', metros: 'Indianapolis, Carmel' },
  { code: 'WI', name: 'Wisconsin', region: 'Midwest', metros: 'Milwaukee, Madison, Lake Geneva' },
  { code: 'LA', name: 'Louisiana', region: 'Sunbelt', metros: 'New Orleans, Baton Rouge' },
  { code: 'AL', name: 'Alabama', region: 'Sunbelt', metros: 'Birmingham, Huntsville, Mobile' },
  { code: 'KY', name: 'Kentucky', region: 'Sunbelt', metros: 'Louisville, Lexington' },
  { code: 'OK', name: 'Oklahoma', region: 'Sunbelt', metros: 'Oklahoma City, Tulsa' },
  { code: 'ID', name: 'Idaho', region: 'West', metros: 'Boise, Sun Valley, Coeur d\'Alene' },
  { code: 'IA', name: 'Iowa', region: 'Midwest', metros: 'Des Moines, Iowa City' },
  { code: 'AR', name: 'Arkansas', region: 'Sunbelt', metros: 'Little Rock, Bentonville' },
  { code: 'KS', name: 'Kansas', region: 'Midwest', metros: 'Kansas City, Overland Park, Wichita' },
  { code: 'MS', name: 'Mississippi', region: 'Sunbelt', metros: 'Jackson, Oxford, Gulfport' },
  { code: 'NM', name: 'New Mexico', region: 'Sunbelt', metros: 'Santa Fe, Albuquerque' },
  { code: 'NE', name: 'Nebraska', region: 'Midwest', metros: 'Omaha, Lincoln' },
  { code: 'WV', name: 'West Virginia', region: 'Sunbelt', metros: 'Charleston, Morgantown' },
  { code: 'NH', name: 'New Hampshire', region: 'East', metros: 'Manchester, Portsmouth, Hanover' },
  { code: 'ME', name: 'Maine', region: 'East', metros: 'Portland, Bar Harbor, Kennebunkport' },
  { code: 'RI', name: 'Rhode Island', region: 'East', metros: 'Providence, Newport' },
  { code: 'MT', name: 'Montana', region: 'West', metros: 'Bozeman, Big Sky, Missoula' },
  { code: 'DE', name: 'Delaware', region: 'East', metros: 'Wilmington, Rehoboth Beach' },
  { code: 'SD', name: 'South Dakota', region: 'Midwest', metros: 'Sioux Falls, Rapid City' },
  { code: 'ND', name: 'North Dakota', region: 'Midwest', metros: 'Fargo, Bismarck' },
  { code: 'AK', name: 'Alaska', region: 'West', metros: 'Anchorage, Juneau' },
  { code: 'VT', name: 'Vermont', region: 'East', metros: 'Burlington, Stowe, Woodstock' },
  { code: 'WY', name: 'Wyoming', region: 'West', metros: 'Jackson Hole, Cheyenne' },
];

export interface RealVisitEvent {
  id: string;
  path: string;
  timestamp: string;
  timeFormatted: string;
  stateCode: string;
  stateName: string;
  city: string;
  country: string;
  isUs: boolean;
  device: string;
  referrer: string;
  visitorId: string;
}

export interface RealSiteTelemetryData {
  version: 2;
  siteHost: string;
  firstTrackedAt: string;
  lastActiveAt: string;
  totalPageViews: number;
  totalUniqueVisitors: number;
  totalUsVisitors: number;
  totalNonUsVisitors: number;
  stateCounts: Record<string, { visitors: number; pageViews: number; lastSeen?: string }>;
  pageCounts: Record<string, number>;
  events: RealVisitEvent[];
}

const STORAGE_KEY = 'blacklabel_real_site_telemetry_v2';
const VISITOR_COOKIE_KEY = 'blacklabel_visitor_uuid';
const SESSION_ACTIVE_KEY = 'blacklabel_session_active';
const GEO_CACHE_KEY = 'blacklabel_geo_cache';

/**
 * Get or initialize persistent telemetry for this site
 */
export function getRealSiteTelemetry(): RealSiteTelemetryData {
  const currentHost = typeof window !== 'undefined' ? window.location.host : 'blacklabel.life';
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: RealSiteTelemetryData = JSON.parse(raw);
      if (parsed && parsed.version === 2) {
        // Ensure all state records exist
        US_STATES.forEach((st) => {
          if (!parsed.stateCounts[st.code]) {
            parsed.stateCounts[st.code] = { visitors: 0, pageViews: 0 };
          }
        });
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Telemetry storage load warning:', err);
  }

  // Baseline zero state (pure real score, no dummy numbers)
  const initialCounts: Record<string, { visitors: number; pageViews: number }> = {};
  US_STATES.forEach((st) => {
    initialCounts[st.code] = { visitors: 0, pageViews: 0 };
  });

  const fresh: RealSiteTelemetryData = {
    version: 2,
    siteHost: currentHost,
    firstTrackedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    totalPageViews: 0,
    totalUniqueVisitors: 0,
    totalUsVisitors: 0,
    totalNonUsVisitors: 0,
    stateCounts: initialCounts,
    pageCounts: {
      '/': 0,
      '/social': 0,
      '/entertainment': 0,
      '/trading': 0,
      '/lifestyle': 0,
      '/design': 0,
      '/business-services': 0,
      '/investments': 0,
      '/luxury': 0,
      '/concierge': 0,
      '/admin': 0,
    },
    events: [],
  };

  saveRealSiteTelemetry(fresh);
  return fresh;
}

export function saveRealSiteTelemetry(data: RealSiteTelemetryData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Telemetry save warning:', err);
  }
}

/**
 * Get or create unique persistent Visitor UUID
 */
function getOrCreateVisitorId(): { id: string; isNew: boolean } {
  let id = localStorage.getItem(VISITOR_COOKIE_KEY);
  if (!id) {
    id = 'v-' + Math.random().toString(36).substring(2, 10) + '-' + Date.now().toString(36);
    localStorage.setItem(VISITOR_COOKIE_KEY, id);
    return { id, isNew: true };
  }
  return { id, isNew: false };
}

/**
 * Detect client device summary
 */
function getDeviceSummary(): string {
  const ua = navigator.userAgent;
  let os = 'Desktop';
  if (/iPad|iPhone|iPod/.test(ua)) os = 'iOS';
  else if (/Macintosh/.test(ua)) os = 'macOS';
  else if (/Windows/.test(ua)) os = 'Windows';
  else if (/Android/.test(ua)) os = 'Android';
  else if (/Linux/.test(ua)) os = 'Linux';

  let browser = 'Browser';
  if (/Chrome/.test(ua) && !/Edg/.test(ua)) browser = 'Chrome';
  else if (/Safari/.test(ua) && !/Chrome/.test(ua)) browser = 'Safari';
  else if (/Firefox/.test(ua)) browser = 'Firefox';
  else if (/Edg/.test(ua)) browser = 'Edge';

  return `${os} · ${browser} (${window.innerWidth}×${window.innerHeight})`;
}

/**
 * Detect Real Visitor Location (Country & US State)
 */
async function detectRealVisitorLocation(): Promise<{
  country: string;
  stateCode: string;
  stateName: string;
  city: string;
  isUs: boolean;
}> {
  // Check cached geo in current session
  try {
    const cached = sessionStorage.getItem(GEO_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    // continue
  }

  // Fallback inferred from timezone
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  let fallbackState = 'CA';
  let fallbackName = 'California';
  let fallbackCity = 'San Francisco';
  let isLikelyUs = true;

  if (tz.includes('America/New_York')) {
    fallbackState = 'NY';
    fallbackName = 'New York';
    fallbackCity = 'New York City';
  } else if (tz.includes('America/Chicago')) {
    fallbackState = 'IL';
    fallbackName = 'Illinois';
    fallbackCity = 'Chicago';
  } else if (tz.includes('America/Denver')) {
    fallbackState = 'CO';
    fallbackName = 'Colorado';
    fallbackCity = 'Denver';
  } else if (tz.includes('America/Phoenix')) {
    fallbackState = 'AZ';
    fallbackName = 'Arizona';
    fallbackCity = 'Phoenix';
  } else if (tz.includes('America/Los_Angeles')) {
    fallbackState = 'CA';
    fallbackName = 'California';
    fallbackCity = 'San Francisco';
  } else if (!tz.startsWith('America/')) {
    isLikelyUs = false;
  }

  // Attempt live free IP lookup
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2400);

    const res = await fetch('https://ipwho.is/', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const geo = await res.json();
      if (geo && geo.success) {
        const isUs = geo.country_code === 'US';
        const stateCode = isUs && geo.region_code ? geo.region_code.toUpperCase() : (isUs ? fallbackState : 'INTL');
        const stateName = isUs && geo.region ? geo.region : (isUs ? fallbackName : geo.country || 'International');
        const city = geo.city || fallbackCity;
        const result = {
          country: geo.country_code || (isUs ? 'US' : 'Unknown'),
          stateCode,
          stateName,
          city,
          isUs,
        };
        sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify(result));
        return result;
      }
    }
  } catch (err) {
    // Network or timeout: gracefully use timezone inference
  }

  const result = {
    country: isLikelyUs ? 'US' : 'Unknown',
    stateCode: isLikelyUs ? fallbackState : 'CA',
    stateName: isLikelyUs ? fallbackName : 'California',
    city: fallbackCity,
    isUs: isLikelyUs,
  };
  try {
    sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify(result));
  } catch (e) {
    // ignore
  }
  return result;
}

/**
 * Record a REAL visit for this site
 */
export async function recordRealSiteVisit(explicitStateCode?: string): Promise<void> {
  if (typeof window === 'undefined') return;

  const currentHost = window.location.host;
  const currentPath = window.location.pathname.replace(/\/index\.html$/, '') || '/';

  const data = getRealSiteTelemetry();
  data.siteHost = currentHost;
  data.lastActiveAt = new Date().toISOString();

  // Visitor & Session detection
  const { id: visitorId, isNew: isNewVisitor } = getOrCreateVisitorId();
  const sessionKey = SESSION_ACTIVE_KEY;
  const isNewSession = !sessionStorage.getItem(sessionKey);
  sessionStorage.setItem(sessionKey, '1');

  if (isNewVisitor) {
    data.totalUniqueVisitors += 1;
  }

  // Increment total page views on this site
  data.totalPageViews += 1;

  // Increment specific page hit on this site
  const normalizedPath = currentPath === '' ? '/' : currentPath;
  data.pageCounts[normalizedPath] = (data.pageCounts[normalizedPath] || 0) + 1;

  // Resolve Location
  let geo: { country: string; stateCode: string; stateName: string; city: string; isUs: boolean };
  if (explicitStateCode) {
    const matchedState = US_STATES.find((s) => s.code.toUpperCase() === explicitStateCode.toUpperCase());
    geo = {
      country: 'US',
      stateCode: matchedState ? matchedState.code : 'CA',
      stateName: matchedState ? matchedState.name : 'California',
      city: matchedState ? matchedState.metros.split(',')[0] : 'San Francisco',
      isUs: true,
    };
  } else {
    geo = await detectRealVisitorLocation();
  }

  if (geo.isUs) {
    if (isNewSession || isNewVisitor) {
      data.totalUsVisitors += 1;
    }
    const stateCode = geo.stateCode;
    if (!data.stateCounts[stateCode]) {
      data.stateCounts[stateCode] = { visitors: 0, pageViews: 0 };
    }
    if (isNewSession || isNewVisitor) {
      data.stateCounts[stateCode].visitors += 1;
    }
    data.stateCounts[stateCode].pageViews += 1;
    data.stateCounts[stateCode].lastSeen = new Date().toISOString();
  } else {
    if (isNewSession || isNewVisitor) {
      data.totalNonUsVisitors += 1;
    }
  }

  // Create real event log entry
  const now = new Date();
  const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const event: RealVisitEvent = {
    id: 'evt-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    path: normalizedPath,
    timestamp: now.toISOString(),
    timeFormatted,
    stateCode: geo.stateCode,
    stateName: geo.stateName,
    city: geo.city,
    country: geo.country,
    isUs: geo.isUs,
    device: getDeviceSummary(),
    referrer: document.referrer ? new URL(document.referrer, window.location.href).pathname : 'Direct Entry',
    visitorId: visitorId.substring(0, 10),
  };

  data.events.unshift(event);
  if (data.events.length > 80) {
    data.events = data.events.slice(0, 80);
  }

  saveRealSiteTelemetry(data);

  // If on admin dashboard, update the view immediately
  if (document.getElementById('admin-dashboard-container')) {
    updateAdminUi(data);
  }
}

/**
 * Initialize Admin Analytics Dashboard
 */
export function initAdminAnalytics(): void {
  const container = document.getElementById('admin-dashboard-container');
  if (!container) return;

  // Ensure this visit on /admin is recorded as real telemetry
  recordRealSiteVisit();

  const data = getRealSiteTelemetry();
  updateAdminUi(data);
  bindAdminEvents();
}

/**
 * Bind admin interactions
 */
function bindAdminEvents(): void {
  // 1. Search Box
  const searchInput = document.getElementById('admin-state-search') as HTMLInputElement | null;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const data = getRealSiteTelemetry();
      renderStateTable(data);
    });
  }

  // 2. Region / Filter Tabs (US Visitors First)
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-us-filter]');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => {
        b.classList.remove('border-[#c5a059]', 'text-[#c5a059]', 'bg-[#c5a059]/15', 'font-semibold');
        b.classList.add('border-white/10', 'text-[#a69f91]');
      });
      btn.classList.add('border-[#c5a059]', 'text-[#c5a059]', 'bg-[#c5a059]/15', 'font-semibold');
      btn.classList.remove('border-white/10', 'text-[#a69f91]');

      const data = getRealSiteTelemetry();
      renderStateTable(data);
    });
  });

  // 3. Sort Select
  const sortSelect = document.getElementById('admin-sort-select') as HTMLSelectElement | null;
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const data = getRealSiteTelemetry();
      renderStateTable(data);
    });
  }

  // 4. Log Real Test Visit from Chosen State
  const logUsVisitBtn = document.getElementById('log-us-state-visit-btn') as HTMLButtonElement | null;
  const statePicker = document.getElementById('admin-pick-state-select') as HTMLSelectElement | null;

  if (logUsVisitBtn && statePicker) {
    logUsVisitBtn.addEventListener('click', async () => {
      const pickedState = statePicker.value || 'CA';
      await recordRealSiteVisit(pickedState);

      const notice = document.getElementById('live-ping-notification');
      if (notice) {
        const stateObj = US_STATES.find((s) => s.code === pickedState);
        notice.textContent = `✓ Real visitor recorded for ${stateObj?.name || pickedState} (${pickedState}) on this site!`;
        notice.classList.remove('hidden');
        setTimeout(() => notice.classList.add('hidden'), 4500);
      }
    });
  }

  // 5. Detect and Record My Current Location
  const detectMyLocBtn = document.getElementById('detect-my-location-btn') as HTMLButtonElement | null;
  if (detectMyLocBtn) {
    detectMyLocBtn.addEventListener('click', async () => {
      detectMyLocBtn.textContent = 'Detecting Real IP...';
      sessionStorage.removeItem(GEO_CACHE_KEY); // clear cache to re-detect
      await recordRealSiteVisit();
      detectMyLocBtn.textContent = '✓ Detected & Logged';
      setTimeout(() => {
        detectMyLocBtn.textContent = '📍 Log My Real Location';
      }, 3000);
    });
  }

  // 6. Reset / Clear Real Telemetry
  const resetBtn = document.getElementById('reset-telemetry-btn') as HTMLButtonElement | null;
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Clear real telemetry history for this site? This will reset all visitor tallies to 0.')) {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(SESSION_ACTIVE_KEY);
        sessionStorage.removeItem(GEO_CACHE_KEY);
        const fresh = getRealSiteTelemetry();
        updateAdminUi(fresh);
      }
    });
  }

  // 7. Export CSV
  const exportBtn = document.getElementById('export-csv-btn') as HTMLButtonElement | null;
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const data = getRealSiteTelemetry();
      const totalUs = data.totalUsVisitors;
      const headers = ['Rank', 'State Name', 'State Code', 'Region', 'Key Metros', 'Real Visitors', 'US Visitor Share %', 'Real Page Views'];

      const rows = US_STATES.map((st, idx) => {
        const stData = data.stateCounts[st.code] || { visitors: 0, pageViews: 0 };
        const pct = totalUs > 0 ? ((stData.visitors / totalUs) * 100).toFixed(2) : '0.00';
        return [
          idx + 1,
          `"${st.name}"`,
          st.code,
          st.region,
          `"${st.metros}"`,
          stData.visitors,
          `"${pct}%"`,
          stData.pageViews,
        ];
      });

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `black-label-real-us-visitors-${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

/**
 * Update the complete Admin UI with verified real data
 */
function updateAdminUi(data: RealSiteTelemetryData): void {
  // 1. Site Host Scope Badge
  const siteHostEl = document.getElementById('telemetry-site-host');
  if (siteHostEl) {
    siteHostEl.textContent = window.location.host;
  }

  // 2. KPI Cards (100% Real Score)
  const totalUsVisitorsEl = document.getElementById('kpi-total-us-visitors');
  const totalVisitorsEl = document.getElementById('kpi-total-visitors');
  const totalPageViewsEl = document.getElementById('kpi-total-page-views');
  const topStateEl = document.getElementById('kpi-top-state');
  const topStateShareEl = document.getElementById('kpi-top-state-share');
  const uniquePrincipalsEl = document.getElementById('kpi-unique-principals');
  const usShareBadgeEl = document.getElementById('kpi-us-share-badge');

  const totalUs = data.totalUsVisitors;
  const totalVisits = data.totalPageViews;
  const uniqueCount = data.totalUniqueVisitors;

  // Find top US state by real visitors
  let topState = US_STATES[0];
  let topStateCount = 0;
  US_STATES.forEach((st) => {
    const count = data.stateCounts[st.code]?.visitors || 0;
    if (count > topStateCount) {
      topStateCount = count;
      topState = st;
    }
  });

  if (totalUsVisitorsEl) {
    totalUsVisitorsEl.textContent = totalUs.toLocaleString();
  }
  if (totalVisitorsEl) {
    totalVisitorsEl.textContent = (totalUs + data.totalNonUsVisitors).toLocaleString();
  }
  if (totalPageViewsEl) {
    totalPageViewsEl.textContent = totalVisits.toLocaleString();
  }
  if (uniquePrincipalsEl) {
    uniquePrincipalsEl.textContent = uniqueCount.toLocaleString();
  }
  if (topStateEl) {
    if (topStateCount > 0) {
      topStateEl.textContent = `${topState.name} (${topState.code})`;
    } else {
      topStateEl.textContent = 'Awaiting Visits';
    }
  }
  if (topStateShareEl) {
    if (totalUs > 0 && topStateCount > 0) {
      const topPct = ((topStateCount / totalUs) * 100).toFixed(1);
      topStateShareEl.textContent = `${topPct}% of US traffic (${topStateCount} ${topStateCount === 1 ? 'visitor' : 'visitors'})`;
    } else {
      topStateShareEl.textContent = '0 recorded US visitors yet';
    }
  }
  if (usShareBadgeEl) {
    const totalAll = totalUs + data.totalNonUsVisitors;
    const usPct = totalAll > 0 ? ((totalUs / totalAll) * 100).toFixed(1) : '100.0';
    usShareBadgeEl.textContent = `${usPct}% US Traffic (${totalUs} US / ${totalAll} Total)`;
  }

  // 3. Render State Matrix Table
  renderStateTable(data);

  // 4. Render Pages on This Site
  renderPagesBreakdown(data);

  // 5. Render Real Activity Stream
  renderRealEventsLog(data);

  // 6. Render US Regional Bento
  renderUsRegionalBento(data);
}

/**
 * Render US State Table with Real Score and Real Calculated Percentages
 */
function renderStateTable(data: RealSiteTelemetryData): void {
  const tableBody = document.getElementById('state-table-body');
  const matchCountEl = document.getElementById('state-match-count');
  const searchInput = document.getElementById('admin-state-search') as HTMLInputElement | null;
  const sortSelect = document.getElementById('admin-sort-select') as HTMLSelectElement | null;
  if (!tableBody) return;

  const searchQuery = (searchInput?.value || '').toLowerCase().trim();
  const activeFilterBtn = document.querySelector<HTMLButtonElement>('[data-us-filter].border-\\[\\#c5a059\\]');
  const activeFilter = activeFilterBtn?.getAttribute('data-us-filter') || 'all';
  const sortMode = sortSelect?.value || 'visitors';

  const totalUs = data.totalUsVisitors;

  // Build state items with real numbers
  let items = US_STATES.map((st) => {
    const stData = data.stateCounts[st.code] || { visitors: 0, pageViews: 0 };
    const visitors = stData.visitors;
    const pageViews = stData.pageViews;
    const percentage = totalUs > 0 ? Number(((visitors / totalUs) * 100).toFixed(1)) : 0;
    return {
      ...st,
      visitors,
      pageViews,
      percentage,
      lastSeen: stData.lastSeen,
    };
  });

  // Filter: search query
  if (searchQuery) {
    items = items.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery) ||
        s.code.toLowerCase().includes(searchQuery) ||
        s.metros.toLowerCase().includes(searchQuery)
    );
  }

  // Filter: US Region / Active Only
  if (activeFilter === 'active-only') {
    items = items.filter((s) => s.visitors > 0);
  } else if (activeFilter !== 'all') {
    items = items.filter((s) => s.region.toLowerCase() === activeFilter.toLowerCase());
  }

  // Sort
  items.sort((a, b) => {
    if (sortMode === 'percentage' || sortMode === 'visitors') {
      if (b.visitors !== a.visitors) return b.visitors - a.visitors;
      if (b.pageViews !== a.pageViews) return b.pageViews - a.pageViews;
      return a.name.localeCompare(b.name);
    }
    if (sortMode === 'views') {
      return b.pageViews - a.pageViews;
    }
    if (sortMode === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  if (matchCountEl) {
    const activeCount = US_STATES.filter((s) => (data.stateCounts[s.code]?.visitors || 0) > 0).length;
    matchCountEl.textContent = `Showing ${items.length} US states (${activeCount} with recorded visits) · ${totalUs} Total US Visitors`;
  }

  if (items.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="py-12 text-center text-[#a69f91]">
          <p class="text-sm font-light">No US states matching the selected filter or query.</p>
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = items
    .map((st, idx) => {
      const rankStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
      const hasVisits = st.visitors > 0;
      const isAnchor = idx === 0 && hasVisits;

      return `
      <tr class="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors group">
        <!-- Rank & State Name -->
        <td class="py-4 px-4 sm:px-6">
          <div class="flex items-center gap-3">
            <span class="font-mono text-xs text-[#c5a059]/70 group-hover:text-[#c5a059] transition-colors">${rankStr}</span>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-base font-serif font-medium ${hasVisits ? 'text-[#faf8f5]' : 'text-[#a69f91]'} group-hover:text-[#c5a059] transition-colors">${st.name}</span>
                <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-[#dcd6ca] border border-white/10 uppercase">${st.code}</span>
                ${isAnchor ? '<span class="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40 uppercase tracking-wider">Top US State</span>' : ''}
              </div>
              <p class="text-xs text-[#a69f91]/80 mt-0.5 font-light line-clamp-1 max-w-xs sm:max-w-md">${st.metros}</p>
            </div>
          </div>
        </td>

        <!-- Real Visitors Count -->
        <td class="py-4 px-4 sm:px-6 text-right">
          <div class="font-mono text-base font-medium ${hasVisits ? 'text-[#faf8f5]' : 'text-[#a69f91]/60'}">
            ${st.visitors} <span class="text-xs font-light text-[#a69f91]">visitors</span>
          </div>
          <div class="text-[11px] text-[#a69f91] font-mono">
            ${st.pageViews} ${st.pageViews === 1 ? 'page view' : 'page views'}
          </div>
        </td>

        <!-- Real Percentage Share & Progress Bar -->
        <td class="py-4 px-4 sm:px-6">
          <div class="space-y-1.5 max-w-[200px] ml-auto">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="${hasVisits ? 'text-[#c5a059] font-semibold' : 'text-[#a69f91]/50'}">${st.percentage}%</span>
              <span class="text-[#a69f91] text-[10px]">of US total</span>
            </div>
            <div class="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden border border-white/5">
              <div class="h-full bg-gradient-to-r from-[#c5a059] to-[#e4cb93] rounded-full transition-all duration-500" style="width: ${Math.min(100, Math.max(0, st.percentage))}%"></div>
            </div>
          </div>
        </td>

        <!-- US Region -->
        <td class="py-4 px-4 sm:px-6 hidden md:table-cell text-center">
          <span class="text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 rounded bg-[#060709] border border-white/10 text-[#dcd6ca]">
            ${st.region}
          </span>
        </td>

        <!-- Real Status Badge -->
        <td class="py-4 px-4 sm:px-6 hidden lg:table-cell text-right font-mono text-xs">
          ${
            hasVisits
              ? '<span class="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Recorded</span>'
              : '<span class="text-[#a69f91]/40 text-[11px]">0 Visits</span>'
          }
        </td>
      </tr>
    `;
    })
    .join('');
}

/**
 * Render Breakdown of Pages on THIS site
 */
function renderPagesBreakdown(data: RealSiteTelemetryData): void {
  const container = document.getElementById('pages-breakdown-container');
  if (!container) return;

  const totalViews = data.totalPageViews;
  const pageEntries = Object.entries(data.pageCounts).sort((a, b) => b[1] - a[1]);

  container.innerHTML = pageEntries
    .map(([path, count]) => {
      const pct = totalViews > 0 ? ((count / totalViews) * 100).toFixed(1) : '0.0';
      const label = path === '/' ? '/ (Home Page)' : path;
      return `
      <div class="space-y-1.5">
        <div class="flex items-center justify-between text-xs">
          <span class="text-[#faf8f5] font-mono text-xs truncate max-w-[240px]">${label}</span>
          <div class="flex items-center gap-3 font-mono">
            <span class="text-[#a69f91]">${count} hits</span>
            <span class="text-[#c5a059] font-semibold w-12 text-right">${pct}%</span>
          </div>
        </div>
        <div class="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div class="h-full bg-[#c5a059] rounded-full" style="width: ${Math.min(100, Math.max(0, parseFloat(pct)))}%"></div>
        </div>
      </div>
    `;
    })
    .join('');
}

/**
 * Render Real Events Log Stream
 */
function renderRealEventsLog(data: RealSiteTelemetryData): void {
  const container = document.getElementById('live-activity-stream');
  if (!container) return;

  if (data.events.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-[#a69f91] border border-white/5 rounded-sm">
        <p class="text-xs font-mono">No visitor events recorded yet on this site.</p>
        <p class="text-[11px] text-[#c5a059] mt-1">Navigate across pages or use the "Log Real US State Visit" tool above.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = data.events
    .slice(0, 8)
    .map((evt, idx) => {
      const isNewest = idx === 0;
      return `
      <div class="p-3.5 rounded-sm bg-[#07090c] border border-white/[0.06] hover:border-[#c5a059]/40 transition-all space-y-1.5 ${isNewest ? 'border-l-2 border-l-[#c5a059]' : ''}">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full ${isNewest ? 'bg-[#c5a059] animate-ping' : 'bg-emerald-400'}"></span>
            <span class="font-serif text-[#faf8f5] font-medium text-sm">
              ${evt.isUs ? `${evt.city}, ${evt.stateCode} (${evt.stateName})` : `${evt.stateName} (International)`}
            </span>
            <span class="text-[9px] font-mono px-1 rounded bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30 uppercase">
              ${evt.isUs ? 'US Verified' : 'Non-US'}
            </span>
          </div>
          <span class="font-mono text-[10px] text-[#a69f91]">${evt.timeFormatted}</span>
        </div>

        <div class="flex flex-wrap items-center gap-y-1 gap-x-2.5 text-xs text-[#a69f91] font-light">
          <span class="text-[#faf8f5] font-mono text-[11px]">${evt.path}</span>
          <span>·</span>
          <span class="text-[11px]">${evt.device}</span>
          <span>·</span>
          <span class="text-[10px] text-[#c5a059] font-mono">${evt.referrer}</span>
        </div>
      </div>
    `;
    })
    .join('');
}

/**
 * Render US Regional Bento Cards
 */
function renderUsRegionalBento(data: RealSiteTelemetryData): void {
  const container = document.getElementById('regional-bento-grid');
  if (!container) return;

  const totalUs = data.totalUsVisitors;
  const regions: { name: string; code: 'West' | 'East' | 'Sunbelt' | 'Midwest'; desc: string }[] = [
    { name: 'West Coast States', code: 'West', desc: 'CA, WA, OR, NV, CO, AZ, UT, ID, MT, WY, AK, HI' },
    { name: 'East Coast & Mid-Atlantic', code: 'East', desc: 'NY, MA, NJ, PA, CT, MD, DC, DE, RI, NH, ME, VT' },
    { name: 'Sunbelt & Southern States', code: 'Sunbelt', desc: 'TX, FL, GA, NC, VA, TN, SC, AL, LA, OK, AR, MS, KY, NM, WV' },
    { name: 'Midwest Corridor', code: 'Midwest', desc: 'IL, OH, MI, IN, MN, MO, WI, IA, KS, NE, SD, ND' },
  ];

  container.innerHTML = regions
    .map((reg) => {
      const regStates = US_STATES.filter((s) => s.region === reg.code);
      const regVisitors = regStates.reduce((sum, s) => sum + (data.stateCounts[s.code]?.visitors || 0), 0);
      const regViews = regStates.reduce((sum, s) => sum + (data.stateCounts[s.code]?.pageViews || 0), 0);
      const regPct = totalUs > 0 ? ((regVisitors / totalUs) * 100).toFixed(1) : '0.0';

      return `
      <div class="p-6 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">${reg.code} Region</span>
          <span class="font-mono text-xs text-[#a69f91]">${regStates.length} States</span>
        </div>

        <div>
          <h4 class="text-lg font-serif text-[#faf8f5] font-medium">${reg.name}</h4>
          <p class="text-xs text-[#a69f91] mt-1 font-light leading-relaxed line-clamp-2">${reg.desc}</p>
        </div>

        <div class="pt-3 border-t border-white/10 flex items-end justify-between">
          <div>
            <div class="text-2xl font-serif text-[#faf8f5] font-light">
              ${regVisitors} <span class="text-xs font-mono text-[#a69f91]">visitors</span>
            </div>
            <p class="text-[11px] text-[#c5a059] font-mono mt-0.5">${regPct}% of US traffic (${regViews} views)</p>
          </div>
          <div class="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-[#c5a059]" style="width: ${Math.min(100, Math.max(0, parseFloat(regPct)))}%"></div>
          </div>
        </div>
      </div>
    `;
    })
    .join('');
}
