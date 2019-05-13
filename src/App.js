import React from 'react';

import './App.css';
import Router from "./router"
import Header from './components/header/Header';


function App() {
  return (
      <div>
        <Header/>
        {Router}
      </div>

    
    
  )
}

export default App;
