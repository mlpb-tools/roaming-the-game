// ===== ROAMING APP - MAIN JAVASCRIPT =====

// Data Structure
const ROAMING_DATA = {
    user: {
        name: 'Conseiller',
        level: 1,
        xp: 0,
        completedModules: 0,
        badges: []
    },
    modules: [
        { id: 1, name: 'L\'Île des Croyances', sequences: 3, totalXP: 450, completed: false, unlocked: true },
        { id: 2, name: 'La Vallée de la Préparation', sequences: 4, totalXP: 580, completed: false, unlocked: false },
        { id: 3, name: 'L\'Archipel du Suivi', sequences: 2, totalXP: 300, completed: false, unlocked: false },
        { id: 4, name: 'Le Port du Retour', sequences: 3, totalXP: 420, completed: false, unlocked: false },
        { id: 5, name: 'La Citadelle des Réseaux', sequences: 3, totalXP: 400, completed: false, unlocked: false }
    ],
    badges: [
        { id: 1, name: 'Briseur de Mythes', icon: 'fa-hammer', module: 1, unlocked: false },
        { id: 2, name: 'Architecte du Départ', icon: 'fa-drafting-compass', module: 2, unlocked: false },
        { id: 3, name: 'Gardien du Lien', icon: 'fa-link', module: 3, unlocked: false },
        { id: 4, name: 'Valorisateur d\'Expérience', icon: 'fa-award', module: 4, unlocked: false },
        { id: 5, name: 'Maître ROAMING', icon: 'fa-crown', module: 5, unlocked: false }
    ]
};

// Local Storage Functions
function saveData() {
    localStorage.setItem('roamingData', JSON.stringify(ROAMING_DATA));
}

function loadData() {
    const saved = localStorage.getItem('roamingData');
    if (saved) {
        const loadedData = JSON.parse(saved);
        Object.assign(ROAMING_DATA, loadedData);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    if (document.querySelector('.mission-control')) {
        updateDashboard();
    }
});

// Dashboard Update Functions
function updateDashboard() {
    // Update stats
    document.getElementById('totalXP').textContent = ROAMING_DATA.user.xp;
    document.getElementById('userLevel').textContent = ROAMING_DATA.user.level;
    document.getElementById('totalBadges').textContent = ROAMING_DATA.badges.filter(b => b.unlocked).length;
    document.getElementById('completedModules').textContent = ROAMING_DATA.modules.filter(m => m.completed).length;
    
    // Calculate progress
    const totalSequences = ROAMING_DATA.modules.reduce((sum, m) => sum + m.sequences, 0);
    const completedSequences = calculateCompletedSequences();
    const progressPercent = Math.round((completedSequences / totalSequences) * 100);
    
    document.getElementById('progressPercent').textContent = progressPercent + '%';
    document.getElementById('progressFill').style.width = progressPercent + '%';
    
    // Update level based on XP
    updateLevel();
    
    // Update module cards
    updateModuleCards();
    
    // Populate badges
    populateBadges();
}

function calculateCompletedSequences() {
    let total = 0;
    ROAMING_DATA.modules.forEach(module => {
        const moduleProgress = localStorage.getItem(`module${module.id}Progress`);
        if (moduleProgress) {
            const progress = JSON.parse(moduleProgress);
            total += progress.completedSequences || 0;
        }
    });
    return total;
}

function updateLevel() {
    const xp = ROAMING_DATA.user.xp;
    let level = 1;
    
    if (xp >= 5000) level = 5; // Maître ROAMING
    else if (xp >= 3000) level = 4; // Ambassadeur
    else if (xp >= 1500) level = 3; // Expert Mobilité
    else if (xp >= 500) level = 2; // Accompagnateur
    
    ROAMING_DATA.user.level = level;
    document.getElementById('userLevel').textContent = level;
}

function updateModuleCards() {
    ROAMING_DATA.modules.forEach((module, index) => {
        const card = document.querySelector(`.module-card[data-module="${module.id}"]`);
        if (!card) return;
        
        const btn = card.querySelector('.btn-start');
        const badge = card.querySelector('.module-badge');
        const progressFill = card.querySelector('.progress-mini-fill');
        const progressText = card.querySelector('.progress-text');
        
        // Check if module is unlocked
        if (module.unlocked) {
            btn.classList.remove('locked');
            btn.innerHTML = '<i class="fas fa-play"></i> Commencer';
        }
        
        // Update progress
        const moduleProgress = localStorage.getItem(`module${module.id}Progress`);
        if (moduleProgress) {
            const progress = JSON.parse(moduleProgress);
            const percent = Math.round((progress.completedSequences / module.sequences) * 100);
            progressFill.style.width = percent + '%';
            progressText.textContent = percent + '% complété';
            
            if (progress.completed) {
                btn.innerHTML = '<i class="fas fa-check"></i> Complété';
                btn.style.background = 'var(--gradient-green)';
            }
        }
        
        // Update badge
        const badgeData = ROAMING_DATA.badges.find(b => b.module === module.id);
        if (badgeData && badgeData.unlocked) {
            badge.classList.remove('locked');
            badge.classList.add('unlocked');
            badge.innerHTML = `<i class="fas ${badgeData.icon}"></i>`;
        }
    });
}

function populateBadges() {
    const badgesGrid = document.getElementById('badgesGrid');
    if (!badgesGrid) return;
    
    badgesGrid.innerHTML = '';
    
    ROAMING_DATA.badges.forEach(badge => {
        const badgeItem = document.createElement('div');
        badgeItem.className = `badge-item ${badge.unlocked ? 'unlocked' : 'locked'}`;
        badgeItem.innerHTML = `
            <div class="badge-icon">
                <i class="fas ${badge.icon}"></i>
            </div>
            <div class="badge-name">${badge.name}</div>
        `;
        badgesGrid.appendChild(badgeItem);
    });
}

// Navigation Functions
function goToModule(moduleId) {
    const module = ROAMING_DATA.modules.find(m => m.id === moduleId);
    if (module && module.unlocked) {
        window.location.href = `module${moduleId}.html`;
    }
}

// Module Completion Functions
function completeModule(moduleId, xpEarned) {
    const module = ROAMING_DATA.modules.find(m => m.id === moduleId);
    if (!module) return;
    
    // Mark module as completed
    module.completed = true;
    ROAMING_DATA.user.completedModules++;
    ROAMING_DATA.user.xp += xpEarned;
    
    // Unlock badge
    const badge = ROAMING_DATA.badges.find(b => b.module === moduleId);
    if (badge) {
        badge.unlocked = true;
    }
    
    // Unlock next module
    if (moduleId < 5) {
        ROAMING_DATA.modules[moduleId].unlocked = true;
    }
    
    saveData();
}

function addXP(amount) {
    ROAMING_DATA.user.xp += amount;
    saveData();
}

// Modal Functions
function showCompletionModal() {
    const modal = document.getElementById('completionModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideCompletionModal() {
    const modal = document.getElementById('completionModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function returnToDashboard() {
    window.location.href = 'index.html';
}

function goToNextModule() {
    const currentPath = window.location.pathname;
    const currentModuleMatch = currentPath.match(/module(\d+)\.html/);
    
    if (currentModuleMatch) {
        const currentModule = parseInt(currentModuleMatch[1]);
        const nextModule = currentModule + 1;
        
        if (nextModule <= 5) {
            window.location.href = `module${nextModule}.html`;
        } else {
            returnToDashboard();
        }
    }
}

// Activity Panel Functions
function closeActivity() {
    const panel = document.getElementById('activityPanel');
    if (panel) {
        panel.classList.add('hidden');
    }
}

// Certificate Download (Module 5)
function downloadCertificate() {
    alert('🎓 Votre certification ROAMING est en cours de génération !\n\nVous recevrez votre certificat par email dans quelques instants.');
    setTimeout(() => {
        returnToDashboard();
    }, 2000);
}

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#7ED321' : '#F5A623'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.5s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export functions for module pages
window.goToModule = goToModule;
window.returnToDashboard = returnToDashboard;
window.goToNextModule = goToNextModule;
window.closeActivity = closeActivity;
window.downloadCertificate = downloadCertificate;
window.ROAMING_DATA = ROAMING_DATA;
window.saveData = saveData;
window.loadData = loadData;
window.completeModule = completeModule;
window.addXP = addXP;
window.showCompletionModal = showCompletionModal;
window.showNotification = showNotification;
