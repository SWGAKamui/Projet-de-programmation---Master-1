function testPDOM() {
    // Global variables
    nb_slot_total = 1;

    var testInput = new Array();
    testInput.push("a b c");
    testInput.push("d e f");
    testInput.push("g h i");
    testInput.push("j k l");

    var testResult = partitionDataOnMappers(testInput);

    // On observe le résultat obtenu
    console.log("testPDOM result:");
    console.log(testResult);

    if (testResult[0][0] === "a b c" &&
        testResult[0][1] === "d e f" &&
        testResult[0][2] === "g h i" &&
        testResult[0][3] === "j k l") {
        return true;
    } else {
        return false;
    }
}