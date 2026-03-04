const items = document.querySelectorAll(".faq-item");
const DURATION = 420;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)"; // daha smooth

const setIcon = (details, isOpen) => {
  const icon = details.querySelector("i.fa-solid");
  if (!icon) return;
  icon.classList.toggle("fa-plus", !isOpen);
  icon.classList.toggle("fa-minus", isOpen);
};

const animateTo = (content, { height, opacity, y }, onEnd) => {
  content.style.transition = "none";           // əvvəl transition-u söndür
  content.offsetHeight;                        // reflow

  requestAnimationFrame(() => {
    content.style.transition =
      `height ${DURATION}ms ${EASING}, ` +
      `opacity ${DURATION}ms ${EASING}, ` +
      `transform ${DURATION}ms ${EASING}`;

    content.style.height = height;
    content.style.opacity = opacity;
    content.style.transform = `translateY(${y}px)`;

    const handler = (e) => {
      if (e.propertyName !== "height") return; // 1 dəfə işləsin
      content.removeEventListener("transitionend", handler);
      onEnd?.();
    };
    content.addEventListener("transitionend", handler);
  });
};

const expand = (details) => {
  const content = details.querySelector(".faq-item__a");
  if (!content) return;

  content.style.overflow = "hidden";

  // başlanğıc hündürlük (sürətli klikdə jump olmasın)
  const start = content.getBoundingClientRect().height;
  content.style.height = `${start}px`;

  // hədəf hündürlük
  content.style.opacity = "0";
  content.style.transform = "translateY(-6px)";
  content.offsetHeight;

  const end = content.scrollHeight;

  animateTo(
    content,
    { height: `${end}px`, opacity: "1", y: 0 },
    () => {
      content.style.transition = "";
      content.style.height = "auto";
      content.style.opacity = "";
      content.style.transform = "";
      content.style.overflow = "";
    }
  );
};

const collapse = (details) => {
  const content = details.querySelector(".faq-item__a");
  if (!content) return;

  content.style.overflow = "hidden";

  const start = content.getBoundingClientRect().height;
  content.style.height = `${start}px`;
  content.style.opacity = "1";
  content.style.transform = "translateY(0px)";
  content.offsetHeight;

  animateTo(
    content,
    { height: "0px", opacity: "0", y: -6 },
    () => {
      details.open = false; // animasiya bitəndə bağla
      content.style.transition = "";
      content.style.height = "";
      content.style.opacity = "";
      content.style.transform = "";
      content.style.overflow = "";
    }
  );
};

// ilkin sync
items.forEach((d) => setIcon(d, d.open));

items.forEach((details) => {
  const summary = details.querySelector(".faq-item__q");
  if (!summary) return;

  summary.addEventListener("click", (e) => {
    e.preventDefault();

    const willOpen = !details.open;

    // digərlərini bağla (accordion)
    items.forEach((other) => {
      if (other !== details && other.open) {
        setIcon(other, false);
        collapse(other);
      }
    });

    if (willOpen) {
      details.open = true;      // ölçü üçün əvvəl aç
      setIcon(details, true);
      expand(details);
    } else {
      setIcon(details, false);
      collapse(details);
    }
  });
});