import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
  
  // Initialize LocomotiveScroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.05,
    snap: {
      snapTo: 'center',
      duration: 0.6,
      offset: 0.2
    }
  });

  // Update the scroll proxy to work with LocomotiveScroll
  ScrollTrigger.scrollerProxy(document.querySelector('[data-scroll-container]'), {
    scrollTop(value) {
      return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
  });

  // Refresh the ScrollTrigger after LocomotiveScroll updates
  scroll.on('scroll', ScrollTrigger.update);

  // Refresh ScrollTrigger when needed
  ScrollTrigger.addEventListener('refresh', () => scroll.update());
  ScrollTrigger.refresh();
  
  // Delay the animation using setTimeout or other mechanisms to ensure .dot is available
  setTimeout(() => {
    // Animate title
    gsap.to('.title-span', {
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      onComplete: animateDots
    });
    
    // Function to animate dots
    function animateDots() {
      gsap.to('.dot', {
        opacity: 1, // Animate to fully visible
        duration: 0.3,
        stagger: 0.2
      });
    }

  }, 1000); // Adjust the delay as needed

 // Function to animate dots on scroll
function animateDotsOnScroll() {
  ScrollTrigger.create({
    trigger: '.dots-container',
    start: 'top center', // Adjust as needed
    onEnter: () => {
      gsap.to('.dot:nth-child(1)', { x: '-100%', duration: 1 }); // Move left and out of view
      gsap.to('.dot:nth-child(2)', { x: '100%', duration: 1 });  // Move right and out of view
      gsap.to('.dot:nth-child(3)', { y: '100%', duration: 1, onComplete: lockToText }); // Move down to the next section
    }
  });
}

// Function to lock the third dot under a new text
function lockToText() {
  // Identify the new text element and position, you may need to adjust this
  const newTextElement = document.querySelector('.new-text');
  const position = newTextElement.getBoundingClientRect();

  // Position the third dot under the new text
  gsap.to('.dot:nth-child(3)', {
    x: position.left,
    y: position.top + newTextElement.offsetHeight + 10, // 10px spacing
    duration: 1
  });
}

// Call the function to set up the scroll animation
animateDotsOnScroll();
});
