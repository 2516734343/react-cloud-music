import React from 'react';
import { Provider } from 'react-redux';
import { IconStyle } from './assets/iconfont/iconfont';
import { renderRoutes } from 'react-router-config';
import { GlobalStyle } from './style';
import { HashRouter } from 'react-router-dom';
// import { Routes } from './routes/index';
import routes from './routes/index.js';
import store from './store/index';

function App() {

  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  );
}


export default App;
