import Highway from '@dogstudio/highway';
import { gsap } from 'gsap';

class CustomTransition extends Highway.Transition {
  in({ from, to, trigger, done }) {
    // You can use gsap animations here to animate the `to` element into view
    gsap.fromTo(to, { opacity: 0 }, {
      opacity: 1,
      duration: 0.5,
      onComplete: done  // Important to call done() when the animation is complete
    });
  }

  out({ from, trigger, done }) {
    // You can use gsap animations here to animate the `from` element out of view
    gsap.fromTo(from, { opacity: 1 }, {
      opacity: 0,
      duration: 0.5,
      onComplete: done  // Important to call done() when the animation is complete
    });
  }
}

export default CustomTransition;
