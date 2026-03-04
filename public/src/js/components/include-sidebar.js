

document.addEventListener('DOMContentLoaded', async () => {
    const clientSidebar = document.getElementById('client-sidebar');
    if (!clientSidebar) return;

    try {
        const response = await fetch('http://127.0.0.1:5501/public/partials/client-sidebar.html');
        if (!response.ok) throw new Error('Failed to load sidebar');
        const sidebarHTML = await response.text();
        clientSidebar.innerHTML = sidebarHTML;
    } catch (error) {
        console.error('Error loading sidebar:', error);
        clientSidebar.innerHTML = '<p>Error loading sidebar</p>';
    }
});
