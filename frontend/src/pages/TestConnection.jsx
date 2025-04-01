import { useEffect, useState } from 'react'
import { getChapters } from '../api/chaptersAPI'

export default function TestConnection() {
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getChapters()
      .then(response => {
        console.log('Datos recibidos:', response.data)
        setChapters(response.data.chapters)
      })
      .catch(error => {
        console.error('Error:', error)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Cargando...</div>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Prueba de conexión</h1>
      <pre>{JSON.stringify(chapters, null, 2)}</pre>
    </div>
  )
}