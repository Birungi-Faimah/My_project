document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const navLinks = document.querySelectorAll(".nav a[href^='#']");
  const sections = document.querySelectorAll(".content-section");

  // Set initial active state
  const hash = window.location.hash.substring(1);
  const initialLink = hash 
    ? document.querySelector(`.nav a[data-section="${hash}"]`)
    : navLinks[0];
  
  if (initialLink) initialLink.click();

  // Add click handlers
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      
      // Update active states
      navLinks.forEach(l => l.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));
      
      link.classList.add("active");
      const targetId = `${link.dataset.section}-section`;
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.classList.add("active");
        targetSection.setAttribute('tabindex', '-1');
        targetSection.focus();
        history.pushState(null, null, `#${link.dataset.section}`);
      }
    });
  });

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    const link = document.querySelector(`.nav a[data-section="${hash}"]`);
    if (link) link.click();
  });
});