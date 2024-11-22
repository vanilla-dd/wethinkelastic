import gsap from "gsap";
import "./style.css";
// import { ScrollTrigger } from "gsap/all";
// gsap.registerPlugin(ScrollTrigger);

const imagesList = Array.from(document.querySelectorAll(".loader img"));
document.body.style.overflow = "hidden";
const imageTimeline = gsap.timeline({ repeat: -1 });
const mainTimeline = gsap.timeline();

gsap.set(imagesList, {
  opacity: 0,
  scale: 0.9,
});
gsap.set(".word-split", {
  y: "100%",
});

imagesList.forEach((image) => {
  imageTimeline
    .to(image, {
      opacity: 1,
      scale: 1,
      duration: 0.09,
      ease: "none",
    })
    .to(image, {
      opacity: 0,
      scale: 0.9,
      duration: 0.09,
      ease: "none",
      delay: 0.15,
    });
});

mainTimeline.to(".loader", {
  y: "-100%",
  duration: 1,
  ease: "power1",
  onComplete: () => {
    imageTimeline.pause();
    document.body.style.overflow = "auto";
  },
  delay: Math.random() * 0.7 + 1,
});
// window.addEventListener("DOMContentLoaded", () => {});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    imageTimeline.pause();
  } else {
    imageTimeline.resume();
  }
});

mainTimeline.to(
  ".word-split",
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    stagger: 0.1,
    ease: "expo",
  },
  "-=50%",
);
