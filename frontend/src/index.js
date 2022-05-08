import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import configureStore from  './redux/reducers/configureStore';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/index.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./components/i18n";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore();

root.render(
  <BrowserRouter >
  <Provider store={store}> <App /></Provider>
</BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
