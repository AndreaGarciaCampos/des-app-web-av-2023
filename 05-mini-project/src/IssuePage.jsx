import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function IssuePage () {
  const [issue, setIssue] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/facebook/react/issues/${id}`)
        setIssue(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchIssue()
  }, [id])

  return (
    <div>
      {issue
        ? (
          <div>
            <h2>{issue.title}</h2>
            <p>{issue.body}</p>
          </div>
          )
        : (
          <p>Loading...</p>
          )}
    </div>
  )
}

export default IssuePage
