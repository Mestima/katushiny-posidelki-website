import React from 'react';
import { Link } from 'react-router-dom';

export default class Btn extends React.Component {
  render() {
    return(<>
      {this.props.needInvenBtn ?
        <div className="inline m-1">
          <button className="btn btn-warning pixel">
            <Link className="text-decoration-none text-white" to="/inventory">Инвентарь</Link>
          </button>
        </div>
      :<></>
      }
    </>)
  }
}
