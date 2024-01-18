var miFicha = [];
var miFichaNum = -1;

function look_in_direction (direction){
    let col_dif_x=0,col_dif_y=0;

    switch (direction) {
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

    return {
        'col_dif_x': col_dif_x,
        'col_dif_y': col_dif_y
    };
}

function check_collission(direction_Do_Ri_Le="",la_class,n=1){
    let chks = true;
    let miFicha = $(la_class).filter(function() {return $(this).hasClass("eje") == false;});

    // $(".borrame").remove();

    miFicha.each(function (index,value) {
        let posx = $(this).css('grid-column-start');
        let posy = $(this).css('grid-row-start');

        let { col_dif_x, col_dif_y } = look_in_direction(direction_Do_Ri_Le);

        let collis = $('.bloque').filter(function() {return $(this).css('grid-column-start') == Number(posx)+(col_dif_x*n);});
        collis = $(collis).filter(function() {return $(this).css('grid-row-start') == Number(posy)+(col_dif_y*n);});

        if ($(collis).length>0){
            chks = false;
        }
    })

    return chks;    
}

function take_to_infinity(la_class){ //it returns N, the number of Down moves the piece can do
    let n=0;
    for (let i=1;i<99;i++){
        if (check_collission("Do",la_class,i)){
            n++;
        } else {
            break;
        }
    }
    return n;
}

function mueve_ficha(direction_Do_Ri_Le="",la_key,la_class=".ficha"){
    //assumption: if string_based key is provided, let's ignore the key.
    //if string_based key is "", let's figure out the string_based based on the key.
    if (direction_Do_Ri_Le == ""){
        switch (la_key) {
            case 'ArrowRight':
                direction_Do_Ri_Le = "Ri";
                break;
            case 'ArrowLeft':
                direction_Do_Ri_Le = "Le";
                break;
            // case 'ArrowUp':
            //     direction_Do_Ri_Le = "Up";
            //     break;
            case 'ArrowDown':
                direction_Do_Ri_Le = "Do";
                break;    
            case 'Space':
                direction_Do_Ri_Le = "Space";
                break;    
            default:
                break;
        }
    }

    let { col_dif_x, col_dif_y } = look_in_direction(direction_Do_Ri_Le);
    let n=0;
    
    if (direction_Do_Ri_Le=="Space") {
        n = take_to_infinity(la_class);
    } else {
        // SI ME QUIERO MOVER 1 POSICION, ENTONCES HAGO LO DE ANTES (ARREGLAR EL TEMA DE LA RECUR)
        if (check_collission(direction_Do_Ri_Le,la_class)){
            n = 1;
        } else {
            if (direction_Do_Ri_Le=="Do"){ //ohhhhh, has intentado ir hacia abajo y no has podido, asi que siguiente ficha!
                $(".eje").remove();
                $(".ficha").addClass("bloque").removeClass("ficha");
                $(".dropghost").remove();
                $(".bloque").click(function(){
                    $(this).remove();
                    $(".dropghost").remove();
                    create_dropghost(); 
                });

                clean_tetris();
                setTimeout(()=>{ficha_creator();},800);
                return;
            }
        }
    }

    let miFicha = document.querySelectorAll(la_class);
       
    col_dif_x = col_dif_x * n;
    col_dif_y = col_dif_y * n;

    if (direction_Do_Ri_Le!="Do" && direction_Do_Ri_Le!="Space") {
        $(".dropghost").remove();
    }
    miFicha.forEach(blq => {
        $(blq).css("grid-column-start",Number($(blq).css("grid-column-start"))+col_dif_x);
        $(blq).css("grid-column-end",Number($(blq).css("grid-column-end"))+col_dif_x);
        $(blq).css("grid-row-start",Number($(blq).css("grid-row-start"))+col_dif_y);
        $(blq).css("grid-row-end",Number($(blq).css("grid-row-end"))+col_dif_y);
    })
    if (n>1){
        let elsound = new Audio();
        elsound.src = "fall_v2.mp3"
        elsound.play();
    }
    if (direction_Do_Ri_Le!="Do" && direction_Do_Ri_Le!="Space") {
        create_dropghost();
    }
}

function rota_ficha(){ //currently designed for Tetris Fichas... we will see if needed to generalise it
    // quick solution would be to provide the ficha, instead of looking for it in a fixed way
    // that will imply rota ficha and bloque in the theoretical scope, and a ad-hoc function paints it in Tetris. Then 
    // we can use that in Algorithm, for instance (maybe not needed!!!!)
    if (check_surroundings()) {
        miFicha = document.querySelectorAll(".ficha");
        let miEje = document.querySelectorAll(".ficha.eje");

        $(".dropghost").remove();

        miFicha.forEach(blq => {rota_bloque(blq,miEje);})

        make_borders();
        create_dropghost();

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

    //aqui se están aplicando las cuatro reglas para una rotacion segun reloj.^>v<
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


function ficha_creator(ficha_num=-1){

    let ficha_catalog = JSON.parse('[[[0,0]],[[1,0],[0,0]],[[1,0],[0,0],[1,1]],[[1,0],[0,0],[2,0]],[[1,0],[0,0],[1,1],[2,0]],[[2,0],[1,0],[2,1],[0,0]],[[1,0],[0,0],[1,1],[0,1]],[[1,1],[0,1],[1,2],[0,0]],[[1,0],[0,0],[1,1],[1,2]],[[1,0],[0,0],[1,1],[2,1]],[[2,0],[1,0],[3,0],[0,0]],[[1,1],[0,1],[1,2],[2,1],[1,0]],[[2,0],[1,0],[2,1],[3,0],[0,0]],[[1,0],[0,0],[1,1],[2,0],[0,1]],[[1,1],[0,1],[1,2],[2,1],[0,0]],[[1,0],[0,0],[1,1],[2,0],[1,2]],[[1,0],[0,0],[1,1],[2,0],[2,1]],[[1,0],[0,0],[1,1],[2,0],[3,0]],[[1,1],[0,1],[1,2],[2,1],[2,0]],[[2,0],[1,0],[2,1],[0,0],[2,2]],[[2,0],[1,0],[2,1],[0,0],[3,1]],[[3,0],[2,0],[3,1],[1,0],[0,0]],[[2,0],[1,0],[2,1],[0,0],[0,1]],[[2,1],[1,1],[2,2],[0,1],[0,0]],[[1,1],[0,1],[1,2],[0,0],[1,3]],[[1,1],[0,1],[1,2],[0,0],[2,2]],[[1,0],[0,0],[1,1],[1,2],[1,3]],[[1,0],[0,0],[1,1],[1,2],[2,2]],[[2,0],[1,0],[3,0],[0,0],[4,0]]]');
    let num_catalog = ficha_catalog.length - 1; //18

    if (ficha_num==-1) { //just in case we want some specific ficha
        ficha_num = rand0to(num_catalog);
    }

    miFicha = ficha_catalog[ficha_num];

    if (ficha_num==99){
        $(".ficha").clone(false).addClass("ghost").removeClass("ficha").appendTo(".the_grid");
    } else {
        miFichaNum=ficha_num;
        // pintaBloques(el_color, "ficha", miFicha);
        NEW_pintaBloques(miFicha,"ficha","random",".the_grid",5,2,true,true);
        make_borders(".ficha");
        create_dropghost();
        $(".ficha").click(function(){
            $(this).remove();
            make_borders(".ficha");
            $(".dropghost").remove();
            create_dropghost();
        });
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
            $(".ficha").remove(); ficha_creator(15);
        } else {
            mueve_ficha("",event.code,".ficha");
        }
        // console.log(event);
    });

    window.addEventListener("resize", recalculate_grid_size);



    repintaBordes();

    $(".bloque").click(function(){
        $(this).remove();
    });

    ficha_creator();

    setInterval(()=>{mueve_ficha(direction_Do_Ri_Le="Do")},450);
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

    ficha_creator(99); //99=clone

    let miGhost = document.querySelectorAll(".ghost");
    let miGhost_eje = document.querySelectorAll(".ghost.eje");

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

function repintaBordes(){
    // console.log($(".the_grid").css("grid-template-columns"));
    $(".bloque").remove();

    let num_cols = $(".the_grid").css("grid-template-columns").split(" ").length;
    let num_rows = $(".the_grid").css("grid-template-rows").split(" ").length;

    for (let i=1;i<num_rows+1;i++){
        NEW_pintaBloques([[1,i]],"border bloque","white",".the_grid",0,0,false,false);
        NEW_pintaBloques([[num_cols,i]],"border bloque","white",".the_grid",0,0,false,false);
    }
    for (let i=1;i<num_cols+1;i++){
        NEW_pintaBloques([[i,1]],"border bloque","white",".the_grid",0,0,false,false);
        NEW_pintaBloques([[i,num_rows]],"border bloque","white",".the_grid",0,0,false,false);
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
    
    let new_grid_height = page_height - topmenu_height - 10;
    let new_blocks_height_width = Math.floor(new_grid_height / (actual_grid_rows_count));

    document.querySelector(':root').style.setProperty('--block-height-width',new_blocks_height_width);

}

function play_tetris_music() {
    let elsound = new Audio();
    elsound.src = "tetris_v2.mp3";
    elsound.play();
}



function create_dropghost(){
    $(".ficha").clone(false).addClass("dropghost").removeClass("ficha").appendTo(".the_grid");
    $(".dropghost.eje").remove();
    drop_theghost();
}

function drop_theghost(){
    mueve_ficha("Space",null,".dropghost",false);
}


main();