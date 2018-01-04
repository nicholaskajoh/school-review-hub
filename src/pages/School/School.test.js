import React from 'react';
import ReactDOM from 'react-dom';
import School from './School';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<School />, div);
});
