import React from 'react';

export default class Btn extends React.Component {
  render() {
    return(
      <div className="inline m-1">
        <button className="btn btn-success pixel" onClick={this.props.reg}>
          Зарегистрироваться
        </button>
      </div>
    )
  }
}
