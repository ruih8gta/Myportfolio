// コンテンツエリアの要素を取得
const contentArea = document.getElementById('content-area');
// コマンドリンクの要素を取得
const commandLinks = document.querySelectorAll('.command-area a');

// コマンドの内容を data/links.json から読み込む
let commandData = {};

fetch('data/links.json')
    .then(response => response.json())
    .then(data => { commandData = data; });

// 1つのアイテム（テキストまたはリンク）をHTML文字列に変換
function renderItem(item) {
    if (item.url) {
        const target = item.blank ? ' target="_blank"' : '';
        return `<a href="${item.url}"${target}>${item.label}</a>`;
    }
    return item.text;
}

// コマンド番号に対応する内容のHTMLを生成
function buildContent(command) {
    const entry = commandData[command];
    if (!entry || !entry.items) {
        return commandData.default || '指示を待っている。';
    }
    return entry.items.map(renderItem).join('<br>');
}

commandLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // デフォルトのリンク動作を無効化
        const command = event.target.dataset.command; // data-command属性を取得

        contentArea.innerHTML = buildContent(command); // コンテンツを更新
        contentArea.style.display = 'block'; // コンテンツエリアを表示
    });
});
