import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './UpvoteButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UpvoteButton />, div);
});
