import React from 'react';
import { Link } from 'react-router-dom';

const Highlights = (props) => (
    <div className="section">
        <div className="container">
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-8">
                    <div className="tile">
                        <div className="tile is-parent">
                            <article className="tile is-child notification is-light">
                                <p>{props.school.description}</p>
                            </article>
                        </div>
                        <div className="tile is-parent is-vertical">
                            <article className="tile is-child notification is-warning">
                                <h4 className="subtitle"><i className="fa fa-trophy"></i> Rank</h4>
                                <p className="title has-text-centered">{props.school.rank}</p>
                            </article>
                            <article className="tile is-child notification is-info">
                                <h4 className="subtitle"><i className="fa fa-star"></i> Rating</h4>
                                <p className="title has-text-centered">{props.school.rating}</p>
                            </article>
                        </div>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification is-success">
                        <div className="content">
                            <h4 className="title">Rated higher than</h4>
                            <div className="content">
                                {props.lowerRatedSchools.map(school =>
                                    <article className="media">
                                        <div className="media-left">
                                            <figure className="image is-32x32">
                                                <img src={school.logo_url} alt={school + " logo"}/>
                                            </figure>
                                        </div>
                                        <div className="media-content">
                                            <Link to={"/school/" + school.id}>{school.name}</Link>
                                        </div>
                                    </article> 
                                )}

                                {props.numLowerRatedSchools > 3 ?
                                    <p className="has-text-right">
                                        <br/>
                                        And {props.numLowerRatedSchools - 3} other(s).
                                    </p>
                                : ""}

                                {props.numLowerRatedSchools === 0 ?
                                    <div className="has-text-center">
                                        This school is rated the least on our Index.
                                    </div>
                                : ""}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
);

export default Highlights;
