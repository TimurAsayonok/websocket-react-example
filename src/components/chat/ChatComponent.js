import React, { Component } from 'react';


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
      activeChat: null
    }
  }

  componentDidMount() {
    const { socket } = this.props;

    socket.emit(socketActions.COMMUNITY_CHAT, this.onResetChat)
  }

  render() {
    const { onLogout, user } = this.props;
    const { chats, activeChat } = this.state;

    return (
      <div className="container">
        <SideBar
          onLogout={onLogout}
          chats={chats}
          user={user}
          activeChat={activeChat}
          onSetActiveChat={this.onSetActiveChat}
        />
        <div className="chat-room-container">
          {
            activeChat !== null ? (
              <div className="chat-room">
                <ChatHeader
                  name={activeChat.name}
                />
                <MessageComponent
                  messages={activeChat.messages}
                  user={user}
                  typingUsers={activeChat.typingUsers}
                />
                <MessageInput
                  onSendMessage={this.onSendMessage}
                  onSendTyping={this.onSendTyping}
                />
              </div>
            )
            : <div className="chat-room choose">
              <h3>Choose a chat!</h3>
            </div>
          }
        </div>
      </div>
    )
  }

  onSetActiveChat = (chat) => {
    this.setState({
      activeChat: chat
    })
  }

  onResetChat = (chat) => {
    return this.onAddChat(chat, true);
  }

  onAddChat = (chat, reset) => {
    const { socket } = this.props;
    const { chats } = this.state;

    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({
      chats: newChats
    });

    const messageEvent = `${socketActions.MESSAGE_RECIEVED}-${chat.id}`;
    const typingEvent = `${socketActions.TYPING}-${chat.id}`;

    socket.on(messageEvent, this.onAddMessageToChat(chat.id));
    socket.on()
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



  onSendMessage = (message) => {
    const { socket } = this.props;
    const { activeChat } = this.state;

    socket.emit(socketActions.MESSAGE_SENT, { chatId: activeChat.id, message})
  }

  onSendTyping = (isTyping) => {
    const { socket } = this.props;
    const { activeChat } = this.state;

    socket.emit(socketActions.TYPING, { chatId: activeChat.id, isTyping })
  }
}

export default ChatComponent;