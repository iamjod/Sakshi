// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            });
});
    // Memory cards animation on scroll
    const memoryCards = document.querySelectorAll('.memory-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    memoryCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Spoiler functionality
    const spoilerContainers = document.querySelectorAll('.spoiler-container');
    console.log('Found spoiler containers:', spoilerContainers.length);
    
    if (spoilerContainers.length === 0) {
        console.error('No spoiler containers found!');
    }
    
    spoilerContainers.forEach((container, index) => {
        console.log('Setting up spoiler container', index);
        
        // Add a visual indicator that it's clickable
        container.style.cursor = 'pointer';
        
        container.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Spoiler clicked!', index);
            
            if (!this.classList.contains('revealed')) {
                console.log('Revealing spoiler', index);
                // Reveal the spoiler
                this.classList.add('revealed');
                
                // Update caption with actual content
                const caption = this.parentElement.querySelector('.memory-caption');
                if (caption) {
                    const captions = [
                        "The love of your life, Furqan~",
                        "Your first therapy session",
                        "Though you never took any of my advise serious",
                        "Simp for Furqan~?",
                        "Favourite person of..",
                        "Tirth simp era"
                    ];
                    const containerIndex = Array.from(spoilerContainers).indexOf(this);
                    if (containerIndex < captions.length) {
                        caption.textContent = captions[containerIndex];
                        console.log('Updated caption:', captions[containerIndex]);
                    }
                } else {
                    console.error('Caption element not found!');
                }
                
                // Add a subtle animation
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            } else {
                console.log('Spoiler already revealed, opening modal');
                // Optional: Click again to enlarge
                const img = this.querySelector('.memory-image');
                if (img) {
                    const modal = document.createElement('div');
                    modal.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.9);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10000;
                        cursor: pointer;
                    `;
                    
                    const enlargedImg = document.createElement('img');
                    enlargedImg.src = img.src;
                    enlargedImg.style.cssText = `
                        max-width: 90%;
                        max-height: 90%;
                        object-fit: contain;
                        border-radius: 10px;
                    `;
                    
                    modal.appendChild(enlargedImg);
                    document.body.appendChild(modal);
                    
                    modal.addEventListener('click', function() {
                        document.body.removeChild(modal);
                    });
                }
            }
        });
        
        // Also add click listener to the overlay for better UX
        const overlay = container.querySelector('.spoiler-overlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                e.stopPropagation();
                container.click();
            });
        }
    });


});

// Modal functionality for hot girls images
function openModal(img) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");
    
    modal.style.display = "block";
    modalImg.src = img.src;
    modalCaption.innerHTML = img.alt;
    modal.classList.add("show");
}

// Close modal when clicking the X
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("imageModal");
    const closeBtn = document.querySelector(".close");
    
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
            modal.classList.remove("show");
        }
    }
    
    // Close modal when clicking outside the image
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
            modal.classList.remove("show");
        }
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && modal.style.display === "block") {
            modal.style.display = "none";
            modal.classList.remove("show");
        }
    });
});
