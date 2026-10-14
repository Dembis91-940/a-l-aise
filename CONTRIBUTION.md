# À l’aise — contribution Codex

## Direction produit

Un atelier de conversation : s’entraîner, trouver ses mots, puis prendre du recul. L’objectif est de développer l’aisance et la réciprocité, sans promettre une réaction ou un résultat amoureux.

L’audit de la version initiale a relevé : un accueil très textuel ; sept QCM dont les distracteurs étaient souvent évidents ; aucune recherche dans les 31 techniques ; un testeur de phrases donnant une note sans fondement ; un scénario sur l’alcool contradictoire avec sa leçon ; un comparatif généralisant des affirmations invérifiées sur les concurrents.

## Réalisé

- Accueil responsive crème, terre cuite et sauge ; accès par besoin ; reprise du premier module non terminé.
- Quatre conversations fictives à embranchements (44 chemins complets). Retour pour chaque choix, plusieurs réponses plausibles, progression locale indépendante du parcours.
- Atelier messages : quatre intentions, exemples modifiables, copie et règles locales de relecture. Aucun service d’IA et aucun envoi de messages.
- Sept défis avec validation réversible et sauvegarde locale.
- Recherche sans distinction d’accents dans les techniques, avec compteur et état sans résultat.
- Ancien journal et progression conservés via la clé `alaise-v1`. Nouvelles données dans `alaise-studio-v1`.
- Correction du scénario de consentement et suppression d’une statistique inventée sur les refus.
- Page de présentation : remplacement du comparatif concurrentiel par les fonctions réelles ; suppression du score pseudo-prédictif du testeur.

## Validation

`node tests/studio.test.cjs`

Tests : migration de progression, doublons/identifiants invalides, stockage JSON invalide ou indisponible, intégrité et terminaison des 44 chemins, correction du scénario de consentement.

Vérifications navigateur : conversation jusqu’à son bilan et persistance après rechargement ; exemple de message, relecture et copie ; recherche avec/sans résultat ; défi et persistance ; accueil mobile sans débordement horizontal.

## Intégration pour Hermes

Projet statique, sans dépendance ni compilation. Servir la racine du dépôt, par exemple `python3 -m http.server 8765`, puis ouvrir `/app/`. Conserver `app/studio.js` et `app/studio.css` à côté de `app/index.html`. Les fichiers externes sont chargés avant l’initialisation de l’accueil. Les sept modules et les techniques existantes sont conservés.

Avant fusion, vérifier les changements concurrents de Hermes. Une fusion de la branche sur la branche de publication pourra déclencher GitHub Pages selon la configuration du dépôt.

## Limites et suite éditoriale

Ce sont des exercices rédigés, pas un coach IA conversationnel. Les exemples ne sont pas des garanties de séduction. Les données restent dans le navigateur : effacer les données du site les supprime, et elles ne se synchronisent pas entre appareils. Le brouillon de message est volontairement temporaire.

Les textes historiques des 31 techniques n’ont pas tous été réécrits. Une prochaine passe éditoriale devrait nuancer les formulations absolues telles que « pourquoi ça marche », les délais rigides et les interprétations certaines du langage corporel. Faire essayer les exercices à quelques utilisateurs permettrait de repérer les scénarios trop évidents ou les explications peu claires. Les captures historiques de la page de présentation montrent encore l’ancienne interface ; les actualiser lors de la prochaine publication visuelle.
