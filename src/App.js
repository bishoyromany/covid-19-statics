import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './Sass/App.scss';

// pages
import Home from './Pages/Home'
function App() {
  const config = {
    'API' : {
      // 'COUNTRIES_TOTAL' : 'https://corona.lmao.ninja/countries',
      'COUNTRIES_TOTAL' : 'http://localhost/covid-statics/src/Caches/countries.json',
      // 'GENERAL_CASES' : 'https://corona.lmao.ninja/countries',
      'GENERAL_CASES' : 'http://localhost/covid-statics/src/Caches/all.json',
    }
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Home API={config.API} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
