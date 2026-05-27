// Load navbar component
async function loadNavbar() {
    try {
        // Check if we're in the treatments folder and adjust path accordingly
        const navbarPath = window.location.pathname.includes('/treatments/') || window.location.pathname.includes('/latestnews/') || window.location.pathname.includes('/recentpost/') ? '../components/navbar.html' : 'components/navbar.html';
        const response = await fetch(navbarPath);
        const navbarHTML = await response.text();
        document.getElementById('navbar-container').innerHTML = navbarHTML;

        // Fix paths if we're in treatments, latestnews, or recentpost folder
        if (window.location.pathname.includes('/treatments/') || window.location.pathname.includes('/latestnews/') || window.location.pathname.includes('/recentpost/')) {
            // Fix image paths
            const logoImg = document.querySelector('#navbar-container img[src="Images/GERMANTANLOGO.webp"]');
            if (logoImg) {
                logoImg.src = '../Images/GERMANTANLOGO.webp';
            }

            // Fix all navigation links that don't start with treatments/, latestnews/, or recentpost/
            const navLinks = document.querySelectorAll('#navbar-container a[href]');
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('../')) {
                    if (window.location.pathname.includes('/treatments/')) {
                        if (href.startsWith('treatments/')) {
                            // If already in treatments folder, remove treatments/ prefix
                            link.href = href.replace('treatments/', '');
                        } else {
                            // For other links, add ../ prefix
                            link.href = '../' + href;
                        }
                    } else if (window.location.pathname.includes('/latestnews/') || window.location.pathname.includes('/recentpost/')) {
                        // For latestnews and recentpost folders, add ../ prefix for all links
                        link.href = '../' + href;
                    }
                }
            });
        }
        
        // Initialize navbar functionality after loading
        initializeNavbar();
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Load footer component
async function loadFooter() {
    try {
        // Check if we're in the treatments folder and adjust path accordingly
        const footerPath = window.location.pathname.includes('/treatments/') || window.location.pathname.includes('/latestnews/') || window.location.pathname.includes('/recentpost/') ? '../components/footer.html' : 'components/footer.html';
        const response = await fetch(footerPath);
        const footerHTML = await response.text();
        document.getElementById('footer-container').innerHTML = footerHTML;

        // Fix paths if we're in treatments, latestnews, or recentpost folder
        if (window.location.pathname.includes('/treatments/') || window.location.pathname.includes('/latestnews/') || window.location.pathname.includes('/recentpost/')) {
            // Fix image paths in footer
            const footerImages = document.querySelectorAll('#footer-container img[src^="Images/"]');
            footerImages.forEach(img => {
                const src = img.getAttribute('src');
                img.src = '../' + src;
            });

            // Fix navigation links in footer
            const footerLinks = document.querySelectorAll('#footer-container a[href]');
            footerLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('../')) {
                    if (window.location.pathname.includes('/treatments/')) {
                        if (href.startsWith('treatments/')) {
                            // If already in treatments folder, remove treatments/ prefix
                            link.href = href.replace('treatments/', '');
                        } else {
                            // For other links, add ../ prefix
                            link.href = '../' + href;
                        }
                    } else if (window.location.pathname.includes('/latestnews/') || window.location.pathname.includes('/recentpost/')) {
                        // For latestnews and recentpost folders, add ../ prefix for all links
                        link.href = '../' + href;
                    }
                }
            });
        }
        
        // Initialize footer functionality after loading
        initializeFooter();
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Initialize footer functionality
function initializeFooter() {
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
            backToTopButton.classList.add('opacity-100');
        } else {
            backToTopButton.classList.add('opacity-0', 'pointer-events-none');
            backToTopButton.classList.remove('opacity-100');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('input[type="email"]');
    const subscribeButton = newsletterForm?.nextElementSibling;
    
    if (subscribeButton) {
        subscribeButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = newsletterForm.value;
            
            if (email && email.includes('@')) {
                // Show success message
                const originalText = subscribeButton.textContent;
                subscribeButton.textContent = 'Subscribed!';
                subscribeButton.classList.add('bg-green-600');
                subscribeButton.classList.remove('bg-red-600');
                
                // Reset after 2 seconds
                setTimeout(function() {
                    subscribeButton.textContent = originalText;
                    subscribeButton.classList.remove('bg-green-600');
                    subscribeButton.classList.add('bg-red-600');
                    newsletterForm.value = '';
                }, 2000);
            } else {
                // Show error
                newsletterForm.classList.add('border-red-500');
                setTimeout(function() {
                    newsletterForm.classList.remove('border-red-500');
                }, 2000);
            }
        });
    }
}

// Initialize navbar functionality
function initializeNavbar() {
    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('mobile-menu-enter');
                mobileMenuButton.classList.add('active');
            } else {
                mobileMenuButton.classList.remove('active');
            }
        });
    }

    // Mobile dropdown toggle functionality
    window.toggleMobileDropdown = function(dropdownId) {
        const dropdown = document.getElementById(dropdownId + '-dropdown');
        const button = dropdown.previousElementSibling;
        const chevron = button.querySelector('.fa-chevron-down');
        
        // Close other dropdowns
        const allDropdowns = document.querySelectorAll('[id$="-dropdown"]');
        const allChevrons = document.querySelectorAll('.fa-chevron-down');
        
        allDropdowns.forEach(d => {
            if (d.id !== dropdownId + '-dropdown') {
                d.classList.add('hidden');
                d.classList.remove('open');
            }
        });
        
        allChevrons.forEach(c => {
            if (c !== chevron) {
                c.classList.remove('rotated');
            }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('hidden');
        dropdown.classList.toggle('open');
        chevron.classList.toggle('rotated');
    };

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.classList.remove('active');
            
            // Close all mobile dropdowns
            const allDropdowns = document.querySelectorAll('[id$="-dropdown"]');
            const allChevrons = document.querySelectorAll('.fa-chevron-down');
            
            allDropdowns.forEach(d => {
                d.classList.add('hidden');
                d.classList.remove('open');
            });
            
            allChevrons.forEach(c => {
                c.classList.remove('rotated');
            });
        }
    });
}

// Hero Slider Functionality
class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.slide-indicator');
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        // Show first slide
        this.showSlide(0);
        
        // Add event listeners
        document.getElementById('prevSlide')?.addEventListener('click', () => this.prevSlide());
        document.getElementById('nextSlide')?.addEventListener('click', () => this.nextSlide());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause on hover
        const slider = document.getElementById('heroSlider');
        slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        slider.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
            indicator.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        });
        
        // Show current slide
        this.slides[index].classList.add('active');
        this.slides[index].style.opacity = '1';
        this.indicators[index].classList.add('active');
        this.indicators[index].style.backgroundColor = 'white';
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 3000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadFooter();
    
    // Initialize hero slider on any page that has the slider
    if (document.getElementById('heroSlider')) {
        new HeroSlider();
    }
    
    // Initialize scrolling progress bar
    initializeProgressBar();
});

// Scrolling Progress Bar Functionality
function initializeProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    
    if (progressBar) {
        // Set initial opacity to 0
        progressBar.style.opacity = '0';
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            // Update progress bar width
            progressBar.style.transform = `translateX(-${100 - scrollPercent}%)`;
            
            // Show/hide progress bar based on scroll position
            if (scrollTop > 10) {
                progressBar.style.opacity = '1';
            } else {
                progressBar.style.opacity = '0';
            }
        });
        
        // Also handle page load scroll position
        const initialScrollTop = window.scrollY;
        if (initialScrollTop > 10) {
            progressBar.style.opacity = '1';
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (initialScrollTop / docHeight) * 100;
            progressBar.style.transform = `translateX(-${100 - scrollPercent}%)`;
        }
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            if (mobileMenu) mobileMenu.classList.add('hidden');
            if (mobileMenuButton) mobileMenuButton.classList.remove('active');
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        
        if (mobileMenu) mobileMenu.classList.add('hidden');
        if (mobileMenuButton) mobileMenuButton.classList.remove('active');
        
        // Close all mobile dropdowns
        const allDropdowns = document.querySelectorAll('[id$="-dropdown"]');
        const allChevrons = document.querySelectorAll('.fa-chevron-down');
        
        allDropdowns.forEach(d => {
            d.classList.add('hidden');
            d.classList.remove('open');
        });
        
        allChevrons.forEach(c => {
            c.classList.remove('rotated');
        });
    }
});

// Add hover effect for desktop dropdowns
document.addEventListener('DOMContentLoaded', () => {
    const dropdownButtons = document.querySelectorAll('.group');
    dropdownButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const dropdown = button.querySelector('.absolute');
            if (dropdown) {
                dropdown.style.transform = 'translateY(0)';
            }
        });
    });
});

// Handle touch devices for mobile dropdowns
if ('ontouchstart' in window) {
    document.addEventListener('DOMContentLoaded', () => {
        const mobileDropdownButtons = document.querySelectorAll('[onclick^="toggleMobileDropdown"]');
        mobileDropdownButtons.forEach(button => {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const dropdownId = button.getAttribute('onclick').match(/toggleMobileDropdown\('(.+?)'\)/)[1];
                window.toggleMobileDropdown(dropdownId);
            });
        });
    });
}

// Prevent dropdown from closing when clicking inside
document.addEventListener('click', (e) => {
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(dropdown => {
        if (dropdown.contains(e.target)) {
            e.stopPropagation();
        }
    });
});

// Add loading state for appointment button
document.addEventListener('click', (e) => {
    if (e.target.matches('a') && e.target.textContent.includes('Book an Appointment')) {
        e.preventDefault();
        const originalText = e.target.textContent;
        e.target.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
        e.target.disabled = true;
        
        setTimeout(() => {
            e.target.textContent = originalText;
            e.target.disabled = false;
            showNotification('Appointment booking system will be available soon!', 'info');
        }, 1500);
    }
});

// Notification system
function showNotification(message, type = 'info') {
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
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

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

const debouncedScrollHandler = debounce(() => {
    // Add any scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Doctors Carousel Functionality
class DoctorsCarousel {
    constructor() {
        this.carousel = document.getElementById('doctors-carousel');
        this.prevBtn = document.getElementById('prev-doctor');
        this.nextBtn = document.getElementById('next-doctor');
        this.doctorCards = document.querySelectorAll('.doctor-card');
        
        this.currentIndex = 0;
        this.totalCards = this.doctorCards.length;
        this.autoPlayInterval = null;
        this.cardsPerView = this.getCardsPerView();
        
        this.init();
    }
    
    init() {
        if (!this.carousel) return;
        
        // Add event listeners
        this.prevBtn?.addEventListener('click', () => this.navigate('prev'));
        this.nextBtn?.addEventListener('click', () => this.navigate('next'));
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const oldCardsPerView = this.cardsPerView;
            this.cardsPerView = this.getCardsPerView();
            
            // Adjust current index if needed
            if (this.cardsPerView !== oldCardsPerView) {
                this.adjustIndexForNewView();
                this.updateCarousel();
            }
            
            // Restart autoplay with new settings
            this.restartAutoPlay();
        });
        
        // Touch events for mobile
        this.setupTouchEvents();
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause on hover
        this.setupHoverEvents();
    }
    
    getCardsPerView() {
        const width = window.innerWidth;
        if (width < 768) return 1;      // Mobile: 1 card
        if (width < 1024) return 3;     // Tablet: 3 cards
        return 3;                         // Desktop: 3 cards (changed from 4)
    }
    
    
    setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
    
    setupHoverEvents() {
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.navigate('next'); // Swipe left - next
            } else {
                this.navigate('prev'); // Swipe right - previous
            }
        }
    }
    
    navigate(direction) {
        const maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
        
        if (direction === 'next') {
            this.currentIndex = Math.min(this.currentIndex + this.cardsPerView, maxIndex);
        } else {
            this.currentIndex = Math.max(this.currentIndex - this.cardsPerView, 0);
        }
        
        this.updateCarousel();
    }
    
    
    adjustIndexForNewView() {
        const maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
        this.currentIndex = Math.min(this.currentIndex, maxIndex);
    }
    
    updateCarousel() {
        const translateX = -(this.currentIndex * (100 / this.cardsPerView));
        console.log('Updating carousel - index:', this.currentIndex, 'cards per view:', this.cardsPerView, 'translateX:', translateX + '%');
        this.carousel.style.transform = `translateX(${translateX}%)`;
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        
        // Auto-play for both mobile and desktop
        if (this.cardsPerView === 1) {
            // Mobile: Move one card at a time
            console.log('Starting auto-scroll for mobile - total cards:', this.totalCards);
            this.autoPlayInterval = setInterval(() => {
                const maxIndex = this.totalCards - 1;
                console.log('Auto-scroll: current index:', this.currentIndex, 'max index:', maxIndex);
                
                if (this.currentIndex >= maxIndex) {
                    this.currentIndex = 0; // Loop back to start
                    console.log('Looping back to start');
                } else {
                    this.currentIndex += 1; // Move one card at a time
                    console.log('Moving to next card:', this.currentIndex);
                }
                this.updateCarousel();
            }, 5000); // Slower: 5 seconds for mobile
        } else {
            // Desktop/Tablet: Move by cards per view
            console.log('Starting auto-scroll for desktop/tablet - cards per view:', this.cardsPerView);
            this.autoPlayInterval = setInterval(() => {
                const maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
                console.log('Auto-scroll: current index:', this.currentIndex, 'max index:', maxIndex);
                
                if (this.currentIndex >= maxIndex) {
                    this.currentIndex = 0; // Loop back to start
                    console.log('Looping back to start');
                } else {
                    this.currentIndex += this.cardsPerView; // Move by cards per view
                    console.log('Moving to next group:', this.currentIndex);
                }
                this.updateCarousel();
            }, 4000); // 4 seconds for desktop/tablet
        }
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// German Doctors Mobile Carousel Functionality
class GermanDoctorsCarousel {
    constructor() {
        this.carousel = document.getElementById('german-doctors-carousel');
        this.doctorCards = document.querySelectorAll('.german-doctor-card');
        
        this.currentIndex = 0;
        this.totalCards = this.doctorCards.length;
        this.autoPlayInterval = null;
        this.isMobile = window.innerWidth < 640; // sm breakpoint
        
        this.init();
    }
    
    init() {
        if (!this.carousel || !this.isMobile) return;
        
        console.log('Initializing German Doctors mobile carousel');
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth < 640;
            
            if (wasMobile !== this.isMobile) {
                if (this.isMobile) {
                    this.startAutoPlay();
                } else {
                    this.stopAutoPlay();
                }
            }
        });
        
        // Touch events for mobile
        this.setupTouchEvents();
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause on hover
        this.setupHoverEvents();
    }
    
    setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
    
    setupHoverEvents() {
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.navigate('next'); // Swipe left - next
            } else {
                this.navigate('prev'); // Swipe right - previous
            }
        }
    }
    
    navigate(direction) {
        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        } else {
            this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        }
        
        this.updateCarousel();
    }
    
    updateCarousel() {
        const translateX = -(this.currentIndex * 100);
        console.log('Updating German carousel - index:', this.currentIndex, 'translateX:', translateX + '%');
        this.carousel.style.transform = `translateX(${translateX}%)`;
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        
        if (this.isMobile) {
            console.log('Starting auto-scroll for German Doctors mobile carousel - total cards:', this.totalCards);
            this.autoPlayInterval = setInterval(() => {
                console.log('Auto-scroll: current index:', this.currentIndex);
                
                if (this.currentIndex >= this.totalCards - 1) {
                    this.currentIndex = 0; // Loop back to start
                    console.log('Looping back to start');
                } else {
                    this.currentIndex += 1; // Move one card at a time
                    console.log('Moving to next card:', this.currentIndex);
                }
                this.updateCarousel();
            }, 4000); // 4 seconds for German Doctors carousel
        }
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// YouTube Videos Mobile Carousel Functionality
class YouTubeVideosCarousel {
    constructor() {
        this.carousel = document.getElementById('youtube-videos-carousel');
        this.videoCards = document.querySelectorAll('.youtube-video-card');
        
        this.currentIndex = 0;
        this.totalCards = this.videoCards.length;
        this.autoPlayInterval = null;
        this.isMobile = window.innerWidth < 768; // md breakpoint
        
        this.init();
    }
    
    init() {
        if (!this.carousel || !this.isMobile) return;
        
        console.log('Initializing YouTube Videos mobile carousel');
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth < 768;
            
            if (wasMobile !== this.isMobile) {
                if (this.isMobile) {
                    this.startAutoPlay();
                } else {
                    this.stopAutoPlay();
                }
            }
        });
        
        // Touch events for mobile
        this.setupTouchEvents();
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause on hover
        this.setupHoverEvents();
    }
    
    setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
    
    setupHoverEvents() {
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.navigate('next'); // Swipe left - next
            } else {
                this.navigate('prev'); // Swipe right - previous
            }
        }
    }
    
    navigate(direction) {
        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        } else {
            this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        }
        
        this.updateCarousel();
    }
    
    updateCarousel() {
        const translateX = -(this.currentIndex * 100);
        console.log('Updating YouTube carousel - index:', this.currentIndex, 'translateX:', translateX + '%');
        this.carousel.style.transform = `translateX(${translateX}%)`;
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        
        if (this.isMobile) {
            console.log('Starting auto-scroll for YouTube Videos mobile carousel - total cards:', this.totalCards);
            this.autoPlayInterval = setInterval(() => {
                console.log('Auto-scroll: current index:', this.currentIndex);
                
                if (this.currentIndex >= this.totalCards - 1) {
                    this.currentIndex = 0; // Loop back to start
                    console.log('Looping back to start');
                } else {
                    this.currentIndex += 1; // Move one card at a time
                    console.log('Moving to next video:', this.currentIndex);
                }
                this.updateCarousel();
            }, 4500); // 4.5 seconds for YouTube Videos carousel
        }
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize all carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DoctorsCarousel();
    new GermanDoctorsCarousel();
    new YouTubeVideosCarousel();
});
