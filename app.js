// Function to calculate BAC
function calculateBAC() {
    const weight = parseFloat(document.getElementById('weight').value) || 160;
    const gender = document.getElementById('gender').value;
    const drinks = parseFloat(document.getElementById('drinks').value) || 0;
    const hours = parseFloat(document.getElementById('hours').value) || 1;
    
    // Constants
    const alcoholGramsPerDrink = 14; // Standard drink = 14g of pure alcohol
    const maleConstant = 0.68;
    const femaleConstant = 0.55;
    const eliminationRate = 0.015; // BAC elimination rate per hour
    
    // BAC calculation
    const distributionRatio = gender === 'male' ? maleConstant : femaleConstant;
    const weightInGrams = weight * 453.592; // Convert lbs to grams
    const alcoholGrams = drinks * alcoholGramsPerDrink;
    
    let bac = (alcoholGrams / (weightInGrams * distributionRatio)) * 100;
    
    // Subtract elimination based on time
    bac -= (eliminationRate * hours);
    
    // Ensure BAC is not negative
    bac = Math.max(0, bac);
    
    // Update display
    const bacValue = document.querySelector('.bac-value');
    const bacStatus = document.querySelector('.bac-status');
    const soberTime = document.getElementById('sober-time');
    
    if (bacValue && bacStatus && soberTime) {
        // Update BAC value
        bacValue.textContent = bac.toFixed(2) + '%';
        
        // Update status
        if (bac < 0.04) {
            bacStatus.className = 'bac-status safe';
            bacStatus.textContent = 'SAFE';
        } else if (bac < 0.08) {
            bacStatus.className = 'bac-status caution';
            bacStatus.textContent = 'CAUTION';
        } else {
            bacStatus.className = 'bac-status danger';
            bacStatus.textContent = 'DANGER';
        }
        
        // Calculate time until sober
        const hoursToSober = Math.max(0, bac / eliminationRate);
        const fullHours = Math.floor(hoursToSober);
        const minutes = Math.round((hoursToSober - fullHours) * 60);
        soberTime.textContent = `${fullHours}h ${minutes}m`;
    }
} // Added missing closing brace

// Bar Buddy - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add the cookie banner to the page
    addCookieBanner();
    
    // Add modals for Privacy Policy, Terms of Service, and Cookie Policy
    addLegalModals();
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Set up animation for scroll-triggered elements
    setupScrollAnimations();
    
    // Set up mobile menu toggle
    setupMobileMenu();
    
    // Initialize the FAQ accordion
    setupFAQ();
    
    // Set up the carousel for screenshots
    setupCarousel();
    
    // Set up the phone mockup animation
    setupPhoneMockup();
    
    // Initialize modal functionality
    setupModals();
    
    // Setup cookie banner
    setupCookieBanner();
});

// Setup animations triggered by scrolling
function setupScrollAnimations() {
    // Fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleClass: { targets: element, className: "active" },
                once: true
            }
        });
    });
    
    // Bounce-in animations
    const bounceElements = document.querySelectorAll('.bounce-in');
    bounceElements.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleClass: { targets: element, className: "active" },
                once: true
            }
        });
    });
    
    // Slide-in-left animations
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    slideLeftElements.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleClass: { targets: element, className: "active" },
                once: true
            }
        });
    });
    
    // Slide-in-right animations
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    slideRightElements.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleClass: { targets: element, className: "active" },
                once: true
            }
        });
    });
}

// Mobile menu toggle functionality
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Setup FAQ accordion functionality
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('show');
            });
            
            // Open current FAQ if it wasn't already open
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('show');
            }
        });
    });
}

// Setup carousel for screenshots
function setupCarousel() {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    if (!carousel || !items.length || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const itemCount = items.length;
    
    // Set initial position
    updateCarousel();
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    });
    
    // Next button
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    });
    
    // Auto-advance carousel
    let intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }, 5000);
    
    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });
    
    carousel.addEventListener('mouseleave', () => {
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        }, 5000);
    });
    
    function updateCarousel() {
        const newTransform = `translateX(-${currentIndex * 100}%)`;
        carousel.style.transform = newTransform;
    }
}

// Setup phone mockup screen animation
function setupPhoneMockup() {
    const screens = document.querySelectorAll('.app-screen');
    if (!screens.length) return;
    
    let currentScreen = 0;
    
    // Show first screen initially
    screens[0].classList.add('active');
    
    // Rotate through screens
    setInterval(() => {
        screens[currentScreen].classList.remove('active');
        currentScreen = (currentScreen + 1) % screens.length;
        screens[currentScreen].classList.add('active');
    }, 3000);
}

// Setup modal functionality
function setupModals() {
    // Legal links
    const privacyLink = document.getElementById('privacy-link');
    const termsLink = document.getElementById('terms-link');
    const cookiesLink = document.getElementById('cookies-link');
    
    // Modal close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Event listeners for opening modals
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('privacy-modal');
        });
    }
    
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('terms-modal');
        });
    }
    
    if (cookiesLink) {
        cookiesLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('cookies-modal');
        });
    }
    
    // Event listeners for closing modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            closeModal(modalId);
        });
    });
    
    // Close modal when clicking outside content
    window.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Helper functions
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
}

// Add safety mode toggle
function addSafetyModeToggle() {
    const toggleHtml = `
        <div class="safety-toggle">
            <label class="switch">
                <input type="checkbox" id="safety-mode-toggle" checked>
                <span class="slider round"></span>
            </label>
            <span class="toggle-label">Safety Mode: ON</span>
        </div>
    `;
    
    const header = document.querySelector('header');
    if (header) {
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'safety-toggle-container';
        toggleContainer.innerHTML = toggleHtml;
        header.appendChild(toggleContainer);
        
        // Add event listener
        const toggle = document.getElementById('safety-mode-toggle');
        const label = document.querySelector('.toggle-label');
        
        if (toggle && label) {
            toggle.addEventListener('change', function() {
                if (this.checked) {
                    label.textContent = 'Safety Mode: ON';
                    document.body.classList.remove('safety-off');
                } else {
                    label.textContent = 'Safety Mode: OFF';
                    document.body.classList.add('safety-off');
                }
            });
        }
    }
}

// Add safety mode styles
function addSafetyModeStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .safety-toggle-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: rgba(26, 42, 58, 0.9);
            padding: 10px 15px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            z-index: 999;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .safety-toggle {
            display: flex;
            align-items: center;
        }
        
        .toggle-label {
            color: white;
            margin-left: 10px;
            font-weight: bold;
            font-size: 0.9rem;
        }
        
        .switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }
        
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
        }
        
        .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
        }
        
        input:checked + .slider {
            background-color: var(--green-accent);
        }
        
        input:focus + .slider {
            box-shadow: 0 0 1px var(--green-accent);
        }
        
        input:checked + .slider:before {
            transform: translateX(26px);
        }
        
        .slider.round {
            border-radius: 34px;
        }
        
        .slider.round:before {
            border-radius: 50%;
        }
        
        .safety-off .stat-card, 
        .safety-off .feature-card, 
        .safety-off .step-card, 
        .safety-off .price-card {
            transition: opacity 0.3s;
            opacity: 0.3;
        }
        
        .safety-off .cta-btn {
            background-color: var(--red-accent);
            box-shadow: 0 4px 15px rgba(207, 69, 32, 0.4);
        }
        
        .safety-off .cta-btn:hover {
            box-shadow: 0 8px 25px rgba(207, 69, 32, 0.6);
        }
        
        @media (max-width: 576px) {
            .safety-toggle-container {
                bottom: 10px;
                right: 10px;
                padding: 8px 12px;
            }
            
            .toggle-label {
                font-size: 0.8rem;
            }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Add cookie banner to the page
function addCookieBanner() { // Added missing opening curly brace
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-text">
            <p>We use cookies to enhance your experience on our website. By continuing to browse, you agree to our 
            <a href="#" id="cookies-link-banner">Cookie Policy</a>.</p>
        </div>
        <button class="cookie-btn">Accept</button>
    `;
    document.body.appendChild(banner);
    
    // Add event listener for the cookie policy link
    const cookiesLinkBanner = document.getElementById('cookies-link-banner');
    if (cookiesLinkBanner) {
        cookiesLinkBanner.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('cookies-modal');
        });
    }
}

// Add legal modals to the page
function addLegalModals() {
    const modalsHtml = `
        <div class="modal" id="privacy-modal">
            <div class="modal-content">
                <span class="close-modal" data-modal="privacy-modal">&times;</span>
                <h2>Privacy Policy</h2>
                <p>Last updated: April 6, 2025</p>
                <p>This Privacy Policy describes how Bar Buddy ("we", "us", or "our") collects, uses, and discloses your personal information when you use our mobile application ("App").</p>
                
                <h3>Information We Collect</h3>
                <p>When you use our App, we may collect the following types of information:</p>
                <ul>
                    <li><strong>Personal Information:</strong> Email address (if you choose to share it for account purposes or support)</li>
                    <li><strong>Usage Data:</strong> Information about how you use the App, including recipes viewed, saved favorites, and inventory items</li>
                    <li><strong>Device Information:</strong> Device type, operating system, and unique device identifiers</li>
                </ul>
                
                <h3>How We Use Your Information</h3>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Provide, maintain, and improve our App and services</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Personalize your experience and deliver content relevant to your interests</li>
                    <li>Monitor and analyze usage patterns and trends to enhance user experience</li>
                    <li>Detect, investigate, and prevent fraudulent transactions and unauthorized access to our App</li>
                </ul>
                
                <h3>Sharing Your Information</h3>
                <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
                <ul>
                    <li>Service providers who perform services on our behalf</li>
                    <li>Legal authorities when required by law or to protect our rights</li>
                </ul>
                
                <h3>Data Security</h3>
                <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
                
                <h3>Your Rights</h3>
                <p>Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, delete, or restrict processing of your data.</p>
                
                <h3>Changes to This Privacy Policy</h3>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                
                <h3>Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us at support@BarBuddy.com</p>
            </div>
        </div>
        
        <div class="modal" id="terms-modal">
            <div class="modal-content">
                <span class="close-modal" data-modal="terms-modal">&times;</span>
                <h2>Terms of Service</h2>
                <p>Last updated: April 6, 2025</p>
                
                <h3>1. Acceptance of Terms</h3>
                <p>By downloading, installing, or using Bar Buddy app, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
                
                <h3>2. License</h3>
                <p>We grant you a limited, non-exclusive, non-transferable, revocable license to use the App for your personal, non-commercial purposes.</p>
                
                <h3>3. User Accounts</h3>
                <p>You may need to create an account to use certain features of the App. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
                
                <h3>4. User Content</h3>
                <p>You may have the ability to submit content to the App, such as custom recipes or reviews. You retain ownership of your content, but grant us a worldwide, royalty-free license to use, reproduce, modify, and display your content in connection with the App.</p>
                
                <h3>5. Prohibited Conduct</h3>
                <p>You agree not to:</p>
                <ul>
                    <li>Use the App for any illegal purpose or in violation of any laws</li>
                    <li>Attempt to gain unauthorized access to the App or its related systems</li>
                    <li>Interfere with or disrupt the operation of the App</li>
                    <li>Distribute viruses or other harmful code</li>
                    <li>Impersonate any person or entity</li>
                </ul>
                
                <h3>6. Intellectual Property</h3>
                <p>The App and its content, features, and functionality are owned by Bar Buddy and are protected by copyright, trademark, and other intellectual property laws.</p>
                
                <h3>7. Disclaimers</h3>
                <p>THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</p>
                
                <h3>8. Limitation of Liability</h3>
                <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, BAR BUDDY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE APP.</p>
                
                <h3>9. Changes to Terms</h3>
                <p>We may modify these Terms at any time. Your continued use of the App after any modifications indicates your acceptance of the modified Terms.</p>
                
                <h3>10. Governing Law</h3>
                <p>These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
                
                <h3>11. Contact Us</h3>
                <p>If you have any questions about these Terms, please contact us at support@BarBuddy.com</p>
            </div>
        </div>
        
        <div class="modal" id="cookies-modal">
            <div class="modal-content">
                <span class="close-modal" data-modal="cookies-modal">&times;</span>
                <h2>Cookie Policy</h2>
                <p>Last updated: April 6, 2025</p>
                
                <h3>What Are Cookies</h3>
                <p>Cookies are small text files that are stored on your device when you visit our website or use our app. They are widely used to make websites and apps work more efficiently and provide information to the owners.</p>
                
                <h3>How We Use Cookies</h3>
                <p>Bar Buddy uses cookies and similar technologies for the following purposes:</p>
                <ul>
                    <li><strong>Essential cookies:</strong> These are necessary for the website and app to function properly.</li>
                    <li><strong>Performance cookies:</strong> These help us understand how visitors interact with our website and app by collecting and reporting information anonymously.</li>
                    <li><strong>Functional cookies:</strong> These enable us to provide enhanced functionality and personalization.</li>
                    <li><strong>Targeting cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests.</li>
                </ul>
                
                <h3>Your Cookie Choices</h3>
                <p>Most web browsers allow you to control cookies through their settings. However, if you limit the ability of websites to set cookies, you may impact your overall user experience.</p>
                
                <h3>Updates to This Policy</h3>
                <p>We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.</p>
                
                <h3>Contact Us</h3>
                <p>If you have any questions about our Cookie Policy, please contact us at support@BarBuddy.com</p>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalsHtml;
    document.body.appendChild(modalContainer);
}

// Setup cookie banner
function setupCookieBanner() {
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptButton = document.querySelector('.cookie-btn');
    
    // Check if cookie consent was previously given
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent && cookieBanner) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieBanner.style.display = 'flex';
        }, 2000);
        
        // Handle accept button
        if (acceptButton) {
            acceptButton.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'true');
                cookieBanner.style.display = 'none';
            });
        }
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Counter animation for stats
function animateCounters() {
    // Only start animation when elements come into view
    const statSection = document.querySelector('.statistics');
    
    if (statSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCounterAnimations();
                observer.disconnect(); // Only need to run once
            }
        }, { threshold: 0.3 });
        
        observer.observe(statSection);
    }
    
    function startCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.textContent);
            const decimal = stat.textContent.includes('.');
            const suffix = stat.textContent.match(/[^0-9.]/g)?.join('') || '';
            let start = 0;
            const duration = 2000; // ms
            const step = 30; // ms
            const increment = target / (duration / step);
            
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (decimal) {
                    stat.textContent = current.toFixed(1) + suffix;
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, step);
        });
    } // Added missing closing brace
}