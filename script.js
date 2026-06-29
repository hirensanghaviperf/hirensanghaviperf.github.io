// Smooth reveal animations on scroll
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(
        ".skill-card, .small-card, .proj-featured, .perf-card, .stat-box, section"
    );

    elements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)\";
        el.style.transition =
            "opacity 0.8s ease-out, transform 0.8s ease-out";
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)\";
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
                } else if (originalText.includes("M+")) {
                    counter.textContent = Math.floor(current) + "M+";
                } else {
                    counter.textContent = current.toFixed(2);
                }
                requestAnimationFrame(update);
            } else {
                counter.textContent = originalText;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                update();
                observer.disconnect();
            }
        });

        observer.observe(counter);
    });
});


// Navbar scrolling minimal decoration line switch
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)\";
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
        card.style.transform = "translateY(0)\";
    });
});


// Active navigation highlighting
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
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});


// HCLS Dashboard Carousel Navigation Engine
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("hcls-track");
    const prevBtn = document.getElementById("hcls-prev");
    const nextBtn = document.getElementById("hcls-next");
    
    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    
    const updateCarousel = () => {
        const slides = document.querySelectorAll("#hcls-track .carousel-slide");
        if (slides.length === 0) return;
        
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = 24; // Equivalent to the 1.5rem gap variable space in CSS
        track.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;
    };

    nextBtn.addEventListener("click", () => {
        const totalSlides = document.querySelectorAll("#hcls-track .carousel-slide").length;
        const maxIndex = window.innerWidth <= 768 ? totalSlides - 1 : totalSlides - 2;
        
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Seamlessly loop around back to start index position
        }
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        const totalSlides = document.querySelectorAll("#hcls-track .carousel-slide").length;
        const maxIndex = window.innerWidth <= 768 ? totalSlides - 1 : totalSlides - 2;
        
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // Jump back directly to tail position 
        }
        updateCarousel();
    });

    // Re-adjust bounds smoothly if dimensions change layout rules dynamically
    window.addEventListener("resize", updateCarousel);
});
