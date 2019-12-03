import React from 'react';
import HeaderImg from '../components/headerimage/';
import NavBar from '../components/navbar/';

const needInvenBtn = true;
const needAdminBtn = true;
const needProfiBtn = true;
export default class SayPage extends React.Component {
  render() {
    return(<>
      <HeaderImg />
      <NavBar token={this.props.token} username={this.props.username} authed={this.props.authed} updateState={this.props.updateState} usergroup={this.props.usergroup} needAdminBtn={needAdminBtn} needProfiBtn={needProfiBtn} needInvenBtn={needInvenBtn} />
      <div className="container text-center">
        <div className="display-4 pixel">{this.props.location.text ? this.props.location.text : "Ой, кажется ты попал сюда случайно..."}</div>
      </div>
    </>)
  }
}
