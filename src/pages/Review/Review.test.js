import React from 'react';
import ReactDOM from 'react-dom';
import Review from './Review';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Review />, div);
});
