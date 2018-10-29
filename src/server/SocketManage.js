const io = require('./index.js').io;

module.exports = function(socket) {
  console.log("Socket: ");
  console.log(socket.id);
}