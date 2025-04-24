// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const videoCards = document.querySelectorAll('.video-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.textContent.trim();
            
            // Show/hide cards based on filter
            if (filter === '✏️ Desenhos') {
                portfolioCards.forEach(card => card.style.display = 'block');
                videoCards.forEach(card => card.style.display = 'none');
            } else if (filter === '📹 Vídeos') {
                portfolioCards.forEach(card => card.style.display = 'none');
                videoCards.forEach(card => card.style.display = 'block');
            } else if (filter === '🌸 Todos') {
                portfolioCards.forEach(card => card.style.display = 'block');
                videoCards.forEach(card => card.style.display = 'block');
            }
        });
    });

    // Gallery Preview Animation
    const galleryPreview = document.querySelector('.gallery-preview');
    if (galleryPreview) {
        const images = [
            'sketchbook.jpg',
            'room-scene.jpg',
            'character.jpg'
        ];

        images.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = `Gallery preview ${index + 1}`;
            imgElement.style.opacity = '0';
            imgElement.style.transition = 'opacity 0.5s ease';
            galleryPreview.appendChild(imgElement);

            // Fade in images one by one
            setTimeout(() => {
                imgElement.style.opacity = '1';
            }, index * 500);
        });
    }

    // Smooth scroll for explore button
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const portfolioSection = document.querySelector('#portfolio');
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const portfolioPosition = portfolioSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: portfolioPosition,
                behavior: 'smooth'
            });
        });
    }

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            if (window.pageYOffset >= (sectionTop - navbarHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}); 