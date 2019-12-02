import React from 'react';
import { Link } from 'react-router-dom';

export default class Btn extends React.Component {
  render() {
    return(
      <div className="d-inline mx-1 my-1">
        <button className="btn btn-success pixel">
          <Link className="text-decoration-none text-white" to="/reg">Регистрация</Link>
        </button>
      </div>
    )
  }
}
