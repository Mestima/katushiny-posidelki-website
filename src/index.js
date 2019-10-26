import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
//import 'bootstrap/dist/css/bootstrap.min.css'; /* bootstrap */
import 'tailwindcss/dist/tailwind.min.css'; /* tailwind css */
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('root'));

serviceWorker.unregister();
