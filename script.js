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

    // Video IDs mapping
    const videoIds = {
        'irma-mais-velha': 'VIDEO_ID_1',
        'clipes-animados': 'VIDEO_ID_2',
        'suco-de-abacaxi': 'VIDEO_ID_3',
        'eu-odeio-o-calor': 'VIDEO_ID_4',
        'coisa-de-pai': 'VIDEO_ID_5',
        'estoy-cansadita': 'VIDEO_ID_6',
        'alanzona': 'VIDEO_ID_7',
        'alanzona-maethe': 'VIDEO_ID_8',
        'inutilismo-filho-irritante': 'VIDEO_ID_9',
        'inutilismo-filho-irritante-pascoa': 'VIDEO_ID_10',
        'bagi': 'VIDEO_ID_11',
        'coisa-nossa': 'VIDEO_ID_12'
    };

    // Handle video playback
    document.querySelectorAll('.play-btn').forEach(button => {
        button.addEventListener('click', function() {
            const videoId = this.dataset.video;
            const card = this.closest('.video-card');
            const iframe = card.querySelector('iframe');
            
            // Remove playing class from all other cards
            document.querySelectorAll('.video-card.playing').forEach(playingCard => {
                if (playingCard !== card) {
                    playingCard.classList.remove('playing');
                    const playingIframe = playingCard.querySelector('iframe');
                    playingIframe.src = 'about:blank';
                }
            });

            // Toggle playing state
            if (!card.classList.contains('playing')) {
                card.classList.add('playing');
                iframe.src = `https://www.youtube.com/embed/${videoIds[videoId]}?autoplay=1`;
            } else {
                card.classList.remove('playing');
                iframe.src = 'about:blank';
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