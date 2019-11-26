import React from 'react';
import { Link } from 'react-router-dom';

export default class MainContent extends React.Component {
  render() {
    return <>
      <br />
      <Link to="/convention">
        <div className="flex justify-center">
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Приходи на наш конвент!
          </button>
        </div>
      </Link>
      <div className="flex justify-center">
        А тут снова текст!
      </div>
    </>
  }
}
