function testSplit() {
    var testCsvContent = "a;b;c\nd;e;f\ng;h;i\nj;k;l";
    var testSeparator = ";";

    var testResult = split(testCsvContent, testSeparator);

    // On observe le résultat obtenu
    console.log("testSplit result:");
    console.log(testResult);

    if (testResult[0] === "a b c" &&
        testResult[1] === "d e f" &&
        testResult[2] === "g h i" &&
        testResult[3] === "j k l") {
        return true;
    } else {
        return false;
    }
}