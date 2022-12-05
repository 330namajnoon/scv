const socket = io();


function Msg(data) {
    this.data = data;
    this.paszamine = document.createElement("div");
    this.paszamine.className = "msgPaszamine";
    this.heder = document.createElement("div");
    this.heder.className = "msgHeder";
    this.moshakhasat = document.createElement("h2");
    this.moshakhasat.innerHTML = `${this.data.name} : ${this.data.email}`;
    this.msg =document.createElement("h3");
    this.msg.innerHTML = this.data.msg;
    this.date = document.createElement("h4");
    this.date.innerHTML = this.data.date;
    this.paszamine.appendChild(this.heder);
    this.heder.appendChild(this.moshakhasat);
    this.paszamine.appendChild(this.msg);
    this.paszamine.appendChild(this.date);
}


function RabeteKarbari() {
    this.body = document.querySelector("body");
    this.paszamine = document.createElement("div");
    this.paszamine.className = "paszamine";
    this.bazdidhaP = document.createElement("div");
    this.bazdidhaP.className = "bazdidhaP"; 
    this.bazdidhaIMG = document.createElement("img");
    this.bazdidhaIMG.src = "../images/view.png";
    this.bazdidhaIMG.className = "bazdidhaIMG"; 
    this.bazdidha = document.createElement("h3");
    this.bazdidha.className = "bazdidha"; 
    this.bazdidha.innerHTML = "0";
    this.msgsP = document.createElement("div");
    this.msgsP.className = "msgP";
    this.body.appendChild(this.paszamine);
    this.paszamine.appendChild(this.bazdidhaP);
    this.paszamine.appendChild(this.msgsP);
    this.bazdidhaP.appendChild(this.bazdidhaIMG);
    this.bazdidhaP.appendChild(this.bazdidha);
    this.msgs = [];
}
RabeteKarbari.prototype.namayeshPayamha = function(msgs,bazdidha) {
    this.bazdidha.innerHTML = bazdidha;
    this.msgsP.innerHTML = "";
    this.msgs = [];
    msgs.forEach(e => {
        this.msgs.push(new Msg(e));
    })
    for (let index = this.msgs.length-1; index >= 1; index--) {
        this.msgsP.appendChild(this.msgs[index].paszamine);
    }
}

const rabetecarbari = new RabeteKarbari();




socket.emit("msgLoader");
socket.on("msgLoader",(msgs,bazdidha)=> {
    let msgs_ = JSON.parse("["+msgs+"]");
    rabetecarbari.namayeshPayamha(msgs_,bazdidha);
})

socket.on("msg",()=> {
    socket.emit("msgLoader");
})