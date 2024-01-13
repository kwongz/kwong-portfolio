import React from 'react';
import AnimatedTypeWriter from './AnimatedTypeWriter';
import profileImg from '../images/_DSC1569-Edit 2_compressed.jpg'
import ReduxLogo from '../images/Redux.png'
import FirebaseLogo from '../images/firebase.png'
import connect4Pic from '../images/connect4.png'
import ticTacToePic from '../images/tic-tac-toe.png'

function ComponentName() {
  return (
    <>
    <header className='homepage-container'>
      <AnimatedTypeWriter/>
      <div className='profile-container'>
        <div className='img-container'>
          <img src={profileImg} alt='Kyle Wong Profile Picture'/>
        </div>
        <div className='profile-text'>
        <h1>Welcome</h1>
        <h2>Kyle Wong - Web Developer</h2>
        <div>
            <p># Hello there! 👋
            I'm Kyle, a passionate front-end developer with over 3 years of experience. My expertise lies in crafting delightful user experiences using technologies like React, JavaScript, HTML, and CSS.</p>
            <p>🚀 What I Love:
            - Transforming ideas into interactive and user-friendly designs.
            - Solving complex problems through creative coding solutions.
            - Learning new </p>
            <p>💻 Let's Build Something Amazing Together!
            Explore my portfolio to see my work and get in touch for exciting collaborations.</p>
        </div>
        </div>
      </div>
    </header>
    <section className='projects-section'>
    <svg className='divider-light' xmlns="http://www.w3.org/2000/svg" viewBox="0 186.5 1920 112.5">
      <polygon points="0,186.5 487.5,278 1064.833,198.5 1955.5,288 1955.5,186.5" fill="#212f3b"/>
    </svg>
    <h2 className='section-title'>Projects</h2>
    <div className='project-grid-container'>
    <div className='project-container'>
          <h3>Tic-Tac-Toe</h3>
        <div className='project-image-container'>
          <img src={ticTacToePic}/>
        </div>
        <div className='project-description-container'>
          <p>React Project</p>
          <ul>
            <li>Created reusable components to build into connect4</li>
            <li>Created game matrix and winning matrix to handle wins</li>
            <li>Added animations for natural user interface </li>
          </ul>
          <a href='https://github.com/kwongz/kwong-portfolio/tree/master/src/gameComponents' target="_blank">Code</a>
          <a href='/tic-tac-toe'>Link</a>
        </div>
      </div>
      <div className='project-container'>
          <h3>Connect 4</h3>
        <div className='project-image-container'>
          <img src={connect4Pic}/>
        </div>
        <div className='project-description-container'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae similique accusantium, voluptatibus facere iusto culpa. Nulla sit, nesciunt blanditiis nam est aspernatur quidem alias similique quod vel, quo saepe pariatur incidunt. Sit rem fugit unde necessitatibus voluptatem debitis voluptate est sunt facilis, iure, qui temporibus mollitia, velit quis? Impedit, dolorum?</p>
          <a href='https://github.com/kwongz/kwong-portfolio/tree/master/src/gameComponents' target="_blank">Code</a>
          <a href='/connect4'>Link</a>
        </div>
      </div>
    </div>

    </section>
      <svg className='divider-dark' xmlns="http://www.w3.org/2000/svg" viewBox="0 186.5 1920 112.5">
      <polygon points="0,186.5 487.5,278 1064.833,198.5 1955.5,288 1955.5,186.5" fill="#cbd6dd"/>
    </svg>
    <section> {/*Work Experience Section*/}
    <h2 className='section-title-light'>Work Experience</h2>
      <div className='work-experience-container'>
        <ul className='card-container'>
          <li className='work-card'>
            <div className='work-title'>
            <h3>Title</h3>
            <span>Date</span>
            </div>
            <ul className='description'>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
            </ul>
          </li>
          <li className='work-card'>
            <div className='work-title'>
            <h3>Title</h3>
            <span>Date</span>
            </div>
            <ul className='description'>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
            </ul>
          </li>
          <li className='work-card'>
            <div className='work-title'>
            <h3>Title</h3>
            <span>Date</span>
            </div>
            <ul className='description'>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
            </ul>
          </li>
          <li className='work-card'>
            <div className='work-title'>
            <h3>Title</h3>
            <span>Date</span>
            </div>
            <ul className='description'>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
    <section className='skills-bar'>
    <svg className='divider-dark' xmlns="http://www.w3.org/2000/svg" viewBox="0 186.5 1920 112.5">
      <polygon points="-30,300 355.167,210.5 1432.5,290 1920,198.5 1920,300" fill="#cbd6dd"/>
      </svg>
      <h2 className='section-title'>Skills</h2>
      <ul className='skills-container'>
        <li className='icon-container'>
        <i className="fa-brands fa-html5"></i>
            <span className='icon-title'>HTML</span>
        </li>
        <li className='icon-container'>
        <i className="fa-brands fa-css3"></i>
            <span className='icon-title'>CSS</span>
        </li>
        <li className='icon-container'>
        <i className="fa-brands fa-github"></i>
            <span className='icon-title'>Github</span>
        </li>
        <li className='icon-container'>
        <i className="fa-brands fa-js"></i>
            <span className='icon-title'>Javascript</span>
        </li>
        <li className='icon-container'>
          <i className="fa-brands fa-react"></i>
            <span className='icon-title'>React</span>
        </li>
        <li className='icon-container'>
        <i className="fa-brands fa-sass"></i>
            <span className='icon-title'>SASS</span>
        </li>
        {/* imgs made to look like font awesome icons */}
        <li className='icon-container .img-centering'>
            <img className='fa-img'src={ReduxLogo}/>  
            <span className='fa-img-title'>Redux</span>
        </li>
        <li className='icon-container'>
            <img className='fa-img'src={FirebaseLogo}/>  
            <span className='fa-img-title'>Firebase</span>
        </li>
      </ul>
    </section>
    <svg className='divider-dark' xmlns="http://www.w3.org/2000/svg" viewBox="0 186.5 1920 112.5">
      <polygon points="0,186.5 487.5,278 1064.833,198.5 1955.5,288 1955.5,186.5" fill="#cbd6dd"/>
    </svg>

    </>
  );
}

export default ComponentName;