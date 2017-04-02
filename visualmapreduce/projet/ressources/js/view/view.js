//------------------------------------------------------------------
//  File: view.js
//  Role: 
//         execution process related to graphical design and cluster appearence. 
//         includes: FATuM initialization,
//                   printing marks of the cluster,
//                   printing connections between marks,
//                   printing data on the right box.
//  Functions:              
//          init_fatum()
//          refresh_fatum()
//          print_cluster(nbslot, tab, pos, color)
//          print_connection_map(m1,m2)      
//          print_connection_red(m1,m2)
//          print_general()
//          clear_data()
//          print_lign(data)
//          print_data(tab_data, id,header_data)
//          print_data_map_input(id)
//          print_data_map_output(id)
//          print_data_reduce_output(id)
//          print_error(error_msg)
//-------------------------------------------------------------------

//Color
var blue = [0, 0, 255, 255];
var red = [255, 0, 0, 0];
var green = [0, 128, 0, 255];
var black = [0, 0, 0, 255];
var position = 15;

var width;
var height;

var indice_fatum_1 = 10;
var indice_fatum_2 = 30;
var indice_fatum_3 = 50;

//variable to specifiy the gap between two machines
var gap = 3;

//arrays of cluster
var tab_input_map;
var tab_output_map;
var tab_output_red;

var init = function init_fatum() {
    canvas = document.getElementById('fatum-demo');
    window.fatum = Fatum.createFatumContext(canvas);
    fatum.clear();
    Fatum.setRenderingObserver(fatum);
    Fatum.setMouseMoveHandler(canvas, fatum);

    width = canvas.width;
    height = canvas.height;
    canvas.onwheel = zoomHandler;

    fatum.maxConnectionSize(1);
    // activation of the MARKS && CONNECTIONS
    fatum.layerOn(Fatum.MARKS | Fatum.CONNECTIONS | Fatum.TEXT);
};

function refresh_fatum() {
    fatum.swap();
    fatum.center();
    fatum.camera().swap();
    fatum.refresh();
}

function print_cluster(nbslot, tab, pos, color) {
    refresh_fatum();
    var tmp = 0;
    var tmp2 = Math.trunc(nb_slot / 2);
    var inc = 0;

    for (var i = 0; i < nb_pc; i++) {
        fatum.addMark()
            .x(pos)
            .y(tmp2)
            .size([2, nb_slot, 0])
            .shape(Fatum.Shape.SQUARE)
            .color(blue)
            .alpha(50);
        if (pos == indice_fatum_1)
        fatum.addText()
                .textColor(0, 0, 0, 255)
                .size(1)
                .text("PC n°" + i)
                .x(pos - (indice_fatum_1 / 2))
                .y(tmp2)
                .rotation(1.555)
                .occlusion(false);
        else if (pos == indice_fatum_3)
        fatum.addText()
            .textColor(0, 0, 0, 255)
            .size(1)
            .text("PC n°" + i)
            .x(pos + (indice_fatum_1 / 2))
            .y(tmp2)
            .rotation(1.555)
            .occlusion(false);
        tmp2 += nb_slot + gap;
        for (var j = 0; j < nb_slot; j++) {
            if (pos != indice_fatum_3) {
                tab[inc] = fatum.addMark()
                    .x(pos)
                    .y(tmp++)
                    .color(color)
                    .alpha(255);
            } else {
                if (inc >= nbslot)
                    tab[inc] = fatum.addMark()
                    .x(pos)
                    .y(tmp++)
                    .color(black)
                    .alpha(255);
                else
                    tab[inc] = fatum.addMark()
                    .x(pos)
                    .y(tmp++)
                    .color(color)
                    .alpha(255);
            }
            inc++;
        }
        tmp += gap;
    }
    refresh_fatum();
}

function print_general() {
    print_cluster(nb_slot, tab_input_map, indice_fatum_1, red);
    print_cluster(nb_slot, tab_output_map, indice_fatum_2, blue);
    print_cluster(nb_slot_red, tab_output_red, indice_fatum_3, red);
}

function print_connection_map(m1, m2) {
    fatum.addConnection(tab_input_map[m1], tab_output_map[m2]).sourceColor(black).targetColor(black);
    refresh_fatum();
}

function print_connection_red(m1, m2) {
    fatum.addConnection(tab_output_map[m1], tab_output_red[m2]).sourceColor(black).targetColor(black);
    refresh_fatum();
}

function clear_data() {
    var c = document.getElementById("text_data");
    c.innerHTML = "";
}

function print_lign(data) {
    var c = document.getElementById("text_data");
    c.innerHTML += data + "\n";
}

function print_data_map_input(id) {
    //if it's a lign per mapper -----------------------------------
    if (lst_data.length <= nb_slot_total)
        print_lign(lst_data[id]);

    else {
        //if it's multiple ligns per mapper ---------------------------
        var lign;
        //get all data input on the same slot
        for (var i = 0; i < lst_partition[id].length; i++) {
            lign = lst_partition[id][i];
            print_lign(lign);
        }
    }
}

function print_data_map_output(id) {
    var lign;
    //get all data output on the same slot
    for (var i = 0; i < map_output[id].length; i++) {
        lign = "<" + map_output[id][i].key + ", " + map_output[id][i].value + ">";
        print_lign(lign);
    }
}

function print_data_reduce_output(id) {
    var lign;
    for (var i = 0; i < reduce_output[id].length; i++) {
        lign = "<" + reduce_output[id][i].key + ", " + reduce_output[id][i].value + ">";
        print_lign(lign);
    }
}

function print_data(x, id, header_data) {
    clear_data();

    switch (x) {
        case indice_fatum_1:
            //if the click is on a slot
            if (lst_partition != null)
                print_lign(header_data);
            //if the slot is not empty
            if (lst_partition.length > id)
                print_data_map_input(id);
            else
                print_lign("-vide-");
            break;

        case indice_fatum_2:
            if (map_output != null)
                print_lign(header_data);
            if (map_output.length > id)
                print_data_map_output(id);
            else
                print_lign("-vide-");
            break;

        case indice_fatum_3:
            if (reduce_output != null)
                print_lign(header_data);
            if (reduce_output.length > id) {
                print_data_reduce_output(id);
            } else
                print_lign("-vide-");
            break;

        default:
            return false;
    }
}

function print_error(error_msg) {
    $("#error").show();
    document.getElementById("error").innerHTML = error_msg;
}
