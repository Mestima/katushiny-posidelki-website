import React from 'react';
import { Link } from 'react-router-dom';

export default class Btn extends React.Component {
  render() {
    return(
      <div className="inline m-1">
        <button className="bg-green-500 hover:bg-green-400 text-white font-bold px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
          <Link to="/reg">Регистрация</Link>
        </button>
      </div>
    )
  }
}
