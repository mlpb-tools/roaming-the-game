# 🌍 ROAMING APP - Application de Professionnalisation

## 📖 Description

ROAMING APP est une plateforme web interactive et gamifiée conçue pour professionnaliser les conseillers des Missions Locales sur l'accompagnement à la mobilité internationale des jeunes.

## ✨ Fonctionnalités

### 🎮 Gamification
- **Système de progression** : 5 niveaux de compétence (Explorateur → Maître ROAMING)
- **Points d'expérience (XP)** : Gagnez des XP à chaque activité complétée
- **Badges de compétences** : 5 badges légendaires à débloquer
- **Suivi de progression** : Visualisation en temps réel de votre avancement

### 📚 5 Modules Interactifs

#### 🔵 Module 1 - L'Île des Croyances
- **Séquence 1.1** : Quiz des Mythes (100 XP)
- **Séquence 1.2** : Le Mur des Freins - Glisser-déposer (150 XP)
- **Séquence 1.3** : Le Profiler - Diagnostic mobilité (200 XP)

#### 🟢 Module 2 - La Vallée de la Préparation
- **Séquence 2.1** : Encyclopédie des Dispositifs (120 XP)
- **Séquence 2.2** : Plan de Route - Timeline interactive (150 XP)
- **Séquence 2.3** : Boîte à Outils SOS - Escape Game (130 XP)
- **Séquence 2.4** : Atelier Famille (180 XP)

#### 💗 Module 3 - L'Archipel du Suivi
- **Séquence 3.1** : Messagerie Virtuelle - Simulation chat (140 XP)
- **Séquence 3.2** : Détecteur d'Alerte (160 XP)

#### 🟧 Module 4 - Le Port du Retour
- **Séquence 4.1** : L'Entretien Miroir (140 XP)
- **Séquence 4.2** : Le CV Augmenté (150 XP)
- **Séquence 4.3** : Le Storytelling (130 XP)

#### 🟪 Module 5 - La Citadelle des Réseaux
- **Séquence 5.1** : Le Jeu des Rôles - Écosystème (120 XP)
- **Séquence 5.2** : Réseau Cartographique (150 XP)
- **Séquence 5.3** : Lab' de Capitalisation - Fiche REX (130 XP)

## 🚀 Installation

### Option 1 : Utilisation directe
1. Téléchargez tous les fichiers de l'application
2. Ouvrez `index.html` dans votre navigateur web moderne (Chrome, Firefox, Edge, Safari)
3. C'est tout ! L'application fonctionne sans serveur

### Option 2 : Serveur local (recommandé pour le développement)
```bash
# Avec Python 3
cd roaming-app
python -m http.server 8000

# Accédez à http://localhost:8000
```

## 📁 Structure des Fichiers

```
roaming-app/
│
├── index.html              # Page d'accueil - Dashboard
├── module1.html            # Module 1 - L'Île des Croyances
├── module2.html            # Module 2 - La Vallée de la Préparation
├── module3.html            # Module 3 - L'Archipel du Suivi
├── module4.html            # Module 4 - Le Port du Retour
├── module5.html            # Module 5 - La Citadelle des Réseaux
│
├── styles/
│   ├── main.css           # Styles principaux
│   └── module.css         # Styles des pages modules
│
└── js/
    ├── main.js            # Logique principale & gamification
    ├── module1.js         # Activités du Module 1
    ├── module2.js         # Activités du Module 2
    ├── module3.js         # Activités du Module 3
    ├── module4.js         # Activités du Module 4
    └── module5.js         # Activités du Module 5
```

## 💾 Sauvegarde de Progression

L'application utilise **localStorage** pour sauvegarder automatiquement :
- Points XP gagnés
- Badges débloqués
- Modules et séquences complétés
- Niveau du conseiller

**Important** : Les données sont stockées localement dans votre navigateur. Ne videz pas le cache si vous souhaitez conserver votre progression.

## 🎯 Parcours Type

**Durée totale estimée** : 15-20 heures
- Module 1 : 3-4h
- Module 2 : 4-5h
- Module 3 : 2-3h
- Module 4 : 3h
- Module 5 : 3h

**Déblocage progressif** : Chaque module se débloque après complétion du précédent.

## 🏆 Système de Niveaux

| Niveau | Nom | XP Requis |
|--------|-----|-----------|
| 1 | Explorateur | 0-500 XP |
| 2 | Accompagnateur | 501-1500 XP |
| 3 | Expert Mobilité | 1501-3000 XP |
| 4 | Ambassadeur | 3001-5000 XP |
| 5 | Maître ROAMING | 5000+ XP |

## 🎨 Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Design moderne avec gradients et animations
- **JavaScript Vanilla** : Logique interactive sans frameworks
- **Font Awesome** : Icônes
- **LocalStorage API** : Persistance des données

## 🔧 Personnalisation

### Modifier les couleurs
Éditez les variables CSS dans `styles/main.css` :
```css
:root {
    --blue: #4A90E2;
    --green: #7ED321;
    --pink: #FF6B9D;
    --orange: #F5A623;
    --purple: #9013FE;
}
```

### Ajouter des activités
1. Créez une nouvelle fonction dans le fichier `js/moduleX.js` correspondant
2. Ajoutez le HTML de l'activité
3. Implémentez la logique d'interaction
4. Connectez la fonction au bouton de démarrage

## 🌐 Compatibilité Navigateurs

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Internet Explorer : Non supporté

## 📱 Responsive Design

L'application est entièrement responsive et fonctionne sur :
- 💻 Desktop (1920px - 1024px)
- 📱 Tablettes (1024px - 768px)
- 📱 Mobile (< 768px)

## 🐛 Résolution de Problèmes

### La progression ne se sauvegarde pas
- Vérifiez que les cookies/localStorage sont autorisés dans votre navigateur
- Ne naviguez pas en mode privé/incognito

### Les animations ne fonctionnent pas
- Vérifiez que JavaScript est activé
- Mettez à jour votre navigateur

### Les icônes ne s'affichent pas
- Vérifiez votre connexion internet (Font Awesome est chargé via CDN)
- Alternative : Téléchargez Font Awesome en local

## 📧 Support

Pour toute question ou suggestion d'amélioration :
- Créez une issue dans le dépôt Git
- Contactez l'équipe de développement

## 📜 Licence

© 2026 ROAMING APP - Mission Locale
Développé pour la professionnalisation des conseillers.

## 🚀 Roadmap Futures Fonctionnalités

- [ ] Mode multijoueur pour défis entre Missions Locales
- [ ] Certification téléchargeable en PDF
- [ ] Bibliothèque de ressources enrichie
- [ ] Vidéos de témoignages réels
- [ ] Forum communautaire intégré
- [ ] Export des fiches REX en PDF
- [ ] Tableau de bord administrateur
- [ ] Statistiques d'utilisation par Mission Locale

---

**Bonne formation et bienvenue dans l'aventure ROAMING ! 🌍✈️**
