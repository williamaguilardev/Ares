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
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
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
        if (e.key === 'Escape' && (modal.style.display !== 'none' || modal.classList.contains('active'))) {
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

    gsap.from('.stat', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
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

    gsap.from('.spec-feature', {
        scrollTrigger: {
            trigger: '#especificaciones',
            start: 'top 70%'
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
    });

    gsap.to('.metric-item', {
        scrollTrigger: {
            trigger: '.specs-metrics',
            start: 'top 80%'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });

    document.querySelectorAll('.metric-number').forEach(el => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        
        gsap.to({
            val: 0
        }, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.specs-metrics',
                start: 'top 80%'
            },
            onUpdate: function() {
                el.textContent = Math.round(this.targets()[0].val) + suffix;
            }
        });
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-value[data-target], .metric-number[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const prefix = counter.dataset.prefix || '';
        const suffix = counter.dataset.suffix || '';
        const span = counter.querySelector('span') || '';
        
        const obj = { val: 0 };
        
        gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%'
            },
            onUpdate: () => {
                counter.innerHTML = prefix + Math.round(obj.val) + suffix + (span ? '<span>' + (span.textContent || '') + '</span>' : '');
            }
        });
    });
}

animateCounters();