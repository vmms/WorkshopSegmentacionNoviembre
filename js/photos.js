document.addEventListener("DOMContentLoaded", () => {

  const mainPhoto = document.getElementById("mainPhoto");
  const thumbs = document.querySelectorAll(".thumb");
  const strip = document.querySelector(".thumbs-strip");

  // ---------- CAMBIO DE FOTO PRINCIPAL ----------
  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      const photo = thumb.dataset.photo;
      mainPhoto.src = photo;

      thumbs.forEach(t => t.classList.remove("active-thumb"));
      thumb.classList.add("active-thumb");
    });
  });

  // ---------- LÓGICA DEL CARRUSEL ----------
  let position = 0;           // posición actual del carrusel
  const maxVisible = 8;       // cuántas miniaturas se muestran
  const thumbWidth = 90;      // ancho aprox (80px + gaps)
  const totalThumbs = thumbs.length;

  const btnLeft = document.getElementById("btnLeft");
  const btnRight = document.getElementById("btnRight");

  btnRight.addEventListener("click", () => {
    if (position < totalThumbs - maxVisible) {
      position++;
      updateStrip();
    }
  });

  btnLeft.addEventListener("click", () => {
    if (position > 0) {
      position--;
      updateStrip();
    }
  });

  function updateStrip() {
    const offset = -(position * thumbWidth);
    strip.style.transform = `translateX(${offset}px)`;
  }

});

const thumbs = document.querySelectorAll(".thumb");
const strip = document.querySelector(".thumbs-strip");

thumbs.forEach((thumb) => {
  thumb.addEventListener("mousemove", (e) => {
    const rect = strip.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    thumbs.forEach((t) => {
      const tRect = t.getBoundingClientRect();
      const tCenter = tRect.left + tRect.width / 2 - rect.left;

      const dist = Math.abs(mouseX - tCenter);
      const maxDist = 160; // Qué tanto afecta el mouse alrededor

      let factor = 1 - dist / maxDist;
      if (factor < 0) factor = 0;

      // Tamaños dinámicos estilo Dock
      const base = 80;         // tamaño original
      const grow = 55;         // cuánto puede crecer (base + grow = 160px máximo)

      const newSize = base + grow * factor;

      // Aplicar tamaño real
      t.style.width = newSize + "px";
      t.style.height = newSize + "px";

      // Empuja a los demás (igual que el dock)
      t.style.margin = (grow * factor * 0.15) + "px";
    });
  });

  // Cuando el mouse sale, todo vuelve a tamaño normal
  thumb.addEventListener("mouseleave", () => {
    thumbs.forEach((t) => {
      t.style.width = "80px";
      t.style.height = "80px";
      t.style.margin = "0px";
    });
  });
});