# Passation : site Audit Client Mystère Alfred Hotels (version 4 · novembre 2026)

## 1. À quoi sert le site
- Créer les audits client mystère (format Famille, Solo ou Duo ; hôtel ; canal de réservation Site web, Téléphone ou E-mail ; dates).
- Envoyer au client mystère un lien unique (1 lien = 1 personne). Il remplit le questionnaire sur téléphone, moment par moment, sans compte.
- Recevoir les réponses automatiquement : rapport, note sur 100, points critiques, plan d'action sous 15 jours.
- Échanger entre collègues (messages, fichiers), envoyer un rapport à des utilisateurs qui l'annotent ou le valident.
- Suivre les performances, comparer les hôtels, planifier l'année, tenir le cardex des clients mystère.
- Exporter chaque rapport en Excel (même modèle et mêmes formules que le fichier V2.2) et en PowerPoint (charte Alfred).

## 2. Le questionnaire V2.2
- **Source** : fichier « ALFRED_Audit_Client_Mystere_VF_Coef_Automatiques.xlsx ».
  - 270 critères, 13 étapes du parcours.
  - Ressentis et avis hors note.
- **Réponses** : Oui / Non / N/A / Non observé.
  - N/A et Non observé sortent du calcul.
  - Un motif est obligatoire pour Non, N/A et Non observé sur un critère de la note hôtel, et pour un bonus Oui.
  - Le client ne peut pas envoyer son questionnaire tant qu'il manque une réponse ou un motif. Le site l'emmène directement à la première question à compléter.
- **Canal** : les questions Téléphone, E-mail ou Site web n'apparaissent que pour le canal de l'audit.
  - Le parcours site web (DIG) est hors note de l'hôtel : il est transmis au siège.
- **Équipements** : les questions patio, parking, restaurant / bar, rooftop et balcon / terrasse n'apparaissent que si l'hôtel a l'équipement, ouvert à la date de l'audit.
  - Même chose pour les ressentis associés, et pour la question sur la consommation (restaurant et rooftop).
  - Une photo est obligatoire pour le rooftop et le restaurant.
- **Hors note de l'hôtel** : conciergerie avant séjour (AVA), après séjour (APS), avis client (AVI), ressentis.
- **Formats** : les trois formats (Famille, Solo, Duo) ont le même questionnaire.
- **Anciens rapports** : ceux reçus avant cette version gardent leur ancien questionnaire et leur ancienne note.

## 3. La note (Paramètres › Notation)
- **Coefficients** : P0 = 10, P1 = 5, P2 = 3, P3 = 1. Les 43 références du buffet ont le coefficient 1.
- **Conformité d'un bloc** = points acquis ÷ points observés.
- **Poids des blocs** :
  - Service 25 % ;
  - Propreté 20 % ;
  - Conformité 5 % ;
  - Produit / Standards Alfred 44 % ;
  - Références alimentaires 6 %.
- **Note avant malus** : elle n'est calculée que si les 5 blocs ont au moins une observation. Sinon : « Incomplet » (pas de redistribution des poids).
- **Malus** :
  - −3 pts par point critique (P0) non conforme.
  - Buffet : −3 pts dès 6 références manquantes, −6 pts dès 10.
- **Bonus** : +1 pt par attention décrite, 3 pts maximum. Les bonus sont annulés par un P0 non conforme.
- **Note finale** : bornée entre 0 et 100.
- **Statut de la note** :
  - « Provisoire » s'il reste des critères à observer ou des motifs manquants ;
  - « Incomplet » si un bloc n'a aucune observation ;
  - « Complet » sinon.
- **Modifier le barème** : tout est modifiable par un administrateur dans Paramètres › Notation. « Revenir au barème du fichier » rétablit les valeurs d'origine.

## 4. Hôtels et équipements (Paramètres › Hôtels et équipements)
- **Matrice du fichier** : cocher ou décocher un équipement par hôtel.
- **Nom et période d'ouverture** : facultatifs, pour chaque équipement.

| Hôtel | Équipements |
|---|---|
| Compiègne | Parking |
| Biarritz Port-Vieux | Patio, Balcon |
| Biarritz Les Halles | Patio, Restaurant La Gambette (avril à octobre), Balcon |
| Beaune | Patio, Parking, Balcon |
| Monaco | Restaurant / Bar, Rooftop Basta Pinsa (été) |
| Toulouse Centre Wilson | Patio, Parking, Balcon |
| Toulouse Victor Hugo | Restaurant La Gambette (mai à septembre) |
| Montreuil | Patio, Restaurant Corner, Rooftop Corner (été) |
| Paris Gare du Nord | Balcon |
| Lecourbe | Patio |

## 5. Les fichiers du site (GitHub Pages)
- **Dépôt** : `alfredhotelspro/audit-client-mystere`, branche `main`. Adresse : https://alfredhotelspro.github.io/audit-client-mystere/
- **Fichiers à la racine du dépôt** :
  - `index.html` : le site ;
  - `lib-excel.js` et `lib-ppt.js` : chargés seulement au moment d'un export, la page s'ouvre plus vite ;
  - `rapport-photos.json` : photos des PowerPoint.
- **À supprimer du dépôt s'ils y sont encore** : ancien `index (2).html`, anciennes photos de couverture en .jpg, dossier `libs/`.
- **Mise à jour** :
  1. Add file › Upload files.
  2. Déposer les fichiers.
  3. Commit changes.
  4. Attendre 1 à 2 minutes.

## 6. La base de données et le script
- **Google Sheet** :
  - `data` : audits, réponses, plans, rapports, questions, réglages. Les grosses réponses sont découpées automatiquement sur plusieurs cellules.
  - `comptes` : e-mail, nom, rôle, poste, photo, hôtel.
  - `cardex_app` : répertoire des clients mystère.
  - `fils` et `messages` : la partie Échanges.
- **À supprimer** : l'ancien onglet cardex importé, s'il existe encore.
- **Script** : Extensions › Apps Script (fichier `apps-script.gs`, version `v40-echanges`).
  - Mise à jour : coller le code, enregistrer, puis Déployer › Gérer les déploiements › crayon › Version : Nouvelle version › Déployer.
  - Vérification : ouvrir l'adresse /exec?ping=1. La réponse doit indiquer `v40-echanges`.
- **Tâches automatiques** : dans l'éditeur Apps Script, choisir la fonction `installTriggers` puis Exécuter, une seule fois, et accepter les autorisations (e-mails, Drive). Chaque matin vers 8 h, le script :
  - envoie un rappel au client mystère 2 jours après son départ si le questionnaire n'est pas envoyé ;
  - envoie un e-mail aux administrateurs pour les questionnaires reçus (avec le nombre de points critiques) et les plans d'action à 3 jours de l'échéance ;
  - le lundi, sauvegarde le Google Sheet dans Drive (« Alfred Audit Sauvegardes », 8 dernières copies gardées).

## 7. Comptes et sécurité
- **Lecture et écriture** : réservées aux comptes connectés. Un lien client ne peut écrire que ses propres réponses, et une seule fois.
- **Création de compte** :
  - Les adresses `@alfredhotels.com` créent leur compte seules ; le poste est obligatoire.
  - Les autres adresses sont ajoutées par un administrateur (Paramètres › Comptes).
  - Le premier compte créé est Administrateur.
- **Rôles** :
  - Administrateur : tout ;
  - Utilisateur : audits, rapports, plans ;
  - Lecteur : consultation ;
  - Directeur d'hôtel : son hôtel uniquement, en lecture, sans cardex ni planification.
  - Pour changer un rôle : Échanges › Utilisateurs › Rôle.
- **Mot de passe oublié** : « Mot de passe oublié » sur la page de connexion. Un code à 6 chiffres arrive par e-mail ; il est valable 30 minutes.
- **Session** : elle se ferme d'elle-même après 30 jours.
- **Profil** (Paramètres › Mon profil) : photo, nom, poste.

## 8. Échanges
- **Discussions** : messages entre utilisateurs, fichiers joints (📎, 15 Mo maximum, rangés dans Drive « Alfred Audit Échanges »).
- **Utilisateurs** : annuaire de tous les comptes, avec photo, poste, hôtel et dernière connexion. « 💬 Écrire » ouvre une discussion.
- **Rapport partagé** :
  1. Dans un rapport, choisir « 📤 Envoyer aux utilisateurs », puis cocher les destinataires (ils reçoivent aussi un e-mail).
  2. Chaque destinataire peut :
     - annoter une question (« 💬 Annoter » dans le détail des réponses) ;
     - ajouter une remarque générale ;
     - valider le rapport.
  3. Le rapport affiche le statut de chaque personne : non lu, lu, commentaires, validé.
- **Mode commentaire** : un destinataire qui ouvre le rapport voit « 💬 Commenter » sous chaque réponse.
  - Chaque personne a sa couleur.
  - « Valider le rapport » est une case à cocher, que l'on peut décocher.
- **Groupes** : « Nouvelle discussion » avec une personne = discussion privée ; avec plusieurs = groupe (nom obligatoire). « ＋👤 » ajoute des personnes à une discussion.
- **Tableau de bord** : un encadré « À faire » liste les rapports à relire, les rapports à valider, les plans proches de l'échéance, les questionnaires en retard et les messages non lus.

## 8 bis. Audits déjà réalisés (saisie manuelle)
- **Où** : Planification › Programme et calendrier.
  - Bouton « ✓ Audit déjà réalisé », ou « + » dans une case, puis « Saisir un audit déjà réalisé ».
- **Obligatoire** : hôtel, date, note sur 100.
- **Facultatif** : format, client mystère, % par bloc, points critiques ratés, commentaire, fichiers joints (rapport, Excel, PowerPoint).
- **Effet** : l'audit compte dans le programme, le suivi par hôtel, le tableau de bord et les performances.
- **Modifier ou supprimer** : ouvrir l'audit depuis sa case du programme ou depuis Rapports.

## 9. Déroulé d'un audit
1. « + Nouvel audit » : il est prérempli avec le premier mois sans audit dans le programme. Choisir le format, l'hôtel, le canal, les dates et le client mystère.
2. Envoyer le lien ou l'e-mail de bienvenue au client. Créer les audits depuis l'adresse GitHub Pages.
3. Le client remplit son questionnaire.
   - Hors connexion, un bandeau le prévient.
   - L'envoi repart seul au retour du réseau.
4. Le rapport arrive seul dans Rapports. Un plan d'action est créé automatiquement pour les P0 non conformes.
5. Relecture avec l'auditeur, envoi éventuel aux utilisateurs, puis diffusion à l'hôtel.
6. Exports Excel et PowerPoint depuis le rapport.

## 10. Modifier les questions
- **Accès** : Librairie › Modifier les questions.
- **Ce qu'on peut changer** : texte, étape, moment, bloc de notation, priorité (le coefficient suit), périmètre, canal, équipement, applicabilité, justificatif.
- **Historique** : le bouton « 🕘 Historique des modifications » montre qui a changé quoi et quand.
- **Retirer une question** : c'est réversible.
