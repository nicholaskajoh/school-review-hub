import React from 'react';
import ReactDOM from 'react-dom';
import DefaultLayout from './DefaultLayout';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DefaultLayout />, div);
});
