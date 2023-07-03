import React, { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [gifs, setGifs] = useState([]) // lista de gifs
  // const API_KEY = 'xLlj9vMwTBCcPQR2R8usxYQUp0cZe9MO'

  useEffect(() => {
    fetch('https://api.github.com/repos/facebook/react/issues')
      .then((response) => {
        return response.json()
      }).then((results) => {
        console.log(results)
        setGifs(results)
      }).catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <>
      <h1>Mini Project</h1>
    </>
  )
}

export default App
