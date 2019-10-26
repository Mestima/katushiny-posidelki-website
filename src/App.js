import React from 'react';
import Settings from './settings';
import './App.css';
import HeaderImg from './components/headerimage/headerimage';
import NavBar from './components/navbar/navbar';
import Loader from './components/loader/loader';

document.title = Settings.title
export default class App extends React.Component {
  state = {
    page: '',
    loading: true,
    date: new Date(),

    username: 'Анон',
    email: '',
    usergroup: 'none'
  }

  constructor() {
    super();
    setTimeout( () => {
      this.setState({loading: false});
    }, 1000);
  }

  updateState = (data) => {
    this.setState(data);
  }

  render() {
    return(<div>
      {this.state.loading ? <Loader /> : <div>
        <HeaderImg />
        <NavBar username={this.state.username} updateState={this.updateState}/>
      </div>}
    </div>);
  }
}
