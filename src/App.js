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
