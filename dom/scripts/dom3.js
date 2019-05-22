addEventListener("mousemove", function (event) {
    if(document.body.children.length >= 8){
        console.log("[REM]", document.body.children.length, document.body.firstChild);
        document.body.removeChild(document.body.firstChild);
    }
    var dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (event.pageX - 4) + "px";
    dot.style.top = (event.pageY - 4) + "px";
    dot.style.position = "absolute";
    document.body.appendChild(dot);
});