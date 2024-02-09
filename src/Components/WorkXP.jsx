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
                During off time, continued learning in Javascript and React
              </li>
              <li>
                Worked in diverse and large scale production of internationally
                recognized play
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
                Worked on new features, built new pages for Genesis Canadian
                Website
              </li>
              <li>
                Worked in cooperation with developer, designer, and
                international teams to deliver ad campaigns
              </li>
              <li>
                Took leadership role during restructuring of development team
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
                Created and performed shows with a international cast around the
                world
              </li>
              <li>
                Rehearsed and created shows in collaboration with Dancers,
                Divers, Singers and Synchronize Swimmers in 1 month
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
