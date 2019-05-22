
function desenharGrafico() {
    let largura = document.getElementById("bar-width").value;
    console.log("[largura]", largura);
    if (!largura) {
        alert("largura nao informada");
        return;
    }

    let inputsAltura = document.getElementsByClassName("input-bar");
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < bars.length; i++) {
        bars[i].style.display = "inline-block";
        bars[i].style.setProperty("width",largura + "px");

        console.log("[value]", inputsAltura[i].value);
        if (inputsAltura[i].value != null) {
            bars[i].style.setProperty("height", inputsAltura[i].value + "px");
        }

        console.log(bars[i]);
    }
}