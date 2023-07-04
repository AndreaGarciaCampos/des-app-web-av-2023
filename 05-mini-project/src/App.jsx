import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// Importa el componente IssuePage desde el archivo completo './IssuePage.jsx'
import IssuePage from './IssuePage.jsx'

// Resto del código de la App...

function App () {
  const [usuarios, setUsuarios] = useState([])
  const [tablaUsuarios, setTablaUsuarios] = useState([])
  const [busqueda, setBusqueda] = useState('')

  const peticionGet = async () => {
    try {
      const response = await axios.get('https://api.github.com/repos/facebook/react/issues')
      setUsuarios(response.data)
      setTablaUsuarios(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setBusqueda(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar = (terminoBusqueda) => {
    const resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      if (elemento.title.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento
      }
    })
    setUsuarios(resultadosBusqueda)
  }

  useEffect(() => {
    peticionGet()
  }, [])

  return (
    <Router>
      <div className='App'>
        <div className='containerInput'>
          <input
            className='form-control inputBuscar'
            value={busqueda}
            placeholder='Búsqueda por Nombre'
            onChange={handleChange}
          />
          <button className='btn btn-success'>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className='table-responsive'>
          <table className='table table-sm table-bordered'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Nombre de Usuario</th>
              </tr>
            </thead>

            <tbody>
              {usuarios &&
                usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>
                      <Link to={`/issues/${usuario.number}`} style={{ textDecoration: 'none', color: 'red' }}>
                        {usuario.title}
                      </Link>
                    </td>
                    <td>{usuario.user.login}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Switch>
          <Route path='/issues/:id' component={IssuePage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
