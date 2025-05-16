document.addEventListener("DOMContentLoaded", () => {
fetch("test_header.html") // ヘッダーのHTMLを取得
        .then((response) => response.text())
        .then((data) => document.querySelector("#header-container").innerHTML = data);
});
