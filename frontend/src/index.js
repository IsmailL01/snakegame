// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3000/');

// const canvas = document.getElementById('myCanvas');
// const ctx = canvas.getContext('2d');
// canvas.width = 800;
// canvas.height = 800;
// const gridSize = 20;

// let snake1 = [];
// let snake2 = [];
// let food = {};

// // При подключении к серверу
// socket.on('game-data', (data) => {
// 	snake1 = data.snake1;
// 	snake2 = data.snake2;
// 	food = data.food;

// 	// Отрисовываем игру
// 	drawGame();
// });

// // Обрабатываем конец игры
// socket.on('game-over', (message) => {
// 	alert(message);
// });

// // Обработчик нажатия кнопки перезапуска
// document.getElementById('restartButton').addEventListener('click', () => {
// 	socket.emit('restart'); // Отправляем событие для перезапуска игры на сервер
// });

// // Отправляем данные о движении на сервер при нажатии клавиш
// document.addEventListener('keydown', (e) => {
// 	// Управление первой змеей (snake1) с помощью WASD
// 	let direction1 = null;
// 	if (e.key === 'w') direction1 = { x: 0, y: -1 };
// 	if (e.key === 's') direction1 = { x: 0, y: 1 };
// 	if (e.key === 'a') direction1 = { x: -1, y: 0 };
// 	if (e.key === 'd') direction1 = { x: 1, y: 0 };
// 	if (direction1) socket.emit('move', { player: 1, direction: direction1 }); // Отправляем движение для первого игрока

// 	// Управление второй змеей (snake2) с помощью стрелок
// 	let direction2 = null;
// 	if (e.key === 'ArrowUp') direction2 = { x: 0, y: -1 };
// 	if (e.key === 'ArrowDown') direction2 = { x: 0, y: 1 };
// 	if (e.key === 'ArrowLeft') direction2 = { x: -1, y: 0 };
// 	if (e.key === 'ArrowRight') direction2 = { x: 1, y: 0 };
// 	if (direction2) socket.emit('move', { player: 2, direction: direction2 }); // Отправляем движение для второго игрока
// });

// // Функция для отрисовки игры
// function drawGame() {
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	drawSnake(snake1, 'green');
// 	drawSnake(snake2, 'blue');
// 	ctx.fillStyle = 'red';
// 	ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
// }

// // Функция для отрисовки змеи
// function drawSnake(snake, color) {
// 	ctx.fillStyle = color;
// 	snake.forEach((segment) => {
// 		ctx.fillRect(
// 			segment.x * gridSize,
// 			segment.y * gridSize,
// 			gridSize,
// 			gridSize
// 		);
// 	});
// }

// const socket = new WebSocket('ws://localhost:8000/ws/snake/');
const socket = new WebSocket('http://localhost:8000/ws/snake/');
console.log(socket, 'socket');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;
const gridSize = 20;

let snake1 = [];
let snake2 = [];
let food = {};

// Обработка сообщений от сервера WebSocket
socket.onmessage = function (event) {
	const data = JSON.parse(event.data);
	if (data.type === 'game-data') {
		snake1 = data.snake1;
		snake2 = data.snake2;
		food = data.food;

		// Отрисовываем игру
		drawGame();
	} else if (data.type === 'game-over') {
		alert(data.message);
	}
};

// Обрабатываем конец игры
socket.onclose = function () {
	alert('WebSocket connection closed');
};

// Обработчик нажатия кнопки перезапуска
document.getElementById('restartButton').addEventListener('click', () => {
	const message = JSON.stringify({
		type: 'restart'
	});
	socket.send(message); // Отправляем событие для перезапуска игры на сервер
});

// Отправляем данные о движении на сервер при нажатии клавиш
document.addEventListener('keydown', (e) => {
	let direction1 = null;
	let direction2 = null;

	// Управление первой змеей (snake1) с помощью WASD
	if (e.key === 'w') direction1 = { x: 0, y: -1 };
	if (e.key === 's') direction1 = { x: 0, y: 1 };
	if (e.key === 'a') direction1 = { x: -1, y: 0 };
	if (e.key === 'd') direction1 = { x: 1, y: 0 };

	// Управление второй змеей (snake2) с помощью стрелок
	if (e.key === 'ArrowUp') direction2 = { x: 0, y: -1 };
	if (e.key === 'ArrowDown') direction2 = { x: 0, y: 1 };
	if (e.key === 'ArrowLeft') direction2 = { x: -1, y: 0 };
	if (e.key === 'ArrowRight') direction2 = { x: 1, y: 0 };

	// Отправляем движение игрока
	if (direction1) {
		const message = JSON.stringify({
			type: 'move',
			player: 1,
			direction: direction1
		});
		socket.send(message);
	}

	if (direction2) {
		const message = JSON.stringify({
			type: 'move',
			player: 2,
			direction: direction2
		});
		socket.send(message);
	}
});

// Функция для отрисовки игры
function drawGame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSnake(snake1, 'green');
	drawSnake(snake2, 'blue');
	ctx.fillStyle = 'red';
	ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Функция для отрисовки змеи
function drawSnake(snake, color) {
	ctx.fillStyle = color;
	snake.forEach((segment) => {
		ctx.fillRect(
			segment.x * gridSize,
			segment.y * gridSize,
			gridSize,
			gridSize
		);
	});
}
