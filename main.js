// Minimal: dashboard + navigation (pour que GitHub Pages "fonctionne" tout de suite)

const state = {
  xp: Number(localStorage.getItem("roaming_xp") || 0),
  badges: Number(localStorage.getItem("roaming_badges") || 0),
  completedModules: Number(localStorage.getItem("roaming_modules") || 0),
};

function updateDashboard(){
  const totalXP = document.getElementById("totalXP");
  const totalBadges = document.getElementById("totalBadges");
  const completedModules = document.getElementById("completedModules");
  const progressPercent = document.getElementById("progressPercent");
  const progressFill = document.getElementById("progressFill");

  if(!totalXP) return;

  totalXP.textContent = state.xp;
  totalBadges.textContent = state.badges;
  completedModules.textContent = state.completedModules;

  // progression simple sur 5 modules
  const pct = Math.min(100, Math.round((state.completedModules / 5) * 100));
  progressPercent.textContent = pct + "%";
  progressFill.style.width = pct + "%";
}

function goToModule(id){
  // dans ton repo actuel, les modules sont à la racine : module1.html, module2.html...
  window.location.href = `module${id}.html`;
}

window.goToModule = goToModule;

document.addEventListener("DOMContentLoaded", updateDashboard);
