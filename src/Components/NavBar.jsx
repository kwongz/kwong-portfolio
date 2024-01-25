import React, { useState } from "react";
import { Link } from "react-router-dom";
import ResumeButton from "./ResumeButton";
import resume from "../images/KyleWongResume2024.pdf";

function NavBar() {
  const [mobileNavClosed, setMobileNavClosed] = useState(true);

  return (
    <div className="navbar">
      <h1>
        <Link to="/kwong-portfolio">@Code Kyle Wong</Link>
      </h1>
      <div
        className="hamburger-menu"
        onClick={() => setMobileNavClosed(!mobileNavClosed)}
      >
        <i
          className={`fa-solid fa-bars ${mobileNavClosed ? "" : "hidden"}`}
        ></i>
        <i className={`fa-solid fa-x ${mobileNavClosed ? "hidden" : ""}`}></i>
      </div>
      <ul className={`menu ${mobileNavClosed ? "" : "showMenu"}`}>
        <li>
          <Link to="https://www.genesis.com/ca/en/main.html">Genesis</Link>
        </li>
        <li>
          <Link to="/connect4">Connect 4</Link>
        </li>
        <li>
          <Link to="/tic-tac-toe">Tic-tac-toe</Link>
        </li>
        <li>
          <Link target="_blank" to="https://kwongz.github.io/KW-ECommerce-App/">
            Makeup store
          </Link>
        </li>
        <li className="navBarButton">
          <a href="mailto:Kyle.wong917@gmail.com">Contact</a>
        </li>
        <li className="navBarButton">
          <ResumeButton fileUrl={resume} fileName={"Kyle Wong Resume"} />
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
