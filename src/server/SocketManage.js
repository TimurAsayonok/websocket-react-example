const io = require('./index.js').io;
const { USER_CONNECTED, LOGOUT, VERIFY_USER } = require('../actions/socketActions');
const { createUser } = require('../factories/userFactory');

const connectedUser = {}

module.exports = function(socket) {
  console.log("Socket: ");
  console.log(socket.id);

  //verify username
  socket.on(VERIFY_USER, (name, callback) => {
    if (isUser) {
      callback({ name: null, isUser: true})
    } else {
      callback({
        isUser: false, user: createUser({ name })
      })
    }
  })
  //User connects with username

  //User disconnects

  //User logouts

}

/*
* Adds user to list passed in
* @param userList { Object }
* @param user { User }
* @return userList { Object }
*/

function addUser(userList, user) {

}