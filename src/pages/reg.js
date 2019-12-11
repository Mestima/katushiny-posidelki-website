import React from 'react';
import HeaderImg from '../components/headerimage/';
import NavBar from '../components/navbar/';
import Footer from '../components/footer/';
import Content from '../components/regcontent/'

export default class RegPage extends React.Component {
  render() {
    return(<>
      <HeaderImg />
      <NavBar token={this.props.token} username={this.props.username} authed={this.props.authed} updateState={this.props.updateState} usergroup={this.props.usergroup} />
      <Content authed={this.props.authed} />
      <Footer />
    </>)
  }
}
