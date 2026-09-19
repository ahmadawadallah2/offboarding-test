(function () {
  const nav = document.getElementById("nav");
  const stage = document.getElementById("stage");
  const slides = window.SLIDES || [];
  let i = 0;

  function paint() {
    nav.innerHTML = "<h1>Offboarding spec</h1><p>Developer walkthrough · " + (i + 1) + " / " + slides.length + "</p>";
    slides.forEach((s, n) => {
      const b = document.createElement("button");
      b.textContent = s.nav;
      if (n === i) b.className = "on";
      b.onclick = () => { i = n; paint(); };
      nav.appendChild(b);
    });
    const s = slides[i];
    stage.innerHTML = "<p class='kicker'>" + s.kicker + "</p><h2>" + s.title + "</h2>" + s.html +
      "<div class='pager'><button id='prev'>Previous</button><button id='next'>Next</button></div>";
    document.getElementById("prev").onclick = () => { i = Math.max(0, i - 1); paint(); };
    document.getElementById("next").onclick = () => { i = Math.min(slides.length - 1, i + 1); paint(); };
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "PageDown") { i = Math.min(slides.length - 1, i + 1); paint(); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { i = Math.max(0, i - 1); paint(); }
  });
  paint();
})();
