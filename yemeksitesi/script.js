
var customerEmail = localStorage.getItem("customerEmail");


async function foodRegister() {

    var foods;
    var response = await fetch("http://localhost:8080/index", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(foods),

    });

    var data = await response.json();

if(localStorage.getItem("name") != ""){
   
}else{
    let cname = document.getElementById("cname").innerHTML = `${customerName}`; 
}
    let cemail = document.getElementById("cemail").innerHTML = customerEmail;
    function foodServices(foodTuru, turu) {
        turidsi = document.getElementById(foodTuru);       // kategori için html de ul etiketinin id bilgisini alıyorum. 
        for (let index in data) {                         // databaseden gelen veriyi parçalamak için dönüyorum.
            console.log(data[index].id + " Databasedeki türü: " + data[index].turu +   " - bizdeki türü: " + turu);
            if (data[index].turu == turu)                // databaseden gelen veriden listelemek istediğin veriyi seçiyorum
            {                                           // aşağıda html içinde seçtiğim verileri komponent halinde bastırıyorum. 
                    let li = `       
                <div class="col ">
            <div class="card h-100 ">
                <div class="card-body h-50">
                    <a href="#" class="text-decoration-none" >
                        <img src="${data[index].url}" class="card-img-top " alt="...">
                    </a>
                </div>    
                <div class="card-body  d-flex  flex-column h-50 ">
                    <div class="card-body  h-75">
                        <h5 class="card-title text-light fs-3 d-flex align-items-end" id="${index}">${data[index].title}</h5>
                        <p class="card-text text-light fs-5 p-2 bd-highlight">${data[index].detail}</p>
                    </div>
                    <div class="card-body d-flex ">
                    <div class="card-body" >
                        <span class="card-text text-primary fs-2 d-flex ms-auto mt-auto ">${data[index].price} ₺ <a href="#" class="btn btn-primary d-flex  ms-auto">Sepete Ekle</a> </span>
                        </div>
                    </div>
            </div> 
        </div>
    `;
                
                turidsi.insertAdjacentHTML("beforeend", li);          // ul listesine nasıl yazdıracağımı belirtiyorum. beforeend baştan sona yazdırıyor, afterbegin dersem en son gelen veri en başta görünür.
            }
        }
    }
    foodServices("tasklistKebap","kebap");
    foodServices("taskList", "pide");    // pideler
    foodServices("taskListCorba", "corba");
    foodServices("taskListKiremit", "kiremit");

    //Popüler kısmı eklemesi başı
   /* newTaskList = document.getElementById("newTaskList");
    for (let index in data) {
       // if (data[index].id === 153 || data[index].id === 157 || data[index].id === 163) {
            let li = `
        <div class="col  ">
            <div class="card h-100 ">
                <div class="card-body h-50">
                    <a href="#" class="text-decoration-none" >
                        <img src="${data[index].url}" class="card-img-top " alt="...">
                    </a>
                </div>    
                <div class="card-body  d-flex  flex-column h-50 ">
                    <div class="card-body  h-75">
                        <h5 class="card-title text-light fs-3 d-flex align-items-end" id="${index}">${data[index].title}</h5>
                        <p class="card-text text-light fs-5 p-2 bd-highlight">${data[index].detail}</p>
                    </div>
                    <div class="card-body d-flex ">
                    <div class="card-body" >
                        <span class="card-text text-primary fs-2 d-flex ms-auto mt-auto ">${data[index].price} ₺ <a href="#" class="btn btn-primary d-flex  ms-auto">Sepete Ekle</a> </span>
                        </div>
                    </div>
            </div> 
        </div>
            
    `;
    newTaskList.insertAdjacentHTML("beforeend", li);
    //    }
    }*/
    let gMenusu = document.getElementById("gununMenusuu");
    let item =`
    <a href="#">
                <div class="card h-100">
                    <img src="${data.url}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data[179].title}</h5>
                        <p class="card-text">${data[index].detail}</p>
                        <p class="card-text>${data[index].price}</p>
                    </div>
                </div>
            </a>
    `;
    gMenusu.insertAdjacentHTML("beforeend", item);
    // populer kısmı ekleme sonu
    // let count = ul.children.length;
}
foodRegister();


//document.getElementById("aul").innerHTML = `Müşteri no: ${customerId}`;
    // indexlogin kodları sonu
    // giriş yapıktan sonra

    /*
    <li>
            <a href="#">
                <div class="menuSiparis">
                    <div class="menuSipImc"><img src="${data[index].url}" alt="Zatışahane Resim" class="menuSipImc"></div>
                        <div class="menuSipicAlt">
                            <h1 class="menuSipsolust" id="${index}">${data[index].title}</h1>
                            <p class="menuSipsolalt">${data[index].detail}</p>
                            <p class="menuSipsolaltprice">Ücret: ${data[index].price} Tl</p>
                        </div>
                    </div>
                </div>
            </a>
        </li>
*/
    // eski tasarım
/*
<div class="col  card-height: 100%">${turu} <br>${data[index].turu}
                    <div class="   card" style="width: 18rem; ">
                        <a href="#">
                        <img src="${data[index].url}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title" id="${index}">${data[index].title}</h5>
                            <p class="card-text">${data[index].detail}</p>
                            <p class="menuSipsolaltprice">Ücret: ${data[index].price} Tl</p>
                            <a href="#" class="btn btn-primary">Sepete Ekle</a>
                        </div>
                        </a>
                    </div>
                </div>
*/