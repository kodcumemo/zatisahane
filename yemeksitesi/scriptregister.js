async function registeredForm() {
    // event.preventDefault(); // Formun otomatik olarak gönderilmesini engeller


    // Formdaki değerleri al
    let customer = {
        name: document.getElementById("namee").value,
        email: document.getElementById("email").value,
        adress: document.getElementById("adress").value,
        tel: document.getElementById("tel").value,
        password: document.getElementById("password").value
    };

    // Basit bir doğrulama yapabilirsiniz, gerektiğinde daha fazla doğrulama kuralları ekleyebilirsiniz
    if (customer.name.length > 45 || customer.email.length > 45 || customer.adress.length > 255 || customer.tel.length !== 10 || customer.password.length > 8 || customer.password.length < 4) {
        alert("Lütfen geçerli bilgiler girin.");
        return;
    }
    fetch("http://localhost:8080/cregister", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    })
    .then((response) => response.text())

        .then((data) => {

            localStorage.setItem("token", JSON.stringify(data));
            alert("Data " + JSON.stringify(data.message));
            location.href = "./login.html";
        }).catch((error) => console.error("error", error));


}