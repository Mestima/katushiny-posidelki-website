import React from 'react';
import './navbar.css';
import MD5 from '../md5';

function onNavClick() {
  document.getElementById("nav-content").classList.toggle("hidden");
}

async function onTest(e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append('username', 'root');
  formData.append('password_1', 'WeL0veR00t');
  formData.append('password_2', 'WeL0veR00t');
  formData.append('email', 'none');

  try {
    const response = await fetch("http://localhost/reg.php", {
      method: 'POST',
      body: formData
    });
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

async function signIn(e) {
  e.preventDefault();
  const data = new FormData();
  data.append('username', 'root');
  data.append('password', MD5('WeL0veR00t'));

  try {
    const response = await fetch("http://localhost/login.php", {
      method: 'POST',
      body: data
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

function signUp(e) {
  e.preventDefault();
  window.location.href = 'http://www.google.com';
}

export default class NavBar extends React.Component {
  render() {
    return(<div>
      <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-1 fixed w-full">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <a className="text-white no-underline hover:text-white hover:no-underline" href="#">
            <span className="text-2xl pl-2 pixel">Привет, Анон!</span>
          </a>
        </div>

        <div className="block lg:hidden">
          <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white" onClick={onNavClick}>
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>

        <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0" id="nav-content">
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <form>
                <div className="inline px-1">
                  <input className="shadow appearance-none border rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pixel" type="text" id="login" name="login" placeholder="login" />
                </div>
                <div className="inline px-1">
                  <input className="shadow appearance-none border rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pixel" type="password" id="password" name="password" placeholder="password" />
                </div>
                <div className="inline m-1">
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={signIn}>
                    Sign In
                  </button>
                </div>
                <div className="inline m-1">
                  <button className="bg-green-500 hover:bg-green-400 text-white font-bold px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={signUp}>
                    Sign Up
                  </button>
                </div>
              </form>
            </li>
          </ul>
        </div>
      </nav>
    </div>)
  }
}
