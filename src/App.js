import React from 'react';
import Settings from './settings';
import './App.css';
import HeaderImg from './components/headerimage/headerimage';
import NavBar from './components/navbar/navbar';

document.title = Settings.title
export default class App extends React.Component {
  render() {
    return(<div>
      <HeaderImg />
      <NavBar />
    </div>);
  }
}
