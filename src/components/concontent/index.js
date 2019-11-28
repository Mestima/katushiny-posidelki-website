import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Donate from '../donate/';
import Buy from '../buttons/buy';
import IsJson from '../isJson/';
import LocalLoader from '../loader/loader';

const convention = "test_con";

export default class ConContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: new FormData(),
      result: [],
      loading: false
    }
    this.state.data.append('convention', convention);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      this.setState({loading: true});
      const response = await fetch("http://nilored.ru/convention.php", {
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
          <tr><td class='border px-4 py-2'>{v['name']}</td>
          <td class='border px-4 py-2'>{v['description']}</td>
          <td class='border px-4 py-2'>{v['cost']}</td>
          <td class='border px-4 py-2'><Buy link={v['link']} /></td></tr>
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
        <div class='text-5xl'>{v['name']}</div>
        <div class='text-3xl'>{v['description']}</div>
        <div class='text-base'>Дата начала мероприятия: {v['starts']}</div>
        <div class='text-base'>Дата окончания мероприятия: {v['ends']}</div>
        <div class='pixel'>Уже куплено билетов: {v['visitors']}</div>
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
