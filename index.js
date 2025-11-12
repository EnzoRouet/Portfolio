const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const bars = entry.target.querySelectorAll(".bar-fill");

      if (entry.isIntersecting) {
        bars.forEach((bar) => {
          bar.classList.add("is-visible");
        });
      } else {
        bars.forEach((bar) => {
          bar.classList.remove("is-visible");
        });
      }
    });
  },
  {
    threshold: 0.5,
  }
);

const skillCards = document.querySelectorAll(".container");
skillCards.forEach((card) => {
  observer.observe(card);
});
