import gsap from "gsap";
import "./style.css";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

// Constants
const IMAGE_LOOP_DURATION = 0.09;
const IMAGE_LOOP_DELAY = 0.15;
const STAGGER_DELAY = 0.1;
const MAIN_ANIMATION_DELAY = Math.random() * 0.7 + 1;

// Select DOM Elements
const images = Array.from(document.querySelectorAll(".loader img"));
const loader = document.querySelector(".loader");
const wordSplitItems = document.querySelectorAll(".word-split");
const weAnimationItems = document.querySelectorAll(".we-animation");
const navElement = document.querySelector("nav");
const startingVideo = document.querySelector(".starting-video");
const textPop = document.querySelectorAll(".text-pop");

// window.addEventListener("unload", () => {
//   window.scrollTo({ top: 0, left: 0, behavior: "instant" });
// });

// Initial Styles
gsap.set(images, { opacity: 0, scale: 0.9 });
gsap.set(wordSplitItems, { y: "100%" });
gsap.set(weAnimationItems, { y: 100 });
gsap.set(navElement, { y: -100 });
gsap.set("body", { overflow: "hidden" });
gsap.set(textPop, { y: 180, display: "inline-block" });
gsap.set(".origin-center", { y: 36 });

// Disable scroll during the loader animation
gsap.to(startingVideo, {
  scale: 1,
  scrollTrigger: {
    trigger: startingVideo,
    scroller: "body",
    scrub: 2.5,
  },
});

gsap.to(textPop, {
  y: 0,
  stagger: 0.2,
  ease: "expo",
  scrollTrigger: {
    trigger: textPop,
    scroller: "body",
    start: "top 85%",
  },
});

// 36 ,-36
gsap.to(".origin-center", {
  y: -36,
  scrollTrigger: {
    trigger: ".images-parent",
    scroller: "body",
    start: "top center",
    end: "bottom center",
    scrub: 2,
  },
});

// Looping Image Animation
const imageLoopTimeline = gsap.timeline({ repeat: -1 });
images.forEach((image) => {
  imageLoopTimeline
    .to(image, {
      opacity: 1,
      scale: 1,
      duration: IMAGE_LOOP_DURATION,
      ease: "none",
    })
    .to(image, {
      opacity: 0,
      scale: 0.9,
      duration: IMAGE_LOOP_DURATION,
      ease: "none",
      delay: IMAGE_LOOP_DELAY,
    });
});

// Main Animation Timeline
const mainTimeline = gsap.timeline();

// Loader Exit Animation
mainTimeline.to(loader, {
  y: "-100%",
  duration: 1,
  ease: "power1",
  delay: MAIN_ANIMATION_DELAY,
  onComplete: () => {
    imageLoopTimeline.pause();
  },
});

// Word Split Animation
mainTimeline.to(
  wordSplitItems,
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    stagger: STAGGER_DELAY,
    ease: "expo",
    onComplete: () => {
      document.body.style.overflow = "auto"; // Restore scroll
    },
  },
  "-=0.5", // Overlap with the previous animation
);

// Navigation Bar Entrance
mainTimeline.to(
  navElement,
  {
    y: 0,
    duration: 1,
    ease: "expo",
  },
  "-=1.1", // Overlap earlier for a smoother transition
);

// "We Animation" Transition
mainTimeline.to(
  weAnimationItems,
  {
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "expo",
  },
  "-=0.5", // Overlap with the previous animation
);

// Visibility Change Handling
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    imageLoopTimeline.pause();
  } else {
    imageLoopTimeline.resume();
  }
});
