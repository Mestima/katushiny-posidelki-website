import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import API from '../api/';
import Donate from '../donate/';
import Buy from '../buttons/buy';
import IsJson from '../isJson/';
import LocalLoader from '../loader/loader';

const convention = "Twilight Time: Friendship is Knowledge";

export default class ConContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: new FormData(),
      captcha: '',
      result: [],
      loading: false
    }
    this.state.data.append('convention', convention);
  }

  componentDidMount() {
    this.loadData();
  }

  onCaptcha = (val) => {
    this.setState({captcha: val});
  }

  loadData = async () => {
    try {
      this.setState({loading: true});
      const response = await fetch(API.convention, {
        method: 'POST',
        body: this.state.data
      });

      var result = await response.text();
      this.setState({loading: false});
      if (IsJson(result)) {
        this.setState({result: JSON.parse(result)});
      }
    } catch (error) {
      this.setState({loading: false});
      console.error('Ошибка:', error);
    }
  }

  createTable = () => {
    let table = [];
    let flag = false;
    let colored = true;
    let style = 'border px-4 py-2';
    for (let k of Object.keys(this.state.result)) {
      if (flag == true) {
        let v = this.state.result[k];
        let clr = '';
        if (!colored) { clr = 'bg-gray-100'; }
        colored = !colored;
        table.push(
          <tr class={clr}>
            <td class={style}>{v['name']}</td>
            <td class={style}>{v['description']}</td>
            <td class={style}>{v['cost']}</td>
            <td class={style}><Buy link={API.neworder+'?token='+this.props.token+'&item='+v['name']+'&g-recaptcha-response='+this.state.captcha} /></td>
          </tr>
        );
      }
      flag = true;
    }
    return table;
  }

  createInfo = () => {
    let table = [];
    for (let k of Object.keys(this.state.result)) {
      let v = this.state.result[k];
      table.push(<div class='text-center'>
        <div class='text-5xl font-serif'>{v['name']}</div>
        <div class='text-3xl font-serif'>{v['description']}</div>
        <div class='text-base'>Дата начала мероприятия: {v['starts']}</div>
        <div class='text-base'>Дата окончания мероприятия: {v['ends']}</div>
        <div class='text-base font-bold'>Уже куплено билетов: {v['visitors']}/{v['maxvisitors'] == '0' ? '∞' : v['maxvisitors']}</div>
      </div>);
      break;
    }
    return table;
  }

  render() {
    return <>
      {this.state.loading ? <LocalLoader /> : <>
      <div className="flex justify-center mt-4 mb-4">
        {this.createInfo()}
      </div>
      <div className="flex justify-center text-4xl font-bold">
        Билеты
      </div>
      <div className="flex justify-center text-base text-red-400 font-bold">
        Ваш билет появится в инвентаре Вашего аккаунта
      </div>
      <div className="flex justify-center text-4xl font-bold">
        <ReCAPTCHA
          sitekey="6LeUfcUUAAAAAN9byFDlaNRZS31N3gSTUSptVvDz"
          onChange={this.onCaptcha}
        />
      </div>
      <div className="flex justify-center container mb-4">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Название</th>
              <th className="px-4 py-2">Описание</th>
              <th className="px-4 py-2">Цена (рубли)</th>
              <th className="px-4 py-2">Купить</th>
            </tr>
          </thead>
          <tbody>
            {this.createTable()}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        Если Вы не можете прийти на мероприятие, Вы можете пожертвовать любую удобную Вам сумму.
      </div>
      <div className="flex justify-center">
        Все, кто пожертвовал деньги, получат благодарность со сцены, а также на сайте и в группе мероприятия!
      </div>
      <div className="flex justify-center mb-20">
        <Donate />
      </div> </> }
    </>
  }
}
