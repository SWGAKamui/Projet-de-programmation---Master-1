//------------------------------------------------------------------
//  File: event.js
//  Role: 
//         execution process related to events on the cluster
//          includes: click event on a specific slot (to show data processed in it)
//                    zoom handler event
//                    input files retrieving content
//  Fonctions:              
//          onclick_page()
//          search_mark()
//          openFileJS()
//          openFileCSV()
//          zoomHandler()   
//          download_output(data,filename)      
//-------------------------------------------------------------------


function onclick_page(event) {
    var rect = canvas.getBoundingClientRect();
    var on_click_x = event.clientX;
    var on_click_y = event.clientY;
    on_click_x -= rect.left;
    on_click_y -= rect.top;
    var p = fatum.camera().windowToModel([on_click_x, on_click_y]);
    var x = p[0];
    var y = p[1];
    x = Math.round(x);
    y = Math.round(y);
    clear_data();
    search_mark(x, y);
}

function search_mark(x, id) {
    var header_data, tmp_header;
    //type of the mark
    switch (x) {
        case indice_fatum_1:
            tmp_header = "Map Input--";
            break;

        case indice_fatum_2:
            tmp_header = "Map Output--";
            break;

        case indice_fatum_3:
            tmp_header = "Reduce Output--";
            break;
        default:
            return false;
    }

    var min = nb_slot + gap;
    var max = min + nb_slot;
    //researh the true id without the gap
    for (var i = 0; i < nb_pc; i++) {
        if (0 <= id && id < nb_slot) {
            header_data = "Slot " + id + ": --"; //exple: Slot 1: --Map Task--
            print_data(x, id, header_data + tmp_header);
            break;
        } else
        if (min <= id) {
            if (id < max) {
                id = id - (gap * (i + 1));
                header_data = "Slot " + id + ": --";
                print_data(x, id, header_data + tmp_header);
                break;
            }
        }
        min = max + gap;
        max = min + nb_slot;
    }
}

var openFileJS = function(event) {
    var input = event.target;
    var text;
    var reader = new FileReader();
    reader.onload = function() {
        text = reader.result;
        data_js = text;
        jQuery('#mapReduceText').val(text);
    };
    reader.readAsText(input.files[0]);
};
var openFileCSV = function(event) {
    var input = event.target;
    var text;
    var reader = new FileReader();
    reader.onload = function() {
        text = reader.result;
        data_csv = text;
    };
    reader.readAsText(input.files[0]);
};

// handles the zoom event
function zoomHandler(event) {
    var delta = Math.sign(event.deltaY);
    // compute mouse position on canvas
    var rect = canvas.getBoundingClientRect();
    var zoomX = event.pageX - (rect.left + window.scrollX);
    var zoomY = canvas.height - (event.pageY - (rect.top + window.scrollY));
    // perform zoom
    fatum.camera().zoom(1.0 - 0.1 * delta, [zoomX, zoomY]);
    // swap camera to avoid animation
    fatum.camera().swap();
    // rerender with the zoomed camera
    fatum.refresh();
    // prevent scrolling
    event.preventDefault();
}

function download_output(data, filename) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}