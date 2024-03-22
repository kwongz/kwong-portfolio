import React from "react";

function ComponentName({ projectHidden }) {
  return (
    <div
      className={`work-experience-container ${projectHidden ? "" : "hidden"}`}
    >
      <ul className="card-container">
        <li className="work-card">
          <a
            href="https://www.mirvish.com/shows/harry-potter-and-the-cursed-child"
            target="_blank"
            rel="noreferrer"
          >
            <div className="work-title">
              <h3>Ensemble/Aeralist - Ed Mirvish Harry Potter</h3>
              <span>April 2022 - July 2023</span>
            </div>
            <ul className="description">
              <li>Cast Member in Harry potter and the cursed Child Toronto</li>
              <li>
                Exhibited strong teamwork and communication skills in
                contributing to the success of the largest Canadian play in
                Canada through effective collaboration with cast, crew,
                directors, and production staff.
              </li>
              <li>
                Continued Software development learning in React, Node.js,
                MongoDB working and learning through personal projects
              </li>
            </ul>
          </a>
        </li>
        <li className="work-card">
          <a href="https://innocean.ca/" target="_blank" rel="noreferrer">
            <div className="work-title">
              <h3>
                Jr. Front-end Developer -{" "}
                <a href="https://innocean.ca/">Innocean Worldwide</a>
              </h3>
              <span>Mar 2021 - Sept 2021</span>
            </div>
            <ul className="description">
              <li>
                Developer Designer Collaboration on webpages, banners and emails
              </li>
              <li>
                Maintained Genesis Canadian Website(AEM, HTML, CSS, Javascript)
              </li>
              <li>
                Daily standup meetings, code reviews & collaborative software
                development
              </li>
              <li>
                Efficiently managed multiple projects with tight deadlines,
                while collaborative with multiple teams
              </li>
            </ul>
          </a>
        </li>
        <li className="work-card">
          <a
            href="https://www.royalcaribbean.com/experience/cruise-shows-and-entertainment"
            target="_blank"
            rel="noreferrer"
          >
            <div className="work-title">
              <h3>Dancer/Aeralist/Acrobat - Royal Caribbean Entertainment</h3>
              <span>April 2016 - March 2020</span>
            </div>
            <ul className="description">
              <li>
                Developed cross-cultural communication, time management,
                teamwork, problem-solving, and attention to detail skills while
                collaborating with international teams to swiftly produce and
                perform in high-quality shows aboard cruise ships.
              </li>
            </ul>
          </a>
        </li>
        <li className="work-card">
          <a
            href="https://uwaterloo.ca/biomechanics-of-human-mobility-lab/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="work-title">
              <h3>Biomechanics Research Assistant - University of Waterloo</h3>
              <span>Sept 2013 - Aug 2015</span>
            </div>
            <ul className="description">
              <li>
                Assisted in the development and testing of prolonged standing
                and sitting studies
              </li>
              <li>
                Communicated to participants on lab protocols and research study
                methods
              </li>
              <li>
                Collected and analyzed motion capture, force plate and EMG data
              </li>
              <li>
                Contributed to weekly research meetings, updating research data
                and designing research study test protocols.
              </li>
            </ul>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ComponentName;
