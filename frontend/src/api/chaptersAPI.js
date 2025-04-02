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

// chaptersAPI.js
export const rentChapter = (chapterId, price, userId = 'guest') => {
  console.log("Enviando:", {
    chapterId,
    price: price.toFixed(2),
    userId
  });
  
  return api.post(`/confirm/${chapterId}/`, null, {
    params: {
      price: price.toFixed(2),
      user_id: userId
    },
    validateStatus: false // Para manejar errores 4xx/5xx
  });
};
