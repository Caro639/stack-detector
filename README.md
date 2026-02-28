# Tech Stack Detector

Les indicateurs clés : Quels sont les 3 ou 4 points data qui comptent pour un recruteur ? Langages dominants, régularité des commits sur 12 mois, implication dans l'open-source, frameworks utilisés, date de la dernière contribution, date de la première contribution qui donne une idée de l'expérience.

## Introduction

Tech Stack Detector est un projet open-source conçu pour analyser les profils GitHub des développeurs et extraire des informations clés sur leurs compétences techniques. En utilisant l'API de GitHub, ce projet permet de collecter des données sur les langages de programmation utilisés, les frameworks, les bibliothèques, ainsi que d'autres indicateurs pertinents pour les recruteurs.

## Fonctionnalités

- Analyse des langages de programmation dominants
- Suivi de la régularité des commits sur une période de 12 mois
- Identification de l'implication dans l'open-source
- Extraction des frameworks et bibliothèques utilisés
- Affichage de la date de la dernière contribution
- Affichage de la date de la première contribution
- Génération de rapports détaillés pour les recruteurs
- Interface utilisateur conviviale pour visualiser les données

## Stack Technique

- **Langage** : TypeScript (~5.9.3)
- **Build tool** : Vite (^7.3.1)
- **Plugin** : @crxjs/vite-plugin (^2.0.0) — compilation d'extensions Chrome avec Vite
- **Visualisation** : Chart.js (^4.5.1)
- **API** : GitHub REST API (`https://api.github.com`)
- **Plateforme** : Extension Chrome — Manifest V3
- **Architecture** : Side Panel + Background Service Worker
- **Types** : @types/chrome (^0.1.37)

## Projet en cours de développement

analyser un profil sur LinkedIn (pas d'API officielle) et extraire les mêmes données que sur GitHub. Cela permettra d'avoir une vue d'ensemble plus complète des compétences techniques d'un candidat, en combinant les données de GitHub et LinkedIn.
