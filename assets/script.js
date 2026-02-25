function navigationBarOpen() {
    const navBar = document.querySelector(".navigation-bar");
    const navItems = document.querySelector(".navigation-items");
    const navCloseButtonHam = document.querySelector(".navigation-open");
    const navCloseButtonX = document.querySelector(".navigation-close");
    
    navCloseButtonHam.classList.toggle("hidden-mobile");
    navCloseButtonX.classList.toggle("hidden-mobile");
    navItems.classList.toggle("hidden-mobile");
    navBar.classList.toggle("full");
}

function navigationBarClose() {
    const navBar = document.querySelector(".navigation-bar");
    const navItems = document.querySelector(".navigation-items");
    const navCloseButtonHam = document.querySelector(".navigation-open");
    const navCloseButtonX = document.querySelector(".navigation-close");

    navCloseButtonHam.classList.toggle("hidden-mobile");
    navCloseButtonX.classList.toggle("hidden-mobile");
    navItems.classList.toggle("hidden-mobile");
    navBar.classList.toggle("full");
}