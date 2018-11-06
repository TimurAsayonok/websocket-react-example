import React, { Component } from 'react';


// import * as socketActions from '../../../actions/socketActions';

class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      message: "", 
      isTyping: false
    }
  }

  componentWillUnmount() {
    this.onStopCheckingTyping();
  }

  render() {
    const { message } = this.state;
    return (
      <div id="message-input" className="send-input-container footer">
        <form
          onSubmit={this.onHadleSubmit}
          className="message-form"
        >
          <input
            id="message"
            ref={"messageinput"}
            type="text"
            className="send-input w-100 py-3 px-3"
            value={message}
            autoComplete={'off'}
            placeholder="Type your message"
            onKeyUp={ event => event.keyCode !== 13 && this.onSendTyping()}
            onChange={ event => this.onChange(event.target.value)}
          />
        </form>
      </div>
    )
  }

  onChange = (message) => {
    this.setState({ message });
  }

  onSendTyping = () => {
    const { onSendTyping } = this.props;
    this.lastUpdateTime = Date.now();

    if (!this.state.isTyping) {
      this.setState({
        isTyping: true
      })

      onSendTyping(true);
      this.onStartCheckingTyping();
    }
  }

  onHadleSubmit = (event) => {
    event.preventDefault();

    const { onSendMessage } = this.props;
    const { message } = this.state;

    if (message.length > 0) {
      onSendMessage(message);
      this.setState({
        message: '',
        isTyping: false
      });
    }
  }

  onStartCheckingTyping = () => {
    console.log("typing");
    this.typingInterval = setInterval(() => {
      if ((Date.now() - this.lastUpdateTime) > 300) {
        this.setState({
          isTyping: false
        });
        this.onStopCheckingTyping();
      }
    }, 300)
  }

  onStopCheckingTyping = () => {
    console.log("Stop typing");
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.props.onSendTyping(false);
    }
  }
}

export default MessageInput;