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

    // Video IDs mapping - Substitua os IDs abaixo pelos IDs reais dos vídeos do YouTube
    const videoIds = {
        // DIVERSOS
        'irma-mais-velha': 'J593zH3l8kg', // Irmã mais Velha
        'clipes-animados': 'ZoUAhvBtUow', // Clipes Animados

        // MAIS POPULARES
        'suco-de-abacaxi': 'gDd3aimPNic', // Suco de Abacaxi
        'eu-odeio-o-calor': '', // Coloque o ID do vídeo "Eu Odeio o Calor" aqui
        'coisa-de-pai': '', // Coloque o ID do vídeo "Coisa de Pai" aqui
        'estoy-cansadita': '', // Coloque o ID do vídeo "Estoy Cansadita" aqui

        // CELEBRIDADES
        'alanzona': '', // Coloque o ID do vídeo "Alanzona" aqui
        'alanzona-maethe': '', // Coloque o ID do vídeo "Alanzona e Maethe" aqui
        'inutilismo-filho-irritante': '', // Coloque o ID do vídeo "Inutilismo - Um Filho Irritante" aqui
        'inutilismo-filho-irritante-pascoa': '', // Coloque o ID do vídeo "Inutilismo - Um Filho Irritante na Páscoa" aqui
        'bagi': '', // Coloque o ID do vídeo "Bagi" aqui
        'coisa-nossa': '' // Coloque o ID do vídeo "Coisa Nossa" aqui
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

    // Inicializar todos os players de vídeo
    document.querySelectorAll('.video-container').forEach(container => {
        const video = container.querySelector('.video-player');
        const playBtn = container.querySelector('.play-btn');
        const fullscreenBtn = container.querySelector('.fullscreen-btn');
        const progress = container.querySelector('.progress');
        const progressBar = container.querySelector('.progress-bar');

        // Play/Pause
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                // Pause todos os outros vídeos
                document.querySelectorAll('.video-player').forEach(v => {
                    if (v !== video) v.pause();
                });
                video.play();
                playBtn.textContent = '⏸️';
            } else {
                video.pause();
                playBtn.textContent = '▶️';
            }
        });

        // Tela cheia
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                container.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });

        // Atualizar barra de progresso
        video.addEventListener('timeupdate', () => {
            const percentage = (video.currentTime / video.duration) * 100;
            progress.style.width = percentage + '%';
        });

        // Clique na barra de progresso
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / progressBar.offsetWidth;
            video.currentTime = pos * video.duration;
        });

        // Reset quando o vídeo termina
        video.addEventListener('ended', () => {
            playBtn.textContent = '▶️';
            progress.style.width = '0%';
        });
    });
}); 