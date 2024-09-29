import "./styles.css";

// Menu data structure
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

// Get main
const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";

let h1El = document.createElement("h1");
h1El.textContent = "DOM Manipulation";

mainEl.appendChild(h1El);
mainEl.classList.add("flex-ctr");

// A-Lab Part 2 - Create a Menu Bar
const topMenuEl = document.getElementById("top-menu");
// console.log(navEl);
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

// A-Lab part 3 - adding menu buttons
for (let i = 0; i < menuLinks.length; i++) {
  let link = menuLinks[i];
  // console.log(link);
  let a = document.createElement("a");
  // console.log(a);
  a.href = link.href;
  a.textContent = link.text;
  topMenuEl.appendChild(a);
}

// R-Lab part 3
const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0%";

// R-Lab part 4 and part 5

// cache all the a tags in topMenuEl
const topMenuLinks = topMenuEl.querySelectorAll("a");
// console.log(topMenuLinks);

// console.log(topMenuEl);

topMenuEl.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.tagName !== "A") {
    return;
  }

  if (e.target.tagName === "A") {
    let hasSublink = true;
    // get all a tags
    const notActive = topMenuEl.querySelectorAll("a");
    // remove the active class from a tags
    notActive.forEach((aLink) => {
      if (!(aLink.text === e.target.textContent)) {
        // console.log(aLink.text);
        aLink.classList.remove("active");
      }
    });
    // toggle the a tag you clicked
    e.target.classList.toggle("active");

    // console.log(e.target.textContent);
    const curLink = e.target.textContent;

    // check if current event mapped to menuLink has a subLink
    menuLinks.forEach((link) => {
      if (curLink === link.text && !link.hasOwnProperty("subLinks")) {
        hasSublink = false;
      }
    });

    // console.log("has sub links is", hasSublink);

    // check if the target is active
    if (e.target.classList.contains("active") && hasSublink) {
      // console.log("active");
      subMenuEl.style.top = "100%";
      // Get the sublink through the current event's text and return sublinks
      // then remove a dimension so the arys are now objects
      let subLink = menuLinks
        .filter((link) => link.text === curLink)
        .map((link) => link.subLinks)
        .flat();
      // console.log("sub link", subLink);
      buildSubmenu(subLink);
    } else {
      // console.log("not active");
      if (curLink === "about") {
        h1El.textContent = curLink;
      }

      subMenuEl.style.top = "0%";
    }
  }
});

// part 5 - adding submenu interaction
function buildSubmenu(subLinks) {
  // console.log(subLinks);
  // clear submenu element's content ?
  subMenuEl.textContent = "";
  // console.log("index 0 is", subLinks[0][0]);
  // Iterate over a subLink ary, create a Elements, and append them to subMenu
  for (let i = 0; i < subLinks.length; i++) {
    let aEl = document.createElement("a");
    // console.log(subLinks[i]);
    aEl.href = subLinks[i].href;
    aEl.text = subLinks[i].text;
    // console.log(aEl.href, aEl.text);
    // console.log(aEl);
    subMenuEl.appendChild(aEl);
  }

  // console.log(subMenuEl);
}

// part - 5 adding submenu click event
subMenuEl.addEventListener("click", function (e) {
  e.preventDefault();

  // Go back if not an a tag/element
  if (e.target.tagName !== "A") {
    return;
  } else {
    // console.log(e.target.tagName);
    subMenuEl.style.top = "0%";
    // remove all active top menu a element links
    topMenuLinks.forEach((link) => {
      link.classList.remove("active");
    });
    // using this instead of topMenu links to remove the active class
    topMenuEl.classList.remove("active");
    // creating an h1 and appending to topMenuEl
    // let h1El = document.createElement("h1");
    // h1El.textContent = e.target.textContent;
    // mainEl.appendChild(h1El);
    // console.log(e.target.textContent);

    h1El.textContent = e.target.textContent;
  }
});
