import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let currentIndex = 0;

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);
  socket.emit("init", currentIndex);

  socket.on("selectVideo", (index) => {
    currentIndex = index;
    io.emit("playVideo", index);
  });

  socket.on("playCustomVideo", (videoPath) => {
    io.emit("playCustomVideo", videoPath);
  });
  
  let currentLanguage = "en";

  socket.on("changeLanguage", (lang) => {
    currentLanguage = lang;
    io.emit("changeLanguage", lang); // Tüm TV'lere yay
  });
});

server.listen(3001, () => {
  console.log("Socket.IO server running on port 3001");
});
