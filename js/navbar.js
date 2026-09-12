/* =========================================================
   NAVBAR
========================================================= */

const menu = document.getElementById("menu");
const links = document.querySelector(".links");
const resume = document.getElementById("resume");


/* =========================================================
   MOBILE MENU
========================================================= */

menu.addEventListener("click", function () {

    links.classList.toggle("open");

});


/* =========================================================
   CLOSE MENU AFTER LINK CLICK
========================================================= */

const navLinks = document.querySelectorAll(".links a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        links.classList.remove("open");

    });

});


/* =========================================================
   RESUME
========================================================= */

resume.addEventListener("click", function () {

    window.open(
        "/asets/cv_v2.pdf",
        "_blank"
    );

});