const http = require("http");
const path = require("path");
const express = require("express");
const multer = require("multer");
const {on} = require("events");
const socketio = require("socket.io");
const app = express();
const pdp = path.join(__dirname,"./public");
const port = process.env.PORT || 4000;
app.use(express.static(pdp));
const server = http.createServer(app);
const io = socketio(server);
const fs = require("fs");
const { json } = require("express");
const upload = multer({
    storage: multer.diskStorage({
        destination : (req,file,cd) => {
            cd(null,"./public")
        },
        filename: (req,file,cd) => {
            cd(null,file.originalname)
        }
    })
})
app.post("/upload_cv",upload.single('cv'),(req,res) => {

})

io.on("connection",(client)=> {
    console.log("new web connect");

    client.on("bazdid",()=> {
        let b;
        fs.readFile("./public/database/bazdidha.json",(err,data) => {
            if(err) throw err;
            b = Number(JSON.parse(data.toString()));
            b++;
            fs.writeFile("./public/database/bazdidha.json",JSON.stringify(b),(err)=> {

            })
        })
        
    })
    client.on("msg",(data)=> {
        fs.appendFile("./public/database/mensajes.json",","+JSON.stringify(data),(err)=> {
            io.emit("msg");
        })
    })

    client.on("msgLoader",()=> {
        fs.readFile("./public/database/bazdidha.json",(err,data_)=> {
            fs.readFile("./public/database/mensajes.json",(err,data)=> {
                if(err) throw err;
                client.emit("msgLoader",data.toString(),Number(JSON.parse(data_.toString())));
            })
        })
    })

    client.on("disconnect",()=> {
        console.log("new web disconnect");
    })
})

server.listen(port,()=> {
    console.log(`server is up on port ${port}!`);
})

