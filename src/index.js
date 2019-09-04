import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';

import 'antd/dist/antd.css';
import './index.scss';

ReactDOM.render(
    <BrowserRouter>
        <ConfigProvider locale={ zh_CN }>
            <App />
        </ConfigProvider>
    </BrowserRouter>,
    document.querySelector('#root')
);
