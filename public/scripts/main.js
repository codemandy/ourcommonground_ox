import { gsap } from 'https://cdn.skypack.dev/gsap';
  import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';
  
  gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {

  function initCounter(triggerSelectorStart, triggerSelectorEnd, startVal, endVal, counterElementId) {
    let cont = { val: startVal };
    const counterElement = document.getElementById(counterElementId);
  
    function updateCounter() {
      const tolerance = 2; // The range within which to snap to the end value
      let valToDisplay = Math.floor(cont.val);
    
      // If the value is within the tolerance range, snap it to the end value
      if (Math.abs(valToDisplay - endVal) <= tolerance) {
        valToDisplay = endVal;
      }
    
      counterElement.innerHTML = valToDisplay;
    }
    
  
    gsap.to(cont, {
      val: endVal,
      roundProps: "val",
      onUpdate: updateCounter,
      scrollTrigger: {
        trigger: triggerSelectorStart,
        start: "top top",
        endTrigger: triggerSelectorEnd,
        end: "bottom+=50 bottom",
        onUpdate: self => {
          if (self.isActive) {
            counterElement.style.display = "block";
          } else {
            counterElement.style.display = "none";
          }
        },
        onToggle: self => {
          if (!self.isActive) {
            cont.val = startVal;  // Reset to startVal when not active
          }
        },
        scrub: true,
        markers: true,
        scroller: "[data-router-wrapper]"
      },
      ease: "linear"
    });
  }
  

  // Initialize counters with the same counterElementId
  initCounter('.page2', '.page2', 1800, 1893, 'timeline__years');
  initCounter('.page2', '.page22', 1893, 1953, 'timeline__years');
  initCounter('.page22', '.page3', 1953, 1970, 'timeline__years');
});
