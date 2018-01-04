import React from 'react';
import ReactDOM from 'react-dom';
import SRHIndex from './SRHIndex';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SRHIndex />, div);
});
