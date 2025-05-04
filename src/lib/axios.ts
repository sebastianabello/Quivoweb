import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080', // <-- cambia esto a tu API real
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
