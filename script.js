// Small interactions: reveal sections and add a subtle parallax to the hero poster.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".stat-card,.project,.step,.big-number,.about-card,.formula").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

const style = document.createElement("style");
style.textContent = `
.reveal{opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .7s ease}
.reveal.is-visible{opacity:1;transform:none}
.project,.stat-card{transition:transform .35s ease,box-shadow .35s ease}
.project:hover,.stat-card:hover{transform:translateY(-5px);box-shadow:0 20px 50px rgba(0,0,0,.18)}
`;
document.head.appendChild(style);

const poster = document.querySelector(".poster");
window.addEventListener("mousemove", (e) => {
  if (!poster || window.innerWidth < 850) return;
  const x = (e.clientX / window.innerWidth - .5) * 5;
  const y = (e.clientY / window.innerHeight - .5) * 5;
  poster.style.transform = `rotate(${5 + x}deg) translate(${x}px,${y}px)`;
});
