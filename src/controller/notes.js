import mongoose from "mongoose";
import { Notes } from "../model/Notes.js";

export const getNotes = async (req, res) => {
    try {
        const notes = await Notes.find()

        res.status(200).json(notes)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, description } = req.body;

        const newNote = new Notes({
            title: title,
            description: description
        });

        await newNote.save();

        res.status(201).json(newNote);

    } catch (error) {
        res.status(409).json({ error: err.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { _id, title, description } = req.body;

        const existingNote = await Notes.findById(_id);

        if (!existingNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        existingNote.title = title;
        existingNote.description = description;

        await existingNote.save();

        res.status(200).json(existingNote);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { _id } = req.params;

        const result = await Notes.deleteOne({ _id: _id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
