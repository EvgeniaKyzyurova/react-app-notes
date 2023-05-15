import React from 'react';
import { Button } from "./Button/Button";
import { SearchBox } from "./SearchBox/SearchBox";
import imageEdit from '../assets/edit-icon.png';
import imageDelete from '../assets/delete-icon.png';
import imageAdd from '../assets/plus-icon.png';
import './header.css';

function Header( {func, search, searchTerm, displayNotes} ){
    const styleEdit = {
		backgroundImage: `url(${imageEdit})`,
	};
    const styleDelete = {
		backgroundImage: `url(${imageDelete})`,
	};
    const styleAdd = {
		backgroundImage: `url(${imageAdd})`,
	};
    return (
        <div className='header'>
            <div className="btn-container">
                <Button style={styleAdd} onClick={()=>func('add')}  />
                <Button style={styleDelete} onClick={()=>func('delete')} />
                <Button style={styleEdit} onClick={()=>func('edit')} />
            </div>
            <SearchBox searchFunc={search}
						searchValue={searchTerm}
						onClick={displayNotes}/>
        </div>
    )
}

export default Header;