import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// 3 maneras de definir rutas:
// component={Home}
// render={() => <Home prop='value' />}
// element={<Home prop='value' />}

reportWebVitals();
