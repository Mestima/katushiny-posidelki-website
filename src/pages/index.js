import React from 'react';
import HeaderImg from '../components/headerimage/headerimage';
import NavBar from '../components/navbar/navbar';

export default class IndexPage extends React.Component {
  render() {
    return(<>
      <HeaderImg />
      <NavBar token={this.props.token} username={this.props.username} authed={this.props.authed} updateState={this.props.updateState} usergroup={this.props.usergroup} />
    </>)
  }
}
