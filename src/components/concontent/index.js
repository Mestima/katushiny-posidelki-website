import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
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
    for (let v of this.state.result) {
      table.push(
        <tr><td class='border px-4 py-2'>{v['name']}</td>
        <td class='border px-4 py-2'>{v['description']}</td>
        <td class='border px-4 py-2'>{v['cost']}</td>
        <td class='border px-4 py-2'><Buy link={v['link']} /></td></tr>
      );
    }
    return table;
  }

  render() {
    return <>
      {this.state.loading ? <LocalLoader /> : <>
      <div className="flex justify-center">
        Hello World!
      </div>
      <div className="flex justify-center container">
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
      <div className="flex justify-center mb-20">
        Hello World!
      </div> </> }
    </>
  }
}
