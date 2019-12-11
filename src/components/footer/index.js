import React from 'react';
import './footer.css';

var today = new Date();
var year = today.getFullYear();

export default function() {
  return(<>
    <footer className="page-footer font-small bg-dark pt-4">
    {/* Footer Links */}
    <div className="container text-center text-white text-md-left">
      {/* Grid row */}
      <div className="row">
        {/* Grid column */}
        <div className="col-md-6 mt-md-0 mt-3">
          {/* Content */}
          <h5 className="text-uppercase">Катюшины Посиделки</h5>
          <p>Все права на проект принадлежат <a href="https://vk.com/rainbowdashisthebestpony" target="_blank"> Стальному Брони</a>.</p>
          <p>Сайт создал <a href="https://vk.com/notmestima" target="_blank">Местима</a>.</p>
          <p>Все билеты выдаются покупателю в автоматическом режиме сразу после покупки.</p>
          <p>При покупке билета у организатора без использования сайта, выдача билета занимает до 24 часов.</p>
        </div>
        {/* Grid column */}
        <hr className="clearfix w-100 d-md-none pb-3" />
        {/* Grid column */}
        <div className="col-md-3 mb-md-0 mb-3">
          {/* Links */}
          <h5 className="text-uppercase">Социальные Сети</h5>
          <ul className="list-unstyled">
            <li>
              <a href="https://vk.com/katushiny_posidelki" target="_blank">ВКонтакте</a>
            </li>
            <li>
              <a href="https://kp-events.timepad.ru/" target="_blank">TimePad</a>
            </li>
          </ul>
        </div>
        {/* Grid column */}

        {/* Grid column */}
        <div className="col-md-3 mb-md-0 mb-3">
          {/* Links */}
          <h5 className="text-uppercase">Контакты</h5>
          <ul className="list-unstyled">
            <li>
              Связаться с нами можно через сообщения в группе ВКонтакте.
            </li>
            <li>
              _____________________________
            </li>
            <li>
              По техническим вопросам, можно писать сюда: mestima@icloud.com
            </li>
          </ul>
        </div>
        {/* Grid column */}
      </div>
      {/* Grid row */}
    </div>
    {/* Footer Links */}
    {/* Copyright */}
    <div className="footer-copyright text-center text-white py-3">
      Copyright © {year} | Катюшины Посиделки | v1.2.1-evil_unicorn
    </div>
    {/* Copyright */}
    </footer>
  </>);
}
