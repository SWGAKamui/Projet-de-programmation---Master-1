//------------------------------------------------------------------
//  File: notused.js
//  Role: 
//         contains functions used during the project but then removed
//           after client specification ---
//         Left for the possible usefulness of future project advancement.
//
//  Functions: 
//          linkMapShuffle(): create arrow between map and shuffle
//          distributeMapShuffle(): distribute shuffle data on slots
//          distributeInitial(): create object of Slot type and affect tasks
//          singleDataToArray(lst_data): transform the tab data into string
//-------------------------------------------------------------------


function linkMapShuffle() {
    //structure data of shuffle output
    lstSlotShuffle = distributeMapShuffle(shuffle_output, nb_slot_red * nb_pc_red);

    //show connections between map and shuffle
    var found;
    for (var i = 0; i < map_output.length; i++) {
        found = false;
        for (var j = 0; j < lstSlotShuffle.length; j++) {
            if (map_output[i].key == lstSlotShuffle[j].data.key && found == false) //chercher la clé de map dans les clés de shuffle
            {
                print_connection_map(i, j);
                found = true;
            }
        }
    }
}


function singleDataToArray(lst_data) {
    var lst = [];
    var tmp = lst_data.slice(0);
    for (var i = 0; i < tmp.length; i++) {
        tmp[i] = tmp[i].split(" ");
        for (j = 0; j < tmp[i].length; j++) {
            lst.push(tmp[i][j]);
        }
    }
    return lst;
}

function distributeMapShuffle(shuffleRes, totalNbSlots) {
    var lstSlotShuffle = new Array();
    var cpt = 0;
    for (var i in shuffleRes) {
        var tmpSlot = new Slot(cpt % totalNbSlots);
        var keyVal = new KeyVal(i, shuffleRes[i]);

        tmpSlot.affectTask(keyVal);

        lstSlotShuffle.push(tmpSlot);
        cpt++;
    }
    return lstSlotShuffle;
}*/

/*

function distributeInitial(splitData, totalNbSlots){
    result = new Array();

    for (i = 0; i < splitData.length; i++){
       /* tmpKeyValArray = new Array();
        for (j = 0; j < splitData[i].length; j++)
        {
            tmpKeyValObj = new KeyVal(1, splitData[i][j]);
            tmpKeyValArray.push(tmpKeyValObj);
        }*/
var tmpSlot = new Slot(i % totalNbSlots);
tmpSlot.affectTask(splitData[i]);
result.push(tmpSlot);
}
return result;
}

//------------------------------------------------------------------
//  Class: Slot
//      Attributes:  id : integer ( refers to the id of the slot which is < nbCoeurs*nbMachines)
//                   data: Array(< K,V >)
//                   isFree: bool
//
//      Methods:    affectTask( Array[objects] ) : void
//                  freeSlot(): void (empty slot and its data)
//-------------------------------------------------------------------

function Slot(id) {
    this.id = id;
    this.isFree = true;
    this.data = null;
}

Slot.prototype.affectTask = function(data) {
    if (this.isFree) {
        this.data = data;
        this.isFree = false;
    }
}

Slot.prototype.freeSlot = function() {
    this.isFree = true;
    this.data = null;
}





//------------------------------------------------------------------
//  Classe KeyVal
//      Attributes:  key : string
//                   val : string
//
//      Methods:    affectKeyVal( key, value ) : void
//                  freeKeyVal(): void
//-------------------------------------------------------------------

function KeyVal(key, val) {
    this.key = key;
    this.value = val;
}

//KeyVal.prototype.affectKeyVal = function(key, val){
//        this.key = key;
//        this.val = val;
//}

KeyVal.prototype.freeKeyVal = function() {
    this.key = null;
    this.value = null;
}