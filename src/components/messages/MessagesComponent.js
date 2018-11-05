import React, { Component } from 'react';
import _ from 'lodash';

import { FaSearch } from 'react-icons/fa';
import { MdEject } from 'react-icons/md';


// import * as socketActions from '../../../actions/socketActions';

class MessagesComponent extends Component {


  render() {
    const { messages, user, typingUsers } = this.props;
    return (
      <div
        kef="container"
        className="thread-container h-100">
        <div className="thread h-100">
          {
            messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className={`message-container ${message.sender.name === user.name && 'right'}`}
                >
                  <div className="time">{message.time}</div>
                  <div className="data">
                    <div className="message">{message.message}</div>
                    <div className="name">{message.sender.name}</div>
                  </div>
                </div>
              )
            })
          }
          {
            typingUsers.map((name, index) => {
              return <div key={index} className="typing-user">
                {`${name} is typing...`}
              </div>
            })
          }
        </div>
      </div>
    )
  }
}

export default MessagesComponent;