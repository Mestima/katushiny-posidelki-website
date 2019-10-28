import React from 'react';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import MD5 from '../md5/';
import IsJson from '../isJson/';
import Buttons from '../buttons/';

function onNavClick() {
  document.getElementById("nav-content").classList.toggle("hidden");
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.token && this.props.token != 'none' && !this.props.authed) {
      this.signInCookie();
    }
  }

  enableLoader = (e) => {
    e.preventDefault();
    this.props.updateState({loading: true});
    setTimeout(() => {this.props.updateState({loading: false});}, 1000)
  }

  animLogin = () => {
    this.props.updateState({loading: true});
    setTimeout(() => {this.props.updateState({loading: false});}, 500)
  }

  signOut = (e) => {
    e.preventDefault();
    this.props.cookies.remove('katusha-token', {path: '/'});
    this.props.cookies.remove('katusha-name', {path: '/'});
    this.props.cookies.remove('katusha-usergroup', {path: '/'});
    this.props.cookies.remove('katusha-email', {path: '/'});
    window.location.reload();
  }

  signInCookie = async () => {
    const data = new FormData();
    data.append('token', this.props.token);

    try {
      this.props.updateState({loading: true});
      const response = await fetch("http://localhost/login.php", {
        method: 'POST',
        body: data
      });

      var result = await response.text();
      this.props.updateState({loading: false});
      if (IsJson(result)) {
        var result = JSON.parse(result);
        this.props.updateState({
          username: result.username,
          usergroup: result.usergroup,
          email: result.email,
          token: result.token,
          authed: true
        })
        let d = new Date();
        d.setTime(d.getTime() + (5*60*1000));
        this.props.cookies.set('katusha-token', result.token, {path: '/', expires: d});
        this.props.cookies.set('katusha-name', result.username, {path: '/', expires: d});
        this.props.cookies.set('katusha-usergroup', result.usergroup, {path: '/', expires: d});
        this.props.cookies.set('katusha-email', result.email, {path: '/', expires: d});
      }
    } catch (error) {
      this.props.updateState({loading: false});
      console.error('Ошибка:', error);
    }
  }

  signIn = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', document.getElementById('login').value);
    data.append('password', MD5(document.getElementById('password').value));

    try {
      this.props.updateState({loading: true});
      const response = await fetch("http://localhost/login.php", {
        method: 'POST',
        body: data
      });

      var result = await response.text();
      this.props.updateState({loading: false});
      if (IsJson(result)) {
        var result = JSON.parse(result);
        this.props.updateState({
          username: result.username,
          usergroup: result.usergroup,
          email: result.email,
          token: result.token,
          authed: true
        })
        let d = new Date();
        d.setTime(d.getTime() + (5*60*1000));
        this.props.cookies.set('katusha-token', result.token, {path: '/', expires: d});
        this.props.cookies.set('katusha-name', result.username, {path: '/', expires: d});
        this.props.cookies.set('katusha-usergroup', result.usergroup, {path: '/', expires: d});
        this.props.cookies.set('katusha-email', result.email, {path: '/', expires: d});
      }
    } catch (error) {
      this.props.updateState({loading: false});
      console.error('Ошибка:', error);
    }
  }

  render() {
    return(<div>
      <nav className="flex items-center justify-betwee flex-wrap bg-gray-800 p-1 w-full">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <p className="text-white no-underline hover:text-white hover:no-underline">
            <span className="text-2xl pl-2 pixel"><Link to="/">Привет, {this.props.username}!</Link></span>
          </p>
        </div>

        <div className="block lg:hidden">
          <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white" onClick={onNavClick}>
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>

        <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0" id="nav-content">
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              {this.props.authed ? <>
                  {this.props.usergroup == 'admin' && this.props.needAdminBtn ? <>
                      <Buttons.admin />
                  </>:<></>
                  }
                  {this.props.needMainPBtn ?
                      <Buttons.mainPage />
                  :<></>
                  }
                  {this.props.needProfiBtn ?
                      <Buttons.profile />
                  :<></>
                  }
                  <Buttons.signOut signOut={this.signOut} />
                </>:<>
                  <form>
                    <div className="inline px-1">
                      <input className="shadow appearance-none border rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pixel" type="text" id="login" name="login" placeholder="login" />
                    </div>
                    <div className="inline px-1">
                      <input className="shadow appearance-none border rounded py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pixel" type="password" id="password" name="password" placeholder="password" />
                    </div>
                    <Buttons.signIn signIn={this.signIn} />
                    <Buttons.signUp signUp={this.enableLoader} />
                  </form>
                </>}
            </li>
          </ul>
        </div>
      </nav>
    </div>)
  }
}
export default withCookies(NavBar);
