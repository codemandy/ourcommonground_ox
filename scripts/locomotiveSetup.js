import Highway from '@dogstudio/highway';
import { gsap } from 'gsap';

class BasicRenderer extends Highway.Renderer {
  onEnterCompleted() {
    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Debug: log when the observer triggers
          console.log("Intersection Observer triggered");
          
          // Initialize counter
          const counter = { year: 1893 };
          const counterElement = document.getElementById('counter');

          // Make sure the element exists
          if (counterElement) {
            gsap.to(counter, {
              year: 2021,
              duration: 5,
              onUpdate: () => {
                counterElement.textContent = Math.floor(counter.year);
              }
            });
          } else {
            console.log("Counter element not found");
          }
        }
      });
    });

    // Observe the herosection
    const heroSection = document.querySelector('.herosection');
    if (heroSection) {
      observer.observe(heroSection);
    } else {
      console.log("Hero section not found");
    }
  }
}

// Initialize Highway.Core
document.addEventListener("DOMContentLoaded", function() {
  const H = new Highway.Core({
    renderers: {
      hero: HeroSectionRenderer
    }
  });
});
