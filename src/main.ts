import gsap from "gsap";
import "./style.css";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
window.addEventListener("load", () => {
  console.log("Page is fully loaded!");
});
