import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig: { operatorUrl } } = getConfig()

const wait = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms))

export async function requestConsent (accountId) {
  const consentRequest = {
    account_id: accountId,
    client_id: 'cv',
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

export async function getConsent (link) {
  if (!link) throw new Error('Cannot get undefined consent')

  const response = await axios.get(`${operatorUrl}${link}`)
  if (response.data.data.status === 'approved') return response.data

  await wait(5000)
  return getConsent(link)
}
