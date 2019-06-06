let express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

app.disable("x-powered-by");
app.use(cors());
app.use(bodyParser.json({}));

let server = app.listen(1881, "192.168.43.58", () => {
  console.log("started on port 1881");
});

let socketIo = require("socket.io");
const io = socketIo(server);

io.on("connection", socket => {
  // Log whenever a user connects
  console.log("user connected");
  socket.emit('create', 'connecté allah socket');

  // Log whenever a client disconnects from our websocket server
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
    socket.on("initIp", message => {
      console.log("Message Received: " + message);
      io.emit("initIp", message);
    });
});
