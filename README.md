<h1 align="center">🎮 Segundo Minijuego: Tetris 🎮</h1>

<p align="center">
  Este proyecto recrea el icónico juego de Tetris utilizando JavaScript, CSS y HTML. 
  La cuadrícula de juego, las piezas y toda la lógica del juego se generan y gestionan dinámicamente desde JavaScript, 
  ofreciendo una experiencia clásica de Tetris con funcionalidades adicionales.
</p>

---

<h2>🚀 Características principales</h2>

<h3>🎲 Generación del Tablero y Piezas</h3>
<ul>
  <li><strong>Tablero de juego dinámico:</strong> 
    Una cuadrícula de <strong>10 columnas x 20 filas</strong> se genera en un contenedor <code>&lt;div&gt;</code> con la clase <code>tablero</code>. 
    Cada celda es un <code>&lt;div&gt;</code> individual, lo que permite gestionarlas visual y funcionalmente.
  </li>
  <li><strong>Piezas del Tetris:</strong>
    Representadas como arrays bidimensionales (matrices), las piezas clásicas como <code>I</code>, <code>O</code>, <code>T</code>, <code>L</code>, y <code>Z</code> están implementadas. Ejemplo:
    <ul>
      <li><code>I</code>: <code>[[1, 1, 1, 1]]</code></li>
      <li><code>O</code>: <code>[[1, 1], [1, 1]]</code></li>
      <li><code>T</code>: <code>[[0, 1, 0], [1, 1, 1]]</code></li>
    </ul>
  </li>
  <li><strong>Rotación de piezas:</strong> Función para rotar las matrices, cambiando la orientación de las piezas durante el juego.</li>
</ul>

<h3>🕹️ Interacción y Movimiento de Piezas</h3>
<ul>
  <li><strong>Movimiento automático:</strong> Las piezas caen automáticamente hacia abajo con intervalos regulares (simulando gravedad).</li>
  <li><strong>Controles de teclado:</strong>
    <ul>
      <li><strong>Izquierda (←):</strong> Mover la pieza una celda a la izquierda.</li>
      <li><strong>Derecha (→):</strong> Mover la pieza una celda a la derecha.</li>
      <li><strong>Abajo (↓):</strong> Acelerar la caída de la pieza.</li>
      <li><strong>Rotar (↑):</strong> Rotar la pieza en sentido horario.</li>
    </ul>
  </li>
  <li><strong>Colisiones y límites:</strong> Las piezas no pueden atravesar los bordes del tablero ni superponerse con otras piezas.</li>
</ul>

<h3>🔒 Fijar piezas y generar nuevas</h3>
<ul>
  <li>Cuando una pieza no puede descender más, se "fija" en su lugar, ocupando permanentemente esas celdas.</li>
  <li>Una nueva pieza aparece automáticamente en la parte superior del tablero.</li>
</ul>

---

<h2>🧩 Mecánicas avanzadas</h2>

<ul>
  <li><strong>Borrado de líneas completas:</strong> Cuando una fila se llena completamente, esta se elimina y todas las filas superiores descienden una posición.</li>
  <li><strong>Sistema de puntuación y dificultad:</strong>
    <ul>
      <li>+100 puntos por cada línea completada.</li>
      <li>Aumenta la velocidad de caída de las piezas con el progreso del jugador.</li>
    </ul>
  </li>
  <li><strong>Estado del juego:</strong>
    <ul>
      <li><strong>Game Over:</strong> Si no hay espacio para generar una nueva pieza al inicio, se muestra un mensaje de "Game Over" y el juego se detiene.</li>
      <li><strong>Reinicio:</strong> Incluye un botón para reiniciar el juego desde cero, barajando piezas y reiniciando la puntuación y dificultad.</li>
    </ul>
  </li>
</ul>

---

<h2>🌐 Cómo jugar</h2>
Puedes jugar al juego en este enlace: https://bbocen.github.io/tetris-js/tetris_js/index.html


