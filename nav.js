lucide.createIcons();

function createHoles() {
  const topPerf = document.getElementById("perf-top");
  const bottomPerf = document.getElementById("perf-bottom");
  const createStrip = () => {
    const strip = document.createElement("div");
    strip.className = "hole-strip";
    const count = Math.ceil((window.innerWidth * 2) / 26) + 10;
    for (let i = 0; i < count; i++) {
      const hole = document.createElement("div");
      hole.className = "hole";
      strip.appendChild(hole);
    }
    return strip;
  };
  topPerf.appendChild(createStrip());
  bottomPerf.appendChild(createStrip());
}

const menuToggle = document.getElementById("menu-toggle");
const closeOverlay = document.getElementById("close-overlay");
const mobileOverlay = document.getElementById("mobile-overlay");

const toggleMenu = (state) => {
  if (state) {
    mobileOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    mobileOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
};

menuToggle.addEventListener("click", () => toggleMenu(true));
closeOverlay.addEventListener("click", () => toggleMenu(false));

document.querySelectorAll(".mobile-item").forEach((item) => {
  item.addEventListener("click", () => toggleMenu(false));
});

window.onload = createHoles;
window.addEventListener("resize", () => {
  document.getElementById("perf-top").innerHTML = "";
  document.getElementById("perf-bottom").innerHTML = "";
  createHoles();
});
