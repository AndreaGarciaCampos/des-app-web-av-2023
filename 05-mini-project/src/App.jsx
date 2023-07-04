import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

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
              <th>Nombre de Usuario</th>
              <th>Título</th>
            </tr>
          </thead>

          <tbody>
            {usuarios &&
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.user.login}</td>
                  <td>
                    <a
                      href={`/usuario/${usuario.id}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      {usuario.title}
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
