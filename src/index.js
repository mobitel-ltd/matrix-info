import React from 'react';
import ReactDOM from 'react-dom';
import * as colors from '@ant-design/colors';
import { Provider } from 'mobx-react';
import 'styles/index.css';
import moment from 'moment';
import 'moment/locale/ru';
import { ConfigProvider } from 'antd';
import { ThemeProvider, jss, JssProvider } from 'react-jss';
import ruRu from 'antd/es/locale/ru_RU';
import * as serviceWorker from 'serviceWorker';
import 'antd/dist/antd.css';
import App from 'app';
import userStore from 'store';
import * as mocks from 'mocks';

moment.locale('ru');

// jss.options.insertionPoint = 'jss-point';

const theme = {
  colors,
};

const store = process.env.REACT_APP_USE_MOCK ? mocks.store : userStore;

ReactDOM.render(
  <Provider user={store}>
    <ConfigProvider locale={ruRu}>
      <JssProvider jss={jss}>
        <ThemeProvider injectFirst theme={theme}>
          <App />
        </ThemeProvider>
      </JssProvider>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
