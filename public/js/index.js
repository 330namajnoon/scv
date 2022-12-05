const socket = io();
let msg = document.getElementById("msg");
let name_ = document.getElementById("name");
let email = document.getElementById("email");
let send = document.getElementById("send");

send.addEventListener("click", () => {

    if (msg.value != "" && name_.value !== "" && email.value !== "") {
        let date = new Date();
        let ruz = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        let mah = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + date.getMonth() + 1;
        let sal = date.getFullYear();
        let saat = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
        let daghighe = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
       
        socket.emit("msg", { name: name_.value, email: email.value, msg: msg.value, date: ruz + "/" + mah + "/" + sal + " " + " " + saat + ":" + daghighe});
        msg.value = "";
        name_.value = "";
        email.value = "";

    } else {
        alert()
    }
})

if (localStorage.getItem("bazdid")) {

} else {
    socket.emit("bazdid");
}