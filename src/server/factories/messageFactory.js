const uuidv4 = require('uuid/v4');

/*
* createMessage
* Creates a message.
* @prop id { string }
* @prop time { Date }
* @prop message { string }
* @prop sender {string}
* @param { object }
*/

const createMessage = ({ message = "", sender = "" } = {}) => ({
  id: uuidv4(),
  time: new Date(),
  message,
  sender
});

// const getTime = (date) => (
//   `${date.getHourse()}:${("0" + date.getMinutes()).slice(-2)}`
// );


module.exports = {
  createMessage
}