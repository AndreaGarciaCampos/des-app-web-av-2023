import { useState, useEffect } from 'react'
const Home = () => {
    const myRequest =new Request ('../assets/lentes.json')
const [data, setData] = useState{[]}

useEffect(() => {
    fetch(myRequest)
      .then((response) => {
        return response.json()
      }).then((glasses) => {
        console.log(glasses)
        setGifs(results.data)
      }).catch((error) => {
        console.error(error)
      })
  }, [])
  return (
    <div>Home</div>
  )
}
export default Home
