// Hide navbar on scroll down
let prevScrollPos = window.pageYOffset;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        navbar.style.transform = 'translateY(0)';
    } else {
        navbar.style.transform = 'translateY(-100%)';
    }

    prevScrollPos = currentScrollPos;
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menu-toggle');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            menuToggle.checked = false;
        }
    });
});

// Update active link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});



const text = "Full Stack Software Developer";
const typingTarget = document.getElementById("typing-text");

let index = 0;

function typeLetter() {
    if (index < text.length) {
        typingTarget.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeLetter, 100); // typing speed (ms)
    }
}

typeLetter();
