import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {

  function initCounter(triggerSelectorStart, triggerSelectorEnd, startVal, endVal, scrollerSelector) {
    let cont = { val: startVal };
    const counterElement = document.getElementById("timeline__years");

    function updateCounter() {
      counterElement.innerHTML = Math.floor(cont.val);
    }

    gsap.to(cont, {
      scrollTrigger: {
        trigger: triggerSelectorStart,
        start: "top top",
        endTrigger: triggerSelectorEnd,
        end: "center center",
        onLeave: () => {
          counterElement.style.display = "block";
          gsap.to(cont, { val: endVal, roundProps: "val", onUpdate: updateCounter, ease: "linear", duration: 0.5 });
        },
        onEnterBack: () => { counterElement.style.display = "none"; },
        onEnter: () => { counterElement.style.display = "block"; },
        scrub: 1,
        markers: true,
        scroller: "[data-router-wrapper]"
      },
      val: endVal,
      roundProps: "val",
      onUpdate: updateCounter,
      ease: "linear"
    });
  }

  // Initialize counters
  initCounter('.page2', '.page2', 1800, 1893, '.page2');
  initCounter('.page2', '.page22', 1893, 1953, '.page22');
  initCounter('.page22', '.page3', 1853, 1970, '.page3');

});
