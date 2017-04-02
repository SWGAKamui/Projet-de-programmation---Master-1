# Mardi 10 Janvier - 16h

## Bibliographies

Cours en ligne, articles en ligne.
Voir avec le chargé de TDs pour définir quelle est la bibliographie à avoir.

## Cahier des charges

Voir avec le chargé de TD.

## Demande du client

### Cœur du projet

Interface monopage.
Une vue par machine ou bien une vue d'exécution.
La vue d'exécution est préférable.

Pouvoir interagir avec le code, pouvoir gerer le cluster (je veux 5 machines avec 2 cœurs, aucun soucis de la mémoire).
Contrôle mapper/reducer.
Ajouter un compiler.

Animation de l'exécution.

Pouvoir charger un dataset en .csv, et pouvoir le transformer en objet javascript.
Pareil, pouvoir faire un output qui affiche ça dans la console ou un .csv.

Pouvoir injecter des jeux de données dans le partitionneurs (entre mapper/reducer)

### Plus complexe

Implémenter des paterns.
Faire un top K.
Chainer des jobs.

### Top du top

Génération du code Java qui correspond.

## Pistes

Webworker dans le naviguateur (pourvoir travailler en parallèle, il n'a pas accès à la mémoire du navigateur).
Tests unitaires, documentation.
Utiliser __Yuidoc__ pour la documentation. Commentaires formatés.
Utiliser __Moka__ pour les tests unitaires.
Bibliothèque __UniJS__ pour tout ce qui est assertions.
Implémenter des patterns pour tester l'application.

Voir les liens vers le cours de Master 2 pour le sujet.

Tester l'outils __Taled__, _ETL (extract transform load)_.
