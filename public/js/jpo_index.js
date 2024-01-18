function left_show_hide(){
    document.getElementById("my_sidebar_left").classList.toggle("active");
    document.getElementById("my_sidebar_right").classList.remove("active");
}

function right_show_hide(){
    document.getElementById("my_sidebar_right").classList.toggle("active");
    document.getElementById("my_sidebar_left").classList.remove("active");
}

function rand0to(max){
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
}


function NEW_pintaBloques(losBloques=[],la_class="bloque",elcolor="random",destino_jq=".the_grid",off_x=2,off_y=2,make_axis=false){ //funcion definitiva crea DIVs para bloques
    
    if (elcolor=="random") {elcolor = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";}

    let {ancho, alto, eje } = dame_ancho_alto_eje(losBloques);

    losBloques.forEach(blq => {
        let bloq = document.createElement("div");
        $(bloq).addClass(la_class);
        $(bloq).css("grid-row-start", blq[1]+off_y);
        $(bloq).css("grid-row-end", blq[1]+1+off_y);
        $(bloq).css("grid-column-start",blq[0]+off_x);
        $(bloq).css("grid-column-end", blq[0]+1+off_x);
        $(bloq).css("background-color", elcolor);
        $(destino_jq).append(bloq);
    });

    if (make_axis==true) {

        let mid_x = eje[0];
        let mid_y = eje[1];
        
        let bloq_eje = document.createElement("div");
        $(bloq_eje).addClass(la_class);
        $(bloq_eje).addClass("eje");
        $(bloq_eje).css("grid-row-start", mid_y+off_y);
        $(bloq_eje).css("grid-row-end", mid_y+1+off_y);
        $(bloq_eje).css("grid-column-start",mid_x+off_x);
        $(bloq_eje).css("grid-column-end", mid_x+1+off_x);
        $(destino_jq).append(bloq_eje);

    }
}

function make_borders(la_class=".ficha"){
    let fich = $(la_class).filter(function() {return $(this).hasClass("eje") == false;});
    remove_borders(la_class);

    $(fich).each(function (index, value){
        let posx = $(this).css("grid-column-start");
        let posy = $(this).css("grid-row-start");
        let vecsT = $(fich).filter(function() {return $(this).css("grid-row-start") == Number(posy)-1;});
        vecsT = $(vecsT).filter(function() {return $(this).css("grid-column-start") == Number(posx);});
        let vecsB = $(fich).filter(function() {return $(this).css("grid-row-start") == Number(posy)+1;});
        vecsB = $(vecsB).filter(function() {return $(this).css("grid-column-start") == Number(posx);});
        let vecsL = $(fich).filter(function() {return $(this).css("grid-column-start") == Number(posx)-1;});
        vecsL = $(vecsL).filter(function() {return $(this).css("grid-row-start") == Number(posy);});
        let vecsR = $(fich).filter(function() {return $(this).css("grid-column-start") == Number(posx)+1;});
        vecsR = $(vecsR).filter(function() {return $(this).css("grid-row-start") == Number(posy);});

        if ($(vecsT).length==0){$(this).css("border-top-style","double");$(this).css("border-top-width","4px");$(this).css("border-top-color","white");}
        if ($(vecsB).length==0){$(this).css("border-bottom-style","double");$(this).css("border-bottom-width","4px");$(this).css("border-bottom-color","white");}
        if ($(vecsL).length==0){$(this).css("border-left-style","double");$(this).css("border-left-width","4px");$(this).css("border-left-color","white");}
        if ($(vecsR).length==0){$(this).css("border-right-style","double");$(this).css("border-right-width","4px");$(this).css("border-right-color","white");}
    });
}

function remove_borders(la_class=".ficha"){
    let fich = $(la_class).filter(function() {return $(this).hasClass("eje") == false;});
    $(fich).css("border-style","");$(fich).css("border-width","");$(fich).css("border-color","");//reset
}


function dame_ancho_alto_eje(losBloques=[]){
    let min_x=99;
    let min_y=99;
    let max_x=-99;
    let max_y=-99;

    losBloques.forEach(blq => {
        min_x = Math.min(min_x, blq[0]);
        min_y = Math.min(min_y, blq[1]);
        max_x = Math.max(max_x, blq[0]);
        max_y = Math.max(max_y, blq[1]);
    });

    //calculamos un eje aproximado

    let mid_x = Math.floor((min_x + max_x) / 2)+1;
    let mid_y = Math.floor((min_y + max_y) / 2)+1; //+1 since 0 means col 1.

    return {
        'ancho': max_x - min_x + 1,
        'alto': max_y - min_y + 1,
        'eje': [mid_x,mid_y]
    }

}