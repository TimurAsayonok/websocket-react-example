import React, { Component } from 'react';
import _ from 'lodash';

import { FaSearch } from 'react-icons/fa';
import { MdEject } from 'react-icons/md';


// import * as socketActions from '../../../actions/socketActions';

class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      message: "", 
      isTyping: false
    }
  }

  render() {
    const { message } = this.state;
    return (
      <div id="message-input">
        <form
          onSubmit={this.onHadleSubmit}
          className="message-form"
        >
          <input
            id="message"
            ref={"messageinput"}
            type="text"
            className="form-control"
            value={message}
            autoComplete={'off'}
            placeholder="Type your message"
            onKeyUp={ event => event.keyCode !== 13 && this.onSendTyping()}
            onChange={ event => this.onChange(event.target.value)}
          />
          <button
            disabled={message.lenght < 1}
            type="submit"
            className="send"
          >
            Send
          </button>
        </form>
      </div>
    )
  }

  onChange = (message) => {
    this.setState({ message });
  }

  onSendTyping = () => {
    const { onSendTyping } = this.props;
    this.setState({
      isTyping: true
    })

    onSendTyping(this.state.isTyping);
  }

  onHadleSubmit = (event) => {
    event.preventDefault();

    const { onSendMessage } = this.props;
    const { message } = this.state;

    onSendMessage(message);
    this.setState({
      message: '',
      isTyping: false
    });
  }
}

export default MessageInput;