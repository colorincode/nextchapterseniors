
//optional import tests only, these are not crucial to build steps
// deno-lint-ignore-file
// import gsap from "gsap";
// import Draggable from "gsap";
// import EasePack from "gsap";
// import { Power4 } from "gsap";
// import Observer from "gsap";
// import Timeline from "gsap";
// import  InertiaPlugin  from "gsap";
// import  ScrollTrigger  from "gsap";
// import  { ScrollSmoother }  from "gsap/ScrollSmoother";
// import  ScrollToPlugin  from "gsap";
// import SplitText from 'gsap';
import { gsap } from "gsap";
import { ExpoScaleEase } from "gsap/EasePack";
import { Flip } from "gsap/Flip";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Splide from '@splidejs/splide';
import { Intersection } from '@splidejs/splide-extension-intersection';


//gsap registration, global scope
gsap.registerPlugin(Flip,InertiaPlugin,Observer,ScrollTrigger,ScrollSmoother,ScrollToPlugin,ExpoScaleEase);


// console.log("GSAP Version:", gsap.version); // Should log "3.13.0"
// console.log("ScrollSmoother Available:", !!gsap.plugins.scrollSmoother); // Should log true
// console.log("ScrollSmoother:", ScrollSmoother); // Should log constructor function
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

// const window: Window & typeof globalThis;
let mm = gsap.matchMedia(),
    breakPoint = 800;

let isLoaded = false;
let isLoadingAnimationEnd = false;
const hamburger = document.querySelector('.hamburger') as HTMLButtonElement;
const navList = document.querySelector('.navbar__list--horizontal') as HTMLUListElement;
const navBar = document.querySelector(".navbar--top") as HTMLElement;
// const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.navbar__item--horizontal');
const navBarLinks = document.querySelectorAll('.navbar__item__link--horizontal') ;
let anchorLinks = gsap.utils.toArray(navBarLinks);
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
const formTL = gsap.timeline({
      defaults: {
        ease: "power4.inOut",
      //   opacity:0,
      }
    });
let smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2,
  effects: true,
  normalizeScroll: true,
});


  const sharedToggle = () => {
    if (isOpen) {
        // closing logiic
        formTL.to(iframeContainer, {
            x: '100%',
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                iframeContainer.style.display = 'none';
            }
        });
        toggleButton.textContent = 'Open Form';
        toggleButtonMain.textContent = 'Schedule A Free Consultation';
    } else {
        // opening logic
        iframeContainer.style.display = 'flex';
        formTL.fromTo(
            iframeContainer,
            { x: '100%' },
            { x: '0%', duration: 0.5, ease: 'power2.out' }
        );
        toggleButton.textContent = 'Close Form';
        toggleButtonMain.textContent = 'Close Form';
    }
    isOpen = !isOpen;
};

toggleButton.addEventListener('click', sharedToggle);
toggleButtonMain.addEventListener('click', sharedToggle);
closeButton.addEventListener('click', sharedToggle);


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
 
  tl.to('.navbar__list--horizontal', {
    x: '-100%',
    opacity: 0,
    autoAlpha: 0,
    duration: 0.4,
    delay: 0.5,
    pointerEvents: 'none',
    ease: 'power4.in'
  });
  navBar.classList.remove("active");

}


function setupSmoothAnchors() {

  const hamburger = document.querySelector('.hamburger') as HTMLElement;
  let hamburgerIsOpen = hamburger.classList.contains("open");

  anchorLinks.forEach(link => {

        link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = link.getAttribute('href');
          if (!href || href === '#') {
          console.warn('Invalid href:', href);
          return;
        }
          const target = document.querySelector(href);
          if (!target) {
            console.warn(`Target ${href} not found`);
            return;
          }
          console.log('Scrolling to:', href, target); // Debug
          smoother.scrollTo(target, true, "top 70px",  );
          // smoother.scrollTo(target, {
          //   top: 70,
          // }, true)
            // true, "top 70px",  );
          mm.add("(max-width: 786px)", () => {
            gsap.delayedCall(0.5, () => {
              
              // if (isMenuClick && navList.classList.contains('active')) {
              //   console.log("condition returned true");
              //   hamburger.classList.remove('open');
              //   closeMobileMenu();
              //   hamburger.setAttribute('aria-expanded', 'false');
              // }
            });
          });
        });
      });

    }


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

  // gsap.set(navList, { x: '-100%', opacity: 0, pointerEvents: 'none' });

  hamburger.addEventListener('click', () => {
    const isOpenTwo = hamburger.classList.toggle('open');
    let hamburgerIsOpen = hamburger.classList.contains("open");
    hamburger.setAttribute('aria-expanded', isOpenTwo ? 'true' : 'false');
    
    if (hamburgerIsOpen) {
      navList.classList.add('active');
      navBar.classList.add("active");
      openMobileMenu();
    } else {
      gsap.set(navList, { clearProps: 'all' });
      // closeMobileMenu();
      // hamburger.classList.remove('open');
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
  setupSmoothAnchors();
  mm.add("(max-width: 786px)", () => {
  setupClickOutside();
  setupHamburgerMenu();
  });
  // setupSectionAnimations();
     // Debugging: Check if elements are found
  if (!toggleButton || !closeButton || !iframeContainer) {
      console.error('One or more elements not found:', {
          toggleButton,
          closeButton,
          iframeContainer
      });
      return;
    }
    // let isOpenTwo = false;
});