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
                content = '職業：データサイエンティスト'
                + '<br>専門：生成AI・システム開発'
                + '<br>得意な呪文：Python'
                + '<br>必殺技：合気道'; // 表示する内容
                break;
            case '2': // SNSコマンド
                content = 'SNS:'
                + '<br><a href="https://www.linkedin.com/in/shota-n-0bb024231/" target="_blank">LinkedIn</a>'
                + '<br><a href="https://github.com/ruih8gta" target="_blank">GitHub</a>'
                + '<br><a href="https://qiita.com/ruih8gta" target="_blank">Qiita</a>';
                break;
            case '3': // 出版物コマンド
                content = '出版物:'
                + '<br><a href="https://www.jstage.jst.go.jp/article/pfr/13/0/13_3405117/_article" target="_blank">論文その１</a>'
                + '<br><a href="https://www.sciencedirect.com/science/article/abs/pii/S0920379621001368" target="_blank">論文その２</a>';
                break;
            case '4': // ポートフォリオコマンド
                content = 'ポートフォリオ:'
                + '<br><a href="">工事中。。。</a>';
                break;
            case '5': // 連絡先コマンド
                content = 'スキル詳細:'
                + '<br><a href="status.html" target="_blank">スキル詳細</a>';
                break;
            default: // 無効なコマンド
                content = '指示を待っている。';
        }

        contentArea.innerHTML = content; // コンテンツを更新
        contentArea.style.display = 'block'; // コンテンツエリアを表示
    });
});
