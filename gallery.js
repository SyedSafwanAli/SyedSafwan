const portfolioData = [
  // 🎨 Design (6)
  { category: 'design', title: 'Corporate Website UI Design', client: 'Tech Corporation', tech: 'Figma, Adobe XD', id: 1 },
  { category: 'design', title: 'Landing Page UI', client: 'Startup Company', tech: 'Figma', id: 2 },
  { category: 'design', title: 'E-Learning Dashboard UI', client: 'EdTech Platform', tech: 'Sketch, Figma', id: 3 },
  { category: 'design', title: 'Mobile Banking UI/UX', client: 'Fintech Startup', tech: 'Figma', id: 4 },
  { category: 'design', title: 'Portfolio Website Design', client: 'Freelancer Project', tech: 'Adobe XD', id: 5 },
  { category: 'design', title: 'Restaurant Website UI', client: 'Food Business', tech: 'Figma, Photoshop', id: 6 },

  // 🏷️ Branding (6)
  { category: 'branding', title: 'Logo Design', client: 'Startup Brand', tech: 'Illustrator', id: 7 },
  { category: 'branding', title: 'Business Card & Identity', client: 'Consultancy Firm', tech: 'Photoshop, Illustrator', id: 8 },
  { category: 'branding', title: 'Restaurant Logo & Menu Design', client: 'Food Chain', tech: 'Illustrator, Photoshop', id: 9 },
  { category: 'branding', title: 'Corporate Rebranding Kit', client: 'Enterprise Client', tech: 'Illustrator, InDesign', id: 10 },
  { category: 'branding', title: 'Product Packaging Design', client: 'Retail Brand', tech: 'Illustrator, Photoshop', id: 11 },
  { category: 'branding', title: 'Event Identity & Logo', client: 'Conference Organizer', tech: 'Illustrator', id: 12 },

  // 📢 Marketing (6)
  { category: 'marketing', title: 'Social Media Banner Ads', client: 'Retail Brand', tech: 'Photoshop, Canva', id: 13 },
  { category: 'marketing', title: 'Instagram Post Campaign', client: 'Fashion Store', tech: 'Canva, Photoshop', id: 14 },
  { category: 'marketing', title: 'Email Newsletter Template', client: 'E-Commerce Store', tech: 'Figma, Mailchimp', id: 15 },
  { category: 'marketing', title: 'Google Display Ads', client: 'Tech SaaS', tech: 'Photoshop', id: 16 },
  { category: 'marketing', title: 'Event Promotion Posters', client: 'Event Management', tech: 'Illustrator, Photoshop', id: 17 },
  { category: 'marketing', title: 'Facebook Ads Creative Pack', client: 'Fitness Studio', tech: 'Canva, Photoshop', id: 18 },

  // 💻 Development (6)
  { category: 'development', title: 'Responsive Portfolio Website', client: 'Freelancer Project', tech: 'HTML, CSS, JS', id: 19 },
  { category: 'development', title: 'E-Commerce Website', client: 'Online Store', tech: 'React, Node.js', id: 20 },
  { category: 'development', title: 'Company Landing Page', client: 'Corporate Client', tech: 'Bootstrap, jQuery', id: 21 },
  { category: 'development', title: 'Blog CMS Platform', client: 'Media Company', tech: 'WordPress, PHP', id: 22 },
  { category: 'development', title: 'Dashboard Web App', client: 'Analytics Startup', tech: 'Vue.js, Firebase', id: 23 },
  { category: 'development', title: 'Portfolio Showcase App', client: 'Personal Project', tech: 'React, Tailwind CSS', id: 24 },

  // 📱 Mobile Apps (6)
  { category: 'mobile', title: 'Fintech Mobile App', client: 'Banking Startup', tech: 'Figma, Flutter', id: 25 },
  { category: 'mobile', title: 'Food Delivery App UI', client: 'Restaurant Chain', tech: 'Figma', id: 26 },
  { category: 'mobile', title: 'Fitness Tracking App', client: 'Health Startup', tech: 'Adobe XD, Flutter', id: 27 },
  { category: 'mobile', title: 'E-Commerce Mobile App', client: 'Retail Store', tech: 'Figma, React Native', id: 28 },
  { category: 'mobile', title: 'Travel Booking App', client: 'Tourism Company', tech: 'Figma', id: 29 },
  { category: 'mobile', title: 'Music Streaming App', client: 'Entertainment Startup', tech: 'Figma, SwiftUI', id: 30 },

  // 🎭 Graphics (6)
  { category: 'graphics', title: 'Custom Character Illustration', client: 'Creative Agency', tech: 'Procreate, Illustrator', id: 31 },
  { category: 'graphics', title: 'Poster Design', client: 'Event Promotion', tech: 'Photoshop', id: 32 },
  { category: 'graphics', title: 'Flyer & Brochure Design', client: 'Corporate Firm', tech: 'Illustrator, InDesign', id: 33 },
  { category: 'graphics', title: 'Infographic Design', client: 'Marketing Agency', tech: 'Illustrator', id: 34 },
  { category: 'graphics', title: 'T-Shirt Print Design', client: 'Clothing Brand', tech: 'Photoshop, Illustrator', id: 35 },
  { category: 'graphics', title: 'Digital Painting', client: 'Art Project', tech: 'Procreate', id: 36 }
];


const gallery = document.getElementById('pf-gallery');
const filterBtns = document.querySelectorAll('.pf-filter-btn');
const prevBtn = document.getElementById('pf-prevBtn');
const nextBtn = document.getElementById('pf-nextBtn');
const pagination = document.getElementById('pf-pagination');
const paginationNumbers = document.getElementById('pf-paginationNumbers');
const paginationInfo = document.getElementById('pf-paginationInfo');

let currentPage = 1;
let itemsPerPage = 6;
let currentFilter = 'design';
let filteredData = [];

function getRandomImage(width, height, id) {
    return `https://picsum.photos/seed/${id}/${width}/${height}`;
}

// Filter data + max 6 items per category
function filterData(category) {
    filteredData = portfolioData
        .filter(item => item.category === category)
        .slice(0, 6);
    currentPage = 1;
}

function getCurrentPageItems() {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
}

function getTotalPages() { return Math.ceil(filteredData.length / itemsPerPage); }

function createGalleryItems() {
    const items = getCurrentPageItems();
    gallery.innerHTML = '';
    if (items.length === 0) {
        gallery.innerHTML = `<p style="text-align:center; color:#666;">No projects found in this category.</p>`;
        return;
    }
    items.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'pf-gallery-item';
        const imgSrc = getRandomImage(400, 300, item.id);
        galleryItem.innerHTML = `
      <img src="${imgSrc}" alt="${item.title}" loading="lazy">
      <div class="pf-overlay">
        <h3>${item.title}</h3>
        <p>${item.client}</p>
        <p>${item.tech}</p>
      </div>
    `;
        gallery.appendChild(galleryItem);
        // stagger animation
        setTimeout(() => { galleryItem.classList.add('pf-show'); }, index * 100);
    });
}

function createPageButton(pageNum) {
    const btn = document.createElement('button');
    btn.className = 'pf-pagination-number';
    btn.textContent = pageNum;
    btn.addEventListener('click', () => { currentPage = pageNum; updateGallery(false); });
    return btn;
}

function createEllipsis() {
    const ellipsis = document.createElement('span');
    ellipsis.className = 'pf-pagination-ellipsis';
    ellipsis.textContent = '...';
    return ellipsis;
}

function createPaginationNumbers() {
    paginationNumbers.innerHTML = '';
    const total = getTotalPages();
    if (total <= 1) { paginationInfo.textContent = ''; return; }
    if (currentPage > 3) { paginationNumbers.appendChild(createPageButton(1)); if (currentPage > 4) paginationNumbers.appendChild(createEllipsis()); }
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(total, currentPage + 2);
    for (let i = start; i <= end; i++) {
        const btn = createPageButton(i);
        if (i === currentPage) btn.classList.add('pf-active');
        paginationNumbers.appendChild(btn);
    }
    if (currentPage < total - 2) { if (currentPage < total - 3) paginationNumbers.appendChild(createEllipsis()); paginationNumbers.appendChild(createPageButton(total)); }
    updatePaginationInfo();
}

function updatePaginationInfo() {
    const total = filteredData.length;
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, total);
    const totalPages = getTotalPages();
    paginationInfo.textContent = `Showing ${start}-${end} of ${total} projects (Page ${currentPage} of ${totalPages})`;
}

function updatePaginationButtons() {
    const total = getTotalPages();
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === total || total === 0;
}

function updateGallery(scroll = true) {
    createGalleryItems();
    createPaginationNumbers();
    updatePaginationButtons();
    const totalPages = getTotalPages();
    pagination.style.display = totalPages > 1 ? 'flex' : 'none';
    if (scroll) {
        // Agar scroll nahi chahiye to comment kar do
        // gallery.scrollIntoView({behavior:'smooth',block:'start'});
    }
}

function filterItems(category) {
    currentFilter = category;
    filterData(category);
    updateGallery(false);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('pf-active'));
        btn.classList.add('pf-active');
        filterItems(btn.getAttribute('data-filter'));
    });
});

prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; updateGallery(false); } });
nextBtn.addEventListener('click', () => { if (currentPage < getTotalPages()) { currentPage++; updateGallery(false); } });

// Init
filterData('design');
updateGallery();