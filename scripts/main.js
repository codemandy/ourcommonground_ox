import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

  document.addEventListener("DOMContentLoaded", function () {
    // Wait for the DOM to fully load
    setTimeout(() => {
      const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
      });
  
      ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
          return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
      });
  
      const counterElement = document.getElementById("timeline__years");
      counterElement.style.display = "none";
      let cont = { val: 1800 };
  
      function updateCounter() {
        counterElement.innerHTML = Math.floor(cont.val);
      }
  
      const targetElement = document.querySelector("[data-scroll-target='#page2']");
  
      if (targetElement) {
        const distance = targetElement.offsetHeight;
  
        gsap.to(cont, {
          scrollTrigger: {
            trigger: targetElement,
            start: "top center",
            onEnter: () => counterElement.style.display = "block",
            onLeaveBack: () => counterElement.style.display = "none",
            end: `+=${distance}`,
            scrub: 1,
            scroller: "[data-scroll-container]",
          },
          val: 1893,
          roundProps: "val",
          onUpdate: updateCounter,
          ease: "linear",
        });
      } else {
        console.error('Target element not found');
      }
    }, 0);
  });
  