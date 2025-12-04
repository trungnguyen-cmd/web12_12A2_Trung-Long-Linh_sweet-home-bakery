document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Toggle cho Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Đổi icon hamburger/X
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Hiệu ứng Animation on Scroll (slide-up)
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Kích hoạt khi 10% phần tử hiển thị
    });

    document.querySelectorAll('.slide-up').forEach(element => {
        observer.observe(element);
    });

    // 3. Hiệu ứng Sticky Header
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Modal handlers for recipe detail (exposed on window so inline onclick() works)
    window.showRecipeDetail = function(id) {
        // Hide all articles
        document.querySelectorAll('.recipe-article').forEach(el => el.style.display = 'none');

        // Reset all iframes
        document.querySelectorAll('.recipe-article iframe.responsive-iframe').forEach(iframe => {
            iframe.src = '';
        });

        const modal = document.getElementById('recipe-detail-modal');
        const article = document.getElementById(id);
        if (!article) return;

        // Show selected article
        article.style.display = 'block';

        // Load the video's src from data-src (lazy load)
        article.querySelectorAll('iframe.responsive-iframe').forEach(iframe => {
            const src = iframe.dataset.src;
            if (src) iframe.src = src;
        });

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Close when clicking on overlay
        modal.onclick = function(event) {
            if (event.target === modal) {
                window.hideRecipeDetail();
            }
        };
    };

    window.hideRecipeDetail = function() {
        const modal = document.getElementById('recipe-detail-modal');
        if (!modal) return;

        modal.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Stop and reset videos
        modal.querySelectorAll('iframe.responsive-iframe').forEach(iframe => {
            iframe.src = '';
        });

        modal.onclick = null;
    };

});