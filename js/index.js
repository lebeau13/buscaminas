const dificultad = 8;
var fil = 0;
var col = 0;

function inicializaMatriz() {
    var cuadricula = [];

    for (let index = 0; index < dificultad; index++) {
        cuadricula[index] = [0, 0, 0, 0, 0, 0, 0, 0];
    }
    return cuadricula;
}

function cargarTablero() {
    var modal = document.getElementById("myModal");
    var minas = inicializaMatriz();
    const tablerominas = document.getElementById('tablerominas')
    const contador = document.getElementById('contador')
    contador.textContent = dificultad


    var tiempo = 0;
    var temporizador = document.getElementById("temporizador");
    window.setInterval(function () {
        temporizador.innerHTML = tiempo;
        tiempo++;
    }, 1000);

    for (var i = 0; i < dificultad; i++) {
        for (var j = 0; j < dificultad; j++) {
            var div = document.createElement("div");
            div.id = i + "" + j;
            div.setAttribute('class', 'casilla')
            div.setAttribute('class', 'casilla')
            div.addEventListener("click", mostrarNumero, true);
            div.addEventListener("contextmenu", bandera, true);

            tablerominas.appendChild(div);
        }

    }

    function bandera(div) {

        var auxstr = this.id.split("");
        var myid = auxstr[0] + auxstr[1];
        divObj = document.getElementById(myid);

        if (divObj.style.backgroundColor != "white") {
            divObj.classList.add("bandera");
        }

        window.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        }, false);
        ganar();
    }

    function mostrarNumero() {

        var auxstr = this.id.split("");
        var myid = auxstr[0] + auxstr[1];
        divObj = document.getElementById(myid);

        if (minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] == 0) {
            divObj.style.backgroundColor = "white";
            abrirAlrededor(parseInt(auxstr[0], 10), parseInt(auxstr[1], 10), minas);
        }

        else {
            if (minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] != "*") {
                document.getElementById(myid).innerHTML = "<p style='margin-top:0px;'>" + minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] + "</p>";
                divObj.style.backgroundColor = "white";
            } else {
                divObj.classList.add("mina");
                modal.style.display = "block";
            }
        }
        ganar();
    }

    function bombasAlrededor(tablero) {
        const dificultad = 8;
        for (var i = 0; i < dificultad; i++) {
            for (var j = 0; j < dificultad; j++) {
                if (tablero[i][j] == "*") {
                    if (i == 0 && j == 0) {
                        NumeroBombas(i, j, i + 1, j + 1, tablero);
                    }
                    else if (i == 0 && (j > 0 && j < 7)) {
                        NumeroBombas(i, j - 1, i + 1, j + 1, tablero);
                    }
                    else if (i == 0 && j == 7) {
                        NumeroBombas(i, j - 1, i + 1, j, tablero);
                    }
                    else if (j == 7 && (i > 0 && i < 7)) {
                        NumeroBombas(i - 1, j - 1, i + 1, j, tablero);
                    }
                    else if (i == 7 && j == 7) {
                        NumeroBombas(i - 1, j - 1, i, j, tablero);
                    }
                    else if (i == 7 && (j > 0 && j < 7)) {
                        NumeroBombas(i - 1, j - 1, i, j + 1, tablero);
                    }
                    else if (i == 7 && j == 0) {
                        NumeroBombas(i - 1, j, i, j + 1, tablero);
                    }
                    else if (j == 0 && (i > 0 && i < 7)) {
                        NumeroBombas(i - 1, j, i + 1, j + 1, tablero);
                    } else {
                        NumeroBombas(i - 1, j - 1, i + 1, j + 1, tablero);
                    }
                }
            }
        }
    }

    function NumeroBombas(vari, varj, fini, finj, tablero) {
        for (var i = vari; i <= fini; i++) {
            for (var j = varj; j <= finj; j++) {
                if (tablero[i][j] != "*") {
                    tablero[i][j] = (parseInt(tablero[i][j]) + 1);
                }
            }
        }
    }

    function aleatorioBombas(tablero) {

        fil = Math.floor((Math.random() * 7) + 0);
        col = Math.floor((Math.random() * 7) + 0);

        for (var i = 0; i < dificultad; i++) {
            while (tablero[fil][col] == "*") {
                fil = Math.floor((Math.random() * 7) + 0);
                col = Math.floor((Math.random() * 7) + 0);
            }
            tablero[fil][col] = "*";
        }

    }

    function islas(vari, varj, fini, finj, cori, corj, tablero) {
        for (var i = vari; i <= fini; i++) {
            for (var j = varj; j <= finj; j++) {
                var myid = i + "" + j;
                var objDiv = document.getElementById(myid)
                if (objDiv.textContent == "") {
                    if (tablero[i][j] == 0) {
                        if (i == cori && j == corj) {
                            objDiv.textContent = "";
                            objDiv.style.backgroundColor = "white";
                        } else {
                            if (objDiv.style.backgroundColor != "white") {
                                abrirAlrededor(i, j, tablero);
                            }
                        }

                    } else {
                        if (tablero[i][j] != "*") {
                            document.getElementById(myid).innerHTML = "<p style='margin-top:0px;'>" + tablero[i][j] + "</p>";
                            objDiv.style.backgroundColor = "white";
                        }
                    }
                }
            }
        }
    }

    function abrirAlrededor(hori, horj, tablero) {
        if (hori == 0 && horj == 0) {
            islas(hori, horj, hori + 1, horj + 1, hori, horj, tablero);
        }
        else if (hori == 0 && (horj > 0 && horj < 7)) {
            islas(hori, horj - 1, hori + 1, horj + 1, hori, horj, tablero);
        }
        else if (hori == 0 && horj == 7) {
            islas(hori, horj - 1, hori + 1, horj, hori, horj, tablero);
        }
        else if (horj == 7 && (hori > 0 && hori < 7)) {
            islas(hori - 1, horj - 1, hori + 1, horj, hori, horj, tablero);
        }
        else if (hori == 7 && horj == 7) {
            islas(hori - 1, horj - 1, hori, horj, hori, horj, tablero);
        }
        else if (hori == 7 && (horj > 0 && horj < 7)) {
            islas(hori - 1, horj - 1, hori, horj + 1, hori, horj, tablero);
        }
        else if (hori == 7 && horj == 0) {
            islas(hori - 1, horj, hori, horj + 1, hori, horj, tablero);
        }
        else if (horj == 0 && (hori > 0 && hori < 7)) {
            islas(hori - 1, horj, hori + 1, horj + 1, hori, horj, tablero);
        } else {
            islas(hori - 1, horj - 1, hori + 1, horj + 1, hori, horj, tablero);
        }
    }

    aleatorioBombas(minas);
    bombasAlrededor(minas);

}

function ganar() {
    var modal = document.getElementById("ganaste");
    var conteo = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {

            divid = i + "" + j;
            divObj = document.getElementById(divid);
            if (divObj.style.backgroundColor == "white") {
                conteo = conteo + 1;
            }
        }
    }
    if (conteo == 56) {
        ganaste.style.display = "block";
    }
}

window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}