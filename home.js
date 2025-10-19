 document.addEventListener('DOMContentLoaded', function() {
      const scrollReveals = document.querySelectorAll('.scroll-reveal');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.1 });
      scrollReveals.forEach(el => observer.observe(el));
    });


    // home.js — Busify Home Page Script

document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------
     1️⃣ Navbar Scroll Effect
  ----------------------------- */
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  /* -----------------------------
     2️⃣ Smooth Scrolling for Anchors
  ----------------------------- */
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* -----------------------------
     3️⃣ Scroll Reveal Animations
  ----------------------------- */
  const revealElements = document.querySelectorAll(".scroll-reveal");
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target); // Trigger once
        }
      });
    },
    { threshold: 0.15 }
  );
  revealElements.forEach(el => revealObserver.observe(el));

  /* -----------------------------
     4️⃣ Dynamic Alert Styling
     - Highlights high-priority alerts
  ----------------------------- */
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach(alert => {
    const priority = alert.classList.contains("high")
      ? "High"
      : alert.classList.contains("medium")
      ? "Medium"
      : "Notice";

    alert.setAttribute("data-priority", priority);
  });

  /* -----------------------------
     5️⃣ Hero Button Hover Effect
  ----------------------------- */
  const heroBtn = document.querySelector(".btn-primary");
  if (heroBtn) {
    heroBtn.addEventListener("mouseenter", () => {
      heroBtn.classList.add("hovered");
    });
    heroBtn.addEventListener("mouseleave", () => {
      heroBtn.classList.remove("hovered");
    });
  }

  /* -----------------------------
     6️⃣ Scroll to Top Button (Optional)
  ----------------------------- */
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.textContent = "↑";
  scrollTopBtn.className = "scroll-top-btn";
  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });
});
