// キャンバスゲームの初期設定
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 50; // グリッドの大きさを50pxに設定

// ゲームの状態管理
let playerX = 1; // プレイヤーの初期X座標
let playerY = 3; // プレイヤーの初期Y座標
let dragonX = 3; // ドラゴンの初期X座標
let dragonY = 1; // ドラゴンの初期Y座標
const dragonSize = 2; // ドラゴンは2グリッド分の大きさ
const car = { x: 6, y: 1 }; //
const carSize = 2; // 
//const items = [ // アイテムの配置
//    { x: 2, y: 2, type: 'car', collected: false },
//    { x: 5, y: 4, type: 'fire1', collected: false }
//];

// ドラゴンをランダムに移動させる関数
function moveDragon() {
    let newX = dragonX;
    let newY = dragonY;
    const maxX = Math.floor(canvas.width / gridSize) - dragonSize; // ドラゴンの移動可能な最大X座標
    const maxY = Math.floor(canvas.height / gridSize) - 1; // ドラゴンの移動可能な最大Y座標

    // ランダムに移動方向を選択 (0: 上, 1: 下, 2: 左, 3: 右)
    const direction = Math.floor(Math.random() * 4);
    
    // 選択された方向に移動（キャンバスの範囲内のみ）
    switch(direction) {
        case 0: if (newY > 0) newY--; break; // 上移動
        case 1: if (newY < maxY) newY++; break; // 下移動
        case 2: if (newX > 0) newX--; break; // 左移動
        case 3: if (newX < maxX) newX++; break; // 右移動
    }

    // プレイヤーとの衝突チェック - 衝突がない場合のみ移動
    if (!(newX <= playerX && playerX < newX + dragonSize && newY === playerY)) {
        dragonX = newX;
        dragonY = newY;
        render(); // 画面の再描画
    }
}

// ドラゴンの移動を2秒ごとに実行
setInterval(moveDragon, 2000);

function moveCar() {
    let newX = car.x;
    let newY = car.y;
    //右から左に移動
    if (newX > -2) {
        newX--;
    } else {
        newX = 8; // 画面の右端に戻す
    }
    if (!(newX <= playerX && playerX < newX + dragonSize && newY === playerY)) {
        car.x = newX;
        car.y = newY;
        render(); // 画面の再描画
    }
}

setInterval(moveCar, 1000);


// 画像のロード
const playerImage = new Image();
playerImage.src = 'asset/yusha.png'; // 勇者の画像
const dragonImage = new Image();
dragonImage.src = 'asset/dragon.png'; // ドラゴンの画像
const backgroundImage = new Image();
backgroundImage.src = 'asset/renga.png'; // 背景の画像
const carImage = new Image();
carImage.src = 'asset/car.png'; // の画像
//const fireImage = new Image();
//fireImage.src = 'asset/fire1.png'; // 剣の画像
//const potionImage = new Image();
//potionImage.src = 'asset/potion.png'; // ポーションの画像

// ゲーム画面の描画関数
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスのクリア

    // 背景のタイル状の描画
    for(let y = 0; y < canvas.height; y += gridSize) {
        for(let x = 0; x < canvas.width; x += gridSize) {
            ctx.drawImage(backgroundImage, x, y, gridSize, gridSize);
        }
    }

    // 城の描画
    ctx.drawImage(carImage, car.x * gridSize, car.y * gridSize, gridSize * carSize, gridSize);

    // アイテムの描画
    //items.forEach(item => {
    //    if (!item.collected) {
    //        const itemImage = item.type === 'sword' ? swordImage : potionImage;
    //        ctx.drawImage(itemImage, item.x * gridSize, item.y * gridSize, gridSize, gridSize);
    //    }
    //});

    // ドラゴンの描画（2グリッド分の幅で描画）
    ctx.drawImage(dragonImage, dragonX * gridSize, dragonY * gridSize, gridSize * dragonSize, gridSize);
    // プレイヤーの描画
    ctx.drawImage(playerImage, playerX * gridSize, playerY * gridSize, gridSize, gridSize);
}

// キーボード入力の処理
document.addEventListener('keydown', (event) => {
    let newX = playerX;
    let newY = playerY;

    // 矢印キーによる移動処理
    switch (event.key) {
        case 'ArrowUp': if (playerY > 0) newY--; break; // 上移動
        case 'ArrowDown': if (playerY < 5) newY++; break; // 下移動
        case 'ArrowLeft': if (playerX > 0) newX--; break; // 左移動
        
        case 'ArrowRight': 
            if (playerX < 7) {
                newX++; // 右移動
            } else {
                window.location.href = 'nextpage.html'; // 画面右端で次のページへ遷移
                return;
            }
            break;
    }

    // アイテム収集の確認
    //items.forEach(item => {
    //    if (!item.collected && newX === item.x && newY === item.y) {
    //        item.collected = true;
    //        console.log(`${item.type}を手に入れた！`);
    //    }
    //});

    // ドラゴンとの衝突チェック（ドラゴンのサイズを考慮）
    if (!(newX >= dragonX && newX < dragonX + dragonSize && newY === dragonY)) {
        playerX = newX;
        playerY = newY;
        render(); // 移動後の画面再描画
    }
});

// 画像のロード完了後に初期描画を実行
Promise.all([
    new Promise(resolve => playerImage.onload = resolve),
    new Promise(resolve => dragonImage.onload = resolve),
    new Promise(resolve => backgroundImage.onload = resolve),
    new Promise(resolve => carImage.onload = resolve),
    //new Promise(resolve => swordImage.onload = resolve),
    //new Promise(resolve => potionImage.onload = resolve)
]).then(() => {
    render();
});