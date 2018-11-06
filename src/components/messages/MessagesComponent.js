import React, { Component } from 'react';
import moment from 'moment';

import { FaSearch } from 'react-icons/fa';
import { MdEject } from 'react-icons/md';


// import * as socketActions from '../../../actions/socketActions';

class MessagesComponent extends Component {

  componentDidMount() {
    this.onScrollDown();
  }

  componentDidUpdate(prevProps, prevState) {
    this.onScrollDown();
  }

  render() {
    const { messages, user, typingUsers } = this.props;
    return (
      <div
        ref={"container"}
        className="thread-container h-100">
        <div className="thread h-100">
          {
            messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className={
                    `message-container ${
                      message.sender.name === user.name
                      ? 'right d-flex flex-column align-items-end'
                      : 'left d-flex flex-column align-items-start'
                    }`
                  }
                >
                  <div className="data">
                    <div className="message">
                      {message.message}
                      <div className="time">{moment(message.time).format('DD.MM.YYYY, HH:MM')}</div>
                    </div>
                    { 
                      user.id !== message.sender.id && <div className="name">{message.sender.name}</div>
                    }
                  </div>
                </div>
              )
            })
          }
          {
            typingUsers.map((user, index) => {
              return <div key={index} className="typing-user">
                {`${user.name} is typing...`}
              </div>
            })
          }
        </div>
      </div>
    )
  }

  onScrollDown = () => {
    const { container } = this.refs;

    container.scrollTop = container.scrollHeight;
  }
}

export default MessagesComponent;