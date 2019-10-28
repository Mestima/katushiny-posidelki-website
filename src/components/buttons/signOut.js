import React from 'react';

export default class Btn extends React.Component {
  render() {
    return(
      <div className="inline m-1">
        <button className="bg-red-500 hover:bg-red-400 text-white font-bold px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={this.props.signOut}>
          Выйти
        </button>
      </div>
    )
  }
}
