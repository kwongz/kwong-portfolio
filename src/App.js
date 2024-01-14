import React from "react";
import "./SCSS/app.scss";
import NavBar from "./Components/NavBar.jsx";
import Tictactoe from "./gameComponents/Tictactoe.jsx";
import Connect4 from "./gameComponents/Connect4.jsx";
import Home from "./Components/Home.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				<NavBar />
				<Routes>
					<Route path='/' element={<Home/>}/>
					<Route path="/connect4" element={<Connect4 />} />
					<Route path="/tic-tac-toe" element={<Tictactoe />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
