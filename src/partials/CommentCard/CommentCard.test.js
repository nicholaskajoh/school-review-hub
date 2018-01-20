import React from 'react';
import ReactDOM from 'react-dom';
import CommentCard from './CommentCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommentCard />, div);
});
