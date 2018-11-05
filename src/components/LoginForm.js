import React, { Component } from 'react';
import * as socketActions from '../actions/socketActions';
import {
  FormGroup, Form, Label, Input, Button
} from 'reactstrap';
import './styles.css';

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
        <div className="d-flex login-header"></div>
        <div className="login-form p-1">
          <div className="login-form-header py-3">
            <p>Telegram copy-test</p>
          </div>
          <Form
            onSubmit={this.handleSubmit}
            className="d-flex login-form-body flex-column"
          >
            <div className="login-title mx-5">
              <h5 className="mt-5">Login</h5>
              <p>Please login to chat</p>
            </div>
            <div className="login-forms mx-5 mb-4">
              <FormGroup>
                <Label for="name" className="form-lable">User name</Label>
                <Input
                  ref={(input) => { this.textInput = input }}
                  type="text"
                  name="email"
                  id="name"
                  placeholder="Name"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <div className="error">
                {error ? error : null}
              </div>
            </div>
            <Button className="button-login">
              login
            </Button>
          </Form>
          <p className="my-5 description">Test chat project only for testing project.</p>
        </div>
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