//------------------------------------------------------------------
//  File: inputMapReduce.js
//  Role: 
//        contains example of map and reduce functions implementation
//		  purpose of testing       
//-------------------------------------------------------------------
/**
 ** Les fonctions doivent impérativement s'appeler "map" et "reduce" sans majuscule
 ** La fonction map prend en entrée les lignes de données.
 ** Chaque ligne a des éléments séparés par des " ". 
 ** Les fonctions map et reduce retournent un ensemble de <key,value>
 ** La fonction getPartition est la customisation de l'utilisateur. Si elle est laissée vide, par défaut elle utilise hashCode.
**/
function map(data) {
    var res = [];
    var t = data.split(" ");
    for(var i in t) {
        var w = t[i];
        res.push({key:w,value:1});
    }
    return res;
}

function reduce(key,values) {
    return {key:key, value: values.reduce(function(a, b) { return a + b; }, 0)};
}
function getPartition(key,value,numPartitions){
  
}