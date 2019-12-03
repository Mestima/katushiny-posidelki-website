import React from 'react';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import API from '../api/';
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
    window.location.replace(API.self);
  }

  signInCookie = async () => {
    const data = new FormData();
    data.append('token', this.props.token);

    try {
      this.props.updateState({loading: true});
      const response = await fetch(API.login, {
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
        d.setTime(d.getTime() + (1337228*60*1000));
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
      const response = await fetch(API.login, {
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
        d.setTime(d.getTime() + (1337228*60*1000));
        this.props.cookies.set('katusha-token', result.token, {path: '/', expires: d});
        this.props.cookies.set('katusha-name', result.username, {path: '/', expires: d});
        this.props.cookies.set('katusha-usergroup', result.usergroup, {path: '/', expires: d});
        this.props.cookies.set('katusha-email', result.email, {path: '/', expires: d});
      } else {
        alert(result);
        console.log(result);
      }
    } catch (error) {
      this.props.updateState({loading: false});
      alert('Ошибка:'+error);
      console.error('Ошибка:', error);
    }
  }

  render() {
    return(<div>

      <div className="container">
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark rounded">
          {/*
              <button className="navbar-toggler" type="button" data-toggle="collapse"
                          data-target="#collapse_Navbar">
                  <span className="navbar-toggler-icon"></span>
              </button>
          */}

              <div className="collapse navbar-collapse" id="collapse_Navbar">
                  <span className="text-white pixel">Привет, {this.props.username}!</span>
              </div>
              {this.props.authed ?
                <>
                  <Buttons.admin usergroup={this.props.usergroup} needAdminBtn={this.props.needAdminBtn} />
                  <Buttons.inventory needInvenBtn={this.props.needInvenBtn} />
                  <Buttons.profile needProfiBtn={this.props.needProfiBtn} />
                  <Buttons.mainPage needMainPBtn={this.props.needMainPBtn} />
                  <Buttons.signOut signOut={this.signOut} />
                </> :
                <>
                  <form className="form-inline" action="#">
                      <div className="input-group m-1">
                          <div className="input-group-prepend">
                              <span className="input-group-text pixel">L</span>
                          </div>
                          <input type="text" className="form-control pixel" id="login" placeholder="login" />
                      </div>
                      <div className="input-group m-1">
                          <div className="input-group-prepend">
                              <span className="input-group-text pixel">P</span>
                          </div>
                          <input type="password" className="form-control pixel" id="password" placeholder="password" />
                      </div>
                      <div className="input-group">
                        <Buttons.signIn signIn={this.signIn} />
                      </div>
                      <div className="input-group">
                        <Buttons.signUp />
                      </div>
                  </form>
                </>
              }
          </nav>
      </div>

    </div>)
  }
}
export default withCookies(NavBar);
