const slider = document.querySelector('.slider');
let isDown = false;
let startX;
let scrollLeft;

// Scroll-based animations
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');

function checkVisibility() {
    const containerRect = sliderContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if container is in view
    if (containerRect.top < windowHeight * 0.8) {
        sliderContainer.classList.add('visible');
        
        // Add visible class to slides with delay
        slides.forEach((slide, index) => {
            setTimeout(() => {
                slide.classList.add('visible');
            }, index * 100);
        });
    } else {
        // Reset animations when scrolled out of view
        sliderContainer.classList.remove('visible');
        slides.forEach(slide => {
            slide.classList.remove('visible');
        });
    }
}

// Initial check
checkVisibility();

// Add scroll event listener
window.addEventListener('scroll', checkVisibility);

// Touch events
slider.addEventListener('touchstart', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchend', () => {
    isDown = false;
    slider.classList.remove('active');
    document.body.style.userSelect = "auto";
});

slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
});

// Mouse events
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    document.body.style.userSelect = "none";
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
    document.body.style.userSelect = "auto";
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
    document.body.style.userSelect = "auto";
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
});

// Product data
const products = [
    {
        id: 'macbook',
        name: 'MacBook',
        image: 'assets/images/macbook.jpeg',
        price: '€1,299',
        description: 'Das neue MacBook vereint beeindruckende Leistung mit einem ultraleichten Design. Perfekt für kreative Profis und Studenten.'
    },
    {
        id: 'iphone16',
        name: 'iPhone 16',
        image: 'assets/images/iphone 16.jpeg',
        price: '€999',
        description: 'Das iPhone 16 setzt neue Maßstäbe in Sachen Innovation. Mit der A18 Pro Chip und einem revolutionären Kamerasystem.'
    },
    {
        id: 'airpods',
        name: 'AirPods',
        image: 'assets/images/airpods.jpeg',
        price: '€179',
        description: 'Die AirPods bieten ein magisches Hörerlebnis mit aktiver Geräuschunterdrückung und räumlichem Audio.'
    },
    {
        id: 'mac',
        name: 'Mac',
        image: 'assets/images/mac.jpeg',
        price: '€1,499',
        description: 'Der neue Mac ist ein Kraftpaket für Profis. Mit dem M2 Chip und einem beeindruckenden Retina Display.'
    },
    {
        id: 'macbook-pro',
        name: 'MacBook Pro',
        image: 'assets/images/macbook.jpeg',
        price: '€2,499',
        description: 'Das MacBook Pro ist die ultimative Workstation für Profis. Mit dem M3 Pro Chip und einem brillanten Display.'
    },
    {
        id: 'iphone16-pro',
        name: 'iPhone 16 Pro',
        image: 'assets/images/iphone 16.jpeg',
        price: '€1,299',
        description: 'Das iPhone 16 Pro ist die Spitzenversion mit Pro-Kamerasystem und Titanium-Design.'
    },
    {
        id: 'airpods-pro',
        name: 'AirPods Pro',
        image: 'assets/images/airpods.jpeg',
        price: '€249',
        description: 'Die AirPods Pro bieten aktive Geräuschunterdrückung und räumliches Audio für ein immersives Hörerlebnis.'
    },
    {
        id: 'mac-pro',
        name: 'Mac Pro',
        image: 'assets/images/mac.jpeg',
        price: '€7,999',
        description: 'Der Mac Pro ist die ultimative Workstation für Profis. Mit modularer Erweiterbarkeit und maximaler Leistung.'
    }
];

// Add click event listeners to slides
document.querySelectorAll('.slide').forEach((slide, index) => {
    slide.addEventListener('click', () => {
        const product = products[index];
        window.location.href = `pages/products/${product.id}.html`;
    });
});

// Smooth scroll for the scroll indicator
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    const sliderSection = document.querySelector('.slider-section');
    sliderSection.scrollIntoView({ behavior: 'smooth' });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.hero-title, .hero-subtitle, .section-title, .slider-container, .view-all-products').forEach(el => {
    observer.observe(el);
});
