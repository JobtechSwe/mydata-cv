import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig: { operatorUrl } } = getConfig()

export async function getUserData (accountId) {
  const response = await axios.get(`${operatorUrl}/accounts/${encodeURIComponent(accountId)}/data`)
  return response.data.data
}
