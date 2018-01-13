import React from 'react';
import ReactDOM from 'react-dom';
import TopSchools from './TopSchools';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopSchools />, div);
});
