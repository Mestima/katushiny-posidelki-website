import React from 'react';
import { Redirect } from 'react-router-dom';
import Reg from '../buttons/goSignUp';

export default class RegContent extends React.Component {
  render() {
    return <>
    {this.props.authed == true ? <>
      <Redirect to='/' />
    </> : <>
      <br />
      <div className="flex-auto text-black text-center px-4 py-2 m-2">
        <div className="text-3xl mb-2 pixel">Регистрация</div>
        <div className="text-base mb-10 pixel">Используйте только английские буквы для логина!</div>
        <form className="max-w-sm mx-auto">
        <div className="md:flex md:items-center mb-6 pixel">
          <div className="md:w-1/3">
            <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
              Введите логин
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-600 appearance-none border-2 border-gray-200 text-black rounded-full w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 pixel" id="login" type="text" />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 pixel">
          <div className="md:w-1/3">
            <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
              Введите email
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-600 appearance-none border-2 border-gray-200 text-black rounded-full w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 pixel" id="email" type="text" />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 pixel">
          <div className="md:w-1/3">
            <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
              Введите пароль
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
              <Reg />
            </div>
          </div>
        </form>
      </div>
      </> }
    </>
  }
}
