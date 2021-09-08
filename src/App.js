import React, { Component } from 'react';
import './App.css';
import BlogRouter from './router'
// import { NavLink } from 'react-router-dom' //声明式导航
import {Provider} from 'react-redux'
import store from './redux/stoer'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BlogRouter></BlogRouter>
      </Provider>
    )


  }
}

export default App;
