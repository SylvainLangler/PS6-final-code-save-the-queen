let express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

app.disable("x-powered-by");
app.use(cors());
app.use(bodyParser.json({}));

let server = app.listen(1880, "192.168.43.58", () => {
  console.log("started on port 1880");
});

let socketIo = require("socket.io");
const io = socketIo(server);

io.on("connection", socket => {
  // Log whenever a user connects
  var clientIpAddress =
    socket.request.headers["x-forwarded-for"] ||
    socket.request.connection.remoteAddress;
  console.log("==> new connection from : " + clientIpAddress);

  socket.emit("create", "connecté touze socket");

  // Log whenever a client disconnects from our websocket server
  socket.on("disconnect", function() {
    console.log("<== user disconnected " + clientIpAddress );
  });

  socket.on("initIp", message => {
    console.log("Message Received: " + message);
    socket.broadcast.emit("initIp", message);
  });

  socket.on("up", message => {
    console.log("Upped Received: " + message);
    socket.broadcast.emit("up", message);
  });
});
