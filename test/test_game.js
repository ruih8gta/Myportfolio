// Canvas game logic
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 50;

// Game state
let playerX = 1;
let playerY = 3;
let dragonX = 3;
let dragonY = 1;
const dragonSize = 2; // ドラゴンは2グリッド分の大きさ

// Function to move dragon randomly
function moveDragon() {
    let newX = dragonX;
    let newY = dragonY;
    const maxX = Math.floor(canvas.width / gridSize) - dragonSize;
    const maxY = Math.floor(canvas.height / gridSize) - 1;

    // ランダムに方向を選択 (0: 上, 1: 下, 2: 左, 3: 右)
    const direction = Math.floor(Math.random() * 4);
    
    switch(direction) {
        case 0: if (newY > 0) newY--; break; // 上
        case 1: if (newY < maxY) newY++; break; // 下
        case 2: if (newX > 0) newX--; break; // 左
        case 3: if (newX < maxX) newX++; break; // 右
    }

    // プレイヤーとの衝突がない場合のみ移動
    if (!(newX <= playerX && playerX < newX + dragonSize && newY === playerY)) {
        dragonX = newX;
        dragonY = newY;
        render();
    }
}

// Start dragon movement
setInterval(moveDragon, 2000);

// Load images
const playerImage = new Image();
playerImage.src = '../asset/yusha.png';
const dragonImage = new Image();
dragonImage.src = '../asset/dragon.png';
const backgroundImage = new Image();
backgroundImage.src = '../asset/renga.png';

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    for(let y = 0; y < canvas.height; y += gridSize) {
        for(let x = 0; x < canvas.width; x += gridSize) {
            ctx.drawImage(backgroundImage, x, y, gridSize, gridSize);
        }
    }

    // Draw dragon with double width
    ctx.drawImage(dragonImage, dragonX * gridSize, dragonY * gridSize, gridSize * dragonSize, gridSize);
    // Draw player
    ctx.drawImage(playerImage, playerX * gridSize, playerY * gridSize, gridSize, gridSize);
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    let newX = playerX;
    let newY = playerY;

    switch (event.key) {
        case 'ArrowUp': if (playerY > 0) newY--; break;
        case 'ArrowDown': if (playerY < 5) newY++; break;
        case 'ArrowLeft': if (playerX > 0) newX--; break;
        case 'ArrowRight': 
            if (playerX < 7) {
                newX++;
            } else {
                window.location.href = 'nextpage.html';
                return;
            }
            break;
    }

    // Check collision with dragon (considering dragon size)
    if (!(newX >= dragonX && newX < dragonX + dragonSize && newY === dragonY)) {
        playerX = newX;
        playerY = newY;
        render();
    }
});

// Add button controls
document.getElementById('up').addEventListener('click', () => {
    if (playerY > 0) {
        playerY--;
        render();
    }
});

document.getElementById('down').addEventListener('click', () => {
    if (playerY < 5) {
        playerY++;
        render();
    }
});

document.getElementById('left').addEventListener('click', () => {
    if (playerX > 0) {
        playerX--;
        render();
    }
});

document.getElementById('right').addEventListener('click', () => {
    if (playerX < 7) {
        playerX++;
        render();
    } else {
        window.location.href = 'nextpage.html';
    }
});

// Initial render
Promise.all([
    new Promise(resolve => playerImage.onload = resolve),
    new Promise(resolve => dragonImage.onload = resolve),
    new Promise(resolve => backgroundImage.onload = resolve)
]).then(() => {
    render();
});