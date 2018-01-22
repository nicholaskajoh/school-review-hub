import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './Reviews';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Reviews />, div);
});
