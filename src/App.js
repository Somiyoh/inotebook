import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBars'
import Home from './components/Hoome'
import About from './components/About'
import NoteState from './context/notes/NoteState'
import { Alert } from './components/Alert'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert message="some message" />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  )
}

export default App
