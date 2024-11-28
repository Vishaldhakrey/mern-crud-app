import React from 'react'
import notesStore from '../stores/notesStores';

const CreateForm = () => {
    const store = notesStore();

    
    if (store.updateForm._id) return <></>;

    return (
        <div> 
            <h2>Create note</h2>
            <form onSubmit={store.createNote}>
            <input 
                onChange={store.updateCreateFormField} 
                value={store.createForm.title} 
                type="text" 
                name="title" 
            />
            <textarea 
                onChange={store.updateCreateFormField}  
                value={store.createForm.body} 
                type="text" 
                name="body" 
            />
            <button type="submit">Create note</button>
            </form>
        </div>

    )
}

export default CreateForm;