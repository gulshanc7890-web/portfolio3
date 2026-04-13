// Selectors
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Function to handle navigation
function navigateTo(targetId) {
    // Hide all sections and remove active class from all nav items
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none'; // Ensure inline style doesn't override CSS
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Show the target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.style.display = 'block';
        // Small delay to ensure display: block is processed before opacity animation
        setTimeout(() => {
            targetSection.classList.add('active');
        }, 10);
    }

    // Highlight the corresponding nav item
    const activeNavItem = document.querySelector(`.nav-item[data-target="${targetId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }

    // Close mobile menu if open
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
    
    // Scroll to top when changing sections
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add click event listeners to navbar links
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('data-target');
        navigateTo(targetId);
    });
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // The HTML has id="home" section set as active by default
    // We can explicitly call navigateTo('home') here if we want, or just let CSS handle initial load
    // If URL has a hash, load that section instead
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        navigateTo(hash);
    } else {
        navigateTo('home');
    }
});
