import express from 'express';
import { createNote, deleteNote, getNotes, updateNote } from '../controller/notes.js';

const router = express.Router();

router.get('/notes', getNotes);
router.post('/newNote', createNote);
router.put('/updateNote', updateNote);
router.delete('/deleteNote/:_id', deleteNote);

export default router;