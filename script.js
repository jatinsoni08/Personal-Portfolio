document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    initMobileNav();
    
    // Smooth Scrolling
    initSmoothScroll();
    
    // Scroll Animation
    initScrollAnimation();
    
    // Project Cards Animation
    initProjectCards();
    
    // Form Validation
    initFormValidation();
    
    // Back to Top Button
    initBackToTop();

    //typing animation
    const typingText = document.querySelector('.typing-text');
    const words = [
        "Jatin Soni",
        "a Frontend Developer",
        "a Cybersecurity Enthusiast",
        "a Web Designer",
        "a Problem Solver"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        
        typingText.textContent = currentChar;
        
        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1000);
        }
    }
    
    type();
    
    // Scroll Progress
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Lightbox Gallery
   // Lightbox Gallery
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const projectImages = document.querySelectorAll('.project-image');

let currentImageIndex = 0;

// Check if device is mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

projectImages.forEach((image, index) => {
    image.addEventListener('click', (e) => {
        // On mobile devices, don't open the lightbox
        if (isMobile) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        
        // On desktop, open the lightbox as normal
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
    });
});

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightboxPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + projectImages.length) % projectImages.length;
        updateLightboxImage();
    });

    lightboxNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % projectImages.length;
        updateLightboxImage();
    });

    function updateLightboxImage() {
        const image = projectImages[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
    }

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + projectImages.length) % projectImages.length;
                updateLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % projectImages.length;
                updateLightboxImage();
            }
        }
    });

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const message = document.createElement('div');
    message.className = 'message';
    document.body.appendChild(message);

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = contactForm.querySelector('#name').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const messageText = contactForm.querySelector('#message').value.trim();
        
        if (!name || !email || !messageText) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showMessage('Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                showMessage('Error sending message. Please try again.', 'error');
            }
        } catch (error) {
            showMessage('Error sending message. Please try again.', 'error');
        }
    });

    function showMessage(text, type) {
        message.textContent = text;
        message.className = `message ${type}`;
        message.classList.add('show');
        
        setTimeout(() => {
            message.classList.remove('show');
        }, 3000);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Project Details Modal Handling
    function initProjectModals() {
        const modals = {
            'Moodify': document.getElementById('moodifyModal'),
            'Expense Tracker': document.getElementById('expenseModal'),
            'Quartz Industry': document.getElementById('quartzModal')
        };

        // Add click handlers for "View Details" buttons
        document.querySelectorAll('.project-link').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectTitle = button.closest('.project-card-back').querySelector('.project-title').textContent;
                const modal = modals[projectTitle];
                if (modal) {
                    showModal(modal);
                }
            });
        });

        // Add close handlers for each modal
        Object.values(modals).forEach(modal => {
            if (modal) {
                const closeBtn = modal.querySelector('.modal-close');
                closeBtn.addEventListener('click', () => hideModal(modal));

                // Close modal when clicking outside
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        hideModal(modal);
                    }
                });

                // Close modal with Escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && modal.style.display === 'block') {
                        hideModal(modal);
                    }
                });
            }
        });
    }

    function showModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function hideModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Initialize project modals
    initProjectModals();

    // Initialize skills animation
    initSkillsAnimation();
});

// Mobile Navigation Implementation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Hide menu on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(scrollTop - lastScrollTop) > 10) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
        lastScrollTop = scrollTop;
    });
}

// Smooth Scrolling Implementation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animation Implementation
function initScrollAnimation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}


// Project Cards Animation Implementation
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    projectCards.forEach(card => {
        // Add hover effect for desktop
        card.addEventListener('mouseenter', (e) => {
            if (!isMobile) {
                const overlay = card.querySelector('.project-overlay');
                if (!overlay) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                overlay.style.transform = `scale(1)`;
                overlay.style.transformOrigin = `${x}px ${y}px`;
            }
        });

        // Add click/tap functionality for flipping cards
        card.addEventListener('click', function(e) {
            // Don't flip if clicking on View Details button or links
            if (e.target.classList.contains('project-link') || 
                e.target.closest('.project-link')) {
                return;
            }
            
            // Prevent lightbox from opening when clicking on image
            if (e.target.classList.contains('project-image') || 
                e.target.closest('.project-image')) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            // Flip the card
            this.classList.toggle('flipped');
        });
    });

    // Modify the lightbox behavior to not open on mobile when clicking project images
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach((image) => {
        image.addEventListener('click', (e) => {
            if (isMobile) {
                // On mobile, prevent the default lightbox behavior
                e.stopPropagation();
                return false;
            }
        }, true); // Use capture phase to intercept event before lightbox handler
    });
}

// Form Validation Implementation
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Show success message
            showMessage('Message sent successfully!', 'success');
            form.reset();

            // Remove valid styling after reset
            inputs.forEach(input => {
                input.classList.remove('valid');
            });
        }
    });

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });

        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;

    // Remove existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Validate based on input type
    if (value === '') {
        showError(input, 'This field is required');
        isValid = false;
    } else if (type === 'email' && !isValidEmail(value)) {
        showError(input, 'Please enter a valid email address');
        isValid = false;
    }

    // Visual feedback
    if (isValid) {
        input.classList.remove('error');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('error');
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
}

// Initialize the form validation when the DOM is ready
document.addEventListener('DOMContentLoaded', initFormValidation);


// Back to Top Button Implementation
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Skills Animation
function initSkillsAnimation() {
    const skillsSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.progress');
    let animated = false;

    function animateSkills() {
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos && !animated) {
            animated = true;
            progressBars.forEach(progress => {
                const width = progress.style.width;
                progress.style.width = '0';
                setTimeout(() => {
                    progress.style.width = width;
                }, 100);
            });
        }
    }

    // Initial check
    animateSkills();

    // Animate on scroll
    window.addEventListener('scroll', animateSkills);
}