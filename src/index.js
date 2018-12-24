import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route,
} from 'react-router-dom'
import { AppContainer } from 'react-hot-loader';
import App from './pages/app';
const root = document.getElementById('root');

const render = (Com) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  renderMethod(
    <AppContainer>
      <HashRouter>
        <Route render={props => <Com {...props} />} >
        </Route>
      </HashRouter>
    </AppContainer>,
    root)
};

render(App);

if (module.hot) {
  module.hot.accept();
}