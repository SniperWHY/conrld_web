import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './reducers';
import 'antd/dist/antd.css';
import './index.scss';

export const store = createStore(Reducer);

ReactDOM.render(
    <BrowserRouter>
        <ConfigProvider locale={ zh_CN }>
            <Provider store={ store }>
                <App />
            </Provider>
        </ConfigProvider>
    </BrowserRouter>,
    document.querySelector('#root')
);
