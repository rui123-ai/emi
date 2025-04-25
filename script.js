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
        'alanzoka': '', // Coloque o ID do vídeo "Alanzoka" aqui
        'alanzoka-maethe': '', // Coloque o ID do vídeo "Alanzoka e Maethe" aqui
        'inutilismo-filho-irritante': '', // Coloque o ID do vídeo "Inutilismo - Um Filho Irritante" aqui
        'inutilismo-filho-irritante-pascoa': '', // Coloque o ID do vídeo "Inutilismo - Um Filho Irritante na Páscoa" aqui
        'bagi': '', // Coloque o ID do vídeo "Bagi" aqui
        'coisa-nossa': '', // Coloque o ID do vídeo "Coisa Nossa" aqui
        'vingadores-ultimato': '' // Coloque o ID do vídeo "Vingadores Ultimato" aqui
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

    // Video Player Controls
    document.querySelectorAll('.video-card').forEach(videoCard => {
        const video = videoCard.querySelector('.video-player');
        const controls = videoCard.querySelector('.video-controls');
        const playPauseBtn = controls.querySelector('.play-pause');
        const volumeBtn = controls.querySelector('.volume');
        const volumeSlider = controls.querySelector('.volume-slider');
        const volumeLevel = controls.querySelector('.volume-level');
        const progressBar = controls.querySelector('.progress-bar');
        const progress = controls.querySelector('.progress');
        const timeDisplay = controls.querySelector('.time-display');
        const fullscreenBtn = controls.querySelector('.fullscreen');

        let isMouseDown = false;

        // Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
            } else {
                video.pause();
                playPauseBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
            }
        });

        // Volume Control
        volumeBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            volumeBtn.querySelector('i').className = `fas ${video.muted ? 'fa-volume-mute' : 'fa-volume-up'}`;
            volumeLevel.style.width = `${video.muted ? 0 : video.volume * 100}%`;
        });

        volumeSlider.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            updateVolume(e);
        });

        document.addEventListener('mousemove', (e) => {
            if (isMouseDown) {
                updateVolume(e);
            }
        });

        document.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        function updateVolume(e) {
            const rect = volumeSlider.getBoundingClientRect();
            const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            video.volume = percentage;
            volumeLevel.style.width = `${percentage * 100}%`;
            video.muted = false;
            volumeBtn.querySelector('i').className = 'fas fa-volume-up';
        }

        // Progress Bar
        video.addEventListener('timeupdate', () => {
            const percentage = (video.currentTime / video.duration) * 100;
            progress.style.width = `${percentage}%`;
            timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        });

        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percentage = (e.clientX - rect.left) / rect.width;
            video.currentTime = percentage * video.duration;
        });

        // Fullscreen
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                videoCard.requestFullscreen();
                fullscreenBtn.querySelector('i').classList.replace('fa-expand', 'fa-compress');
            } else {
                document.exitFullscreen();
                fullscreenBtn.querySelector('i').classList.replace('fa-compress', 'fa-expand');
            }
        });

        // Format time to MM:SS
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        // Show/hide controls on hover
        videoCard.addEventListener('mouseenter', () => {
            controls.style.opacity = '1';
        });

        videoCard.addEventListener('mouseleave', () => {
            if (!video.paused) {
                controls.style.opacity = '0';
            }
        });
    });

    // Video functionality
    const videoPopup = document.querySelector('.video-popup-overlay');
    const popupVideo = document.querySelector('.popup-video-player');
    const closePopupBtn = document.querySelector('.close-popup');
    const allVideoCards = document.querySelectorAll('.video-card');

    // Function to open video popup
    function openVideoPopup(videoSrc) {
        if (popupVideo && videoPopup) {
            popupVideo.src = videoSrc;
            videoPopup.style.display = 'flex';
            videoPopup.classList.add('active');
            popupVideo.play().catch(error => {
                console.log('Video autoplay failed:', error);
            });
        }
    }

    // Function to close video popup
    function closeVideoPopup() {
        if (popupVideo && videoPopup) {
            popupVideo.pause();
            popupVideo.src = '';
            videoPopup.style.display = 'none';
            videoPopup.classList.remove('active');
        }
    }

    // Add click event listeners to video cards
    allVideoCards.forEach(card => {
        const video = card.querySelector('video');
        const thumbnail = card.querySelector('.video-thumbnail');
        const playButton = card.querySelector('.play-button');

        if (video && thumbnail && playButton) {
            // Click on play button or thumbnail
            const clickHandler = (e) => {
                e.preventDefault();
                const videoSrc = video.src;
                openVideoPopup(videoSrc);
            };

            playButton.addEventListener('click', clickHandler);
            thumbnail.addEventListener('click', clickHandler);

            // Preview on hover
            card.addEventListener('mouseenter', () => {
                if (video) {
                    video.style.display = 'block';
                    video.play().catch(error => {
                        console.log('Video preview failed:', error);
                    });
                }
                if (thumbnail) {
                    thumbnail.style.opacity = '0';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                    video.style.display = 'none';
                }
                if (thumbnail) {
                    thumbnail.style.opacity = '1';
                }
            });
        }
    });

    // Close popup when clicking close button
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closeVideoPopup);
    }

    // Close popup when clicking outside the video
    if (videoPopup) {
        videoPopup.addEventListener('click', (e) => {
            if (e.target === videoPopup) {
                closeVideoPopup();
            }
        });
    }

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeVideoPopup();
        }
    });

    // Category filtering
    const categoryHeaders = document.querySelectorAll('.category-header h4');
    categoryHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Remove active class from all headers
            categoryHeaders.forEach(h => h.classList.remove('active'));
            // Add active class to clicked header
            header.classList.add('active');

            // Get category from header text
            const category = header.textContent.split(' ')[1].toLowerCase();
            
            // Filter videos
            document.querySelectorAll('.video-card').forEach(card => {
                if (category === 'todos' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});