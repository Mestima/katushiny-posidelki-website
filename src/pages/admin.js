import React from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/navbar/';
import Change from '../components/buttons/change';

const needMainPBtn = true;
const needProfiBtn = true;
export default class IndexPage extends React.Component {
  render() {
    return(<>
      {this.props.usergroup != 'admin' ? <>
        <Redirect to='/' />
      </> : <>
        <NavBar token={this.props.token} username={this.props.username} authed={this.props.authed} updateState={this.props.updateState} usergroup={this.props.usergroup} needProfiBtn={needProfiBtn} needMainPBtn={needMainPBtn} />
        <br />
        <form class="max-w-sm mx-auto">
        <div class="md:flex md:items-center mb-6 pixel">
          <div class="md:w-1/3">
            <label class="block font-bold md:text-right mb-1 md:mb-0 pr-4">
              Новый Пароль
            </label>
          </div>
          <div class="md:w-2/3">
            <input class="bg-gray-600 appearance-none border-2 border-gray-200 text-black rounded-full w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 pixel" id="password1" type="password" />
          </div>
        </div>
          <div class="md:flex md:items-center mb-6 pixel">
            <div class="md:w-1/3">
              <label class="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                Повторите пароль
              </label>
            </div>
            <div class="md:w-2/3">
              <input class="bg-gray-600 appearance-none border-2 border-gray-200 text-black rounded-full w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 pixel" id="password2" type="password" />
            </div>
          </div>
          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <Change />
            </div>
          </div>
        </form>
      </>}
    </>)
  }
}
