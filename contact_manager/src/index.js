import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';

import NewContact from './containers/new_contact';
import ContactList from './containers/contact_list';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/new" component={NewContact}></Route>
        <Route path="/edit/:id" component={NewContact}></Route>
        <Route path="/view/:id" component={NewContact}></Route>
        <Route path="/" component={ContactList}></Route>
      </Switch>
    </div>
  </BrowserRouter>
  </Provider>
  , document.querySelector('.app-container'));
