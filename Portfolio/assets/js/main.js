// Portfolio isotope and filter

const select = (ele, all = false) => {
    ele = ele.trim();

    if (all) {
        return [...document.querySelectorAll(ele)]
    } else {
        return document.querySelector(ele)
    }
}

const on = (type, ele, listener, all = false) => {
    let selectElement = select(ele, all)
    if (selectElement) {
        if (all) {
            selectElement.forEach(e => e.addEventListener(type, listener));
        } else {
            selectElement.addEventListener(type, listener)
        }
    }
}

const onscrolls = (ele, listener) => {
    ele.addEventListener('scroll', listener)
}

// navbar link active on scroll

let navbarLinks = select('#navbar, .scrollTo', true)
const navbarLinkActive = () => {
    let position = window.scrollY + 200
    navbarLinks.forEach(item => {
        if (!item.hash)
            return;
        let section = select(item.hash)
        if (!section)
            return;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            item.classList.add('active')
        } else {
            item.classList.remove('active')
        }
    })
}

window.addEventListener('load', navbarLinkActive)
onscrolls(document, navbarLinkActive)

// scroll to an element with header offset

const scrollto = (element) => {
    let elementPos = select(element).offsetTop;
    window.scrollTo({
        top: elementPos,
        behavior: 'smooth'
    })
}

// mobile nav toggle
on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
})

// click navbar -> remove header
on('click', '.scrollTo', function (e) {
    if (select(this.hash)) {
        e.preventDefault();

        let body = select('body');
        if (body.classList.contains('mobile-nav-active')) {
            body.classList.remove('mobile-nav-active')
        }
        scrollto(this.hash)
    }
}, true)

window.addEventListener('load', () => {
    if (window.location.hash) {
        if (select(window.location.hash)) {
            scrollto(window.location.hash)
        }
    }
})

// back to top

const backToTop = select('.back-to-top')
if (backToTop) {
    const toggleBackToTop = () => {
        if (window.scrollY > 100) {
            backToTop.classList.add('active')
        } else {
            backToTop.classList.remove('active')
        }
    }
    window.addEventListener('load', toggleBackToTop)
    onscrolls(document, toggleBackToTop)
}

// filter image
window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item'
        });

        let portfolioFilters = select('#portfolio-filters li', true);

        on('click', '#portfolio-filters li', function (e) {
            e.preventDefault();

            portfolioFilters.forEach(function (ele) {
                ele.classList.remove('filter-active');
            });
            this.classList.add('filter-active');

            portfolioIsotope.arrange({
                filter: this.getAttribute('data-filter')
            });
            portfolioIsotope.on('arrangeComplete', function () {
                AOS.refresh();
            })
        }, true)
    }
});

const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
});

// testimonials slider 
new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplat: {
        delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 20
        }
    }
})

// scroll reveal animation
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500
})

sr.reveal(`.main-info, .skills-content, .testimonials-slider, .header-footer`,
    {
        origin: 'top'
    }
)

sr.reveal(`.about-img, .resume-main-left, .contact-info`, {
    origin: 'left',
})

sr.reveal(`.about-content, .resume-main-right, .contact-form`, {
    origin: 'right',
})

sr.reveal(`.portfolio-title, .portfolio-container, .services-container`, {
    origin: 'bottom',
    interval: 500
})