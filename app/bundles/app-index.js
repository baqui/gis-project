import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { HomePage } from '../pages/home/HomePage';
import { MainLayout } from '../layouts/MainLayout';

const container = document.getElementById('app');

render ((
  <BrowserRouter>
    <MainLayout>
      <Switch>
        <Route path='/' exact component={ HomePage } />
      </Switch>
    </MainLayout>
  </BrowserRouter>
), container);
