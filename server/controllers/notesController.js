const Note = require("../models/note")

const createNote =  async (req, res) => {
    try {
        const { title, body } = req.body;

        const note = await Note.create({ 
            title, 
            body,
            user: req.user._id,
        });

        res.status(201).json({ note : note });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
}

const getNotes = async(req, res) => {

    try {
        const notes = await Note.find({user: req.user._id});
    
        res.status(200).json({notes : notes})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "failed to updated"});
    }

}

const getNote = async(req, res) => {
    try {
        const noteId = req.params.id;
    
        const note = await Note.findOne({_id: noteId, user: req.user._id});
    
        res.status(200).json({notes: note});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "failed to get Notes"});
    }
}

const updateNote = async(req, res) => {
    try {
        const noteId = req.params.id;

        const {title, body} = req.body;

        await Note.findOneAndUpdate({_id: noteId, user: req.user._id}, {
            title: title,
            body: body
        });

        const updatedNote = await Note.findById(noteId);

        res.status(201).json({note: updatedNote});
    } catch (error) {
        res.status(500).json({error: "failed to updated"});
    }
}


const deleteNote =  async(req, res) => {
    try {
        const noteId = req.params.id;

    await Note.deleteOne({_id: noteId, user: req.user._id});

    res.status(200).json({success: "Note is deleted"});
    } catch (error) {
        res.status(500).json({error: "not found"})
    }
}


module.exports = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
}