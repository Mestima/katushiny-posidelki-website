import React from 'react';
import { Link } from 'react-router-dom';

export default class Btn extends React.Component {
  render() {
    return(<>
        {this.props.usergroup == 'admin' && this.props.needAdminBtn ?
          <div className="inline m-1">
            <button className="btn btn-success pixel">
              <Link className="text-decoration-none text-white" to="/admin">Админ Панель</Link>
            </button>
          </div> : <></>
        }
    </>);
  }
}
