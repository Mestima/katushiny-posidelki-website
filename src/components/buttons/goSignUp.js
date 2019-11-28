import React from 'react';

export default class Btn extends React.Component {
  render() {
    return(
      <div className="inline m-1">
        <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded" onClick={this.props.reg}>
          Зарегистрироваться
        </button>
      </div>
    )
  }
}
