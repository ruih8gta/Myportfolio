// キャラクターとゲームエリアの要素を取得
const character = document.getElementById('character');
const gameArea = document.querySelector('.game-area');

// キャラクターの移動量とグリッドサイズを定義
const gridSize = 50; // グリッドのサイズ

// キャラクターの初期位置をHTMLのdata属性から取得
let gridX = parseInt(character.dataset.gridX, 10); // 初期X座標
let gridY = parseInt(character.dataset.gridY, 10); // 初期Y座標

// キャラクターの位置をグリッドに基づいて更新
function updateCharacterPosition() {
    character.dataset.gridX = gridX; // data属性を更新
    character.dataset.gridY = gridY; // data属性を更新
    character.style.left = `${gridX * 50}px`; // X座標を計算して設定
    character.style.top = `${gridY * 50}px`; // Y座標を計算して設定
}

// 初期位置を設定
updateCharacterPosition();

// すべての障害物の位置を取得
function getOccupiedPositions() {
    const occupied = [];
    document.querySelectorAll('.grid-position').forEach(element => {
        const gridX = parseInt(element.dataset.gridX, 10);
        const gridY = parseInt(element.dataset.gridY, 10);
        if (element.id !== 'character') { // キャラクター自身は除外
            occupied.push({ gridX, gridY });
        }
    });
    return occupied;
}

// 指定した位置が障害物に占有されているか確認
function isPositionOccupied(gridX, gridY) {
    const occupiedPositions = getOccupiedPositions();
    return occupiedPositions.some(pos => pos.gridX === gridX && pos.gridY === gridY);
}

// キー入力でキャラクターを動かす
document.addEventListener('keydown', (event) => {
    let newGridX = gridX;
    let newGridY = gridY;

    switch (event.key) {
        case 'ArrowUp': // 上矢印キー
            if (gridY > 0) newGridY--; // 上端を超えないように移動
            break;
        case 'ArrowDown': // 下矢印キー
            if (gridY < gameArea.offsetHeight / gridSize - 1) newGridY++; // 下端を超えないように移動
            break;
        case 'ArrowLeft': // 左矢印キー
            if (gridX > 0) newGridX--; // 左端を超えないように移動
            break;
        case 'ArrowRight': // 右矢印キー
            if (gridX < gameArea.offsetWidth / gridSize - 1) {
                newGridX++; // 右端を超えないように移動
            } else {
                // 右端に到達した場合、別のページに遷移
                window.location.href = 'nextpage.html'; // 遷移先のURLを指定
                return;
            }
            break;
    }

    // 移動先が障害物に占有されていない場合のみ移動
    if (!isPositionOccupied(newGridX, newGridY)) {
        gridX = newGridX;
        gridY = newGridY;
        updateCharacterPosition(); // キャラクターの位置を更新
    }
});

function setGridPosition(element, gridX, gridY) {
    element.style.setProperty('--grid-x', gridX); // X座標を設定
    element.style.setProperty('--grid-y', gridY); // Y座標を設定
}

// 初期位置を設定
const dragon = document.getElementById('dragon');
setGridPosition(dragon, 3, 1); // ドラゴンをグリッド座標 (4, 3) に配置

// コマンド入力と実行ボタンの要素を取得
const commandInput = document.getElementById('command-input');
const executeCommand = document.getElementById('execute-command');

// コンテンツエリアの要素を取得
const contentArea = document.getElementById('content-area');
// コマンドリンクの要素を取得
const commandLinks = document.querySelectorAll('.command-area a');

commandLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // デフォルトのリンク動作を無効化
        const command = event.target.dataset.command; // data-command属性を取得
        let content = '';

        switch (command) {
            case '1': // 自己紹介コマンド
                content = '職業：データサイエンティスト<br>スキル：Python<br>必殺技：合気道'; // 表示する内容
                break;
            case '2': // SNSコマンド
                content = 'SNS: <a href="https://twitter.com" target="_blank">Twitter</a>, <a href="https://instagram.com" target="_blank">Instagram</a>, <a href="https://linkedin.com" target="_blank">LinkedIn</a>';
                break;
            case '3': // 出版物コマンド
                content = '出版物: 書籍タイトル1, 書籍タイトル2';
                break;
            case '4': // ポートフォリオコマンド
                content = 'ポートフォリオ: プロジェクト1, プロジェクト2';
                break;
            default: // 無効なコマンド
                content = '指示を待っている。';
        }

        contentArea.innerHTML = content; // コンテンツを更新
        contentArea.style.display = 'block'; // コンテンツエリアを表示
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById("character");

    function moveCharacter(dx, dy) {
        let x = parseInt(character.dataset.gridX, 10);
        let y = parseInt(character.dataset.gridY, 10);
        x += dx;
        y += dy;
        // 範囲チェック（必要に応じて調整）
        x = Math.max(0, Math.min(6, x));
        y = Math.max(0, Math.min(6, y));
        character.dataset.gridX = x;
        character.dataset.gridY = y;
        character.style.gridColumn = x + 1;
        character.style.gridRow = y + 1;
    }

    document.getElementById("up-btn").onclick = () => moveCharacter(0, -1);
    document.getElementById("down-btn").onclick = () => moveCharacter(0, 1);
    document.getElementById("left-btn").onclick = () => moveCharacter(-1, 0);
    document.getElementById("right-btn").onclick = () => moveCharacter(1, 0);
    document.getElementById("a-btn").onclick = () => {
        alert("Aボタンが押されました！");
    };

    // 初期位置反映
    moveCharacter(0, 0);
});