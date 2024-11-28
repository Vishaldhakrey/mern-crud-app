const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')
const {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
} = require("../controllers/notesController");

router.get("/notes",requireAuth, getNotes);

router.get("/notes/:id",requireAuth, getNote);

router.post('/notes', requireAuth, createNote);

router.put("/notes/:id", requireAuth, updateNote);

router.delete("/notes/:id", requireAuth, deleteNote);

module.exports = router;