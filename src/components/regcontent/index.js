import React from 'react';
import { Redirect } from 'react-router-dom';
import API from '../api/';
import Reg from '../buttons/goSignUp';
import LocalLoader from '../loader/loader';

export default class RegContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      answer: ''
    }
  }

  goReg = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', document.getElementById('name').value);
    data.append('email', document.getElementById('email').value);
    data.append('password_1', document.getElementById('password_1').value);
    data.append('password_2', document.getElementById('password_2').value);

    try {
      this.setState({loading: true});
      const response = await fetch(API.reg, {
        method: 'POST',
        body: data
      });

      var result = await response.text();
      console.log(result);
      this.setState({
        loading: false,
        answer: result
      });
    } catch (error) {
      this.setState({
        loading: false,
        answer: 'Ошибка:'+error
      });
      console.error('Ошибка:', error);
    }
  }

  render() {
    return <>
    {this.props.authed == true ? <>
      <Redirect to='/' />
    </> : <>
      { this.state.answer != '' && <Redirect to={{pathname: '/say', text: this.state.answer}} /> }
      {this.state.loading ? <LocalLoader /> : <>
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
            <input className="bg-gray-600 appearance-none border-2 border-gray-200 text-black rounded-full w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 pixel" id="name" type="text" />
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
            <input className="bg-gray-600 appearance-none border-2 border-gray-200 text-black rounded-full w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 pixel" id="password_1" type="password" />
          </div>
        </div>
          <div className="md:flex md:items-center mb-6 pixel">
            <div className="md:w-1/3">
              <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                Повторите пароль
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-600 appearance-none border-2 border-gray-200 text-black rounded-full w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 pixel" id="password_2" type="password" />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <Reg reg={this.goReg} />
            </div>
          </div>
        </form>
      </div>
      </>}</> }
    </>
  }
}
