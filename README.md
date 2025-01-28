🎮 Segundo Minijuego: Tetris 🎮

Este proyecto recrea el icónico juego de Tetris utilizando JavaScript, CSS y HTML. La cuadrícula de juego, las piezas y toda la lógica del juego se generan y gestionan dinámicamente desde JavaScript, ofreciendo una experiencia clásica de Tetris con funcionalidades adicionales.

🚀 Características principales:

Generación del Tablero y Piezas

Tablero de juego dinámico:
Una cuadrícula de 10 columnas x 20 filas se genera en un contenedor <div> con la clase tablero. Cada celda es un <div> individual, lo que permite gestionarlas visual y funcionalmente.

Piezas del Tetris:
Representadas como arrays bidimensionales (matrices), las piezas clásicas como I, O, T, L, y Z están implementadas.

Rotación de piezas:
Función para rotar las matrices, cambiando la orientación de las piezas durante el juego.

Interacción y Movimiento de Piezas

Movimiento automático:
Las piezas caen automáticamente hacia abajo con intervalos regulares (simulando gravedad).

Controles de teclado:

Izquierda (←): Mover la pieza una celda a la izquierda.

Derecha (→): Mover la pieza una celda a la derecha.

Abajo (↓): Acelerar la caída de la pieza.

Rotar (↑): Rotar la pieza en sentido horario.

Colisiones y límites:
Las piezas no pueden atravesar los bordes del tablero ni superponerse con otras piezas.

Fijar piezas y generar nuevas

Cuando una pieza no puede descender más, se "fija" en su lugar, ocupando permanentemente esas celdas.

Una nueva pieza aparece automáticamente en la parte superior del tablero.

🧩 Mecánicas avanzadas:

Borrado de líneas completas

Cuando una fila se llena completamente, esta se elimina y todas las filas superiores descienden una posición.

Sistema de puntuación y dificultad

Puntos:
+100 puntos por cada línea completada.

Aumento de dificultad:
La velocidad de caída de las piezas incrementa con el progreso del jugador.

Estado del juego

Game Over:
Si no hay espacio para generar una nueva pieza al inicio, se muestra un mensaje de "Game Over" y el juego se detiene.

Reinicio:
Incluye un botón para reiniciar el juego desde cero, barajando piezas y reiniciando la puntuación y dificultad.

Puedes jugar al juego en este enlace: https://bbocen.github.io/tetris-js/tetris_js/index.html
