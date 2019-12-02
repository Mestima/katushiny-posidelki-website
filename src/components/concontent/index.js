import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import API from '../api/';
import Donate from '../donate/';
import Buy from '../buttons/buy';
import IsJson from '../isJson/';
import LocalLoader from '../loader/loader';
import Timepad from '../timepad/';

const convention = "Twilight Time: Friendship is Knowledge";
const useTimepad = true;

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
    for (let k of Object.keys(this.state.result)) {
      if (flag == true) {
        let v = this.state.result[k];
        table.push(
          <tr>
            <td>{v['name']}</td>
            <td>{v['description']}</td>
            <td>{v['cost']}</td>
            <td><Buy link={API.neworder+'?token='+this.props.token+'&item='+v['name']+'&g-recaptcha-response='+this.state.captcha} /></td>
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
        <div class='display-3 font-weight-bold'>{v['name']}</div>
        <div><h3>{v['description']}</h3></div>
        <div>Дата начала мероприятия: {v['starts']}</div>
        <div>Дата окончания мероприятия: {v['ends']}</div>
        <div><b>Уже куплено билетов: {v['visitors']}/{v['maxvisitors'] == '0' ? '∞' : v['maxvisitors']}</b></div>
      </div>);
      break;
    }
    return table;
  }

  render() {
    return <div className="container">
      {this.state.loading ? <LocalLoader /> : <>
      <div className="text-center">
        {this.createInfo()}
      </div>
      <div className="text-center display-3 font-weight-bold">
        Билеты
      </div>
      {useTimepad ?
        <>

        </> :
        <>
          <div className="text-center text-danger">
            <h4>Ваш билет появится в инвентаре Вашего аккаунта</h4>
          </div>
          <div>
            Для покупки билета необходимо пройти капчу...
            <ReCAPTCHA
              sitekey="6LeUfcUUAAAAAN9byFDlaNRZS31N3gSTUSptVvDz"
              onChange={this.onCaptcha}
            />
          </div>
        </>
      }
      <div>
        {useTimepad ?
          <>
            <div className="text-center text-danger">
              <h4>При покупке билета укажите логин Вашего аккаунта на сайте</h4>
              <h6>(это нужно для добавления билета в Ваш инвентарь, однако билет в ЛЮБОМ случае будет выслан Вам на email)</h6>
            </div>
            <Timepad />
          </> :
          <>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Описание</th>
                  <th>Цена (рубли)</th>
                  <th>Купить</th>
                </tr>
              </thead>
              <tbody>
                {this.createTable()}
              </tbody>
            </table>
          </>
        }
      </div>
      {useTimepad ?
        <>
          <div className="mb-5" />
        </> :
        <>
          <div className="text-center text-info">
            Если Вы не можете прийти на мероприятие, Вы можете пожертвовать любую удобную Вам сумму.
            <br />
            Все, кто пожертвовал деньги, получат благодарность со сцены, а также на сайте и в группе мероприятия!
            <br />
            <Donate />
          </div>
        </>
      }
      </> }
    </div>
  }
}
