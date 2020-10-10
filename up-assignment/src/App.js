import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';
import All from './pages/All'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/ALL/:id" exact component={All} />
          <Route path='/burger/:id' component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/products' component={Products} />
        </Switch>
      </Router>
    </>
  );
}

export default App;