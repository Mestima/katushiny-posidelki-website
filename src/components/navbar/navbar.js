import React from 'react';
import './navbar.css';

function onNavClick() {
  document.getElementById("nav-content").classList.toggle("hidden");
}

function onClickNothing(e) {
  e.preventDefault();
  console.log("Button Pressed!");
}

function signUp(e) {
  e.preventDefault();
  window.location.href = 'http://www.google.com';
}

export default class NavBar extends React.Component {
  render() {
    return(<div>
      <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-1 fixed w-full">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <a class="text-white no-underline hover:text-white hover:no-underline" href="#">
            <span class="text-2xl pl-2 pixel">Привет, Анон!</span>
          </a>
        </div>

        <div class="block lg:hidden">
          <button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white" onClick={onNavClick}>
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>

        <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0" id="nav-content">
          <ul class="list-reset lg:flex justify-end flex-1 items-center">
            <li class="mr-3">
              <form>
                <div className="inline px-1">
                  <input className="shadow appearance-none border rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pixel" type="text" id="login" name="login" placeholder="login" />
                </div>
                <div className="inline px-1">
                  <input className="shadow appearance-none border rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pixel" type="password" id="password" name="password" placeholder="password" />
                </div>
                <div className="inline m-1">
                  <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={onClickNothing}>
                    Sign In
                  </button>
                </div>
                <div className="inline m-1">
                  <button class="bg-green-500 hover:bg-green-400 text-white font-bold px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={signUp}>
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
