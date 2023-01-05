import { useEffect, useState } from 'react'
import './styles.scss'

const winCombinations = [
  {indexes: [0,1,2], orientation: 'horizontal'},
  {indexes: [3,4,5], orientation: 'horizontal'},
  {indexes: [6,7,8], orientation: 'horizontal'},
  {indexes: [0,3,6], orientation: 'vertical'},
  {indexes: [1,4,7], orientation: 'vertical'},
  {indexes: [2,5,8], orientation: 'vertical'},
  {indexes: [0,4,8], orientation: 'diagonal1'},
  {indexes: [2,4,6], orientation: 'diagonal2'},
];

export function App() {
  const [gameData, setGameData] = useState([0,0,0,0,0,0,0,0,0]);
  const [turn, setTurn] = useState(1);
  const [winnerOk, setWinnerOk] = useState(null);
  let winner = null;
  
  const handleClean = () => {
    const data = [0,0,0,0,0,0,0,0,0]
    setGameData(data);
    setWinnerOk(null);
    winner = null;
  };
  
  useEffect(()=>{
    checkWinner();
    checkGameEnded();
  },[gameData]);
  
  const checkGameEnded = ()=>{
    if(gameData.every((item)=> item !== 0) && winner === null){
      alert('Jogo Acabou, deu Velha!');
    };
  };
  
  const checkWinner = () => {
    
    for(let combination of winCombinations){
      const { indexes } = combination;

      if(gameData[indexes[0]]===1 &&
         gameData[indexes[1]]===1 &&
         gameData[indexes[2]]===1
         )
         { winner = 'Player 1'; };

      if(gameData[indexes[0]]===2 &&
         gameData[indexes[1]]===2 &&
         gameData[indexes[2]]===2
         )
         { winner = 'Player 2'; };

      if(winner){
        setWinnerOk(combination);
        break;
        };
    };
  };

  const handleClick = (clickIndex) => {
   
    if(gameData[clickIndex] !== 0){
      return;
    }

    if(winnerOk) {
      return;
    }

    setGameData((prev)=>{
      const newGameData = [...prev];
      newGameData[clickIndex] = turn;
      return newGameData;
    })

    setTurn((prev)=>prev === 1 ? 2 : 1);
  };

  return (
    <>
    
      <div className="board-game">
        {gameData.map((value, index)=>(
          <span onClick={()=> {handleClick(index)}}
          key={index}
          className={winnerOk?.indexes.includes(index) ? winnerOk.orientation : undefined}>
            <abbr title="">{index}</abbr>
            {value === 1 && '❌'}
            {value === 2 && '⭕'}
          </span> 
          ))}
      </div>
      <button className="buttonClean" onClick={handleClean}>Início</button>
    </>
  );
}

