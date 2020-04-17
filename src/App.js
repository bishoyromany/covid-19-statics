import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './Sass/App.scss';

// pages
import Home from './Pages/Home'
import Footer from './Components/Footer'
function App() {
  const dev = false;

  let config;
  const base = '/covid-statics';

  if(dev){
    config = {
      'API' : {
        'COUNTRIES_TOTAL' : 'http://localhost/covid-statics/src/Caches/countries.json',
        'GENERAL_CASES' : 'http://localhost/covid-statics/src/Caches/all.json',
        'HISTORY_CASES' : 'http://localhost/covid-statics/src/Caches/history.json',
        'HISTORY_CASES_COUNTRY' : 'https://corona.lmao.ninja/v2/historical/',
      }
    };
  }else{
    config = {
      'API' : {
        'COUNTRIES_TOTAL' : 'https://corona.lmao.ninja/v2/countries',
        'GENERAL_CASES' : 'https://corona.lmao.ninja/v2/all',
        'HISTORY_CASES' : 'https://corona.lmao.ninja/v2/historical/all?lastdays=30',
        'HISTORY_CASES_COUNTRY' : 'https://corona.lmao.ninja/v2/historical/',
      }
    };
  }



  return (
    <Router basename={base}>
      <div>
        <Switch>
          <Route path="/">
            <Home API={config.API} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
