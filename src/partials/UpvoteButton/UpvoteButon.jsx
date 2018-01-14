import React, { Component } from 'react';
import './UpvoteButton.css';
import { Burst, Timeline } from 'mo-js';

import { TweenMax, TimelineLite, DrawSVGPlugin, Elastic, Power4, Expo } from "gsap";

var check_status = false;

const configureOnClick = () => {
  var like_cnt = document.getElementsByClassName('like-cnt');
  var like_parent = document.getElementsByClassName('like-container');
  var like_btn = document.getElementsByClassName('like-btn');
  var upvote_btn_text = document.getElementById('upvote-btn-text');

  var burst = new Burst({
    parent: like_parent,
    radius: { 20: 60 },
    count: 15,
    angle: { 0: 30 },
    children: {
      delay: 250,
      duration: 700,
      radius: { 10: 0 },
      fill: ['#FF3860'],
      scale: { 1: 0, easing: 'sin.in' },
    }
  });

  var t1 = new TimelineLite();
  var t2 = new TimelineLite();
  if (!check_status) {
    t1.set(like_cnt, { scale: 0 });
    t1.set('.like-btn', { scale: 0 });
    t1.to(like_cnt, 0.6, { scale: 1, background: '#fff', ease: Expo.easeOut });
    t2.to('.like-btn', 0.65, { scale: 1, color: '#FF3860', ease: Elastic.easeOut.config(1, 0.3) }, '+=0.2');
    check_status = true;
    burst.replay();
    upvote_btn_text.innerHTML = "Upvoted";
  }
  else {
    t1.to(like_cnt, 1, { scale: 1 })
      .to(like_cnt, 1, { scale: 1, background: '#ffffff', ease: Power4.easeOut });
    t2.to('.like-btn', 1, { color: '#22C65B' });
    t1.timeScale(7);
    check_status = false;
    upvote_btn_text.innerHTML = "Upvote";
  }
};

const UpvoteButton = () => (
  <div className="gp-header">
    <div className="like-container">
      <div className="like-cnt unchecked" id="like-cnt" onClick={configureOnClick}>
        <i className="like-btn  fa fa-arrow-up fa-1x"></i>
      </div>
    </div>
    <h6 id="upvote-btn-text">Upvote</h6>
  </div>
);

export default UpvoteButton;