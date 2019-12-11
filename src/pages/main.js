import React from 'react';
import HeaderImg from '../components/headerimage/';
import NavBar from '../components/navbar/';
import Footer from '../components/footer/';
import Content from '../components/maincontent/'

const needInvenBtn = true;
const needAdminBtn = true;
const needProfiBtn = true;
export default class IndexPage extends React.Component {
  render() {
    return(<>
      <HeaderImg />
      <NavBar token={this.props.token} username={this.props.username} authed={this.props.authed} updateState={this.props.updateState} usergroup={this.props.usergroup} needAdminBtn={needAdminBtn} needProfiBtn={needProfiBtn} needInvenBtn={needInvenBtn} />
      <Content />
      <Footer />
    </>)
  }
}
// eytlin p1d0r)0)
