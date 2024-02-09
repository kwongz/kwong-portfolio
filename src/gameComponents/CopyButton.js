import React, { useState } from "react";

const CopyButton = ({ text }) => {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <button className="game-button" onClick={copyToClipboard}>
        Copy Game ID
      </button>
    </div>
  );
};

export default CopyButton;
