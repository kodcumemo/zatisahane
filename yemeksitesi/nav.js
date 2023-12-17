
navbar();
head();
async function head(event) {
    let head = document.getElementById("headnav");
        let heade = `
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
        `;
        head.insertAdjacentHTML("beforebegin",heade);           
}

async function navbar(event) {
    let navbar = document.getElementById("topnav");
    if(localStorage.getItem("name")== null){
        let top = `

        <div id="headBanner">
        <a href="index.html">
            <h1 class="yaziduzeni">🆉🅰🆃-🅸 Ş🅰🅷🅰🅽🅴</h1>
        </a>
    </div>
    <div id="adiv">
        <ul id="aul" class="ulenbas"></ul>
    </div>

    <div class="topnav">
        <a class="active" href="index.html">Ana Sayfa</a>
        <a href="login.html">Giriş Yap</a>
        <a href="register.html">Kayıt Ol</a>
    </div>
    <div style="width: 100%; height: 1px; background-color: black;"></div>
        `;

        navbar.insertAdjacentHTML("beforebegin",top);
    }  else {
        let top = `

        <div id="headBanner">
        <a href="index.html">
            <h1 class="yaziduzeni">🆉🅰🆃-🅸 Ş🅰🅷🅰🅽🅴</h1>
        </a>
    </div>
    <div id="adiv">
        <ul id="aul" class="ulenbas"></ul>
    </div>

    <div class="topnav">
        <a class="active" href="index.html">Ana Sayfa</a>
        <a href="customers.html">${localStorage.getItem("name")}</a>
        <a href="foodsadd.html">Yemek Listesi</a>
        <a href="index.html "onclick="onclickLogOut()">Çıkış Yap</a>
    </div>
    <div style="width: 100%; height: 1px; background-color: black;"></div>
        `;

        navbar.insertAdjacentHTML("beforebegin",top);
    }
}

function onclickLogOut() {
    localStorage.clear();
}