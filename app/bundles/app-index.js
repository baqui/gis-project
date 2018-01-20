global.Promise = require('bluebird');

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HomePage } from '../pages/home/HomePage';
import { MainLayout } from '../layouts/MainLayout';
import store from '../Store';

const container = document.getElementById('app');

render ((
  <Provider store={ store } >
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route path='/' exact component={ HomePage } />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  </Provider>
), container);
