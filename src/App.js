import React from "react";
import "./SCSS/app.scss";
import NavBar from "./Components/NavBar.jsx";
import Gameboard from "./tic-tac-toe/Gameboard.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				<NavBar />
				<Routes>
					<Route path="/" element={<h1>hello</h1>} />
					<Route path="/tic-tac-toe" element={<Gameboard />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
