import React from 'react';

export default class Btn extends React.Component {
  render() {
    return(
      <div className="inline m-1">
        <button className="btn btn-danger pixel" onClick={this.props.signOut}>
          Выйти
        </button>
      </div>
    )
  }
}
