import SideBar from "../SideBar/SideBar";
import NoteForm from "./NoteForm/NoteForm";
import { useEffect, useState } from "react";

import Moment from 'moment';

import './workSpace.css';


function Workspace( { action, func, resultList } ){
    const [note, setNote] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notesList, setNotesList] = useState([]);

    
	const [searchResults, setSearchResults] = useState([]);
	
	//const searchRef = useRef();
	
    useEffect(() => {
		const listTitles = [];
		notesList.map((note) => {
			listTitles.push(note.title);
			return notesList;
		});
		const resultTitles = listTitles.filter((title) =>
			title.toLowerCase().includes(resultList.toLowerCase())
		);
		const results = notesList.filter((note) => {
			return note ? resultTitles.includes(note.title) : [];
		});
		setSearchResults(results);
	}, [notesList, resultList]);

    useEffect(()=>{
        getAllNotesFunc();
    }, [] );

    let selectedNote = '';
    if(notesList !== ''){
        selectedNote = notesList.filter((el) => el.id === note)[0];
    }
    
    const selectNoteFunc = (e) => {
        setNote(e);
    }

    useEffect(()=>{
        if((action === 'edit') && (note !== '')){
            setTitle(selectedNote.title);
            setContent(selectedNote.content);
        }
    }, [action, selectedNote]);

    const date = Moment();
    const currentDate = date.format('D/MM/YYYY');

    const idb = window.indexedDB;

    if(!idb){
        console.log("This browser doesn't support IndexedDB.");
        return;
    };

    const request = idb.open('test-db2', 2);

    request.onerror = (event) => {
        console.log('Error ', event);
        console.log( 'An error occured with IndexedDb');
    };

    request.onupgradeneeded = (event) => {
        const db = request.result;
        if(!db.objectStoreNames.contains('notes')){
            db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true});
            console.log('notesOS created successfully');
        }

    };

    request.onsuccess = () => {
        console.log('Database opened successfully');
    };

    const addNoteFunc = () =>{
        const dbPromise = idb.open('test-db2', 2);
        dbPromise.onsuccess = () =>{
            const db = dbPromise.result;
            const tx = db.transaction('notes', 'readwrite');
            const notes = tx.objectStore('notes');
            const item = notes.add({
                title,
                content,
                creationDate: currentDate,
            });
            item.onsuccess = () => {
                tx.oncomplete = () => {
                    db.close();
                };
                console.log('note added');
            };
            item.onerror = (event) => {
                console.log(event);
                console.log('note error');
            };
        };
    };

    const updateNoteFunc = () =>{
        const dbPromise = idb.open('test-db2', 2);
        dbPromise.onsuccess = () =>{
            const db = dbPromise.result;
            const tx = db.transaction('notes', 'readwrite');
            const notes = tx.objectStore('notes');
            const item = notes.put({
                id: selectedNote.id,
                title,
                content,
                creationDate: currentDate,
            });
            item.onsuccess = () => {
                tx.oncomplete = () => {
                    db.close();
                };
                console.log('note updated');
            };
            item.onerror = (event) => {
                console.log(event);
                console.log('note error');
            };
        };
    };

    const getAllNotesFunc = () =>{
        const dbPromise = idb.open('test-db2', 2);
        dbPromise.onsuccess = () =>{
            const db = dbPromise.result;
            const tx = db.transaction('notes', 'readonly');
            const notes = tx.objectStore('notes');
            const notesData = notes.getAll();
            
            notesData.onsuccess = (query) => {
                setNotesList(query.target.result);
            };

            notesData.onerror = () => {
                console.log('error while getting notes');
            };

            tx.oncomplete = () => {
                db.close();
            };
        };
    }

    const deleteNoteFunc = (note) =>{
        const dbPromise = idb.open('test-db2', 2);
        dbPromise.onsuccess = () =>{
            const db = dbPromise.result;
            const tx = db.transaction('notes', 'readwrite');
            const notes = tx.objectStore('notes');
            const deletedNote = notes.delete(note.id);
            
            deletedNote.onsuccess = (query) => {
                console.log('note deleted');
            };

            deletedNote.onerror = () => {
                console.log('error while deletting notes');
            };

            tx.oncomplete = () => {
                db.close();
            };
        };
    }

    if(note === ''){
        if(action === 'add'){
            
            return(
                <div className='main-box'>
                    <SideBar onClick={(e)=>{selectNoteFunc(e); func('');}} notesList={searchResults}/>
                    <div className='work-space'>
                        <NoteForm date={currentDate} titlePlaceholder={'Title'} titleFunc={(e)=>setTitle(e)} title={title} contentPlaceholder={'Description'} contentFunc={(e)=>setContent(e)} content={content} btnFunc={addNoteFunc} btnName={'Add'} />
                    </div>
                </div>
            )
        }else if( action === ''){
            return (
                <div>
                    <SideBar onClick={(e)=>{selectNoteFunc(e); func('');}} notesList={searchResults} />
                </div>
            )
        }else if ( action === 'edit' || action === 'delete'){
            alert('Choose note');
            return (
                <div>
                    <SideBar onClick={(e)=>{selectNoteFunc(e); func('');}} notesList={searchResults} />
                </div>
            )
        }
    }else if(note !== '') {
        if( action === ''){
        return(
            <div className='main-box'>
            <SideBar onClick={(e)=>{selectNoteFunc(e); func('');}} notesList={searchResults}/>
            <div className='work-space'>
                <p className='note-date'>{selectedNote.creationDate}</p>
                <p className='note-title'>{selectedNote.title}</p>
                <div className='note-content'>{selectedNote.content}</div>
            </div>
            </div>
        )
        }else if(action === 'add'){
            return(
                <div className='main-box'>
                    <SideBar onClick={(e)=>{selectNoteFunc(e); func('');}} notesList={searchResults}/>
                    <div className='work-space'>
                         <NoteForm date={currentDate} titlePlaceholder={'Title'} titleFunc={(e)=>setTitle(e)} title={title} contentPlaceholder={'Description'} contentFunc={(e)=>setContent(e)} content={content} btnFunc={addNoteFunc} btnName={'Add'} />
                    </div>
                </div>
            )
        }else if(action === 'edit'){
            return(
                <div className='main-box'>
                    <SideBar onClick={(e)=>{selectNoteFunc(e); func('');}} notesList={searchResults}/>
                    <div className='work-space'>
                         <NoteForm date={selectedNote.creationDate} titlePlaceholder={selectedNote.title} titleFunc={(e)=>setTitle(e)} title={title} contentPlaceholder={selectedNote.content} contentFunc={(e)=>setContent(e)} content={content} btnFunc={updateNoteFunc} btnName={'Edit'} />
                    </div>
                </div>
            )
        }else if(action === 'delete'){
            deleteNoteFunc(selectedNote);
            window.location.reload(true);
            return(
                <div className='main-box'>
                    <SideBar onClick={(e)=>{selectNoteFunc(e); func('');}} notesList={searchResults}/>
                    <div className='work-space'>

                    </div>
                </div>
            )
        }
    }
    
}

export default Workspace;