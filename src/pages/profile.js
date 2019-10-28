import React from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/navbar/';
import HeaderImg from '../components/headerimage/';

const needMainPBtn = true;
const needAdminBtn = true;
export default class IndexPage extends React.Component {
  render() {
    return(<>
      {this.props.authed != true ? <>
        <Redirect to='/' />
      </> : <>
        <HeaderImg />
        <NavBar token={this.props.token} username={this.props.username} authed={this.props.authed} updateState={this.props.updateState} usergroup={this.props.usergroup} needAdminBtn={needAdminBtn} needMainPBtn={needMainPBtn} />
      </>}
    </>)
  }
}
