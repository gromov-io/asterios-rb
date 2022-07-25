import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "antd/dist/antd.css";
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

var relativeTime = require('dayjs/plugin/relativeTime')
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
dayjs.locale('ru')

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
