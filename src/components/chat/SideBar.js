import React, { Component } from 'react';

import { FaBars } from 'react-icons/fa';
import { MdEject } from 'react-icons/md';

class SideBar extends Component {

  render() {
    const { onLogout, chats, user, activeChat, onSetActiveChat } = this.props;

    return (
      <div id="side-bar" className="d-flex flex-column col-3">
        <div className="side-bar-heading py-3">
          <div className="d-flex flex-row search mx-3">
            <i className="menu-button"><FaBars /></i>
            <input className="search-input mx-2" placeholder="Search" type="text" />
          </div>
        </div>

        <div
          className="d-flex flex-column users h-100"
          ref='users'
          onClick={(e) => {
            (e.target === this.refs.user) && onSetActiveChat(null)
          }
          }
        >
          {
            chats.map((chat) => {
              if (chat.name) {
                const lastMessage = chat.messages[chat.messages.length - 1];
                const user = chat.users.find(({ name }) => {
                  return name !== this.props.name
                }) || { name: 'Community' }
                const className = (activeChat && activeChat.id === chat.id) ? 'activeChat' : '';

                console.log(lastMessage);
                return (
                  <div
                    key={chat.id}
                    className={`d-flex user ${className} px-3 py-2 mb-2`}
                    onClick={() => onSetActiveChat(chat)}
                  >
                    <div className="d-flex justify-content-center align-items-center user-photo ">
                      {user.name[0].toUpperCase()}
                    </div>
                    <div className="d-flex flex-column justify-content-center mx-2 user-info">
                      <div>{user.name}</div>
                      {lastMessage && lastMessage.message && <div className="last-message">
                        {lastMessage.message}
                      </div>}
                    </div>

                  </div>
                )
              }

              return null;
            })
          }
        </div>
        <div className="d-flex justify-content-between current-user px-3 py-3">
          <span>{user.name}</span>
          <div
            onClick={() => onLogout(user)}
            title="Logout"
            className="logout"
          >
            Log out <MdEject />
          </div>
        </div>
      </div>
    )
  }
}

export default SideBar;