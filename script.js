const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll("section,.project-card,.featured-project,.step,.gallery-item,.manifesto-points span").forEach(el=>{
  el.classList.add("reveal");
  observer.observe(el);
});

const style=document.createElement("style");
style.textContent=`
.reveal{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.7,0,1)}
.reveal.is-visible{opacity:1;transform:none}
.project-card,.featured-project,.gallery-item,.step{transition:transform .35s ease,box-shadow .35s ease}
.project-card:hover{transform:translateY(-7px);box-shadow:0 28px 70px rgba(0,0,0,.22)}
.gallery-item:hover{box-shadow:0 18px 45px rgba(0,0,0,.18)}
`;
document.head.appendChild(style);

const dot=document.querySelector(".cursor-dot");
const ring=document.querySelector(".cursor-ring");
window.addEventListener("mousemove",e=>{
  if(!dot||!ring) return;
  dot.style.left=e.clientX+"px";
  dot.style.top=e.clientY+"px";
  ring.animate({left:e.clientX+"px",top:e.clientY+"px"},{duration:180,fill:"forwards"});
});

document.querySelectorAll("a,.project-card,.gallery-item,.play-circle").forEach(el=>{
  el.addEventListener("mouseenter",()=>ring?.style.setProperty("width","52px"));
  el.addEventListener("mouseenter",()=>ring?.style.setProperty("height","52px"));
  el.addEventListener("mouseleave",()=>ring?.style.setProperty("width","34px"));
  el.addEventListener("mouseleave",()=>ring?.style.setProperty("height","34px"));
});

document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("mousemove",e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.16;
    const y=(e.clientY-r.top-r.height/2)*.16;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener("mouseleave",()=>el.style.transform="");
});

const heroImage=document.querySelector(".hero-image img");
window.addEventListener("scroll",()=>{
  if(!heroImage || window.innerWidth<700) return;
  const y=Math.min(window.scrollY*.08,45);
  heroImage.style.transform=`translateY(${y}px) scale(1.035)`;
},{passive:true});
