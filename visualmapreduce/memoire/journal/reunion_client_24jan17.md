# Réunion avec le client du Mardi 24 Janvier

## Diagrammes

Classes

Flux de données

## Exemple
* Input
* Shuffle
* Output

Exemple du word count
```
Il fait beau
Il fait chaud
C'est chaud
Il est beau
...
```

On dispose de _3_ machines. Les données sont sous forme de fichier (en réalité, le système de fichiers est HDFS). Il faut avoir un découpage cohérent avec le nombre de machines.

Chaque mappeur va prendre un certain nombre de partitions.
InputFormat
InputSplit + RecordReader

Map
< Long, String >

Fichier.csv
Chaque ligne deviens un objet avec plusieurs champs

La fonction Map va être appellée une fois par la fonction RecordReader.
La clé est un String et la valeur peut-être un int ou un long.

InputFormat → Map → Shuffle → Reduce → OutputFormat

