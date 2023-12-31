var bloques_proc = []; //JSON.parse("[[[1,1],[0,1],[1,2],[2,1],[1,0]],[[2,0],[1,0],[2,1],[3,0],[0,0]],[[1,0],[0,0],[1,1],[2,0],[0,1]],[[1,1],[0,1],[1,2],[2,1],[0,0]],[[1,0],[0,0],[1,1],[2,0],[1,2]],[[1,0],[0,0],[1,1],[2,0],[2,1]],[[1,0],[0,0],[1,1],[2,0],[3,0]],[[1,1],[0,1],[1,2],[2,1],[2,0]],[[2,0],[1,0],[2,1],[0,0],[2,2]],[[2,0],[1,0],[2,1],[0,0],[3,1]],[[3,0],[2,0],[3,1],[1,0],[0,0]],[[2,0],[1,0],[2,1],[0,0],[0,1]],[[2,1],[1,1],[2,2],[0,1],[0,0]],[[1,1],[0,1],[1,2],[0,0],[1,3]],[[1,1],[0,1],[1,2],[0,0],[2,2]],[[1,0],[0,0],[1,1],[1,2],[1,3]],[[1,0],[0,0],[1,1],[1,2],[2,2]],[[2,0],[1,0],[3,0],[0,0],[4,0]]]");
var order_num = 5;

var llevo_pintado = 0;

function recur_search(bloque_call){
    let bloque_raiz = JSON.parse(JSON.stringify(bloque_call));
    let num = bloque_raiz.length;
    if (num==order_num) {
        let bloque_simple = simplify_bloque(bloque_raiz);
        let bloque_giro1, bloque_giro2, bloque_giro3;
        bloque_giro1 = simplify_bloque(rota_poly(bloque_simple));
        bloque_giro2 = simplify_bloque(rota_poly(rota_poly(bloque_simple)));
        bloque_giro3 = simplify_bloque(rota_poly(rota_poly(rota_poly(bloque_simple))));

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
            llevo_pintado++;
        }
        return;
    } else if (num>order_num) {
        return;
    }

    for(let i=0;i<num;i++){ //recorremos todos los bloques raiz
        for(let j=1;j<5;j++){ //cuatro costados por cada bloque

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

    // check_vecinos_ficha();
}


function poly_main(order=3){
    bloques_proc = [];
    order_num = order;
    recur_search([[0,0]]);
    vamos_pintando_en_grids();
}