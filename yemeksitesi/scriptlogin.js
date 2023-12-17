login();
function login() {
    navbar();
    head();
    kullanicilar();
    customerLogin();
}

var form = document.getElementById("loginForm");
//form.addEventListener("submit", loginedForm());


var cDatas;
var customer;
var auth = 1;
let cnamee;
let namme = document.getElementById("cnameid");

async function kullanicilar(event) {
    //event.preventDefault();
    let cdata;
    const response = await fetch(`http://localhost:8080/customer`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET",
        body: JSON.stringify(cdata)
    });
    cDatas = await response.json(cdata);
    let cDetail = document.getElementById("customerDetail");
    let roll;
    if (localStorage.getItem("name") !== null) {
        for (let rl of cDatas) {
            if (rl.id == localStorage.getItem("zatisahane")) {
                console.log(auth);
                roll = rl.roll;
                customer = rl;

                if (roll == 2) {
                    for (let index in cDatas) {
                        if (cDatas[index].roll === 1 || cDatas[index].roll === 2) {
                            let toRoll = cDatas[index].roll;
                            if (toRoll == 1) {
                                var rolu = "Kullanıcı";
                            } if (toRoll == 2) {
                                var rolu = "Admin";
                            }
                            let top = `
     <li class="list-group-item d-flex justify-content-between align-items-start bg-secondary text-light border border-black">
     <span class="btn text-light" href="customer.html">${rolu}</span>
        <div class="ms-2 me-auto bg-secondary text-light" >
          <div class="fw-bold bg-secondary text-light">${cDatas[index].name}</div>
          ${cDatas[index].adress}
        </div>
        <a id="btnedit" class="btn badge bg-primary rounded-pill" onclick="customerEdit(${cDatas[index].id})" >Güncelle</a>
      </li>
        `;
                            cDetail.insertAdjacentHTML("beforebegin", top);
                        }
                    }
                } if (roll == 1) {
                    //  alert(customer.name + " - " + customer.email + " - " + customer.adress + " - " + customer.roll + " - " + customer.tel);
                    let top = `
        <form id="registerForm" onsubmit="customerUpdate(${customer.id})">
        <h1 class="text-light w-100 text-center  rounded mx-auto d-block">GÜNCELLE</h1>
        <label class="text-light text-center w-100 m-auto p-4 fs-4">Lütfen aşağıdaki bilgileri doldurun...</label>
        <table class="w-25 m-auto">
        <tr>
            <td><label class="text-light" for="name">Ad:</label></td>
            <td><input class="form-control text-dark" type="text" id="name" name="name" maxlength="45" placeholder="${customer.name}" value="${customer.name}" required></td>
        </tr>
        <tr>
            <td><label class="text-light" for="email">E-posta:</label></td>
            <td><input class="form-control text-dark" type="email" id="email" name="email" maxlength="45" placeholder="${customer.email}" value="${customer.email}" required></td>
        </tr>
        <tr>
            <td><label class="text-light" for="adress">Adres:</label></td>
            <td><input class="form-control text-dark" type="text" id="adress" name="adress" maxlength="255" placeholder="${customer.adress}" value="${customer.adress}" required></td>
        </tr>
        <tr>
            <td><label class="text-light" for="tel">Telefon:</label></td>
            <td><input class="form-control text-dark" type="tel" id="tel" name="tel" pattern="[0-8]{11}" maxlength="11" placeholder="${customer.tel}" value="${customer.tel}" required></td>
        </tr>
        <tr>
            <td></td> <!--onclick="updateForum()"-->
        </tr>
        </table>  
        <div class="w-100">
            <input  type="submit" class="btn btn-success m-2 w-25 rounded mx-auto d-block" value="GÜNCELLE">
        </div>     
    </form>
    </div>
        `;
                    cDetail.insertAdjacentHTML("beforebegin", top);
                }
            }
        }
    }

}
const cedit = document.getElementById("btnedit");
async function customerEdit(id) {
    
sessionStorage.setItem("cdatas",id);
location.href=`/customer.html`;
}

//  ---- GİRİŞ YAPMA METODU ----
async function loginedForm() {
    event.preventDefault();

    let customer = {
        email: form[0].value,
        password: form[1].value
    };

    if (email.length > 45) {
        alert("E-posta alanı 45 karakterden uzun olamaz.");
        return;
    }


    if (password.length > 8) {
        alert("Şifre alanı 8 karakterden uzun olamaz.");
        return;
    }
    try {


        let response = await fetch("http://localhost:8080/clogin", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(customer)
        });
        let data = await response.text();
        localStorage.setItem("token", data);
        for (let cd of cDatas) {
            if (customer.email == cd.email) {
                localStorage.setItem("name", cd.name);
                localStorage.setItem("zatisahane", cd.id);
            }
        }
        window.location.href="login.html";
    } catch (error) {
        alert("Bir sorun oldu");
    }
    // location.href = "/index.html";
}

async function customerUpdate(id) {
    event.preventDefault();
    customer = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        adress: document.getElementById("adress").value,
        tel: document.getElementById("tel").value,

    }
    const response = await fetch(`http://localhost:8080/customer/${id}`, {

        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(customer)
    });
    window.location.href="login.html";

}
//  ---- GİRİŞ YAPMA PANELİ ----
async function customerLogin() {
    //event.preventDefault();
    var customerUp = document.getElementById("loginPanel");
    if (localStorage.getItem("name") == null) {
        var customer = `
    <form id="loginForm" >

    <div class="">
      <h1 class="text-light w-100 text-center rounded mx-auto d-block">GİRİŞ YAP</h1>
      <label class="text-light text-center w-100 m-auto p-4 fs-4" id="isimlik">Lütfen aşağıdaki bilgileri
        doldurun...</label>
      <table class="m-auto w-25">

        <tr>
          <td><label class="text-light" for="email">E-posta:</label></td>
          <td><input class="form-control text-dark" type="email" id="email" name="email" maxlength="45" required
              autocomplete="suggest-email"></td>
        </tr>

        <tr>
          <td><label class="text-light" for="password">Şifre:</label></td>
          <td><input class="form-control text-dark" type="password" id="password" name="password" maxlength="8" required
              autocomplete="current-password"></td>
        </tr>
      </table>
      <div class="w-100 ">
        <input type="submit" class="btn btn-success m-2 w-25 rounded mx-auto d-block" onclick="loginedForm(); "
          value="Tamam">
      </div>
    </div>
  </form>
  </div>

    `;
    } else {
        console.log("localdeki isimim: " + localStorage.getItem("name"));
    }

    customerUp.insertAdjacentHTML("beforebegin", customer);

}

//               - - - - - navbar - - - - - 

""

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
    head.insertAdjacentHTML("beforebegin", heade);
}

async function navbar(event) {
    let navbar = document.getElementById("topnav");
    let top = "";
    if (localStorage.getItem("name") == null) {
        top = `

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

        navbar.insertAdjacentHTML("beforebegin", top);
    } else {
        top = `

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
        <a href="login.html">${localStorage.getItem("name")}</a>
        <a href="foodsadd.html">Yemek Listesi</a>
        <a href="index.html "onclick="onclickLogOut()">Çıkış Yap</a>
    </div>
    <div style="width: 100%; height: 1px; background-color: black;"></div>
        `;

        navbar.insertAdjacentHTML("beforebegin", top);
    }
}


function onclickLogOut() {
    localStorage.clear();
}



//            - - - - - index - - - - -

