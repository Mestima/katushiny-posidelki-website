import React from 'react';
import ReactDOM from 'react-dom';

export default class Portal extends React.Component {
  element = ducument.createElement('div');

  componentDidMount() {
    document.body.appendChild(this.element);
  }

  componentWillUnmount() {
    document.body.removeChild(this.element);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.element);
  }
}
