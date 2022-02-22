import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../pages/HomePage';
import Login from '../pages/LoginPage';
import Post from '../pages/PostPage';
import PostDetail from '../pages/PostDetailPage';

import '../styles/App.css';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route strict exact path='/'>
          <Home />
        </Route>
        <Route strict exact path='/post'>
          <Post />
        </Route>
        <Route strict exact path='/post/:id'>
          <PostDetail />
        </Route>
        <Route strict exact path='/login'>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
