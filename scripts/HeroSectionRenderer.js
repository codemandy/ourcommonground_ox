// HeroSectionRenderer.js
import { gsap } from 'gsap';
import Highway from '@dogstudio/highway';

class HeroSectionRenderer extends Highway.Renderer {
  onEnter() {
    // Your JS for HeroSection here, such as the main-title animation
    gsap.to('.main-title', {
      opacity: 1,
      duration: 0.5,
      stagger: 0.1
    });
  }

  onLeave() {
    // Remove or hide elements, stop timers etc.
  }

  onEnterCompleted() {
    // Code that should run when the transition to display is done
  }

  onLeaveCompleted() {
    // Code that should run when the element is removed from the DOM
  }
}

export default HeroSectionRenderer;
