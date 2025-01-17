import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import favMiddleware from './store/middlewares/AddtoFav'
import { createStore, applyMiddleware } from 'redux'
import AllRecuders from './store/Reducers'
import { Provider } from 'react-redux'


const store = createStore(AllRecuders,applyMiddleware(favMiddleware))


// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  
  , 
  
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
