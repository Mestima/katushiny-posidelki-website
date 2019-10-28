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
        <div className="container mx-auto justify-start pixel">
          <br />
          <div className="flex-auto text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 rounded-full">
              <p class="text-black">Имя: {this.props.username}</p>
          </div>
          <div className="flex-auto text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 rounded-full">
              <p class="text-black">Статус аккаунта: {this.props.usergroup}</p>
          </div>
          <div class="flex-auto text-gray-700 text-center text-xs bg-gray-400 px-4 py-2 m-2 rounded-full">
            <p class="text-black">API Key:</p>
            <p class="text-black">{this.props.token}</p>
          </div>
        </div>
      </>}
    </>)
  }
}
