import React from 'react';
import ReactDOM from 'react-dom';
import IndexLanding from './IndexLanding';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IndexLanding />, div);
});
