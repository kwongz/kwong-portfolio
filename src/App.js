import React from "react";
import "./SCSS/app.scss";
import NavBar from "./Components/NavBar.jsx";
import Tictactoe from "./gameComponents/Tictactoe.jsx";
import Connect4 from "./gameComponents/Connect4.jsx";
import Home from "./Components/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/kwong-portfolio" exact component={Home} />
        <Route path="/kwong-portfolio/connect4" component={Connect4} />
        <Route path="/kwong-portfolio/tic-tac-toe" component={Tictactoe} />
      </Routes>
    </div>
  );
}

export default App;
