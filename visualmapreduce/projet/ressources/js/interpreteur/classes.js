//------------------------------------------------------------------
//  File: classes.js
//  Role: 
//         contains classes and functions implementation of the project
//  Classes:              
//          Job
//          Partitioner
//-------------------------------------------------------------------

//------------------------------------------------------------------
//  Class: Job
//      Attributes:  map: fonction
//                   reduce: fonction
//
//      Methods:    applyMap(lignes_txt): Array(<K1,V1>)
//                  applyReduce( output_shuffle )
//                  shuffle(output_map ) : Array(<K1,{V1,V2,V3..}>)
//                  run(lignes_txt)
//-------------------------------------------------------------------

function Job(map, reduce) {
    this.map = map;
    this.reduce = reduce;
}

Job.prototype.applyMap = function(data) {
    return Array.prototype.concat.apply([], data.map(this.map));
}

Job.prototype.shuffle = function(data) {
    var res = {};
    for (var i = 0; i < data.length; ++i) {
        var record = data[i]; // <K,V>
        if (!res.hasOwnProperty(record.key))
            res[record.key] = [];

        res[record.key].push(record.value);
    }
    return res;
}

Job.prototype.applyReduce = function(data) {
    var res = [];
    for (var key in data) {
        res = res.concat(this.reduce(key, data[key]));
    }
    return res;
}

Job.prototype.run = function(data) {
    return this.applyReduce(this.shuffle(this.applyMap(data)));
}


//------------------------------------------------------------------
//  Class Partitioner
//      Attributes:  
//                   
//
//      Methods: 
//              setPartitionerFunction(partFunc): sets the customised function of the user
//              getAllPartitions(map_output): returns the map_output in a structured data
//                  based on getPartition function.
//              getPartition(key, value, numPartitions):
//                  receives a key and a value and the number of partitions to split the data
//                  a number in the range [0, numPartitions) must be returned 
//                  indicating which partition to send the key and value to. 
//                  For any two keys k1 and k2, k1.equals(k2) implies 
//                  getPartition(k1, *, n) == getPartition(k2, *, n).
//                               
//-------------------------------------------------------------------
var MAX_VALUE = 24;
//Partitioner not customised by user. Use hashCode by default"
var defaultPartitioner = "function defaultGetPartition(key,value,numPartitions){" +
    "return Math.abs(key.hashCode()) % numPartitions; }; ";

var Partitioner = function() {
    eval(defaultPartitioner);
    this.getPartition = defaultGetPartition;
}

Partitioner.prototype.setPartitionerFunction = function(partFunc) {
    this.getPartition = partFunc;
}

Partitioner.prototype.applyPartitioner = function(map_output, numPartitions) {
    var res = new Array(),
        tmp;
    var partition, keyval,j,found;

    for (var i = 0; i < map_output.length; i++) {
        keyval = map_output[i];
        //get the partition of the current key,value
        partition = this.getPartition(keyval.key, keyval.value, numPartitions);
        //search of the partition number in loop

        found = false;
        j = 0;
        //if it's the first element in map_output
        if (res.length == 0) {
            tmp = new Array();
            tmp.push(keyval);
            res.push(tmp);
        } else {
            //search existing partitions 
            while (!found && j < res.length) {
                //the array partition exists
                if (partition == this.getPartition(res[j][0].key, res[j][0].value, numPartitions)) {
                    found = true;
                    res[j].push(keyval);
                }
                j++;
            }
            //if the partition still doesn't exist, create it
            if (!found) {
                tmp = new Array();
                tmp.push(keyval);
                res.push(tmp);
            }

        }
    }
    return res;
}


//Implementation of the function hashCode which doesn't exist in javasript
//Link: werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function() {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};


//------------------------------------------------------------------
//  functions:
//          split:  convert file from csv format to a list of data     
//          generateMapReduceFunctions: generate functions from user js input
//          linkMapInput(): create arrow between map input and map task marks
//          linkMapReduce(): show connections between map and reduce tasks
//          partitionDataOnMappers(lst_data): gets each map input data on slot
//
//-------------------------------------------------------------------

function split(csvContent, separator) {
    lstData = new Array();
    var rows = csvContent.split(/\n|\r/);
    var regex = /\s([^\s]*)$/;
    for (var i = 0; i < rows.length; i++) {
        //remove unnecessary space in end of elements
        rows[i] = rows[i].replace(regex, '$1');
        //replace space in element by '-'
        rows[i] = rows[i].split(" ").join("-");
        //separate elements by separator
        rows[i] = rows[i].split(separator).join(" ");
        //avoid empty lines
        if (rows[i] != "")
            lstData.push(rows[i]);
    }
    return lstData;
}

function generateMapReduceFunctions(textCode) {
    eval(textCode);

    return {
        map: map,
        reduce: reduce,
        getPartition: getPartition
    };
}

function searchKeyInRedOutput(key) {
    //search map key in reduce output
    for (var i = 0; i < reduce_output.length; i++)
        for (var j = 0; j < reduce_output[i].length; j++) {
            if (reduce_output[i][j].key == key) {
                return i;
            }
        }
}

function linkMapReduce() {
    for (var i = 0; i < map_output.length; i++) {
        //for each element in a partition
        for (var j = 0; j < map_output[i].length; j++) {
            var index = searchKeyInRedOutput(map_output[i][j].key);
            print_connection_red(i, index);
        }
    }
}

function linkMapInput() {
    //show connections between map input and map output
    for (var i = 0; i < nb_slot_total; i++) {
        if (lst_data[i] != null)
            print_connection_map(i, i);
    }
}


function partitionDataOnMappers(lst_data) {
    var lst = new Array(); //final list
    var lstMapper; // data per mapper
    //if there's enough slots for all rows, partition = line
    if (lst_data.length <= nb_slot_total) {
        for (var i = 0; i < lst_data.length; i++) {
            tmp = new Array();
            tmp.push(lst_data[i]);
            lst.push(tmp);
        }
        return lst;
    }
    //else, we partition multiple data on nb_slot_total
    //get average number of data rows per mapper
    var nbRowsPerMapper = Math.floor(lst_data.length / nb_slot_total);
    var ind = 0;
    for (var i = 0; i < nb_slot_total; i++) {
        lstMapper = new Array();
        for (var j = 0; j < nbRowsPerMapper; j++) {
            lstMapper.push(lst_data[ind]);
            ind++;
        }
        lst.push(lstMapper);
    }

    //processing the rest of the data
    var remaining = lst_data.length % nb_slot_total;
    for (var i = 0; i < remaining; i++) {
        lst[i].push(lst_data[(nb_slot_total * nbRowsPerMapper) + i]);
    }
    return lst;
}

function singleDataToArray(lst_data) {
    var lst = new Array();
    var tmp = lst_data.slice(0);
    for (var i = 0; i < tmp.length; i++) {
        tmp[i] = tmp[i].split(" ");
        for (j = 0; j < tmp[i].length; j++) {
            lst.push(tmp[i][j]);
        }
    }
    return lst;
}

//function used for the download of mapReduce output.
function dataToCSVFormat(tab, separator) {
    var res = "";
    for (i = 0; i < tab.length; i++)
        for (j = 0; j < tab[i].length; j++)
            res += tab[i][j].key + separator + tab[i][j].value + "\n";

    return res;
}