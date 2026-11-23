# Passation : site Audit Client Mystère Alfred Hotels

## 1. À quoi sert le site
- Créer les audits client mystère (format Business, Famille ou Couple, hôtel, réservation site ou Booking, dates, saison).
- Envoyer au client mystère un lien unique (1 lien = 1 personne) : il remplit le questionnaire sur téléphone, moment par moment, sans compte.
- Recevoir automatiquement les réponses : rapport, note, critiques, plan d'action sous 15 jours.
- Suivre les performances, la planification annuelle et le cardex des clients mystère.
- Exporter chaque rapport en Excel (formules qui se recalculent) et en PowerPoint (charte Alfred).

## 2. Les 3 briques techniques
- **Le site** : un seul fichier `index.html`, publié par GitHub Pages.
  - Dépôt : `alfredhotelspro/audit-client-mystere`, branche `main`.
  - Adresse : https://alfredhotelspro.github.io/audit-client-mystere/
  - Photos de couverture PowerPoint : fichiers `cover-xxx.jpg`, `mat.jpg`, `bed.jpg`, `desk.jpg`, `train.jpg`, `logo.png`, à la racine du dépôt ou dans le dossier `rapport/`.
- **La base de données** : un Google Sheet.
  - Onglet `data` : audits, réponses, plans, statuts des rapports, questions modifiées, réglages (saisons). Ne pas modifier à la main.
  - Onglet `cardex` : répertoire des clients mystère, modifiable à la main.
  - Onglet `comptes` : comptes de la plateforme.
- **Le script** : Extensions › Apps Script du Google Sheet (code dans `apps-script.gs`), publié en « Application Web ».
  - Il fait le lien entre le site et le Sheet.
  - Les photos des clients vont dans le dossier Drive « Alfred Audit Photos ».

## 3. Mettre le site à jour
1. GitHub › dépôt › **Add file › Upload files**.
2. Déposer le nouveau `index.html` (il remplace l'ancien).
3. Cliquer **Commit changes**, attendre 1 à 2 minutes, puis recharger le site.

L'adresse du script est déjà écrite dans `index.html` (ligne `const API_URL=`). Ne la changer que si un nouveau script est créé (nouvelle adresse « /exec »).

## 4. Mettre le script à jour
1. Ouvrir le Google Sheet › **Extensions › Apps Script**.
2. Tout sélectionner, coller le nouveau `apps-script.gs`, puis enregistrer.
3. Vérifier la ligne `CARDEX_KEY` : c'est le code d'accès au cardex.
4. **Déployer › Gérer les déploiements › crayon › Version : Nouvelle version › Déployer.**

Garder le même déploiement permet de garder la même adresse.

## 5. Comptes et accès
- **Connexion** : la plateforme demande e-mail et mot de passe. Les liens clients restent ouverts sans compte.
- **Création de compte** : les adresses `@alfredhotels.com` créent leur compte seules (« Créer un compte »). Le premier compte créé est Administrateur.
- **Autre adresse** : Paramètres › Comptes › **Ajouter un compte** (ou ajouter l'e-mail dans l'onglet `comptes`). La personne crée ensuite son mot de passe.
- **Mot de passe oublié** : vider la cellule « Hash » de la personne dans l'onglet `comptes`. Elle recrée son compte avec la même adresse.
- **Retirer un accès** : supprimer sa ligne dans l'onglet `comptes`.
- **Limite** : c'est une protection simple. Le mot de passe est chiffré et vérifié par le script, mais toute personne qui connaît l'adresse du script peut lire les données d'audit. Ne jamais mettre de données sensibles dans les commentaires.
- **Cardex** : protégé par le code `CARDEX_KEY` du script, demandé une fois par appareil.

## 6. Modifier les questions
- **Accès** : Librairie › un format › **Modifier les questions**.
- **Ce qu'on peut changer** : texte, type, moment du parcours, section, rubrique, formats, mode de réservation, équipement saisonnier, photo, statut (validée, à valider, à retirer). Tout se fait sans code.
- **Types** :
  - Normale : 1 pt.
  - Essentielle : 3 pts.
  - Critique : 3 pts. Si elle est ratée : −3 sur la note globale et un plan d'action sous 15 jours.
  - Buffet : 26 pts répartis entre les produits.
  - Bonus : +1, seulement si le fait est décrit.
  - Ressenti /5 et Hors note : affichés à part, sans effet sur la note.
- **Ajouter / retirer** : « + Ajouter une question ». « Retirer la question » est réversible : la question reste dans « Questions retirées ».
- **Enregistrement** : les changements vont dans le Sheet (collection `questions`) et s'appliquent aux liens clients et aux rapports, qui sont recalculés.
- **Questionnaire de base** : c'est le tableau CM-V3 (nov. 2026), présent dans le code.
- **Anciens audits** : les réponses reçues avant la V3 gardent l'ancien questionnaire.

## 7. Questionnaires saisonniers (été / hiver)
- **Réglage** : Paramètres › **Hôtels et saisons**. Pour chaque hôtel : rooftop, restaurant, terrasse, avec « Aucun », « Toute l'année », « Été seulement » ou « Hiver seulement ».
- **Saisons** : été = mai à septembre, hiver = octobre à avril.
- **À la création d'un audit** : la saison est proposée selon les dates et peut être changée. Elle est enregistrée dans le lien du client.
- **Effet** : les questions rattachées à un équipement fermé ne sont pas posées.
  - Exemple : le rooftop Basta Pinsa de Monaco n'est testé qu'en été.
- **Aperçu** : Librairie › choisir un hôtel, puis Été ou Hiver, pour voir le questionnaire correspondant.
- **Rattacher une question à un équipement** : Modifier les questions › « Équipement saisonnier ».

## 8. Déroulé d'un audit
1. Planification › « + » (ou Librairie › Lancer un audit) : format, hôtel, réservation, dates, saison, client mystère.
2. Copier le lien ou l'e-mail de bienvenue et l'envoyer au client. Créer les audits depuis l'adresse GitHub Pages, sinon le lien ne s'ouvre pas sur téléphone.
3. Le client remplit le questionnaire. Le rapport arrive seul dans Rapports (actualisation toutes les 60 s).
4. Relecture avec l'auditeur, puis validation, puis diffusion à l'hôtel.
5. Exports Excel et PowerPoint depuis le rapport.
6. Pour un audit test : cocher « Audit test » (non compté). Un audit se supprime avec l'icône rouge.

## 9. En cas de problème
- **« La connexion n'a pas permis… »** : vérifier l'adresse du script dans `index.html` et que le script est déployé en accès « Tout le monde ».
- **« Le script Google n'est pas à jour »** à la connexion : recoller `apps-script.gs` puis faire Nouvelle version (étape 4).
- **Le lien client affiche « Merci ! » d'emblée** : ce lien a déjà été utilisé. Créer un nouvel audit.
- **Photos absentes du PowerPoint** : vérifier que les images sont bien dans le dépôt.

## 10. À transmettre avant le départ
- Propriété (ou accès éditeur) :
  - du Google Sheet et du script ;
  - du dossier Drive « Alfred Audit Photos » ;
  - du dépôt GitHub `alfredhotelspro`.
- Le code `CARDEX_KEY`.
- Un compte Administrateur pour la personne qui reprend.
- Le tableau source des questions (CM-V3) et ce document.
