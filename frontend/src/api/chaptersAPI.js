import axios from 'axios'
import { use } from 'react'

const api = axios.create({
  baseURL: '/api'
})

export const getChapters = () => {
  console.log('Obteniendo capítulos...')
  return api.get('/chapters/')
}

export const reserveChapter = (chapterId, userId) => {
  console.log("Enviando reserva para ID:", chapterId);
  return api.post(`/reserve/${chapterId}/`, null,{
    params: {user_id: userId}
  });
}