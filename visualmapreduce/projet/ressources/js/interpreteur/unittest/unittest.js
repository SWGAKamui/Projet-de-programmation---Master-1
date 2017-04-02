// Global variable declaration
var nb_slot_total;
var lst_partition;

function unitTest() {
    var splitResult = testSplit();
    if (splitResult === true) {
        document.getElementById("testSplit").innerHTML = "<font color=\"green\">PASS</font>";
    } else {
        document.getElementById("testSplit").innerHTML = "<font color=\"red\">FAIL</font>";
    }

    var pdomResult = testPDOM();
    if (pdomResult === true) {
        document.getElementById("testPDOM").innerHTML = "<font color=\"green\">PASS</font>";
    } else {
        document.getElementById("testPDOM").innerHTML = "<font color=\"red\">FAIL</font>";
    }

    var madResult = testMAD();
    if (madResult === true) {
        document.getElementById("testMAD").innerHTML = "<font color=\"green\">PASS</font>";
    } else {
        document.getElementById("testMAD").innerHTML = "<font color=\"red\">FAIL</font>";
    }
    /*
    	var shuffleResult = testShuffle();
    	if (shuffleResult === true) {
    		document.getElementById("testShuffle").innerHTML = "<font color=\"green\">PASS</font>";
    	} else {
    		document.getElementById("testShuffle").innerHTML = "<font color=\"red\">FAIL</font>";
    	}
    */
}