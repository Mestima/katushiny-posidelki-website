//Core Elements
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
//Styles
import './App.css';
//Working Elements
import Loader from './components/loader/loader';
import Settings from './settings';
//Pages
import Pages from './pages/';
import HeadImg from './components/headerimage/';

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
    d.setTime(d.getTime() + (5*60*1000));
    this.cookies.set('katusha-token', data, {path: '/', expires: d});
  }

  updateState = (data) => {
    this.setState(data);
  }

  render() {
    return(<Router>
      {this.state.loading ? <Loader /> : <div>
        <Switch>
          <Route path='/admin' render={(props) => <Pages.admin {...props} token={this.state.token} username={this.state.username} authed={this.state.authed} updateState={this.updateState} usergroup={this.state.usergroup} />} />
          <Route path='/profile' render={(props) => <Pages.profile {...props} token={this.state.token} username={this.state.username} authed={this.state.authed} updateState={this.updateState} usergroup={this.state.usergroup} />} />
          <Route path='/' render={(props) => <Pages.main {...props} token={this.state.token} username={this.state.username} authed={this.state.authed} updateState={this.updateState} usergroup={this.state.usergroup} />} />
        </Switch>
      </div>}
    </Router>);
  }
}
export default withCookies(App);
