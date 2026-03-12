// src/js/components/admin-sidebar.js

import { includeHTML } from "./include-sidebar.js";

function setActiveAdminSidebarItem() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".admin-sidebar__item");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const linkPage = href.split("/").pop();

    link.classList.remove("admin-sidebar__item--active");

    if (linkPage === currentPage) {
      link.classList.add("admin-sidebar__item--active");
    }
  });
}

async function initAdminSidebar() {
  const loaded = await includeHTML(
    "admin-sidebar",
    "/public/partials/admin-sidebar.html",
    "Admin sidebar yüklənmədi"
  );

  if (loaded) {
    setActiveAdminSidebarItem();
  }
}

document.addEventListener("DOMContentLoaded", initAdminSidebar);