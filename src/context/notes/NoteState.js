import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
  const host = 'http://localhost:5005'
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  // get all notes
  const getNotes = async () => {
    // api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwMDg0YjEzM2Q3ZTNmNjQ1Y2FjM2RhIn0sImlhdCI6MTcyODA4NzM1MH0.Ziycaf3OuAPQm9fLLL_3Fp264evTQF7VUHlzx2o0wpI',
      },
    })
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // add a note
  const addNote = async (title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwMDg0YjEzM2Q3ZTNmNjQ1Y2FjM2RhIn0sImlhdCI6MTcyODA4NzM1MH0.Ziycaf3OuAPQm9fLLL_3Fp264evTQF7VUHlzx2o0wpI',
      },
      body: JSON.stringify({ title, description, tag }),
    })

    const note = {
      _id: '67060857233d7e3f645cac3ed',
      user: '670084b133d7e3f645cac3da',
      title: title,
      description: description,
      tag: tag,
      date: '2024-10-05T00:16:50.852Z',
      __v: 0,
    }
    setNotes(notes.concat(note))
  }

  // delete a note
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenode/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwMDg0YjEzM2Q3ZTNmNjQ1Y2FjM2RhIn0sImlhdCI6MTcyODA4NzM1MH0.Ziycaf3OuAPQm9fLLL_3Fp264evTQF7VUHlzx2o0wpI',
      },
    })

    const json = response.json();
    console.log(json)

    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }

  // edit a note
  const editNote = async (id, title, description, tag) => {
    // to do api call
    const response = await fetch(`${host}/api/notes/updatenode/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwMDg0YjEzM2Q3ZTNmNjQ1Y2FjM2RhIn0sImlhdCI6MTcyODA4NzM1MH0.Ziycaf3OuAPQm9fLLL_3Fp264evTQF7VUHlzx2o0wpI',
      },
      body: JSON.stringify({ title, description, tag }),
    })
    const json = response.json()

    // logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index]
      if (element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
      }
    }
  }

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
