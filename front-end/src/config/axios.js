import axios from 'axios'

const auth = axios.create({
    baseURL: 'http://localhost:9999'
})

export default auth