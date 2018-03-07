import React from 'react';


const Heading = (props) => (
  <section className="hero is-light star-pattern">
    <div className="hero-body">
      <div className="container">
        <article className="media">
          <div className="media-left">
            <figure className="white-border">
              <img className="image is-128x128" src={props.school.logo_url} alt={props.school.name + ' logo'} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <h1 className="title">{props.school.name}</h1>
              <h4 className="subtitle">{props.school.location}</h4>
              <p>Website: &nbsp;
                <a className="has-text-link" href={props.school.website} target="_blank">
                  {props.school.website} <i className="fa fa-external-link-alt"></i>
                </a>
              </p>
            </div>
          </div>
          <div className="media-right">
            <iframe title="School map" width="auto" height="auto" frameBorder="1" style={{ border: 1 }}
              src={
                'https://www.google.com/maps/embed/v1/place?key=' + process.env.GOOGLE_MAP_API_KEY + '&q='
                + encodeURI(props.school.name)
              } allowFullScreen>
            </iframe>
          </div>
        </article>
      </div>
    </div>
  </section >
);

export default Heading;
