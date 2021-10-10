const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

// SWIPER DISCOVER
let swiper = new Swiper(".discover__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
})

// VIDEO
const videoFile = document.getElementById('video-file'),
    videoBtn = document.getElementById('video-button'),
    videoIcon = document.getElementById('video-icon');

function playPause() {
    if (videoFile.paused) {
        videoFile.play();
        videoIcon.classList.add('ri-pause-line')
        videoIcon.classList.remove('ri-play-line')
    } else {
        videoFile.pause();
        videoIcon.classList.remove('ri-pause-line')
        videoIcon.classList.add('ri-play-line')
    }
}
videoBtn.addEventListener('click', playPause);

function finalVideo() {
    videoIcon.classList.remove('ri-pause-line')
    videoIcon.classList.add('ri-play-line')
}

videoFile.addEventListener('ended', finalVideo)

// CHANGE BGC HEADER
function scrollHeader() {
    const header = document.getElementById('header')
    if (this.scrollY >= 100)
        header.classList.add('scroll-header')
    else
        header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

// SCROLL UP
window.addEventListener('scroll', () => {
    const scrollUp = document.getElementById('scroll-up');
    
    if (this.scrollY >= 200)
        scrollUp.classList.add('show-scroll')
    else
        scrollUp.classList.remove('show-scroll')
})

// SCROLL SECTION ACTIVE LINK
const section = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    section.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        
        sectionId = current.getAttribute('id')
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
});

// REMOVE MENU
const navLink = document.querySelectorAll('.nav__link');
function linkAction() {
    navMenu.classList.remove('show-menu') 
}
navLink.forEach(item => item.addEventListener('click', linkAction));

// DARK MODE
const themeBtn = document.getElementById('theme-button');
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => {
    return document.body.classList.contains(darkTheme) ? 'dark' : 'light'
}

const getCurrentIcon = () => {
    return themeBtn.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'
}

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeBtn.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeBtn.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    // reset: true,
})


sr.reveal(`.home__data,.home__social, .home__social-link, .home__info,
           .discover__container,
           .content__data, .experience__overlay,
           .place__card,
           .sponsor__container-content,
           .footer`,{
    origin: 'top',
    interval: 100,
})

sr.reveal(`.about__data, 
           .video__description,
           .subscribe__description`,{
    origin: 'left',
})

sr.reveal(`.about__img-overlay, 
           .video__content,
           .form`,{
    origin: 'right',
    interval: 100,
})