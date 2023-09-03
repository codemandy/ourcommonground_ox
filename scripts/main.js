import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  const counterElement = document.getElementById("timeline__years");
  counterElement.style.display = "none"; // Initially set to none
  let cont = { val: 1800 }; // Start year
  
  let endValue = 2021; // Default end value

  function updateCounter() {
    counterElement.innerHTML = Math.floor(cont.val);
  }

  const distance = window.innerHeight * 5;

  gsap.to(cont, {
    scrollTrigger: {
      trigger: ".timeline__content",
      start: "bottom center",
      onEnter: ({trigger}) => { 
        counterElement.style.display = "block";
        endValue = parseInt(trigger.dataset.endYear, 10);
        gsap.to(cont, {val: endValue, roundProps: "val", onUpdate: updateCounter, ease: "linear"});
      },
      onLeaveBack: () => { counterElement.style.display = "none"; },
      end: () => `+=${distance}`,
      scrub: 1,
      scroller: "[data-router-wrapper]"
    },
    val: endValue,
    roundProps: "val",
    onUpdate: updateCounter,
    ease: "linear"
  });
});
