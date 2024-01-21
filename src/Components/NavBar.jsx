import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
	const [mobileNavClosed, setMobileNavClosed] = useState(true);

	return (
		<div className="navbar">
			<h1>
				<Link to="/kwong-portfolio">@Code Kyle Wong</Link>
			</h1>
			<div
				className="hamburger-menu"
				onClick={() => setMobileNavClosed(!mobileNavClosed)}>
				<i
					className={`fa-solid fa-bars ${mobileNavClosed ? "" : "hidden"}`}></i>
				<i className={`fa-solid fa-x ${mobileNavClosed ? "hidden" : ""}`}></i>
			</div>
			<ul className={`menu ${mobileNavClosed ? "" : "showMenu"}`}>
				<li>
					<Link to="/tic-tac-toe">Tic-tac-toe</Link>
				</li>
				<li>
					<Link to="/connect4">Connect 4</Link>
				</li>
				<li>
					<Link target="_blank" to="https://kwongz.github.io/KW-ECommerce-App/">
						Makeup store
					</Link>
				</li>
				<li className="contact">
					<a href="mailto:Kyle.wong917@gmail.com">Contact</a>
				</li>
			</ul>
		</div>
	);
}

export default NavBar;
