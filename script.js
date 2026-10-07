const SITE_CONFIG = {
  instagramHandle: "@socialbygeorge",
  instagramUrl: "https://www.instagram.com/socialbygeorge/"
};

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

siteNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const toast = document.querySelector('.toast');
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

async function openInstagramWithKeyword(keyword = 'SOCIAL') {
  try {
    await navigator.clipboard.writeText(keyword);
    showToast(`Copied “${keyword}” — paste it into your Instagram DM.`);
  } catch {
    showToast(`DM ${SITE_CONFIG.instagramHandle} with “${keyword}”.`);
  }
  window.open(SITE_CONFIG.instagramUrl, '_blank', 'noopener,noreferrer');
}

document.querySelectorAll('.instagram-open').forEach(button => {
  button.addEventListener('click', () => openInstagramWithKeyword(button.dataset.copy || 'SOCIAL'));
});

const projects = {
  hair: {
    title: 'Hair Salon Concept',
    image: 'assets/hair-concept.png',
    description: 'A content direction designed to make a salon feel premium, trustworthy and booking-focused.',
    points: ['Transformation-led Reels', 'Expert haircare content', 'Salon experience storytelling', 'Clear booking calls to action']
  },
  nails: {
    title: 'Nail Tech Concept',
    image: 'assets/nail-concept.png',
    description: 'A polished social presence that sells the work, the personality and the full appointment experience.',
    points: ['Results and close-ups', 'BIAB and aftercare education', 'Behind-the-scenes personality', 'Booking-focused content']
  },
  reels: {
    title: 'Reel Strategy',
    image: 'assets/reel-ideas.png',
    description: 'A practical content system that turns everyday moments in a beauty business into short-form video ideas.',
    points: ['Before and after', 'Behind the scenes', 'Client education', 'Day-in-the-life', 'The client experience']
  }
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('project-title');
const modalImage = document.getElementById('project-image');
const modalDescription = document.getElementById('project-description');
const modalPoints = document.getElementById('project-points');

document.querySelectorAll('.portfolio-card').forEach(card => {
  card.querySelector('button').addEventListener('click', () => {
    const project = projects[card.dataset.project];
    if (!project) return;
    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalImage.alt = `${project.title} by Social By George`;
    modalDescription.textContent = project.description;
    modalPoints.innerHTML = project.points.map(point => `<li>${point}</li>`).join('');
    modal.showModal();
  });
});

document.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
document.querySelector('.modal-contact')?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', (event) => {
  const rect = modal.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) modal.close();
});
