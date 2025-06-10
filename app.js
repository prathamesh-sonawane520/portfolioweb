// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const carouselContainer = document.getElementById('carousel-container');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const contactForm = document.getElementById('contact-form');

// Navigation Toggle
function toggleNavMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Close navigation when clicking on a link
function closeNavMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
    closeNavMenu();
}

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.meme-placeholder');
const totalSlides = slides.length;

function showSlide(index) {
    // On mobile, show one slide at a time
    if (window.innerWidth <= 768) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    } else {
        // On desktop, show all slides (they're in a grid)
        slides.forEach(slide => {
            slide.style.display = 'block';
        });
    }
}

function nextSlide() {
    if (window.innerWidth <= 768) {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (window.innerWidth <= 768) {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
}

// Form validation and submission
function validateForm(formData) {
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    if (!name) {
        throw new Error('Name is required');
    }
    
    if (!email) {
        throw new Error('Email is required');
    }
    
    if (!isValidEmail(email)) {
        throw new Error('Please enter a valid email address');
    }
    
    if (!message) {
        throw new Error('Message is required');
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, isError = false) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${isError ? 'error' : 'success'}`;
    messageDiv.textContent = message;
    
    // Add styles
    messageDiv.style.padding = 'var(--space-sm)';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.marginTop = 'var(--space-sm)';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontWeight = '600';
    
    if (isError) {
        messageDiv.style.background = 'rgba(255, 65, 54, 0.2)';
        messageDiv.style.color = 'var(--bright-red)';
        messageDiv.style.border = '1px solid var(--bright-red)';
    } else {
        messageDiv.style.background = 'rgba(0, 255, 0, 0.2)';
        messageDiv.style.color = '#00ff00';
        messageDiv.style.border = '1px solid #00ff00';
    }
    
    // Insert after form
    contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    try {
        // Validate form
        validateForm(formData);
        
        // Show loading state
        submitButton.textContent = 'SENDING...';
        submitButton.disabled = true;
        
        // Simulate form submission (since we can't actually send emails)
        setTimeout(() => {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showFormMessage('Thanks for reaching out! I\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
        }, 2000);
        
    } catch (error) {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show error message
        showFormMessage(error.message, true);
    }
}

// Scroll animations
function handleScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition > sectionTop + 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
    
    // Update navigation active state
    const scrollPos = window.scrollY + 100;
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            const section = document.querySelector(href);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        }
    });
}

// Handle window resize
function handleResize() {
    showSlide(currentSlide);
    
    // Reset mobile menu on desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

// Initialize carousel display
function initCarousel() {
    if (window.innerWidth <= 768) {
        // Mobile: show one slide at a time
        carouselContainer.style.display = 'block';
        showSlide(0);
    } else {
        // Desktop: show grid layout
        carouselContainer.style.display = 'grid';
        slides.forEach(slide => {
            slide.style.display = 'block';
        });
    }
}

// Add scroll animation styles
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Make hero section visible immediately
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
}

// Add hover effects to client cards
function initHoverEffects() {
    const clientCards = document.querySelectorAll('.client-card');
    clientCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add pulse animation to CTA buttons
function initButtonAnimations() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initCarousel();
    initScrollAnimations();
    initHoverEffects();
    initButtonAnimations();
    
    // Navigation events
    if (navToggle) {
        navToggle.addEventListener('click', toggleNavMenu);
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
            }
        });
    });
    
    // Carousel events
    if (carouselNext) {
        carouselNext.addEventListener('click', nextSlide);
    }
    
    if (carouselPrev) {
        carouselPrev.addEventListener('click', prevSlide);
    }
    
    // Form events
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial scroll check
    handleScroll();
});

// Touch support for carousel on mobile
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// Add touch events to carousel
if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', handleTouchStart, false);
    carouselContainer.addEventListener('touchend', handleTouchEnd, false);
}

// Expose functions globally for button onclick events
window.scrollToSection = scrollToSection;

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const images = document.querySelectorAll('.carousel-track img');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentIndex = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  if (nextBtn && prevBtn && images.length > 0) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    });

    // Optional: swipe support for mobile
    let startX = 0;
    track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    track.addEventListener('touchend', e => {
      let endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) prevBtn.click();
      else if (startX - endX > 50) nextBtn.click();
    });
  }
});
