import React from 'react';

const Heading = (props) => (
  <section className="hero is-light">
    <div className="hero-body">
      <div className="container">
        <article class="media">
          <div className="media-left">
            <figure className="image is-128x128">
              <img src={props.school.logo_url} alt={props.school.name + " logo"}/>
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <h1 className="title">{props.school.name}</h1>
              <h4 className="subtitle">{props.school.location}</h4>
              <p>Website: &nbsp;
                <a className="has-text-link" href={props.school.website} target="_blank">
                  {props.school.website} <i className="fa fa-external-link-alt"></i>
                </a>
              </p>
            </div>
          </div>
          <div class="media-right"></div>
        </article>
      </div>
    </div>	
  </section>
);

export default Heading;
