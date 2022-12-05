const socket = io();
let msg =  document.getElementById("msg");
let name_ = document.getElementById("name");
let email = document.getElementById("email");
let send = document.getElementById("send");

send.addEventListener("click",()=> {
    
    if(msg.value != "" && name_.value !== "" && email.value !== "") {
        
        socket.emit("msg",{name:name_.value,email:email.value,msg:msg.value});
        msg.value = "";
        name_.value = "";
        email.value = "";

    }else {
        alert()
    }
})

if(localStorage.getItem("bazdid")) {

}else {
    socket.emit("bazdid");
}