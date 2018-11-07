import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { FaBars } from 'react-icons/fa';
import { MdEject } from 'react-icons/md';

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receiver: '',
      dropdownOpen: false
    }
  }

  render() {
    const {
      onLogout, chats, user, activeChat, onSetActiveChat,
      onSendOpenPrivateMessage
    } = this.props;
    const { receiver } = this.state;

    return (
      <div id="side-bar" className="d-flex flex-column col-3">
        <div className="side-bar-heading py-3">
          <form
            className="d-flex flex-row search mx-3"
            onSubmit={(event) => {
              event.preventDefault();
              onSendOpenPrivateMessage(receiver)
              this.setState({ receiver: ''})
            }}
          >
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleMenu}>
              <DropdownToggle
                tag="span"
                onClick={this.toggle}
                data-toggle="dropdown"
                aria-expanded={this.state.dropdownOpen}
                className="menu-button"
              >
                <FaBars />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Create Chat</DropdownItem>
                <DropdownItem>Create Group</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <input
              className="search-input mx-2"
              placeholder="Search"
              type="text"
              value={receiver}
              onChange={(e) => this.setState({ receiver: e.target.value })}
            />
          </form>
        </div>

        <div
          className="d-flex flex-column users h-100 w-100"
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
                const chatName = chat.users.find((name) => {
                  return name !== user.name
                }) || 'Community';
                const className = (activeChat && activeChat.id === chat.id) ? 'activeChat' : '';
                return (
                  <div
                    key={chat.id}
                    className={`d-flex align-items-center user ${className} px-3 py-2 mb-2 w-100`}
                    onClick={() => onSetActiveChat(chat)}
                  >
                    <div className="d-flex justify-content-center align-items-center user-photo ">
                      {`${chatName[0].toUpperCase()}${chatName[chatName.length - 1].toUpperCase()}`}
                    </div>
                    <div className="w-100 d-flex flex-column justify-content-center mx-2 user-info">
                      <div className="chat-name">{chatName}</div>
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

  toggleMenu = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
}

export default SideBar;