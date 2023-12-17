
updateForm(sessionStorage.getItem("cdatas"));
async function updateForm(id) {
    // let customer = {
    //     name: document.getElementById("name").value,
    //     email :document.getElementById('email').value,
    //     adress: document.getElementById("adres").value,
    //     tel: document.getElementById("tel").value,
    //     roll: document.getElementById("roll").value
    // }
    
    var customer;
    const response = await fetch(`http://localhost:8080/customer/${id}`,{
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET",
        body: JSON.stringify(customer)
    });
    let data = await response.json();
    cupdate = document.getElementById("customerUpdate");
    let top = `
        <form id="registerForm" onsubmit="customerUpdate(${data.id})">
        <h1 class="text-light w-100 text-center  rounded mx-auto d-block">GÜNCELLE</h1>
        <label class="text-light text-center w-100 m-auto p-4 fs-4">Lütfen aşağıdaki bilgileri doldurun...</label>
        <table class="w-25 m-auto">
        <tr>
            <td><label class="text-light" for="name">Ad:</label></td>
            <td><input class="form-control text-dark" type="text" id="name" name="name" maxlength="45" placeholder="${data.name}" value="${data.name}" required></td>
        </tr>
        <tr>
            <td><label class="text-light" for="email">E-posta:</label></td>
            <td><input class="form-control text-dark" type="email" id="email" name="email" maxlength="45" placeholder="${data.email}" value="${data.email}" required></td>
        </tr>
        <tr>
            <td><label class="text-light" for="adress">Adres:</label></td>
            <td><input class="form-control text-dark" type="text" id="adress" name="adress" maxlength="255" placeholder="${data.adress}" value="${data.adress}" required></td>
        </tr>
        <tr>
            <td><label class="text-light" for="tel">Telefon:</label></td>
            <td><input class="form-control text-dark" type="tel" id="tel" name="tel" pattern="[0-8]{11}" maxlength="11" placeholder="${data.tel}" value="${data.tel}" required></td>
        </tr>
        <tr>
        <td><label class="text-light" for="password">Yetkisi:</label></td>
        <td><!-- <input class="form-control text-dark" type="number" id="roll" name="roll" maxlength="1"placeholder="${data.roll}" value="${data.roll}" required>-->
        <select name="customerRoll" id="customerRoll" class="form-control text-dark" type="number" id="roll" name="roll" maxlength="1"placeholder="${data.roll}" value="${data.roll}" required >
        <option value="1" class="form-control text-dark">Kullanıcı</option>
        <option value="2" class="form-control text-dark">Admin</option>
        <option value="0" class="form-control text-dark">Pasif yap</option></select>
        </td>
        </tr>
        </table>  
        <div class="w-100">
            <input  type="submit" class="btn btn-success m-2 w-25 rounded mx-auto d-block" value="GÜNCELLE">
        </div>     
    </form>
    </div>
        `;
                    cupdate.insertAdjacentHTML("beforebegin", top);
                   
}