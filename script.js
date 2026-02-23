function navigationBarToggle() {

    const navBar = document.querySelector(".navigation-bar");
    const navItems = document.getElementById("navigation-items-bar");
    const navCloseButtonHam = document.querySelector(".navigation-close > svg:first-child");
    const navCloseButtonX = document.querySelector(".navigation-close > svg:nth-child(2)");
    
    console.log("Click!");

    navCloseButtonHam.classList.toggle("visible");
    navCloseButtonX.classList.toggle("visible");

    navCloseButtonHam.classList.toggle("hidden");
    navCloseButtonX.classList.toggle("hidden");

    navItems.classList.toggle("visible");
    navItems.classList.toggle("hidden");

    navBar.classList.toggle("full");



}