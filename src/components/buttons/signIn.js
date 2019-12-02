import React from 'react';

export default class Btn extends React.Component {
  render() {
    return(
      <div className="d-inline mx-1 my-1">
        <button className="btn btn-primary pixel" onClick={this.props.signIn}>
          Войти
        </button>
      </div>
    )
  }
}
