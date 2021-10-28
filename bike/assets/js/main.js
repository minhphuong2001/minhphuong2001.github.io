// active link
const menuItems = document.querySelectorAll('.menu-item')

Array.from(menuItems).forEach((item) => {
    item.addEventListener('click', () => {
        let currMenu = document.querySelector('.menu-item.active');
        currMenu.classList.remove('active')
        item.classList.add('active')
    })
})

// toggle menu
const menuToggle = document.querySelector('.menu-toggle')
const menuClose = document.querySelector('.menu-close__mobile')
const headerMenu = document.querySelector('#menu')

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        headerMenu.classList.add('show-menu')
    })
}

if (menuClose) {
    menuClose.addEventListener('click', () => {
        headerMenu.classList.remove('show-menu')
    })
}

// hero silde
let heroSlide = document.querySelector('#hero-slide__container')

let heroSlideItem = document.querySelectorAll('.slide-item')

let heroSlideIndex = 0

let heroSlidePlay = true

let slideNext = document.querySelector('.slide-next')
let slidePrev = document.querySelector('.slide-prev')

let controlSlideItem = document.querySelectorAll('.slide-control__item')

function showSlide(index) {
    heroSlide.querySelector('.slide-item.active').classList.remove('active')
    document.querySelector('.slide-control__item.active').classList.remove('active')
    controlSlideItem[index].classList.add('active')
    heroSlideItem[index].classList.add('active')
}

function nextSlide() {
    heroSlideIndex = heroSlideIndex + 1 >= heroSlideItem.length ? 2 : heroSlideIndex + 1
    showSlide(heroSlideIndex)
}

function prevSlide() {
    heroSlideIndex = heroSlideIndex - 1 < 0 ? 0 : heroSlideIndex - 1
    showSlide(heroSlideIndex)
}

setTimeout(() => {
    heroSlideItem[0].classList.add('active')
}, 200)

slideNext.addEventListener('click', () => {
    nextSlide()
})

slidePrev.addEventListener('click', () => {
    prevSlide()
})

// add event when click on slide item
controlSlideItem.forEach((item, index) => {
    item.addEventListener('click', () => {
        showSlide(index)
    })
})

// auto play slide
// setInterval(() => {
//     if (!heroSlidePlay) return false;
//     nextSlide()
// }, 5000);

// scroll header
const header = document.querySelector('header')

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        header.classList.add('active')
    } else {
        header.classList.remove('active')
    }
})

// scroll up 
window.addEventListener('scroll', () => {
    const scrollUp = document.getElementById('scroll-up');

    if (this.scrollY >= 200) {
        scrollUp.classList.add('show-scroll')
    } else {
        scrollUp.classList.remove('show-scroll')
    }
})