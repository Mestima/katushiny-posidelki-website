import React from 'react';
import { Link } from 'react-router-dom';
import Settings from '../../settings';

export default function HeaderImage() {
  return(<div className="container">
      <Link to="/"><img className="img-fluid center-block rounded" src={Settings.headerimg} /></Link>
    </div>);
}
