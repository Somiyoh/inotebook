const express = require('express')
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')

//  ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})

//  ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post(
  '/addnote',
  fetchuser,
  [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      })
      const savedNote = await note.save()

      res.json(savedNote)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Internal Server Error')
    }
  }
)

//  ROUTE 3: Update an existing note using: PUT "/api/notes/updatenode". Login required
router.put('/updatenode/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body

    // create a newNote object
    const newNote = {}
    if (title) {
      newNote.title = title
    }
    if (description) {
      newNote.description = description
    }
    if (tag) {
      newNote.tag = tag
    }

    // find the node to be updated
    let note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(400).send('Not found')
    }

    if (note.user.toString() !== req.user.id){
        return res.status(401).send('Not allowed')
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json({note})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
