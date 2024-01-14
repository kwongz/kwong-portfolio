import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
	return (
		<div className="navbar">
			<h1>
				<Link to="/">@Code Kyle Wong</Link>
			</h1>
			<ul className="menu">
				<li>
					<Link to="/tic-tac-toe">Tic-tac-toe</Link>
				</li>
				<li>
					<Link to="/connect4">Connect 4</Link>
				</li>
				<li>
					<a>Project 3</a>
				</li>
			</ul>
		</div>
	);
}

export default NavBar;
