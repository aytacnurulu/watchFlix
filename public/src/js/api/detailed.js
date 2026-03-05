const overlay = document.getElementById("trailerOverlay");
const modal = document.getElementById("trailerModal");
const closeBtn = document.getElementById("closeTrailer");
const frame = document.querySelector(".trailer-frame");

// Səhifədə olan bütün poster button-lar
const posterButtons = document.querySelectorAll(".poster-card__btn");

// Statik trailer (iframe üçün EMBED link)
const trailerUrl = "https://www.youtube.com/embed/fzmM0AB60QQ?autoplay=1&rel=0";

function openTrailer() {
  frame.src = trailerUrl; // video başlasın
  overlay.hidden = false;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeTrailer() {
  modal.hidden = true;
  overlay.hidden = true;
  frame.src = ""; // video STOP
  document.body.style.overflow = "";
}

// poster klik -> aç
posterButtons.forEach((btn) => {
  btn.addEventListener("click", openTrailer);
});

// X -> bağla
closeBtn.addEventListener("click", closeTrailer);

// overlay klik -> bağla
overlay.addEventListener("click", closeTrailer);

// ESC -> bağla
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeTrailer();
});
