import { useState } from 'react';
import './App.css';
import Header from './Header/Header';
import Workspace from './Workspace/Workspace';

function App() {
  const [action, setAction] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [resultList, setResultList] = useState('');

  const search = (e) => {
		setSearchTerm(e.target.value);
	};

  const displayNotes = () => {
		setResultList(searchTerm);
	};
  return (
    <>
      <Header func={(e) => setAction(e)} search={search} searchTerm={searchTerm} displayNotes={displayNotes} />
      <Workspace action={action} func={(e) => setAction(e)} resultList={resultList}/>
      
    </>
  );
}

export default App;
