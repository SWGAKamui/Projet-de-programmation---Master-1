//------------------------------------------------------------------
//  File: param.js
//  Role: 
//        test if all user configuration is OK.
//  Fonctions:              
//          param() : get user parameters
//          test_param() : check if the parameters are OK.         
//-------------------------------------------------------------------
function param() {
    //get input csv extension
    input_csv = $("#inputcsv").val();
    ext_csv = input_csv.split('.').pop();
    //get input js extension
    input_js = $("#inputjs").val();
    ext_js = input_js.split('.').pop();
    data_js = $("#mapReduceText").val();
    //cluster
    nb_pc = parseInt(document.getElementById("number1").value);
    nb_slot = parseInt(document.getElementById("number2").value);
    nb_slot_red = parseInt(document.getElementById("number3").value);
    nb_slot_total = nb_slot * nb_pc;
}

function test_param() {
    var config = true;
    var done;
    var error;
    var error_csv
    //===== file=====
    if (data_csv == undefined) {
        error_csv = "<div class='error'><i class='material-icons'>error</i>Fichier vide<br/> Veuillez charger de nouveau un fichier csv</div>"
        $("h5 + div > form + form").append(error_csv);
        config = false;
    }

    if (ext_csv == "csv" && ext_js == "js") {
        done = "<div class='done'><i class='material-icons'>done</i>Message envoyé</div>"
        $("h5 + div > form + form").append(done);
    }
    if (ext_csv != "csv") {
        var error_csv = "<div class='error'><i class='material-icons'>error</i>Veuillez entrer un fichier CSV</div>"
        $("h5 + div > form + form").append(error_csv);
        config = false;
    }
    if (ext_js != "js" && ext_js.length != 0) {
        var error_js = "<div class='error'><i class='material-icons'>error</i>Veuillez entrer un fichier JS</div>"
        $("h5 + div > form + form").append(error_js);
        config = false;
    }
    // ===== CLUSTER=====
    if (nb_pc > 0 && nb_pc == parseInt(nb_pc, 10) && nb_slot > 0 && nb_slot == parseInt(nb_slot, 10) && nb_slot <= 24 && nb_pc <= 20) {
        done = "<div class='done'><i class='material-icons'>done</i>Cluster configuré</div>"
        $("#number2 + label").parents(".card-panel").append(done);
    } else {
        error = "<div class='error'><i class='material-icons'>error</i>1 <= slot <= 24 && 1 <= pc <= 20</div>"
        $("#number2 + label").parents(".card-panel").append(error);
        config = false;
    }

    if (nb_slot_red > 0 && nb_slot_red == parseInt(nb_slot_red, 10) && nb_slot_red <= (nb_slot * nb_pc)) {
        done = "<div class='done'><i class='material-icons'>done</i>Cluster configuré</div>"
        $("#number3 + label").parents(".card-panel").append(done);
    } else {
        error = "<div class='error'><i class='material-icons'>error</i>Entrez un nombre entre 0 et total de slots</div>"
        $("#number3 + label").parents(".card-panel").append(error);
        config = false;
    }
    return config;
}