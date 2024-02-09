import React, { useState } from "react";

function WinnerBanner({ handleNewGame, handleInvite }) {
  const [playerInvite, setPlayerInvite] = useState("");

  return (
    <div className="start-banner">
      <button className="game-button" onClick={() => handleNewGame()}>
        New Game
      </button>
      <ul className="Rules">
        <li>Start a new game</li>
        <li>or</li>
        <li>Wait for Game ID Invite</li>
      </ul>
      <form className="invitation-form" id="invitationForm">
        <label for="gameId"></label>
        <input
          type="text"
          id="gameId"
          name="gameId"
          value={playerInvite}
          placeholder="Game ID"
          onChange={(e) => setPlayerInvite(e.target.value)}
          required
        />
        <button
          className="game-button
        "
          onClick={() => handleInvite(playerInvite)}
          type="submit"
        >
          Join Game
        </button>
      </form>
    </div>
  );
}

export default WinnerBanner;
