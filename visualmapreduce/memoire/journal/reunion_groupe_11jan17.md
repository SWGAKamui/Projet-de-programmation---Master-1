# Réunion de groupe du Mercredi 11 Janvier 2017 à 16h20
(mis à jour le Jeudi 12 Janvier)

## But du présent document

Après discussion avec le client, nous avons pris connaissance des besoins, des priorités et des attentes. Ce document nous permet d'avoir une première réflexion sur le projet, le fonctionnement global du logiciel, la priorité des étapes, et leurs faisabilité dans le temps imparti. Ce cahier des besoins nous permet de rédiger et d'organiser les demandes de notre client, et peux être repris par une autre équipe afin d'en continuer le développement.

## But du projet

Le but de notre projet est de réaliser un interpréteur MapReduce afin de pouvoir en visualiser le fonctionnement avant une application en situation réelle.

## Description de MapReduce

MapReduce est un pradigme de programmation servant à traiter et à générer de grands jeux de données avec un algorithme distribué et parallelisé sur un cluster. MapReduce décrit deux tâches séparées ; la tâche map() qui converti un jeu de donnée A en un jeu de donnée B, où les éléments individuels sont découpés en tuples (paire clé/valeur), et la tâche reduce() prends en entrée le résultat produit par map() pour combiner les tuples de données produites en un plus petit jeu de tuples.
Comme le nom MapReduce l'indique, la tâche reduce() s'effectue toujours après la tâche map().

## Public visé

__Pour qui ?__
Pour l'enseignant et ses étudiants d'IUT

__Dans quel but ?__
Déboguer du code MapReduce.
S'assurrer du bon fonctionnement du code en situation réelle.
Apprentissage du processus MapReduce

__Entrée/Sortie__
- Fichier .csv (jeu de données)
- Code (Fonctions Map() et Reduce() pour traiter les données)

## Cahier des besoins

### Besoins fonctionnels

- Interpréter le code MapReduce:
C'est le service principal offert par notre application. Dans cette phase, nous prenons en entrée du code MapReduce avec lequel nous combinons les jeux de données que fournira l'utilisateur. Ces jeux de données peuvent être sous forme de fichiers {CSV}. Au cours de l'interprétation, nous effectuons une lecture ligne par ligne du code donné.
Pour résumer, cette phase se décompose en ces étapes:
	- « Contrôle Mappeur/Réduceur » Pouvoir définir le nombre de machines et de cœurs par machines
	- Exécution du code ligne par ligne
	- Afficher un résultat dans la console
- Gérer le mapper/reducer: injection entre Mappeur/Réduceur
- Exporter en CSV
Avec les résultats obtenus par l'interpréteur, il est possible d'exporter les jeux de données sous format CSV.
- Exporter le code en Java
Il est également possible d'exporter les fonctions générées en langage Java. 

### Besoins non-fonctionnels

- Affichage graphique:
Offrir une interface ludique et facile à utiliser. Nécessité d'utiliser la bibliothèque graphique Fatum fournie par le client.
- Accessibilité: 
Hébergement sur les serveurs du CREMI. L'application est totalement accessible en ligne.
- Modularité, maintenabilité:
Ce projet étant potentiellement modifiable dans le futur pour un autre projet par des étudiants ou des enseignants, il doit être le plus modulaire possible. Ceci facilitera ses mises à jour et ses améliorations.
- Domaine d'action:
Les utilisateurs potentiels sont des enseignants et leurs étudiants dans un but éducatif ou dans des domaines de recherche.

## Questions

### __Qu'est ce que l'injection entre le mappeur et le réduceur ?__

C'est quoi l'injection au juste ?
Faut il pouvoir modifier les données entre les deux étapes map() et reduce() ?

### __En quel language écrire le code MapReduce ?__

Javascript ? Pseudo-code ?
