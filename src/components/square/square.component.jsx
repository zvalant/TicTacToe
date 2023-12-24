import React, {useState,useContext, useEffect} from "react";
import { GameContext } from "../../contexts/game.context";
import "./square.styles.css";
const defaultValue = " "
const Square = ({index})=>{
    const [currentValue,setCurrentValue] = useState(defaultValue);
    const {addToHistory, xPositions,oPositions,gameStatus} = useContext(GameContext);

    const turnHandler = ()=>{
        addToHistory(index)
    }
    useEffect(()=>{
        if (xPositions.has(index)) {
            setCurrentValue("X");
          } else if (oPositions.has(index)) {
            setCurrentValue("O");
          }else{
            setCurrentValue(" ");
          }
        }, [xPositions, oPositions])

    return (
        <>
            
            {currentValue === " " && gameStatus==="Playing" &&<div className = "square-container" onClick={turnHandler}>
                <h1>{currentValue}</h1>

            </div>}
            {(currentValue !== " " || gameStatus!=="Playing") &&<div className = "square-container">
                <h1>{currentValue}</h1>

            </div>}
   
        </>

         

        

        

    
   
    )
}
export default Square;