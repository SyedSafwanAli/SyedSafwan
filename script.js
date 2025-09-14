//==============================
// Header JS
//==============================
const navbarMenu = document.getElementById("ss-menu");
const burgerMenu = document.getElementById("ss-burger");
const headerMenu = document.getElementById("ss-header");

// Toggle menu
burgerMenu.addEventListener("click", () => {
   burgerMenu.classList.toggle("is-active");
   navbarMenu.classList.toggle("is-active");

   document.body.style.overflow = navbarMenu.classList.contains("is-active")
      ? "hidden"
      : "initial";
});

// Remove menu
const removeMenu = () => {
   burgerMenu.classList.remove("is-active");
   navbarMenu.classList.remove("is-active");
   document.body.style.overflow = "initial";
};

// Close on link click
document.querySelectorAll(".ss-menu-link").forEach((link) => {
   link.addEventListener("click", removeMenu);
});

// Sticky header
window.addEventListener(
   "scroll",
   (() => {
      let lastScrollPosition = 0;
      return () => {
         const currentScrollPosition = window.scrollY;
         if (currentScrollPosition > lastScrollPosition) {
            headerMenu.classList.add("is-sticky");
         } else {
            headerMenu.classList.remove("is-sticky");
         }
         lastScrollPosition = currentScrollPosition;
      };
   })()
);

// Fix on resize
window.addEventListener("resize", () => {
   if (window.innerWidth > 868 && navbarMenu.classList.contains("is-active")) {
      removeMenu();
   }
});





// =============================
// Service Cards Animations
// =============================
const serviceObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, serviceObserverOptions);

document.querySelectorAll('.service-card').forEach(card => {
    serviceObserver.observe(card);

    // Click animation
    card.addEventListener('click', function () {
        this.style.transform = 'translateX(20px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });

    // Staggered hover effect
    const items = card.querySelectorAll('.service-item');
    card.addEventListener('mouseenter', () => {
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(5px)';
                item.style.color = '#C9F31D';
            }, index * 50);
        });
    });

    card.addEventListener('mouseleave', () => {
        items.forEach(item => {
            item.style.transform = '';
            item.style.color = '';
        });
    });
});

// =============================
// Floating Animation for Icons
// =============================
document.querySelectorAll('.icon').forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out infinite`;
    icon.style.animationDelay = `${index * 0.5}s`;
});

// Add CSS keyframes for floating
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(style);

// =============================
// Skill Cards Animations
// =============================
function animateCounter(element, target, hasPercent = true) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        if (hasPercent) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

function animateProgressBar(card, target) {
    const progressBar = card.querySelector('.progress-fill');
    setTimeout(() => {
        progressBar.style.width = target + '%';
    }, 200);
}

function startAnimations() {
    const cards = document.querySelectorAll('.skill-card');

    cards.forEach((card, index) => {
        // Entrance animation
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 150);

        const target = parseInt(card.dataset.skill);
        const percentageElement = card.querySelector('.percentage');
        const targetValue = parseInt(percentageElement.dataset.target);

        // Show % or number
        const hasPercent = percentageElement.textContent.includes('%') ||
            card.querySelector('.skill-name').textContent !== 'Framer';

        // Start after entrance
        setTimeout(() => {
            animateCounter(percentageElement, targetValue, hasPercent);
            animateProgressBar(card, target);
        }, 500 + (index * 150));
    });
}

// =============================
// Dashboard Observer
// =============================
const dashboardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startAnimations();
            dashboardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const dashboard = document.querySelector('.dashboard');
    if (dashboard) {
        dashboardObserver.observe(dashboard);
    }
});

// =============================
// Hover Effects for Skill Cards
// =============================
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const progressBar = card.querySelector('.progress-fill');
        progressBar.style.transform = 'scaleY(1.2)';
        progressBar.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        const progressBar = card.querySelector('.progress-fill');
        progressBar.style.transform = 'scaleY(1)';
    });
});






//=============================
// popup function
//==========================
// Open specific modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close specific modal
function closeModal(event, modalId) {
  if (event && event.target !== document.getElementById(modalId) && !event.target.classList.contains('close-btn')) {
    return;
  }
  const modal = document.getElementById(modalId);
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Escape key to close all modals
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = 'auto';
  }
});

// Handle multiple forms
function handleForm(formId, successId) {
  const form = document.getElementById(formId);
  const successMessage = document.getElementById(successId);

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = form.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      successMessage.style.display = 'block';
      form.reset();
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;

      setTimeout(() => {
        successMessage.style.display = 'none';
        closeModal(null, formId.replace("Form", "Modal"));
      }, 3000);
    }, 2000);
  });
}

// Init forms
handleForm('appointmentForm', 'appointmentSuccess');
handleForm('quoteForm', 'quoteSuccess');

// Phone formatting (for each contact input)
function formatPhone(inputId) {
  const phoneInput = document.getElementById(inputId);
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
      value = value.replace(/(\d{3})(\d+)/, '($1) $2');
    }
    e.target.value = value;
  });
}

formatPhone('appointmentContact');
formatPhone('quoteContact');
