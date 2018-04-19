import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    console.log('rootSaga loaded');
    yield takeEvery('GET_PIZZAS', fetchSaga); 

  }

function* fetchSaga(action){
  try {
      const pizzaResponse = yield call(axios.get, '/api/pizza');
      console.log(pizzaResponse);
      yield put({
          type: 'SET_MENU',
          payload: pizzaResponse.data
      })
  } catch (error) {
    console.log('fetchSaga', error)
  }
}

const pizzaMenu = (state = [], action) => {
    switch (action.type) {
        case 'SET_MENU' :
            return state
        default :
            return state    
    }
}

const store = createStore(
    combineReducers({ pizzaMenu }),
    applyMiddleware(sagaMiddleware, logger)
  );

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
