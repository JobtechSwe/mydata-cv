import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig: { operatorUrl } } = getConfig()

export async function requestConsent (accountId) {
  const consentRequest = {
    account_id: accountId,
    client_id: 'changeMe',
    scope: [
      'career'
    ],
    description: 'MyData CV example service requires this consent in order to provide value to the user'
  }

  try {
    const response = await axios.post(`${operatorUrl}/consents`, consentRequest)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getConsent (consent) {
  if(!consent) throw new Error('Cannot get undefined consent')
  return axios.get(`${operatorUrl}${consent.links.self}`)
}