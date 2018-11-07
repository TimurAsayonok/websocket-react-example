import React, { Component } from 'react';
import _ from 'lodash';

//components
import SideBar from './SideBar';
import ChatHeader from './ChatHeader';
import MessageInput from '../messages/MessageInput';
import MessageComponent from '../messages/MessagesComponent';

import * as socketActions from '../../actions/socketActions';

class ChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      activeChat: null,
      connectedUsers: []
    }
  }

  componentDidMount() {
    const { socket } = this.props;
    this.initSocket(socket);
  }

  render() {
    const { onLogout, user } = this.props;
    const { chats, activeChat, connectedUsers } = this.state;

    return (
      <div id="chats" className="d-flex flex-row">
        <SideBar
          onLogout={onLogout}
          chats={chats}
          user={user}
          activeChat={activeChat}
          onSetActiveChat={this.onSetActiveChat}
          onSendOpenPrivateMessage={this.onSendOpenPrivateMessage}
        />
        <div id="chatRoom" className="chat-room-container col-9">
          {
            activeChat !== null ? (
              <div className="d-flex flex-column chat-room h-100">
                <ChatHeader
                  name={activeChat.name}
                  numberOfUsers={activeChat.users.length}
                />
                <MessageComponent
                  messages={activeChat.messages}
                  user={user}
                  typingUsers={activeChat.typingUsers}
                />
                <MessageInput
                  onSendMessage={(message) => this.onSendMessage(activeChat.id, message)}
                  onSendTyping={(isTyping) => this.onSendTyping(activeChat.id, isTyping)}
                />
              </div>
            )
              : <div className="d-flex  h-100 justify-content-center align-items-center chat-room-choose">
              <h3>Choose a chat!</h3>
            </div>
          }
        </div>
      </div>
    )
  }

  initSocket = (socket) => {
    socket.emit(socketActions.COMMUNITY_CHAT, this.onResetChat);
    socket.on(socketActions.PRIVATE_MESSAGE, this.onAddChat);
    socket.on('connect', () => {
      // socket.emit(socket.USER_CONNECTED, this.props.user);
      socket.emit(socketActions.COMMUNITY_CHAT, this.onResetChat)
    });

    socket.on(socketActions.USER_CONNECTED, (connectedUsers) => {
      this.setState({
        users: connectedUsers
      })
    });
  }

  onSendOpenPrivateMessage = (receiver) => {
    const { socket, user } = this.props;
    socket.emit(socketActions.PRIVATE_MESSAGE, { receiver, sender: user.name })
  }

  onSetActiveChat = (chat) => {
    this.setState({
      activeChat: chat
    })
  }

  onResetChat = (chat) => {
    return this.onAddChat(chat, true);
  }

  onAddChat = (chat, reset = false) => {
    const { socket } = this.props;
    const { chats } = this.state;

    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({
      chats: newChats
    });

    const messageEvent = `${socketActions.MESSAGE_RECIEVED}-${chat.id}`;
    const typingEvent = `${socketActions.TYPING}-${chat.id}`;

    socket.on(messageEvent, this.onAddMessageToChat(chat.id));
    socket.on(typingEvent, this.onUpdateTypingInChat(chat.id))
  }

  /** Returns a function that will
   * add message to chat with chatId
   */
  onAddMessageToChat = (chatId) => {
    return message => {
      const { chats } = this.state;
      const newChats = chats.map((chat) => {
        if (chat.id === chatId) {
          chat.messages.push(message)
        }
        return chat;
      });

      this.setState({ chats: newChats });
    }
  }


  onSendMessage = (chatId, message) => {
    const { socket } = this.props;

    socket.emit(socketActions.MESSAGE_SENT, { chatId, message})
  }

  onUpdateTypingInChat = (chatId) => {
    return ({ user, isTyping }) => {
      if(user.id !== this.props.user.id) {
        const { chats } = this.state;
        const newChats = chats.map((chat) => {
          if(chat.id === chatId) {
            if (isTyping && !_.find(chat.typingUsers, (_user) => _user.id === user.id)) {
              chat.typingUsers.push(user)
            } else if (!isTyping && !!_.find(chat.typingUsers, (_user) => _user.id === user.id)){
              chat.typingUsers = chat.typingUsers.filter(_user => _user.id !==  user.id)
            }
          }
          return chat;
        })

        this.setState({
          chat: newChats
        })
      }
    }
  }

  onSendTyping = (chatId, isTyping) => {
    const { socket } = this.props;
    const { activeChat } = this.state;

    socket.emit(socketActions.TYPING, { chatId, isTyping })
  }
}

export default ChatComponent;