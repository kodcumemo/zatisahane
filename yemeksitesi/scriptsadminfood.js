let datas;     // veritabanından çekilen bilgiler json olarak saklanıyor.
let bilgi;      // datasın güncelleme için kullanıldığın da kullanılan değişken
var seciliId;   // id değeri ayrıca tutulurken kullanılıyor.
var silinenler = true;  // silinen ürünlerin UI da görünmesi için kullanılan boolean değişken
let goruntule = document.getElementById("datasGet");

function silinenleriGetir() {
    event.preventDefault(); // Formun otomatik olarak gönderilmesini engeller
    if (silinenler) {
        silinenler = false;
    } else {
        silinenler = true;
    }
    goruntule.innerHTML = "";
    foodValidateForm();
}
async function foodValidateForm(event) {    // veritabanından food tabloyu çekip aşağıya sıralıyor.
    // event.preventDefault(); // Formun otomatik olarak gönderilmesini engeller

    var foodi;
    var response = await fetch("http://localhost:8080/foodsadd", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            //    "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(foodi),

    });
    datas = "";
    datas = await response.json(foodi);
    
    goruntule = document.getElementById("datasGet");
    if (response.length == 0) {
        goruntule.innerHTML += `<tr> <td colspan="5" style="color:rgb(255, 63, 63)">Henüz eklenmiş bir ürün bulunmamakta</td></tr>`
    } else {

        for (let index in datas) {
            
            if (silinenler) {
                if (datas[index].isDelete) {
                    let fUpdate = `
    <div>
    <tr> 
        <td><input class="form-control  text-dark updateFood" type="text" name="id" id="getids${datas[index].id}" value="${datas[index].id}"></td>
        <td><input class="form-control  text-dark updateFood" type="text" name="turu" id="turu${datas[index].id}" value="${datas[index].turu}">            </td>
        <td><input class="form-control  text-dark updateFood" type="text" name="title" id="title${datas[index].id}" value="${datas[index].title}">         </td>
        <td><input class="form-control  text-dark updateFood" type="text" name="detail" id="detail${datas[index].id}" value="${datas[index].detail}">     </td>
        <td><input class="form-control  text-dark updateFood" type="text" name="url" id="url${datas[index].id}" value="${datas[index].url}">               </td>
        <td><input class="form-control  text-dark updateFood" type="number" name="price" id="price${datas[index].id}" value="${datas[index].price}">         </td>
        <td><input class="form-control  text-dark updateFood" type="date" name="tarihi" id="localDate${datas[index].id}" value="${datas[index].localDate}"></td>
        <td><button class="btn btn-danger" onclick="isDeleteTask(${datas[index].id}); this.parentNode.parentNode.remove()">Sil</button></td>
        <td><button class="btn btn-success" onclick="updateTask(${datas[index].id});  this.parentNone.parentNode.remove()" >Güncelle</button></td>
    </tr>
    </div> `;
                    goruntule.insertAdjacentHTML("beforeend", fUpdate);
                }
            }
            if (!silinenler) {
                if (!datas[index].isDelete) {
                    let foodDeleted = `
            <div> <label style="color:rgb(255, 63, 63)">Silindi</label>
    <tr> 
        <td><input class="form-control  text-dark updateFood" type="text" readonly name="id" id="getids" value="${datas[index].id}"></td>
        <td><input class="form-control  text-dark updateFood" type="text" readonly name="turu" id="turu" value="${datas[index].turu}">            </td>
        <td><input class="form-control  text-dark updateFood" type="text" readonly name="title" id="title" value="${datas[index].title}">         </td>
        <td><input class="form-control  text-dark updateFood" type="text" readonly name="detail" id="detail" value="${datas[index].detail}">     </td>
        <td><input class="form-control  text-dark updateFood" type="text" readonly name="url" id="url" value="${datas[index].url}">               </td>
        <td><input class="form-control  text-dark updateFood" type="number" readonly name="price" id="price" value="${datas[index].price}">         </td>
        <td><input class="form-control  text-dark updateFood" type="date" readonly name="tarihi" id="localDate" value="${datas[index].localDate}"></td>
        <td><button class="btn btn-danger" onclick="deleteTask(${datas[index].id});  this.parentNode.parentNode.remove()">Kalıcı Sil</button></td>
        <td><button class="btn btn-primary" onclick="removeTask(${datas[index].id}); this.parentNode.parentNode.remove()">Geri Al</button></td>
    </tr>
    </div>
            `;
                    goruntule.insertAdjacentHTML("beforeend", foodDeleted);
                }
            }



        }

        bilgi = datas;
    }
}
let listes = document.getElementById("datasGet");
listes.addEventListener('submit',isDeleteTask);
 
async function deleteTask(id) {
        event.preventDefault();
        datas = "";
        const response = await fetch(`http://localhost:8080/foodsadd/${id}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
           // body: JSON.stringify(datas),
           
        });
  
}
goruntule.addEventListener("submit",isDeleteTask);
async function isDeleteTask(id) {
    datas = "";
    event.preventDefault();
        let response = await fetch(`http://localhost:8080/foodsadd/${id}/delete`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datas)
           
        });
        //foodValidateForm();
}
goruntule.addEventListener("submit",removeTask);
async function removeTask(id) { // silinen urun geri getiriliyor.
    event.preventDefault();
        const response = await fetch(`http://localhost:8080/foodsadd/${id}/undelete`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datas)
        });
        datas = "";
        //foodValidateForm();
}


foodValidateForm();
let foodAddIdsi = document.getElementById("foodsSave");
foodAddIdsi.addEventListener("submit",foodValidateAddForm);

async function foodValidateAddForm(event) {   
    event.preventDefault();
    let foods = {
        title: document.getElementById("title").value,
        detail: document.getElementById("detail").value,
        url: document.getElementById("url").value,
        price: document.getElementById("price").value,
        turu: document.getElementById("turu").value
    };

    const response = await fetch("http://localhost:8080/foodsadd", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(foods)

    });
}

async function updateTask(id) {
    event.preventDefault();
    let foodsUpdate;
    for (let index in datas) {
        console.log(datas[index].id);
        if (datas[index].id == id) {
            // console.log(datas[index].id + " " + datas[index].turu + " title: " + datas[index].title + " detail: " + datas[index].detail + " fiyatı: " + datas[index].price + " resim urlsi: " + datas[index].url);

            foodsUpdate = datas[index];
            console.log("------------------");
            console.log(foodsUpdate);
            console.log("------------------");

            //isDelete: true;
            //localDate: new Date();
            break;
        }
    }

    foodsUpdate.id = id;
    foodsUpdate.turu = document.getElementById("turu" + id).value;
    foodsUpdate.title = document.getElementById("title" + id).value;
    foodsUpdate.detail = document.getElementById("detail" + id).value;
    foodsUpdate.url = document.getElementById("url" + id).value;
    foodsUpdate.price = document.getElementById("price" + id).value;
    console.log(typeof id + " id: " + id);


    try {
        var response = await fetch(`http://localhost:8080/foodsadd/${id}/update`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(foodsUpdate),

        });

        console.log("foodsUpdate gitti");
        if (response.ok) {

            var data = await response.json();
        }

    } catch (error) {
    }
}
