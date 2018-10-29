import React, { Component } from 'react';

class Layout extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="container">
        <p>{title}</p>
      </div>
    )
  }
}

export default Layout;