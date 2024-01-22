import React, { useState } from "react";
import profileImg from "../images/kyle-wong-profile.jpg";
import ReduxLogo from "../images/Redux.png";
import FirebaseLogo from "../images/firebase.png";
import Projects from "./Projects";
import WorkXp from "./WorkXP";
import AnimatedTypeWriter from "./AnimatedTypeWriter";

function Home() {
  const [projectHidden, setProjectHidden] = useState(false);
  const [secondPrinter, setSecondPrinter] = useState(false);

  return (
    <>
      <header className="homepage-container">
        <div className="grid-container">
          <div className="left-grid-container">
            <div className="profile-container">
              <div className="img-container">
                <img src={profileImg} alt="Kyle Wong Profile Picture" />
              </div>
              <h2>Kyle Wong</h2>
              <span className="location">
                <i class="fa-solid fa-location-dot"></i> Toronto, ON, Canada
              </span>
              <span className="email">
                <i class="fa-solid fa-envelope"></i>
                <a href="mailto:Kyle.wong917@gmail.com">
                  Kyle.wong917@gmail.com
                </a>
              </span>
            </div>
            <span className="grid-divider"></span>
            <div className="skills-bar">
              <h3>Skills</h3>
              <ul className="skills-container">
                <li className="icon-container">
                  <i className="fa-brands fa-html5"></i>
                  <span className="icon-title">HTML</span>
                </li>
                <li className="icon-container">
                  <i className="fa-brands fa-css3"></i>
                  <span className="icon-title">CSS</span>
                </li>
                <li className="icon-container">
                  <i className="fa-brands fa-github"></i>
                  <span className="icon-title">Github</span>
                </li>
                <li className="icon-container">
                  <i className="fa-brands fa-js"></i>
                  <span className="icon-title">Javascript</span>
                </li>
                <li className="icon-container">
                  <i className="fa-brands fa-react"></i>
                  <span className="icon-title">React</span>
                </li>
                <li className="icon-container">
                  <i className="fa-brands fa-sass"></i>
                  <span className="icon-title">SASS</span>
                </li>
                {/* imgs made to look like font awesome icons */}
                <li className="icon-container .img-centering">
                  <img className="fa-img" src={ReduxLogo} />
                  <span className="fa-img-title">Redux</span>
                </li>
                <li className="icon-container">
                  <img className="fa-img" src={FirebaseLogo} />
                  <span className="fa-img-title">Firebase</span>
                </li>
              </ul>
            </div>
            <span className="grid-divider"></span>
            <h3>Links</h3>
            <ul className="links">
              <li>
                <i class="fa-brands fa-square-github"></i>
                <a href="https://github.com/kwongz" target="_blank">
                  Github
                </a>
              </li>
              <li>
                <i class="fa-brands fa-linkedin"></i>
                <a
                  href="https://www.linkedin.com/in/kyle-wong-410465a5/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <i class="fa-brands fa-square-instagram"></i>
                <a href="https://www.instagram.com/kwongz/" target="_blank">
                  Instagram
                </a>
              </li>
            </ul>
            <span className="grid-divider"></span>
            <h3>Education</h3>
            <ul className="education">
              <li>
                <h4>Juno College of Technology - 2020</h4>
                <p>
                  Web Dev Bootcamp, coding in html,css, javascript and react.
                  Focus on web accessibility and responsive designs
                </p>
              </li>
              <li>
                <h4>University of Waterloo - 2015</h4>
                <p>
                  BSc Kinesiology, my studies focused mainly on biomechanics,
                  injury mechanism. 3 terms co-op working in Waterloo Biomech
                  lab.
                </p>
              </li>
            </ul>
          </div>
          {/* end of left-grid-container */}
          <section className="right-grid-container">
            <div className="grid-wrapper">
              <div className="profile-text">
                <div className="typewriter-container">
                  <h1>
                    <AnimatedTypeWriter
                      text={"Front-End Developer"}
                      printReady={true}
                      setSecondPrinter={() => setSecondPrinter(true)}
                      delay={50}
                    />
                  </h1>
                  <h2>
                    <AnimatedTypeWriter
                      text={"# Hello There!"}
                      printReady={secondPrinter}
                      setSecondPrinter={() => setSecondPrinter(false)}
                      delay={75}
                    />
                  </h2>
                </div>
                <div>
                  <p>
                    👋 I'm Kyle, a passionate{" "}
                    <span className="copy-highlight">Front-End Developer</span>{" "}
                    with over{" "}
                    <span className="copy-highlight">
                      3 Years of Experience
                    </span>
                    . My expertise lies in crafting delightful user experiences
                    using technologies like{" "}
                    <span className="copy-highlight">
                      React, JavaScript, HTML
                    </span>
                    , and <span className="copy-highlight">CSS</span>.
                  </p>
                  <p>
                    🚀 What I Love: - Transforming ideas into interactive and
                    user-friendly designs. - Solving complex problems through
                    creative coding solutions. - And golfing!
                  </p>
                  <p>
                    💻 Explore my portfolio to see my work and get in touch for
                    exciting collaborations.
                  </p>
                </div>
              </div>
              <span className="grid-divider"></span>
              <div className="filter-button-container">
                <span
                  className={`filter-button ${
                    projectHidden ? "" : "active-tab"
                  }`}
                  disabled={!projectHidden}
                  onClick={() => setProjectHidden(false)}
                >
                  <i class="fa-solid fa-code"></i> Projects
                </span>
                <span
                  className={`filter-button ${
                    projectHidden ? "active-tab" : ""
                  }`}
                  disabled={projectHidden}
                  onClick={() => setProjectHidden(true)}
                >
                  <i class="fa-solid fa-code"></i> Work Experience
                </span>
              </div>
              <Projects projectHidden={projectHidden} />
            </div>
            {/*Work Experience Section*/}
            <WorkXp projectHidden={projectHidden} />
          </section>
          {/* end of right-grid-container */}
        </div>
      </header>
    </>
  );
}

export default Home;
