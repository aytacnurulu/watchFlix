async function includeHTML(mountId, url) {
  const el = document.getElementById(mountId);
  if (!el) return; // həmin id bu səhifədə yoxdursa keç

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load: ${url} (${res.status})`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error(`Error loading ${mountId}:`, err);
    el.innerHTML = "<p>Error loading sidebar</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Hansını istifadə edirsənsə, o işləyəcək:
  includeHTML("client-sidebar", "../partials/client-sidebar.html");
  includeHTML("sidebar", "../partials/sidebar.html");
});
