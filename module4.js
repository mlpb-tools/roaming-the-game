// ===== MODULE 3 - L'ARCHIPEL DU SUIVI =====

const MODULE3_DATA = {
    moduleId: 3,
    totalSequences: 2,
    completedSequences: 0,
    sequences: {
        '3-1': { completed: false, xp: 140 },
        '3-2': { completed: false, xp: 160 }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    loadModuleProgress();
    updateModuleProgress();
});

function loadModuleProgress() {
    const saved = localStorage.getItem('module3Progress');
    if (saved) Object.assign(MODULE3_DATA, JSON.parse(saved));
}

function saveModuleProgress() {
    localStorage.setItem('module3Progress', JSON.stringify(MODULE3_DATA));
}

function updateModuleProgress() {
    const progressBar = document.getElementById('moduleProgressBar');
    const progressText = document.getElementById('moduleProgressText');
    const percent = (MODULE3_DATA.completedSequences / MODULE3_DATA.totalSequences) * 100;
    progressBar.style.width = percent + '%';
    progressText.textContent = `${MODULE3_DATA.completedSequences}/${MODULE3_DATA.totalSequences} séquences`;
    
    Object.keys(MODULE3_DATA.sequences).forEach(seqKey => {
        const seqData = MODULE3_DATA.sequences[seqKey];
        const card = document.getElementById(`seq-${seqKey}`);
        if (card && seqData.completed) {
            card.classList.add('completed');
            card.classList.remove('locked');
            card.querySelector('.btn-start-sequence').innerHTML = '<i class="fas fa-check"></i> Complété';
        }
    });
    
    if (MODULE3_DATA.completedSequences === 1) {
        const card = document.getElementById('seq-3-2');
        if (card) {
            card.classList.remove('locked');
            card.querySelector('.btn-start-sequence').onclick = () => startSequence(3, 2);
        }
    }
}

function startSequence(moduleId, sequenceId) {
    const seqKey = `${moduleId}-${sequenceId}`;
    if (MODULE3_DATA.sequences[seqKey].completed) {
        showNotification('Cette séquence est déjà complétée !', 'info');
        return;
    }
    
    const panel = document.getElementById('activityPanel');
    const title = document.getElementById('activityTitle');
    const content = document.getElementById('activityContent');
    panel.classList.remove('hidden');
    
    if (sequenceId === 1) {
        title.textContent = 'Séquence 3.1 - La Messagerie Virtuelle';
        content.innerHTML = createMessagerieActivity();
        initializeMessagerie();
    } else {
        title.textContent = 'Séquence 3.2 - Le Détecteur d\'Alerte';
        content.innerHTML = createDetecteurActivity();
    }
}

function createMessagerieActivity() {
    return `
        <div class="messagerie-container">
            <h3>💬 Simulation d'Accompagnement à Distance</h3>
            <p>Thomas est en mobilité en Allemagne. Répondez à ses messages de manière appropriée.</p>
            
            <div class="chat-simulation" id="chatSimulation">
                <div class="message received">
                    <strong>Thomas:</strong> Salut ! Je suis bien arrivé à Berlin. C'est immense ! 😊
                </div>
            </div>
            
            <div class="response-options" id="responseOptions">
                <!-- Options will be added dynamically -->
            </div>
            
            <div class="trust-meter">
                <p>Jauge de confiance de Thomas:</p>
                <div class="meter-bar">
                    <div class="meter-fill" id="trustMeter" style="width: 50%;"></div>
                </div>
            </div>
            
            <button class="btn-primary hidden" id="btnCompleteChat" onclick="completeSequence(3, 1, 140)">
                Terminer la simulation
            </button>
        </div>
    `;
}

function initializeMessagerie() {
    const messages = [
        {
            from: 'Thomas',
            text: 'Salut ! Je suis bien arrivé à Berlin. C\'est immense ! 😊',
            responses: [
                { text: 'Super ! Profite bien !', impact: 0 },
                { text: 'Content que tout se passe bien ! Comment s\'est passé le voyage ?', impact: 10 },
                { text: 'Ok', impact: -10 }
            ]
        },
        {
            from: 'Thomas',
            text: 'Honnêtement, je me sens un peu perdu... Tout le monde parle allemand.',
            responses: [
                { text: 'C\'est normal au début. Tu vas t\'habituer rapidement !', impact: 10 },
                { text: 'Tu savais que c\'était en Allemagne non ?', impact: -15 },
                { text: 'Essaie de pratiquer ton allemand, c\'est l\'occasion !', impact: 5 }
            ]
        },
        {
            from: 'Thomas',
            text: 'Mon tuteur est sympa mais très exigeant sur le travail...',
            responses: [
                { text: 'C\'est une opportunité d\'apprendre. Tu peux lui demander des conseils ?', impact: 10 },
                { text: 'Si c\'est trop dur, tu peux rentrer', impact: -20 },
                { text: 'Accroche-toi, ça va payer !', impact: 5 }
            ]
        }
    ];
    
    let trustLevel = 50;
    let currentMessage = 0;
    
    function displayMessage(index) {
        if (index >= messages.length) {
            document.getElementById('btnCompleteChat').classList.remove('hidden');
            showNotification(`Simulation terminée ! Niveau de confiance: ${trustLevel}%`);
            return;
        }
        
        const msg = messages[index];
        const chat = document.getElementById('chatSimulation');
        const optionsDiv = document.getElementById('responseOptions');
        
        optionsDiv.innerHTML = '<h4>Votre réponse:</h4>';
        msg.responses.forEach((response, i) => {
            const btn = document.createElement('button');
            btn.className = 'btn-response';
            btn.textContent = response.text;
            btn.onclick = () => {
                trustLevel += response.impact;
                trustLevel = Math.max(0, Math.min(100, trustLevel));
                
                const trustMeter = document.getElementById('trustMeter');
                trustMeter.style.width = trustLevel + '%';
                
                const userMsg = document.createElement('div');
                userMsg.className = 'message sent';
                userMsg.innerHTML = `<strong>Vous:</strong> ${response.text}`;
                chat.appendChild(userMsg);
                
                currentMessage++;
                if (currentMessage < messages.length) {
                    setTimeout(() => {
                        const nextMsg = document.createElement('div');
                        nextMsg.className = 'message received';
                        nextMsg.innerHTML = `<strong>Thomas:</strong> ${messages[currentMessage].text}`;
                        chat.appendChild(nextMsg);
                        chat.scrollTop = chat.scrollHeight;
                        displayMessage(currentMessage);
                    }, 1000);
                } else {
                    displayMessage(currentMessage);
                }
            };
            optionsDiv.appendChild(btn);
        });
    }
    
    displayMessage(currentMessage);
}

function createDetecteurActivity() {
    return `
        <div class="detecteur-container">
            <h3>🚨 Identifier les Signaux d'Alerte</h3>
            <p>Visionnez ces extraits de visio et identifiez le niveau d'alerte.</p>
            
            <div class="video-cases">
                <div class="case-item">
                    <h4>Cas 1: Marie</h4>
                    <p>"Oui oui, ça va... Enfin bon, c'est différent d'ici mais bon..." (ton monocorde, regard fuyant)</p>
                    <div class="alert-levels">
                        <button class="btn-alert" onclick="checkAlert(1, 'RAS')">🟢 RAS</button>
                        <button class="btn-alert" onclick="checkAlert(1, 'Vigilance')">🟡 Vigilance</button>
                        <button class="btn-alert" onclick="checkAlert(1, 'Intervention')">🔴 Intervention</button>
                    </div>
                    <div id="feedback-1" class="feedback-alert"></div>
                </div>
                
                <div class="case-item">
                    <h4>Cas 2: Alex</h4>
                    <p>"Je dors mal, j'ai perdu l'appétit... Je sais pas si je vais tenir." (voix tremblante)</p>
                    <div class="alert-levels">
                        <button class="btn-alert" onclick="checkAlert(2, 'RAS')">🟢 RAS</button>
                        <button class="btn-alert" onclick="checkAlert(2, 'Vigilance')">🟡 Vigilance</button>
                        <button class="btn-alert" onclick="checkAlert(2, 'Intervention')">🔴 Intervention</button>
                    </div>
                    <div id="feedback-2" class="feedback-alert"></div>
                </div>
                
                <div class="case-item">
                    <h4>Cas 3: Karim</h4>
                    <p>"C'est génial ! J'ai rencontré plein de gens, je visite, je profite à fond !" (souriant)</p>
                    <div class="alert-levels">
                        <button class="btn-alert" onclick="checkAlert(3, 'RAS')">🟢 RAS</button>
                        <button class="btn-alert" onclick="checkAlert(3, 'Vigilance')">🟡 Vigilance</button>
                        <button class="btn-alert" onclick="checkAlert(3, 'Intervention')">🔴 Intervention</button>
                    </div>
                    <div id="feedback-3" class="feedback-alert"></div>
                </div>
            </div>
            
            <button class="btn-primary hidden" id="btnValidateDetecteur" onclick="completeSequence(3, 2, 160)">
                Valider et continuer
            </button>
        </div>
    `;
}

let detecteurScore = 0;
function checkAlert(caseNum, level) {
    const correctAnswers = {
        1: 'Vigilance',
        2: 'Intervention',
        3: 'RAS'
    };
    
    const feedback = document.getElementById(`feedback-${caseNum}`);
    const buttons = document.querySelectorAll(`.case-item:nth-child(${caseNum}) .btn-alert`);
    buttons.forEach(btn => btn.disabled = true);
    
    if (level === correctAnswers[caseNum]) {
        feedback.textContent = '✓ Correct ! Bonne analyse.';
        feedback.style.color = '#7ED321';
        detecteurScore++;
    } else {
        feedback.textContent = `✗ Réponse attendue: ${correctAnswers[caseNum]}`;
        feedback.style.color = '#E74C3C';
    }
    
    if (detecteurScore >= 2) {
        document.getElementById('btnValidateDetecteur').classList.remove('hidden');
    }
}

function completeSequence(module, seqNum, xp) {
    const seqKey = `${module}-${seqNum}`;
    MODULE3_DATA.sequences[seqKey].completed = true;
    MODULE3_DATA.completedSequences++;
    addXP(xp);
    saveModuleProgress();
    closeActivity();
    updateModuleProgress();
    
    if (MODULE3_DATA.completedSequences === MODULE3_DATA.totalSequences) {
        setTimeout(() => {
            completeModule(3, 300);
            showCompletionModal();
        }, 1000);
    } else {
        showNotification(`🎉 +${xp} XP ! Séquence 3.${seqNum} complétée !`);
    }
}

window.startSequence = startSequence;
window.completeSequence = completeSequence;
window.checkAlert = checkAlert;
