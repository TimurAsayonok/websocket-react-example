const app = require('http').createServer();
const io = module.exports.io = require('socket.io')(app);

const PORT = process.env.PORT || 3001;

const SocketManager = require('./SocketManage');

io.on('connection', SocketManager);

app.listen(PORT, () => {
  console.log("Connected to port: " + PORT);
});