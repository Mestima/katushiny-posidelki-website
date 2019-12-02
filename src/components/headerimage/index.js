import React from 'react';
import { Link } from 'react-router-dom';
import Settings from '../../settings';

export default function HeaderImage() {
  return(<div className="container-fluid">
      <Link to="/"><img className="img-fluid center-block" src={Settings.headerimg} /></Link>
    </div>);
}
