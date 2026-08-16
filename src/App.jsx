import { useState } from 'react'
import './App.css'
import SpeechToText from './components/SpeechToText'

function App() {

  return (
    <>
      <SpeechToText />
      <footer className="footer">
        Developed by <strong>Sashi Saravan</strong>
      </footer>
    </>
  )
}

export default App
