import { create } from 'zustand'
import axios from 'axios'

const notesStore = create((set) => ({
    notes: null,
    createForm:{
        title: '',
        body: ''
    },

    updateForm:{
        _id: null,
        title: '',
        body: ''
    },

    fetchNotes: async() => {
        const {data} = await axios.get('/notes');
        set({notes:data.notes});
    },
    updateCreateFormField : (e) => {
        const {name, value} = e.target;
        set((state)=>{
            return{
                createForm:{
                    ...state.createForm,
                    [name]: value
                },
            };
        });
    },
    createNote : async(e) =>{
        e.preventDefault();
        
        const {createForm, notes} = notesStore.getState();
        const {data} = await axios.post('/notes', createForm);
        
        set({
            notes: [...notes, data.note],
            createForm: {
                title: '',
                body:'',
            }
        });
    },
    deleteNote : async(_id) => {
        const {data} = await axios.delete(`/notes/${_id}`)
        const {notes} = notesStore.getState()

        const newNotes = notes.filter((note) => {
            return note._id !== _id
        })
    
        set({notes: newNotes});
    },
    handleUpdateFieldChange : (e) => {
        const {value, name} = e.target;
        
        set((state) => {
            return{
                updateForm:{
                    ...state.updateForm,
                    [name]: value,
                },
            }
        })    
    },

    toggleUpdate: ({title, body, _id}) => {
        set({
            updateForm:{
                title,
                body,
                _id,
            }
        })
    },
    updateNote : async(e) => {
        e.preventDefault();
    
        const {
            updateForm:{title, body, _id},
            notes,
        } = notesStore.getState()
    
        const {data} = await axios.put(`/notes/${_id}`, {title, body})
    
        const newNotes = [...notes];
        const noteId = notes.findIndex((note) =>{
            return note._id === _id
        })
    
        newNotes[noteId] = data.note;
        
        set({
            notes: newNotes,
            updateForm: {
                _id:null,
                title: '',
                body:''
            }
        });
    }
    
    
}));

export default notesStore;