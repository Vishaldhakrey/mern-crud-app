import React, { useEffect } from "react"
import notesStore from "../stores/notesStores"
import CreateForm from "../components/createForm"
import UpdateForm from "../components/UpdateForm"
import Notes from "../components/Notes"

const NotesPage = () => {
    const store = notesStore();

    useEffect(() =>{
        store.fetchNotes()
    },[]) 

    return(
        <div className="App">
            <Notes />
            <UpdateForm />
            <CreateForm />
        </div>
    )
}

export default NotesPage;