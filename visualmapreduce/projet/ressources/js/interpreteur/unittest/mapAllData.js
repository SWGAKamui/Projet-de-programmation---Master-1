function testMAD() {
    // Global variable initialization
    nb_slot_total = 25;

    // Input passed into partitionDataOnMappers()
    var testInput = new Array();
    testInput.push("a b c");
    testInput.push("d e f");
    testInput.push("g h i");
    testInput.push("j k l");

    // Global variable initialization
    lst_partition = partitionDataOnMappers(testInput);

    // Storing js code in a variable
    testJsCode = 'function map(data){var res=[];var t=data.split(" ");for(var i in t){var w=t[i];res.push({key:w,value:1});}return res;}function reduce(key,values){return {key:key,value:values.reduce(function(a,b){return a+b;},0)};}function getPartition(key,value,numPartitions){}'

    var testFunctions = generateMapReduceFunctions(testJsCode);

    var testInput = new Job(testFunctions.map, testFunctions.reduce);
    var testResult = mapAllData(testInput);

    // On observe le résultat obtenu
    console.log("testMAD result:");
    console.log(testResult);

    if (testResult[0][0].key === "a" &&
        testResult[0][0].value === 1 &&
        testResult[0][1].key === "b" &&
        testResult[0][1].value === 1 &&
        testResult[0][2].key === "c" &&
        testResult[0][2].value === 1 &&
        testResult[1][0].key === "d" &&
        testResult[1][0].value === 1 &&
        testResult[1][1].key === "e" &&
        testResult[1][1].value === 1 &&
        testResult[1][2].key === "f" &&
        testResult[2][2].value === 1 &&
        testResult[2][0].key === "g" &&
        testResult[2][0].value === 1 &&
        testResult[2][1].key === "h" &&
        testResult[2][1].value === 1 &&
        testResult[2][2].key === "i" &&
        testResult[2][2].value === 1 &&
        testResult[3][0].key === "j" &&
        testResult[3][0].value === 1 &&
        testResult[3][1].key === "k" &&
        testResult[3][1].value === 1 &&
        testResult[3][2].key === "l" &&
        testResult[3][2].value === 1) {
        return true;
    } else {
        return false;
    }
}