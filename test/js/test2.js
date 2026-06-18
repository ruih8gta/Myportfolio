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
