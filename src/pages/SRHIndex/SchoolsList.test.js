import React from 'react';
import ReactDOM from 'react-dom';
import SchoolsList from './SchoolsList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SchoolsList />, div);
});
