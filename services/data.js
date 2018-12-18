import axios from 'axios'

export const read = async (path, token) => {
  const { data } = await axios.get('/api/data', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  return data
}
