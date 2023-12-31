var miFicha = [];
var miFichaNum = -1;

class Bloque {
    constructor(posx=1, posy=1,x=1,y=1,la_class="") {
        this.posx = posx;
        this.posy = posy;
        this.x = x;
        this.y = y;
        this.la_class = la_class;
    }    
}

function pintaBloques(el_color="white", la_class="",losBloques=[]){
    losBloques.forEach(blq => {
        let bloq = document.createElement("div");
        $(bloq).addClass(blq.la_class);
        $(bloq).addClass(la_class);
        $(bloq).css("grid-row-start", blq.posy);
        $(bloq).css("grid-row-end", blq.posy+blq.y);
        $(bloq).css("grid-column-start",blq.posx);
        $(bloq).css("grid-column-end", blq.posx+blq.x);
        $(bloq).css("background-color", el_color);
        $(".the_grid").append(bloq);
    });

    $(".ficha").click(rota_ficha);

    check_vecinos_ficha();

}

function pintaBloques2(la_class="",losBloques=[]){ //nueva funcion tomando bloques json
    
    let elcolor = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
    
    // let another_grid = document.createElement("div");
    // $(another_grid).addClass(la_class);
    
    let min_x=99;
    let min_y=99;
    let max_x=-99;
    let max_y=-99;

    losBloques.forEach(blq => {
        let bloq = document.createElement("div");
        $(bloq).addClass(la_class);
        $(bloq).css("grid-row-start", blq[1]+2);
        $(bloq).css("grid-row-end", blq[1]+1+2);
        $(bloq).css("grid-column-start",blq[0]+5);
        $(bloq).css("grid-column-end", blq[0]+1+5);
        $(bloq).css("background-color", elcolor);
        $(".the_grid").append(bloq);
        min_x = Math.min(min_x, blq[0]);
        min_y = Math.min(min_y, blq[1]);
        max_x = Math.max(max_x, blq[0]);
        max_y = Math.max(max_y, blq[1]);
    });

    //calculamos un eje aproximado

    let mid_x = Math.floor((min_x + max_x) / 2);
    let mid_y = Math.floor((min_y + max_y) / 2);
    

    let bloq_eje = document.createElement("div");
    $(bloq_eje).addClass("fichaeje ficha");
    $(bloq_eje).css("grid-row-start", mid_y+2);
    $(bloq_eje).css("grid-row-end", mid_y +1+2);
    $(bloq_eje).css("grid-column-start",mid_x+5);
    $(bloq_eje).css("grid-column-end", mid_x+1+5);
    $(".the_grid").append(bloq_eje);



    // $("#parrilla").append(another_grid);

    // $(".ficha").click(rota_ficha);

    check_vecinos_ficha();
}

function rand0to(max){
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
}

function check_collission(direction_Up_Do_Ri_Le=""){
    let chks = true;
    let miFicha = $(".ficha").filter(function() {return $(this).hasClass("fichaeje") == false;});
    let col_dif_x=0;
    let col_dif_y=0;



    miFicha.each(function (index,value) {
        let posx = $(this).css('grid-column-start');
        let posy = $(this).css('grid-row-start');

        //depending on the possition, collision increments should be determined
        switch (direction_Up_Do_Ri_Le) {
            case "Up":
                col_dif_x = 0;
                col_dif_y = -1;
                break;
            case "Do":
                col_dif_x = 0;
                col_dif_y = 1;
                break;
            case "Space":
                col_dif_x = 0;
                col_dif_y = 1;
                break;
            case "Ri":
                col_dif_x = 1;
                col_dif_y = 0;            
                break;
            case "Le":
                col_dif_x = -1;
                col_dif_y = 0;            
                break;
            default:
                return false;
                break;
        }

        let collis = $('.bloque').filter(function() {return $(this).css('grid-column-start') == Number(posx)+col_dif_x;});
        collis = $(collis).filter(function() {return $(this).css('grid-row-start') == Number(posy)+col_dif_y;});

        if ($(collis).length>0){
            chks = false;
        }
    })

    return chks;    
}

function mueve_ficha(direction_Up_Do_Ri_Le="",la_key,recur=false){
    //assumption: if string_based key is provided, let's ignore the key.
    //if string_based key is "", let's figure out the string_based based on the key.
    if (direction_Up_Do_Ri_Le == ""){
        switch (la_key) {
            case 'ArrowRight':
                direction_Up_Do_Ri_Le = "Ri";
                break;
            case 'ArrowLeft':
                direction_Up_Do_Ri_Le = "Le";
                break;
            // case 'ArrowUp':
            //     direction_Up_Do_Ri_Le = "Up";
            //     break;
            case 'ArrowDown':
                direction_Up_Do_Ri_Le = "Do";
                break;    
            case 'Space':
                direction_Up_Do_Ri_Le = "Space";
                break;    
            default:
                break;
        }
    }
    
    if (check_collission(direction_Up_Do_Ri_Le)){

        let miFicha = document.querySelectorAll(".ficha");
        let col_dif_x=0;
        let col_dif_y=0;
        
        //depending on the possition, collision increments should be determined
        switch (direction_Up_Do_Ri_Le) {
            // case "Up":
            //     col_dif_x = 0;
            //     col_dif_y = -1;
            //     break;
            case "Do":
                col_dif_x = 0;
                col_dif_y = 1;
                break;
            case "Space":
                col_dif_x = 0;
                col_dif_y = 1;
                break;
            case "Ri":
                col_dif_x = 1;
                col_dif_y = 0;            
                break;
            case "Le":
                col_dif_x = -1;
                col_dif_y = 0;            
                break;
            default:
                return false;
                break;
        }

        miFicha.forEach(blq => {
            $(blq).css("grid-column-start",Number($(blq).css("grid-column-start"))+col_dif_x);
            $(blq).css("grid-column-end",Number($(blq).css("grid-column-end"))+col_dif_x);
            $(blq).css("grid-row-start",Number($(blq).css("grid-row-start"))+col_dif_y);
            $(blq).css("grid-row-end",Number($(blq).css("grid-row-end"))+col_dif_y);
        })
        //quick workaround with recursion: final postition should be calc and directly enforced... though
        if (recur==false){
            if (direction_Up_Do_Ri_Le=="Space"){
                for (let k=0;k<200;k++){
                    setTimeout(()=>{mueve_ficha("Space",null,true)},100);
                }
                let elsound = new Audio();
                elsound.src = "fall_v2.mp3"
                elsound.play();
            }
        }
    } else {
        //another workaround here as well to avoid returning something when movement not possible
        if (recur==false){
            if (direction_Up_Do_Ri_Le=="Do"){ //ohhhhh, has intentado ir hacia abajo y no has podido, asi que siguiente ficha!
                $(".fichaeje").remove();
                $(".ficha").addClass("bloque").removeClass("ficha");

                clean_tetris();
                setTimeout(()=>{ficha_creator("ficha");},800);
            }
        }
    }
}

function rota_ficha(){

    if (check_surroundings()) {

        miFicha = document.querySelectorAll(".ficha");
        let miEje = document.querySelectorAll(".fichaeje");

        miFicha.forEach(blq => {
            rota_bloque(blq,miEje);
        })

        check_vecinos_ficha();

        let elsound = new Audio();
        elsound.src = "clunk_v2.mp3"
        elsound.play();

    }
}

function rota_bloque(elBloque, elEje){
    let posx = $(elBloque).css("grid-column-start");
    let posy = $(elBloque).css("grid-row-start");

    let posx_eje = $(elEje).css("grid-column-start");
    let posy_eje = $(elEje).css("grid-row-start");

    //si el bloque tiene negativos, ....o no
    let x_net = Number(posx)-Number(posx_eje);
    let y_net = Number(posy)-Number(posy_eje);

    //aqui se están aplicando las cuatro reglas para una rotacion segun reloj.
    let new_x_net;
    let new_y_net;

    if (x_net<0){
        new_y_net = 1 * x_net;
    } else {
        new_y_net = 1 * x_net;
    }

    if (y_net<0){
        new_x_net = -1 * y_net;
    } else {
        new_x_net = -1 * y_net;
    }

    posx = Number(new_x_net)+Number(posx_eje);
    posy = Number(new_y_net)+Number(posy_eje);


    $(elBloque).css("grid-column-start",posx);
    $(elBloque).css("grid-row-start",posy);
    $(elBloque).css("grid-column-end",Number(posx)+1);
    $(elBloque).css("grid-row-end",Number(posy)+1);

}

function freeze_ficha(){
    $(".eje").removeClass("eje"); //esto no pertenece a crear ficha
    $(".ficha").addClass("bloque"); //esto no pertenece a crear ficha
    $(".ficha").removeClass("ficha"); //esto no pertenece a crear ficha
    ficha_creator("ficha");
}


function ficha_creator(la_class, ficha_num=-1){

    let ficha_catalog = JSON.parse('[[[1,1],[0,1],[1,2],[2,1],[1,0]],[[2,0],[1,0],[2,1],[3,0],[0,0]],[[1,0],[0,0],[1,1],[2,0],[0,1]],[[1,1],[0,1],[1,2],[2,1],[0,0]],[[1,0],[0,0],[1,1],[2,0],[1,2]],[[1,0],[0,0],[1,1],[2,0],[2,1]],[[1,0],[0,0],[1,1],[2,0],[3,0]],[[1,1],[0,1],[1,2],[2,1],[2,0]],[[2,0],[1,0],[2,1],[0,0],[2,2]],[[2,0],[1,0],[2,1],[0,0],[3,1]],[[3,0],[2,0],[3,1],[1,0],[0,0]],[[2,0],[1,0],[2,1],[0,0],[0,1]],[[2,1],[1,1],[2,2],[0,1],[0,0]],[[1,1],[0,1],[1,2],[0,0],[1,3]],[[1,1],[0,1],[1,2],[0,0],[2,2]],[[1,0],[0,0],[1,1],[1,2],[1,3]],[[1,0],[0,0],[1,1],[1,2],[2,2]],[[2,0],[1,0],[3,0],[0,0],[4,0]]]');
    let num_catalog = ficha_catalog.length - 1; //18

    if (ficha_num==-1) { //just in case we want some specific ficha
        ficha_num = rand0to(num_catalog);
    }

    miFicha = ficha_catalog[ficha_num];

    if (ficha_num==99){
        $(".ficha").clone(false).addClass("ghost").appendTo(".the_grid");
        $(".ghost").removeClass("ficha");
        $(".ghost.fichaeje").removeClass("fichaeje").addClass("ghosteje");
    } else {
        miFichaNum=ficha_num;
        // pintaBloques(el_color, "ficha", miFicha);
        pintaBloques2("ficha",miFicha);
    }

}

function main(){

    //obtener height de pantalla asap
    window.screen.height;
    window.screen.width;

    document.querySelector(':root').style.setProperty('--grid-rows',$(".the_grid").css("grid-template-rows").split(" ").length - 1);
    document.querySelector(':root').style.setProperty('--grid-cols',$(".the_grid").css("grid-template-columns").split(" ").length - 2);

    document.querySelector(':root').style.setProperty('--window-height',$(document).height());
    document.querySelector(':root').style.setProperty('--window-width',$(document).width());

    recalculate_grid_size();

    document.addEventListener("keydown", function(event) {
        if (event.code=='ArrowUp'){
            rota_ficha();
        } else if (event.code=='KeyA') {
            $(".ficha").remove(); ficha_creator("ficha",15);
        } else {
            mueve_ficha("",event.code);
        }
        // console.log(event);
    });

    window.addEventListener("resize", recalculate_grid_size);

    repintaBordes();

    ficha_creator("ficha");

    setInterval(()=>{mueve_ficha(direction_Up_Do_Ri_Le="Do")},450);
}


function check_surroundings(){

    let minx=999;
    let miny=999;
    let maxx=0;
    let maxy=0;

    miFicha = document.querySelectorAll(".ficha");

    //quiero el area interior de la pieza al girar una vez.tiene que estar completamente vacio!!
    // consiste en coger el min y max de x e y en la posicion normal

    miFicha.forEach(blq => {
        let posx = $(blq).css('grid-column-start');
        let posy = $(blq).css('grid-row-start');

        minx = Math.min(minx, Number(posx));
        miny = Math.min(miny, Number(posy));
        maxx = Math.max(maxx, Number(posx));
        maxy = Math.max(maxy, Number(posy));
    })

    ficha_creator("ghost",99); //99=clone

    let miGhost = document.querySelectorAll(".ghost");
    let miGhost_eje = document.querySelectorAll(".ghosteje"); //sacar de aqui!

    miGhost.forEach(blq => {
        rota_bloque(blq,miGhost_eje);
    })

    miGhost.forEach(blq => {
        let posx = $(blq).css('grid-column-start');
        let posy = $(blq).css('grid-row-start');

        minx = Math.min(minx, Number(posx));
        miny = Math.min(miny, Number(posy));
        maxx = Math.max(maxx, Number(posx));
        maxy = Math.max(maxy, Number(posy));
    })

    $(".ghost").remove();

    let surr = $(".bloque").filter(function() {return $(this).css('grid-column-start') >= Number(minx);});
    surr = $(surr).filter(function() {return $(this).css('grid-row-start') >= Number(miny);});
    surr = $(surr).filter(function() {return $(this).css('grid-column-end') <= Number(maxx+1);});
    surr = $(surr).filter(function() {return $(this).css('grid-row-end') <= Number(maxy+1);});
    $(surr).addClass("ghostcheck");
    
    
    
    setTimeout(()=>{$(".bloque").removeClass("ghostcheck")},1500);
    
    if ($(surr).length>0){
        return false;
    } else {
        return true;
    }

}

function clean_tetris(){
    let num_cols = $(".the_grid").css("grid-template-columns").split(" ").length;
    let num_rows = $(".the_grid").css("grid-template-rows").split(" ").length;

    let something_cleared = false;

    for (let i=1;i<num_rows;i++){
        let a_row = $(".bloque").filter(function() {return $(this).css('grid-row-start') == Number(i);});
        if ($(a_row).length>=num_cols){
            a_row = $(a_row).filter(function() {return $(this).hasClass("border") == false;});
            $(a_row).remove();
            // window.alert("Tetris!!");
            something_cleared = true;

            let all_blqs = $(".bloque").filter(function() {return $(this).css('grid-row-start') < i;});
            all_blqs = $(all_blqs).filter(function() {return $(this).hasClass("border") == false;});

                
            $(all_blqs).each(function (index,value) {
                let ypos_s = $(this).css("grid-row-start");
                let ypos_e = $(this).css("grid-row-end");
                $(this).css("grid-row-start",Number(ypos_s)+1);
                $(this).css("grid-row-end",Number(ypos_e)+1);
            });
        }
    }

    if (something_cleared) {
        let elsound = new Audio();
        elsound.src = "clear_v3.mp3";
        elsound.play();    
    }


}

function test_random(){
    for(let i=0;i<200;i++){
        console.log(rand0to(6));
    }
}


function check_vecinos_ficha(){

    let fich = $(".ficha").filter(function() {return $(this).hasClass("fichaeje") == false;});
    $(fich).css("border-style","");$(fich).css("border-width","");$(fich).css("border-color","");
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


function repintaBordes(){
    // console.log($(".the_grid").css("grid-template-columns"));
    $(".bloque").remove();

    let num_cols = $(".the_grid").css("grid-template-columns").split(" ").length;
    let num_rows = $(".the_grid").css("grid-template-rows").split(" ").length;

    for (let i=1;i<num_rows+1;i++){
        pintaBloques("white","border",[new Bloque(1,i,1,1,"bloque")]);
        pintaBloques("white","border",[new Bloque(num_cols,i,1,1,"bloque")]);
    }
    for (let i=1;i<num_cols+1;i++){
        pintaBloques("white","border",[new Bloque(i,num_rows,1,1,"bloque")]);
        // pintaBloques("white","border",[new Bloque(i,1,1,1,"bloque")]);
    }
}

function a_little_of_help() {
    let collis = $('.bloque').filter(function() {return $(this).hasClass("border") == false;});
    let max = 0;
    if ($(collis).length>15){
        max = 15;
    } else {
        max = $(collis).length;
    }
    collis = collis.slice(0, max);
    $(collis).remove();
}

function recalculate_grid_size(){

    let topmenu_height =  getComputedStyle(document.documentElement).getPropertyValue('--top-menu-height');
    let page_height = window.innerHeight;
    
    // let actual_grid_cols_count = getComputedStyle(document.documentElement).getPropertyValue('--grid-cols');
    let actual_grid_rows_count = getComputedStyle(document.documentElement).getPropertyValue('--grid-rows');

    //let actual_grid_block_height_width = getComputedStyle(document.documentElement).getPropertyValue('--block-height-width');
    
    let new_grid_height = page_height - topmenu_height;
    let new_blocks_height_width = Math.floor(new_grid_height / (actual_grid_rows_count));

    document.querySelector(':root').style.setProperty('--block-height-width',new_blocks_height_width);

}

function play_tetris_music() {
    let elsound = new Audio();
    elsound.src = "tetris_v2.mp3";
    elsound.play();
}

main();

