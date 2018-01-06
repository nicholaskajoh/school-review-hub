import React from 'react';
import ReactDOM from 'react-dom';
import Report from './Report';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Report />, div);
});
