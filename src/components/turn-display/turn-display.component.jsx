import React,{useContext} from "react";
import { GameContext } from "../../contexts/game.context";

const TurnDisplay = ({index, value,squareIndex}) =>{
    const {changeHistory} = useContext(GameContext);
    const changeHandler = ()=>{
        changeHistory(index)
    }
    return (
        <div onClick={changeHandler}>
            <h1>Turn {index+1}: {value} was placed on square {squareIndex}</h1>
        </div>
    )



}
export default TurnDisplay;