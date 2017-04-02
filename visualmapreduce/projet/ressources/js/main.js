//------------------------------------------------------------------
//  File: main.js
//  Role: 
//         main file.
//         contains the execution when 'RUN' button is clicked.
//         also the mapReduce process   
//  Functions: 
//          onClick event of 'RUN' button             
//          mapReduceProcess()
//          startMapReduce()        
//-------------------------------------------------------------------

$(document).ready(function() {
    $(".button-collapse").sideNav();
    $("#download").hide();
    $("#error").hide();
    $("#loading_run").hide();

    // Get the Fatum init date in ms
    var fatum_begin_init = performance.now();

    Fatum.init();
    Fatum.whenReady(init);

    $("#loading_fatum").remove();

    // Get the Fatum end init date in ms
    var fatum_end_init = performance.now();

    // Print the Fatum init time in ms
    console.log("Fatum init time: " + (fatum_end_init - fatum_begin_init) + " ms.");
});


var nb_pc;
var nb_slot;
var nb_slot_red;
var nb_slot_total;
//extension input csv
var ext_csv;
var input_csv;
var data_csv;
//extension input js
var ext_js;
var input_js;
var data_js;
//file fatum
var canvas;
var fatum;

//variables of mapReduce process
var lst_data;
var lst_partition;
var map_input;
var map_output;
var partitioner_output;
var shuffle_output;
var reduce_output;

$("a#run").click(function() {
    $("#error").hide();
    $(".done").remove();
    $(".error").remove();
    $("#download").show();
    fatum.clear();
    clear_data();
    //get user's parameters (see param.js)
    param();
    if (test_param() == true) {
        //scroll down on the simulation
        $('html, body').animate({
            scrollTop: $("#simulation").offset().top
        }, 1000);
        //init tab
        tab_input_map = new Array(nb_slot_total);
        tab_output_map = new Array(nb_slot_red * nb_pc);
        tab_output_red = new Array(nb_slot_red);
        print_general();
        mapReduceProcess();
    }
});

$("a#download").click(function() {
    $(".done").remove();
    $(".error").remove();
    var output_csv = dataToCSVFormat(reduce_output, ";");
    download_output(output_csv, "mapReduce.csv");

});

function mapReduceProcess() {
    startMapReduce();
    linkMapInput();
    linkMapReduce();
}

//call split + creation of job + mapReduce process
function startMapReduce() {
    //apply split
    lst_data = split(data_csv, ';');
    lst_partition = partitionDataOnMappers(lst_data);
    //create a job
    var functions = generateMapReduceFunctions(data_js);
    var map = functions.map;
    var reduce = functions.reduce;
    var getPartition = functions.getPartition;

    var job = new Job(map, reduce);

    //Map Phase -------------------------------------------------

    map_output = mapAllData(job);
    console.log("map_output:");
    console.log(map_output);

    //Partitioner Phase -----------------------------------------
    var partitioner = new Partitioner();

    //if the partitioner has been customised (elsewhere, hashCode)
    if (getPartition() != undefined)
        partitioner.setPartitionerFunction(getPartition);

    partitioner_output = partitioner.applyPartitioner(job.applyMap(lst_data), nb_slot_red);
    console.log("partitioner_output:");
    console.log(partitioner_output);

    //Shuffle Phase --------------------------------------------
    shuffle_output = shuffleAllData(job, partitioner_output);
    console.log("shuffle_output:");
    console.log(shuffle_output);

    //Reduce Phase ---------------------------------------------
    reduce_output = reduceAllData(job, shuffle_output);
    console.log("reduce_output:");
    console.log(reduce_output);
}

function mapAllData(job) {
    map_out = new Array();

    //call map function on every data of slot
    for (var i = 0; i < lst_partition.length; i++) {
        map_input_partition = lst_partition[i];
        map_out.push(job.applyMap(map_input_partition));
    }
    return map_out;
}

function shuffleAllData(job, partitioner_output) {
    shuffle_output = new Array();

    //call shuffle function on every data of reduce slot
    for (var i = 0; i < partitioner_output.length; i++) {
        shuffle_output.push(job.shuffle(partitioner_output[i]));

    }
    return shuffle_output;
}

function reduceAllData(job, shuffle_output) {
    red_output = new Array();
    //call reduce function on every data of reduce slot
    for (var i in shuffle_output)
        red_output.push(job.applyReduce(shuffle_output[i]));

    return red_output;

}