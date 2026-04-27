document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    initScrollProgress();
    initHeader();
    initModal();
    initAnimations();
});

function initHeader() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = progress + '%';
    });
}

function initModal() {
    const modal = document.getElementById('modal');
    const overlay = modal?.querySelector('.modal-overlay');
    const closeBtn = modal?.querySelector('.modal-close');
    const reserveBtns = document.querySelectorAll('[href="#reservar"], .btn-reserve');
    const form = document.getElementById('reserveForm');

    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    reserveBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const original = btn.innerHTML;
            
            btn.innerHTML = '<span>Procesando...</span>';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<span>¡Reserva exitosa!</span>';
                
                setTimeout(() => {
                    closeModal();
                    form.reset();
                    btn.innerHTML = original;
                    btn.disabled = false;
                }, 1500);
            }, 1500);
        });
    }
}

function initAnimations() {
    gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-visual', {
        opacity: 0,
        x: 40,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.concepto-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: '.concepto-grid',
                start: 'top 80%'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: '.gallery-grid',
                start: 'top 80%'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'power3.out'
        });
    });

    gsap.from('.comparison-table', {
        scrollTrigger: {
            trigger: '.investment-comparison',
            start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.reservar-card', {
        scrollTrigger: {
            trigger: '.reservar',
            start: 'top 70%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.spec-card-premium', {
        scrollTrigger: {
            trigger: '.specs-premium-grid',
            start: 'top 80%'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });
}