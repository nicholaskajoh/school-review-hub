import React from 'react';
import ReactDOM from 'react-dom';
import ObjectNotFound from './ObjectNotFound';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ObjectNotFound />, div);
});
