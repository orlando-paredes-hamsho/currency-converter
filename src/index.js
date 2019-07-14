import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CurrencyService from './services/currency-service';
import AppModel from './models/app';
import * as serviceWorker from './serviceWorker';

const currency_service = new CurrencyService();
const app_model = new AppModel();

ReactDOM.render(<App model={app_model} service={currency_service} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
