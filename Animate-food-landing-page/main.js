
// top menu active
var menuItems = document.getElementsByClassName("menu-item");

Array.from(menuItems).forEach((item) => {
    item.onclick = (e) => {
        let curMenuItem = document.querySelector(".menu-item.active");
        curMenuItem.classList.remove("active")
        item.classList.add("active");
    }
})

// food category
var foodMenuList = document.querySelector(".food-item__wrapper");
var foodCategory = document.querySelector(".food-category");
var categories = document.querySelectorAll("button");

Array.from(categories).forEach((item) => {
    item.onclick = (e) => {
        let curCate = foodCategory.querySelector("button.active")
        curCate.classList.remove("active")
        e.target.classList.add("active")
        foodMenuList.classList = "food-item__wrapper" + e.target.getAttribute("data-food-type")
    }
})

// back to top
const backToTop = document.querySelector(".back-to-top")
window.onscroll = () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTop.style.display = 'flex'
    } else {
        backToTop.style.display = 'none'
    }
}

// mobile nav
var bottomNavItem = document.querySelectorAll(".mobile-nav__item");

var bottomMove = document.querySelector(".mobile-move-item");

bottomNavItem.forEach((item, index) => {
    item.onclick = (e) => {
        let curItem = document.querySelector(".mobile-nav__item.active")
        curItem.classList.remove("active")
        item.classList.add("active")
        bottomMove.style.left = index * 25 + "%"
    }
})

// dark mode 
const themeBtn = document.getElementById('theme-button');
const darkTheme = 'dark-theme'
const iconTheme = 'bxs-sun'

const selectedTheme = localStorage.getItem('theme-mode')
const selectedIcon = localStorage.getItem('theme-icon')

const getCurrentTheme = () => {
    return document.body.classList.contains(darkTheme) ? 'dark' : 'light';
}

const getCurrentIcon = () => {
    return themeBtn.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun';
}

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeBtn.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme);
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeBtn.classList.toggle(iconTheme)

    localStorage.setItem('theme-mode', getCurrentTheme())
    localStorage.setItem('theme-icon', getCurrentIcon())
})

// scroll smooth
const scrollReveal = ScrollReveal({
    distance: '60px',
    duration: 2500
})

scrollReveal.reveal(`
    .home-container__slogan, .top-to-bottom
`, {
    origin: 'top',
    interval: 100
})

scrollReveal.reveal(`
    .about-container__img, .food-category,
    .left-to-right
`, {
    origin: 'left'
})

scrollReveal.reveal(`
    .about-main__content, .right-to-left
`, {
    origin: 'right'
})

scrollReveal.reveal(`.footer-main`,
{
    origin: 'bottom'
})