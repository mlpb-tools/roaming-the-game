/* ===== ROAMING APP - CHARTE GRAPHIQUE MISSION LOCALE PAYS BASQUE ===== */

/* TYPOGRAPHIES :
 * Politica → Titres (remplacée par Muli Bold pour compatibilité web)
 * Muli → Texte courant, navigation
 * Akrobat → Boutons, indicateurs (remplacée par Muli Bold)
 * Arial → Fallback
 */

/* Reset & Base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    /* PALETTE OFFICIELLE MLPB - RESPECT STRICT DE LA CHARTE */
    --vert: #95c11f;
    --orange: #f39200;
    --bleu: #2897d5;
    --rose: #d60b52;
    --violet: #a3195b;
    --rouge-brique: #9f3d3f;
    --noir: #171718;
    --blanc: #FFFFFF;
    --gris-clair: #F5F5F5;
    --shadow: rgba(23, 23, 24, 0.08);
    --shadow-hover: rgba(23, 23, 24, 0.12);
    
    /* Dégradés autorisés uniquement entre couleurs officielles */
    --gradient-bleu-vert: linear-gradient(135deg, #2897d5 0%, #95c11f 100%);
    --gradient-orange-rose: linear-gradient(135deg, #f39200 0%, #d60b52 100%);
    --gradient-violet-rouge: linear-gradient(135deg, #a3195b 0%, #9f3d3f 100%);
    --gradient-bleu: linear-gradient(135deg, #2897d5 0%, #2897d5 100%);
}

body {
    font-family: 'Muli', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    background: var(--blanc);
    min-height: 100vh;
    color: var(--noir);
    line-height: 1.6;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

/* Header */
.main-header {
    background: var(--blanc);
    padding: 20px 30px;
    border-radius: 15px;
    box-shadow: 0 4px 15px var(--shadow);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logo i {
    font-size: 2.5rem;
    color: var(--bleu);
}

.logo h1 {
    font-size: 2rem;
    font-weight: 700;
    font-family: 'Politica', 'Muli', Arial, sans-serif;
    color: var(--bleu);
}

.user-profile {
    display: flex;
    align-items: center;
    gap: 15px;
}

.user-info {
    text-align: right;
}

.user-name {
    display: block;
    font-weight: 600;
    font-size: 1.1rem;
}

.user-level {
    font-size: 0.9rem;
    font-family: 'Akrobat', 'Muli', Arial, sans-serif;
    color: var(--bleu);
}

.user-avatar i {
    font-size: 3rem;
    color: var(--bleu);
}

/* Mission Control */
.mission-control {
    background: var(--blanc);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 15px var(--shadow);
    margin-bottom: 30px;
}

.mission-control h2 {
    font-size: 1.8rem;
    font-family: 'Politica', 'Muli', Arial, sans-serif;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.mission-control h2 i {
    color: var(--bleu);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 25px;
}

.stat-card {
    background: var(--gradient-bleu-vert);
    padding: 25px;
    border-radius: 12px;
    color: var(--blanc);
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 4px 10px var(--shadow);
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.stat-card i {
    font-size: 2.5rem;
    opacity: 0.9;
}

.stat-content h3 {
    font-size: 2rem;
    font-family: 'Akrobat', 'Muli', Arial, sans-serif;
    margin-bottom: 5px;
}

.stat-content p {
    font-size: 0.95rem;
    opacity: 0.9;
}

.progress-container {
    margin-top: 20px;
}

.progress-bar {
    background: var(--gris-clair);
    height: 25px;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(23, 23, 24, 0.05);
}

.progress-fill {
    background: var(--gradient-bleu-vert);
    height: 100%;
    width: 0%;
    transition: width 0.5s ease;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    color: var(--blanc);
    font-weight: 600;
    font-family: 'Akrobat', 'Muli', Arial, sans-serif;
}

/* Modules Map */
.modules-map {
    background: var(--blanc);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 15px var(--shadow);
    margin-bottom: 30px;
}

.modules-map h2 {
    font-size: 1.8rem;
    font-family: 'Politica', 'Muli', Arial, sans-serif;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.modules-map h2 i {
    color: var(--vert);
}

.modules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
}

.module-card {
    background: var(--blanc);
    border-radius: 15px;
    padding: 25px;
    position: relative;
    box-shadow: 0 4px 10px var(--shadow);
    transition: all 0.3s ease;
    border: 1px solid rgba(23, 23, 24, 0.05);
}

.module-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px var(--shadow-hover);
}

.module-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    color: var(--blanc);
    font-size: 2rem;
}

.module-icon.blue { background: var(--bleu); }
.module-icon.green { background: var(--vert); }
.module-icon.pink { background: var(--rose); }
.module-icon.orange { background: var(--orange); }
.module-icon.purple { background: var(--violet); }

.module-content h3 {
    font-size: 1rem;
    font-family: 'Muli', Arial, sans-serif;
    color: #666;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.module-content h4 {
    font-size: 1.5rem;
    font-family: 'Politica', 'Muli', Arial, sans-serif;
    margin-bottom: 10px;
    color: var(--noir);
}

.module-content p {
    color: #666;
    margin-bottom: 15px;
    font-size: 0.95rem;
}

.module-meta {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
    font-size: 0.9rem;
    color: #666;
}

.module-meta span {
    display: flex;
    align-items: center;
    gap: 5px;
}

.module-progress {
    margin: 15px 0;
}

.progress-mini {
    background: #D0D0D0;
    height: 8px;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 5px;
}

.progress-mini-fill {
    background: var(--bleu);
    height: 100%;
    width: 0%;
    transition: width 0.4s ease;
}

.progress-text {
    font-size: 0.85rem;
    color: #666;
}

.module-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--blanc);
}

.module-badge.locked {
    background: #bbb;
    color: #888;
}

.module-badge.unlocked {
    background: gold;
    color: var(--blanc);
    animation: badgePulse 2s infinite;
}

@keyframes badgePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

/* Buttons */
.btn-start {
    width: 100%;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    background: var(--gradient-bleu-vert);
    color: var(--blanc);
    font-size: 1rem;
    font-weight: 600;
    font-family: 'Akrobat', 'Muli', Arial, sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.btn-start:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px var(--shadow);
}

.btn-start.locked {
    background: #CCCCCC;
    cursor: not-allowed;
    color: #888;
}

.btn-start.locked:hover {
    transform: none;
    box-shadow: none;
}

/* Badges Section */
.badges-section {
    background: var(--blanc);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 15px var(--shadow);
    margin-bottom: 30px;
}

.badges-section h2 {
    font-size: 1.8rem;
    font-family: 'Politica', 'Muli', Arial, sans-serif;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.badges-section h2 i {
    color: var(--orange);
}

.badges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
}

.badge-item {
    text-align: center;
    padding: 20px;
    background: var(--blanc);
    border-radius: 12px;
    transition: transform 0.3s ease;
    border: 1px solid rgba(23, 23, 24, 0.05);
}

.badge-item:hover {
    transform: scale(1.05);
}

.badge-icon {
    font-size: 3rem;
    margin-bottom: 10px;
}

.badge-item.locked .badge-icon {
    color: #ccc;
}

.badge-item.unlocked .badge-icon {
    color: var(--orange);
}

.badge-name {
    font-weight: 600;
    font-size: 0.9rem;
    font-family: 'Muli', Arial, sans-serif;
}

/* Footer */
.main-footer {
    background: var(--noir);
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px var(--shadow);
    text-align: center;
    color: var(--blanc);
}

.main-footer p {
    color: var(--blanc);
}

.footer-links {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    gap: 30px;
}

.footer-links a {
    color: var(--blanc);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: color 0.3s ease;
    font-family: 'Muli', Arial, sans-serif;
}

.footer-links a:hover {
    color: var(--orange);
}

/* Responsive */
@media (max-width: 768px) {
    .main-header {
        flex-direction: column;
        gap: 20px;
    }
    
    .modules-grid {
        grid-template-columns: 1fr;
    }
    
    .stats-grid {
        grid-template-columns: 1fr;
    }
}

/* Utilities */
.hidden {
    display: none !important;
}
