import React from 'react';
import './searchBox.css';

export const SearchBox = ({searchFunc, searchValue, onClick}) => {
    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            onClick();
        } 
    };
    return (<input className='input' type='text' placeholder='&#128269; Search' onKeyDown={handleKeyDown} onChange={searchFunc} value={searchValue}/>
    )
};
