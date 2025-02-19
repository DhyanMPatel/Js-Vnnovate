document.addEventListener('DOMContentLoaded', () => {
    // Close button functionality
    const closeBtn = document.querySelector('.close-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modalOverlay.style.opacity = '0';
            setTimeout(() => {
                modalOverlay.style.display = 'none';
            }, 300);
        });
    }

    // Add hover effects to info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
    });

    // Smooth scroll for modal content
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                const sections = document.querySelectorAll('.content-section');
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom >= 0) {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }
                });
            });
        });
    }

    // Initialize sections with fade-in effect
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
}); 