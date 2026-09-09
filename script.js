// ── SCROLL PROGRESS BAR ──
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});

// ── ACTIVE NAV HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ── TICKER ──
const tickerItems = [
  { name: 'n8n',           icon: 'https://n8n.io/favicon.ico' },
  { name: 'Docker',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'Linux',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
  { name: 'PostgreSQL',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'Python',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Node.js',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Claude API',    icon: 'https://www.anthropic.com/favicon.ico' },
  { name: 'OpenAI',        icon: 'https://openai.com/favicon.ico' },
  { name: 'Google Sheets', icon: 'https://ssl.gstatic.com/docs/spreadsheets/favicon3.ico' },
  { name: 'Airtable',      icon: 'https://www.airtable.com/favicon.ico' },
  { name: 'Telegram',      icon: 'https://cdn.simpleicons.org/telegram/26A5E4' },
  { name: 'Cloudflare',    icon: 'https://www.cloudflare.com/favicon.ico' },
  { name: 'Microsoft',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg' },
  { name: 'Zapier',        icon: 'https://zapier.com/favicon.ico' },
  { name: 'GitHub',        icon: 'https://cdn.simpleicons.org/github/ffffff' },
  { name: 'Vercel',        icon: 'https://vercel.com/favicon.ico' },
  { name: 'TypeScript',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Notion',        icon: 'https://cdn.simpleicons.org/notion/ffffff' },
  { name: 'Azure',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
  { name: 'ClickUp',       icon: 'https://clickup.com/favicon.ico' },
  { name: 'Jotform',       icon: 'https://www.jotform.com/favicon.ico' },
  { name: 'Tally',         icon: 'https://tally.so/favicon.ico' },
  { name: 'Activepieces',  icon: 'https://www.activepieces.com/favicon.ico' },
  { name: 'PHP',           icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
  { name: 'MySQL',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'Caddy',         icon: 'https://caddyserver.com/resources/images/favicon.png' },
  { name: 'Open WebUI',    icon: 'https://openwebui.com/favicon.png' },
];

function buildTicker() {
  const track = document.getElementById('tickerTrack');
  const single = tickerItems.map(t => `
    <span class="ticker-item">
      <img src="${t.icon}" alt="" onerror="this.style.display='none'" />
      ${t.name}
    </span>
  `).join('');
  track.innerHTML = single + single + single;
}

// ── PROJECTS ──
const projects = [
  {
    id: 'chatplatform',
    title: 'Self-Hosted AI Chat Platform',
    tags: ['Open WebUI', 'Python', 'Node.js', 'SQLite', 'Caddy'],
    nda: true,
    screenshots: [],
    overview: 'Company-wide "ChatGPT" deployed on-premise for a European renewable-energy EPC firm. Multi-provider LLM gateway (OpenAI and Anthropic protocols), per-user request auditing, local speech-to-text, web search integration, and PWA mobile access, all running without Docker or root, on a shared VPS.',
    problem: 'The client needed a private, auditable AI chat platform for internal use without exposing company data to third-party cloud services, and without requiring root access or Docker on the production server.',
    solution: 'Open WebUI deployed via Python venv as a service user with CPU-only torch and cron-based autostart. A custom Node.js + SQLite audit layer sits between the reverse proxy and the LLM gateway, logging every request per user. Caddy handles TLS and path-based routing across chat, API, and audit console endpoints.',
    flow: ['User accesses PWA via Caddy reverse proxy', 'Audit layer logs request (user, tokens, timestamp)', 'LLM gateway routes to OpenAI / Anthropic / local model', 'Response returned and logged', 'Admin views audit console for usage per user'],
    tech: ['Open WebUI', 'Python (venv)', 'Node.js', 'SQLite', 'Caddy', 'faster-whisper', 'Ubuntu VPS', 'cron'],
    challenges: [
      { p: 'No Docker or root access on production server', s: 'Deployed via Python venv as a non-root service user with cron-based autostart and systemd-free operation' },
      { p: 'No visibility into which users were consuming AI tokens', s: 'Built a custom Node.js audit layer between proxy and gateway logging every request with token counts per user' },
      { p: 'Mobile access required without a native app', s: 'Configured PWA manifest and Caddy TLS so staff could install the platform as a home-screen app on phones' },
    ],
    results: ['Live in production for a European EPC company', 'Full per-user audit trail with admin console', 'Zero third-party data exposure, all inference on-premise or via direct API', 'Local speech-to-text at zero API cost via faster-whisper']
  },
  {
    id: 'graphautomation',
    title: 'Microsoft 365 / Graph API Automation Suite',
    tags: ['MS Graph API', 'Python', 'Node.js', 'Excel', 'OneDrive'],
    nda: true,
    screenshots: [],
    overview: 'End-to-end automation suite across a Microsoft 365 tenant: staleness detection on OneNote sections with personalized reminder emails, Excel-as-database operations via Graph workbook API, OneDrive content-hash dedup index across ~95k files, and two-way sync between a web app and live spreadsheets.',
    problem: 'The client had critical data spread across OneNote, Excel, OneDrive, and shared mailboxes with no automated monitoring, deduplication, or sync, all managed manually.',
    solution: 'App-token and delegate access across tenant mailboxes via Microsoft Graph API. HTML mail generation with inline image attachments (CID). Excel operations use logical-row addressing by header name making them layout-proof. OneDrive indexing uses delta queries for incremental updates across 95k+ files.',
    flow: ['Graph API polls OneNote / OneDrive / mailboxes', 'Staleness detection compares timestamps', 'Reminder emails generated with inline images', 'Excel ranges written atomically via workbook API', 'Dedup index updated via delta query'],
    tech: ['Microsoft Graph API', 'Python', 'Node.js', 'Excel (Graph workbook API)', 'OneDrive', 'SharePoint', 'OAuth2'],
    challenges: [
      { p: 'hasAttachments=false trap causing missed inline-only image attachments', s: 'Built custom attachment extraction that checks message body for CID references regardless of the hasAttachments flag' },
      { p: 'Excel row addressing breaking when columns were reordered', s: 'Switched to logical-row addressing by header name making all writes layout-proof' },
      { p: 'Indexing 95k OneDrive files without hammering the API', s: 'Used Graph delta queries for incremental updates, only changed files are re-indexed on each run' },
    ],
    results: ['Automated staleness detection and reminder emails across full tenant', 'Layout-proof Excel sync with atomic range writes', '95k-file OneDrive dedup index with delta-query incremental updates', 'Test-mode flag pattern for safe rollout, all mail redirected to bot inbox until sign-off']
  },
  {
    id: 'financialintel',
    title: 'Document & Financial Intelligence System',
    tags: ['Python', 'LLM API', 'python-docx', 'openpyxl', 'pdftotext'],
    nda: true,
    screenshots: [],
    overview: 'Three interconnected systems: an invoice archive indexer (PDF to JSON knowledge base), a contract-terms watchdog with LLM judge fallback, and a bank reconciliation engine that reconstructs factoring accounts from supplier emails and matches transactions to the cent across multiple banks.',
    problem: 'The client had hundreds of PDF invoices, Word contracts, and multi-bank statements with no automated way to search, validate terms, or reconcile accounts, all done manually and error-prone.',
    solution: 'Invoice indexer: pdftotext extraction to JSON keyed by invoice number with threaded rebuild. Contract watchdog: python-docx full-text extraction with regex marker detection and a self-teaching marker list with LLM judge fallback on miss with strict-JSON verdicts. Bank reconciliation: evidence-chain method across ERP mirror, local indexes, document store, and mailboxes.',
    flow: ['PDF invoices extracted via pdftotext → JSON index', 'Contract terms checked via regex markers', 'LLM judge called on miss (strict-JSON verdict)', 'Bank statements ingested and normalized', 'Factoring accounts reconstructed from supplier emails', 'Transactions matched to the cent via evidence chain'],
    tech: ['Python', 'pdftotext', 'python-docx', 'openpyxl', 'Claude API', 'OpenAI API', 'SQLite', 'Bash'],
    challenges: [
      { p: 'Contract markers varied between document versions', s: 'Built a self-teaching marker list, unknown patterns generate maintainer notes instead of false alarms and are added to the list after review' },
      { p: 'Bank statements from different banks had inconsistent formats', s: 'Built per-bank normalizers with a unified transaction schema for reconciliation' },
      { p: 'Factoring account not visible in ERP', s: 'Reconstructed factoring account from supplier email threads using a multi-source evidence chain' },
    ],
    results: ['Invoice archive searchable by number, date, and amount', 'Contract watchdog running in production with zero false positives', 'Bank reconciliation accurate to the cent across three banks', 'Payroll split engine allocating costs proportionally across job sites from color-coded Excel calendars']
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Voice & Reporting Automation',
    tags: ['Node.js', 'FastAPI', 'Docker', 'faster-whisper', 'Whisper'],
    nda: true,
    screenshots: [],
    overview: 'WhatsApp automation stack handling daily production reports with escalation chains, voice-note transcription via self-hosted Whisper container, photo archiving with GPS/caption/vision-model classification, and meeting transcription via local ffmpeg extraction piped to the Whisper container.',
    problem: 'Client received frequent multilingual voice notes and production reports via WhatsApp and had to manually listen, translate, archive photos, and transcribe meetings, slow and unscalable.',
    solution: 'Node.js handles WhatsApp events and access control. Self-hosted Whisper container accepts base64 audio jobs via REST. Photos are archived with GPS metadata extraction, caption parsing, and vision-model classification. Meeting audio is extracted locally via ffmpeg then SCP-transferred to the Whisper container.',
    flow: ['WhatsApp message received', 'Node.js: access control + message type routing', 'Voice note → Whisper container (base64 REST job)', 'Photo → GPS/caption/vision-model classifier', 'Meeting audio → ffmpeg → SCP → Whisper → task extraction', 'Report or transcript delivered to recipient'],
    tech: ['Node.js', 'Python FastAPI', 'Docker Compose', 'faster-whisper', 'ffmpeg', 'Contabo VPS', 'Telegram (alerts)'],
    challenges: [
      { p: 'ElevenLabs API costs scaled too fast with volume', s: 'Replaced with self-hosted faster-whisper container at zero per-transcription cost' },
      { p: 'Meeting recordings too large to process in memory', s: 'Used ffmpeg to extract audio locally then SCP to Whisper container for processing' },
      { p: 'WhatsApp session disconnecting silently', s: 'Added reconnect logic and Telegram alert on disconnect' },
    ],
    results: ['24/7 on self-hosted VPS, zero manual intervention', 'Voice transcription, photo archiving, and meeting transcription all automated', 'Eliminated recurring cloud STT costs', 'Escalation chains and daily production reports delivered automatically']
  },
  {
    id: 'erpcustomization',
    title: 'ERP & Project Management Customization',
    tags: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Excel'],
    nda: true,
    screenshots: [],
    overview: 'Custom plugin suite for Leantime (PHP/Laravel/Blade/MySQL) including spreadsheet-like data tables at 10k+ row scale, dashboards, drag-and-drop weekly calendar with timezone-correct scheduling, editable grids with write-through queues to Excel, and a sync-status page with data-freshness guards.',
    problem: 'The client\'s Leantime instance lacked the data density, scheduling tools, and Excel sync capabilities needed for managing a large EPC project across multiple job sites and time zones.',
    solution: 'Built a custom plugin suite directly in Leantime\'s PHP/Blade architecture. Excel stays the source of truth with one-way sync, deletion reconciliation via set-diff, and empty-payload guards. Data-freshness semaphores catch silently-dead upstream feeds even when workers report success.',
    flow: ['Excel (source of truth) updated by field teams', 'Sync worker pulls delta and writes to MySQL', 'Leantime UI reads from MySQL via custom plugin', 'Editable grid writes back via write-through queue', 'Sync-status page shows per-feed freshness age'],
    tech: ['PHP', 'Laravel', 'Blade', 'MySQL', 'JavaScript', 'openpyxl', 'Excel (Graph workbook API)'],
    challenges: [
      { p: 'Sync deleting records it should not own', s: 'Scoped deletion reconciliation to only synced records using set-diff, with empty-payload guards to prevent accidental mass-delete' },
      { p: 'Silently-dead upstream feeds reporting success', s: 'Built per-feed "newest record age" semaphores, if no new data arrives within threshold an alert fires regardless of worker exit code' },
      { p: 'Calendar scheduling broken across time zones', s: 'Implemented timezone-correct scheduling in the drag-and-drop calendar using UTC normalization on all writes' },
    ],
    results: ['10k+ row data tables running smoothly in production', 'Excel stays source of truth with safe one-way sync and deletion reconciliation', 'Data-freshness guards catch dead feeds before they cause downstream errors', 'Role-gated pages and dashboards deployed for field and management teams']
  },
  {
    id: 'salesfunnel',
    title: 'AI Sales Funnel Automation',
    tags: ['n8n', 'Claude API', 'MS Graph API', 'OneDrive'],
    nda: true,
    screenshots: [],
    overview: 'Polls Outlook every 10 minutes, classifies emails with Claude AI, creates numbered OneDrive folders, generates pre-filled Word quotes via an AI agent, logs leads to a CRM Excel table, and notifies the sales team via Discord.',
    problem: 'Team was manually checking emails, routing them, creating folders, logging leads, and generating quotes from scratch. Multi-step, error-prone, and slow.',
    solution: 'n8n on self-hosted infrastructure. Claude Haiku handles classification at near-zero cost. AI agent generates Word quotes only when needed. Microsoft Graph API replaces all native n8n Microsoft nodes that had license issues.',
    flow: ['Outlook polled every 10 min', 'Claude Haiku: classify email', 'Extract client data', 'Create OneDrive folder via Graph API', 'AI agent generates Word quote', 'Log lead to CRM Excel', 'Discord notification to reviewer'],
    tech: ['n8n', 'Claude Haiku', 'Claude Sonnet', 'Microsoft Graph API', 'OneDrive', 'PostgreSQL', 'Discord Webhook'],
    challenges: [
      { p: 'Native n8n MS nodes failing with license errors', s: 'Replaced with HTTP + Microsoft Graph API via OAuth2' },
      { p: 'AI costs spiked to $70/day from token overhead', s: 'Switched classification to Claude Haiku (~$0.25/day), reserved Sonnet for document generation only' },
      { p: 'Outlook node silently dropping emails', s: 'Fixed by switching to filtersUI structure with correct message parameter' },
    ],
    results: ['Email to reviewer notification in under 2 minutes', 'Consistent quote numbering, zero human error', 'CRM auto-populated on every qualified lead', 'No per-workflow cloud subscription cost']
  },
  {
    id: 'cookie',
    title: 'Automated Cookie Order System',
    tags: ['Google Apps Script', 'n8n', 'Google Sheets', 'Telegram'],
    nda: false,
    screenshots: ['images/Automated Cookie Order System.png'],
    overview: 'Complete order management system for a local cookie business. Multi-page form logs orders to Google Sheets, calculates totals, sends instant Telegram notifications, and delivers weekly and monthly sales reports automatically.',
    problem: 'Orders were managed manually through chat. Tracking, computing totals, and following up required constant effort with room for missed orders.',
    solution: 'Multi-page form built with Google Apps Script connected to Google Sheets. n8n watches for new rows and triggers Telegram notifications. Separate scheduled workflows send weekly and monthly sales summaries.',
    flow: ['Customer fills multi-page order form', 'Apps Script: compute total + save to Sheets', 'n8n Sheets trigger fires', 'Telegram notification to owner', 'Scheduled: weekly and monthly report via email'],
    tech: ['Google Apps Script', 'Google Sheets', 'Google Drive', 'n8n', 'HTML/CSS/JS', 'Telegram Bot API'],
    challenges: [
      { p: 'Drive images not loading on other browsers', s: 'Set Drive folders to public access' },
      { p: 'Webhook URL expiring with Cloudflare tunnel', s: 'Switched n8n trigger to Google Sheets trigger, removing dependency on a temporary URL' },
      { p: 'Order Again button disabled after submit', s: 'Added reset function to restore form state without page refresh' },
    ],
    results: ['Zero missed orders since deployment', 'Every order auto-logged with timestamp and payment details', 'Instant Telegram alert on every new order', 'Weekly and monthly sales reports sent automatically']
  },
  {
    id: 'server',
    title: 'Self-Hosted Automation Server',
    tags: ['Docker', 'Linux', 'n8n', 'Orange Pi Zero 3', 'Cloudflare'],
    nda: false,
    screenshots: ['images/Self hosted n8n server.png'],
    overview: 'n8n running 24/7 in Docker on an Orange Pi Zero 3 with 1.5GB RAM. Persistent storage keeps workflows running through restarts. Exposed publicly via Cloudflare Tunnel at zero subscription cost.',
    problem: 'Cloud automation platforms require paid plans. Free tiers are restrictive and unstable. Needed full control over data and uptime.',
    solution: 'Deployed n8n in a Docker container on Ubuntu-based Orange Pi Zero 3. Mounted persistent volume for configuration. Set up Cloudflare Tunnel for a stable public URL without port forwarding.',
    flow: ['Browser connects via Cloudflare Tunnel', 'n8n Web Interface', 'Docker container', 'Linux on Orange Pi Zero 3', 'Persistent volume storage'],
    tech: ['Linux (Ubuntu)', 'Docker', 'n8n', 'Cloudflare Tunnel', 'Orange Pi Zero 3'],
    challenges: [
      { p: 'Permission error writing to /home/node/.n8n/config', s: 'Fixed folder permissions on the mounted volume. Deepened understanding of Docker volume ownership.' },
    ],
    results: ['Self-hosted automation server running 24/7', 'Full control over data and workflows', 'Runs on 1.5GB RAM low-power hardware', 'Zero subscription cost']
  },
  {
    id: 'leadcapture',
    title: 'Lead Capture System',
    tags: ['n8n', 'Tally', 'Google Sheets', 'ClickUp', 'Telegram'],
    nda: false,
    screenshots: ['images/Lead capture system.png'],
    overview: 'Tally form submission instantly saves lead data to Google Sheets, creates a follow-up task in ClickUp, and notifies the business owner via Telegram. Entire process runs in seconds with no human involvement.',
    problem: 'Small businesses lose leads because they cannot respond fast enough. Copying form data to a spreadsheet, creating tasks, and notifying the right person manually takes too long.',
    solution: 'n8n webhook listens for Tally form submissions. Data flows to Google Sheets via OAuth2, ClickUp via API Key, and Telegram via Bot API. Runs on self-hosted n8n with no cloud plan required.',
    flow: ['Tally form submitted', 'n8n webhook trigger', 'Save to Google Sheets (OAuth2)', 'Create ClickUp task (API Key)', 'Telegram notification (Bot API)'],
    tech: ['n8n', 'Tally', 'Google Sheets', 'ClickUp', 'Telegram Bot API'],
    challenges: [
      { p: 'Tally webhook not receiving data, URL pointing to wrong environment', s: 'Used test URL during development, switched to production URL on activation' },
      { p: 'ClickUp fields returning undefined due to incorrect node reference', s: 'Used full node reference expression pointing explicitly to the Tally trigger data' },
    ],
    results: ['Zero manual work in managing leads', 'Every inquiry captured instantly on form submission', 'Telegram notification within seconds', 'Follow-up task auto-created in ClickUp for every lead']
  },
];

function buildProjectCards() {
  const carousel = document.getElementById('projectsGrid');
  const cardHtml = projects.map(p => `
    <div class="project-card" data-id="${p.id}">
      <div class="project-thumb">
        ${p.nda ? `<span class="project-thumb-placeholder">🔒 Under NDA</span>` : p.screenshots[0] ? `<img src="${p.screenshots[0]}" alt="${p.title}" />` : `<span class="project-thumb-placeholder">screenshot coming soon</span>`}
      </div>
      <div class="project-card-body">
        <h3>${p.title}</h3>
        <div class="project-card-tags">${p.tags.map(t => `<span class="ptag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
  carousel.innerHTML = `
    <div class="projects-carousel-inner">${cardHtml}</div>
    <div class="projects-carousel-inner" aria-hidden="true">${cardHtml}</div>
  `;
}

// ── MODAL ──
function openModal(id) {
  const p = projects.find(x => x.id === id);
  if (!p) return;

  const screenshotsHtml = (!p.nda && p.screenshots.length)
    ? `<div class="modal-screenshots">${p.screenshots.map(s => `<div class="modal-screenshot"><img src="${s}" alt="" /></div>`).join('')}</div>`
    : '';

  document.getElementById('modalBody').innerHTML = `
    <p class="modal-eyebrow">Case Study</p>
    <h2>${p.title}</h2>
    <hr class="modal-divider" />
    <div class="modal-body-wrap">
      ${screenshotsHtml}
      <div class="modal-section">
        <p class="modal-label">Overview</p>
        <p>${p.overview}</p>
      </div>
    </div>
    <div class="modal-section">
      <p class="modal-label">Problem</p>
      <p>${p.problem}</p>
    </div>
    <div class="modal-section">
      <p class="modal-label">Solution</p>
      <p>${p.solution}</p>
    </div>
    <div class="modal-section">
      <div class="modal-two-col">
        <div>
          <p class="modal-label">System Flow</p>
          <ul class="flow-steps">${p.flow.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>
        <div>
          <p class="modal-label">Technologies</p>
          <div class="tech-row">${p.tech.map(t => `<span class="ptag">${t}</span>`).join('')}</div>
        </div>
      </div>
    </div>
    <div class="modal-section">
      <p class="modal-label">Challenges</p>
      <ul class="challenge-list">
        ${p.challenges.map(c => `<li><span class="prob">Problem:</span> ${c.p}<br><span class="sol">Solution:</span> ${c.s}</li>`).join('')}
      </ul>
    </div>
    <div class="modal-section">
      <p class="modal-label">Results</p>
      <ul class="result-list">${p.results.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

document.getElementById('projectsGrid').addEventListener('click', e => {
  const card = e.target.closest('.project-card');
  if (card) openModal(card.dataset.id);
});

// ── COPY EMAIL TO CLIPBOARD ──
const emailEl = document.querySelector('.contact-email');
if (emailEl) {
  const emailOriginal = emailEl.textContent;
  emailEl.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('edqtorres@gmail.com').then(() => {
      emailEl.textContent = 'Copied!';
      setTimeout(() => { emailEl.textContent = emailOriginal; }, 2000);
    });
  });
}

// ── COPY FOOTER EMAIL ──
const footerEmail = document.querySelector('.footer-links a[href^="mailto"]');
if (footerEmail) {
  const footerOriginal = footerEmail.textContent;
  footerEmail.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('edqtorres@gmail.com').then(() => {
      footerEmail.textContent = 'Copied!';
      setTimeout(() => { footerEmail.textContent = footerOriginal; }, 2000);
    });
  });
}

// ── CAROUSEL BUTTONS ──
document.getElementById('carouselLeft').addEventListener('click', () => {
  document.getElementById('projectsGrid').scrollBy({ left: -320, behavior: 'smooth' });
});
document.getElementById('carouselRight').addEventListener('click', () => {
  document.getElementById('projectsGrid').scrollBy({ left: 320, behavior: 'smooth' });
});

buildTicker();
buildProjectCards();
