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
      lerp: 0.05,  // Adjust this value to make the scroll slower or faster. For example, 0.03 will be slower than 0.05.
      snap: {
          snapTo: 'center', // This will make it snap to the center of the closest section
          duration: 0.6,    // Duration of the snap animation (in seconds)
          offset: 0.2        // Start snapping when the next section is 20% into the viewport

      }
    });

    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
    });

    // GSAP Animation without ScrollTrigger
    gsap.to('.main-title span', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        delay: 1  // Delay of 1 second for the animation to start
    });

     // Add ScrollTrigger markers for each section
     const sections = document.querySelectorAll('[data-scroll-section]');
     sections.forEach((section) => {
         ScrollTrigger.create({
             trigger: section,
             start: 'top',
             end: 'bottom',
             markers: true,
         });
     });

    ScrollTrigger.addEventListener('refresh', () => scroll.update());
    ScrollTrigger.refresh();
});
