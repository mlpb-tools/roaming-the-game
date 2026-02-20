let xp = Number(localStorage.getItem("xp") || 0);
let completedModules = Number(localStorage.getItem("modules") || 0);

function updateDashboard(){
  const xpEl = document.getElementById("xp");
  const modEl = document.getElementById("modules");
  const fill = document.getElementById("progressFill");

  if(xpEl) xpEl.textContent = xp;
  if(modEl) modEl.textContent = completedModules;

  if(fill){
    const pct = Math.min(100, (completedModules / 5) * 100);
    fill.style.width = pct + "%";
  }
}

function goToModule(id){
  window.location.href = `module${id}.html`;
}

function resetProgress(){
  localStorage.clear();
  location.reload();
}

function validateModule1(){
  const pitch = document.getElementById("pitch").value.trim();
  if(pitch.length < 10){
    alert("Écris au moins quelques phrases.");
    return;
  }

  xp += 100;
  completedModules = 1;

  localStorage.setItem("xp", xp);
  localStorage.setItem("modules", completedModules);

  document.getElementById("validationMessage").innerHTML =
    "<p style='color:green;'>Module validé ! 100 XP gagnés.</p>";
}

document.addEventListener("DOMContentLoaded", updateDashboard);
