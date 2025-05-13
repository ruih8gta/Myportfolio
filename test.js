document.addEventListener("DOMContentLoaded", () => {
fetch("header.html") // ヘッダーのHTMLを取得
        .then((response) => response.text())
        .then((data) => document.querySelector("#header-container").innerHTML = data);
});