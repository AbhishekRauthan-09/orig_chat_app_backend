const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const app = express();
dotenv.config({ path: "./.env" });
const socket = require("socket.io");

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(messageRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connection established with DB");
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT ||5000 ;

const server = app.listen( PORT , () => {
  console.log(`server listening on port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    "Access-Control-Allow-Origin": "https://chatify-chatapp.netlify.app",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-message", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieved', data.message);
    }
  });
});
