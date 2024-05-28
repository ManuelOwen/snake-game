const gameArea = document.getElementById('game-area');
const gridSize = 25;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let apple = { x: 5, y: 5 };
let interval;
 
function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameArea.appendChild(cell);
    }
}
 
function drawSnake() {
    snake.forEach(segment => {
        const index = segment.y * gridSize + segment.x;
        gameArea.children[index].classList.add('snake');
    });
}
 
function drawApple() {
    const index = apple.y * gridSize + apple.x;
    gameArea.children[index].classList.add('apple');
}
 
function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);
 
    if (newHead.x === apple.x && newHead.y === apple.y) {
        placeApple();
    } else {
        const tail = snake.pop();
        const tailIndex = tail.y * gridSize + tail.x;
        gameArea.children[tailIndex].classList.remove('snake');
    }
 
    if (isCollision()) {
        clearInterval(interval);
        alert('Game Over');
    }
}
 
function isCollision() {
    const head = snake[0];
    return head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}
 
function placeApple() {
    apple = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
    if (snake.some(segment => segment.x === apple.x && segment.y === apple.y)) {
        placeApple();
    }
}
 
function update() {
    moveSnake();
    drawGame();
}
 
function drawGame() {
    Array.from(gameArea.children).forEach(cell => cell.classList.remove('snake', 'apple'));
    drawSnake();
    drawApple();
}
 
function changeDirection(event) {
    switch (event.keyCode) {
        case 37: // left arrow
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 38: // up arrow
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 39: // right arrow
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
        case 40: // down arrow
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
    }
}
 
document.addEventListener('keydown', changeDirection);
createGrid();
drawGame();
interval = setInterval(update, 200);
 