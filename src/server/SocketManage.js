const io = require('./index.js').io;
const { 
  USER_CONNECTED,
  LOGOUT,
  VERIFY_USER,
  COMMUNITY_CHAT,
  USER_DISCONNECTED,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
  TYPING,
  PRIVATE_MESSAGE
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
        isUser: false, user: createUser({ name, socketId: socket.id })
      })
    }
  })
  //User connects with username
  socket.on(USER_CONNECTED, (user) => {
    user.socketId = socket.id;
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    sendMessageToChatFromUser = sendMessageToChat(user);
    sendTypingFromUser = sendTypingToChat(user);

    io.emit(USER_CONNECTED, connectedUsers);
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

  //event for getting message
  socket.on(MESSAGE_SENT, ({ chatId, message }) => {
    sendMessageToChatFromUser(chatId, message);
  })

  //event for getting
  socket.on(TYPING, ({ chatId, isTyping}) => {
    sendTypingFromUser(chatId, isTyping);
  })

  socket.on(PRIVATE_MESSAGE, ({ receiver, sender }) => {
    console.log(receiver, sender);
    if (receiver in connectedUsers) {
      console.log([receiver, sender])
      const newChatForReceiver = createChat({
        name: `${connectedUsers[receiver].name}&${connectedUsers[sender].name}`,
        users: [receiver, sender]
      });
      const receiverSocket = connectedUsers[receiver].socketId;

      //send message to recieverSocket socketId - will add chat for reciever web panel
      socket.to(receiverSocket).emit(PRIVATE_MESSAGE, newChatForReceiver);

      //send message to current socketId = sender.socketId - will add chat for sender web panel
      socket.emit(PRIVATE_MESSAGE, newChatForReceiver)
    }
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
    io.emit(`${TYPING}-${chatId}`, { user, isTyping });
  }
}