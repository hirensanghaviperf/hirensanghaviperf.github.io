// Smooth reveal animations on scroll
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(
        ".skill-card, .small-card, .proj-featured, .perf-card, .stat-box, section"
    );

    elements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition =
            "opacity 0.8s ease-out, transform 0.8s ease-out";
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
});


// Animated counter for stats
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stat-num");

    counters.forEach((counter) => {
        const originalText = counter.textContent;
        const target = parseFloat(originalText.replace(/[^0-9.]/g, ""));

        if (!target) return;

        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);

        const update = () => {
            current += step;

            if (current < target) {
                if (originalText.includes("%")) {
                    counter.textContent = Math.floor(current) + "%";
                } else {
                    counter.textContent = Math.floor(current);
                }

                requestAnimationFrame(update);
            } else {
                counter.textContent = originalText;
            }
        };

        update();
    });
});


// Navbar shadow on scroll
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");

    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
    } else {
        nav.style.boxShadow = "none";
    }
});


// Hover tilt effect
document.querySelectorAll(".skill-card, .small-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 8;
        const rotateX = (y / rect.height - 0.5) * -8;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-4px)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });
});


// HCLS report carousel — scroll one pane (one report) per click
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("hclsCarousel");
    const left = document.getElementById("hclsArrowLeft");
    const right = document.getElementById("hclsArrowRight");

    if (!track || !left || !right) return;

    const scrollByPane = (direction) => {
        const paneWidth = track.querySelector(".carousel-pane").getBoundingClientRect().width;
        track.scrollBy({ left: direction * paneWidth, behavior: "smooth" });
    };

    left.addEventListener("click", () => scrollByPane(-1));
    right.addEventListener("click", () => scrollByPane(1));

    const updateArrows = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        left.style.opacity = track.scrollLeft <= 4 ? "0.35" : "1";
        right.style.opacity = track.scrollLeft >= maxScroll - 4 ? "0.35" : "1";
    };

    track.addEventListener("scroll", updateArrows);
    updateArrows();
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.style.color = "";

        if (
            link.getAttribute("href") &&
            link.getAttribute("href").includes(current)
        ) {
            link.style.color = "#c4852a";
        }
    });
});
