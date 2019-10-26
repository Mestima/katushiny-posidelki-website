import React from 'react';
import Pony from './pony.gif';

export default function() {
    return(<div className="bg text-center pt-48 pixel text-5xl">
      <img className="mx-auto" src={Pony} />
      Загрузка...
    </div>);
}
