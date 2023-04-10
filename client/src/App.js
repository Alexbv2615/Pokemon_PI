import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import { LandingPage, HomePage, FormPage, DetailPage, NavBar } from './views/index';
import axios from 'axios';
axios.defaults.baseURL = 'https://pokemonpi-production.up.railway.app/';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === '/' ? <LandingPage/> : <NavBar/>}
      <Switch>
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/createpokemon' component={FormPage} />
        <Route exact path='/detail/:id' component={DetailPage} />
      </Switch>
    </div>
  );
}

export default App;
