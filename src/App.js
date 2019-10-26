import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Settings from './settings';
import './App.css';
import HeaderImg from './components/headerimage/headerimage';
import NavBar from './components/navbar/navbar';
import Loader from './components/loader/loader';

document.title = Settings.title

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      page: '',
      loading: false,
      date: new Date(),
      authed: false,
      username: cookies.get('katusha-name') || 'Анон',
      email: cookies.get('katusha-email') || 'none',
      usergroup: cookies.get('katusha-usergroup') || 'none',
      token: cookies.get('katusha-token') || 'none'
    };
  }

  updateCookie = (name, data) => {
    let d = new Date();
    d.setTime(d.getTime() + (1*60*1000));
    this.cookies.set('katusha-token', data, {path: '/', expires: d});
  }

  updateState = (data) => {
    this.setState(data);
  }

  render() {
    return(<div>
      {this.state.loading ? <Loader /> : <div>
        <HeaderImg />
        <NavBar token={this.state.token} username={this.state.username} authed={this.state.authed} updateState={this.updateState}/>
      </div>}
    </div>);
  }
}
export default withCookies(App);
