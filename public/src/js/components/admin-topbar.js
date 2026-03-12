// src/js/components/admin-topbar.js

import { includeHTML } from "./include-sidebar.js";

function getAdminPageConfig() {
  return document.querySelector(".admin-page-config");
}

function setupAdminTopbar() {
  const config = getAdminPageConfig();
  const topbar = document.querySelector(".admin-topbar");

  if (!config || !topbar) return;

  const titleEl = topbar.querySelector(".admin-topbar__title");
  const helloEl = topbar.querySelector(".admin-topbar__hello");
  const createBtn = topbar.querySelector(".admin-topbar__create-btn");

  const title = config.dataset.adminTitle || "Dashboard";
  const hello = config.dataset.adminHello || "Hi Admin";
  const createText = config.dataset.adminCreateText || "Create";
  const createTarget = config.dataset.adminCreateTarget || "#createModal";
  const showCreate = config.dataset.adminCreate !== "false";

  if (titleEl) {
    titleEl.textContent = title;
  }

  if (helloEl) {
    helloEl.textContent = hello;
  }

  if (createBtn) {
    createBtn.textContent = createText;

    if (showCreate) {
      createBtn.style.display = "inline-flex";
      createBtn.setAttribute("data-bs-toggle", "modal");
      createBtn.setAttribute("data-bs-target", createTarget);
    } else {
      createBtn.style.display = "none";
      createBtn.removeAttribute("data-bs-toggle");
      createBtn.removeAttribute("data-bs-target");
    }
  }
}

async function initAdminTopbar() {
  const loaded = await includeHTML(
    "admin-topbar",
    "/public/partials/admin-topbar.html",
    "Admin topbar yüklənmədi"
  );

  if (loaded) {
    setupAdminTopbar();
  }
}

document.addEventListener("DOMContentLoaded", initAdminTopbar);