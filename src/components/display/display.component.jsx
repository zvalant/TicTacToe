import React from "react";
import { useContext } from "react";
import { GameContext } from "../../contexts/game.context";
import TurnDisplay from "../turn-display/turn-display.component";

const Display = () =>{
    const {currentTurn,gameStatus,turnHistory} = useContext(GameContext)

    return (
        <div>
            <h1>
                Current Turn: {currentTurn}
            </h1>
            <h1>{gameStatus}</h1>
            {turnHistory.map((turn,index)=>{
                return <TurnDisplay key={index} index = {index} value = {turn.value} squareIndex = {turn.index}/>
            })}

        </div>
    )

}
export default Display;
