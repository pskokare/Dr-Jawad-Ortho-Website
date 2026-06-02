// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('mobile-menu-enter');
    }
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Testimonials Carousel Data
const testimonials = [
    {
        name: "Mr. Rajesh",
        role: "Happy Customer",
        image: "Images/Home-Page-Images/OurPatients/Mr-Rajesh.webp",
        text: "Life giver to many people like me who lost hopes to lead quality life. But post surgery of knee replacement he gave the same life...",
        rating: 5
    },
    {
        name: "Mrs. Deepika Rawat",
        role: "ACL Surgery Patient",
        image: "Images/Home-Page-Images/OurPatients/patient1.webp",
        text: "Excellent care and treatment at Germanten Hospital. Dr. Mir Jawad and his team are highly professional. I'm now back to my active lifestyle!",
        rating: 5
    },
    {
        name: "Mr. Ibrahim",
        role: "International Patient",
        image: "Images/Home-Page-Images/OurPatients/patient2.webp",
        text: "From Dubai to Hyderabad for my ACL surgery - best decision ever! The international patient services were outstanding and the surgery was successful.",
        rating: 5
    },
    {
        name: "Mrs. Sunita Sharma",
        role: "Knee Replacement Patient",
        image: "Images/Home-Page-Images/OurPatients/patient3.webp",
        text: "After years of pain, I can finally walk without discomfort. Thank you Dr. Mir Jawad for giving me my life back. The hospital facilities are world-class.",
        rating: 5
    },
    {
        name: "Mr. Anil Ahuja",
        role: "Sports Injury Recovery",
        image: "Images/Home-Page-Images/OurPatients/patient4.webp",
        text: "Professional sports injury treatment that got me back on the field faster than expected. The rehabilitation team is exceptional!",
        rating: 5
    }
];

let currentTestimonial = 0;

// Testimonial Carousel Functions
function updateTestimonial(index) {
    const testimonial = testimonials[index];
    document.getElementById('testimonial-name').textContent = testimonial.name;
    document.getElementById('testimonial-role').textContent = testimonial.role;
    document.getElementById('testimonial-image').src = testimonial.image;
    document.getElementById('testimonial-image').alt = testimonial.name;
    document.getElementById('testimonial-text').textContent = testimonial.text;
    
    // Update stars
    const starsContainer = document.querySelector('#testimonial-container .flex.mb-4');
    starsContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        star.className = i < testimonial.rating ? 'fas fa-star text-yellow-400' : 'far fa-star text-yellow-400';
        starsContainer.appendChild(star);
    }
    
    // Update dots
    const dots = document.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('opacity-100', i === index);
        dot.classList.toggle('opacity-50', i !== index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(currentTestimonial);
}

function previousTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentTestimonial);
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonial(currentTestimonial);
}

// Auto-rotate testimonials
setInterval(nextTestimonial, 5000);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateTestimonial(0);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-xl');
    } else {
        navbar.classList.remove('shadow-xl');
    }
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${
                type === 'success' ? 'fa-check-circle' : 
                type === 'error' ? 'fa-exclamation-circle' : 
                'fa-info-circle'
            } mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Scroll to top button
const scrollTopButton = document.createElement('button');
scrollTopButton.className = 'scroll-top';
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopButton.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('show');
    } else {
        scrollTopButton.classList.remove('show');
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, #about .grid > div, #contact .grid > div');
    animateElements.forEach(el => observer.observe(el));
});

// Appointment booking button
const appointmentButtons = document.querySelectorAll('button');
appointmentButtons.forEach(button => {
    if (button.textContent.includes('Book Appointment')) {
        button.addEventListener('click', () => {
            showNotification('Appointment booking system coming soon! Please call us directly.', 'info');
        });
    }
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('service-card');
    });
});

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
    }
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handlers
const debouncedScrollHandler = debounce(() => {
    // Scroll-related animations can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
