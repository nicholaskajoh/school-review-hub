import React from 'react';
import ReactDOM from 'react-dom';
import SuggestedMatches from './SuggestedMatches';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SuggestedMatches />, div);
});
