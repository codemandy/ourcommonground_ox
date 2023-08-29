import { gsap } from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugin
gsap.registerPlugin(ScrollToPlugin);

document.addEventListener('DOMContentLoaded', function() {
  let titleAnim = null;  // Store the GSAP animation

  // Start title animation
  window.startTitleAnimation = function() {
    if (titleAnim) {
      titleAnim.restart();
    } else {
      titleAnim = gsap.to('.title-span', {
        opacity: 1,
        duration: 0.5,
        stagger: 0.1
      });
    }
  };

  // Stop and reset title animation
  window.stopTitleAnimation = function() {
    if (titleAnim) {
      titleAnim.reverse();
    }
  };

  // Delay the initial animation
  setTimeout(() => {
    startTitleAnimation();
  }, 1000);

  // Smooth Scroll Logic
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      gsap.to(window, {
        scrollTo: {
          y: this.getAttribute('href').substr(1),
          autoKill: false
        },
        duration: 1
      });
    });
  });
});

document.addEventListener('alpine:init', () => {
  Alpine.data('counting', () => ({
    currentValue: 0,
    endValue: 100,
    init() {
      // Initialize counter
    },
    toggleCounting() {
      // Toggle counting logic
    },
    resetCounter() {
      // Reset counter logic
    }
  }));

  Alpine.data('sectionObserver', () => ({
    init() {
      const sections = document.querySelectorAll('[x-ref]');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log(`${entry.target.getAttribute('x-ref')} is in view`);
          }
        });
      });
      sections.forEach(section => {
        observer.observe(section);
      });
    }
  }));
});
