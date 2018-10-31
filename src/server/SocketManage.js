const io = require('./index.js').io;
const { 
  USER_CONNECTED,
  LOGOUT,
  VERIFY_USER,
  COMMUNITY_CHAT,
  USER_DISCONNECTED,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
  TYPING
} = require('../actions/socketActions');
const { createUser } = require('./factories/userFactory');
const { createChat } = require('./factories/chatFactory');
const { createMessage } = require('./factories/messageFactory');

let connectedUsers = {}
let communityChat = createChat();

module.exports = function(socket) {
  console.log("Socket: ");
  console.log(socket.id);
  let sendMessageToChatFromUser;
  let sendTypingFromUser;

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

    io.emit(USER_CONNECTED, connectedUsers);
    sendMessageToChatFromUser = sendMessageToChat(user);
    sendTypingFromUser = sendTypingToChat(user);
  })

  // get community chat
  socket.on(COMMUNITY_CHAT, (callback) => {
    callback(communityChat)
  });

  // User disconnects
  socket.on('disconnect', () => {
    if("user" in socket) {
      console.log(socket.user.name);
      connectedUsers = removeUser(connectedUsers, socket.user.name);
      io.emit(USER_DISCONNECTED, connectedUsers);
      console.log(connectedUsers)
    }
  });

  //User logouts
  socket.on(LOGOUT, () => {
    connectedUsers = removeUser(connectedUsers, socket.user.name);
    io.emit(USER_DISCONNECTED, connectedUsers);
  });

  socket.on(MESSAGE_SENT, ({ chatId, message }) => {
    sendMessageToChatFromUser(chatId, message);
  })

  socket.on(TYPING, ({ chatId, isTyping}) => {
    sendTypingFromUser(chatId, isTyping);
  })
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
  const newList = { ...userList };
  delete newList[username];
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

function sendMessageToChat(sender) {
  return (chatId, message) => {
    io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({ message, sender }));
  }
}

function sendTypingToChat(user) {
  return (chatId, isTyping) => {
    io.emit(`${TYPING}-${chatId}`, { isTyping, user });
  }
}