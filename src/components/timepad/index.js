import React from 'react';
import { Helmet } from 'react-helmet';

export default class Timepad extends React.Component {
  render() {
    return(<>
      <Helmet>
        <script type="text/javascript" async="async" defer="defer" charset="UTF-8" src="https://timepad.ru/js/tpwf/loader/min/loader.js" data-timepad-customized="52381" data-timepad-apidomain="timepad.ru" data-timepad-widget-v2="event_list3"></script>
      </Helmet>
    </>);
  }
}
