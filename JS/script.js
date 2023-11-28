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

  // Add ScrollTrigger to trigger smooth scroll when clicking on Search link
  ScrollTrigger.create({
    trigger: "#search", // ID of the trigger element
    start: "top top", // Start trigger at the top of the viewport
    onEnter: () => locoScroll.scrollTo("#search"), // Scroll to the Search section when the trigger enters the viewport
  });

  // Add ScrollTrigger to trigger smooth scroll when clicking on Testimonials link
  ScrollTrigger.create({
    trigger: "#testimonials", // ID of the trigger element
    start: "top top", // Start trigger at the top of the viewport
    onEnter: () => locoScroll.scrollTo("#testimonials"), // Scroll to the Testimonials section when the trigger enters the viewport
  });


}
loco();



var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")
document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + 20 + "px"
  crsr.style.top = dets.y + 20 + "px"

})

var noty = document.querySelector(".noti");
var vid = document.querySelector(".btn-background");

vid.addEventListener("mouseenter", function () {
  noty.style.display = "block"; // Show the notification
});

vid.addEventListener("mousemove", function (event) {
  noty.style.left = event.clientX + 30 + "px";
  noty.style.top = event.clientY + 500 + "px";
});

vid.addEventListener("mouseleave", function () {
  noty.style.display = "none"; // Hide the notification
});


var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".home h1",
    scroller: ".main",
    start: "top 35%",
    end: "top 0",
    scrub: 3,
  },
});
tl.to(".home h1", {
  x: -100,
}, "anim");
tl.to(".home h2", {
  x: 80,
}, "anim");
tl.to(".home h3", {
  x: -200,
}, "anim");
tl.to(".home h4", {
  x: 200,
}, "anim");
tl.to(".home video", {
  width: "90%"
}, "anim");


var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".home h1",
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
    trigger: ".home h1",
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


var boxes = document.querySelectorAll(".box")
boxes.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {

    var att = elem.getAttribute("data-img")
    crsr.style.width = "400px"
    crsr.style.height = "250px"
    crsr.style.borderRadius = "0"
    crsr.style.backgroundImage = `url(${att})`

  })
  elem.addEventListener("mouseleave", function () {
    elem.style.backgroundColor = "#0c0c0c"
    var att = elem.getAttribute("data-img")
    crsr.style.width = "20px"
    crsr.style.height = "20px"
    crsr.style.borderRadius = "50%"
    crsr.style.backgroundImage = `none`
  })
})



function search() {
  // getting all required elements
  const searchWrapper = document.querySelector(".search-input");
  const inputBox = searchWrapper.querySelector("input");
  const suggBox = searchWrapper.querySelector(".autocom-box");
  const icon = searchWrapper.querySelector(".icon");
  let linkTag = searchWrapper.querySelector("a");
  let webLink;

  // if user press any key and release
  inputBox.onkeyup = (e) => {
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if (userData) {
      icon.onclick = () => {
        webLink = `https://www.google.com/search?q=${userData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
      }
      emptyArray = suggestions.filter((data) => {
        //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
        return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
      });
      emptyArray = emptyArray.map((data) => {
        // passing return data inside li tag
        return data = `<li>${data}</li>`;
      });
      searchWrapper.classList.add("active"); //show autocomplete box
      showSuggestions(emptyArray);
      let allList = suggBox.querySelectorAll("li");
      for (let i = 0; i < allList.length; i++) {
        //adding onclick attribute in all li tag
        allList[i].setAttribute("onclick", "select(this)");
      }
    } else {
      searchWrapper.classList.remove("active"); //hide autocomplete box
    }
  }

  function select(element) {
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = () => {
      webLink = `https://www.google.com/search?q=${selectData}`;
      linkTag.setAttribute("href", webLink);
      linkTag.click();
    }
    searchWrapper.classList.remove("active");
  }

  function showSuggestions(list) {
    let listData;
    if (!list.length) {
      userValue = inputBox.value;
      listData = `<li>${userValue}</li>`;
    } else {
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
  }

}

search();

function review() {
  const showContainers = document.querySelectorAll(".show-replies");

  showContainers.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      let parentContainer = e.target.closest(".comment__container");
      let _id = parentContainer.id;
      if (_id) {
        let childrenContainer = parentContainer.querySelectorAll(
          `[dataset=${_id}]`
        );
        childrenContainer.forEach((child) => child.classList.toggle("opened"));
      }
    })
  );

}

review();

