import {createContext,useEffect,useState} from "react";


export const GameContext = createContext({

    currentTurn:"X",
    setCurrentTurn: ()=>{},
    turnHistory:[],
    setTurnHistory:()=>{},
    positions:{},
    setPositions:()=>{},
    gameStatus: "Playing",
    setGameStatus:()=>{},
})
export const historyIndex = (turnHistory,turnIndex)=>{
    let counter = 0;
    const newHistory = turnHistory.filter((turn)=>{
        counter ++;
        return counter<=turnIndex;
    })
    return newHistory
    }

export const addHistory = (turnHistory,squareIndex)=>{
    const historyCopy = [...turnHistory]
    let currentValue;
    if (historyCopy.length%2===0){
       currentValue = "X";
    }
    else{currentValue = "O";}
    const currentTurn = {index:squareIndex,value:currentValue}
    const newHistory = [...historyCopy,currentTurn]
    return newHistory
}
export const positionCollection = (turnHistory,value)=>{
    const positions = turnHistory.filter((turn)=>{
        return turn.value===value
    }).map((turn)=>turn.index)
    const positionsSet = new Set(positions)
    return positionsSet

}
export const victoryCalculator = (positions)=>{
    const divider = 3;
    const victoryHash = new Map([
        ["m0",0],
        ["m1",0],
        ["m2",0],
        ["i0",0],
        ["i1",0],
        ["i2",0],
        ["f",0],
        ["b",0],
    ])

    for (const position of positions){
        const modValue = position%divider;
        const intDivValue = Math.floor(position/divider);
        const mod = `m${modValue}`;
        const intdiv = `i${intDivValue}`;
        let currentModValue = victoryHash.get(mod);
        currentModValue++;
        let currentIntDivValue = victoryHash.get(intdiv);
        currentIntDivValue++;
        victoryHash.set(mod,currentModValue);
        victoryHash.set(intdiv,currentIntDivValue);
        if (modValue===intDivValue){
            let currentFValue = victoryHash.get("f");
            currentFValue++;
            victoryHash.set("f",currentFValue);
        }else if (position ===2||position===4||position ===6){
            let currentBValue = victoryHash.get("b");
            currentBValue++
            victoryHash.set("b",currentBValue);
        }

    }
    for (const value of victoryHash){
        
        if (value[1] >2){
        
            return true;
        }
    }
    
    return false;
    
}


export const GameProvider = ({children}) =>{
    const [currentTurn, setCurrentTurn] = useState("X");
    const [turnHistory, setTurnHistory] = useState([]);
    const [xPositions, setXPositions] = useState(new Set());
    const [oPositions, setOPositions] = useState(new Set());
    const [gameStatus,setGameStatus] = useState("Playing");


    

    const addToHistory = (squareIndex)=>{
        setTurnHistory(addHistory(turnHistory,squareIndex))
    }
    const changeHistory = (turnIndex)=>{
        setTurnHistory(historyIndex(turnHistory,turnIndex))
    }
    const resetHistory = ()=>{
        setTurnHistory([])
    }
    useEffect(()=>{
        let currentTurn;
        if (turnHistory.length%2===0){
            currentTurn = "X"
        }else{currentTurn="O"}        
        setCurrentTurn(currentTurn)
    },[turnHistory])
    useEffect(()=>{
        const currentXPositions = positionCollection(turnHistory,"X")
        const currentOPositions = positionCollection(turnHistory,"O")
        setXPositions(currentXPositions)
        setOPositions(currentOPositions)
        console.log(xPositions)
    }, [turnHistory])
    useEffect(()=>{
        const xVictory = victoryCalculator(xPositions)
        const oVictory = victoryCalculator(oPositions)
        if(xVictory){
            setGameStatus("X Won!")
        }else if (oVictory){
            setGameStatus("O Won!")
        }else if (turnHistory.length===9){
            setGameStatus("Draw!")
        }else{
            setGameStatus("Playing")
        }
        

    },[xPositions,oPositions])
    




    const value = {currentTurn,setCurrentTurn,turnHistory,addToHistory,changeHistory,resetHistory,xPositions,oPositions,gameStatus}
    return <GameContext.Provider value = {value}>{children}</GameContext.Provider>

    
}