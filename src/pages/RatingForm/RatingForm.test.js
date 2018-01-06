import React from 'react';
import ReactDOM from 'react-dom';
import RatingForm from './RatingForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RatingForm />, div);
});