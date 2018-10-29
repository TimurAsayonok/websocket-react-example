const uuidv4 = require('uuid/v4');

/*
* createChat
* Creates a message.
* @prop id { string }
* @prop messages { Array.Message }
* @prop users { Array.User }
* @param { object }
*   messages { Array.Message}
*   name { string }
*   users { Array.User}
*/

const createChat = ({ messages = [], name = "Community", users = [] } = {}) => ({
  id: uuidv4(),
  messages,
  users,
  name,
  typingUsers: []
});

module.exports = {
  createChat
}