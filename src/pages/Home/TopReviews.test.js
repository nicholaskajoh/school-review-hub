import React from 'react';
import ReactDOM from 'react-dom';
import TopReviews from './TopReviews';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopReviews />, div);
});
