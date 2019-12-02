import React from 'react';

export default class Timepad extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://timepad.ru/js/tpwf/loader/min/loader.js";
    this.div.appendChild(script);
  }

  render() {
    return(
      <div className="Timepad" ref={el => (this.div = el)}>
        <script type="text/javascript" async="async" defer="defer" charset="UTF-8" src="https://timepad.ru/js/tpwf/loader/min/loader.js" data-timepad-customized="52066" data-twf2s-event--id="1134398" data-timepad-widget-v2="event_register"></script>
      </div>
    );
  }
}
