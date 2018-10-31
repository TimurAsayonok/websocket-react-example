import React, { Component } from 'react';
import * as socketActions from '../actions/socketActions';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      error: ""
    }
  }

  render() {
    const { name, error } = this.state;

    return (
      <div className="login">
        <form
          onSubmit={this.handleSubmit}
          className="login-form"
        >
          <label htmlFor="name">
            <h3>Name</h3>
          </label>
          <input
            ref={(input) => { this.textInput = input }}
            type="text"
            id="name"
            value={name}
            onChange={this.handleChange}
            placeholder="Name"
          />
          <div className="error">
            { error ? error : null }
          </div>
        </form>
      </div>
    )
  }

  handleChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { socket } = this.props;
    const { name } = this.state;

    socket.emit(socketActions.VERIFY_USER, name, this.setUser )
  }

  setUser = ({ user, isUser }) => {
    console.log(user, isUser)
    if (isUser) {
      this.setError("User name taken");
    } else {
      this.setError(null);
      this.props.onSetUser(user);
    }
  }

  setError = (error) => {
    this.setState({
      error
    });
  }
}

export default LoginForm;