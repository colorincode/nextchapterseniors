
//optional import tests only, these are not crucial to build steps
// deno-lint-ignore-file
// import * as THREE from 'three';
import gsap, { SteppedEase} from 'gsap'
import Draggable from 'gsap';
import EasePack from 'gsap';
import { Power4 } from 'gsap';
import Observer from 'gsap';
import Timeline from 'gsap';
import ScrollToPlugin from 'gsap';
import './module.ts';
import Splide from '@splidejs/splide';
import { Intersection } from '@splidejs/splide-extension-intersection';

const splide = new Splide( '.splide', {
  type    : 'loop',
  autoplay: 'pause',
  perPage : 1,
   intersection: {
    rootMargin: '200px',
    inView: {
      autoplay: true,
      keyboard: true,
      autoscroll: true,
    },
    outView: {
      autoplay: false,
      keyboard: false,
      autoscroll: false,
    },
  },
} );
splide.mount();
splide.on( 'intersection:in', function ( entry: { target: any } ) {
  console.log( 'in', entry.target );
} );
//gsap registration, global scope
gsap.registerPlugin(EasePack);
gsap.registerPlugin(SteppedEase);
gsap.registerPlugin(Timeline);
gsap.registerPlugin(Power4);
gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollToPlugin);
// const window: Window & typeof globalThis;
let mm = gsap.matchMedia(),
    breakPoint = 800;

let isLoaded = false;
let isLoadingAnimationEnd = false;
const hamburger = document.querySelector('.hamburger') as HTMLButtonElement;
const navList = document.querySelector('.navbar__list--horizontal') as HTMLUListElement;
const navBar = document.querySelector(".navbar--top") ;
// const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.navbar__item--horizontal');
let anchorLinks = gsap.utils.toArray(navLinks);
const toggleButton = document.querySelector('.form__toggle-button') as HTMLButtonElement;
const toggleButtonMain = document.querySelector('.leadin--cta-btn') as HTMLButtonElement;
const closeButton = document.querySelector('#closeButton') as HTMLButtonElement;
const iframeContainer = document.querySelector('#iframeContainer') as HTMLIFrameElement ;
let isOpen = false;
const tl = gsap.timeline({
    defaults: {
      ease: "power4.inOut",
    //   opacity:0,
    }
  });


   function toggleIframe() {
        if (isOpen) {
            // Slide out
            tl.to(iframeContainer, {
                x: '100%',
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    iframeContainer.style.display = 'none';
                }
            });
            toggleButton.textContent = 'Open Form';
        } else {
            // Slide in
            iframeContainer.style.display = 'flex';
            tl.fromTo(
                iframeContainer,
                { x: '100%' },
                { x: '0%', duration: 0.5, ease: 'power2.out' }
            );
            toggleButton.textContent = 'Close Form';
            
        }
        isOpen = !isOpen;
    }


const tlTrios = gsap.timeline({ paused: true });
// tlTrios.to(iframeContainer, {
//   duration: 0.5,
//   x: 400,
//   opacity: 0.8,
//   ease: 'power2.out',
// });

tlTrios.to(iframeContainer, {
  x: '0',
  duration: 0.5,
  ease: 'power2.out',
});
let isOpen2 = false;
       function toggleIframetertiary() {
        toggleButtonMain.classList.toggle('active');
        // let isClicked = toggleButtonMain.classList.contains("active");
          
        if (!isOpen2) {
          console.log("if");
          tlTrios.play();
        // tlTrios.reverse();
            toggleButton.textContent = 'Open Form';
        } else {
          console.log("else");
            // Slide in
            // tlTrios.play();
            tlTrios.reverse();
            iframeContainer.style.display = 'flex';
          //   tlTwo.to(iframeContainer, {
          //       x: '0%',
          //       duration: 0.5,
          //       ease: 'power2.out',
          // })
            toggleButton.textContent = 'Close Form';
            
        }
        isOpen2 = !isOpen2;
    }
  //  function toggleIframetertiary() {
  //   console.log("toggled poo");
  //   let isClicked = toggleButtonMain.classList.contains("active");
  //   toggleButtonMain.classList.toggle('active');
  //   // if (isClicked) {
  //   //   iframeContainer.style.display = 'flex';
  //   //   tl.fromTo(
  //   //       iframeContainer,
  //   //       { x: '100%' },
  //   //       { x: '0%', duration: 0.5, ease: 'power2.out', 
      
  //   //       }
  //   //   );
  //   //         toggleButtonMain.textContent = 'Close Form';
          
  //   //          console.log("toggled close poo");
  //   //       }
  //   // else {
  //   //           tl.to(iframeContainer, {
  //   //             x: '100%',
  //   //             duration: 0.5,
  //   //             ease: 'power2.out',
  //   //             // onComplete: () => {
  //   //             //     iframeContainer.style.display = 'none';
  //   //             // }
  //   //         });
  //   //         toggleButtonMain.textContent = 'Open Form';
  //   //       }
  //           if (isClicked) {
  //             toggleButtonMain.textContent = 'Close Form';
  //             tlTwo.reverse();
  //           } else {
  //             toggleButtonMain.textContent = 'Open Form';
  //             iframeContainer.style.display = 'flex';
  //             tlTwo.play();
  //           }
  //       // if (isOpen ) {
  //       //     console.log("if toggled ");
  //       //     tl.to(iframeContainer, {
  //       //         x: '100%',
  //       //         duration: 4,
  //       //         ease: 'power2.out',
  //       //         // onComplete: () => {
  //       //         //     iframeContainer.style.display = 'none';
  //       //         // }
  //       //     });
  //       //     toggleButtonMain.textContent = 'Open Form';
  //       // } else {
  //       //     iframeContainer.style.display = 'flex';
  //       //    tl.fromTo(
  //       //         iframeContainer,
  //       //         { x: '100%' },
  //       //         { x: '0%', duration: 0.5, ease: 'power2.out' }
  //       //     );
  //       //     toggleButtonMain.textContent = 'Close Form';
  //       //      console.log("toggled close poo");
  //       // }
  //       // isOpen = !isOpen;
  //   }

toggleButton.addEventListener('click', toggleIframe);
closeButton.addEventListener('click', toggleIframe);

toggleButtonMain.addEventListener('click',(e) => {
  // toggleButtonMain.classList.add("active");
  // toggleButtonMain.classList.toggle('active');
  toggleIframetertiary();

});
// closeButton.addEventListener('click', toggleIframe);
    // Optional: Close on outside click
    document.addEventListener('click', (e) => {
        if (isOpen && !iframeContainer.contains(e.target) && !toggleButton.contains(e.target)) {
            toggleIframe();
            // toggleIframetertiary();
        }
    });

function openMobileMenu() {
  gsap.to('.navbar__list--horizontal', {
    x: 0,
    opacity: 1,
    duration: 0.5,
    pointerEvents: 'auto',
    ease: 'power4.out'
  });
}

      
// Helper: Animate mobile menu out
function closeMobileMenu() {
  gsap.to('.navbar__list--horizontal', {
    x: '-100%',
    opacity: 0,
    duration: 0.4,
    pointerEvents: 'none',
    ease: 'power4.in'
  });
  navBar.classList.remove("active");
}


function setupSmoothAnchors() {
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = (this as HTMLAnchorElement).getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 70 },
        ease: 'power2.out'
      });
      
      // For mobile: close menu after click
       mm.add("(min-width: 787px)", () => {
        closeMobileMenu();
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
       });
      // if (window.innerWidth <= 768) {
      //   closeMobileMenu();
      //   hamburger.classList.remove('open');
      //   hamburger.setAttribute('aria-expanded', 'false');
      // }
    });
  });
}
// function closeMenuOnClick() {
// anchorLinks.forEach(anchor => {
//   anchor.addEventListener('click', function (e:Event) {
//     closeMobileMenu();
//   })
// })
// }

// Close menu on outside click (mobile only)
function setupClickOutside() {
  const clickHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isMenuClick = navList.contains(target) || hamburger.contains(target);
    
    if (!isMenuClick && navList.classList.contains('active')) {
      closeMobileMenu();
      hamburger.classList.remove('open');
    }
  };

  mm.add("(max-width: 786px)", () => {
    document.addEventListener('click', clickHandler);
    
    // Cleanup
    return () => document.removeEventListener('click', clickHandler);
  });
}

function setupHamburgerMenu() {
  // Initial mobile menu state

  
  gsap.set(navList, { x: '-100%', opacity: 0, pointerEvents: 'none' });

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) {
      navList.classList.add('active');
      navBar.classList.add("active");
      openMobileMenu();
    } else {
      // closeMenuOnClick();
      closeMobileMenu();
      setTimeout(() => navList.classList.remove('active'), 400);
    }
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      gsap.set(navList, { clearProps: 'all' });
      navList.classList.remove('active');
      navBar.classList.remove("active");
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    } else {
      // gsap.set(navList, { x: '-100%', opacity: 0, pointerEvents: 'none' });
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  // animateNavbarIn();
  setupSmoothAnchors();
  mm.add("(max-width: 786px)", () => {
  // navBar.classList.add("active");
  setupClickOutside();
  setupHamburgerMenu();
  });


     // Debugging: Check if elements are found
    if (!toggleButton || !closeButton || !iframeContainer) {
        console.error('One or more elements not found:', {
            toggleButton,
            closeButton,
            iframeContainer
        });
        return;
    }

    let isOpen = false;

    // toggleIframe()
});