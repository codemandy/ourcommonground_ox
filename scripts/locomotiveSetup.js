import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOMContentLoaded fired");  // Check if DOMContentLoaded event is being fired

  const scrollContainer = document.querySelector('[data-scroll-container]');
  console.log("Scroll Container:", scrollContainer);  // Check if the scroll container is being selected correctly

  const scroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    getSpeed: true,
    getDirection: true
  });

  scroll.on('scroll', () => {
    console.log("Scrolling...");  // Check if the LocomotiveScroll instance is scrolling
    ScrollTrigger.update();
  });

  ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
      return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
  });

  // GSAP animations
  const animateElements = gsap.utils.toArray("[data-scroll-section] .animate-me");
  console.log("Animate Elements:", animateElements);  // Check if the elements to be animated are being selected correctly

  animateElements.forEach(el => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: el,
        start: "top center",
        end: "bottom center",
        scrub: true
      }
    });
  });

  // Refresh ScrollTrigger when necessary
  ScrollTrigger.addEventListener("refresh", () => {
    console.log("ScrollTrigger refreshed");  // Check if ScrollTrigger is being refreshed
    scroll.update();
  });

  ScrollTrigger.refresh();
});
