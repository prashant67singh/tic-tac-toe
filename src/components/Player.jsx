import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onNameChange}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function onClickHandler() {
    setIsEditing((editing) => !editing);
    if(isEditing){
        onNameChange(symbol, playerName);
    }
  }

  function onChangeHandler(event) {
    setPlayerName(event.target.value);
  }

  let playerNameContent = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    playerNameContent = <input type="text" value={playerName} required onChange={onChangeHandler}></input>;
  }

  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        {playerNameContent}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={onClickHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
