import React from "react";
import connect4Pic from "../images/connect4.png";
import ticTacToePic from "../images/tic-tac-toe.png";
import kwEcommerce from "../images/kw-ecommerce.png";

function Projects({ projectHidden }) {
	return (
		<div className={`projects-section ${projectHidden ? "hidden" : ""}`}>
			<div className="project-grid-container">
				<div className="project-container">
					<h3>Tic-Tac-Toe</h3>
					<div className="project-image-container">
						<a href="/tic-tac-toe" target="_blank">
							<img src={ticTacToePic} />
						</a>
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
							className="project-link"
							href="https://github.com/kwongz/kwong-portfolio/tree/master/src/gameComponents"
							target="_blank">
							Code
						</a>
						<a className="project-link" href="/tic-tac-toe" target="_blank">
							Link
						</a>
					</div>
				</div>
				<div className="project-container">
					<h3>Connect 4</h3>
					<div className="project-image-container">
						<a href="/connect4" target="_blank">
							<img src={connect4Pic} />
						</a>
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
							className="project-link"
							href="https://github.com/kwongz/kwong-portfolio/tree/master/src/gameComponents"
							target="_blank">
							Code
						</a>
						<a className="project-link" href="/connect4" target="_blank">
							Link
						</a>
					</div>
				</div>
				<div className="project-container">
					<h3>Make-up Store</h3>
					<div className="project-image-container">
						<a
							href="https://kwongz.github.io/KW-ECommerce-App/"
							target="_blank">
							<img src={kwEcommerce} />
						</a>
					</div>
					<div className="project-description-container">
						<h4>React Project</h4>
						<p>
							<span className="copy-highlight">API Request</span> to populate
							store inventory, <span className="copy-highlight">Modal</span>{" "}
							handling for favourites and cart store, brand and type{" "}
							<span className="copy-highlight">Filtering</span> for store
							inventory. <span className="copy-highlight">UseContext</span> to
							simply passing from children components
						</p>

						<a
							className="project-link"
							href="https://github.com/kwongz/KW-ECommerce-App"
							target="_blank">
							Code
						</a>
						<a
							className="project-link"
							href="https://kwongz.github.io/KW-ECommerce-App/"
							target="_blank">
							Link
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Projects;
