import React from 'react';
import { Link } from 'react-router-dom';
import Settings from '../../settings';

export default function HeaderImage() {
  return(<div className="container mx-auto">
      <Link to="/"><img src={Settings.headerimg} /></Link>
    </div>);
}
