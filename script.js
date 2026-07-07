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
    id: 'whatsapp',
    title: 'WhatsApp Voice Automation System',
    tags: ['Node.js', 'FastAPI', 'Docker', 'faster-whisper'],
    nda: true,
    screenshots: ['images/WhatsApp Voice Automation System.png'],
    overview: 'Automated WhatsApp bot that receives voice notes, transcribes them with AI, detects the language, translates, and replies. Zero manual steps. Runs on a Contabo VPS with 4 independent Docker microservices.',
    problem: 'Client received frequent multilingual voice notes and had to manually listen and translate each one. Slow and unscalable.',
    solution: 'Node.js handles WhatsApp events and access control. Python FastAPI microservices handle transcription, language detection, and translation independently. Migrated from ElevenLabs cloud STT to locally hosted faster-whisper to cut per-call costs to zero.',
    flow: ['WhatsApp voice note received', 'Node.js: access control + routing', 'FastAPI: transcription (faster-whisper)', 'FastAPI: language detection', 'FastAPI: translation via MarianMT', 'Reply sent back via WhatsApp'],
    tech: ['Node.js', 'Python FastAPI', 'Docker Compose', 'faster-whisper', 'MarianMT', 'Contabo VPS', 'Telegram (alerts)'],
    challenges: [
      { p: 'ElevenLabs API costs scaled too fast with volume', s: 'Replaced with locally hosted faster-whisper, zero per-transcription cost' },
      { p: 'Unsupported language pairs in direct translation', s: 'Implemented pivot translation via English using MarianMT models' },
      { p: 'WhatsApp session disconnecting silently', s: 'Added reconnect logic and Telegram alert on disconnect' },
    ],
    results: ['24/7 on self-hosted VPS, zero manual intervention', 'Eliminated recurring cloud STT costs', 'Rate limiting and whitelist prevent abuse', 'Admin panel for user management and live job monitoring']
  },
  {
    id: 'salesfunnel',
    title: 'AI Sales Funnel Automation',
    tags: ['n8n', 'Claude API', 'MS Graph API', 'OneDrive'],
    nda: true,
    screenshots: ['images/AI Sales Funnel Automation.png'],
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
    id: 'appointment',
    title: 'Automated Appointment Booking System',
    tags: ['n8n', 'Jotform', 'Airtable', 'Telegram', 'Email'],
    nda: false,
    screenshots: ['images/Automated Appointment Booking System.png'],
    overview: 'Jotform submission generates a unique Booking ID, stores the record in Airtable, sends an admin Telegram alert, emails the customer a confirmation, and runs a daily reminder workflow that prevents duplicate sends.',
    problem: 'Appointments managed manually through forms and spreadsheets. No reminder process. Bookings had to be checked manually before each date.',
    solution: 'Jotform connects to n8n via webhook. JavaScript transforms data and generates the Booking ID. A second scheduled workflow queries upcoming appointments, sends reminders, and flips the reminder status field to prevent resends.',
    flow: ['Customer fills Jotform', 'n8n webhook: data transform + Booking ID', 'Airtable: create record', 'Telegram: admin alert', 'Email: customer confirmation', 'Daily: reminder check and status update'],
    tech: ['n8n', 'Jotform', 'Airtable', 'Telegram Bot API', 'Email', 'JavaScript', 'Cron'],
    challenges: [
      { p: 'Jotform date/time values hard to compare in automation logic', s: 'Converted to clean formats using JavaScript inside n8n' },
      { p: 'Airtable output nested, fields inaccessible in later nodes', s: 'Reworked workflow to process each record individually' },
      { p: 'Reminder records not updating correctly', s: 'Switched to Booking ID matching to update Reminder Status reliably' },
    ],
    results: ['Full booking and reminder automation in production', 'Instant Telegram alerts and customer email confirmations', 'Next-day automated reminders', 'Duplicate reminders prevented via status flag']
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
      ${p.nda ? '<span class="project-nda">NDA</span>' : ''}
      <div class="project-thumb">
        ${p.screenshots[0]
          ? `<img src="${p.screenshots[0]}" alt="${p.title}" />`
          : `<span class="project-thumb-placeholder">screenshot coming soon</span>`}
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

  const screenshotsHtml = p.screenshots.length
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

// ── INIT ──
buildTicker();
buildProjectCards();

// ── COPY EMAIL TO CLIPBOARD ──
const emailEl = document.querySelector('.contact-email');
if (emailEl) {
  emailEl.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('edqtorres@gmail.com').then(() => {
      const original = emailEl.textContent;
      emailEl.textContent = 'Copied!';
      setTimeout(() => { emailEl.textContent = original; }, 2000);
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
