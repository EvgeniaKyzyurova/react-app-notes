import React from 'react';
import { ListItem } from "./ListItem/ListItem";
import './sideBar.css';

function SideBar({ onClick, notesList }){
    if(!notesList){
        return(<div className='sideBar'></div>)
    }else{
        return(
            <div className='sideBar'>
            {notesList.map((item)=>(
                <div key={item.id}>
                    <ListItem title={item.title} date={item.creationDate} content={item.content} onClick={()=>{onClick(item.id)}} />
                </div>
            ))}
            </div>
        )
    }
    
}

export default SideBar;