import React from 'react';
import { Link } from 'react-router-dom';

export default class Btn extends React.Component {
  render() {
    return(<>
      {this.props.needProfiBtn ?
        <div className="inline m-1">
          <button className="btn btn-info pixel">
            <Link className="text-decoration-none text-white" to="/profile">Профиль</Link>
          </button>
        </div>
      :<></>
      }
    </>)
  }
}
