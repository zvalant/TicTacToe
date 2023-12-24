
import React, { useContext } from 'react';
import './App.css';

import Board from './components/board/board.component';
import { GameContext } from './contexts/game.context';
import Display from './components/display/display.component';
const App = ()=>{
  return (
    <>
      <Board/>
      <Display/>

    </>
  )

}
export default App;
