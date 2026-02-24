function navigationBarOpen() {
    const navBar = document.querySelector(".navigation-bar");
    const navItems = document.querySelector(".navigation-items");
    const navCloseButtonHam = document.querySelector(".navigation-open");
    const navCloseButtonX = document.querySelector(".navigation-close");
    
    navCloseButtonHam.classList.toggle("hidden");
    navCloseButtonX.classList.toggle("hidden");
    navItems.classList.toggle("hidden");
    navBar.classList.toggle("full");
}

function navigationBarClose() {
    const navBar = document.querySelector(".navigation-bar");
    const navItems = document.querySelector(".navigation-items");
    const navCloseButtonHam = document.querySelector(".navigation-open");
    const navCloseButtonX = document.querySelector(".navigation-close");

    navCloseButtonHam.classList.toggle("hidden");
    navCloseButtonX.classList.toggle("hidden");
    navItems.classList.toggle("hidden");
    navBar.classList.toggle("full");
}