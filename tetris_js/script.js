"use strict";

let segundos=0;
let filas = 20;
let columnas = 10;
let tamanio_celda = 35;
let canvas_juego = document.getElementById("canvas_juego");
let tetromino = null;
let coordenadas_ocupadas = [];
let contador = 0;
let tetrominos_generados = [];
let game_over = false;
let puntuacion = 0;
let modo_desarrollo = false;
let div_arriba = document.getElementById("div-arriba");
let letra_tetromino;
let angulo;
let boton_iniciar = document.getElementById("iniciar");
let intervalo_mover_abajo = null;
let intervalo_tiempo = null;
let rotable = true;
let rotaciones = 0;

/*Esta función crea la cuadrícula donde saldrán las piezas, la cuadrícula es de 10 columnas por 20 filas*/
function crearCuadricula() {
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            let div = document.createElement('div');
            div.classList.add('celda');
            div.id=`${x}-${y}`;
            div.style.zIndex="-100";
            /*Aquí se muestra la coordenada en cada div, solo si el modo desarrollo está habilitado*/
            if (modo_desarrollo) {
                div.innerHTML = `<p>x:${x}, y:${y}</p>`;
            }
            canvas_juego.append(div);
        }
    }
}

/*Esta función contiene los arrays (o matrices) de cada pieza, el valor "1" representa un cuadrado que debe "rellenarse".
Devuelve el array en función de la letra introducida*/
/*En el tetris hay 7 piezas, los cuales se representan con estos arrays*/
function obtenerArrayTetromino(letra) {
    let tetrominos = {
        'I': [
            [1, 1, 1, 1]
        ],
        'O': [
            [1, 1],
            [1, 1]
        ],
        'T': [
            [0, 1, 0],
            [1, 1, 1]
        ],
        'S': [
            [0, 1, 1],
            [1, 1, 0]
        ],
        'Z': [
            [1, 1, 0],
            [0, 1, 1]
        ],
        'J': [
            [1, 0, 0],
            [1, 1, 1]
        ],
        'L': [
            [0, 0, 1],
            [1, 1, 1]
        ]
    };

    return tetrominos[letra];
}

/*Esta función devuelve el color de cada pieza, en función de la letra introducida*/
function obtenerColorTetromino(letra) {
    const tetromino_colores = {
        'I': 'cyan',
        'O': 'yellow',
        'T': 'purple',
        'S': 'green',
        'Z': 'red',
        'J': 'blue',
        'L': 'orange'
    };

    return tetromino_colores[letra];
}

/*Aquí se genera cada tetromino (cada pieza que cae)*/
function generarTetromino() {
    if (!game_over) {
        /*Estas son las letras posibles, se escoge una aleatoriamente*/
        let letras_tetromino = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
        let aleatorio = Math.floor(Math.random() * letras_tetromino.length);
        letra_tetromino=letras_tetromino[aleatorio];

        /*Aquí se obtiene el array y el color de la pieza*/
        let array_tetromino = obtenerArrayTetromino(letras_tetromino[aleatorio]);
        let color_tetromino = obtenerColorTetromino(letras_tetromino[aleatorio]);
        let contador2 = 0;
        angulo = 0;
        rotaciones = 0;

        /*Se crea el grid del tetromino*/
        tetromino = document.createElement('div');
        tetromino.style.position = 'absolute';
        tetromino.style.display = 'grid';
        tetromino.style.gridTemplateColumns = `repeat(${array_tetromino[0].length}, ${tamanio_celda}px)`;
        tetromino.style.gridTemplateRows = `repeat(${array_tetromino.length}, ${tamanio_celda}px)`;
        contador++;
        tetromino.id = contador.toString();

        let divs_generados = [];
        divs_generados.push(tetromino.id);

        /*Aquí se genera cada div que forma parte del tetromino*/
        for (let y = 0; y < array_tetromino.length; y++) {
            for (let x = 0; x < array_tetromino[y].length; x++) {
                /*Si en el array del tetromino el valor actual de la iteración es 1, se crea el div*/
                if (array_tetromino[y][x] === 1) {
                    contador2++;
                    let div = document.createElement("div");
                    div.style.backgroundColor = color_tetromino;
                    div.style.width = `${tamanio_celda}px`;
                    div.style.height = `${tamanio_celda}px`;
                    /*Cada div tendrá su id: contador representa el número del tetromino, y el contador 2 el número del div generado
                     Ejemplo: 1,4 || Cuarto div del primer tetromino*/
                    div.id = `${contador},${contador2}`;
                    /*Se le da un zindex de 1000 para que esté delante de todos los elementos, también será útil para obtener
                     posteriormente la id de este div*/
                    div.style.zIndex="1000";
                    div.classList.add("tetromino-div");
                    divs_generados.push(div.id);
                    div.style.position = "absolute";
                    div.style.border = "1px solid black";
                    div.style.boxSizing = "border-box";
                    div.style.left = `${x * tamanio_celda}px`;
                    div.style.top = `${y * tamanio_celda}px`;
                    /*Al igual que antes, si el modo desarrollo está activado, se imprimie en cada div su id*/
                    if (modo_desarrollo) {
                        div.innerHTML = `<p>${div.id}</p>`;
                    }

                    /*Se incluye en el tetromino cada div generado*/
                    tetromino.append(div);
                }
            }
        }

        tetrominos_generados.push(divs_generados);
        /*Esto es necesario para que al tetromino se le asigne el focus (necesario para moverlo con el teclado)*/
        tetromino.tabIndex = 0;
        tetromino.classList.add(letras_tetromino[aleatorio]);
        /*Cada tetromino sale en la posición 0,0 (arriba a la izquierda)*/
        tetromino.style.top = "0px";
        tetromino.style.left = "0px";
        /*Aquí se añade el tetromino generado al tablero*/
        canvas_juego.appendChild(tetromino);
        /*Se añaden los event listeners*/
        agregarEventListenersTetromino();

        /*Aquí se detecta si hay una colisión cuandoo sale el tetromino generado, si es así, se llama la función gameOver()*/
        if (detectarColisionTetromino()) {
            gameOver();
            tetromino.remove();
        }
    }
}

/*Esta función añade los eventlisteners al tetromino*/
function agregarEventListenersTetromino() {
    /*Como se mencionó antes, se incluye el focus automáticamente al elemento generado para moverlo*/
    tetromino.focus();
    tetromino.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
            moverTetromino("abajo");
        }
        else if (event.key === "ArrowLeft") {
            moverTetromino("izquierda");
        }
        else if (event.key === "ArrowRight") {
            moverTetromino("derecha");
        }
        else if (event.key === "ArrowUp") {
            moverTetromino("arriba");
        }
    });
}

/*Cuando el tetromino se "congela" en su puesto (porque ha llegado al final o a otro tetromino), se le quita sus event listeners*/
function quitarEventListeners() {
    tetromino.removeEventListener("keydown", (event) => {});
}

/*Esta función detecta si la fila está llena (todas las coordenadas x de esa fila están ocupadas)*/
function detectarFilaLlena() {

    if (coordenadas_ocupadas.length > 0) {
        let filas_ocupadas = Array(filas).fill(0);

        /*Aquí se cuentan las coordenadas de cada fila*/
        for (let i = 0; i < coordenadas_ocupadas.length; i++) {
            let y = coordenadas_ocupadas[i][1];
            filas_ocupadas[y]++;
        }

        for (let i = 0; i < filas_ocupadas.length; i++) {
            /*Si la fila está ocupada (llena), se alerta al usuario y se sube su puntuación*/
            if (filas_ocupadas[i] >= columnas) {
                puntuacion+=100;
                cambiarPuntos();
                /*Aquí se elimina la fila llena detectada y se bajan las piezas*/
                eliminarFilaLlena(i);
                bajarTetrominosFila(i);
            }
        }
    }
}

/*Esta función elimina una fila llena, se utiliza cuando se ha encontrado una fila llena*/
function eliminarFilaLlena(fila) {
    for (let i = 0; i < coordenadas_ocupadas.length; i++) {
        /*Aquí se maneja cada coordenada cuyo valor y (la fila), sea la fila llena*/
        if (coordenadas_ocupadas[i][1] === fila) {
            let x = coordenadas_ocupadas[i][0];
            /*Se obtiene la id del div del tetromino en una coordenada (la coordenada a eliminar en este caso)*/
            let id_div_tetromino = obtenerIdDivTetromino(x, fila);
            /*Se elimina*/
            document.getElementById(id_div_tetromino).remove();
            /*Se elimina esa coordenada del array de coordenadas bloqueadas*/
            coordenadas_ocupadas.splice(i, 1);
            i--;
        }
    }
}

/*Esta función bajo los tetrominos una fila si se ha detectado una fila llena*/
function bajarTetrominosFila(fila_eliminada) {
    for (let i = 0; i < coordenadas_ocupadas.length; i++) {
        /*Si la el valor y de la coordenada ocupada es menor a la fila eliminada, se baja*/
        if (coordenadas_ocupadas[i][1] < fila_eliminada) {
            let id_div_mover=obtenerIdDivTetromino(coordenadas_ocupadas[i][0], coordenadas_ocupadas[i][1]);
            /*Se actualiza el valor y de la coordenada (se suma 1 porque se movió abajo)*/
            coordenadas_ocupadas[i][1]++;
            /*Se mueve abajo tras obtener la id del div*/
            moverAbajoDivTetromino(document.getElementById(id_div_mover));
        }
    }
}

/*Esta función es la encargada de rotar el tetromino*/
function rotarTetromino() {
    if (rotable) {
        /*Se obtiene el array del tetromino, tetromino.classList[0] contiene la letra del mismo*/
        let array_tetromino = obtenerArrayTetromino(tetromino.classList[0]);
        let tetromino_rotado = rotarArrayTetromino(array_tetromino, angulo);

        /*Si al rotar la matriz no hay ninguna colision, se actualiza su posición en el tablero*/
        if (!detectarColisionRotacion(tetromino_rotado)) {
            actualizarPosicionTetromino(tetromino_rotado);

            angulo = (angulo + 90) % 360;
        }
    }
}

/*Esta función maneja la lógica de rotar la matriz 90 grados en función del ángulo actual de rotación*/
function rotarArrayTetromino(matriz, angulo_rotacion) {
    let matriz_rotada = matriz;

    switch (angulo_rotacion) {
        case 90:
            matriz_rotada = rotar90Grados(matriz_rotada);
            break;
        case 180:
            matriz_rotada = rotar90Grados(rotar90Grados(matriz_rotada));
            break;
        case 270:
            matriz_rotada = rotar90Grados(rotar90Grados(rotar90Grados(matriz_rotada)));
            break;
        case 0:
            break;
    }

    return matriz_rotada;
}

/*Esta función se encarga de rotar la matriz del tetromino*/
function rotar90Grados(matriz) {
    let num_filas = matriz.length;
    let num_columnas = matriz[0].length;
    let matriz_rotada = [];
    rotaciones++;

    for (let i = 0; i < num_columnas; i++) {
        matriz_rotada[i] = [];
        for (let j = 0; j < num_filas; j++) {
            matriz_rotada[i][j] = matriz[num_filas - j - 1][i];
        }
    }
    return matriz_rotada;
}

/*Esta función actualiza la posición del tetromino rotado*/
function actualizarPosicionTetromino(tetromino_rotado) {
    let divs = tetromino.querySelectorAll('.tetromino-div');
    let indice = 0;
    for (let y = 0; y < tetromino_rotado.length; y++) {
        for (let x = 0; x < tetromino_rotado[y].length; x++) {
            if (tetromino_rotado[y][x] === 1) {
                let div = divs[indice];
                div.style.left = `${x * tamanio_celda}px`;
                div.style.top = `${y * tamanio_celda}px`;
                indice++;
            }
        }
    }
}

/*Esta función detecta si hay una colisión al rotar el tetromino*/
function detectarColisionRotacion(tetromino_rotado) {
    let proximas_coordenadas = [];

    for (let y = 0; y < tetromino_rotado.length; y++) {
        for (let x = 0; x < tetromino_rotado[y].length; x++) {
            /*Se añade la siguiente coordenada del tetromino rotado*/
            if (tetromino_rotado[y][x] === 1) {
                let [x_pos, y_pos] = obtenerCoordenadasNuevaPosicion(x, y);
                proximas_coordenadas.push([x_pos, y_pos]);
            }
        }
    }

    /*Aquí se mira si la coordenada siguiente (obtenida del bucle anterior) no existe ya en el array de coordenadas ocupadas, si es así
      hay una colisión*/
    for (let [x, y] of proximas_coordenadas) {
        if (y >= filas || coordenadas_ocupadas.some(coord => coord[0] === x && coord[1] === y)) {
            return true;
        }
    }
    return false;
}

/*Esta función convierte la coordenada introducida */
function obtenerCoordenadasNuevaPosicion(x, y) {
    let tetromino_izquierda = tetromino.offsetLeft;
    let tetromino_arriba = tetromino.offsetTop;

    let x2 = Math.floor((tetromino_izquierda + x * tamanio_celda) / tamanio_celda);
    let y2 = Math.floor((tetromino_arriba + y * tamanio_celda) / tamanio_celda);

    return [x2, y2];
}

/*Esta función es muy importante, obtiene la id de un div del tetromino dada unas coordenadas*/
/*Esto se hace usando la propiedad zindex, el div del tetromino (cada cuadrado que compone una pieza que cae) tiene un
  zindex de 1000, luego el de la cuadrícula tiene un zindex inferior, por lo tanto, esta función devuelve la id del elemento
  que tiene el zindex más alto (en este caso el div del tetromino)*/
function obtenerIdDivTetromino(x, y) {
    let rect = canvas_juego.getBoundingClientRect();
    /*Ya que cada celda mide 35 por 35, si multiplica la coordenada por 35 para obtener su posicion en pixeles*/
    x *= 35;
    y *= 35;
    /*Se utiliza la recta para ajustar la posición real de la x y la y*/
    let x_ajustado = rect.left + x;
    let y_ajustado = rect.top + y;

    /*Ya ajustados las coordenadas, se utiliza elementsFromPoint el cual nos devolverá todos los elementos de un cierto punto*/
    let elementos = document.elementsFromPoint(x_ajustado, y_ajustado);

    let elemento_encima = null;
    let z_index_mas_alto = -Infinity;

    /*De todos los elementos, encontramos el que tiene el zindex más alto*/
    for (let elemento of elementos) {
        let zIndex = parseInt(window.getComputedStyle(elemento).zIndex) || 0;
        if (zIndex > z_index_mas_alto) {
            z_index_mas_alto = zIndex;
            elemento_encima = elemento;
        }
    }

    return elemento_encima.id;
}


/*Esta función devuelve las coordenadas de un tetromino*/
function obtenerCoordenadasTetromino(div) {
    let tetromino_left = tetromino.offsetLeft;
    let tetromino_top = tetromino.offsetTop;
    let div_left = div.offsetLeft;
    let div_top = div.offsetTop;
    let x = Math.floor((tetromino_left + div_left) / tamanio_celda);
    let y = Math.floor((tetromino_top + div_top) / tamanio_celda);
    return [x, y];
}

/*Esta función añade las coordenadas de un tetromino al array de coordenadas ocupadas*/
function anadirCoordenadasBloqueadas() {
    for (let i = 1; i < tetrominos_generados[contador - 1].length; i++) {
        let div = document.getElementById(tetrominos_generados[contador - 1][i]);
        coordenadas_ocupadas.push(obtenerCoordenadasTetromino(div));
    }
}

/*Esta función es la encargada de detectar si hay una colisión con otro tetromino. Básicamente, verifica si la próxima coordenada
  está ocupada*/
function detectarColisionTetromino() {
    let proximas_coordenadas = [];

    for (let i = 1; i < tetrominos_generados[contador - 1].length; i++) {
        let div = document.getElementById(tetrominos_generados[contador - 1][i]);
        let [x, y] = obtenerCoordenadasTetromino(div);
        proximas_coordenadas.push([x, y + 1]);
    }

    for (let [x, y] of proximas_coordenadas) {
        if (y >= filas || coordenadas_ocupadas.some(coord => coord[0] === x && coord[1] === y)) {
            return true;
        }
    }

    return false;
}

/*Esta función es la encargada de terminar el juego*/
function gameOver() {
    alert("El juego ha terminado, tu puntuación es de: "+puntuacion);
    clearInterval(intervalo_mover_abajo);
    clearInterval(intervalo_tiempo);
    game_over = true;
}

/*Esta función es la primera en detectar si hay alguna colisión con los bordes del tablero, y si no llama a la función anterior*/
function detectarColision(altura_actual, anchura_actual, altura_maxima, anchura_maxima) {
    if (altura_actual > altura_maxima) {
        anadirCoordenadasBloqueadas();
        quitarEventListeners();
        generarTetromino();
        return true;
    }
    else if (anchura_actual > anchura_maxima) {
        anadirCoordenadasBloqueadas();
        quitarEventListeners();
        generarTetromino();
        return true;
    }
    else if (detectarColisionTetromino()) {
        anadirCoordenadasBloqueadas();
        quitarEventListeners();
        generarTetromino();
        return true;
    }
    return false;
}

/*Esta función mueve abajo una posición el div de un tetromino*/
function moverAbajoDivTetromino(div) {
    let altura_actual = div.offsetTop;
    div.style.top = `${altura_actual + tamanio_celda}px`;
}

/*Esta función es la encargada de manejar los movimientos*/
function moverTetromino(movimiento) {
    if (!game_over) {
        let letras = ['T', 'Z', 'J', 'L', 'S'];
        let altura_actual = tetromino.offsetTop;
        let anchura_actual = tetromino.offsetLeft;
        let altura_maxima = canvas_juego.offsetHeight - tetromino.offsetHeight;
        let anchura_maxima = canvas_juego.offsetWidth - tetromino.offsetWidth;

        /*Para evitar que las piezas se salgan del tablero cuando se rotan, se añade este código para ajustar la anchura maxima*/
        if (letras.includes(letra_tetromino) && (angulo === 0 || angulo === 180) && rotaciones > 0) {
            anchura_maxima += tamanio_celda;
        }
        if (letra_tetromino === 'I' && (angulo === 0 || angulo === 180) && rotaciones > 0) {
            anchura_maxima += 3 * tamanio_celda;
        }

        /*Este código prohibe la rotación de las piezas si están en la última fila*/
        if (letra_tetromino === 'I' && (angulo === 0 || angulo === 180) && rotaciones > 0) {
            rotable = anchura_actual <= anchura_maxima - 3 * tamanio_celda;
        }
        else if (letras.includes(letra_tetromino) && (angulo === 0 || angulo === 180) && rotaciones > 0) {
            rotable = anchura_actual <= anchura_maxima - tamanio_celda;
        }
        else {
            rotable = anchura_actual <= anchura_maxima;
        }

        console.log("Rotación: " + angulo);

        console.log('Altura Actual: ' + altura_actual + ', Anchura Actual: ' + anchura_actual + ', Altura Maxima: ' + altura_maxima + ', Anchura Maxima: ' + anchura_maxima);
        detectarFilaLlena();

        /*Si no se ha detectado ninguna colisión, se cambia de posición el tetromino*/
        if (movimiento === "abajo") {
            if (!detectarColision(altura_actual, anchura_actual, altura_maxima, anchura_maxima)) {
                tetromino.style.top = `${altura_actual + tamanio_celda}px`;
            }
        }
        else if (movimiento === "derecha") {
            if (!detectarColision(altura_actual, anchura_actual, altura_maxima, anchura_maxima)) {
                if (anchura_actual >= anchura_maxima) {
                    tetromino.style.left = `${anchura_maxima}px`;
                }
                else {
                    tetromino.style.left = `${anchura_actual + tamanio_celda}px`;
                }
            }
        }
        else if (movimiento === "izquierda") {
            if (!detectarColision(altura_actual, anchura_actual, altura_maxima, anchura_maxima)) {
                if (anchura_actual <= 0) {
                    tetromino.style.left = `0px`;
                }
                else {
                    tetromino.style.left = `${anchura_actual - tamanio_celda}px`;
                }
            }
        }
        /*Si se pulsa la flecha de arriba, se rota el tetromino*/
        else if (movimiento === "arriba") {
            if (!detectarColision(altura_actual, anchura_actual, altura_maxima, anchura_maxima)) {
                rotarTetromino();
            }
        }
    }
}

/*Esta función inserta el botón de reinicar*/
function insertarBotonReiniciar() {
    let boton_reiniciar=document.createElement("div");
    boton_reiniciar.classList.add("elemento_arriba");
    boton_reiniciar.id="boton_reiniciar";
    boton_reiniciar.style.left="350px";
    boton_reiniciar.style.top="33%";
    div_arriba.appendChild(boton_reiniciar);
    boton_reiniciar.innerHTML="<h3><a href='index.html'>Reiniciar juego</a></h3>";
}

/*Esta función inserta el contador de tiempo*/
function insertarContadorTiempo() {
    let contador_tiempo=document.createElement("div");
    contador_tiempo.classList.add("elemento_arriba");
    contador_tiempo.id="contador_tiempo";
    contador_tiempo.style.left="350px";
    contador_tiempo.style.top="43%";
    div_arriba.appendChild(contador_tiempo);
}

/*Esta función inserta el contador de puntos*/
function insertarContadorPuntos() {
    let contador_puntos=document.createElement("div");
    contador_puntos.classList.add("elemento_arriba");
    contador_puntos.id="contador_puntos";
    contador_puntos.style.left="350px";
    contador_puntos.style.top="53%";
    div_arriba.appendChild(contador_puntos);
}

/*Esta función inserta el botón de silenciar*/
function insertarBotonSilenciar() {
    let boton_silenciar=document.createElement("div");
    boton_silenciar.classList.add("elemento_arriba");
    boton_silenciar.id="silenciar";
    boton_silenciar.style.left="350px";
    boton_silenciar.style.top="63%";
    boton_silenciar.style.cursor="pointer";
    boton_silenciar.style.fontSize="40px";
    div_arriba.appendChild(boton_silenciar);

    boton_silenciar.innerHTML = "<h3>🔊</h3>"

    /*Se añade un event listener para ver si se ha pulsado el botón de silenciar*/
    boton_silenciar.addEventListener("click", () => {
        let audio = document.getElementById("audio-tetris");
        audio.muted = !audio.muted;
        boton_silenciar.innerHTML = audio.muted ? "<h3>🔇</h3>" : "<h3>🔊</h3>";
        tetromino.focus();
    });
}

/*Esta función cambia el contador de tiempo cada vez que se llama (cada segundo)*/
function ejecutarContador() {
    segundos++;
    let contador_tiempo=document.getElementById("contador_tiempo");
    contador_tiempo.innerHTML = "<h3>⌛ "+segundos+" segundos</h3>";
}

/*Esta función cambia la puntuación en el contador de puntos*/
function cambiarPuntos() {
    let contador_puntos=document.getElementById("contador_puntos");
    contador_puntos.innerHTML = "<h3>🏆 "+puntuacion+" puntos</h3>";
}

/*Esta función es la encargada de reproducir el audio del juego*/
function reproducirAudio() {
    let audio = document.getElementById("audio-tetris");
    audio.play()
        .then(() => {
            console.log("El audio comenzó a reproducirse");
        })
        .catch(error => {
            console.error("Error: " + error);
        });
}

/*Esta función inserta todos los contadores y botones del side*/
function insertarElementosSide() {
    insertarContadorTiempo();
    insertarBotonReiniciar();
    insertarContadorPuntos();
    insertarBotonSilenciar();
    cambiarPuntos();
}

/*Esta función elimina los elementos del inicio (el botón de inicio y el div)*/
function eliminarElementosInicio() {
    boton_iniciar.remove();
    document.getElementById("contenedor-boton").remove();
}

/*Esta función crea los intervalos (el de mover el tetromino abajo y el de contar el tiempo)*/
function crearIntervalos() {
    let tiempo=1000;

    intervalo_mover_abajo = setInterval(() => {
        moverTetromino("abajo");
        if (tiempo>300) {
            tiempo=tiempo-1.5*puntuacion;
        }
    }, tiempo);

    intervalo_tiempo=setInterval(() => {
        ejecutarContador();
    }, 1000);
}

/*Esta función llama todas las funciones necesarias para iniciar el juego*/
function iniciarJuego() {
    crearCuadricula();
    generarTetromino();
    eliminarElementosInicio();
    crearIntervalos();
    reproducirAudio();
    insertarElementosSide();
}

/*Este es el event listener encargado de iniciar el juego cuando se pulsa el botón de comenzar*/
boton_iniciar.addEventListener("click", function () {
    iniciarJuego();
});
