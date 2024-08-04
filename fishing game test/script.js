const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-button');

canvas.width = 800;
canvas.height = 600;

let score = 0;
let fishes = [];
let isGameRunning = false;

class Fish {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 30;
        this.speed = Math.random() * 2 + 1;
    }

    draw() {
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.x = canvas.width;
            this.y = Math.random() * (canvas.height - this.height);
        }
    }

    isCaught(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
               mouseY >= this.y && mouseY <= this.y + this.height;
    }
}

function startGame() {
    score = 0;
    fishes = [];
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        fishes.push(new Fish(x, y));
    }
    isGameRunning = true;
    animate();
}

function updateGame() {
    fishes.forEach(fish => fish.update());
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fishes.forEach(fish => fish.draw());
}

function animate() {
    if (!isGameRunning) return;
    updateGame();
    drawGame();
    requestAnimationFrame(animate);
}

canvas.addEventListener('click', (event) => {
    if (!isGameRunning) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    fishes.forEach((fish, index) => {
        if (fish.isCaught(mouseX, mouseY)) {
            fishes.splice(index, 1);
            score += 10;
            scoreElement.textContent = score;
        }
    });
});

startButton.addEventListener('click', () => {
    startGame();
});
