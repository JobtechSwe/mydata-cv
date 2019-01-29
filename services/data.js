import axios from 'axios'

export const read = async (path, accessToken) => {
  const { data } = await axios.get('/api/data', {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  })
  return data
}
