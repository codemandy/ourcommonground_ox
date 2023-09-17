import { gsap } from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {

  function initCounter(triggerSelectorStart, triggerSelectorEnd, startVal, endVal, counterElementId) {
    let cont = { val: startVal };
    const counterElement = document.getElementById(counterElementId);
    
    function updateCounter() {
      let valToDisplay = Math.floor(cont.val);
      counterElement.innerHTML = valToDisplay;
    }
  
    return gsap.to(cont, {
      val: endVal,
      roundProps: "val",
      onUpdate: updateCounter,
      scrollTrigger: {
        trigger: triggerSelectorStart,
        start: "top top",
        endTrigger: triggerSelectorEnd,
        end: "bottom bottom",
        
        onUpdate: self => {
          if (self.progress > 0.95) {
            cont.val = endVal;
            updateCounter();
          }
          if (self.isActive) {
            counterElement.style.display = "block";
          } else {
            counterElement.style.display = "none";
          }
        },
        scrub: true,
        markers: true,
        scroller: "[data-router-wrapper]"
      },
      ease: "none"
    });
  }

  // Initially hide the counter
  const counterElement = document.getElementById('timeline__years');
  counterElement.style.display = "none";

  // ScrollTrigger for page2
  ScrollTrigger.create({
    trigger: '.page2',
    start: "top top",
    end: "bottom bottom",
    onUpdate: self => {
      if (self.isActive) {
        counterElement.style.display = "block";
        counterElement.innerHTML = 1893;
      } else {
        counterElement.style.display = "none";
      }
    },
    markers: false,
    scroller: "[data-router-wrapper]"
  });

  const anim2 = initCounter('.page2', '.page22', 1893, 1953, 'timeline__years');
  const anim3 = initCounter('.page22', '.page3', 1953, 1970, 'timeline__years');

  gsap.timeline({
    scrollTrigger: {
      trigger: '.page2',
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      markers: true,
      scroller: "[data-router-wrapper]",
    }
  })
  .add(anim2)
  .add(anim3);
});
