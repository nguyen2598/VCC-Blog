const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // Kích thước của mỗi ô
const canvasSize = 20; // Số ô trên một hàng hoặc cột

let snake = [];
snake[0] = { x: 10 * box, y: 10 * box }; // Khởi tạo vị trí đầu của rắn

let food = {
  x: Math.floor(Math.random() * canvasSize) * box,
  y: Math.floor(Math.random() * canvasSize) * box,
};

let direction;
let score = 0;
let game;
let gameStarted = false;
let speed = 200; // Điều chỉnh tốc độ của trò chơi (ms)

document.addEventListener('keydown', changeDirection);
document.addEventListener('keydown', startGame);

function startGame(event) {
  if (event.keyCode == 32 && !gameStarted) { // Bắt đầu trò chơi khi nhấn phím space (keyCode 32)
    gameStarted = true;
    game = setInterval(draw, speed); // Điều chỉnh tốc độ của trò chơi
  }
}

function changeDirection(event) {
  if (event.keyCode == 37 && direction != 'RIGHT') {
    direction = 'LEFT';
  } else if (event.keyCode == 38 && direction != 'DOWN') {
    direction = 'UP';
  } else if (event.keyCode == 39 && direction != 'LEFT') {
    direction = 'RIGHT';
  } else if (event.keyCode == 40 && direction != 'UP') {
    direction = 'DOWN';
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == 'LEFT') snakeX -= box;
  if (direction == 'UP') snakeY -= box;
  if (direction == 'RIGHT') snakeX += box;
  if (direction == 'DOWN') snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * canvasSize) * box,
      y: Math.floor(Math.random() * canvasSize) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < 0 ||
    snakeX >= canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }

  snake.unshift(newHead);

  ctx.fillStyle = 'white';
  ctx.font = '45px Changa one';
  ctx.fillText(score, 2 * box, 1.6 * box);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}
