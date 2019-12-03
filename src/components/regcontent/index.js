import React from 'react';
import { Redirect } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import API from '../api/';
import Reg from '../buttons/goSignUp';
import LocalLoader from '../loader/loader';

export default class RegContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      captcha: '',
      answer: ''
    }
  }

  onCaptcha = (val) => {
    this.setState({captcha: val});
  }

  goReg = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', document.getElementById('name').value);
    data.append('email', document.getElementById('email').value);
    data.append('password_1', document.getElementById('password_1').value);
    data.append('password_2', document.getElementById('password_2').value);
    data.append('g-recaptcha-response', this.state.captcha);

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
      <div className="container">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Логин</span>
          </div>
          <input type="text" className="form-control" id="name" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">email</span>
          </div>
          <input type="text" className="form-control" id="email" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Пароль</span>
          </div>
          <input type="password" className="form-control" id="password_1" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Повторите пароль</span>
          </div>
          <input type="password" className="form-control" id="password_2" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Поставьте галочку</span>
          </div>
          <ReCAPTCHA
            sitekey="6LeUfcUUAAAAAN9byFDlaNRZS31N3gSTUSptVvDz"
            onChange={this.onCaptcha}
          />
        </div>
        <div className="center mb-5">
          <Reg reg={this.goReg} />
        </div>
      </div>
      </>}</> }
    </>
  }
}
