// ===== MODULE 2 - LA VALLÉE DE LA PRÉPARATION =====

const MODULE2_DATA = {
    moduleId: 2,
    totalSequences: 4,
    completedSequences: 0,
    sequences: {
        '2-1': { completed: false, xp: 120 },
        '2-2': { completed: false, xp: 150 },
        '2-3': { completed: false, xp: 130 },
        '2-4': { completed: false, xp: 180 }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    loadModuleProgress();
    updateModuleProgress();
});

function loadModuleProgress() {
    const saved = localStorage.getItem('module2Progress');
    if (saved) {
        Object.assign(MODULE2_DATA, JSON.parse(saved));
    }
}

function saveModuleProgress() {
    localStorage.setItem('module2Progress', JSON.stringify(MODULE2_DATA));
}

function updateModuleProgress() {
    const progressBar = document.getElementById('moduleProgressBar');
    const progressText = document.getElementById('moduleProgressText');
    
    const percent = (MODULE2_DATA.completedSequences / MODULE2_DATA.totalSequences) * 100;
    progressBar.style.width = percent + '%';
    progressText.textContent = `${MODULE2_DATA.completedSequences}/${MODULE2_DATA.totalSequences} séquences`;
    
    Object.keys(MODULE2_DATA.sequences).forEach(seqKey => {
        const seqData = MODULE2_DATA.sequences[seqKey];
        const card = document.getElementById(`seq-${seqKey}`);
        
        if (card && seqData.completed) {
            card.classList.add('completed');
            card.classList.remove('locked');
            const btn = card.querySelector('.btn-start-sequence');
            btn.innerHTML = '<i class="fas fa-check"></i> Complété';
            btn.style.background = 'var(--gradient-green)';
        }
    });
    
    unlockNextSequence();
}

function unlockNextSequence() {
    const sequences = ['2-1', '2-2', '2-3', '2-4'];
    const nextIndex = MODULE2_DATA.completedSequences;
    
    if (nextIndex < sequences.length && nextIndex > 0) {
        const nextSeq = sequences[nextIndex];
        const card = document.getElementById(`seq-${nextSeq}`);
        if (card) {
            card.classList.remove('locked');
            const btn = card.querySelector('.btn-start-sequence');
            const seqNum = nextSeq.split('-')[1];
            btn.innerHTML = '<i class="fas fa-play"></i> Commencer';
            btn.onclick = () => startSequence(2, parseInt(seqNum));
        }
    }
}

function startSequence(moduleId, sequenceId) {
    const seqKey = `${moduleId}-${sequenceId}`;
    
    if (MODULE2_DATA.sequences[seqKey].completed) {
        showNotification('Cette séquence est déjà complétée !', 'info');
        return;
    }
    
    const panel = document.getElementById('activityPanel');
    const title = document.getElementById('activityTitle');
    const content = document.getElementById('activityContent');
    
    panel.classList.remove('hidden');
    
    switch (sequenceId) {
        case 1:
            title.textContent = 'Séquence 2.1 - L\'Encyclopédie des Dispositifs';
            content.innerHTML = createDispositifsActivity();
            initializeDispositifs();
            break;
        case 2:
            title.textContent = 'Séquence 2.2 - Le Plan de Route';
            content.innerHTML = createPlanRouteActivity();
            initializePlanRoute();
            break;
        case 3:
            title.textContent = 'Séquence 2.3 - La Boîte à Outils SOS';
            content.innerHTML = createSOSActivity();
            initializeSOS();
            break;
        case 4:
            title.textContent = 'Séquence 2.4 - L\'Atelier Famille';
            content.innerHTML = createFamilleActivity();
            initializeFamille();
            break;
    }
}

// Activity 2.1 - Encyclopédie des Dispositifs
function createDispositifsActivity() {
    return `
        <div class="dispositifs-container">
            <h3>📚 Connaître les Dispositifs de Mobilité</h3>
            <p>Sélectionnez le profil du jeune pour découvrir les dispositifs adaptés.</p>
            
            <div class="profil-selector">
                <label><strong>Âge:</strong></label>
                <select id="age">
                    <option value="16-18">16-18 ans</option>
                    <option value="18-25">18-25 ans</option>
                    <option value="25-30">25-30 ans</option>
                </select>
                
                <label><strong>Situation:</strong></label>
                <select id="situation">
                    <option value="etudiant">Étudiant</option>
                    <option value="demandeur">Demandeur d'emploi</option>
                    <option value="salarie">Salarié</option>
                </select>
                
                <label><strong>Durée souhaitée:</strong></label>
                <select id="duree">
                    <option value="court">Court (1-4 semaines)</option>
                    <option value="moyen">Moyen (1-3 mois)</option>
                    <option value="long">Long (+3 mois)</option>
                </select>
                
                <button class="btn-primary" onclick="rechercherDispositifs()">
                    <i class="fas fa-search"></i> Rechercher
                </button>
            </div>
            
            <div id="resultsDispositifs" class="results-container hidden">
                <h4>Dispositifs recommandés</h4>
                <div id="dispositifsList"></div>
                
                <button class="btn-primary" onclick="completeSequence(2, 1, 120)">
                    Valider et continuer
                </button>
            </div>
        </div>
    `;
}

function initializeDispositifs() {
    // Already initialized with HTML
}

function rechercherDispositifs() {
    const age = document.getElementById('age').value;
    const situation = document.getElementById('situation').value;
    const duree = document.getElementById('duree').value;
    
    const dispositifs = [
        {
            nom: 'Erasmus+ Jeunesse',
            duree: 'court-moyen',
            age: '16-30',
            financement: 'Complet',
            description: 'Échanges de jeunes et volontariat'
        },
        {
            nom: 'Corps Européen de Solidarité',
            duree: 'moyen-long',
            age: '18-30',
            financement: 'Complet',
            description: 'Volontariat en Europe'
        },
        {
            nom: 'Move\'In',
            duree: 'court-moyen',
            age: '18-25',
            financement: 'Partiel',
            description: 'Stage professionnel à l\'étranger'
        }
    ];
    
    const results = document.getElementById('resultsDispositifs');
    const list = document.getElementById('dispositifsList');
    
    list.innerHTML = dispositifs.map(d => `
        <div class="dispositif-card">
            <h5>${d.nom}</h5>
            <p>${d.description}</p>
            <div class="dispositif-meta">
                <span><i class="fas fa-clock"></i> ${d.duree}</span>
                <span><i class="fas fa-euro-sign"></i> ${d.financement}</span>
            </div>
        </div>
    `).join('');
    
    results.classList.remove('hidden');
}

// Activity 2.2 - Plan de Route
function createPlanRouteActivity() {
    return `
        <div class="planroute-container">
            <h3>🗺️ Construire le Plan de Route</h3>
            <p>Organisez les étapes de préparation dans l'ordre chronologique.</p>
            
            <div class="timeline-builder">
                <div class="etapes-disponibles">
                    <h4>Étapes à organiser</h4>
                    <div class="etape-item" draggable="true" data-order="1">📄 Demande de passeport</div>
                    <div class="etape-item" draggable="true" data-order="2">🔍 Recherche de structure d'accueil</div>
                    <div class="etape-item" draggable="true" data-order="3">💉 Vaccins si nécessaire</div>
                    <div class="etape-item" draggable="true" data-order="4">✈️ Réservation transport</div>
                    <div class="etape-item" draggable="true" data-order="5">🏠 Recherche de logement</div>
                    <div class="etape-item" draggable="true" data-order="6">💰 Demande de financement</div>
                </div>
                
                <div class="timeline-zone" id="timelineZone">
                    <h4>Timeline (glissez les étapes ici)</h4>
                    <div class="timeline-slots" id="timelineSlots">
                        <!-- Slots will be created dynamically -->
                    </div>
                </div>
            </div>
            
            <button class="btn-primary hidden" id="btnValidatePlan" onclick="completeSequence(2, 2, 150)">
                Valider mon plan
            </button>
        </div>
    `;
}

function initializePlanRoute() {
    const slots = document.getElementById('timelineSlots');
    for (let i = 1; i <= 6; i++) {
        const slot = document.createElement('div');
        slot.className = 'timeline-slot';
        slot.dataset.position = i;
        slot.textContent = `Étape ${i}`;
        slots.appendChild(slot);
    }
    
    // Drag and drop logic (simplified)
    let completed = 0;
    document.querySelectorAll('.etape-item').forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('order', this.dataset.order);
        });
    });
    
    document.querySelectorAll('.timeline-slot').forEach(slot => {
        slot.addEventListener('dragover', e => e.preventDefault());
        slot.addEventListener('drop', function(e) {
            const order = e.dataTransfer.getData('order');
            this.textContent = document.querySelector(`[data-order="${order}"]`).textContent;
            this.style.background = '#7ED321';
            this.style.color = 'white';
            completed++;
            
            if (completed === 6) {
                document.getElementById('btnValidatePlan').classList.remove('hidden');
            }
        });
    });
}

// Activity 2.3 - Boîte à Outils SOS
function createSOSActivity() {
    return `
        <div class="sos-container">
            <h3>🆘 Escape Game : Situation d'Urgence</h3>
            <p><strong>Scénario:</strong> Léa est en Espagne. Elle a perdu son portefeuille avec ses cartes bancaires et a un problème de santé mineur.</p>
            
            <div class="sos-scenario">
                <div class="sos-problem">
                    <h4>Problèmes à résoudre:</h4>
                    <ul>
                        <li>🔴 Perte du portefeuille</li>
                        <li>🟠 Problème de santé</li>
                        <li>🟡 Besoin d'argent rapidement</li>
                    </ul>
                </div>
                
                <div class="sos-solutions">
                    <h4>Solutions disponibles:</h4>
                    <button class="btn-solution" onclick="checkSolution('police')">Contacter la police locale</button>
                    <button class="btn-solution" onclick="checkSolution('consulat')">Appeler le consulat français</button>
                    <button class="btn-solution" onclick="checkSolution('banque')">Opposition carte bancaire</button>
                    <button class="btn-solution" onclick="checkSolution('western')">Western Union pour envoi d'argent</button>
                    <button class="btn-solution" onclick="checkSolution('medecin')">Trouver un médecin</button>
                    <button class="btn-solution" onclick="checkSolution('assurance')">Contacter l'assurance</button>
                </div>
                
                <div id="sosFeedback" class="sos-feedback"></div>
            </div>
            
            <button class="btn-primary hidden" id="btnValidateSOS" onclick="completeSequence(2, 3, 130)">
                Mission accomplie !
            </button>
        </div>
    `;
}

function initializeSOS() {
    window.sosScore = 0;
}

function checkSolution(solution) {
    const feedback = document.getElementById('sosFeedback');
    const correct = ['police', 'banque', 'medecin'];
    
    if (correct.includes(solution)) {
        window.sosScore++;
        feedback.innerHTML += `<p style="color: #7ED321;">✓ ${solution} : Bonne décision !</p>`;
        
        if (window.sosScore >= 3) {
            document.getElementById('btnValidateSOS').classList.remove('hidden');
        }
    } else {
        feedback.innerHTML += `<p style="color: #F5A623;">⚠ ${solution} : Pas prioritaire</p>`;
    }
}

// Activity 2.4 - Atelier Famille
function createFamilleActivity() {
    return `
        <div class="famille-container">
            <h3>👨‍👩‍👧 Préparer la Réunion Famille</h3>
            <p>Répondez aux questions courantes des parents.</p>
            
            <div class="questions-parents">
                <div class="question-item">
                    <p><strong>Parent:</strong> "C'est dangereux de partir seul ?"</p>
                    <select class="reponse-select" data-correct="2">
                        <option value="">-- Choisissez votre réponse --</option>
                        <option value="1">Ce n'est pas dangereux du tout</option>
                        <option value="2">On met en place un suivi, une assurance et des contacts sur place</option>
                        <option value="3">Vous avez raison, c'est trop risqué</option>
                    </select>
                </div>
                
                <div class="question-item">
                    <p><strong>Parent:</strong> "Et s'il y a un problème ?"</p>
                    <select class="reponse-select" data-correct="2">
                        <option value="">-- Choisissez votre réponse --</option>
                        <option value="1">Il se débrouillera</option>
                        <option value="2">Nous restons joignables 24/7 et il y a des numéros d'urgence</option>
                        <option value="3">Ça n'arrivera pas</option>
                    </select>
                </div>
                
                <div class="question-item">
                    <p><strong>Parent:</strong> "Ça coûte combien ?"</p>
                    <select class="reponse-select" data-correct="1">
                        <option value="">-- Choisissez votre réponse --</option>
                        <option value="1">Des financements couvrent les frais (transport, logement, nourriture)</option>
                        <option value="2">C'est gratuit</option>
                        <option value="3">Ça dépend, entre 2000 et 5000€</option>
                    </select>
                </div>
            </div>
            
            <button class="btn-primary" onclick="validateFamille()">
                Valider mes réponses
            </button>
        </div>
    `;
}

function initializeFamille() {
    // Initialized with HTML
}

function validateFamille() {
    const selects = document.querySelectorAll('.reponse-select');
    let score = 0;
    
    selects.forEach(select => {
        if (select.value === select.dataset.correct) {
            select.style.border = '2px solid #7ED321';
            score++;
        } else {
            select.style.border = '2px solid #E74C3C';
        }
    });
    
    if (score === 3) {
        showNotification('✅ Parfait ! Vous avez les bonnes réponses.');
        setTimeout(() => completeSequence(2, 4, 180), 1500);
    } else {
        showNotification('Certaines réponses peuvent être améliorées', 'warning');
    }
}

// Generic complete sequence
function completeSequence(module, seqNum, xp) {
    const seqKey = `${module}-${seqNum}`;
    MODULE2_DATA.sequences[seqKey].completed = true;
    MODULE2_DATA.completedSequences++;
    addXP(xp);
    saveModuleProgress();
    closeActivity();
    updateModuleProgress();
    
    if (MODULE2_DATA.completedSequences === MODULE2_DATA.totalSequences) {
        setTimeout(() => {
            completeModule(2, 580);
            showCompletionModal();
        }, 1000);
    } else {
        showNotification(`🎉 +${xp} XP ! Séquence 2.${seqNum} complétée !`);
    }
}

window.startSequence = startSequence;
window.rechercherDispositifs = rechercherDispositifs;
window.completeSequence = completeSequence;
window.checkSolution = checkSolution;
window.validateFamille = validateFamille;
