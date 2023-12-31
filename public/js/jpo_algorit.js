
bloques_proc = [];
order_num = 5;
recur_search([[0,0]]);
pintalos()

function pintalos(){
    let num = bloques_proc.length;

    pinta3(".sec_grid",bloques_proc[Math.floor(Math.random()*num)]);

}


function pinta3(la_class="",losBloques=[]){ //nueva funcion tomando bloques json
    
    let elcolor = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
  
    let min_x=99;
    let min_y=99;
    let max_x=-99;
    let max_y=-99;

    losBloques.forEach(blq => {
        let bloq = document.createElement("div");
        $(bloq).addClass("bloque");
        $(bloq).css("grid-row-start", blq[1]+1);
        $(bloq).css("grid-row-end", blq[1]+1+1);
        $(bloq).css("grid-column-start",blq[0]+1);
        $(bloq).css("grid-column-end", blq[0]+1+1);
        $(bloq).css("background-color", elcolor);
        $(la_class).append(bloq);
    });


    losBloques.forEach(blq => {
        min_x = Math.min(min_x, blq[0]);
        min_y = Math.min(min_y, blq[1]);
        max_x = Math.max(max_x, blq[0]);
        max_y = Math.max(max_y, blq[1]);
    });

    //calculamos un eje aproximado

    let mid_x = Math.floor((min_x + max_x) / 2)+1;
    let mid_y = Math.floor((min_y + max_y) / 2)+1; //+1 since 0 means col 1.


    $(".bloque").remove();

    losBloques.forEach(blq => {
        let bloq = document.createElement("div");
        $(bloq).addClass("bloque");
        $(bloq).css("grid-row-start", (5-mid_y) + blq[1]+1);
        $(bloq).css("grid-row-end", (5-mid_y) + blq[1]+1+1);
        $(bloq).css("grid-column-start",(5-mid_x) + blq[0]+1);
        $(bloq).css("grid-column-end", (5-mid_x) + blq[0]+1+1); //+5 since the center is [5,5]
        $(bloq).css("background-color", elcolor);
        $(la_class).append(bloq);
    });

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




}