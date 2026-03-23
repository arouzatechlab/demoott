document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("mainFooter");
  const form = document.getElementById("newsletterForm");
  const toast = document.getElementById("secF-toast");

  // Scroll Reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footer.classList.add("secF-visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  observer.observe(footer);

  // Form Submit Logic
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletterEmail").value;

    if (email.trim() !== "") {
      toast.classList.add("active");
      setTimeout(() => {
        window.location.href = "404.html";
      }, 2200);
    }
  });
});
