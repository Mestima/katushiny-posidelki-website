import React from 'react';
import { Link } from 'react-router-dom';

export default class Btn extends React.Component {
  render() {
    return(<>
      {this.props.needInvenBtn ?
        <div className="inline m-1">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            <Link to="/inventory">Инвентарь</Link>
          </button>
        </div>
      :<></>
      }
    </>)
  }
}
