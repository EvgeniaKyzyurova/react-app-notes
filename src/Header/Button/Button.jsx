import React from 'react';
import './button.css';

export const Button = ({ content, style, onClick }) => (
    <button className='button' onClick={onClick} style={style}>
    {content}
    </button>
);
