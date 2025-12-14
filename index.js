
// Slider Logic
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.nav-dot');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
const sliderContainer = document.querySelector('.slider-container');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    rightArrow.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Touch Swipe Support for Slider
let touchStartX = 0;
let touchEndX = 0;
const minSwipeDistance = 50; // Minimum distance for a swipe

if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
            // Swiped right - go to previous slide
            showSlide(currentSlide - 1);
        } else {
            // Swiped left - go to next slide
            showSlide(currentSlide + 1);
        }
    }
}

// Auto-play slider
setInterval(() => {
    showSlide(currentSlide + 1);
}, 6000);

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up, .reveal-left, .reveal-right, .reveal-zoom, .reveal-rotate').forEach(el => {
    observer.observe(el);
});

// Navbar Scroll Effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Magnetic Button Effect (Simple version)
const buttons = document.querySelectorAll('button, .social-link');

buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
    });
});

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Add some delay/easing to the outline for a smooth effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });
}

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = `${progress}%`;
    }
});

// Back to Top Button
const backToTopBtn = document.createElement('div');
backToTopBtn.classList.add('back-to-top');
backToTopBtn.innerHTML = '↑';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typewriter Effect
const textElement = document.querySelector('.typing-text');
const texts = ['Machine Learning', 'Web Dev', 'Video Editing'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    if (!textElement) return;

    const currentText = texts[textIndex];

    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before typing next
    }

    setTimeout(type, typeSpeed);
}

// Start typing effect
document.addEventListener('DOMContentLoaded', type);

// Theme Toggle Logic
const themeToggleBtn = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggleBtn.innerHTML = '☀️';
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            themeToggleBtn.innerHTML = '☀️';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggleBtn.innerHTML = '🌙';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Project Data
const projectsData = {
    "pitchPRO": {
        title: "pitchPRO",
        role: "Machine Learning - Web Development",
        image: "Assests/logo.png", // Placeholder
        description: "An AI-powered tool that generates pitch decks and performs budget analysis for startups. It leverages natural language processing to extract key insights from user inputs and creates professional-grade presentations automatically.",
        tech: ["Python", "React", "FastAPI", "OpenAI API", "Pandas"],
        github: "https://github.com/Srikar-Miriyala/pitchPRO",
        
    },
    "MediLink": {
        title: "MediLink",
        role: "Database - Web Development",
        image: "Assests/logo.png", // Placeholder
        description: "A comprehensive medical history synchronization platform. It allows healthcare providers to securely access and update patient records in real-time, ensuring seamless care continuity across different facilities.",
        tech: ["SQL", "Node.js", "Express", "React", "Docker"],
        github: "https://github.com/Srikar-Miriyala/MediLink",
        
    },
    "UniAI": {
        title: "UniAI",
        role: "Machine Learning - Web Development",
        image: "Assests/logo.png", // Placeholder
        description: "An intelligent chatbot designed to streamline the university admission process. It answers student queries, guides them through application steps, and provides personalized recommendations based on their profile.",
        tech: ["Python", "TensorFlow", "Flask", "React", "NLP"],
        github: "https://github.com/Srikar-Miriyala/UniAI",
        
    },
    "StockTrend": {
        title: "StockTrend",
        role: "Machine Learning - Time Series Analysis",
        image: "Assests/logo.png", // Placeholder
        description: "A sophisticated stock market prediction system using advanced time series analysis. It predicts future stock trends with high accuracy by analyzing historical data and market sentiment.",
        tech: ["Python", "LSTM", "Scikit-learn", "Plotly", "Yahoo Finance API"],
        github: "https://github.com/Srikar-Miriyala/StockTrend",
       
    },
    "deskMATE": {
        title: "deskMATE",
        role: "Machine Learning - App Development",
        image: "Assests/logo.png", // Placeholder
        description: "A desktop agent and personal assistant that automates daily tasks. From scheduling meetings to organizing files, deskMATE uses machine learning to learn user habits and improve productivity.",
        tech: ["Electron", "Python", "OpenCV", "PyAutoGUI", "SQLite"],
        github: "https://github.com/Srikar-Miriyala/deskMATE",
        
    }
};

// Modal Logic
const modal = document.getElementById('project-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-title');
const modalRole = document.getElementById('modal-role');
const modalImage = document.getElementById('modal-image');
const modalDesc = document.getElementById('modal-description');
const modalTech = document.getElementById('modal-tech');
const modalGithub = document.getElementById('modal-github');
const modalLive = document.getElementById('modal-live');

// Function to open modal
function openModal(projectId) {
    if (projectsData[projectId]) {
        const project = projectsData[projectId];

        modalTitle.textContent = project.title;
        modalRole.textContent = project.role;
        modalImage.src = project.image;
        modalImage.alt = `${project.title} Project Image`;
        modalDesc.textContent = project.description;

        // Clear and add tech tags
        modalTech.innerHTML = '';
        project.tech.forEach(tech => {
            const tag = document.createElement('span');
            tag.classList.add('tech-tag');
            tag.textContent = tech;
            modalTech.appendChild(tag);
        });

        modalGithub.href = project.github;
        modalLive.href = project.live;

        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

// Function to close modal
function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Add click event to all Case Study buttons
document.querySelectorAll('.slide-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const projectId = btn.getAttribute('data-project');
        openModal(projectId);
    });
});

// Add click event to footer project links
document.querySelectorAll('.project-links a[data-project]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        openModal(projectId);
    });
});

// Close modal when clicking the close button
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});
