import React from 'react';
import Settings from '../../settings';

export default function HeaderImage() {
  return(<div className="container mx-auto">
      <img src={Settings.headerimg} />
    </div>);
}
