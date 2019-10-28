import React from 'react';
import { Link } from 'react-router-dom';

export default class Btn extends React.Component {
  render() {
    return(
      <div className="inline m-1">
        <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded">
          <Link to="/">Main Page</Link>
        </button>
      </div>
    )
  }
}
