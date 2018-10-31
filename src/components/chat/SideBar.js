import React, { Component } from 'react';
import _ from 'lodash';

import { FaSearch } from 'react-icons/fa';
import { MdEject } from 'react-icons/md';


// import * as socketActions from '../../../actions/socketActions';

class SideBar extends Component {

  render() {
    const { onLogout, chats, user, activeChat, onSetActiveChat } = this.props;

    return (
      <div id="side-bar">
        <div className="heading">
          <div className="app-name">
            Our Chat
          </div>
          <div className="menu">
            Menu
          </div>
        </div>
        <div className="search">
          <i className="search-icon"><FaSearch /></i>
          <input placeholder="Search" type="text"/>
          <div className="plus"></div>
        </div>
        <div
          className="users"
          ref='users'
          onClick={(e) => {
              (e.target === this.refs.user) && onSetActiveChat(null)}
          }
        >
          {
            chats.map((chat) => {
              if(chat.name) {
                const lastMessage = chat.messages[chat.messages.lenght - 1];
                const user = chat.users.find(({ name }) => {
                  return name !== this.props.name
                }) || { name: 'Community' }
                const className = (activeChat && activeChat.id === chat.id) ? 'activeChat' : '';

                return (
                  <div
                    key={chat.id}
                    className={`user ${className}`}
                    onClick={ () => onSetActiveChat(chat)}
                  >
                    <div className="user-photo">{user.name[0].toUpperCase()}</div>
                    <div className="user-info">
                      <div>{user.name}</div>
                      { lastMessage && <div className="last-message">{lastMessage.messages}</div>}
                    </div>

                  </div>
                )
              }

              return null;
            })
          }
        </div>
        <div className="current-user">
          <span>{user.name}</span>
          <div
            onClick={() => onLogout(user)}
            title="Logout"
            className="logout"
          >
            LogOut <MdEject />
          </div>
        </div>
      </div>
    )
  }
}

export default SideBar;