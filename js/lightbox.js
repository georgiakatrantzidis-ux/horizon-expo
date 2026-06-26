document.addEventListener('DOMContentLoaded', () => {
    // Check if we are using the new gallery mode
    const categoryCards = document.querySelectorAll('.category-card');
    const simpleTriggers = document.querySelectorAll('.lightbox-trigger');

    // Create Lightbox Elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-img';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '<i class="ph ph-x"></i>';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-nav lightbox-prev';
    prevBtn.innerHTML = '<i class="ph ph-caret-left"></i>';
    prevBtn.style.display = 'none';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-nav lightbox-next';
    nextBtn.innerHTML = '<i class="ph ph-caret-right"></i>';
    nextBtn.style.display = 'none';

    const counter = document.createElement('div');
    counter.className = 'lightbox-counter';
    counter.style.display = 'none';
    
    lightboxContent.appendChild(lightboxImg);
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    lightbox.appendChild(counter);
    document.body.appendChild(lightbox);

    let currentImages = [];
    let currentIndex = 0;

    // Open lightbox function
    const openLightbox = (src, isGallery = false) => {
        lightboxImg.setAttribute('src', src);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling

        if (isGallery && currentImages.length > 1) {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
            counter.style.display = 'block';
            updateCounter();
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            counter.style.display = 'none';
        }
    };

    // Close lightbox function
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.setAttribute('src', '');
            currentImages = [];
            currentIndex = 0;
        }, 300); // Wait for transition
    };

    const updateImage = () => {
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.setAttribute('src', currentImages[currentIndex]);
            lightboxImg.style.opacity = '1';
            updateCounter();
        }, 200);
    };

    const nextImage = (e) => {
        if(e) e.stopPropagation();
        if (currentImages.length > 0) {
            currentIndex = (currentIndex + 1) % currentImages.length;
            updateImage();
        }
    };

    const prevImage = (e) => {
        if(e) e.stopPropagation();
        if (currentImages.length > 0) {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            updateImage();
        }
    };

    const updateCounter = () => {
        counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    };

    // Event Listeners for Gallery Mode (Category Cards)
    if (categoryCards.length > 0) {
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const galleryData = card.querySelector('.gallery-data');
                if (galleryData) {
                    const imgs = galleryData.querySelectorAll('img');
                    currentImages = Array.from(imgs).map(img => img.getAttribute('src'));
                    if (currentImages.length > 0) {
                        currentIndex = 0;
                        openLightbox(currentImages[currentIndex], true);
                    }
                }
            });
        });
    }

    // Event Listeners for Simple Mode (Legacy single images)
    if (simpleTriggers.length > 0) {
        simpleTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const imgSrc = e.currentTarget.getAttribute('src');
                currentImages = [imgSrc];
                currentIndex = 0;
                openLightbox(imgSrc, false);
            });
        });
    }

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    
    lightbox.addEventListener('click', (e) => {
        // Close if clicking outside the image and not on nav buttons
        if (e.target === lightbox || e.target === lightboxContent) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });
});
