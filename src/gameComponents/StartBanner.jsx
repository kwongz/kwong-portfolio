import React, { useState } from "react";

function WinnerBanner({ handleNewGame, handleInvite }) {
  const [playerInvite, setPlayerInvite] = useState("");

  return (
    <div className="startBanner">
      <button onClick={() => handleNewGame()}>New Game</button>
      <form id="invitationForm">
        <label for="gameId">Game ID:</label>
        <input
          type="text"
          id="gameId"
          name="gameId"
          value={playerInvite}
          onChange={(e) => setPlayerInvite(e.target.value)}
          required
        />
        <button onClick={() => handleInvite(playerInvite)} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default WinnerBanner;
