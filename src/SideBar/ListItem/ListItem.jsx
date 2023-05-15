import React from 'react';
import './listItem.css';

export const ListItem = ( { title, date, content, onClick } ) => (
    <div className='list-item' onClick={onClick} >
        <p className="title">{title}</p>
        <p className="content">
        <span>{date}</span> {content}</p>
    </div>
)