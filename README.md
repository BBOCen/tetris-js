<h1 align="center">🎮 Tetris 🎮</h1>

<p align="center">
  This project recreates the iconic game of Tetris using JavaScript, CSS, and HTML. 
  The game grid, the pieces, and all the game logic are dynamically generated and managed through JavaScript, 
  providing a classic Tetris experience with additional features.
</p>

---

<h2>🚀 Main Features</h2>

<h3>🎲 Board and Piece Generation</h3>
<ul>
  <li><strong>Dynamic game board:</strong> 
    A grid of <strong>10 columns x 20 rows</strong> is generated within a <code>&lt;div&gt;</code> container. 
    Each cell is an individual <code>&lt;div&gt;</code>, allowing for visual and functional management.
  </li>
  <li><strong>Tetris pieces:</strong>
    Represented as two-dimensional arrays (matrices), the classic pieces such as <code>I</code>, <code>O</code>, <code>T</code>, <code>L</code>, and <code>Z</code> are implemented. Example:
    <ul>
      <li><code>I</code>: <code>[[1, 1, 1, 1]]</code></li>
      <li><code>O</code>: <code>[[1, 1], [1, 1]]</code></li>
      <li><code>T</code>: <code>[[0, 1, 0], [1, 1, 1]]</code></li>
    </ul>
  </li>
  <li><strong>Piece rotation:</strong> Function to rotate matrices, changing the piece's orientation during the game.</li>
</ul>

<h3>🕹️ Interaction and Piece Movement</h3>
<ul>
  <li><strong>Automatic movement:</strong> The pieces fall automatically downwards at regular intervals (simulating gravity).</li>
  <li><strong>Keyboard controls:</strong>
    <ul>
      <li><strong>Left (←):</strong> Move the piece one cell to the left.</li>
      <li><strong>Right (→):</strong> Move the piece one cell to the right.</li>
      <li><strong>Down (↓):</strong> Accelerate the piece's fall.</li>
      <li><strong>Rotate (↑):</strong> Rotate the piece clockwise.</li>
    </ul>
  </li>
  <li><strong>Collisions and boundaries:</strong> Pieces cannot pass through the board edges or overlap with other pieces.</li>
</ul>

<h3>🔒 Fixing Pieces and Generating New Ones</h3>
<ul>
  <li>When a piece can no longer descend, it is "fixed" in place, permanently occupying those cells.</li>
  <li>A new piece automatically appears at the top of the board.</li>
</ul>

---

<h2>🧩 Advanced Mechanics</h2>

<ul>
  <li><strong>Line clearing:</strong> When a row is completely filled, it is cleared, and all rows above it drop down one position.</li>
  <li><strong>Scoring and difficulty system:</strong>
    <ul>
      <li>+100 points for each completed line.</li>
      <li>Increases the speed of falling pieces as the player progresses.</li>
    </ul>
  </li>
  <li><strong>Game state:</strong>
    <ul>
      <li><strong>Game Over:</strong> If there is no space to generate a new piece at the start, a "Game Over" message is displayed, and the game stops.</li>
      <li><strong>Restart:</strong> Includes a button to restart the game from scratch, shuffling pieces and resetting the score and difficulty.</li>
    </ul>
  </li>
</ul>

---

<h2>🌐 How to Play</h2>
You can play the game at this link: https://bbocen.github.io/tetris-js/tetris_js/index.html
