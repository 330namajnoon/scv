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

    client.on("disconnect",()=> {
        console.log("new web disconnect");
    })
})

server.listen(port,()=> {
    console.log(`server is up on port ${port}!`);
})

