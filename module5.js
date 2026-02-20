// ===== MODULE 4 - LE PORT DU RETOUR =====

const MODULE4_DATA = {
    moduleId: 4,
    totalSequences: 3,
    completedSequences: 0,
    sequences: {
        '4-1': { completed: false, xp: 140 },
        '4-2': { completed: false, xp: 150 },
        '4-3': { completed: false, xp: 130 }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    loadModuleProgress();
    updateModuleProgress();
});

function loadModuleProgress() {
    const saved = localStorage.getItem('module4Progress');
    if (saved) Object.assign(MODULE4_DATA, JSON.parse(saved));
}

function saveModuleProgress() {
    localStorage.setItem('module4Progress', JSON.stringify(MODULE4_DATA));
}

function updateModuleProgress() {
    const progressBar = document.getElementById('moduleProgressBar');
    const progressText = document.getElementById('moduleProgressText');
    const percent = (MODULE4_DATA.completedSequences / MODULE4_DATA.totalSequences) * 100;
    progressBar.style.width = percent + '%';
    progressText.textContent = `${MODULE4_DATA.completedSequences}/${MODULE4_DATA.totalSequences} séquences`;
    
    Object.keys(MODULE4_DATA.sequences).forEach(seqKey => {
        const card = document.getElementById(`seq-${seqKey}`);
        if (card && MODULE4_DATA.sequences[seqKey].completed) {
            card.classList.add('completed');
            card.classList.remove('locked');
            card.querySelector('.btn-start-sequence').innerHTML = '<i class="fas fa-check"></i> Complété';
        }
    });
    
    const sequences = ['4-1', '4-2', '4-3'];
    const nextIndex = MODULE4_DATA.completedSequences;
    if (nextIndex < sequences.length && nextIndex > 0) {
        const card = document.getElementById(`seq-${sequences[nextIndex]}`);
        if (card) {
            card.classList.remove('locked');
            card.querySelector('.btn-start-sequence').onclick = () => startSequence(4, nextIndex + 1);
        }
    }
}

function startSequence(moduleId, sequenceId) {
    const seqKey = `${moduleId}-${sequenceId}`;
    if (MODULE4_DATA.sequences[seqKey].completed) {
        showNotification('Cette séquence est déjà complétée !', 'info');
        return;
    }
    
    const panel = document.getElementById('activityPanel');
    const title = document.getElementById('activityTitle');
    const content = document.getElementById('activityContent');
    panel.classList.remove('hidden');
    
    switch(sequenceId) {
        case 1:
            title.textContent = 'Séquence 4.1 - L\'Entretien Miroir';
            content.innerHTML = createEntretienActivity();
            initializeEntretien();
            break;
        case 2:
            title.textContent = 'Séquence 4.2 - Le CV Augmenté';
            content.innerHTML = createCVActivity();
            break;
        case 3:
            title.textContent = 'Séquence 4.3 - Le Storytelling';
            content.innerHTML = createStorytellingActivity();
            break;
    }
}

function createEntretienActivity() {
    return `
        <div class="entretien-container">
            <h3>🎤 Mener l'Entretien de Retour</h3>
            <p>Choisissez les bonnes questions pour chaque phase de l'entretien.</p>
            
            <div class="phase-container">
                <h4>Phase 1: Émotions</h4>
                <p class="phase-description">Explorer le vécu émotionnel</p>
                <div class="questions-disponibles">
                    <button class="btn-question" onclick="selectQuestion(1, 1)">Comment t'es-tu senti(e) pendant cette expérience ?</button>
                    <button class="btn-question" onclick="selectQuestion(1, 2)">Quelles compétences as-tu développées ?</button>
                    <button class="btn-question" onclick="selectQuestion(1, 3)">Qu'est-ce qui t'a le plus marqué ?</button>
                </div>
                <div id="phase1-feedback"></div>
            </div>
            
            <div class="phase-container">
                <h4>Phase 2: Compétences</h4>
                <p class="phase-description">Identifier les acquis</p>
                <div class="questions-disponibles">
                    <button class="btn-question" onclick="selectQuestion(2, 1)">Tu as envie de repartir ?</button>
                    <button class="btn-question" onclick="selectQuestion(2, 2)">Quelles difficultés as-tu surmontées ?</button>
                    <button class="btn-question" onclick="selectQuestion(2, 3)">Qu'as-tu appris sur toi-même ?</button>
                </div>
                <div id="phase2-feedback"></div>
            </div>
            
            <div class="phase-container">
                <h4>Phase 3: Projet</h4>
                <p class="phase-description">Projeter vers l'avenir</p>
                <div class="questions-disponibles">
                    <button class="btn-question" onclick="selectQuestion(3, 1)">Comment vas-tu valoriser cette expérience ?</button>
                    <button class="btn-question" onclick="selectQuestion(3, 2)">C'était bien ?</button>
                    <button class="btn-question" onclick="selectQuestion(3, 3)">Quelles sont tes prochaines étapes ?</button>
                </div>
                <div id="phase3-feedback"></div>
            </div>
            
            <button class="btn-primary hidden" id="btnValidateEntretien" onclick="completeSequence(4, 1, 140)">
                Valider l'entretien
            </button>
        </div>
    `;
}

function initializeEntretien() {
    window.entretienScore = 0;
}

function selectQuestion(phase, questionNum) {
    const correctAnswers = { 1: 1, 2: 3, 3: 1 };
    const feedback = document.getElementById(`phase${phase}-feedback`);
    const buttons = document.querySelectorAll(`.phase-container:nth-child(${phase}) .btn-question`);
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (questionNum === correctAnswers[phase]) {
        feedback.textContent = '✓ Excellente question !';
        feedback.style.color = '#7ED321';
        window.entretienScore++;
    } else {
        feedback.textContent = '⚠ Question moins pertinente pour cette phase';
        feedback.style.color = '#F5A623';
    }
    
    if (window.entretienScore >= 2) {
        document.getElementById('btnValidateEntretien').classList.remove('hidden');
    }
}

function createCVActivity() {
    return `
        <div class="cv-container">
            <h3>📄 Transformer l'Expérience en CV</h3>
            <p>Traduisez l'expérience de Léa en compétences professionnelles.</p>
            
            <div class="split-view">
                <div class="experience-recit">
                    <h4>Récit de Léa</h4>
                    <p>"J'ai travaillé 3 mois dans un café à Barcelone. Au début je parlais pas bien espagnol, 
                    mais j'ai vite appris. Je devais gérer la caisse, servir les clients, parfois des touristes 
                    anglais aussi. Mon patron était exigeant sur la qualité du service. J'ai dû m'adapter vite 
                    aux horaires espagnols et à leur façon de travailler."</p>
                </div>
                
                <div class="cv-builder">
                    <h4>Section CV à compléter</h4>
                    <form id="cvForm">
                        <label>Intitulé du poste:</label>
                        <input type="text" id="poste" placeholder="Ex: Employée polyvalente en restauration">
                        
                        <label>Compétences développées (sélectionnez 3):</label>
                        <div class="competences-list">
                            <label><input type="checkbox" name="comp" value="adaptation"> Capacité d'adaptation</label>
                            <label><input type="checkbox" name="comp" value="langues"> Compétences linguistiques</label>
                            <label><input type="checkbox" name="comp" value="service"> Sens du service client</label>
                            <label><input type="checkbox" name="comp" value="cuisine"> Cuisine</label>
                            <label><input type="checkbox" name="comp" value="equipe"> Travail en équipe multiculturelle</label>
                            <label><input type="checkbox" name="comp" value="gestion"> Gestion de caisse</label>
                        </div>
                        
                        <label>Description synthétique (50 mots max):</label>
                        <textarea id="description" rows="4" placeholder="Décrivez l'expérience de manière professionnelle..."></textarea>
                        
                        <button type="button" class="btn-primary" onclick="validateCV()">
                            Générer le CV
                        </button>
                    </form>
                </div>
            </div>
            
            <div id="cvPreview" class="cv-preview hidden">
                <h4>Aperçu CV</h4>
                <div id="cvContent"></div>
                <button class="btn-primary" onclick="completeSequence(4, 2, 150)">
                    Valider et continuer
                </button>
            </div>
        </div>
    `;
}

function validateCV() {
    const poste = document.getElementById('poste').value;
    const description = document.getElementById('description').value;
    const selectedComps = Array.from(document.querySelectorAll('input[name="comp"]:checked')).map(c => c.value);
    
    if (!poste || !description || selectedComps.length !== 3) {
        showNotification('Veuillez remplir tous les champs et sélectionner 3 compétences', 'warning');
        return;
    }
    
    const preview = document.getElementById('cvPreview');
    const content = document.getElementById('cvContent');
    
    content.innerHTML = `
        <h5>${poste}</h5>
        <p><strong>Barcelone, Espagne</strong> | 3 mois</p>
        <p>${description}</p>
        <p><strong>Compétences clés:</strong> ${selectedComps.join(', ')}</p>
    `;
    
    preview.classList.remove('hidden');
    showNotification('✅ CV généré avec succès !');
}

function createStorytellingActivity() {
    return `
        <div class="storytelling-container">
            <h3>📣 Construire un Témoignage Inspirant</h3>
            <p>Aidez Lucas à structurer son pitch de 2 minutes.</p>
            
            <div class="story-builder">
                <div class="story-section">
                    <h4>1. L'accroche (10 sec)</h4>
                    <select id="accroche">
                        <option value="">-- Choisissez --</option>
                        <option value="1">Je m'appelle Lucas et je suis parti en Pologne</option>
                        <option value="2">Il y a 6 mois, je ne parlais pas anglais. Aujourd'hui, je travaille dans une startup internationale</option>
                        <option value="3">J'ai fait un stage</option>
                    </select>
                </div>
                
                <div class="story-section">
                    <h4>2. Le défi (30 sec)</h4>
                    <textarea id="defi" rows="3" placeholder="Décrivez une difficulté surmontée..."></textarea>
                </div>
                
                <div class="story-section">
                    <h4>3. La transformation (30 sec)</h4>
                    <textarea id="transformation" rows="3" placeholder="Qu'est-ce qui a changé ?"></textarea>
                </div>
                
                <div class="story-section">
                    <h4>4. Le message clé (20 sec)</h4>
                    <select id="message">
                        <option value="">-- Choisissez --</option>
                        <option value="1">C'était cool</option>
                        <option value="2">Cette expérience m'a prouvé que je suis capable de sortir de ma zone de confort</option>
                        <option value="3">Je recommande à tout le monde</option>
                    </select>
                </div>
                
                <button class="btn-primary" onclick="validateStory()">
                    Prévisualiser le pitch
                </button>
            </div>
            
            <div id="storyPreview" class="story-preview hidden">
                <h4>🎬 Votre pitch</h4>
                <div id="storyContent"></div>
                <button class="btn-primary" onclick="completeSequence(4, 3, 130)">
                    Valider et continuer
                </button>
            </div>
        </div>
    `;
}

function validateStory() {
    const accroche = document.getElementById('accroche').value;
    const defi = document.getElementById('defi').value;
    const transformation = document.getElementById('transformation').value;
    const message = document.getElementById('message').value;
    
    if (!accroche || !defi || !transformation || !message) {
        showNotification('Veuillez remplir tous les champs', 'warning');
        return;
    }
    
    const preview = document.getElementById('storyPreview');
    const content = document.getElementById('storyContent');
    
    const accrocheText = accroche === '2' ? 
        "Il y a 6 mois, je ne parlais pas anglais. Aujourd'hui, je travaille dans une startup internationale" :
        document.querySelector(`#accroche option[value="${accroche}"]`).textContent;
    
    const messageText = message === '2' ?
        "Cette expérience m'a prouvé que je suis capable de sortir de ma zone de confort" :
        document.querySelector(`#message option[value="${message}"]`).textContent;
    
    content.innerHTML = `
        <p><strong>Accroche:</strong> ${accrocheText}</p>
        <p><strong>Défi:</strong> ${defi}</p>
        <p><strong>Transformation:</strong> ${transformation}</p>
        <p><strong>Message:</strong> ${messageText}</p>
    `;
    
    preview.classList.remove('hidden');
    showNotification('✅ Pitch structuré !');
}

function completeSequence(module, seqNum, xp) {
    const seqKey = `${module}-${seqNum}`;
    MODULE4_DATA.sequences[seqKey].completed = true;
    MODULE4_DATA.completedSequences++;
    addXP(xp);
    saveModuleProgress();
    closeActivity();
    updateModuleProgress();
    
    if (MODULE4_DATA.completedSequences === MODULE4_DATA.totalSequences) {
        setTimeout(() => {
            completeModule(4, 420);
            showCompletionModal();
        }, 1000);
    } else {
        showNotification(`🎉 +${xp} XP ! Séquence 4.${seqNum} complétée !`);
    }
}

window.startSequence = startSequence;
window.selectQuestion = selectQuestion;
window.completeSequence = completeSequence;
window.validateCV = validateCV;
window.validateStory = validateStory;
