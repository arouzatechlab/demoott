const movies = [
  {
    title: "Kung Fu Panda",
    bg: "./assets/ind1.webp",
    duration: "45 min",
    desc: "Po, a lovable panda with a passion for kung fu, travels from an unlikely hero to the powerful Dragon Warrior, mastering ancient arts to save the Valley of Peace.",
    tags: "Adventure, Animation",
    genres: "Action, Animation",
    starring: "Jack Black, Dustin Hoffman",
    meta: ["4.5 ★", "IMDb", "45 min"],
    badge: "",
  },
  {
    title: "SU From SO",
    bg: "./assets/ind2.webp",
    duration: "2 h : 30 min",
    desc: "An Humourous Drama and a family package which also contains a social message and purely south canara's culture and tradition.",
    tags: "Comedy, Adventure, Drama",
    genres: "Comedy, Adventure",
    starring: "Raj B shetty, Gautham",
    meta: ["NC-17", "5 ★", "IMDb", "2 h : 30 min"],
    badge: "NC-17",
  },
  {
    title: "The First Of Us",
    bg: "./assets/ind3.webp",
    duration: "2 h : 59 min",
    desc: "In a post-apocalyptic world, a small group of survivors uncovers the origins of humanity's downfall while journeying through a desolate landscape.",
    tags: "Family, Horror",
    genres: "Action, Adventure",
    starring: "Jordan Grant, Jeff Bridges",
    meta: ["NC-17", "4 ★", "IMDb", "2 h : 59 min"],
    badge: "NC-17",
  },
  {
    title: "Vikings",
    bg: "./assets/ind4.webp",
    duration: "Season 2",
    desc: "Ragnar Lodbrok, a Norse farmer, carries out raids into English territory, eventually holding sway over the Vikings and becoming a Scandinavian king.",
    tags: "War, History, Drama",
    genres: "Adventure, Action",
    starring: "Travis Fimmel, Katheryn Winnick",
    meta: ["2 Seasons", "4.8 ★", "IMDb"],
    badge: "2 Seasons",
  },
  {
    title: "Minions Adventure",
    bg: "./assets/ind5.webp",
    duration: "1 h : 20 min",
    desc: "Those yellow mischief-makers are back! Follow the Minions as they search for a new master and cause accidental chaos across the globe.",
    tags: "Family, Comedy",
    genres: "Animation, Comedy",
    starring: "Steve Carell, Pierre Coffin",
    meta: ["PG", "4.2 ★", "IMDb", "1 h : 20 min"],
    badge: "PG",
  },
];

let currentIndex = 0;
const bgWrap = document.getElementById("bg-wrap");
const contentWrap = document.getElementById("content-wrap");
const cardStack = document.getElementById("card-stack");

function initSlider() {
  movies.forEach((movie, index) => {
    const bg = document.createElement("div");
    bg.className = `sec1-bg-slide ${index === 0 ? "active" : ""}`;
    bg.style.backgroundImage = `url('${movie.bg}')`;
    bgWrap.appendChild(bg);

    const content = document.createElement("div");
    content.className = `sec1-content-item ${index === 0 ? "active" : ""}`;

    let metaHTML = "";
    movie.meta.forEach((m) => {
      if (m === movie.badge) metaHTML += `<span class="sec1-badge">${m}</span>`;
      else if (m === "IMDb")
        metaHTML += `<div class="sec1-imdb-wrap"><span class="sec1-imdb-box">IMDb</span> <span style="color:white; font-weight:700">7.5</span></div>`;
      else metaHTML += `<span>${m}</span>`;
    });

    content.innerHTML = `
                    <h1 class="sec1-title">${movie.title}</h1>
                    <div class="sec1-meta-row">${metaHTML}</div>
                    <p class="sec1-description">${movie.desc}</p>
                    <div class="sec1-details">
                        <div class="sec1-detail-line"><span class="sec1-label">Tags:</span> ${movie.tags}</div>
                        <div class="sec1-detail-line"><span class="sec1-label">Genres:</span> ${movie.genres}</div>
                        <div class="sec1-detail-line"><span class="sec1-label">Starring:</span> ${movie.starring}</div>
                    </div>
                    <button class="sec1-play-btn"  onclick="window.location.href = './404.html'">
                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        Play Now
                    </button>
                `;
    contentWrap.appendChild(content);
  });
  updateCards();
}

function updateCards() {
  cardStack.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const card = document.createElement("div");
    card.className = `sec1-nav-card ${i === currentIndex ? "active" : ""}`;
    card.onclick = () => goToSlide(i);

    card.innerHTML = `
                    <div class="sec1-card-img-wrap">
                        <img src="${movie.bg}" alt="${movie.title}" class="sec1-card-img">
                    </div>
                    <div class="sec1-card-info">
                        <div class="sec1-card-title">${movie.title}</div>
                        <div class="sec1-card-meta">${movie.duration}</div>
                    </div>
                `;
    cardStack.appendChild(card);
  }

  // Re-order visibility for Desktop
  if (window.innerWidth > 768) {
    const allCards = cardStack.children;
    const nextIdx = (currentIndex + 1) % movies.length;
    for (let i = 0; i < allCards.length; i++) {
      allCards[i].style.display =
        i === currentIndex || i === nextIdx ? "block" : "none";
    }
  } else {
    // On mobile, ensure card is visible and scrolled into view if active
    const activeCard = cardStack.querySelector(".sec1-nav-card.active");
    if (activeCard) {
      activeCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }
}

function goToSlide(index) {
  if (index === currentIndex) return;
  const bgs = document.querySelectorAll(".sec1-bg-slide");
  const contents = document.querySelectorAll(".sec1-content-item");

  bgs[currentIndex].classList.remove("active");
  contents[currentIndex].classList.remove("active");

  currentIndex = index;

  bgs[currentIndex].classList.add("active");
  contents[currentIndex].classList.add("active");
  updateCards();
}

function nextSlide() {
  goToSlide((currentIndex + 1) % movies.length);
}
function prevSlide() {
  goToSlide((currentIndex - 1 + movies.length) % movies.length);
}

let autoPlay = setInterval(nextSlide, 8000);

// Pause autoplay on card click
cardStack.addEventListener("click", () => {
  clearInterval(autoPlay);
  autoPlay = setInterval(nextSlide, 10000); // Resume with longer interval
});

window.addEventListener("resize", updateCards);
window.onload = initSlider;

/**
 * AUTO SLIDING LOGIC
 */
const SCROLL_INTERVAL = 1500; // 1.5 Seconds
const containers = document.querySelectorAll(".sec-scroll-container");

const hoverStates = new Map();

containers.forEach((container) => {
  hoverStates.set(container.id, false);

  container.addEventListener("mouseenter", () =>
    hoverStates.set(container.id, true),
  );
  container.addEventListener("mouseleave", () =>
    hoverStates.set(container.id, false),
  );

  setInterval(() => {
    if (hoverStates.get(container.id)) return;

    const card = container.querySelector(".movie-card");
    if (!card) return;

    const cardWidth = card.offsetWidth + 16;
    const isRTL =
      window.getComputedStyle(container).flexDirection === "row-reverse";

    let direction = isRTL ? -1 : 1;

    const isAtEnd = isRTL
      ? Math.abs(container.scrollLeft) >=
        container.scrollWidth - container.clientWidth - 10
      : container.scrollLeft >=
        container.scrollWidth - container.clientWidth - 10;

    if (isAtEnd) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({
        left: cardWidth * direction,
        behavior: "smooth",
      });
    }
  }, SCROLL_INTERVAL);
});

function manualScroll(containerId, direction) {
  const container = document.getElementById(containerId);
  const card = container.querySelector(".movie-card");
  const cardWidth = (card.offsetWidth + 16) * 2;
  container.scrollBy({ left: cardWidth * direction, behavior: "smooth" });
}

/**
 * ANIMATION & UI LOGIC
 */
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      const cards = entry.target.querySelectorAll(".movie-card");
      cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
      });
    }
  });
}, observerOptions);

document
  .querySelectorAll("section")
  .forEach((section) => observer.observe(section));

// const scrollTopBtn = document.getElementById("scrollTop");
// window.onscroll = function () {
//   if (
//     document.body.scrollTop > 200 ||
//     document.documentElement.scrollTop > 200
//   ) {
//     scrollTopBtn.style.display = "flex";
//   } else {
//     scrollTopBtn.style.display = "none";
//   }
// };
// scrollTopBtn.onclick = function () {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };

document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("pricingSection");
  const wrapper = document.getElementById("sliderWrapper");
  let currentIndex = 0;
  const totalCards = 3;

  // 1. Smooth Scroll Entrance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  observer.observe(section);

  // 2. Auto-Sliding Logic (Looping)
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCards;
    const offset = currentIndex * -100;
    // Move wrapper (300% wide, so each card is 1/3 of total)
    wrapper.style.transform = `translateX(-${pricingIndex * 100}%)`;
  }, 1500);
});
