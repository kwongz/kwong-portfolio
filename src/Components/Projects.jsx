import React from "react";
import connect4Pic from "../images/connect4.png";
import ticTacToePic from "../images/tic-tac-toe.png";

function Projects({ projectHidden }) {
  return (
    <div className={`projects-section ${projectHidden ? "hidden" : ""}`}>
      <div className="project-grid-container">
        <a href="/tic-tac-toe">
          <div className="project-container">
            <h3>Tic-Tac-Toe</h3>
            <div className="project-image-container">
              <img src={ticTacToePic} />
            </div>
            <div className="project-description-container">
              <h4>React Project</h4>
              <p>
                A <span className="copy-highlight">User Friendly</span>{" "}
                tic-tac-toe game, with multiple{" "}
                <span className="copy-highlight">Reusuable Components</span> for
                future projects.
              </p>
              <a
                href="https://github.com/kwongz/kwong-portfolio/tree/master/src/gameComponents"
                target="_blank"
              >
                Code
              </a>
              <a href="/tic-tac-toe">Link</a>
            </div>
          </div>
        </a>
        <a href="/connect4">
          <div className="project-container">
            <h3>Connect 4</h3>
            <div className="project-image-container">
              <img src={connect4Pic} />
            </div>
            <div className="project-description-container">
              <h4>React Project</h4>
              <p>
                <span className="copy-highlight">Repurposing</span>{" "}
                <span className="copy-highlight">components</span> and using a
                directional{" "}
                <span className="copy-highlight">recursive function</span> as my
                checkWin logic. Reuitlizing the recursion for upcoming project
              </p>

              <a
                href="https://github.com/kwongz/kwong-portfolio/tree/master/src/gameComponents"
                target="_blank"
              >
                Code
              </a>
              <a href="/connect4">Link</a>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Projects;
