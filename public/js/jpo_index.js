function left_show_hide(){
    document.getElementById("my_sidebar_left").classList.toggle("active");
    document.getElementById("my_sidebar_right").classList.remove("active");
}

function right_show_hide(){
    document.getElementById("my_sidebar_right").classList.toggle("active");
    document.getElementById("my_sidebar_left").classList.remove("active");
}