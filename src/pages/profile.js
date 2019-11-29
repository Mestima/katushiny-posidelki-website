import React from 'react';
import { Redirect } from 'react-router-dom';
import Change from '../components/buttons/change';
import NavBar from '../components/navbar/';
import HeaderImg from '../components/headerimage/';

const needInvenBtn = true;
const needMainPBtn = true;
const needAdminBtn = true;
export default class IndexPage extends React.Component {
  render() {
    return(<>
      {this.props.authed != true ? <>
        <Redirect to='/' />
      </> : <>
        <HeaderImg />
        <NavBar token={this.props.token} username={this.props.username} authed={this.props.authed} updateState={this.props.updateState} usergroup={this.props.usergroup} needAdminBtn={needAdminBtn} needMainPBtn={needMainPBtn} needInvenBtn={needInvenBtn} />
        <div className="container mx-auto justify-start">
          <div className="flex-auto text-black text-center bg-gray-400 px-4 py-2 m-2 rounded-full pixel">
            Статус Вашего аккаунта: {this.props.usergroup}
          </div>
          <br />
          <div className="flex-auto text-black text-center px-4 py-2 m-2 pixel">
            Данная страница еще в разработке :3 <br />
            Если возникли проблемы, пиши сюда: mestima@icloud.com
          {/* Убери pixel из div'a выше!
            <form className="max-w-sm mx-auto">
            <div className="md:flex md:items-center mb-6 pixel">
              <div className="md:w-1/3">
                <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Новый Пароль
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-600 appearance-none border-2 border-gray-200 text-black rounded-full w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 pixel" id="password1" type="password" />
              </div>
            </div>
              <div className="md:flex md:items-center mb-6 pixel">
                <div className="md:w-1/3">
                  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Повторите пароль
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input className="bg-gray-600 appearance-none border-2 border-gray-200 text-black rounded-full w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 pixel" id="password2" type="password" />
                </div>
              </div>
              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <Change />
                </div>
              </div>
            </form>
            */}
          </div>
        </div>
      </>}
    </>)
  }
}
