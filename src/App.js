import "./SCSS/app.scss";
import NavBar from "./Components/NavBar.jsx";
import Gameboard from "./tic-tac-toe/Gameboard.jsx";

function App() {
	return (
		<div className="App">
			<NavBar />
			<Gameboard />
		</div>
	);
}

export default App;
