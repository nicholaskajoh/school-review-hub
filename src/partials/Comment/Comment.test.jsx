import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Comment';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Comment />, div);
});
