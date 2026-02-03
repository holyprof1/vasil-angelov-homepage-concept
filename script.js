// ============================================
// HAMBURGER MENU TOGGLE
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-nav a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
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

// ============================================
// PARALLAX EFFECT ON HERO IMAGE
// ============================================
const heroImage = document.querySelector('.artist-photo');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Subtle parallax movement
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        if (heroImage) {
            heroImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
        }
        
        if (heroContent) {
            heroContent.style.transform = `translate(${-moveX * 0.3}px, ${-moveY * 0.3}px)`;
        }
    }
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations (if you add more sections later)
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ============================================
// HEADER BACKGROUND ON SCROLL
// ============================================
const header = document.querySelector('.main-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add solid background when scrolled
    if (currentScroll > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.75)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// CURSOR TRAIL EFFECT (Optional Luxury Touch)
// ============================================
let cursor = null;
let cursorFollower = null;

if (window.innerWidth > 768) {
    // Create custom cursor elements
    cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);
    
    // Add cursor styles dynamically
    const cursorStyles = document.createElement('style');
    cursorStyles.innerHTML = `
        .custom-cursor {
            width: 10px;
            height: 10px;
            border: 2px solid #D4AF37;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease;
            transform: translate(-50%, -50%);
        }
        
        .cursor-follower {
            width: 40px;
            height: 40px;
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.3s ease;
            transform: translate(-50%, -50%);
        }
        
        .custom-cursor.hover {
            transform: translate(-50%, -50%) scale(2);
            background: rgba(212, 175, 55, 0.2);
        }
        
        .cursor-follower.hover {
            transform: translate(-50%, -50%) scale(1.5);
        }
    `;
    document.head.appendChild(cursorStyles);
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Add hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .hamburger, .cta-button');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ============================================
// AUDIO WAVEFORM TOGGLE (Optional)
// ============================================
const audioIndicator = document.querySelector('.audio-indicator');
let isPlaying = false;

if (audioIndicator) {
    audioIndicator.addEventListener('click', () => {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            audioIndicator.style.opacity = '1';
            // Here you would add actual audio playback logic
            console.log('Audio playing...');
        } else {
            audioIndicator.style.opacity = '0.6';
            console.log('Audio paused...');
        }
    });
    
    // Hover effect
    audioIndicator.style.cursor = 'pointer';
    audioIndicator.addEventListener('mouseenter', () => {
        audioIndicator.style.transform = 'scale(1.1)';
    });
    
    audioIndicator.addEventListener('mouseleave', () => {
        audioIndicator.style.transform = 'scale(1)';
    });
}

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// PREVENT SCROLL DURING LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Smooth reveal of all content
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        setTimeout(() => {
            heroSection.style.transition = 'opacity 1s ease';
            heroSection.style.opacity = '1';
        }, 200);
    }
});

// ============================================
// RESPONSIVE ADJUSTMENTS
// ============================================
function handleResize() {
    const width = window.innerWidth;
    
    // Disable parallax on mobile
    if (width <= 768) {
        if (heroImage) {
            heroImage.style.transform = 'none';
        }
        if (heroContent) {
            heroContent.style.transform = 'none';
        }
        
        // Remove custom cursor on mobile
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
    } else {
        if (cursor) cursor.style.display = 'block';
        if (cursorFollower) cursorFollower.style.display = 'block';
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call on load

// ============================================
// EASTER EGG: Konami Code (Optional Fun Touch)
// ============================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Easter egg: Add special effect
        document.body.style.animation = 'rainbow 3s ease infinite';
        setTimeout(() => {
            document.body.style.animation = 'none';
        }, 5000);
    }
});

// ============================================
// CONSOLE MESSAGE (Professional Touch)
// ============================================
console.log('%c🎵 VASIL ANGELOV 🎵', 'font-size: 24px; font-weight: bold; color: #D4AF37;');
console.log('%cWebsite designed with luxury & artistry', 'font-size: 14px; color: #C9AA71;');
console.log('%cInterested in collaboration? Let\'s talk.', 'font-size: 12px; color: #ffffff;');
