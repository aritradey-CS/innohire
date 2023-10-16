function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")
main.addEventListener("mousemove",function(dets){
  crsr.style.left = dets.x+"px"
  crsr.style.top = dets.y+"px"

})

var noty = document.querySelector(".noti");
var vid = document.querySelector(".btn-background");

vid.addEventListener("mouseenter", function() {
  noty.style.display = "block"; // Show the notification
});

vid.addEventListener("mousemove", function(event) {
  noty.style.left = event.clientX + 30 + "px";
  noty.style.top = event.clientY + 500 + "px";
});

vid.addEventListener("mouseleave", function() {
  noty.style.display = "none"; // Hide the notification
});


var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    start: "top 35%",
    end: "top 0",
    scrub: 3,
  },
});
tl.to(".page1 h1", {
  x: -100,
}, "anim");
tl.to(".page1 h2", {
  x: 80,
},"anim");
tl.to(".page1 h3", {
  x:-200,
},"anim");
tl.to(".page1 h4", {
  x:200,
},"anim");
tl.to(".page1 video", {
  width: "90%"
},"anim");


var tl2 = gsap.timeline({
  scrollTrigger: {
      trigger: ".page1 h1",
      scroller: ".main",
      // markers:true,
      start: "top -115%",
      end: "top -120%",
      scrub: 3
  }
})
tl2.to(".main", {
  backgroundColor: "#fff",
})

var tl3 = gsap.timeline({
  scrollTrigger: {
      trigger: ".page1 h1",
      scroller: ".main",
      // markers:true,
      start: "top -500%",
      end: "top -520%",
      scrub: 3
  }
})
tl3.to(".main", {
  backgroundColor: "rgba(0, 0, 0, 0.952)",
})