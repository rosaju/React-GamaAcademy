import React, { Component } from 'react';
import './App.css';
import Cabecalho from './componentes/Cabecalho'
import NavMenu from './componentes/NavMenu'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Cabecalho>
          <NavMenu usuario="rosaju"/>
        </Cabecalho>
      </div>
    );
  }
}

export default App;
