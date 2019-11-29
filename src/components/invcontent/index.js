import React from 'react';
import { Redirect } from 'react-router-dom';
import LocalLoader from '../loader/loader';
import API from '../api/';

export default class InvContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    if (this.props.token != 'none')
      window.location.replace(API.inventory+this.props.token);
  }

  render() {
    return <>
      {this.props.token != 'none' ? <><LocalLoader /> </> : <>
        <Redirect to='/' />
      {/*
      <br />
      <center>
        <div className="pt-2 pb-2 pl-6 pr-6 font-sans font-bold text-3xl text-blue-400">
          Катюшины Посиделки # ИНВЕНТАРЬ
        </div>
  		</center>
      <br />
      <div className="flex justify-center pixel">
        <h3>Загляни позже, поняша :3</h3>
      </div>
      */}
      </>}
    </>
  }
}
