import React, { useState } from "react";
import profileImg from "../images/_DSC1569-Edit 2_compressed.jpg";
import ReduxLogo from "../images/Redux.png";
import FirebaseLogo from "../images/firebase.png";
import connect4Pic from "../images/connect4.png";
import ticTacToePic from "../images/tic-tac-toe.png";

function ComponentName() {
	const [projectHidden, setProjectHidden] = useState(false);

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
							<button>Get in Touch</button>
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
									target="_blank">
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
								<h1>Front-End Developer</h1>
								<h2># Hello there!</h2>
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
							<span
								className={`filter-button ${projectHidden ? "" : "active-tab"}`}
								disabled={!projectHidden}
								onClick={() => setProjectHidden(false)}>
								<i class="fa-solid fa-code"></i> Projects
							</span>
							<span
								className={`filter-button ${projectHidden ? "active-tab" : ""}`}
								disabled={projectHidden}
								onClick={() => setProjectHidden(true)}>
								<i class="fa-solid fa-code"></i> Work Experience
							</span>
							<div
								className={`projects-section ${projectHidden ? "hidden" : ""}`}>
								<div className="project-grid-container">
									<a href="/tic-tac-toe">
										<div className="project-container">
											<h3>Tic-Tac-Toe</h3>
											<div className="project-image-container">
												<img src={ticTacToePic} />
											</div>
											<div className="project-description-container">
												<p>React Project</p>
												<ul>
													<li>
														Created reusable components to build into connect4
													</li>
													<li>
														Created game matrix and winning matrix to handle
														wins
													</li>
													<li>Added animations for natural user interface </li>
												</ul>
												<a
													href="https://github.com/kwongz/kwong-portfolio/tree/master/src/gameComponents"
													target="_blank">
													Code
												</a>
												<a href="/tic-tac-toe">Link</a>
											</div>
										</div>
									</a>
									<a href="/connect4">
										<div className="project-container">
											<h3>Connect 4</h3>
											<div className="project-image-container">
												<img src={connect4Pic} />
											</div>
											<div className="project-description-container">
												<p>
													Lorem ipsum dolor sit amet consectetur adipisicing
													elit. Beatae similique accusantium, voluptatibus
													facere iusto culpa. Nulla sit, nesciunt blanditiis nam
													est aspernatur quidem alias similique quod vel, quo
													saepe pariatur incidunt. Sit rem fugit unde
													necessitatibus voluptatem debitis voluptate est sunt
													facilis, iure, qui temporibus mollitia, velit quis?
													Impedit, dolorum?
												</p>
												<a
													href="https://github.com/kwongz/kwong-portfolio/tree/master/src/gameComponents"
													target="_blank">
													Code
												</a>
												<a href="/connect4">Link</a>
											</div>
										</div>
									</a>
								</div>
							</div>
						</div>
						{/*Work Experience Section*/}
						<div
							className={`work-experience-container ${
								projectHidden ? "" : "hidden"
							}`}>
							<ul className="card-container">
								<li className="work-card">
									<a
										href="https://www.mirvish.com/shows/harry-potter-and-the-cursed-child"
										target="_blank">
										<div className="work-title">
											<h3>Ensemble/Aeralist - Ed Mirvish Harry Potter</h3>
											<span>April 2022 - July 2023</span>
										</div>
										<ul className="description">
											<li>
												Cast Member in Harry potter and the cursed Child Toronto
											</li>
											<li>
												During off time, continued learning in Javascript and
												React
											</li>
											<li>
												Worked in diverse and large scale production of
												internationally recognized play
											</li>
										</ul>
									</a>
								</li>
								<li className="work-card">
									<a href="https://innocean.ca/" target="_blank">
										<div className="work-title">
											<h3>
												Jr. Front-end Developer -{" "}
												<a href="https://innocean.ca/">Innocean Worldwide</a>
											</h3>
											<span>Mar 2021 - Sept 2021</span>
										</div>
										<ul className="description">
											<li>
												Worked on new features, built new pages for Genesis
												Canadian Website
											</li>
											<li>
												Worked in cooperation with developer, designer, and
												international teams to deliver ad campaigns
											</li>
											<li>
												Took leadership role during restructuring of development
												team
											</li>
											<li>
												Efficiently managed multiple projects with tight
												deadlines, while collaborative with multiple teams
											</li>
										</ul>
									</a>
								</li>
								<li className="work-card">
									<a
										href="https://www.royalcaribbean.com/experience/cruise-shows-and-entertainment"
										target="_blank">
										<div className="work-title">
											<h3>
												Dancer/Aeralist/Acrobat - Royal Caribbean Entertainment
											</h3>
											<span>April 2016 - March 2020</span>
										</div>
										<ul className="description">
											<li>
												Created and performed shows with a international cast
												around the world
											</li>
											<li>
												Rehearsed and created shows in collaboration with
												Dancers, Divers, Singers and Synchronize Swimmers in 1
												month
											</li>
										</ul>
									</a>
								</li>
								<li className="work-card">
									<a
										href="https://uwaterloo.ca/biomechanics-of-human-mobility-lab/"
										target="_blank">
										<div className="work-title">
											<h3>
												Biomechanics Research Assistant - University of Waterloo
											</h3>
											<span>Sept 2013 - Aug 2015</span>
										</div>
										<ul className="description">
											<li>
												Assisted in the development and testing of prolonged
												standing and sitting studies
											</li>
											<li>
												Communicated to participants on lab protocols and
												research study methods
											</li>
											<li>
												Collected and analyzed motion capture, force plate and
												EMG data
											</li>
											<li>
												Contributed to weekly research meetings, updating
												research data and designing research study test
												protocols.
											</li>
										</ul>
									</a>
								</li>
							</ul>
						</div>
					</section>
					{/* end of right-grid-container */}
				</div>
			</header>
		</>
	);
}

export default ComponentName;
