// Wedding details: update these fields once the date, Muhurtham and venue are confirmed.
const WEDDING = {
  // Example: "2026-12-15T09:00:00+05:30"
  dateTime: "",
  displayDate: "Wedding date to be announced",
  displayTime: "Muhurtham time to be announced",
  venueName: "Venue to be announced",
  venueCity: "City, Andhra Pradesh",
  mapSearch: ""
};
const byId = id => document.getElementById(id);
function applyWeddingDetails() {
  byId("heroDate").textContent = WEDDING.dateTime
    ? new Date(WEDDING.dateTime).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})
    : "Wedding date to be announced";
  byId("eventDate").textContent = WEDDING.displayDate;
  byId("eventTime").textContent = WEDDING.displayTime;
  byId("venueName").textContent = WEDDING.venueName;
  byId("venueCity").textContent = WEDDING.venueCity;
  byId("mapLink").href = WEDDING.mapSearch
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(WEDDING.mapSearch)}`
    : "https://maps.app.goo.gl/F22mfpcu6XAH3fdCA";
}
function renderCountdown() {
  const countdown = byId("countdown"), message = byId("countdownMessage");
  if (!WEDDING.dateTime || Number.isNaN(new Date(WEDDING.dateTime).getTime())) {
    countdown.innerHTML = '<div><strong>—</strong><span>Days</span></div><div><strong>—</strong><span>Hours</span></div><div><strong>—</strong><span>Minutes</span></div><div><strong>—</strong><span>Seconds</span></div>';
    message.textContent = "Our countdown begins when the wedding date is confirmed."; return;
  }
  const distance = new Date(WEDDING.dateTime).getTime() - Date.now();
  if (distance <= 0) { message.textContent = "Today, we celebrate a lifetime of togetherness. Thank you for being part of our joy!"; countdown.innerHTML = '<div><strong>♥</strong><span>Our day is here</span></div>'; return; }
  const units = [["Days",Math.floor(distance/86400000)],["Hours",Math.floor(distance%86400000/3600000)],["Minutes",Math.floor(distance%3600000/60000)],["Seconds",Math.floor(distance%60000/1000)]];
  countdown.innerHTML = units.map(([label,value])=>`<div><strong>${value}</strong><span>${label}</span></div>`).join("");
  message.textContent = "Every moment brings us closer to our forever.";
}
applyWeddingDetails(); renderCountdown(); setInterval(renderCountdown,1000);
const params = new URLSearchParams(window.location.search), guestNameParam = params.get("name");
if (guestNameParam && guestNameParam.trim()) {
  const greeting = document.createElement("p"); greeting.className="guest-greeting";
  greeting.textContent=`With joy, we welcome you, ${guestNameParam.trim().slice(0,80)}.`;
  const heroCopy=document.querySelector(".hero-caption"); if(heroCopy) heroCopy.insertAdjacentElement("afterend",greeting);
}
const revealElements=document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");obs.unobserve(entry.target);}}),{threshold:.08});
  revealElements.forEach(el=>observer.observe(el));
} else revealElements.forEach(el=>el.classList.add("visible"));
byId("rsvpForm").addEventListener("submit",event=>{
  event.preventDefault(); const name=byId("guestName").value.trim(); if(!name)return;
  const attendance=byId("attendance").value,guests=byId("guestCount").value,success=byId("rsvpSuccess");
  success.textContent=`Thank you, ${name}! Your response is “${attendance}” for ${guests} guest${guests==="1"?"":"s"}. This is a local demo confirmation only.`;
  success.hidden=false;
});
const WISH_KEY="weddingCeremonyWishesRich";
function readWishes(){try{const stored=JSON.parse(localStorage.getItem(WISH_KEY)||"[]");return Array.isArray(stored)?stored.slice(-8):[];}catch{return[];}}
function renderWishes(){const wall=byId("wishesWall");wall.replaceChildren();readWishes().reverse().forEach(wish=>{const card=document.createElement("article");card.className="wish-card";const text=document.createElement("p");text.textContent=wish.message;const name=document.createElement("strong");name.textContent=`— ${wish.name}`;card.append(text,name);wall.append(card);});}
byId("wishForm").addEventListener("submit",event=>{
  event.preventDefault();const name=byId("wishName").value.trim(),message=byId("wishText").value.trim();if(!name||!message)return;
  const wishes=readWishes();wishes.push({name:name.slice(0,60),message:message.slice(0,240)});
  try{localStorage.setItem(WISH_KEY,JSON.stringify(wishes.slice(-8)));}catch{}renderWishes();byId("wishForm").reset();
});renderWishes();
byId("flowerButton").addEventListener("click",()=>{
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){byId("countdownMessage").textContent="Sending love and blessings to the happy couple! ♥";return;}
  const layer=byId("petalLayer"),petals=["🌸","🌼","🌺","🌷","💮","💕","✨"];
  for(let i=0;i<64;i++){const petal=document.createElement("span");petal.className="petal";petal.textContent=petals[Math.floor(Math.random()*petals.length)];petal.style.left=`${Math.random()*100}vw`;petal.style.fontSize=`${14+Math.random()*20}px`;petal.style.animationDuration=`${3.2+Math.random()*2.6}s`;petal.style.animationDelay=`${Math.random()*1.1}s`;petal.style.setProperty("--drift",`${-90+Math.random()*180}px`);petal.style.setProperty("--spin",`${180+Math.random()*600}deg`);layer.append(petal);setTimeout(()=>petal.remove(),7000);}
  const button=byId("flowerButton"),original=button.innerHTML;button.textContent="A shower of blessings for the happy couple! ♥";setTimeout(()=>button.innerHTML=original,3200);
});
