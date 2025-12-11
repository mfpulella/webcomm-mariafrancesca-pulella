    const fadeElements = document.querySelectorAll('.fade-in-item');


    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let hideTimer;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.classList.add('header-hidden');
        } 
        else {
            header.classList.remove('header-hidden');
        }

        lastScrollY = window.scrollY;
    });

    const triggerHeight = 50; 

    window.addEventListener('mousemove', (e) => {
        if (header.classList.contains('header-hidden') && e.clientY < triggerHeight) {
            
            header.classList.remove('header-hidden');
            
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                if (window.scrollY > 100) {
                    header.classList.add('header-hidden');
                }
            }, 2000); 
        } else if (e.clientY >= triggerHeight) {
             clearTimeout(hideTimer);
        }
    });

    header.addEventListener('mouseenter', () => {
        clearTimeout(hideTimer);
    });
    
    header.addEventListener('mouseleave', () => {
        if (window.scrollY > 100 && !header.classList.contains('header-hidden')) {
            hideTimer = setTimeout(() => {
                header.classList.add('header-hidden');
            }, 1000); 
        }
    });
    window.addEventListener('load', () => {
        header.classList.remove('header-hidden');
    });

    window.addEventListener('load', function() {
    const popupVisto = localStorage.getItem('popupGiaVisto');

    if (!popupVisto) {
        setTimeout(function() {
            document.getElementById('mioPopup').style.display = 'block';
        }, 2000);
    }
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('mioPopup').style.display = 'none';
    localStorage.setItem('popupGiaVisto', 'true'); 
});
