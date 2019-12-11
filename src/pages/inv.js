import React from 'react';
import { Redirect } from 'react-router-dom';
import Change from '../components/buttons/change';
import NavBar from '../components/navbar/';
import Footer from '../components/footer/';
import HeaderImg from '../components/headerimage/';
import Content from '../components/invcontent/';

const needMainPBtn = true;
const needProfiBtn = true;
const needAdminBtn = true;
export default class IndexPage extends React.Component {
  render() {
    return(<>
      {this.props.authed != true ? <>
        <Redirect to='/' />
      </> : <>
        <HeaderImg />
        <NavBar token={this.props.token} username={this.props.username} authed={this.props.authed} updateState={this.props.updateState} usergroup={this.props.usergroup} needAdminBtn={needAdminBtn} needMainPBtn={needMainPBtn} needProfiBtn={needProfiBtn} />
        <Content token={this.props.token} />
        <Footer />
      </>}
    </>)
  }
}
