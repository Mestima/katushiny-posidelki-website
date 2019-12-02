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
        <button className="btn btn-success pixel" onClick={() => this.buy(this.props.link)}>
          Купить
        </button>
      </div>
    )
  }
}
