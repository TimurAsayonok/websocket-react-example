const io = require('./index.js').io;
const { USER_CONNECTED, LOGOUT, VERIFY_USER } = require('../actions/socketActions');
const { createUser } = require('./factories/userFactory');

let connectedUsers = {}

module.exports = function(socket) {
  console.log("Socket: ");
  console.log(socket.id);

  //verify username
  socket.on(VERIFY_USER, (name, callback) => {
    if (isUser(connectedUsers, name)) {
      callback({ name: null, isUser: true})
    } else {
      callback({
        isUser: false, user: createUser({ name })
      })
    }
  })
  //User connects with username
  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;
  })

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
  const newList = { ...userList };
  newList[user.name] = user;

  return newList;
}

/*
* Removes user from the list of users
* @param userList { Object }
* @param username { String }
* @return userList { Object }
*/

function removeUser(userList, username) {
  const newList = userList.filter(user => user.name !== username);

  return newList;
}

/*
* Checks if the user is in a list passed in
* @param userList { Object }
* @param username { String }
* @return userList { Object }
*/

function isUser(userList, username) {
  return username in userList;
}