import './App.css';
import { Route, Switch } from 'react-router-dom';
import { LandingPage, HomePage, FormPage, DetailPage } from './views/index';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/createpokemon' component={FormPage} />
        <Route exact path='/detail/:id' component={DetailPage} />
      </Switch>
    </div>
  );
}

export default App;
