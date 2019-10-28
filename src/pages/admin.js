import React from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/navbar/';

const needMainPBtn = true;
const needProfiBtn = true;
export default class IndexPage extends React.Component {
  render() {
    return(<>
      {this.props.usergroup != 'admin' ? <>
        <Redirect to='/' />
      </> : <>
        <NavBar token={this.props.token} username={this.props.username} authed={this.props.authed} updateState={this.props.updateState} usergroup={this.props.usergroup} needProfiBtn={needProfiBtn} needMainPBtn={needMainPBtn} />
      </>}
    </>)
  }
}
