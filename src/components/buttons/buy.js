import React from 'react';

export default class Btn extends React.Component {
  buy = (link) => {
    window.open(
      link,
      '_blank'
    );
  }

  render() {
    return(
      <div className="inline m-1">
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => this.buy(this.props.link)}>
          Купить
        </button>
      </div>
    )
  }
}
