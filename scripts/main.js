import { gsap } from 'gsap';

document.addEventListener("DOMContentLoaded", function() {
  
  let titleAnim;  // Store the GSAP animation

// Function to start title animation
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

// Function to stop and reset title animation
window.stopTitleAnimation = function() {
  if (titleAnim) {
    titleAnim.reverse();
  }
};


  // Delay the initial animation
  setTimeout(() => {
    startTitleAnimation();
  }, 1000);
});
