// window.addEventListener("resize", function (e) {

// });

function navigationBarOpen() {

    const navBar = document.querySelector(".navigation-bar");
    const navItems = document.getElementById("navigation-items-bar");
    const navCloseButtonHam = document.querySelector(".navigation-open");
    const navCloseButtonX = document.querySelector(".navigation-close");
    
    console.log("Open!");

    navCloseButtonHam.classList.toggle("hidden");
    navCloseButtonX.classList.toggle("hidden");


    navItems.classList.toggle("hidden");

    navBar.classList.toggle("full");



}

function navigationBarClose() {

    const navBar = document.querySelector(".navigation-bar");
    const navItems = document.getElementById("navigation-items-bar");
    const navCloseButtonHam = document.querySelector(".navigation-open");
    const navCloseButtonX = document.querySelector(".navigation-close");

    console.log("Close!");

    navCloseButtonHam.classList.toggle("hidden");
    navCloseButtonX.classList.toggle("hidden");


    navItems.classList.toggle("hidden");

    navBar.classList.toggle("full");



}