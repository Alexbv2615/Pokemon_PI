import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import { LandingPage, HomePage, FormPage, DetailPage, SearchBar } from './views/index';


function App() {

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === '/' ? <LandingPage/> : <SearchBar/>}
      <Switch>
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/createpokemon' component={FormPage} />
        <Route exact path='/detail/:id' component={DetailPage} />
      </Switch>
    </div>
  );
}

export default App;
