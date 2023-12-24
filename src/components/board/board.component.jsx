import React from "react";
import Square from "../square/square.component";
import "./board.styles.css"

const Board = ()=>{
    return(
        <>
            <div className="board">
                {
                    Array.from({length:9},(_,index)=>(<Square key={index} index= {index}/>))
                }
         
            </div>
            
        </>
    )
}
export default Board;