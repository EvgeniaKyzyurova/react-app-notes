import './noteForm.css';

function NoteForm({ date, titlePlaceholder, titleFunc, title, contentPlaceholder, contentFunc, content, btnFunc, btnName }) {
    return(
        <form className='form' >
                        <p className='note-date'>{date}</p>
                        <input className='form-input' type='text' placeholder={titlePlaceholder} onChange={(e)=>titleFunc(e.target.value)} value={title} />
                        <textarea className='form-content' type='text' placeholder={contentPlaceholder} onChange={(e)=>contentFunc(e.target.value)} value={content} />
                        <button className='form-btn' onClick={btnFunc}>{btnName}</button>
        </form> 
    )

}

export default NoteForm;