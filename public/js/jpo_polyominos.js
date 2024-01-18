
var bloques_proc = []; //JSON.parse("[[[1,1],[0,1],[1,2],[2,1],[1,0]],[[2,0],[1,0],[2,1],[3,0],[0,0]],[[1,0],[0,0],[1,1],[2,0],[0,1]],[[1,1],[0,1],[1,2],[2,1],[0,0]],[[1,0],[0,0],[1,1],[2,0],[1,2]],[[1,0],[0,0],[1,1],[2,0],[2,1]],[[1,0],[0,0],[1,1],[2,0],[3,0]],[[1,1],[0,1],[1,2],[2,1],[2,0]],[[2,0],[1,0],[2,1],[0,0],[2,2]],[[2,0],[1,0],[2,1],[0,0],[3,1]],[[3,0],[2,0],[3,1],[1,0],[0,0]],[[2,0],[1,0],[2,1],[0,0],[0,1]],[[2,1],[1,1],[2,2],[0,1],[0,0]],[[1,1],[0,1],[1,2],[0,0],[1,3]],[[1,1],[0,1],[1,2],[0,0],[2,2]],[[1,0],[0,0],[1,1],[1,2],[1,3]],[[1,0],[0,0],[1,1],[1,2],[2,2]],[[2,0],[1,0],[3,0],[0,0],[4,0]]]");
var order_num = 5;

var process_pipe = [];
var outcome_pipe = [];
var outcome_pipe_aux = []; //includes all the rotations of the outcome 

var llevo_pintado = 0;

recur_search([[0,0]]);

function recur_search(bloque_call){
    let bloque_raiz = JSON.parse(JSON.stringify(bloque_call)); // pura copia del bloque sin alterarlo
    let num = bloque_raiz.length;
    if (num==order_num) {
        //aqui ya nos molestamos en comparar.... pero es antes!!
        //antes de empezar a mirar un bloque raiz, habrá que ver si ya existe. 
        let bloque_simple = simplify_bloque(bloque_raiz);
        let bloque_giro1, bloque_giro2, bloque_giro3; //rota_poly should be GENERALLLLLL
        bloque_giro1 = simplify_bloque(rota_poly(bloque_simple));
        bloque_giro2 = simplify_bloque(rota_poly(rota_poly(bloque_simple)));
        bloque_giro3 = simplify_bloque(rota_poly(rota_poly(rota_poly(bloque_simple))));

        //no existe en array, TAMBIENNNNNNN GENERALLLLLLLLLL
        let check1 = no_existe_en_array(bloques_proc,bloque_simple);
        let check2 = no_existe_en_array(bloques_proc,bloque_giro1);
        let check3 = no_existe_en_array(bloques_proc,bloque_giro2);
        let check4 = no_existe_en_array(bloques_proc,bloque_giro3);

        if (check1 && check2 && check3 && check4){
            bloques_proc.push(bloque_simple);

            // $(".pinta").remove();
            // let la_class = "pinta";

            // let cursor_x = ((llevo_pintado % 12) * 8) + 1;
            // // let cursor_y = (llevo_pintado * 6) + 1;
            // let filas = Math.floor(llevo_pintado / 12);
            // let cursor_y = (filas * 8) + 4;

            // let miFicha = [new Bloque(bloque_simple[0][0]+cursor_x,bloque_simple[0][1]+cursor_y,1,1,la_class),
            //             new Bloque(bloque_simple[1][0]+cursor_x,bloque_simple[1][1]+cursor_y,1,1,la_class),
            //             new Bloque(bloque_simple[2][0]+cursor_x,bloque_simple[2][1]+cursor_y,1,1,la_class),
            //             new Bloque(bloque_simple[3][0]+cursor_x,bloque_simple[3][1]+cursor_y,1,1,la_class),
            //             new Bloque(bloque_simple[4][0]+cursor_x,bloque_simple[4][1]+cursor_y,1,1,la_class)]
            //             // new Bloque(bloque_simple[5][0]+cursor_x,bloque_simple[5][1]+cursor_y,1,1,la_class)]
            //             // new Bloque(bloque_simple[6][0]+cursor_x,bloque_simple[6][1]+cursor_y,1,1,la_class)]

            // pintaBloques("rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")","sinid",miFicha);
            
            // Se puede ir pintando el bloque raiz
            // Funcion que coge el bloque a PINTAR y ajusta el número de rows/cols en la grid destino?
            ajusta_poly_grid(bloque_raiz);
            clean_poly_grid();
            NEW_pintaBloques(bloque_raiz,"bloque",undefined,".poly_grid",2,2,false);

            llevo_pintado++;
        }
        return;
    } else if (num>order_num) {
        return;
    }

    for(let i=0;i<num;i++){ //recorremos todos los bloques raiz
        for(let j=1;j<5;j++){ //cuatro costados por cada bloque
            // aqui habria que empezar a trocear el algoritmo para que sus pasos puedan ir lanzandose manualmente, salvo que haya un automatismo que vaya dandole caña cada 1 segs.
            // idea: algoritmo pausado: siempre el mismo, pero que deje variables globales listas para el siguiente step?? chung--
            //porque se basa en una cola que no quieres mantener tu,.

            let new_bloques = JSON.parse(JSON.stringify(bloque_raiz));

            if (new_bloques.length<order_num) {

                let x,y;

                switch (j) {
                    case 1:
                        //[-1,0]
                        x = bloque_raiz[i][0] - 1;
                        y = bloque_raiz[i][1];
                        break;
                    case 2:
                        //[0,1]
                        x = bloque_raiz[i][0];
                        y = bloque_raiz[i][1] + 1;
                        break;
                    case 3:
                        //[1,0]
                        x = bloque_raiz[i][0] + 1;
                        y = bloque_raiz[i][1];
                        break;
                    case 4:
                        //[0,-1]
                        x = bloque_raiz[i][0];
                        y = bloque_raiz[i][1] - 1;
                        break;
                    default:
                        break;
                }

                if (no_existe_en_array(new_bloques,[x,y])){
                    let bloque_test = JSON.parse(JSON.stringify(new_bloques));
                    bloque_test.push([x,y]);
                    recur_search(bloque_test);
                }
            
            }
        }
    }
    
}

function recur_search22222222(bloque_call){
    let bloque_raiz = JSON.parse(JSON.stringify(bloque_call)); // pura copia del bloque sin alterarlo
    let num = bloque_raiz.length;
    if (num==order_num) {
        //aqui ya nos molestamos en comparar.... pero es antes!!
        //antes de empezar a mirar un bloque raiz, habrá que ver si ya existe. 
        let bloque_simple = simplify_bloque(bloque_raiz);
        let bloque_giro1, bloque_giro2, bloque_giro3; //rota_poly should be GENERALLLLLL
        bloque_giro1 = simplify_bloque(rota_poly(bloque_simple));
        bloque_giro2 = simplify_bloque(rota_poly(rota_poly(bloque_simple)));
        bloque_giro3 = simplify_bloque(rota_poly(rota_poly(rota_poly(bloque_simple))));

        //no existe en array, TAMBIENNNNNNN GENERALLLLLLLLLL
        let check1 = no_existe_en_array(bloques_proc,bloque_simple);
        let check2 = no_existe_en_array(bloques_proc,bloque_giro1);
        let check3 = no_existe_en_array(bloques_proc,bloque_giro2);
        let check4 = no_existe_en_array(bloques_proc,bloque_giro3);

        if (check1 && check2 && check3 && check4){
            bloques_proc.push(bloque_simple);

            // $(".pinta").remove();
            // let la_class = "pinta";

            // let cursor_x = ((llevo_pintado % 12) * 8) + 1;
            // // let cursor_y = (llevo_pintado * 6) + 1;
            // let filas = Math.floor(llevo_pintado / 12);
            // let cursor_y = (filas * 8) + 4;

            // let miFicha = [new Bloque(bloque_simple[0][0]+cursor_x,bloque_simple[0][1]+cursor_y,1,1,la_class),
            //             new Bloque(bloque_simple[1][0]+cursor_x,bloque_simple[1][1]+cursor_y,1,1,la_class),
            //             new Bloque(bloque_simple[2][0]+cursor_x,bloque_simple[2][1]+cursor_y,1,1,la_class),
            //             new Bloque(bloque_simple[3][0]+cursor_x,bloque_simple[3][1]+cursor_y,1,1,la_class),
            //             new Bloque(bloque_simple[4][0]+cursor_x,bloque_simple[4][1]+cursor_y,1,1,la_class)]
            //             // new Bloque(bloque_simple[5][0]+cursor_x,bloque_simple[5][1]+cursor_y,1,1,la_class)]
            //             // new Bloque(bloque_simple[6][0]+cursor_x,bloque_simple[6][1]+cursor_y,1,1,la_class)]

            // pintaBloques("rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")","sinid",miFicha);
            
            // Se puede ir pintando el bloque raiz
            // Funcion que coge el bloque a PINTAR y ajusta el número de rows/cols en la grid destino?
            ajusta_poly_grid(bloque_raiz);
            clean_poly_grid();
            NEW_pintaBloques(bloque_raiz,"bloque",undefined,".poly_grid",2,2,false);

            llevo_pintado++;
        }
        return;
    } else if (num>order_num) {
        return;
    }

    for(let i=0;i<num;i++){ //recorremos todos los bloques raiz
        for(let j=1;j<5;j++){ //cuatro costados por cada bloque
            // aqui habria que empezar a trocear el algoritmo para que sus pasos puedan ir lanzandose manualmente, salvo que haya un automatismo que vaya dandole caña cada 1 segs.
            // idea: algoritmo pausado: siempre el mismo, pero que deje variables globales listas para el siguiente step?? chung--
            //porque se basa en una cola que no quieres mantener tu,.

            let new_bloques = JSON.parse(JSON.stringify(bloque_raiz));

            if (new_bloques.length<order_num) {

                let x,y;

                switch (j) {
                    case 1:
                        //[-1,0]
                        x = bloque_raiz[i][0] - 1;
                        y = bloque_raiz[i][1];
                        break;
                    case 2:
                        //[0,1]
                        x = bloque_raiz[i][0];
                        y = bloque_raiz[i][1] + 1;
                        break;
                    case 3:
                        //[1,0]
                        x = bloque_raiz[i][0] + 1;
                        y = bloque_raiz[i][1];
                        break;
                    case 4:
                        //[0,-1]
                        x = bloque_raiz[i][0];
                        y = bloque_raiz[i][1] - 1;
                        break;
                    default:
                        break;
                }

                if (no_existe_en_array(new_bloques,[x,y])){
                    let bloque_test = JSON.parse(JSON.stringify(new_bloques));
                    bloque_test.push([x,y]);
                    recur_search(bloque_test);
                }
            
            }
        }
    }
    
}

function simplify_bloque(bloque){
    let num = bloque.length;

    let min_X=99;
    let min_Y=99;

    let elmenor;
    
    for (let i=0;i<num;i++){
        min_X = Math.min(min_X, bloque[i][0]);
        min_Y = Math.min(min_Y, bloque[i][1]);       
    }

    let simplified=[];

    let new_X, new_Y;

    for (let i=0;i<num;i++){
        new_X = bloque[i][0] - min_X;
        new_Y = bloque[i][1] - min_Y;
        simplified.push([new_X,new_Y]);
    }
    return simplified;
}

function no_existe_en_array(elarray=[],elemento=[]){

    if (elemento[0].constructor == Array){ //busco ficha en array
        for (let i=0;i<elarray.length;i++){ //La i es la primera ficha del array
            let checks=0;
            for (let l=0;l<elarray[i].length;l++){ // La l es la primera pieza de la ficha

                for (let j=0;j<elemento.length;j++){ // La j es la primera pieza del elemento
                // for (let k=0;k<elemento[j].length;k++){
                        // console.log(JSON.stringify(elarray[i][l])+"_vs_"+JSON.stringify(elemento[j]));
                        if (JSON.stringify(elarray[i][l])===JSON.stringify(elemento[j])) {
                            checks++;
                            j=elemento.length;
                        }
                }
                // }
            }
            if (checks==elemento.length) {
                return false;
            }
        }
    } else { //busco bloque en pieza en construccion
        for (let i=0;i<elarray.length;i++){
            if (JSON.stringify(elarray[i])===JSON.stringify(elemento)) {
                return false;
            }
        }
    }
    return true;
}

function rota_poly(bloque_simple){ // claramente no tiene que haber dos.. rota_poly == rota_bloque
    let num = bloque_simple.length;
    let bloque_girado =[];

    for (let i=0;i<num;i++){      
    
        let posx = bloque_simple[i][0];
        let posy = bloque_simple[i][1];

        let posx_eje = 0;
        let posy_eje = 0;

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

        bloque_girado.push([posx,posy]);
    }

    return bloque_girado;



}


function write_json(){

    fs.writeFile("order" + order_num + "_Polyominos.json", JSON.stringify(bloques_proc), (err) => {
      if (err) throw err;
      console.log("The JSON has been saved!");
    });
}

function alert_json(){

    window.alert(JSON.stringify(bloques_proc));
}

function vamos_pintando_en_grids(){
    let num = bloques_proc.length;

    for(let i=0;i<num;i++){
        pintaBloques("col-3 g-0 a_grid",bloques_proc[i]);
    }
}

function pintaBloques(la_class="",losBloques=[]){ //nueva funcion tomando bloques json
    
    let elcolor = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
    
    let another_grid = document.createElement("div");
    $(another_grid).addClass(la_class);
    
    losBloques.forEach(blq => {
        let bloq = document.createElement("div");
        $(bloq).addClass("bloque");
        $(bloq).css("grid-row-start", blq[1]+1);
        $(bloq).css("grid-row-end", blq[1]+1+1);
        $(bloq).css("grid-column-start",blq[0]+1);
        $(bloq).css("grid-column-end", blq[0]+1+1);
        $(bloq).css("background-color", elcolor);
        $(another_grid).append(bloq);
    });


    $("#parrilla").append(another_grid);

    // $(".ficha").click(rota_ficha);

    // make_borders_ficha();
}


function poly_main(order=3){
    // bloques_proc = [];
    order_num = order;
    recur_search([[0,0]]);
    vamos_pintando_en_grids();
}


function ajusta_poly_grid(bloques_pintar){
    let {ancho, alto, eje } = dame_ancho_alto_eje(bloques_pintar);
    let curr_rows_cols = getComputedStyle(document.documentElement).getPropertyValue('--poly_grid_rows_cols');
    let new_rows_cols = Math.max(ancho, alto);
    if (new_rows_cols>Number(curr_rows_cols)){
        document.querySelector(':root').style.setProperty('--poly_grid_rows_cols',new_rows_cols);
    }
}

function clean_poly_grid(){
    $(".poly_grid > .bloque").remove();
}


function push_this_to_process(losBloques=[[0,0]]){
    //The process step process the first item in the process pipeline.
    process_pipe.push(simplify_bloque(losBloques));
    // Processing itself is not done here.


    bloque_giro1 = simplify_bloque(rota_poly(losBloques));
    bloque_giro2 = simplify_bloque(rota_poly(rota_poly(losBloques)));
    bloque_giro3 = simplify_bloque(rota_poly(rota_poly(rota_poly(losBloques))));
}


function process_first_in_the_pipe(){
    //This grab the first element on the pipe, removes it from there, and...
    // Create 4 versions of it, in a simplified MODE.
    // Checks for each of them if they exists in the AUX outcome pipeline.
    // Each of the four not existing in the AUX pipe, are included in the 1) outcome pipe 2) three rotations of it also included in the AUX 3) that outcome also included in the processing pipe.

    let num_p = process_pipe.length;
    if (num_p==0){ return;}
    
    let bloq_to_process = process_pipe.shift(); // the first item is retrieved, and deleted from the pipe.
    let num_b = bloq_to_process.length;
    //probably the momento to update the visualisation of the pipe! Later..

    if (num_b<=order_num) {
        if (no_existe_en_array(outcome_pipe_aux,bloq_to_process)){
            outcome_pipe.push(bloq_to_process); //Yii-ja
            outcome_pipe_aux.push(bloq_to_process); //Yii-ja. Already simplified.
            let bloque_rotado = JSON.parse(JSON.stringify(bloq_to_process));
            for (let j=0;j<2;j++){ // 3 rotaciones extra
                bloque_rotado = JSON.parse(JSON.stringify(simplify_bloque(rota_poly(bloque_rotado))));
                if (no_existe_en_array(outcome_pipe_aux,bloque_rotado)){
                    outcome_pipe_aux.push(bloque_rotado);
                }
            }
        }
    }

    if (num_b!=order_num) {
        if (num_b>order_num) {
            return; //we should never be here..... but just in case
        } else { //minor than our order. Let's keep adding more!

            //THIS WAS THE ORIGINAL: ADAPT: WE WANT 4 ITERATIONS PER BLOQ (N!)!
            for(let i=0;i<num_b;i++){ //recorremos todos los bloques raiz
                for(let j=1;j<5;j++){ //cuatro costados por cada bloque
                    // aqui habria que empezar a trocear el algoritmo para que sus pasos puedan ir lanzandose manualmente, salvo que haya un automatismo que vaya dandole caña cada 1 segs.
                    // idea: algoritmo pausado: siempre el mismo, pero que deje variables globales listas para el siguiente step?? chung--
                    //porque se basa en una cola que no quieres mantener tu,.

                    let x,y;

                    switch (j) {
                        case 1:
                            //[-1,0]
                            x = bloq_to_process[i][0] - 1;
                            y = bloq_to_process[i][1];
                            break;
                        case 2:
                            //[0,1]
                            x = bloq_to_process[i][0];
                            y = bloq_to_process[i][1] + 1;
                            break;
                        case 3:
                            //[1,0]
                            x = bloq_to_process[i][0] + 1;
                            y = bloq_to_process[i][1];
                            break;
                        case 4:
                            //[0,-1]
                            x = bloq_to_process[i][0];
                            y = bloq_to_process[i][1] - 1;
                            break;
                        default:
                            break;
                    }

                    if (no_existe_en_array(bloq_to_process,[x,y])){
                        let next_bloq = JSON.parse(JSON.stringify(bloq_to_process));
                        next_bloq.push([x,y]);
                        push_this_to_process(next_bloq);
                    }
                }
            }
        }
    }
}