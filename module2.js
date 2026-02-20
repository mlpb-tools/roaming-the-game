// ===== MODULE 1 - L'ÎLE DES CROYANCES =====

const MODULE1_DATA = {
    moduleId: 1,
    totalSequences: 3,
    completedSequences: 0,
    sequences: {
        '1-1': { completed: false, xp: 100 },
        '1-2': { completed: false, xp: 150 },
        '1-3': { completed: false, xp: 200 }
    }
};

// Initialize Module 1
document.addEventListener('DOMContentLoaded', function() {
    loadModuleProgress();
    updateModuleProgress();
});

function loadModuleProgress() {
    const saved = localStorage.getItem('module1Progress');
    if (saved) {
        Object.assign(MODULE1_DATA, JSON.parse(saved));
    }
}

function saveModuleProgress() {
    localStorage.setItem('module1Progress', JSON.stringify(MODULE1_DATA));
}

function updateModuleProgress() {
    const progressBar = document.getElementById('moduleProgressBar');
    const progressText = document.getElementById('moduleProgressText');
    
    const percent = (MODULE1_DATA.completedSequences / MODULE1_DATA.totalSequences) * 100;
    progressBar.style.width = percent + '%';
    progressText.textContent = `${MODULE1_DATA.completedSequences}/${MODULE1_DATA.totalSequences} séquences`;
    
    // Update sequence cards
    Object.keys(MODULE1_DATA.sequences).forEach(seqKey => {
        const seqData = MODULE1_DATA.sequences[seqKey];
        const card = document.getElementById(`seq-${seqKey}`);
        
        if (card) {
            if (seqData.completed) {
                card.classList.add('completed');
                card.classList.remove('locked');
                const btn = card.querySelector('.btn-start-sequence');
                btn.innerHTML = '<i class="fas fa-check"></i> Complété';
                btn.style.background = 'var(--gradient-green)';
            }
        }
    });
    
    // Unlock next sequence
    unlockNextSequence();
}

function unlockNextSequence() {
    if (MODULE1_DATA.completedSequences === 0) {
        // Sequence 1.1 is already unlocked
    } else if (MODULE1_DATA.completedSequences === 1) {
        const card = document.getElementById('seq-1-2');
        if (card) {
            card.classList.remove('locked');
            const btn = card.querySelector('.btn-start-sequence');
            btn.innerHTML = '<i class="fas fa-play"></i> Commencer';
            btn.onclick = () => startSequence(1, 2);
        }
    } else if (MODULE1_DATA.completedSequences === 2) {
        const card = document.getElementById('seq-1-3');
        if (card) {
            card.classList.remove('locked');
            const btn = card.querySelector('.btn-start-sequence');
            btn.innerHTML = '<i class="fas fa-play"></i> Commencer';
            btn.onclick = () => startSequence(1, 3);
        }
    }
}

// Start Sequence Function
function startSequence(moduleId, sequenceId) {
    const seqKey = `${moduleId}-${sequenceId}`;
    
    if (MODULE1_DATA.sequences[seqKey].completed) {
        showNotification('Cette séquence est déjà complétée !', 'info');
        return;
    }
    
    // Show activity panel
    const panel = document.getElementById('activityPanel');
    const title = document.getElementById('activityTitle');
    const content = document.getElementById('activityContent');
    
    panel.classList.remove('hidden');
    
    // Load sequence content
    switch (sequenceId) {
        case 1:
            title.textContent = 'Séquence 1.1 - Le Quiz des Mythes';
            content.innerHTML = createQuizActivity();
            break;
        case 2:
            title.textContent = 'Séquence 1.2 - Le Mur des Freins';
            content.innerHTML = createWallActivity();
            break;
        case 3:
            title.textContent = 'Séquence 1.3 - Le Profiler';
            content.innerHTML = createProfilerActivity();
            break;
    }
    
    // Initialize activity
    initializeActivity(sequenceId);
}

// Activity 1.1 - Quiz des Mythes
function createQuizActivity() {
    return `
        <div class="quiz-container">
            <h3>🎯 Quiz : Vrai ou Faux ?</h3>
            <p class="quiz-intro">Testez vos connaissances sur la mobilité internationale. Pour chaque affirmation, indiquez si elle est vraie ou fausse.</p>
            
            <div id="quizQuestions"></div>
            
            <div class="quiz-score hidden" id="quizScore">
                <h3>Résultats</h3>
                <p>Vous avez obtenu <span id="scoreValue">0</span>/10</p>
                <button class="btn-primary" onclick="completeSequence1_1()">Valider et continuer</button>
            </div>
        </div>
    `;
}

function initializeQuiz() {
    const questions = [
        { q: "La mobilité internationale est réservée aux jeunes qui parlent anglais couramment", answer: false },
        { q: "Partir à l'étranger coûte trop cher pour nos publics", answer: false },
        { q: "La mobilité développe l'autonomie et la confiance en soi", answer: true },
        { q: "Il faut avoir le bac pour partir en mobilité", answer: false },
        { q: "Les employeurs valorisent l'expérience de mobilité", answer: true },
        { q: "Seuls les jeunes motivés peuvent bénéficier de la mobilité", answer: false },
        { q: "La mobilité peut aider à trouver un emploi", answer: true },
        { q: "C'est trop compliqué d'organiser une mobilité", answer: false },
        { q: "La mobilité est un outil d'insertion professionnelle", answer: true },
        { q: "Les parents sont toujours contre la mobilité", answer: false }
    ];
    
    let score = 0;
    const container = document.getElementById('quizQuestions');
    
    questions.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${item.q}</p>
            <div class="quiz-options">
                <button class="btn-quiz" data-answer="true" data-index="${index}">
                    <i class="fas fa-check"></i> Vrai
                </button>
                <button class="btn-quiz" data-answer="false" data-index="${index}">
                    <i class="fas fa-times"></i> Faux
                </button>
            </div>
            <div class="quiz-feedback hidden" id="feedback-${index}"></div>
        `;
        container.appendChild(questionDiv);
    });
    
    // Add click handlers
    document.querySelectorAll('.btn-quiz').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const userAnswer = this.dataset.answer === 'true';
            const correctAnswer = questions[index].answer;
            const feedback = document.getElementById(`feedback-${index}`);
            
            // Disable buttons
            const buttons = this.parentElement.querySelectorAll('.btn-quiz');
            buttons.forEach(b => b.disabled = true);
            
            if (userAnswer === correctAnswer) {
                this.style.background = '#7ED321';
                this.style.color = 'white';
                feedback.textContent = '✓ Correct !';
                feedback.style.color = '#7ED321';
                score++;
            } else {
                this.style.background = '#E74C3C';
                this.style.color = 'white';
                feedback.textContent = '✗ Incorrect. La bonne réponse est : ' + (correctAnswer ? 'Vrai' : 'Faux');
                feedback.style.color = '#E74C3C';
            }
            
            feedback.classList.remove('hidden');
            
            // Check if all answered
            if (document.querySelectorAll('.btn-quiz:disabled').length === questions.length * 2) {
                document.getElementById('scoreValue').textContent = score;
                document.getElementById('quizScore').classList.remove('hidden');
            }
        });
    });
}

function completeSequence1_1() {
    MODULE1_DATA.sequences['1-1'].completed = true;
    MODULE1_DATA.completedSequences++;
    addXP(100);
    saveModuleProgress();
    closeActivity();
    updateModuleProgress();
    showNotification('🎉 +100 XP ! Séquence 1.1 complétée !');
}

// Activity 1.2 - Le Mur des Freins
function createWallActivity() {
    return `
        <div class="wall-container">
            <h3>🔨 Déconstruire les Freins</h3>
            <p>Associez chaque frein à son contre-argument approprié en les glissant-déposant.</p>
            
            <div class="wall-freins" id="wallFreins">
                <h4>Freins courants</h4>
                <div class="frein-item" draggable="true" data-id="1">Pas de passeport</div>
                <div class="frein-item" draggable="true" data-id="2">Peur de l'avion</div>
                <div class="frein-item" draggable="true" data-id="3">Famille qui s'oppose</div>
                <div class="frein-item" draggable="true" data-id="4">Pas d'argent</div>
                <div class="frein-item" draggable="true" data-id="5">Pas le niveau en langues</div>
            </div>
            
            <div class="wall-solutions">
                <h4>Contre-arguments</h4>
                <div class="solution-slot" data-correct="1" data-filled="false">
                    <p class="solution-text">On peut vous aider à faire la demande rapidement</p>
                </div>
                <div class="solution-slot" data-correct="2" data-filled="false">
                    <p class="solution-text">Il existe des alternatives (train, bus)</p>
                </div>
                <div class="solution-slot" data-correct="3" data-filled="false">
                    <p class="solution-text">On peut organiser une réunion d'information</p>
                </div>
                <div class="solution-slot" data-correct="4" data-filled="false">
                    <p class="solution-text">Des financements existent (bourses, aides)</p>
                </div>
                <div class="solution-slot" data-correct="5" data-filled="false">
                    <p class="solution-text">La mobilité aide justement à progresser</p>
                </div>
            </div>
            
            <button class="btn-primary hidden" id="btnValidateWall" onclick="completeSequence1_2()">
                Valider et continuer
            </button>
        </div>
    `;
}

function initializeWall() {
    const freins = document.querySelectorAll('.frein-item');
    const slots = document.querySelectorAll('.solution-slot');
    
    freins.forEach(frein => {
        frein.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.dataset.id);
            this.style.opacity = '0.5';
        });
        
        frein.addEventListener('dragend', function() {
            this.style.opacity = '1';
        });
    });
    
    slots.forEach(slot => {
        slot.addEventListener('dragover', function(e) {
            e.preventDefault();
            if (this.dataset.filled === 'false') {
                this.style.background = '#E8F5E9';
            }
        });
        
        slot.addEventListener('dragleave', function() {
            this.style.background = '';
        });
        
        slot.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.background = '';
            
            if (this.dataset.filled === 'true') return;
            
            const freinId = e.dataTransfer.getData('text/plain');
            const correctId = this.dataset.correct;
            
            if (freinId === correctId) {
                this.style.border = '3px solid #7ED321';
                this.dataset.filled = 'true';
                const frein = document.querySelector(`.frein-item[data-id="${freinId}"]`);
                frein.remove();
                
                // Check if all completed
                const allFilled = Array.from(slots).every(s => s.dataset.filled === 'true');
                if (allFilled) {
                    document.getElementById('btnValidateWall').classList.remove('hidden');
                    showNotification('🎉 Excellent ! Tous les freins ont été déconstruits !');
                }
            } else {
                this.style.border = '3px solid #E74C3C';
                setTimeout(() => {
                    this.style.border = '';
                }, 1000);
            }
        });
    });
}

function completeSequence1_2() {
    MODULE1_DATA.sequences['1-2'].completed = true;
    MODULE1_DATA.completedSequences++;
    addXP(150);
    saveModuleProgress();
    closeActivity();
    updateModuleProgress();
    showNotification('🎉 +150 XP ! Séquence 1.2 complétée !');
}

// Activity 1.3 - Le Profiler
function createProfilerActivity() {
    return `
        <div class="profiler-container">
            <h3>👤 Diagnostic du Profil Mobilité</h3>
            <p>Visionnez l'entretien avec Amina et complétez la grille ROAMING.</p>
            
            <div class="video-simulation">
                <div class="video-placeholder">
                    <i class="fas fa-video"></i>
                    <p><strong>Simulation vidéo:</strong> Entretien avec Amina, 22 ans</p>
                    <p style="font-size: 0.9rem; color: #666;">
                        "J'aimerais bien partir à l'étranger pour progresser en anglais, 
                        mais j'ai jamais voyagé toute seule... Et mes parents sont un peu inquiets.
                        Par contre, j'adore découvrir de nouvelles cultures !"
                    </p>
                </div>
            </div>
            
            <div class="grille-roaming">
                <h4>Grille d'analyse ROAMING</h4>
                
                <div class="grille-section">
                    <label><strong>Motivations principales :</strong></label>
                    <textarea id="motivations" rows="3" placeholder="Identifiez les motivations d'Amina..."></textarea>
                </div>
                
                <div class="grille-section">
                    <label><strong>Freins identifiés :</strong></label>
                    <textarea id="freins" rows="3" placeholder="Quels sont ses freins ?"></textarea>
                </div>
                
                <div class="grille-section">
                    <label><strong>Leviers à activer :</strong></label>
                    <textarea id="leviers" rows="3" placeholder="Comment l'accompagner ?"></textarea>
                </div>
                
                <div class="grille-section">
                    <label><strong>Type de mobilité recommandé :</strong></label>
                    <select id="typeMobilite">
                        <option value="">-- Choisissez --</option>
                        <option value="court">Court terme (1-4 semaines)</option>
                        <option value="moyen">Moyen terme (1-3 mois)</option>
                        <option value="long">Long terme (+3 mois)</option>
                    </select>
                </div>
            </div>
            
            <button class="btn-primary" onclick="validateProfiler()">
                Valider mon diagnostic
            </button>
        </div>
    `;
}

function validateProfiler() {
    const motivations = document.getElementById('motivations').value;
    const freins = document.getElementById('freins').value;
    const leviers = document.getElementById('leviers').value;
    const type = document.getElementById('typeMobilite').value;
    
    if (!motivations || !freins || !leviers || !type) {
        showNotification('Veuillez remplir tous les champs', 'warning');
        return;
    }
    
    // Simple validation
    showNotification('✅ Diagnostic validé ! Analyse pertinente.');
    
    setTimeout(() => {
        completeSequence1_3();
    }, 1500);
}

function completeSequence1_3() {
    MODULE1_DATA.sequences['1-3'].completed = true;
    MODULE1_DATA.completedSequences++;
    addXP(200);
    saveModuleProgress();
    closeActivity();
    updateModuleProgress();
    
    // Check if module is complete
    if (MODULE1_DATA.completedSequences === MODULE1_DATA.totalSequences) {
        setTimeout(() => {
            completeModule(1, 450);
            showCompletionModal();
        }, 1000);
    } else {
        showNotification('🎉 +200 XP ! Séquence 1.3 complétée !');
    }
}

// Initialize activities based on sequence
function initializeActivity(sequenceId) {
    switch (sequenceId) {
        case 1:
            initializeQuiz();
            break;
        case 2:
            initializeWall();
            break;
        case 3:
            // Profiler is initialized with button
            break;
    }
}

// Make functions globally available
window.startSequence = startSequence;
window.completeSequence1_1 = completeSequence1_1;
window.completeSequence1_2 = completeSequence1_2;
window.completeSequence1_3 = completeSequence1_3;
window.validateProfiler = validateProfiler;
